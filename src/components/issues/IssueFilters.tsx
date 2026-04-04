"use client"

interface IssueFiltersProps {
  status: string
  priority: string
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
}
import { Select } from "@/components/ui/Select"

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "todo", label: "todo" },
  { value: "in_progress", label: "in progress" },
  { value: "done", label: "done" },
]

const PRIORITY_OPTIONS = [
  { value: "", label: "All priorities" },
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" },
]

export function IssueFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: IssueFiltersProps) {
  return (
    <div className="flex gap-3 mb-4">
      <Select
        value={status}
        options={STATUS_OPTIONS}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="status"
        name="status"
      />
      <Select
        value={priority}
        options={PRIORITY_OPTIONS}
        onChange={(e) => onPriorityChange(e.target.value)}
        aria-label="priority"
        name="priority"
      />
    </div>
  )
}
