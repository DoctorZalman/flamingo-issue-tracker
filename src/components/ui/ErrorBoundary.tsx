"use client";

import { Component } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

// Class component required — React error boundaries cannot be function components
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
            {this.state.message}
          </p>
          <Link
            href={ROUTES.issues}
            className="px-4 py-2 bg-[#ffc008] hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
          >
            Back to Issues
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
