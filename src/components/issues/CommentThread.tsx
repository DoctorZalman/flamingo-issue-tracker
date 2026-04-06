"use client";

import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CommentItem } from "./CommentItem";
import { useCommentThread } from "@/hooks/useCommentThread";
import type { CommentThread_issue$key } from "@/__generated__/CommentThread_issue.graphql";
import type { CommentEdge } from "@/types/comments";

const fragment = graphql`
  fragment CommentThread_issue on issues {
    ...useCommentThread_issue
  }
`;

export function CommentThread({ issueRef }: { issueRef: CommentThread_issue$key }) {
  const data = useFragment(fragment, issueRef);

  const {
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
  } = useCommentThread(data);

  return (
    <section aria-label="Comments" className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-4">Comments</h2>
      <div className="flex flex-col gap-2 mb-6" suppressHydrationWarning>
        {edges.map((edge: CommentEdge) => (
          <CommentItem key={edge.node.nodeId} commentRef={edge.node} />
        ))}

        {hasNextPage && (
          <Button onClick={() => loadNext(5)} disabled={isLoadingNext} className="self-end">
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
