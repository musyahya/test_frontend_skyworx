"use client";

import cn from "@/src/lib/cn";
import React, { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "primary" | "success" | "warning" | "danger";
}

function Badge({
  children,
  className,
  color = "primary",
  ...props
}: PropsWithChildren<BadgeProps>) {
  // Peta warna yang selaras dengan varian warna komponen Button
  const colorStyles = {
    primary:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/60 shadow-indigo-500/5",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60 shadow-emerald-500/5",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60 shadow-amber-500/5",
    danger:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60 shadow-rose-500/5",
  };

  return (
    <span
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-200",
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;