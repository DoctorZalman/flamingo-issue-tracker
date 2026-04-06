import { useMutation, usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConnectionHandler } from "relay-runtime";
import { CommentSchema } from "@/lib/zod-schemas";
import { DEMO_AUTHOR_ID } from "@/lib/constants";
import type { CommentThread_issue$key } from "@/__generated__/CommentThread_issue.graphql";

const fragment = graphql`
  fragment useCommentThread_issue on issues
  @refetchable(queryName: "useCommentThreadPaginationQuery")
  @argumentDefinitions(first: { type: "Int", defaultValue: 5 }, after: { type: "Cursor" }) {
    nodeId
    id
    commentsCollection(first: $first, after: $after, orderBy: [{ created_at: AscNullsLast }])
      @connection(key: "useCommentThread_issue_commentsCollection") {
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
  mutation useCommentThreadAddMutation($issueId: UUID!, $body: String!, $authorId: UUID!) {
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

export function useCommentThread(issueRef: CommentThread_issue$key) {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(fragment, issueRef);
  const [commit, isInFlight] = useMutation(addCommentMutation);
  const [error, setError] = useState<string | null>(null);
  const [hasContent, setHasContent] = useState(false);

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
        issueId: data.id,
        body: result.data.body,
        authorId: DEMO_AUTHOR_ID,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updater: (store: any, payload: any) => {
        const records = payload?.insertIntocommentsCollection?.records;
        if (!records?.length) return;

        const issueRecord = store.get(data.nodeId);
        if (!issueRecord) return;

        const connection = ConnectionHandler.getConnection(
          issueRecord,
          "useCommentThread_issue_commentsCollection",
          { orderBy: [{ created_at: "AscNullsLast" }] }
        );
        if (!connection) return;

        const newRecord = store.get(records[0].nodeId);
        if (!newRecord) return;

        const edge = ConnectionHandler.createEdge(store, connection, newRecord, "commentsEdge");
        ConnectionHandler.insertEdgeAfter(connection, edge);
      },
      onCompleted: () => {
        if (bodyRef.current) bodyRef.current.value = "";
        setHasContent(false);
        toast.success("Comment added");
      },
      onError: () => toast.error("Failed to add comment"),
    });
  };

  return {
    edges,
    hasNextPage,
    isLoadingNext,
    isInFlight,
    error,
    hasContent,
    bodyRef,
    setHasContent,
    loadNext,
    handleSubmit,
  };
}
