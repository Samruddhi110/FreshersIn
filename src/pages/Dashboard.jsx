import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, Progress } from '@/components/ui/badge-progress-avatar'
import { modulesData } from '@/data/mockData'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user } = useAuth()

  const completed = modulesData.filter(m => m.status === 'Completed').length
  const pending = modulesData.filter(m => m.status !== 'Completed').length
  const certs = 2
  const completion = Math.round((completed / modulesData.length) * 100)

  const stats = [
    { label: 'Modules Completed', value: completed },
    { label: 'Pending Tasks', value: pending },
    { label: 'Certificates Earned', value: certs },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">Welcome, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-slate-600">Role: <Badge variant="info">{user?.role}</Badge></p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardHeader><CardTitle className="text-base">{s.label}</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-semibold">{s.value}</div></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Onboarding Completion</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={completion} />
            <span className="text-sm text-slate-600">{completion}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
