"use client";

import React, { useState, useMemo } from "react";
import TextField from "../components/atoms/InputField";
import Button from "../components/atoms/Button";
import { Plus } from "lucide-react";
import Dropdown from "../components/atoms/Dropdown";
import { todoStatusOptions } from "../lib/options";

// --- Types ---
type Status = "todo" | "inprogress" | "done";

interface Todo {
  id: string;
  title: string;
  status: Status;
}

export default function DashboardPage() {
  // --- States ---
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Review pull request dashboard POS",
      status: "todo",
    },
    {
      id: "2",
      title: "Integrasi Mapbox & React Query DevTools",
      status: "inprogress",
    },
    {
      id: "3",
      title: "Beli kebutuhan rumah & bahan dapur",
      status: "done",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Form State
  const [newTitle, setNewTitle] = useState("");

  // --- Handlers ---
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTitle,
      status: "todo",
    };

    setTodos([newTodo, ...todos]);
    setNewTitle("");
  };

  const updateStatus = (id: string, newStatus: Status) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // --- Filtered Data & Stats ---
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" ? true : todo.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [todos, searchQuery, selectedStatus]);

  const stats = useMemo(() => {
    const total = todos.length;
    const todoCount = todos.filter((t) => t.status === "todo").length;
    const inProgressCount = todos.filter((t) => t.status === "inprogress").length;
    const doneCount = todos.filter((t) => t.status === "done").length;
    return { total, todoCount, inProgressCount, doneCount };
  }, [todos]);

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* --- SIDEBAR --- */}
      <aside className="hidden w-64 border-r border-slate-800 bg-slate-900/50 p-6 md:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/30">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-white">TaskFlow</span>
        </div>

        <nav className="mt-8 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-semibold text-indigo-400 border border-indigo-500/20"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Tabel Todolist
          </a>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/30 px-6 backdrop-blur-md">
          <h1 className="text-lg font-bold text-white">Dashboard Todolist</h1>
          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
              US
            </div>
            <span className="text-sm font-medium text-slate-300 hidden sm:inline-block">Pengguna</span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* STATS CARDS */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Tugas</p>
              <p className="mt-1 text-2xl font-extrabold text-white">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">To Do</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-300">{stats.todoCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">In Progress</p>
              <p className="mt-1 text-2xl font-extrabold text-amber-400">{stats.inProgressCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Done</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-400">{stats.doneCount}</p>
            </div>
          </div>

          {/* FORM TAMBAH TUGAS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
              Tambah Tugas Baru
            </h2>
            <form onSubmit={handleAddTodo} className="flex flex-col gap-3 sm:flex-row">
              <TextField
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tuliskan tugas yang akan dikerjakan..."
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  startIcon={<Plus size={14}/>}
                >
                  Tambah
                </Button>
              </div>
            </form>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tugas..."
              />
            </div>

            <div className="flex gap-2">
              {/* Filter Status */}
              <Dropdown
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={todoStatusOptions}
                />
            </div>
          </div>

          {/* TODOLIST TABLE SECTION */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-900/80 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">Nama Tugas</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTodos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        Tidak ada tugas yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredTodos.map((todo) => (
                      <tr
                        key={todo.id}
                        className="hover:bg-slate-900/60 transition-colors"
                      >
                        {/* Judul Tugas */}
                        <td className="px-6 py-4 font-medium text-slate-200">
                          <span
                            className={
                              todo.status === "done"
                                ? "line-through text-slate-500"
                                : ""
                            }
                          >
                            {todo.title}
                          </span>
                        </td>

                        {/* Status dropdown */}
                        <td className="px-6 py-4">
                          {/* <select
                            value={todo.status}
                            onChange={(e) =>
                              updateStatus(todo.id, e.target.value as Status)
                            }
                            suppressHydrationWarning
                            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                              todo.status === "done"
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : todo.status === "inprogress"
                                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                                : "border-slate-700 bg-slate-950 text-slate-300"
                            }`}
                          >
                            <option value="todo" className="bg-slate-900 text-slate-300">To Do</option>
                            <option value="inprogress" className="bg-slate-900 text-amber-400">In Progress</option>
                            <option value="done" className="bg-slate-900 text-emerald-400">Done</option>
                          </select> */}

                          <Dropdown
                            options={todoStatusOptions}
                            value={todo.status}
                            onChange={(e) =>
                              updateStatus(todo.id, e.target.value as Status)
                            }
                          />
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            suppressHydrationWarning
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Hapus Tugas"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}