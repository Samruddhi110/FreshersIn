# AI Onboarding & Learning Platform (React + Vite + Tailwind + ShadCN-style + Framer Motion)

A modern, responsive corporate onboarding demo with login/signup, dashboard, lectures, quizzes, tasks, certificates (PDF), profile, history timeline, and an optional admin page.

## Quick Start

1) **Download & unzip** this project.
2) Open the folder in VS Code.
3) Install dependencies:
   ```bash
   npm install
   ```
4) Start the dev server:
   ```bash
   npm run dev
   ```
5) Visit the printed local URL (usually http://localhost:5173).

## Credentials
- Use any email and a 6+ char password. It's a demo: no backend yet. Data is stored in localStorage.

## Tech
- React + Vite, Tailwind CSS, Framer Motion animations, Lucide icons.
- "ShadCN-style" UI in `/src/components/ui/*` (Button, Card, Input, Label, Badge, Progress, Avatar, Dropdown/Sheet). You can replace with official shadcn/ui components later.

## Routing
- Defined in `src/App.jsx` using React Router. Protected routes are wrapped by `ProtectedShell` (layout + sidebar + header).
- After login/signup, you are redirected to `/app` (Dashboard).

## Pages
- Login, Signup
- Dashboard (greeting, quick stats, progress bar)
- Lectures (cards) + Lecture Detail (video placeholder, section navigation, mark complete)
- Quizzes (MCQs per module with scoring; saved to History)
- Tasks (role-based assignments)
- Certificates (cards + "Download PDF" via jsPDF)
- Profile (update info + progress overview)
- History (timeline of activities stored in localStorage)
- Admin (add modules, assign tasks — in-memory demo only)

## Tailwind
- Config in `tailwind.config.js`
- Styles in `src/styles/globals.css`

## Extend with a Backend
- Replace `src/data/mockData.js` + localStorage with API calls.
- Keep the AuthContext but use JWT/session APIs.
- Replace `jsPDF` with server-side issued PDFs if needed.
