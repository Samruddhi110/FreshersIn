import React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn('w-full h-11 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50', className)} {...props} />
})
Input.displayName = 'Input'

export const Label = ({ className, ...props }) => (
  <label className={cn('text-sm font-medium text-slate-700 mb-1 block', className)} {...props} />
)
