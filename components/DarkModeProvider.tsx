"use client";

import { useState, useEffect, ReactNode } from "react";

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 p-2 border rounded z-50 bg-white dark:bg-gray-800"
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
      {children}
    </div>
  );
}
