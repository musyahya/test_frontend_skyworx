"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/30 px-6 backdrop-blur-md">
      <h1 className="text-lg font-bold text-white">Dashboard Todolist</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
            US
          </div>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline-block">
            Pengguna
          </span>
        </div>

        <button
          onClick={handleLogout}
          suppressHydrationWarning
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
          title="Keluar dari Akun"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline-block">Keluar</span>
        </button>
      </div>
    </header>
  );
}

export default Sidebar;
