import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getHistory } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

export default function History() {
  const items = getHistory()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">History</h1>
        <p className="text-slate-600">Your recent activities</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="relative ml-4">
            <div className="absolute left-[-2px] top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-4">
              {items.length === 0 && <div className="text-sm text-slate-600">No activity yet.</div>}
              {items.map((it, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute left-[-6px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="text-sm"><span className="font-medium capitalize">{it.type}</span>: {it.detail}</div>
                  <div className="text-xs text-slate-500">{new Date(it.at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
