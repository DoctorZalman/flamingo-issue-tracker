"use client"

import { usePaginationFragment, useMutation } from "react-relay"
import { graphql, ConnectionHandler } from "relay-runtime"
import { useRef, useState } from "react"
import { toast } from "sonner"
import type { CommentThread_issue$key } from "@/__generated__/CommentThread_issue.graphql"
import type { CommentThread_issue$data } from "@/__generated__/CommentThread_issue.graphql"
import { CommentItem } from "./CommentItem"
import { CommentSchema } from "@/lib/zod-schemas"
import type { RecordSourceSelectorProxy } from "relay-runtime"

type CommentEdge = NonNullable<CommentThread_issue$data["commentsCollection"]>["edges"][number]

const fragment = graphql`
  fragment CommentThread_issue on issues
  @refetchable(queryName: "CommentThreadPaginationQuery")
  @argumentDefinitions(first: { type: "Int", defaultValue: 5 }, after: { type: "Cursor" }) {
    nodeId
    commentsCollection(first: $first, after: $after, orderBy: [{ created_at: AscNullsLast }])
      @connection(key: "CommentThread_issue_commentsCollection") {
      edges {
        node {
          nodeId
          ...CommentItem_comment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const addCommentMutation = graphql`
  mutation CommentThreadAddMutation($issueId: UUID!, $body: String!, $authorId: UUID!) {
    insertIntocommentsCollection(
      objects: [{ issue_id: $issueId, body: $body, author_id: $authorId }]
    ) {
      records {
        nodeId
        ...CommentItem_comment
      }
    }
  }
`

// Default author for demo — first seed user
const DEMO_AUTHOR_ID = "a1b2c3d4-0000-0000-0000-000000000001"

export function CommentThread({ issueRef }: { issueRef: CommentThread_issue$key }) {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(fragment, issueRef)
  const [commit, isInFlight] = useMutation(addCommentMutation)
  const [error, setError] = useState<string | null>(null)

  // Uncontrolled input — avoids re-render on every keystroke
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const edges = data.commentsCollection?.edges ?? []
  const hasNextPage = data.commentsCollection?.pageInfo.hasNextPage ?? false

  const handleSubmit = () => {
    const body = bodyRef.current?.value ?? ""
    const result = CommentSchema.safeParse({ body })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setError(null)

    commit({
      variables: {
        issueId: data.nodeId.replace("issues:", ""),
        body: result.data.body,
        authorId: DEMO_AUTHOR_ID,
      },
      // Prepend new comment to connection
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updater: (store: any, payload: any) => {
        const records = payload?.insertIntocommentsCollection?.records
        if (!records?.length) return

        const issueRecord = store.get(data.nodeId)
        if (!issueRecord) return

        const connection = ConnectionHandler.getConnection(
          issueRecord,
          "CommentThread_issue_commentsCollection"
        )
        if (!connection) return

        const newRecord = store.get(records[0].nodeId)
        if (!newRecord) return

        const edge = ConnectionHandler.createEdge(store, connection, newRecord, "commentsEdge")
        ConnectionHandler.insertEdgeAfter(connection, edge)
      },
      onCompleted: () => {
        if (bodyRef.current) bodyRef.current.value = ""
        toast.success("Comment added")
      },
      onError: () => toast.error("Failed to add comment"),
    })
  }

  return (
    <section aria-label="Comments" className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>

      <div className="mb-6">
        {edges.map((edge: CommentEdge) => (
          <CommentItem key={edge.node.nodeId} commentRef={edge.node} />
        ))}

        {hasNextPage && (
          <button
            onClick={() => loadNext(5)}
            disabled={isLoadingNext}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 mt-2"
          >
            {isLoadingNext ? "Loading..." : "Load more comments"}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comment-body" className="sr-only">
          Add a comment
        </label>
        <textarea
          id="comment-body"
          ref={bodyRef}
          rows={3}
          placeholder="Add a comment..."
          className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={isInFlight}
          className="self-end text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 transition-colors"
        >
          {isInFlight ? "Posting..." : "Post comment"}
        </button>
      </div>
    </section>
  )
}
