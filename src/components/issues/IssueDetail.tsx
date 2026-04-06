"use client";

import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { IssueDetail_issue$key } from "@/__generated__/IssueDetail_issue.graphql";
import { IssueEditForm } from "./IssueEditForm";
import { CommentThread } from "./CommentThread";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IssueDetailLabelEdge } from "@/types/issues";

const fragment = graphql`
  fragment IssueDetail_issue on issues {
    nodeId
    title
    created_at
    users {
      name
      avatar_url
    }
    issue_labelsCollection {
      edges {
        node {
          labels {
            id
            name
            color
          }
        }
      }
    }
    ...IssueEditForm_issue
    ...CommentThread_issue
  }
`;

export function IssueDetail({ issueRef }: { issueRef: IssueDetail_issue$key }) {
  const issue = useFragment(fragment, issueRef);

  return (
    <article>
      <header className="mb-8">
        <h1
          suppressHydrationWarning
          className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
        >
          {issue.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {issue.users && <Avatar name={issue.users.name} avatarUrl={issue.users.avatar_url} />}
          <time suppressHydrationWarning dateTime={issue.created_at}>
            {new Date(issue.created_at).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {issue.issue_labelsCollection?.edges.map((edge: IssueDetailLabelEdge) => (
              <Badge
                key={edge.node.labels?.id}
                label={edge.node.labels?.name ?? ""}
                color={edge.node.labels?.color ?? undefined}
              />
            ))}
          </div>
        </div>
      </header>

      <IssueEditForm issueRef={issue} />
      <CommentThread issueRef={issue} />
    </article>
  );
}
