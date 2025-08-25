import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/input-label'
import { Button } from '@/components/ui/button'
import { modulesData, tasksData } from '@/data/mockData'

export default function Admin() {
  const [modules, setModules] = useState(modulesData)
  const [tasks, setTasks] = useState(tasksData)

  const addModule = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const title = form.get('title')
    const description = form.get('description')
    const mod = { id: 'm' + (modules.length+1), title, description, status: 'Not Started', sections: ['Intro'] }
    setModules([...modules, mod])
    e.currentTarget.reset()
  }

  const addTask = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const title = form.get('title')
    const description = form.get('description')
    const deadline = form.get('deadline')
    const roles = form.get('roles').split(',').map(s=>s.trim())
    const t = { id: 't' + (tasks.length+1), title, description, deadline, status: 'Pending', roles }
    setTasks([...tasks, t])
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-slate-600">Manage modules, tasks & monitor progress (demo)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Add Module</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={addModule} className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input name="title" required />
              </div>
              <div>
                <Label>Description</Label>
                <Input name="description" required />
              </div>
              <Button type="submit">Add</Button>
            </form>
            <div className="mt-4 text-sm text-slate-600">Total modules: {modules.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Assign Task</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={addTask} className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input name="title" required />
              </div>
              <div>
                <Label>Description</Label>
                <Input name="description" required />
              </div>
              <div>
                <Label>Deadline</Label>
                <Input name="deadline" type="date" required />
              </div>
              <div>
                <Label>Roles (comma separated)</Label>
                <Input name="roles" placeholder="Engineer, Manager" required />
              </div>
              <Button type="submit">Assign</Button>
            </form>
            <div className="mt-4 text-sm text-slate-600">Total tasks: {tasks.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
