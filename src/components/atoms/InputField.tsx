"use client";

import cn from "@/src/lib/cn";
import { Eye, EyeClosed } from "lucide-react";
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
  ({ label, error, leftIcon, rightIcon, type = "text", className, ...props }, ref) => {
    const id = useId();
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            id={id}
            className="block text-xs font-medium tracking-wider text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={isShowPassword ? "text" : type}
            suppressHydrationWarning
            {...props}
            className={cn(
              "block w-full rounded-xl border border-slate-800  px-4 py-3 bg-slate-950 text-sm transition-colors focus:outline-none focus:ring-1",
              !!error
                ? [
                    "placeholder-red-100/50 focus:border-red-400 focus:ring-indigo-400",
                  ]
                : [
                    "text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-indigo-500",
                  ],
            )}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {type === "password" && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="text-neutral-main hover:text-isme-main transition-colors outline-none"
              >
                {isShowPassword ? <Eye size={14} /> : <EyeClosed size={14} />}
              </button>
            )}
          </div>
        </div>

        {!!error && <p className={"text-xs font-bold text-red-400"}>{error}</p>}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
