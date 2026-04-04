"use client"

const STATUS_OPTIONS = ["", "todo", "in_progress", "done"] as const
const PRIORITY_OPTIONS = ["", "low", "medium", "high"] as const

interface IssueFiltersProps {
  status: string
  priority: string
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
}

export function IssueFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: IssueFiltersProps) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="text-sm border border-gray-200 rounded px-3 py-1.5 bg-white"
      >
        <option value="">All statuses</option>
        {STATUS_OPTIONS.filter(Boolean).map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="text-sm border border-gray-200 rounded px-3 py-1.5 bg-white"
      >
        <option value="">All priorities</option>
        {PRIORITY_OPTIONS.filter(Boolean).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  )
}
