import cn from '@/src/lib/cn'
import React, { SelectHTMLAttributes } from 'react'

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {label: string, value: string | number, className?: string}[]
}

function Dropdown({options, className, ...props}: DropdownProps) {
  return (
    <select
        {...props}
        suppressHydrationWarning
        className={cn(
          "rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none",
          className
        )}
        >
          {
            options.map((option) => (
              <option className={option.className} key={option.value} value={option.value}>{option.label}</option>
            ))
          }
    </select>
  )
}

export default Dropdown