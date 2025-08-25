import React, { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { modulesData, addHistory, setModuleStatus, getModuleStatus } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress, Badge } from '@/components/ui/badge-progress-avatar'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function LectureDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const mod = useMemo(()=>modulesData.find(m => m.id === id), [id])
  const [sectionIdx, setSectionIdx] = useState(0)
  const [status, setStatus] = useState(getModuleStatus(id, mod?.status))

  if (!mod) return <div className="p-4">Module not found.</div>
  const pct = Math.round(((sectionIdx+1)/mod.sections.length)*100)

  const markComplete = () => {
    setStatus('Completed')
    setModuleStatus(id, 'Completed')
    addHistory({ type: 'module', detail: `Marked ${mod.title} as completed` })
    navigate('/app/lectures')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{mod.title}</h1>
          <p className="text-slate-600">Status: <Badge variant={status==='Completed' ? 'success' : 'info'}>{status}</Badge></p>
        </div>
        <Link to="/app/lectures" className="text-primary">Back to Lectures</Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section {sectionIdx+1}: {mod.sections[sectionIdx]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full bg-slate-200 rounded-xl grid place-items-center text-slate-600">
            Placeholder for video / interactive content
          </div>
          <p className="text-sm text-slate-600">
            Here you would embed a video player or interactive content for the section "{mod.sections[sectionIdx]}".
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={()=> setSectionIdx(i=> Math.max(0, i-1))}><ChevronLeft size={16}/> Prev</Button>
            <Button variant="outline" onClick={()=> setSectionIdx(i=> Math.min(mod.sections.length-1, i+1))}>Next <ChevronRight size={16}/></Button>
            <div className="flex-1" />
            <div className="w-48"><Progress value={pct} /></div>
            <span className="text-sm text-slate-600">{pct}%</span>
          </div>
          <div className="pt-2">
            <Button onClick={markComplete}>Mark Module Completed</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
