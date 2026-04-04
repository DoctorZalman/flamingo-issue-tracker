# 🦩 Flamingo Issue Tracker

A minimal issue tracker built as a take-home assignment for Flamingo.

## Tech Stack

| Layer      | Technology                            |
| ---------- | ------------------------------------- |
| Framework  | Next.js 16 (App Router)               |
| Data layer | Relay + Supabase GraphQL (pg_graphql) |
| Language   | TypeScript (strict mode)              |
| Styling    | Tailwind CSS v4                       |
| Validation | Zod v4                                |
| Real-time  | Supabase Realtime                     |
| Testing    | Vitest + Testing Library              |

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/DoctorZalman/flamingo-issue-tracker.git
cd flamingo-issue-tracker
yarn install
```

### 2. Configure Supabase

Create a Supabase project at [supabase.com](https://supabase.com) and enable the `pg_graphql` extension under **Database → Extensions**.

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run database migrations

Execute the SQL in `supabase/migrations.sql` in your Supabase **SQL Editor**.

### 4. Introspect GraphQL schema

```bash
npx get-graphql-schema \
  -h "apikey=YOUR_ANON_KEY" \
  -h "Authorization=Bearer YOUR_ANON_KEY" \
  "https://YOUR_PROJECT_REF.supabase.co/graphql/v1" \
  > schema.graphql
```

### 5. Run

```bash
yarn dev
```

This runs Next.js and the Relay compiler in watch mode concurrently.

### 6. Test

```bash
yarn test:run
```

---

## Relay + pg_graphql

This was the hardest part of the assignment. pg_graphql generates a schema with conventions that conflict with Relay's expectations out of the box.

### Problems & Solutions

| Problem                                                 | Solution                                                                                                          |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Relay expects `id: ID!` as global identifier            | pg_graphql uses `nodeId: ID!` — configured via `schemaConfig.nodeInterfaceIdField: 'nodeId'` in `relay.config.js` |
| Relay store uses `nodeId`, Realtime payloads use UUID   | Maintained a `Map<uuid, nodeId>` seeded from initial query load                                                   |
| `graphql@17` peer conflict                              | Pinned `graphql@^16.13.2` — relay-runtime@20 does not support v17                                                 |
| Turbopack ignores Babel transforms                      | Always run `next dev` without Turbopack                                                                           |
| `Cursor` scalar causes strict mode errors               | Added `Cursor: 'string'` to `customScalarTypes` in `relay.config.js`                                              |
| Non-nullable `Int!` cannot have `defaultValue` in Relay | Changed pagination argument to `Int` (nullable)                                                                   |

### Key config — `relay.config.js`

```js
module.exports = {
  schemaConfig: {
    nodeInterfaceIdField: "nodeId",
    nodeInterfaceIdVariableName: "nodeId",
  },
  customScalarTypes: {
    UUID: "string",
    Datetime: "string",
    Cursor: "string",
  },
}
```

### Key config — `getDataID` override in `environment.ts`

```ts
getDataID: (node) => {
  if (typeof node.nodeId === "string") return node.nodeId
  return node.id as string
}
```

Every fragment includes `nodeId` as the Relay record identity key.

---

## Architecture Decisions

**Fragment co-location** — each component owns its data requirements via a Relay fragment. `IssueDetail`, `IssueEditForm`, and `CommentThread` each have their own fragment spread from the parent query. This makes components self-contained and easy to refactor.

**Uncontrolled inputs with refs** — `IssueEditForm` and `CommentThread` use `useRef` instead of `useState` for form fields to avoid re-renders on every keystroke. Zod validates on submit only.

**Optimistic updates** — `StatusSelector` uses `optimisticResponse` so the UI reflects the change instantly. On error, Relay reverts the store and a toast notifies the user.

**Realtime via `commitLocalUpdate`** — instead of refetching the entire query on each Supabase Realtime event, changes are written directly to the Relay store. INSERT creates a new record and prepends an edge to the connection. UPDATE patches fields on the existing record. DELETE removes the edge from the connection.

**Singleton Relay environment** — a single environment instance is shared across the app to ensure the store is consistent.

**Shared UI components** — `Button`, `Select`, `Textarea`, `Label`, `Badge`, `Avatar`, `Container` are extracted as reusable primitives with consistent dark mode and focus styles. Focus ring color and brand accent use `#ffc008` throughout.

**Route constants** — all internal routes are defined in `src/lib/routes.ts` to avoid hardcoded strings across the codebase.

**Dark mode** — class-based (`darkMode: 'class'`) with a blocking inline script in `layout.tsx` to apply the saved theme before hydration, preventing flash.

---

## Testing

Unit tests are written with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).

```bash
yarn test        # watch mode
yarn test:run    # single run
```

**Coverage includes:**

- `IssueEditSchema` and `CommentSchema` — Zod validation logic
- `Badge` — label rendering, custom and default colors
- `Avatar` — image rendering, initials fallback
- `Select` — options rendering, onChange, disabled state
- `IssueFilters` — status and priority callbacks

Tests run automatically on `git push` via Husky.

---

## Trade-offs & What I'd Do Differently

**Authentication** — the app uses permissive anon RLS policies for demo purposes. In production, proper auth (Supabase Auth + row-level policies per user) would be required.

**Create issue flow** — there is no UI to create new issues. With more time I'd add a modal or inline form with optimistic insert into the Relay connection.

**Label filtering** — currently client-side only. A proper implementation would pass label IDs as GraphQL filter variables to the server.

**Optimistic INSERT** — new issues from other tabs appear via Realtime, but locally created issues don't use optimistic insert. This would require generating a temporary `nodeId` on the client before the server responds.

**Test coverage** — tests cover UI primitives and validation schemas. With more time I'd add Relay mock environment tests for data components (`IssueList`, `StatusSelector`) and integration tests for the realtime hook.

**Pagination UX** — "Load more" button works but infinite scroll with an `IntersectionObserver` would be a better UX pattern for this type of list.

**Error handling** — the Error Boundary catches render errors but network errors during mutations only show a toast. A more robust solution would include retry logic and per-field error states from the server.

**Accessibility** — basic semantic HTML and aria labels are in place. A full audit would include keyboard navigation for the status dropdown, focus trapping in any modals, and screen reader testing.
