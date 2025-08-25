export const modulesData = [
  { id: 'm1', title: 'Welcome to the Company', description: 'Company values, mission, and culture.', status: 'In Progress', sections: ['Introduction', 'Values', 'Culture'] },
  { id: 'm2', title: 'Security & Compliance', description: 'Best practices and policies.', status: 'Not Started', sections: ['Passwords', '2FA', 'Data Handling'] },
  { id: 'm3', title: 'Tools Overview', description: 'Overview of tools you will use.', status: 'Completed', sections: ['Email', 'Chat', 'Project Management'] },
  { id: 'm4', title: 'HR Policies', description: 'Leaves, reimbursements, code of conduct.', status: 'Not Started', sections: ['Leave', 'Benefits', 'Conduct'] },
]

export const quizBank = {
  m1: [
    { id: 'q1', question: 'What is our core value?', options: ['Speed', 'Integrity', 'Profit'], answer: 1 },
    { id: 'q2', question: 'Who to contact for culture queries?', options: ['HR', 'Security', 'IT'], answer: 0 },
  ],
  m2: [
    { id: 'q1', question: 'Recommended password length?', options: ['4', '8+', '6'], answer: 1 },
    { id: 'q2', question: '2FA stands for?', options: ['Two Factor Auth', 'Fast Action', 'Second Approval'], answer: 0 },
  ],
  m3: [
    { id: 'q1', question: 'Which tool is for projects?', options: ['Email', 'Project Management', 'Calendar'], answer: 1 },
  ],
  m4: [
    { id: 'q1', question: 'Where to apply leave?', options: ['Random email', 'HR portal', 'Chat'], answer: 1 },
  ],
}

export const tasksData = [
  { id: 't1', title: 'Set up email signature', description: 'Add role and contact.', deadline: '2025-09-05', status: 'Pending', roles: ['Engineer', 'Designer', 'Manager'] },
  { id: 't2', title: 'Complete security training', description: 'Finish module M2 quiz.', deadline: '2025-09-10', status: 'In Progress', roles: ['Engineer', 'Manager'] },
  { id: 't3', title: 'Meet your buddy', description: 'Schedule a 30-min chat.', deadline: '2025-09-07', status: 'Pending', roles: ['Engineer', 'Designer'] },
]

export const certificatesData = [
  { id: 'c1', courseName: 'Onboarding Essentials', completionDate: '2025-08-01' },
  { id: 'c2', courseName: 'Security & Compliance', completionDate: '2025-08-15' },
]

export function getHistory() {
  const raw = localStorage.getItem('history')
  return raw ? JSON.parse(raw) : []
}
export function addHistory(entry) {
  const hist = getHistory()
  hist.unshift({ ...entry, at: new Date().toISOString() })
  localStorage.setItem('history', JSON.stringify(hist))
}

export function getResults() {
  const raw = localStorage.getItem('results')
  return raw ? JSON.parse(raw) : {}
}
export function saveResult(moduleId, score, total) {
  const res = getResults()
  res[moduleId] = { score, total, when: new Date().toISOString() }
  localStorage.setItem('results', JSON.stringify(res))
  addHistory({ type: 'quiz', detail: `Completed quiz for ${moduleId} with score ${score}/${total}` })
}

export function setModuleStatus(id, status) {
  const key = 'moduleStatus'
  const raw = localStorage.getItem(key)
  const data = raw ? JSON.parse(raw) : {}
  data[id] = status
  localStorage.setItem(key, JSON.stringify(data))
}
export function getModuleStatus(id, fallback) {
  const raw = localStorage.getItem('moduleStatus')
  const data = raw ? JSON.parse(raw) : {}
  return data[id] || fallback
}
