"use client";

import React, { ReactNode } from "react";

interface AuthTemplate {
  children: ReactNode;
  header: string;
}

function AuthTemplate({ children, header }: AuthTemplate) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header & Switcher */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {header}
          </h2>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthTemplate;
