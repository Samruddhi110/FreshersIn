import React from 'react'
import { cn } from '@/lib/utils'

export function Badge({ children, variant='default', className }) {
  const styles = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-sky-100 text-sky-700',
  }
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', styles[variant], className)}>{children}</span>
}

export function Progress({ value=0, className }) {
  return (
    <div className={cn('w-full h-3 bg-slate-200 rounded-full overflow-hidden', className)}>
      <div className="h-full bg-primary" style={{ width: `${value}%` }} />
    </div>
  )
}

export function Avatar({ src, alt, name }) {
  if (src) return <img src={src} alt={alt || name} className="h-10 w-10 rounded-full object-cover" />
  const initials = name ? name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase() : '?'
  return (
    <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center text-sm font-semibold text-slate-700">
      {initials}
    </div>
  )
}
