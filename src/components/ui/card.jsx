import React from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn('card', className)} {...props} />
}
export function CardHeader({ className, ...props }) {
  return <div className={cn('p-5 border-b border-slate-200', className)} {...props} />
}
export function CardTitle({ className, ...props }) {
  return <h3 className={cn('font-semibold text-slate-900', className)} {...props} />
}
export function CardContent({ className, ...props }) {
  return <div className={cn('p-5', className)} {...props} />
}
export function CardFooter({ className, ...props }) {
  return <div className={cn('p-5 border-t border-slate-200', className)} {...props} />
}
