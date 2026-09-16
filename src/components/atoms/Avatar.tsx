"use client";

import React from "react";

interface AvatarProps {
  name: string;
  isLoading?: boolean;
}

function Avatar({ name, isLoading = false }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  if (isLoading) {
    return <AvatarSkeleton />;
  }

  return (
    <div className="flex items-center gap-3 border-l border-slate-200 pl-4 transition-colors duration-200 dark:border-slate-800">
      {/* Circle Avatar dengan Gradien */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-sm">
        {initials}
      </div>
      {/* Teks Nama Pengguna Adaptif */}
      <span className="hidden text-sm font-medium text-slate-700 transition-colors duration-200 dark:text-slate-200 sm:inline-block">
        {name}
      </span>
    </div>
  );
}

export default Avatar;

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center gap-3 border-l border-slate-200 pl-4 transition-colors duration-200 dark:border-slate-800">
      <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="hidden h-3 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 sm:block" />
    </div>
  );
};