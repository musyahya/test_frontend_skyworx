"use client"

import cn from '@/src/lib/cn'
import React from 'react'

interface StateCard {
    total: number
    variant: "white" | "gray" | "success" | "warning",
    title: string
}

function StateCard({total, variant, title}: StateCard) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
        <p className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            variant === "white" && "text-slate-400",
            variant === "gray" && "text-slate-300",
            variant === "success" && "text-amber-400",
            variant === "warning" && "text-emerald-400",
        )}>{title}</p>
        <p className={cn(
            "mt-1 text-2xl font-extrabold",
            variant === "white" && "text-white",
            variant === "gray" && "text-slate-300",
            variant === "success" && "text-amber-400",
            variant === "warning" && "text-emerald-400",
        )}>{total}</p>
    </div>
  )
}

export default StateCard