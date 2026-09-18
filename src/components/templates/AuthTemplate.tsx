"use client";

import { useTheme } from "@/src/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import React, { PropsWithChildren } from "react";
import ToggleTheme from "../atoms/ToggleTheme";

interface AuthTemplateProps {
  header: string;
}

function AuthTemplate({
  children,
  header,
}: PropsWithChildren<AuthTemplateProps>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-600/20" />
      </div>

      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20">
        <ToggleTheme />
      </div>

      {/* Card Konten Form */}
      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-2xl">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {header}
          </h2>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthTemplate;
