import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <span className="text-6xl">🦩</span>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-gray-500 dark:text-gray-400 text-center">
        This page does not exist or has been moved.
      </p>
      <Link
        href={ROUTES.issues}
        className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
      >
        Back to Issues
      </Link>
    </main>
  );
}
