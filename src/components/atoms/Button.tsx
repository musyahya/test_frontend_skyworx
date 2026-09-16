"use client";

import cn from "@/src/lib/cn";
import React, { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  color?: "primary" | "success" | "warning" | "danger";
}

function Button({
  children,
  startIcon,
  className,
  color = "primary",
  type = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const colorStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500 shadow-indigo-500/20 dark:shadow-indigo-600/30",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500 shadow-emerald-500/20 dark:shadow-emerald-600/30",
    warning:
      "bg-amber-500 text-white hover:bg-amber-400 focus:ring-amber-500 shadow-amber-500/20 dark:shadow-amber-500/30",
    danger:
      "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500 shadow-rose-500/20 dark:shadow-rose-600/30",
  };

  return (
    <button
      type={type}
      suppressHydrationWarning
      className={cn(
        "cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        colorStyles[color],
        className
      )}
      {...props}
    >
      {startIcon && (
        <span className="flex shrink-0 items-center justify-center">
          {startIcon}
        </span>
      )}
      {children}
    </button>
  );
}

export default Button;