"use client";

import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { IssueListItem_issue$key } from "@/__generated__/IssueListItem_issue.graphql";
import type { IssueListItem_issue$data } from "@/__generated__/IssueListItem_issue.graphql";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

type LabelEdge = NonNullable<IssueListItem_issue$data["issue_labelsCollection"]>["edges"][number];

const fragment = graphql`
  fragment IssueListItem_issue on issues {
    nodeId
    id
    title
    priority
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
  }
`;

export function IssueListItem({ issueRef }: { issueRef: IssueListItem_issue$key }) {
  const issue = useFragment(fragment, issueRef);

  return (
    <Link
      href={ROUTES.issue(issue.id)}
      className="flex items-center justify-between p-4 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <p
          suppressHydrationWarning
          className="font-medium text-gray-900 dark:text-white max-w-[140px] md:max-w-none truncate"
        >
          {issue.title}
        </p>{" "}
        {issue.users && <span className="text-xs text-gray-500">{issue.users.name}</span>}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-2">
          {issue.issue_labelsCollection?.edges.map((edge: LabelEdge) => (
            <span
              key={edge.node.labels?.id}
              className="text-xs px-2 py-0.5 rounded-full text-white w-fit"
              style={{ backgroundColor: edge.node.labels?.color ?? "#6366f1" }}
              suppressHydrationWarning
            >
              {edge.node.labels?.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          suppressHydrationWarning
          className="text-xs text-gray-500 dark:text-gray-400 capitalize"
        >
          {issue.priority}
        </span>
      </div>
    </Link>
  );
}
