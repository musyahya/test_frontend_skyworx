"use client"

import cn from '@/src/lib/cn'
import React from 'react'

interface StateCard {
    total: number
    color: "white" | "gray" | "success" | "warning" | "danger",
    title: string
}

function StateCard({total, color, title}: StateCard) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
        <p className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            color === "white" && "text-white",
            color === "gray" && "text-slate-300",
            color === "success" && "text-amber-400",
            color === "warning" && "text-emerald-400",
        )}>{title}</p>
        <p className={cn(
            "mt-1 text-2xl font-extrabold",
            color === "white" && "text-white",
            color === "gray" && "text-slate-300",
            color === "success" && "text-amber-400",
            color === "warning" && "text-emerald-400",
        )}>{total}</p>
    </div>
  )
}

export default StateCard