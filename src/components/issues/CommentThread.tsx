"use client";

import { usePaginationFragment, useMutation } from "react-relay";
import { graphql, ConnectionHandler } from "relay-runtime";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { CommentThread_issue$key } from "@/__generated__/CommentThread_issue.graphql";
import type { CommentThread_issue$data } from "@/__generated__/CommentThread_issue.graphql";
import { CommentItem } from "./CommentItem";
import { CommentSchema } from "@/lib/zod-schemas";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";

type CommentEdge = NonNullable<CommentThread_issue$data["commentsCollection"]>["edges"][number];

const fragment = graphql`
  fragment CommentThread_issue on issues
  @refetchable(queryName: "CommentThreadPaginationQuery")
  @argumentDefinitions(first: { type: "Int", defaultValue: 5 }, after: { type: "Cursor" }) {
    nodeId
    commentsCollection(first: $first, after: $after, orderBy: [{ created_at: AscNullsLast }])
      @connection(key: "CommentThread_issue_commentsCollection") {
      edges {
        node {
          nodeId
          ...CommentItem_comment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const addCommentMutation = graphql`
  mutation CommentThreadAddMutation($issueId: UUID!, $body: String!, $authorId: UUID!) {
    insertIntocommentsCollection(
      objects: [{ issue_id: $issueId, body: $body, author_id: $authorId }]
    ) {
      records {
        nodeId
        ...CommentItem_comment
      }
    }
  }
`;

// Default author for demo — first seed user
const DEMO_AUTHOR_ID = "a1b2c3d4-0000-0000-0000-000000000001";

export function CommentThread({ issueRef }: { issueRef: CommentThread_issue$key }) {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(fragment, issueRef);
  const [commit, isInFlight] = useMutation(addCommentMutation);
  const [hasContent, setHasContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Uncontrolled input — avoids re-render on every keystroke
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const edges = data.commentsCollection?.edges ?? [];
  const hasNextPage = data.commentsCollection?.pageInfo.hasNextPage ?? false;

  const handleSubmit = () => {
    const body = bodyRef.current?.value ?? "";
    const result = CommentSchema.safeParse({ body });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    commit({
      variables: {
        issueId: data.nodeId.replace("issues:", ""),
        body: result.data.body,
        authorId: DEMO_AUTHOR_ID,
      },
      // Prepend new comment to connection
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updater: (store: any, payload: any) => {
        const records = payload?.insertIntocommentsCollection?.records;
        if (!records?.length) return;

        const issueRecord = store.get(data.nodeId);
        if (!issueRecord) return;

        const connection = ConnectionHandler.getConnection(
          issueRecord,
          "CommentThread_issue_commentsCollection"
        );
        if (!connection) return;

        const newRecord = store.get(records[0].nodeId);
        if (!newRecord) return;

        const edge = ConnectionHandler.createEdge(store, connection, newRecord, "commentsEdge");
        ConnectionHandler.insertEdgeAfter(connection, edge);
      },
      onCompleted: () => {
        if (bodyRef.current) bodyRef.current.value = "";
        toast.success("Comment added");
      },
      onError: () => toast.error("Failed to add comment"),
    });
  };

  return (
    <section aria-label="Comments" className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-4">Comments</h2>
      <div className="mb-6">
        {edges.map((edge: CommentEdge) => (
          <CommentItem key={edge.node.nodeId} commentRef={edge.node} />
        ))}

        {hasNextPage && (
          <Button onClick={() => loadNext(5)} disabled={isLoadingNext}>
            {isLoadingNext ? "Loading..." : "Load more comments"}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="comment-body">Add a comment</Label>
        <Textarea
          id="comment-body"
          ref={bodyRef}
          rows={3}
          placeholder="Add a comment..."
          onChange={(e) => setHasContent(e.target.value.trim().length > 0)}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Button onClick={handleSubmit} disabled={isInFlight || !hasContent} className="self-end">
          {isInFlight ? "Posting..." : "Post comment"}
        </Button>
      </div>
    </section>
  );
}
