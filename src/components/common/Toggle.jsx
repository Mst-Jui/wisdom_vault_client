"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        background: isDark
          ? "linear-gradient(#0f0a1e, #0f0a1e) padding-box, linear-gradient(to right, #622ad8, #a8258e) border-box"
          : "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(to right, #622ad8, #a8258e) border-box",
        border: "2px solid transparent",
      }}
      className="relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300"
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-yellow-400">
        <Sun size={13} />
      </span>
      <span className="absolute right-1.5 text-slate-400">
        <Moon size={13} />
      </span>

      {/* Sliding thumb */}
      <span
        style={{
          background: isDark
            ? "linear-gradient(to right, #622ad8, #a8258e)"
            : "linear-gradient(to right, #622ad8, #a8258e)",
        }}
        className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full shadow transition-transform duration-300 text-white
          ${isDark ? "translate-x-7" : "translate-x-1"}`}
      >
        {isDark ? <Moon size={11} /> : <Sun size={11} />}
      </span>
    </button>
  );
}