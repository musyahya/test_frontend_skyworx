"use client";

import { clearAuthCookie } from "@/src/lib/cookie";
import { useUserMe } from "@/src/queries/user";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Avatar from "../atoms/Avatar";

function Navbar() {
  const router = useRouter();
  const {data, isLoading} = useUserMe()

  const handleLogout = async () => {
    await clearAuthCookie()
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/30 px-6 backdrop-blur-md">
      <h1 className="text-lg font-bold text-white">Dashboard Todolist</h1>
      <div className="flex items-center gap-4">
        <Avatar 
          name={data?.data.name ?? ""}
          isLoading={isLoading}
        />

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

export default Navbar;
