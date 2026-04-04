"use client"

import { useFragment, useMutation } from "react-relay"
import { graphql } from "relay-runtime"
import { toast } from "sonner"
import type { StatusSelector_issue$key } from "@/__generated__/StatusSelector_issue.graphql"

const STATUS_OPTIONS = ["todo", "in_progress", "done"] as const

const fragment = graphql`
  fragment StatusSelector_issue on issues {
    nodeId
    status
  }
`

const mutation = graphql`
  mutation StatusSelectorMutation($nodeId: ID!, $status: String!) {
    updateissuesCollection(filter: { nodeId: { eq: $nodeId } }, set: { status: $status }) {
      records {
        nodeId
        status
      }
    }
  }
`

export function StatusSelector({ issueRef }: { issueRef: StatusSelector_issue$key }) {
  const issue = useFragment(fragment, issueRef)
  const [commit, isInFlight] = useMutation(mutation)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value

    commit({
      variables: { nodeId: issue.nodeId, status: newStatus },
      // Optimistic update — UI reflects change instantly
      optimisticResponse: {
        updateissuesCollection: {
          records: [{ nodeId: issue.nodeId, status: newStatus }],
        },
      },
      onError: () => toast.error("Failed to update status — changes reverted"),
    })
  }

  return (
    <select
      value={issue.status}
      onChange={handleChange}
      disabled={isInFlight}
      onClick={(e) => e.preventDefault()}
      className="text-xs border border-gray-200 rounded px-2 py-1 bg-white disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  )
}
