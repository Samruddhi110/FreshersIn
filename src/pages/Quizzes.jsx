import React, { useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { modulesData, quizBank, saveResult } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge-progress-avatar'
import { motion } from 'framer-motion'

export default function Quizzes() {
  const [active, setActive] = useState('m1')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const questions = useMemo(()=>quizBank[active] || [], [active])

  const submit = () => {
    let score = 0
    questions.forEach((q, idx) => {
      if (answers[q.id] === q.answer) score++
    })
    saveResult(active, score, questions.length)
    setSubmitted({ score, total: questions.length })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        <p className="text-slate-600">Test your understanding for each module</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {modulesData.map(m => (
          <button key={m.id} onClick={()=>{ setActive(m.id); setAnswers({}); setSubmitted(null); }}
            className={'px-3 py-1.5 rounded-full text-sm ' + (active===m.id ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200')}>
            {m.title}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Module Quiz: <span className="text-primary">{modulesData.find(x=>x.id===active)?.title}</span></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, idx) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="font-medium">{idx+1}. {q.question}</div>
              <div className="mt-2 space-y-2">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="radio" name={q.id} checked={answers[q.id]===i} onChange={()=>setAnswers({...answers, [q.id]: i})} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
          {!submitted ? (
            <Button onClick={submit}>Submit Quiz</Button>
          ) : (
            <div className="flex items-center gap-3">
              <Badge variant="info">Score: {submitted.score} / {submitted.total}</Badge>
              <span className="text-sm text-slate-600">Result saved to History.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
