"use client";

import React, { PropsWithChildren } from "react";

interface FormDashboardWrapper {
  title: string;
}

function FormDashboardWrapper({
  title,
  children,
}: PropsWithChildren<FormDashboardWrapper>) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default FormDashboardWrapper;
