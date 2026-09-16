"use client";

import cn from "@/src/lib/cn";
import { Eye, EyeOff } from "lucide-react";
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, error, leftIcon, rightIcon, type = "text", className, ...props },
    ref
  ) => {
    const id = useId();
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label dengan kontras warna adaptif */}
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-medium tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Icon (Opsional) */}
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type === "password" && isShowPassword ? "text" : type}
            suppressHydrationWarning
            {...props}
            className={cn(
              "block w-full rounded-xl border text-sm transition-colors focus:outline-none focus:ring-1",
              "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400", // Light Mode Default
              "dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800 dark:placeholder:text-slate-500", // Dark Mode Default
              leftIcon ? "pl-10" : "px-4",
              type === "password" || rightIcon ? "pr-10" : "pr-4",
              "py-2.5",
              !!error
                ? "border-rose-500 text-rose-600 placeholder:text-rose-300 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-500/80 dark:text-rose-400 dark:placeholder:text-rose-400/50"
                : "focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500",
              className
            )}
          />

          {/* Right Icon & Toggle Password Button */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {type === "password" ? (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 transition-colors outline-none"
                title={isShowPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {isShowPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            ) : (
              rightIcon
            )}
          </div>
        </div>

        {/* Pesan Error */}
        {!!error && (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-0.5">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;