import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Select } from "@/components/ui/Select"

const OPTIONS = [
  { value: "todo", label: "todo" },
  { value: "in_progress", label: "in progress" },
  { value: "done", label: "done" },
]

describe("Select", () => {
  it("renders all options", () => {
    render(<Select options={OPTIONS} />)
    expect(screen.getByRole("option", { name: "todo" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "in progress" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "done" })).toBeInTheDocument()
  })

  it("calls onChange when selection changes", async () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} value="todo" onChange={onChange} />)
    await userEvent.selectOptions(screen.getByRole("combobox"), "done")
    expect(onChange).toHaveBeenCalled()
  })

  it("is disabled when disabled prop is true", () => {
    render(<Select options={OPTIONS} disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("shows correct selected value", () => {
    render(<Select options={OPTIONS} value="in_progress" onChange={vi.fn()} />)
    expect(screen.getByRole("combobox")).toHaveValue("in_progress")
  })
})
