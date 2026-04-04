"use client";

import { Suspense, use } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IssueDetail } from "@/components/issues/IssueDetail";
import { IssueDetailSkeleton } from "@/components/ui/Skeleton";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";

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
`;

function IssueDetailContent({ id }: { id: string }) {
  const data = useLazyLoadQuery(query, { id });
  const issue = data.issuesCollection?.edges[0]?.node;

  if (!issue) notFound();

  return <IssueDetail issueRef={issue} />;
}

export default function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <main>
      <Container>
        <Link
          href={ROUTES.issues}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#ffc008] dark:hover:text-[#ffc008] transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Issues
        </Link>
        <ErrorBoundary>
          <Suspense fallback={<IssueDetailSkeleton />}>
            <IssueDetailContent id={id} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </main>
  );
}
