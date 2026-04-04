"use client"

import { Suspense, use } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { notFound } from "next/navigation"
import Link from "next/link"
import { IssueDetail } from "@/components/issues/IssueDetail"
import { IssueDetailSkeleton } from "@/components/ui/Skeleton"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { Container } from "@/components/ui/Container"
import { ROUTES } from "@/lib/routes"

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
          href={ROUTES.issues}
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#ffc008] dark:hover:text-[#ffc008] transition-colors mb-6"
        >
          ← Back to Issues
        </Link>
        <ErrorBoundary>
          <Suspense fallback={<IssueDetailSkeleton />}>
            <IssueDetailContent id={id} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </main>
  )
}
