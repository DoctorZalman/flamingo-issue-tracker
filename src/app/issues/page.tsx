"use client"

import { Suspense, useState } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { IssueList } from "@/components/issues/IssueList"
import { IssueFilters } from "@/components/issues/IssueFilters"
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Issues</h1>
        <IssueFilters
          status={status}
          priority={priority}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />
        <Suspense
          fallback={<p className="text-center text-gray-500 dark:text-gray-400 p-8">Loading...</p>}
        >
          <IssuesContent filter={buildFilter()} />
        </Suspense>
      </Container>
    </main>
  )
}
