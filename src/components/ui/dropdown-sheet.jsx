import React from 'react'
import { cn } from '@/lib/utils'

export function Dropdown({ trigger, children, className }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={cn('relative inline-block text-left', className)} onBlur={(e)=>{ if(!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}>
      <button onClick={()=>setOpen(!open)} className="inline-flex items-center gap-2">{trigger}</button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-soft ring-1 ring-slate-200 p-1">
          {children}
        </div>
      )}
    </div>
  )
}
export const DropdownItem = ({ children, onClick }) => (
  <button onClick={onClick} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm">{children}</button>
)

export function Sheet({ open, onOpenChange, side='left', children }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={()=>onOpenChange(false)} />}
      <div
        className={cn(
          'fixed z-50 bg-white w-72 h-full shadow-soft transition-transform duration-300',
          side==='left' ? (open ? 'translate-x-0 left-0' : '-translate-x-full -left-72') : (open ? 'translate-x-0 right-0' : 'translate-x-full -right-72')
        )}
      >
        {children}
      </div>
    </>
  )
}
