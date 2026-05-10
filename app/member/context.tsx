'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Department = 'activity' | 'career' | 'external' | 'operations' | 'media' | 'sports' | 'finance'
export type Role = 'admin' | 'leader' | 'member' | 'finance'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  department: Department
}

export interface MemberEvent {
  id: string
  title: string
  description: string
  date: string
  department: Department | 'all'
  postedBy: string
  postedById: string
}

export interface Reimbursement {
  id: string
  submittedBy: string
  submittedById: string
  department: Department
  activityName: string
  amount: number
  description: string
  receiptName: string | null
  status: 'pending' | 'approved' | 'denied'
  submittedAt: string
  reviewedAt: string | null
  reviewedBy: string | null
}

export const DEPT_LABELS: Record<Department, { zh: string; en: string }> = {
  activity:   { zh: '活动部', en: 'Activities' },
  career:     { zh: '职发部', en: 'Career Dev' },
  external:   { zh: '外联部', en: 'Business Dev' },
  operations: { zh: '运营部', en: 'Operations' },
  media:      { zh: '新媒体部', en: 'New Media' },
  sports:     { zh: '体育部', en: 'Sports' },
  finance:    { zh: '财务部', en: 'Finance' },
}

export const DEPT_COLORS: Record<Department, string> = {
  activity:   '#D42B2B',
  career:     '#2B6ED4',
  external:   '#6E2BD4',
  operations: '#2BA86E',
  media:      '#D48C2B',
  sports:     '#2BABD4',
  finance:    '#C8973A',
}

export const DEMO_USERS: User[] = [
  { id: '1', name: 'Alex Chen',  email: 'alex@cssa.uci',  role: 'admin',   department: 'activity' },
  { id: '2', name: 'Liu Yang',   email: 'liu@cssa.uci',   role: 'leader',  department: 'activity' },
  { id: '3', name: 'Mei Wang',   email: 'mei@cssa.uci',   role: 'member',  department: 'career' },
  { id: '4', name: 'Kevin Li',   email: 'kevin@cssa.uci', role: 'finance', department: 'finance' },
]

const INITIAL_EVENTS: MemberEvent[] = [
  {
    id: 'e1',
    title: '春节联欢晚会 · Spring Festival Gala',
    description: 'Annual Spring Festival celebration with performances, food, and cultural activities. All departments required to attend.',
    date: '2026-02-01',
    department: 'all',
    postedBy: 'Alex Chen',
    postedById: '1',
  },
  {
    id: 'e2',
    title: 'Career Fair Prep Workshop',
    description: 'Resume review and mock interview session. Please bring printed copies of your resume. Limited spots available.',
    date: '2026-05-10',
    department: 'career',
    postedBy: 'Liu Yang',
    postedById: '2',
  },
  {
    id: 'e3',
    title: '篮球联赛 · Basketball Tournament',
    description: 'Intramural basketball tournament open to all CSSA members. Sign up in groups of 5 by May 5th.',
    date: '2026-05-20',
    department: 'sports',
    postedBy: 'Alex Chen',
    postedById: '1',
  },
  {
    id: 'e4',
    title: 'Business Dev Partner Mixer',
    description: 'Networking event with partner companies and external sponsors. Business casual dress required.',
    date: '2026-06-03',
    department: 'external',
    postedBy: 'Alex Chen',
    postedById: '1',
  },
]

const INITIAL_REIMBURSEMENTS: Reimbursement[] = [
  {
    id: 'r1',
    submittedBy: 'Liu Yang',
    submittedById: '2',
    department: 'activity',
    activityName: 'Spring Festival Decoration',
    amount: 85.50,
    description: 'Purchased decorations and supplies for the Spring Festival setup at the student center.',
    receiptName: 'receipt_decoration.pdf',
    status: 'pending',
    submittedAt: '2026-04-20',
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: 'r2',
    submittedBy: 'Mei Wang',
    submittedById: '3',
    department: 'career',
    activityName: 'Career Fair Booth Materials',
    amount: 42.00,
    description: 'Printed flyers, brochures, and display materials for the UCI career fair booth.',
    receiptName: 'receipt_flyers.pdf',
    status: 'approved',
    submittedAt: '2026-04-15',
    reviewedAt: '2026-04-17',
    reviewedBy: 'Kevin Li',
  },
  {
    id: 'r3',
    submittedBy: 'Alex Chen',
    submittedById: '1',
    department: 'activity',
    activityName: 'New Year Party Supplies',
    amount: 120.00,
    description: 'Party supplies and snacks for the new year kickoff event.',
    receiptName: null,
    status: 'denied',
    submittedAt: '2026-04-10',
    reviewedAt: '2026-04-12',
    reviewedBy: 'Kevin Li',
  },
  {
    id: 'r4',
    submittedBy: 'Liu Yang',
    submittedById: '2',
    department: 'activity',
    activityName: 'Volunteer Day Lunch',
    amount: 68.00,
    description: 'Lunch for 12 volunteers during the community service day.',
    receiptName: 'receipt_lunch.pdf',
    status: 'pending',
    submittedAt: '2026-04-22',
    reviewedAt: null,
    reviewedBy: null,
  },
]

export function canPostEvent(role: Role) {
  return role === 'admin' || role === 'leader'
}

export function canReviewReimbursement(role: Role) {
  return role === 'finance' || role === 'admin'
}

export function canCreateAccount(role: Role) {
  return role === 'admin' || role === 'leader'
}

interface MemberContextValue {
  user: User | null
  setUser: (u: User | null) => void
  events: MemberEvent[]
  addEvent: (e: Omit<MemberEvent, 'id'>) => void
  reimbursements: Reimbursement[]
  addReimbursement: (r: Omit<Reimbursement, 'id' | 'status' | 'reviewedAt' | 'reviewedBy'>) => void
  reviewReimbursement: (id: string, status: 'approved' | 'denied') => void
}

const MemberContext = createContext<MemberContextValue | null>(null)

export function MemberProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [events, setEvents] = useState<MemberEvent[]>(INITIAL_EVENTS)
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>(INITIAL_REIMBURSEMENTS)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cssa_member')
      if (saved) setUserState(JSON.parse(saved))
    } catch {}
  }, [])

  function setUser(u: User | null) {
    setUserState(u)
    if (u) localStorage.setItem('cssa_member', JSON.stringify(u))
    else localStorage.removeItem('cssa_member')
  }

  function addEvent(e: Omit<MemberEvent, 'id'>) {
    setEvents(prev => [{ ...e, id: `e${Date.now()}` }, ...prev])
  }

  function addReimbursement(r: Omit<Reimbursement, 'id' | 'status' | 'reviewedAt' | 'reviewedBy'>) {
    setReimbursements(prev => [{
      ...r,
      id: `r${Date.now()}`,
      status: 'pending',
      reviewedAt: null,
      reviewedBy: null,
    }, ...prev])
  }

  function reviewReimbursement(id: string, status: 'approved' | 'denied') {
    setReimbursements(prev => prev.map(r =>
      r.id === id
        ? { ...r, status, reviewedAt: new Date().toISOString().slice(0, 10), reviewedBy: user?.name ?? '' }
        : r
    ))
  }

  return (
    <MemberContext.Provider value={{ user, setUser, events, addEvent, reimbursements, addReimbursement, reviewReimbursement }}>
      {children}
    </MemberContext.Provider>
  )
}

export function useMember() {
  const ctx = useContext(MemberContext)
  if (!ctx) throw new Error('useMember must be used inside MemberProvider')
  return ctx
}
