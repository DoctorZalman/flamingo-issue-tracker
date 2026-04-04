import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ROUTES } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur-sm">
      {" "}
      <nav
        className="max-w-4xl mx-auto px-4 py-2 md:px-6 md:py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href={ROUTES.issues}
          className="font-azeret font-semibold text-gray-900 dark:text-white hover:opacity-75 transition-opacity"
        >
          🦩 Flamingo Issue Tracker
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
