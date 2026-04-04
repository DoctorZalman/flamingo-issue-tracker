"use client"

import { useFragment, useMutation } from "react-relay"
import { graphql } from "relay-runtime"
import { useRef, useState } from "react"
import { toast } from "sonner"
import type { IssueEditForm_issue$key } from "@/__generated__/IssueEditForm_issue.graphql"
import { IssueEditSchema } from "@/lib/zod-schemas"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

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
        <Label htmlFor="issue-title">Title</Label>
        <input
          id="issue-title"
          ref={titleRef}
          defaultValue={issue.title}
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ffc008]"
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="issue-description">Description</Label>
        <Textarea
          id="issue-description"
          ref={descriptionRef}
          defaultValue={issue.description ?? ""}
          rows={4}
          placeholder="Add a description..."
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-status">Status</Label>
          <Select
            id="issue-status"
            ref={statusRef}
            defaultValue={issue.status}
            options={STATUS_OPTIONS}
            aria-label="status"
            name="status"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-priority">Priority</Label>
          <Select
            id="issue-priority"
            ref={priorityRef}
            defaultValue={issue.priority}
            options={PRIORITY_OPTIONS}
            aria-label="priority"
            name="priority"
          />
        </div>
      </div>

      <Button onClick={handleSave} disabled={isInFlight} className="self-start">
        {isInFlight ? "Saving..." : "Save changes"}
      </Button>
    </section>
  )
}
