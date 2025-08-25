import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/input-label'
import { Button } from '@/components/ui/button'
import { Avatar, Badge, Progress } from '@/components/ui/badge-progress-avatar'
import { modulesData, certificatesData } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

export default function Profile() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({ name: user?.name, email: user?.email, role: user?.role, avatar: '' })

  const completed = modulesData.filter(m => m.status==='Completed').length
  const completion = Math.round((completed / modulesData.length) * 100)

  const save = (e) => {
    e.preventDefault()
    login({ ...user, ...form })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-slate-600">Manage your information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={form.role} onChange={e=>setForm({...form, role: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="avatar">Profile picture URL (optional)</Label>
                <Input id="avatar" placeholder="https://..." value={form.avatar} onChange={e=>setForm({...form, avatar: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar src={form.avatar} name={form.name} />
              <div>
                <div className="font-medium">{form.name}</div>
                <div className="text-sm text-slate-600">{form.role}</div>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-sm mb-2">Onboarding Completion</div>
              <Progress value={completion} />
              <div className="text-xs text-slate-600 mt-1">{completion}%</div>
            </div>
            <div className="pt-1 text-sm">
              Certificates: <Badge variant="info">{certificatesData.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
