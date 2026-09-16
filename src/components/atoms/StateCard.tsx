"use client";

import cn from "@/src/lib/cn";
import React from "react";

export interface StateCardProps {
  total: number;
  color: "white" | "gray" | "success" | "warning" | "danger";
  title: string;
  isLoading?: boolean;
}

function StateCard({ total, color, title, isLoading = false }: StateCardProps) {
  if (isLoading) {
    return <StateCardSkeleton />;
  }

  const textColorStyles = {
    white: "text-slate-900 dark:text-white",
    gray: "text-slate-600 dark:text-slate-400",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-rose-600 dark:text-rose-400",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
      {/* Title */}
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wider",
          textColorStyles[color]
        )}
      >
        {title}
      </p>

      {/* Total Number */}
      <p
        className={cn(
          "mt-2 text-2xl font-extrabold tracking-tight",
          textColorStyles[color]
        )}
      >
        {total}
      </p>
    </div>
  );
}

export default StateCard;

const StateCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-6 w-1/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
  );
};