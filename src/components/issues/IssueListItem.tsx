"use client"

import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"
import type { IssueListItem_issue$key } from "@/__generated__/IssueListItem_issue.graphql"
import type { IssueListItem_issue$data } from "@/__generated__/IssueListItem_issue.graphql"
import Link from "next/link"

type LabelEdge = NonNullable<IssueListItem_issue$data["issue_labelsCollection"]>["edges"][number]

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
`

export function IssueListItem({ issueRef }: { issueRef: IssueListItem_issue$key }) {
  const issue = useFragment(fragment, issueRef)

  return (
    <Link
      href={`/issues/${issue.id}`}
      className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium text-gray-900 dark:text-white">{issue.title}</span>{" "}
        {issue.users && <span className="text-xs text-gray-500">{issue.users.name}</span>}
        <div className="flex gap-2">
          {issue.issue_labelsCollection?.edges.map((edge: LabelEdge) => (
            <span
              key={edge.node.labels?.id}
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: edge.node.labels?.color ?? "#6366f1" }}
            >
              {edge.node.labels?.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {issue.priority}
        </span>
      </div>
    </Link>
  )
}
