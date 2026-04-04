"use client"

import { useFragment, useMutation } from "react-relay"
import { graphql } from "relay-runtime"
import { useRef, useState } from "react"
import { toast } from "sonner"
import type { IssueEditForm_issue$key } from "@/__generated__/IssueEditForm_issue.graphql"
import { IssueEditSchema } from "@/lib/zod-schemas"
import type { ZodIssue } from "zod"
import { Select } from "@/components/ui/Select"

const STATUS_OPTIONS = [
  { value: "todo", label: "todo" },
  { value: "in_progress", label: "in progress" },
  { value: "done", label: "done" },
]

const PRIORITY_OPTIONS = [
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" },
]

const fragment = graphql`
  fragment IssueEditForm_issue on issues {
    nodeId
    title
    description
    status
    priority
    assignee_id
  }
`

const mutation = graphql`
  mutation IssueEditFormMutation(
    $nodeId: ID!
    $title: String!
    $description: String
    $status: String!
    $priority: String!
  ) {
    updateissuesCollection(
      filter: { nodeId: { eq: $nodeId } }
      set: { title: $title, description: $description, status: $status, priority: $priority }
    ) {
      records {
        nodeId
        title
        description
        status
        priority
      }
    }
  }
`

export function IssueEditForm({ issueRef }: { issueRef: IssueEditForm_issue$key }) {
  const issue = useFragment(fragment, issueRef)
  const [commit, isInFlight] = useMutation(mutation)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Uncontrolled refs — no re-render on every keystroke
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)
  const priorityRef = useRef<HTMLSelectElement>(null)

  const handleSave = () => {
    const values = {
      title: titleRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      status: statusRef.current?.value ?? "",
      priority: priorityRef.current?.value ?? "",
    }

    const result = IssueEditSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((e) => {
        const key = e.path[0]
        if (key !== undefined) fieldErrors[String(key)] = e.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    commit({
      variables: { nodeId: issue.nodeId, ...result.data },
      onCompleted: () => toast.success("Issue updated"),
      onError: () => toast.error("Failed to update issue"),
    })
  }

  return (
    <section aria-label="Edit issue" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="issue-title"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          id="issue-title"
          ref={titleRef}
          defaultValue={issue.title}
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="issue-description"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="issue-description"
          ref={descriptionRef}
          defaultValue={issue.description ?? ""}
          rows={4}
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="issue-status"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <Select
            id="issue-status"
            ref={statusRef}
            defaultValue={issue.status}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="issue-priority"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <Select
            id="issue-priority"
            ref={priorityRef}
            defaultValue={issue.priority}
            options={PRIORITY_OPTIONS}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isInFlight}
        className="self-start px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg disabled:opacity-50 transition-colors"
      >
        {isInFlight ? "Saving..." : "Save changes"}
      </button>
    </section>
  )
}
