import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/input-label'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Engineer' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.name.trim().length < 2) return setError('Please enter your full name.')
    if (!form.email.includes('@')) return setError('Please enter a valid email.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    // Auto-login on signup
    login({ name: form.name, email: form.email, role: form.role })
    navigate('/app')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <p className="text-sm text-slate-600">Start your onboarding journey</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={form.role} onChange={e=>setForm({...form, role: e.target.value})} placeholder="Engineer / Designer / Manager" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com"
                  value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••"
                  value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">Sign up</Button>
            </form>
            <p className="text-sm text-slate-600 mt-4">
              Already have an account? <Link to="/login" className="text-primary underline">Log in</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
