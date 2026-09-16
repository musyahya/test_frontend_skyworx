"use client";

import React, { PropsWithChildren } from "react";

export interface FormDashboardWrapperProps {
  title: string;
}

function FormDashboardWrapper({
  title,
  children,
}: PropsWithChildren<FormDashboardWrapperProps>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700 transition-colors duration-200 dark:text-slate-300">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default FormDashboardWrapper;