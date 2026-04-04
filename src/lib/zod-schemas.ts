import { z } from "zod";

export const IssueEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1),
  priority: z.string().min(1),
  assignee_id: z.string().uuid().nullable().optional(),
});

export const CommentSchema = z.object({
  body: z.string().min(1, "Comment cannot be empty"),
});

export type IssueEditInput = z.infer<typeof IssueEditSchema>;
export type CommentInput = z.infer<typeof CommentSchema>;
