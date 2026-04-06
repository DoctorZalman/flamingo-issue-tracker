"use client";

import { useEffect, useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getEnvironment, resetEnvironment } from "./environment";
import type { Environment } from "relay-runtime";

export function RelayProvider({ children }: { children: React.ReactNode }) {
  const [environment] = useState<InstanceType<typeof Environment>>(getEnvironment);

  useEffect(() => {
    return () => {
      // Reset environment on unmount to clear stale cache
      resetEnvironment();
    };
  }, []);

  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
}
