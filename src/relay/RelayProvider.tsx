"use client"

import { RelayEnvironmentProvider } from "react-relay"
import { getEnvironment } from "./environment"

export function RelayProvider({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={getEnvironment()}>{children}</RelayEnvironmentProvider>
  )
}
