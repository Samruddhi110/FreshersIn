import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { tasksData, addHistory } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge-progress-avatar'

export default function Tasks() {
  const { user } = useAuth()

  const myTasks = tasksData.filter(t => t.roles.includes(user?.role || 'Engineer'))

  const updateStatus = (task, status) => {
    task.status = status
    addHistory({ type: 'task', detail: `Marked task "${task.title}" as ${status}` })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="text-slate-600">Assignments tailored to your role</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {myTasks.map(t => (
          <Card key={t.id}>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-lg">{t.title}</CardTitle>
              <Badge variant={t.status==='Completed' ? 'success' : t.status==='In Progress' ? 'info' : 'default'}>{t.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{t.description}</p>
              <div className="text-sm text-slate-600">Deadline: <span className="font-medium">{formatDate(t.deadline)}</span></div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=>updateStatus(t, 'In Progress')}>Start</Button>
                <Button onClick={()=>updateStatus(t, 'Completed')}>Complete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
