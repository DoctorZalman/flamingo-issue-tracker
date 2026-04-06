export const STATUS_OPTIONS = [
  { value: "todo", label: "todo" },
  { value: "in_progress", label: "in progress" },
  { value: "done", label: "done" },
] as const;

export const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All statuses" },
  ...STATUS_OPTIONS,
] as const;

export const PRIORITY_OPTIONS = [
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" },
] as const;

export const PRIORITY_FILTER_OPTIONS = [
  { value: "", label: "All priorities" },
  ...PRIORITY_OPTIONS,
] as const;

// Default author for demo — first seed user
export const DEMO_AUTHOR_ID = "a1b2c3d4-0000-0000-0000-000000000001";
