import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/badge-progress-avatar'
import { Sheet } from '@/components/ui/dropdown-sheet'
import { LayoutDashboard, PlayCircle, BookOpen, CheckCircle, ClipboardCheck, Award, User, History, LogOut, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/app', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/app/lectures', label: 'Lectures', icon: <PlayCircle size={18} /> },
  { to: '/app/quizzes', label: 'Quizzes', icon: <BookOpen size={18} /> },
  { to: '/app/tasks', label: 'Tasks', icon: <ClipboardCheck size={18} /> },
  { to: '/app/certificates', label: 'Certificates', icon: <Award size={18} /> },
  { to: '/app/profile', label: 'Profile', icon: <User size={18} /> },
  { to: '/app/history', label: 'History', icon: <History size={18} /> },
]

export function ProtectedShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="md:hidden" onClick={()=>setOpen(true)} aria-label="Open Menu">
              <Menu />
            </Button>
            <span className="font-semibold text-slate-800">AI Onboarding</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-slate-500">{user?.role}</span>
            </div>
            <Avatar name={user?.name} />
            <Button variant="outline" size="sm" onClick={()=>{ logout(); navigate('/login') }} className="hidden md:inline-flex">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen} side="left">
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold text-lg">Menu</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({isActive})=> 'flex items-center gap-3 px-3 py-2 rounded-xl ' + (isActive ? 'bg-slate-100' : 'hover:bg-slate-50')}
                onClick={()=>setOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <button onClick={()=>{ setOpen(false); logout(); }} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50">
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </div>
      </Sheet>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6 p-4">
        {/* Sidebar */}
        <aside className="hidden md:block sticky top-[72px] h-[calc(100vh-80px)]">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="card p-3 h-full"
          >
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({isActive})=> 'flex items-center gap-3 px-3 py-2 rounded-xl text-sm ' + (isActive ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50')}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-sm">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </motion.div>
        </aside>

        {/* Content */}
        <main className="min-h-[70vh]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return null
  return children
}
