import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge-progress-avatar'
import { modulesData, getModuleStatus } from '@/data/mockData'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const statusVariant = (s) => s==='Completed' ? 'success' : s==='In Progress' ? 'info' : 'default'

export default function Lectures() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lectures</h1>
        <p className="text-slate-600">Browse your onboarding modules</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modulesData.map((m, i) => {
          const localStatus = getModuleStatus(m.id, m.status)
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{m.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-slate-600">{m.description}</p>
                  <div className="mt-3">
                    <Badge variant={statusVariant(localStatus)}>{localStatus}</Badge>
                  </div>
                </CardContent>
                <div className="p-5 pt-0">
                  <Link to={`/app/lectures/${m.id}`} className="inline-flex items-center gap-2 text-primary font-medium">
                    Open module <ChevronRight size={16} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
