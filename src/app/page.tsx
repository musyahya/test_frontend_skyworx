"use client";

import React, { useState, useMemo } from "react";

// --- Types ---
type Priority = "Low" | "Medium" | "High";
type Category = "Work" | "Personal" | "Urgent";

interface Todo {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  dueDate: string;
}

export default function DashboardPage() {
  // --- States ---
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Review pull request dashboard POS",
      category: "Work",
      priority: "High",
      completed: false,
      dueDate: "Hari ini",
    },
    {
      id: "2",
      title: "Integrasi Mapbox & React Query DevTools",
      category: "Work",
      priority: "Medium",
      completed: true,
      dueDate: "Kemarin",
    },
    {
      id: "3",
      title: "Beli kebutuhan rumah & bahan dapur",
      category: "Personal",
      priority: "Low",
      completed: false,
      dueDate: "Besok",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "completed">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("Work");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");

  // --- Handlers ---
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      completed: false,
      dueDate: "Hari ini",
    };

    setTodos([newTodo, ...todos]);
    setNewTitle("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // --- Filtered Data & Stats ---
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all"
          ? true
          : selectedStatus === "completed"
          ? todo.completed
          : !todo.completed;
      const matchesCategory =
        selectedCategory === "all" ? true : todo.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [todos, searchQuery, selectedStatus, selectedCategory]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
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
            Semua Tugas
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Kalender
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            Pengaturan
          </a>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        {/* Header Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/30 px-6 backdrop-blur-md">
          <h1 className="text-lg font-bold text-white">Dashboard Tugas</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
                US
              </div>
              <span className="text-sm font-medium text-slate-300 hidden sm:inline-block">Pengguna</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Tugas</p>
              <p className="mt-2 text-3xl font-extrabold text-white">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Belum Selesai</p>
              <p className="mt-2 text-3xl font-extrabold text-indigo-400">{stats.active}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Selesai</p>
              <p className="mt-2 text-3xl font-extrabold text-emerald-400">{stats.completed}</p>
            </div>
          </div>

          {/* FORM TAMBAH TUGAS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
              Tambah Tugas Baru
            </h2>
            <form onSubmit={handleAddTodo} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tuliskan tugas yang akan dikerjakan..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="flex gap-2">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Category)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Work">Pekerjaan</option>
                  <option value="Personal">Pribadi</option>
                  <option value="Urgent">Penting</option>
                </select>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as Priority)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all whitespace-nowrap"
                >
                  + Tambah
                </button>
              </div>
            </form>
          </div>

          {/* FILTER & SEARCH BAR */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tugas..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedStatus === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedStatus("active")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedStatus === "active"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Aktif
              </button>
              <button
                onClick={() => setSelectedStatus("completed")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedStatus === "completed"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Selesai
              </button>
            </div>
          </div>

          {/* DAFTAR TUGAS */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 py-12 text-center text-sm text-slate-500">
                Tidak ada tugas yang sesuai dengan kriteria.
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                    todo.completed
                      ? "border-slate-800/50 bg-slate-950/40 opacity-60"
                      : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                    {/* Checkbox Custom */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                        todo.completed
                          ? "border-emerald-500 bg-emerald-500 text-slate-950"
                          : "border-slate-700 hover:border-indigo-500"
                      }`}
                    >
                      {todo.completed && (
                        <svg className="h-4 w-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Judul Tugas */}
                    <span
                      onClick={() => toggleTodo(todo.id)}
                      className={`cursor-pointer truncate text-sm font-medium ${
                        todo.completed ? "line-through text-slate-500" : "text-slate-200"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* Badges & Action */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Badge Category */}
                    <span className="hidden sm:inline-block rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
                      {todo.category}
                    </span>

                    {/* Badge Priority */}
                    <span
                      className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        todo.priority === "High"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : todo.priority === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {todo.priority}
                    </span>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Hapus"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}