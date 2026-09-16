"use client";

import cn from "@/src/lib/cn";
import React, { SelectHTMLAttributes } from "react";

export interface DropdownOption {
  label: string;
  value: string | number;
  className?: string;
}

export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
}

function Dropdown({ options, className, ...props }: DropdownProps) {
  return (
    <select
      {...props}
      suppressHydrationWarning
      className={cn(
        "cursor-pointer rounded-xl border text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
        // Light Mode Default
        "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
        // Dark Mode Default
        "dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800/80",
        "px-4 py-2.5",
        className
      )}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={cn(
            "bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100",
            option.className
          )}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;