"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortKey?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: { data: T[]; total: number };
  limit: number;
  offset: number;
  sortTable?: boolean;
  onChangeSort?: (orderBy: string, order: "asc" | "desc") => void;
  onChangeOffset: (offset: number) => void;
  orderBy?: string;
  order?: "asc" | "desc";
  isLoading?: boolean;
}

function Table<T>({
  columns,
  data,
  limit = 20,
  offset = 0,
  sortTable = false,
  onChangeSort,
  onChangeOffset,
  orderBy,
  order,
  isLoading = false,
}: TableProps<T>) {
  const [currentOffset, setCurrentOffset] = useState(offset);

  useEffect(() => {
    setCurrentOffset(offset);
  }, [offset]);

  const totalData = data.total;
  const totalPages = Math.ceil(totalData / limit);
  const currentPageNumber = Math.floor(currentOffset / limit) + 1;

  const handleSort = (col: Column<T>) => {
    if (!sortTable) return;
    const sortKey =
      col.sortKey || (typeof col.accessor === "string" ? col.accessor : null);
    if (!sortKey) return;

    const isAsc = order === "asc" && orderBy === sortKey;
    onChangeSort?.(sortKey, isAsc ? "desc" : "asc");
  };

  const getPageNumbers = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPageNumber <= 2) return [1, 2, 3];
    if (currentPageNumber >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPageNumber - 1, currentPageNumber, currentPageNumber + 1];
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
            <tr>
              {columns.map((col) => {
                const isActiveSort = orderBy === (col.sortKey || col.accessor);
                return (
                  <th
                    key={col.header}
                    scope="col"
                    className="px-6 py-4 cursor-pointer select-none hover:text-slate-900 dark:hover:text-white transition-colors"
                    onClick={() => handleSort(col)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.header}</span>
                      {sortTable && col.sortKey && (
                        <>
                          {isActiveSort ? (
                            order === "asc" ? (
                              <ArrowUp size={14} />
                            ) : (
                              <ArrowDown size={14} />
                            )
                          ) : (
                            <ArrowUpDown size={14} className="opacity-40" />
                          )}
                        </>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
            {data.data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-400 dark:text-slate-500"
                >
                  Tidak ada tugas yang ditemukan.
                </td>
              </tr>
            ) : (
              data.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200"
                    >
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINASI BAR --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/80 px-6 py-4 text-xs text-slate-600 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
        {/* Info Rows */}
        <div className="flex items-center gap-4">
          <span>
            Menampilkan {totalData === 0 ? 0 : currentOffset + 1} -{" "}
            {Math.min(currentOffset + limit, totalData)} dari {totalData} data
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => {
              const newOffset = currentOffset - limit;
              setCurrentOffset(newOffset);
              onChangeOffset(newOffset);
            }}
            disabled={currentOffset === 0}
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline-block">Sebelumnya</span>
          </button>

          {/* Number Buttons */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => {
                const newOffset = (pageNumber - 1) * limit;
                setCurrentOffset(newOffset);
                onChangeOffset(newOffset);
              }}
              className={`cursor-pointer h-8 w-8 rounded-xl text-xs font-bold transition-all border ${
                currentPageNumber === pageNumber
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => {
              const newOffset = currentOffset + limit;
              setCurrentOffset(newOffset);
              onChangeOffset(newOffset);
            }}
            disabled={currentOffset + limit >= totalData}
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Halaman Selanjutnya"
          >
            <span className="hidden sm:inline-block">Selanjutnya</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;

const SkeletonTable = () => (
  <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/60">
    <div className="flex gap-4">
      <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
    </div>
    {[1, 2, 3].map((item) => (
      <div key={item} className="flex gap-4 mt-8">
        <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-3 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    ))}
    <div className="flex gap-4 justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
      <div className="h-3 w-1/4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-3 w-1/4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
    </div>
  </div>
);