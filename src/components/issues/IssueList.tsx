"use client"

import { usePaginationFragment } from "react-relay"
import { graphql } from "relay-runtime"
import type { IssueList_query$key } from "@/__generated__/IssueList_query.graphql"
import { IssueListItem } from "./IssueListItem"
import { StatusSelector } from "./StatusSelector"

import type { IssueList_query$data } from "@/__generated__/IssueList_query.graphql"

type Edge = NonNullable<IssueList_query$data["issuesCollection"]>["edges"][number]

const fragment = graphql`
  fragment IssueList_query on Query
  @refetchable(queryName: "IssueListPaginationQuery")
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {edges.length === 0 ? (
        <p className="p-8 text-center text-gray-500">No issues found</p>
      ) : (
        edges.map((edge: Edge) => (
          <div key={edge.node.nodeId} className="flex items-center">
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
        <div className="p-4 text-center border-t border-gray-200">
          <button
            onClick={() => loadNext(10)}
            disabled={isLoadingNext}
            className="text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
          >
            {isLoadingNext ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  )
}
