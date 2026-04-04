export const ROUTES = {
  issues: "/issues",
  issue: (id: string) => `/issues/${id}`,
} as const;
