import type { useCommentThread_issue$data } from "@/__generated__/useCommentThread_issue.graphql";

export type CommentEdge = NonNullable<
  useCommentThread_issue$data["commentsCollection"]
>["edges"][number];
