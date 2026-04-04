"use client"

import { Suspense, use } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { notFound } from "next/navigation"
import { IssueDetail } from "@/components/issues/IssueDetail"
import Link from "next/link"
import { Container } from "@/components/ui/Container"

const query = graphql`
  query pageIssueDetailQuery($id: UUID!) {
    issuesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          nodeId
          ...IssueDetail_issue
        }
      }
    }
  }
`

function IssueDetailContent({ id }: { id: string }) {
  const data = useLazyLoadQuery(query, { id })
  const issue = data.issuesCollection?.edges[0]?.node

  if (!issue) notFound()

  return <IssueDetail issueRef={issue} />
}

export default function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <main>
      <Container>
        <Link
          href="/issues"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          ← Back to Issues
        </Link>
        <Suspense
          fallback={<p className="text-center text-gray-500 dark:text-gray-400 p-8">Loading...</p>}
        >
          <IssueDetailContent id={id} />
        </Suspense>
      </Container>
    </main>
  )
}
