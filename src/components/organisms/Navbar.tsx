"use client";

import { clearAuthCookie } from "@/src/lib/cookie";
import { useUserMe } from "@/src/queries/user";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Avatar from "../atoms/Avatar";
import { useToast } from "@/src/hooks/useToast";
import ConfirmModal from "../molecules/ModalConfirm";
import ToggleTheme from "../atoms/ToggleTheme";

function Navbar() {
  const router = useRouter();
  const { data, isLoading } = useUserMe();
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = async () => {
    await clearAuthCookie();
    router.push("/login");
    toast.success("Logout berhasil!");
    setOpenModal(false);
  };

  return (
    <div>
      {/* Header Container dengan variasi Dark & Light mode */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/40">
        {/* Title */}
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          Dashboard Todolist
        </h1>

        <div className="flex items-center gap-4">
          {/* Tombol Toggle Theme */}
          <ToggleTheme />

          {/* Avatar User */}
          <Avatar
            name={data?.data.name ?? ""}
            isLoading={isLoading}
          />

          {/* Tombol Logout */}
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            suppressHydrationWarning
            className="cursor-pointer flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 hover:border-rose-300 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:border-rose-500/30"
            title="Keluar dari Akun"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline-block">Keluar</span>
          </button>
        </div>
      </header>

      {/* Modal Konfirmasi Logout */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        title="Logout Sekarang?"
        description="Apakah Anda yakin akan keluar dari sesi ini?"
        confirmLabel="Keluar"
        cancelLabel="Batal"
        variant="warning"
      />
    </div>
  );
}

export default Navbar;