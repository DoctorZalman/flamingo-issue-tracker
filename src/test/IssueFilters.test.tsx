import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { IssueFilters } from "@/components/issues/IssueFilters"

describe("IssueFilters", () => {
  const defaultProps = {
    status: "",
    priority: "",
    selectedLabelIds: new Set<string>(),
    onStatusChange: vi.fn(),
    onPriorityChange: vi.fn(),
    onLabelToggle: vi.fn(),
  }

  it("renders status and priority selects", () => {
    render(<IssueFilters {...defaultProps} />)
    expect(screen.getByRole("combobox", { name: /status/i })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: /priority/i })).toBeInTheDocument()
  })

  it("calls onStatusChange when status changes", async () => {
    const onStatusChange = vi.fn()
    render(<IssueFilters {...defaultProps} onStatusChange={onStatusChange} />)
    await userEvent.selectOptions(screen.getByRole("combobox", { name: /status/i }), "todo")
    expect(onStatusChange).toHaveBeenCalledWith("todo")
  })

  it("calls onPriorityChange when priority changes", async () => {
    const onPriorityChange = vi.fn()
    render(<IssueFilters {...defaultProps} onPriorityChange={onPriorityChange} />)
    await userEvent.selectOptions(screen.getByRole("combobox", { name: /priority/i }), "high")
    expect(onPriorityChange).toHaveBeenCalledWith("high")
  })
})
