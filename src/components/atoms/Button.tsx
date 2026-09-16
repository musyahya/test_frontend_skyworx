"use client"

import cn from '@/src/lib/cn'
import React, { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode
}

function Button({
    children,
    startIcon,
    className,
    ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
        type="submit"
        suppressHydrationWarning
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50",
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