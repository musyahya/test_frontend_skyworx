"use client";

import React from "react";
import Dropdown from "../atoms/Dropdown";
import useFilter from "@/src/stores/useFilter";
import TextField from "../atoms/TextField";
import options from "@/src/lib/options";
import { TodoType } from "@/src/types/todo";

function FilterDashboard() {
  const { filter, setFilter } = useFilter();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <TextField
            value={filter.search}
            onChange={(e) => {
              setFilter({ search: e.target.value, offset: 0 });
            }}
            placeholder="Cari tugas..."
          />
        </div>

        <div className="flex gap-2">
          <Dropdown
            value={filter.limit}
            onChange={(e) => {
              setFilter({ limit: Number(e.target.value), offset: 0 });
            }}
            options={options.perPage}
          />
          <Dropdown
            value={filter.status}
            onChange={(e) => {
              setFilter({ status: e.target.value as TodoType, offset: 0 });
            }}
            options={options.todoStatusFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterDashboard;
