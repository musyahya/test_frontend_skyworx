"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { ToastItem } from "../templates/ToastProvider";

function ToastContainer({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const icons = {
    success: <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0" size={20} />,
    error: <AlertCircle className="text-rose-600 dark:text-rose-400 shrink-0" size={20} />,
    warning: <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0" size={20} />,
    info: <Info className="text-sky-600 dark:text-sky-400 shrink-0" size={20} />,
  };

  const borderColors = {
    success:
      "border-emerald-200 bg-emerald-50/95 text-slate-900 shadow-emerald-500/5 dark:border-emerald-500/30 dark:bg-slate-900/90 dark:text-slate-100",
    error:
      "border-rose-200 bg-rose-50/95 text-slate-900 shadow-rose-500/5 dark:border-rose-500/30 dark:bg-slate-900/90 dark:text-slate-100",
    warning:
      "border-amber-200 bg-amber-50/95 text-slate-900 shadow-amber-500/5 dark:border-amber-500/30 dark:bg-slate-900/90 dark:text-slate-100",
    info:
      "border-sky-200 bg-sky-50/95 text-slate-900 shadow-sky-500/5 dark:border-sky-500/30 dark:bg-slate-900/90 dark:text-slate-100",
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-top-2 ${borderColors[item.type]}`}
    >
      {icons[item.type]}

      <div className="flex-1 space-y-0.5">
        <h4 className="text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">
          {item.title}
        </h4>
        {item.message && (
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {item.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors p-0.5 rounded-lg"
        title="Tutup"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default ToastContainer;