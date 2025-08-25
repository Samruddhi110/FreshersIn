import React from 'react'
import { cn } from '@/lib/utils'

export function Button({ className, variant='default', size='md', asChild, ...props }) {
  const Comp = asChild ? 'span' : 'button'
  const variants = {
    default: 'bg-primary text-white hover:opacity-90',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50',
    ghost: 'bg-transparent hover:bg-slate-100',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700',
  }
  const sizes = {
    sm: 'h-8 px-3 rounded-lg text-sm',
    md: 'h-10 px-4 rounded-xl',
    lg: 'h-12 px-6 rounded-2xl text-base',
  }
  return <Comp className={cn('inline-flex items-center justify-center gap-2 transition', variants[variant], sizes[size], className)} {...props} />
}
