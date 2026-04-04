import { describe, it, expect } from "vitest";
import { IssueEditSchema, CommentSchema } from "@/lib/zod-schemas";

describe("IssueEditSchema", () => {
  it("passes with valid data", () => {
    const result = IssueEditSchema.safeParse({
      title: "Fix login bug",
      status: "todo",
      priority: "high",
    });
    expect(result.success).toBe(true);
  });

  it("fails when title is empty", () => {
    const result = IssueEditSchema.safeParse({
      title: "",
      status: "todo",
      priority: "high",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Title is required");
  });

  it("fails when title is missing", () => {
    const result = IssueEditSchema.safeParse({
      status: "todo",
      priority: "high",
    });
    expect(result.success).toBe(false);
  });

  it("passes with optional description", () => {
    const result = IssueEditSchema.safeParse({
      title: "Fix bug",
      description: "Some description",
      status: "todo",
      priority: "medium",
    });
    expect(result.success).toBe(true);
  });

  it("passes with nullable assignee_id", () => {
    const result = IssueEditSchema.safeParse({
      title: "Fix bug",
      status: "todo",
      priority: "low",
      assignee_id: null,
    });
    expect(result.success).toBe(true);
  });
});

describe("CommentSchema", () => {
  it("passes with valid body", () => {
    const result = CommentSchema.safeParse({ body: "This is a comment" });
    expect(result.success).toBe(true);
  });

  it("fails when body is empty", () => {
    const result = CommentSchema.safeParse({ body: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Comment cannot be empty");
  });

  it("fails when body is missing", () => {
    const result = CommentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
