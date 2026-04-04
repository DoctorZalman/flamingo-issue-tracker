"use client"

import { Suspense, useState } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { IssueList } from "@/components/issues/IssueList"
import { IssueFilters } from "@/components/issues/IssueFilters"
import { IssueListSkeleton } from "@/components/ui/Skeleton"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { Container } from "@/components/ui/Container"

const query = graphql`
  query pageIssuesQuery($filter: issuesFilter) {
    ...IssueList_query @arguments(filter: $filter)
  }
`

interface Filters {
  status?: { eq: string }
  priority?: { eq: string }
}

function IssuesContent({ filter }: { filter: Filters | null }) {
  const data = useLazyLoadQuery(query, { filter })
  return <IssueList queryRef={data} />
}

export default function IssuesPage() {
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")

  const buildFilter = (): Filters | null => {
    const f: Filters = {}
    if (status) f.status = { eq: status }
    if (priority) f.priority = { eq: priority }
    return Object.keys(f).length > 0 ? f : null
  }

  return (
    <main>
      <Container>
        <div className="mb-8">
          <h2 className="font-azeret" style={{ fontWeight: 600 }}>
            <span className="text-gray-900 dark:text-white text-[2rem] leading-[2.5rem] md:text-[2.75rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[4rem]">
              Track. Prioritize. Ship
            </span>
            <span
              className="text-[2rem] leading-[2.5rem] md:text-[2.75rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[4rem]"
              style={{ color: "#f357bb" }}
            >
              .
            </span>
          </h2>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-gray-600 dark:text-gray-400 text-base">
              All issues in one place — organized by priority, status, and ownership.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Click any issue to view details, edit fields, or leave a comment. Changes sync in real
              time across all open tabs.
            </p>
          </div>
        </div>

        <IssueFilters
          status={status}
          priority={priority}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />
        <ErrorBoundary>
          <Suspense fallback={<IssueListSkeleton />}>
            <IssuesContent filter={buildFilter()} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </main>
  )
}
