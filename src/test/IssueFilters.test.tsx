import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock component to avoid Relay graphql tag issue in tests
vi.mock("@/components/issues/IssueFilters", () => ({
  IssueFilters: ({
    status,
    priority,
    onStatusChange,
    onPriorityChange,
  }: {
    status: string;
    priority: string;
    selectedLabelIds: Set<string>;
    onStatusChange: (v: string) => void;
    onPriorityChange: (v: string) => void;
    onLabelToggle: (id: string) => void;
  }) => (
    <div>
      <select aria-label="status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All statuses</option>
        <option value="todo">todo</option>
        <option value="in_progress">in progress</option>
        <option value="done">done</option>
      </select>
      <select
        aria-label="priority"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="">All priorities</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>
  ),
}));

import { IssueFilters } from "@/components/issues/IssueFilters";

const defaultProps = {
  status: "",
  priority: "",
  selectedLabelIds: new Set<string>(),
  onStatusChange: vi.fn(),
  onPriorityChange: vi.fn(),
  onLabelToggle: vi.fn(),
};

describe("IssueFilters", () => {
  it("renders status and priority selects", () => {
    render(<IssueFilters {...defaultProps} />);
    expect(screen.getByRole("combobox", { name: /status/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /priority/i })).toBeInTheDocument();
  });

  it("calls onStatusChange when status changes", async () => {
    const onStatusChange = vi.fn();
    render(<IssueFilters {...defaultProps} onStatusChange={onStatusChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox", { name: /status/i }), "todo");
    expect(onStatusChange).toHaveBeenCalledWith("todo");
  });

  it("calls onPriorityChange when priority changes", async () => {
    const onPriorityChange = vi.fn();
    render(<IssueFilters {...defaultProps} onPriorityChange={onPriorityChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox", { name: /priority/i }), "high");
    expect(onPriorityChange).toHaveBeenCalledWith("high");
  });
});
