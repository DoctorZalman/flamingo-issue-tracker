"use client"

import { usePaginationFragment } from "react-relay"
import { graphql } from "relay-runtime"
import type { IssueList_query$key } from "@/__generated__/IssueList_query.graphql"
import type { IssueList_query$data } from "@/__generated__/IssueList_query.graphql"
import { IssueListItem } from "./IssueListItem"
import { StatusSelector } from "./StatusSelector"
import { useRealtimeIssues } from "@/hooks/useRealtimeIssues"
import { Button } from "@/components/ui/Button"

type Edge = NonNullable<IssueList_query$data["issuesCollection"]>["edges"][number]

const fragment = graphql`
  fragment IssueList_query on Query
  @refetchable(queryName: "IssueListPaginationQuery")
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 3 }
    after: { type: "Cursor" }
    filter: { type: "issuesFilter" }
  ) {
    issuesCollection(
      first: $first
      after: $after
      filter: $filter
      orderBy: [{ created_at: DescNullsLast }]
    ) @connection(key: "IssueList_query_issuesCollection") {
      edges {
        node {
          nodeId
          ...IssueListItem_issue
          ...StatusSelector_issue
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export function IssueList({ queryRef }: { queryRef: IssueList_query$key }) {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(fragment, queryRef)

  const edges = data.issuesCollection?.edges ?? []
  const hasNextPage = data.issuesCollection?.pageInfo.hasNextPage ?? false

  // Seed realtime map with records from initial query
  const initialNodeIds = edges.map((edge: Edge) => ({
    uuid: edge.node.nodeId.replace("issues:", ""),
    nodeId: edge.node.nodeId,
  }))

  useRealtimeIssues(initialNodeIds)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {edges.length === 0 ? (
        <p className="p-8 text-center text-gray-500 dark:text-gray-400">No issues found</p>
      ) : (
        edges.map((edge: Edge) => (
          <div
            key={edge.node.nodeId}
            className="flex items-center border-b border-gray-200 dark:border-gray-700 last:border-0 transition-all duration-200 md:hover:[box-shadow:inset_3px_0_0_#ffc008] md:hover:bg-[#ffc008]/10"
          >
            <div className="flex-1">
              <IssueListItem issueRef={edge.node} />
            </div>
            <div className="pr-4">
              <StatusSelector issueRef={edge.node} />
            </div>
          </div>
        ))
      )}
      {hasNextPage && (
        <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
          <Button onClick={() => loadNext(10)} disabled={isLoadingNext}>
            {isLoadingNext ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  )
}
