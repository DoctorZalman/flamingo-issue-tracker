import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Avatar } from "@/components/ui/Avatar"

describe("Avatar", () => {
  it("renders name", () => {
    render(<Avatar name="Alice Johnson" />)
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
  })

  it("renders image when avatarUrl provided", () => {
    render(<Avatar name="Alice" avatarUrl="https://example.com/avatar.jpg" />)
    const img = screen.getByRole("img", { name: "Alice" })
    expect(img).toBeInTheDocument()
  })

  it("renders initials fallback when no avatarUrl", () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByText("A")).toBeInTheDocument()
  })

  it("renders uppercase initial", () => {
    render(<Avatar name="bob" />)
    expect(screen.getByText("B")).toBeInTheDocument()
  })
})
