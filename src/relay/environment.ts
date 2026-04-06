import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchFn = async (
  request: { text?: string | null },
  variables: Record<string, unknown>
): Promise<unknown> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
    body: JSON.stringify({ query: request.text, variables }),
    cache: "no-store",
  });
  return response.json();
};

// Singleton environment instance
let environment: InstanceType<typeof Environment> | null = null;

export function createEnvironment(): InstanceType<typeof Environment> {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
    // Maps pg_graphql nodeId to Relay's global record identity
    getDataID: (node: Record<string, unknown>) => {
      if (typeof node.nodeId === "string") return node.nodeId;
      return node.id as string;
    },
  });
}

export function getEnvironment(): InstanceType<typeof Environment> {
  // Always create fresh environment on server to avoid stale cache
  if (typeof window === "undefined") {
    return createEnvironment();
  }

  // Singleton on client for optimistic updates
  if (!environment) environment = createEnvironment();
  return environment;
}
export function resetEnvironment(): void {
  environment = null;
}
