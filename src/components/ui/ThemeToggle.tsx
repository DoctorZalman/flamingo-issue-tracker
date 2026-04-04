"use client";

import { useState } from "react";

function getInitialDark(): boolean {
  if (typeof window === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#ffc008] hover:bg-[#ffc008]/10 transition-colors cursor-pointer"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
