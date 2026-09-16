"use client";

import cn from "@/src/lib/cn";
import React, { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        <label id={id} className="block text-xs font-medium tracking-wider text-slate-300">
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          {...props}
          className={cn(
            "block w-full rounded-xl border border-slate-800  px-4 py-3 bg-slate-950 text-sm transition-colors focus:outline-none focus:ring-1",
            !!error ? [
                "placeholder-red-100/50 focus:border-red-400 focus:ring-indigo-400"
            ] : [
                "text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
            ]
          )}
        />

        {!!error && (
            <p
                className={"text-xs font-bold text-red-400"}
            >
                {error}
            </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;