import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <nav
        className="max-w-4xl mx-auto px-8 py-3 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/issues"
          className="font-semibold text-gray-900 dark:text-white hover:opacity-75 transition-opacity"
        >
          🦩 Flamingo
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
