"use client";

import React, { PropsWithChildren } from "react";
import Sidebar from "../organisms/Navbar";

function DashboardTemplate({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 font-sans">
      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Top Bar / Sidebar Navigation */}
        <Sidebar />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardTemplate;