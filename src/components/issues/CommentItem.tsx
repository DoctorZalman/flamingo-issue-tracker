"use client";

import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { CommentItem_comment$key } from "@/__generated__/CommentItem_comment.graphql";
import { Avatar } from "@/components/ui/Avatar";

const fragment = graphql`
  fragment CommentItem_comment on comments {
    nodeId
    body
    created_at
    users {
      name
      avatar_url
    }
  }
`;

export function CommentItem({ commentRef }: { commentRef: CommentItem_comment$key }) {
  const comment = useFragment(fragment, commentRef);

  return (
    <article
      suppressHydrationWarning
      className="flex flex-col gap-2 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 animate-[fadeIn_0.5s_ease-out]"
    >
      <div className="flex items-center justify-between">
        {comment.users && <Avatar name={comment.users.name} avatarUrl={comment.users.avatar_url} />}
        <time
          suppressHydrationWarning
          dateTime={comment.created_at}
          className="text-xs text-gray-400 dark:text-gray-500"
        >
          {new Date(comment.created_at).toLocaleDateString()}
        </time>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.body}</p>
    </article>
  );
}
