import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Lectures from '@/pages/Lectures'
import LectureDetail from '@/pages/LectureDetail'
import Quizzes from '@/pages/Quizzes'
import Tasks from '@/pages/Tasks'
import Certificates from '@/pages/Certificates'
import Profile from '@/pages/Profile'
import History from '@/pages/History'
import Admin from '@/pages/Admin'
import { ProtectedShell, ProtectedRoute } from '@/components/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/app" element={<ProtectedShell />}>
        <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="lectures" element={<ProtectedRoute><Lectures /></ProtectedRoute>} />
        <Route path="lectures/:id" element={<ProtectedRoute><LectureDetail /></ProtectedRoute>} />
        <Route path="quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
