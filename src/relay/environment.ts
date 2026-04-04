import { Environment, Network, RecordSource, Store } from "relay-runtime"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchFn = async (request: any, variables: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
    body: JSON.stringify({ query: request.text, variables }),
  })
  return response.json()
}

// Singleton environment instance
let environment: InstanceType<typeof Environment> | null = null

export function createEnvironment(): InstanceType<typeof Environment> {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
    // Maps pg_graphql nodeId to Relay's global record identity
    getDataID: (node: Record<string, unknown>) => {
      if (typeof node.nodeId === "string") return node.nodeId
      return node.id as string
    },
  })
}

export function getEnvironment(): InstanceType<typeof Environment> {
  if (!environment) environment = createEnvironment()
  return environment
}
