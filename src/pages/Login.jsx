import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/input-label'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email.includes('@')) return setError('Please enter a valid email.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    // Fake user
    const user = { name: 'Sarthak Darandale', email: form.email, role: 'Engineer' }
    login(user)
    navigate('/app')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <p className="text-sm text-slate-600">Sign in to continue your onboarding</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full">Login</Button>
            </form>
            <p className="text-sm text-slate-600 mt-4">
              New here? <Link to="/signup" className="text-primary underline">Create an account</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
