"use client";

import { useTheme } from "@/src/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import React from "react";

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm hover:bg-slate-100 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      title="Ganti Tema"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-indigo-600 dark:text-indigo-400" />
      )}
    </button>
  );
}

export default ToggleTheme;
