"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  // Tutup modal dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      confirmBtn: "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500/40",
      icon: <Trash2 size={24} />,
    },
    warning: {
      iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      confirmBtn: "bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-500/40",
      icon: <AlertTriangle size={24} />,
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => !isLoading && onClose()}
      />

      {/* Box Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        {/* Tombol Close Top Right */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
          title="Tutup"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          {/* Badge Ikon */}
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl border p-3 ${currentVariant.iconBg}`}
          >
            {currentVariant.icon}
          </div>

          {/* Konten Judul & Deskripsi */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-base font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 disabled:opacity-50 ${currentVariant.confirmBtn}`}
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}