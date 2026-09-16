"use client"

import cn from '@/src/lib/cn'
import React, { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode
   color?: "success" | "warning" | "primary" | "danger",
}

function Button({
    children,
    startIcon,
    className,
    color = "primary",
    ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
        type="submit"
        suppressHydrationWarning
        className={cn(
          "cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50",
          color === "success" && "text-white bg-emerald-500 hover:bg-emerald-400",
          color === "danger" && "text-white bg-red-400 hover:bg-red-300",
          color === "warning" && "text-white bg-amber-400 hover:bg-amber-300",
          color === "primary" && "text-white bg-indigo-500 hover:bg-indigo-400",
          className
        )}
        {...props}
    >
        {startIcon && (
            <span className="flex shrink-0 items-center justify-center">
              {startIcon}
            </span>
          )}

        {children}
    </button>
  )
}

export default Button