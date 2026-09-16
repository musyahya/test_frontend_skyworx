import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

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
  isLoading?: boolean
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
  isLoading = false
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

  if(isLoading){
    return <SkeletonTable/>
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-xs font-bold uppercase tracking-wider text-slate-400">
            <tr>
              {columns.map((col) => {
                const isActiveSort = orderBy === (col.sortKey || col.accessor);
                return (
                  <th
                    key={col.header}
                    scope="col"
                    className="px-6 py-4 cursor-pointer select-none hover:text-white transition-colors"
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
          <tbody className="divide-y divide-slate-800/60">
            {data.data.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  Tidak ada tugas yang ditemukan.
                </td>
              </tr>
            ) : (
              data.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-900/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className="px-6 py-4 font-medium text-slate-200"
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

      {/* --- PAGINASI BARU DENGAN MAKSIMAL 5 TOMBOL HALAMAN --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 px-6 py-4 bg-slate-900/80 text-xs text-slate-400">
        {/* Info & Pilihan Rows Per Page */}
        <div className="flex items-center gap-4">
          <span>
            Menampilkan {currentOffset + 1} -{" "}
            {Math.min(currentOffset + limit, totalData)} dari {data.total} data
          </span>
        </div>

        {/* Controls: Prev Button | 5 Numbered Buttons | Next Button */}
        <div className="flex items-center gap-1.5">
          {/* Tombol Kiri (Sebelumnya / Previous) */}
          <button
            onClick={() => {
              const newOffset = currentOffset - limit;
              setCurrentOffset(newOffset);
              onChangeOffset(newOffset);
            }}
            disabled={currentOffset === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline-block">Sebelumnya</span>
          </button>

          {/* Maksimal 5 Tombol Angka Halaman */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                const newOffset = (pageNumber - 1) * limit;
                setCurrentOffset(newOffset);
                onChangeOffset(newOffset);
              }}
              className={`h-8 w-8 rounded-xl text-xs font-bold transition-all border ${
                currentPageNumber === pageNumber
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Tombol Kanan (Selanjutnya / Next) */}
          <button
            onClick={() => {
              const newOffset = currentOffset + limit;
              setCurrentOffset(newOffset);
              onChangeOffset(newOffset);
            }}
            disabled={currentOffset + limit >= totalData}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
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
     <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
         <div className="flex gap-4">
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
            </div>
            <div className="flex gap-4 mt-10">
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
            </div>
            <div className="flex gap-4 mt-10">
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
            </div>
            <div className="flex gap-4 mt-10">
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/3 rounded-full bg-neutral-600 animate-pulse"/>
            </div>
            <div className="flex gap-4 justify-between mt-10">
              <div className="h-3 w-1/4 rounded-full bg-neutral-600 animate-pulse"/>
              <div className="h-3 w-1/4 rounded-full bg-neutral-600 animate-pulse"/>
            </div>
     </div>
) 