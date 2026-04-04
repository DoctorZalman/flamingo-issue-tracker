"use client"

import { useFragment, useMutation, useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { IssueEditSchema } from "@/lib/zod-schemas"
import { Select } from "@/components/ui/Select"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"

import type { IssueEditForm_issue$key } from "@/__generated__/IssueEditForm_issue.graphql"
import type { IssueEditForm_issue$data } from "@/__generated__/IssueEditForm_issue.graphql"
import type { IssueEditFormQuery$data } from "@/__generated__/IssueEditFormQuery.graphql"

type LabelEdge = NonNullable<IssueEditForm_issue$data["issue_labelsCollection"]>["edges"][number]
type UserEdge = NonNullable<IssueEditFormQuery$data["usersCollection"]>["edges"][number]
type AllLabelEdge = NonNullable<IssueEditFormQuery$data["labelsCollection"]>["edges"][number]

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
    id
    title
    description
    status
    priority
    assignee_id
    issue_labelsCollection {
      edges {
        node {
          label_id
        }
      }
    }
  }
`

const updateMutation = graphql`
  mutation IssueEditFormUpdateMutation(
    $nodeId: ID!
    $title: String!
    $description: String
    $status: String!
    $priority: String!
    $assigneeId: UUID
  ) {
    updateissuesCollection(
      filter: { nodeId: { eq: $nodeId } }
      set: {
        title: $title
        description: $description
        status: $status
        priority: $priority
        assignee_id: $assigneeId
      }
    ) {
      records {
        nodeId
        title
        description
        status
        priority
        assignee_id
      }
    }
  }
`

const deleteLabelsMutation = graphql`
  mutation IssueEditFormDeleteLabelsMutation($issueId: UUID!) {
    deleteFromissue_labelsCollection(filter: { issue_id: { eq: $issueId } }) {
      records {
        issue_id
        label_id
      }
    }
  }
`

const insertLabelsMutation = graphql`
  mutation IssueEditFormInsertLabelsMutation($objects: [issue_labelsInsertInput!]!) {
    insertIntoissue_labelsCollection(objects: $objects) {
      records {
        issue_id
        label_id
      }
    }
  }
`

const usersAndLabelsQuery = graphql`
  query IssueEditFormQuery {
    usersCollection {
      edges {
        node {
          id
          name
        }
      }
    }
    labelsCollection {
      edges {
        node {
          id
          name
          color
        }
      }
    }
  }
`

export function IssueEditForm({ issueRef }: { issueRef: IssueEditForm_issue$key }) {
  const issue = useFragment(fragment, issueRef)
  const [commitUpdate, isUpdating] = useMutation(updateMutation)
  const [commitDeleteLabels] = useMutation(deleteLabelsMutation)
  const [commitInsertLabels] = useMutation(insertLabelsMutation)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)

  const markDirty = () => setIsDirty(true)

  const data = useLazyLoadQuery(usersAndLabelsQuery, {})

  const users = data.usersCollection?.edges ?? []
  const allLabels = data.labelsCollection?.edges ?? []

  const currentLabelIds = new Set<string>(
    issue.issue_labelsCollection?.edges.map((e: LabelEdge) => e.node.label_id as string) ?? []
  )
  const [selectedLabelIds, setSelectedLabelIds] = useState<Set<string>>(currentLabelIds)

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)
  const priorityRef = useRef<HTMLSelectElement>(null)
  const assigneeRef = useRef<HTMLSelectElement>(null)

  const toggleLabel = (labelId: string) => {
    setIsDirty(true)
    setSelectedLabelIds((prev) => {
      const next = new Set(prev)
      if (next.has(labelId)) {
        next.delete(labelId)
      } else {
        next.add(labelId)
      }
      return next
    })
  }

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

    const assigneeId = assigneeRef.current?.value || null

    commitUpdate({
      variables: {
        nodeId: issue.nodeId,
        ...result.data,
        assigneeId,
      },
      onCompleted: () => {
        setIsDirty(false)
        // Update labels after issue update succeeds
        commitDeleteLabels({
          variables: { issueId: issue.id },
          onCompleted: () => {
            if (selectedLabelIds.size === 0) {
              toast.success("Issue updated")
              return
            }
            commitInsertLabels({
              variables: {
                objects: Array.from(selectedLabelIds).map((labelId) => ({
                  issue_id: issue.id,
                  label_id: labelId,
                })),
              },
              onCompleted: () => toast.success("Issue updated"),
              onError: () => toast.error("Failed to update labels"),
            })
          },
          onError: () => toast.error("Failed to update labels"),
        })
      },
      onError: () => toast.error("Failed to update issue"),
    })
  }

  const userOptions = [
    { value: "", label: "Unassigned" },
    ...users.map((e: UserEdge) => ({ value: e.node.id, label: e.node.name })),
  ]

  return (
    <section aria-label="Edit issue" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="issue-title">Title</Label>
        <input
          id="issue-title"
          ref={titleRef}
          defaultValue={issue.title}
          onChange={markDirty}
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
          onChange={markDirty}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-status">Status</Label>
          <Select
            id="issue-status"
            name="status"
            ref={statusRef}
            defaultValue={issue.status}
            options={STATUS_OPTIONS}
            onChange={markDirty}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-priority">Priority</Label>
          <Select
            id="issue-priority"
            name="priority"
            ref={priorityRef}
            defaultValue={issue.priority}
            options={PRIORITY_OPTIONS}
            onChange={markDirty}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-assignee">Assignee</Label>
          <Select
            id="issue-assignee"
            name="assignee"
            ref={assigneeRef}
            defaultValue={issue.assignee_id ?? ""}
            options={userOptions}
            onChange={markDirty}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Labels</Label>
        <div className="flex flex-wrap gap-2">
          {allLabels.map((edge: AllLabelEdge) => {
            const label = edge.node
            const selected = selectedLabelIds.has(label.id)
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className="text-xs px-3 py-1 rounded-full border-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: selected ? label.color : "transparent",
                  borderColor: label.color,
                  color: selected ? "#fff" : label.color,
                }}
              >
                {label.name}
              </button>
            )
          })}
        </div>
      </div>

      <Button onClick={handleSave} disabled={isUpdating || !isDirty} className="self-start">
        {isUpdating ? "Saving..." : "Save changes"}
      </Button>
    </section>
  )
}
