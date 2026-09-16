"use client"

import React from 'react'

interface Avatar {
    name: string,
    isLoading?: boolean
}

function Avatar({name, isLoading = false}: Avatar) {
     const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

    if (isLoading) {
        return <AvatarSkeleton/>
    }

  return (
    <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
        {initials}
        </div>
        <span className="text-sm font-medium text-slate-300 hidden sm:inline-block">
        {name}
        </span>
    </div>
  )
}

export default Avatar

const AvatarSkeleton = () => {
    return (
        <div className="flex items-center gap-3 ">
            <div className="block h-9  w-9 rounded-full bg-neutral-600 animate-pulse"></div>
            <div className="block w-20 h-3 rounded-full bg-neutral-600 animate-pulse"></div>
        </div>
    )
}