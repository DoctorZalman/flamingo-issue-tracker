import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders label", () => {
    render(<Badge label="bug" />);
    expect(screen.getByText("bug")).toBeInTheDocument();
  });

  it("applies custom color", () => {
    render(<Badge label="feature" color="#ef4444" />);
    const badge = screen.getByText("feature");
    expect(badge).toHaveStyle({ backgroundColor: "#ef4444" });
  });

  it("applies default color when not provided", () => {
    render(<Badge label="test" />);
    const badge = screen.getByText("test");
    expect(badge).toHaveStyle({ backgroundColor: "#6366f1" });
  });
});
