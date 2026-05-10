'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMember, DEPT_LABELS, DEPT_COLORS, Department, User } from './context'

function DeptTile({ d, active, onClick }: { d: Department; active: boolean; onClick: (d: Department) => void }) {
  const color = DEPT_COLORS[d]
  return (
    <div onClick={() => onClick(d)} style={{
      padding: '12px 8px', borderRadius: '9px', cursor: 'pointer', textAlign: 'center',
      background: active ? `${color}18` : 'rgba(255,255,255,0.025)',
      border: active ? `1.5px solid ${color}55` : '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.15s',
    }}>
      <div style={{ fontSize: '15px', fontFamily: 'serif', fontWeight: 900, color: active ? color : 'rgba(255,255,255,0.4)', marginBottom: '3px' }}>
        {DEPT_LABELS[d].zh}
      </div>
      <div style={{ fontSize: '9px', color: active ? `${color}aa` : 'rgba(255,255,255,0.18)' }}>
        {DEPT_LABELS[d].en}
      </div>
    </div>
  )
}

const ALL_DEPTS = Object.keys(DEPT_LABELS) as Department[]

export default function MemberLoginPage() {
  const { setUser } = useMember()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Demo only — pre-fills email when a dept is clicked
  const [demoDept, setDemoDept] = useState<Department | null>(null)

  function handleDeptClick(d: Department) {
    setDemoDept(d)
    setError('')
  }

  function handleLogin(e: { preventDefault(): void }) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    // Demo: derive user from email prefix matching a dept
    const match = ALL_DEPTS.find(d => email.toLowerCase().startsWith(d))
    const dept: Department = match ?? 'activity'
    const isFinance = dept === 'finance'

    const user: User = {
      id: `demo-${dept}`,
      name: `${DEPT_LABELS[dept].zh} Leader`,
      email,
      role: isFinance ? 'finance' : 'leader',
      department: dept,
    }

    setTimeout(() => {
      setUser(user)
      router.push('/member/dashboard')
    }, 500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#18120C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
          ← 返回主页
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '14px' }}>
            UCI CSSA · Member Portal
          </div>
          <h1 style={{ fontFamily: 'serif', fontSize: '40px', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '12px' }}>
            Member<br />Login
          </h1>
          <div style={{ width: '32px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)' }} />
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ fontSize: '12px', color: '#E83C3C', padding: '10px 12px', borderRadius: '7px', background: 'rgba(212,43,43,0.1)', border: '1px solid rgba(212,43,43,0.25)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: '4px',
            background: loading ? 'rgba(200,151,58,0.35)' : 'linear-gradient(110deg, #C8973A, #E4C06A)',
            color: '#18120C', padding: '14px', borderRadius: '8px',
            border: 'none', fontSize: '14px', fontWeight: 800,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        {/* Demo dept picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Demo — pick a department</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px' }}>
          {ALL_DEPTS.filter(d => d !== 'finance').map(d => <DeptTile key={d} d={d} active={demoDept === d} onClick={handleDeptClick} />)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '7px' }}>
          <div style={{ width: 'calc(33.333% - 5px)' }}>
            <DeptTile d="finance" active={demoDept === 'finance'} onClick={handleDeptClick} />
          </div>
        </div>

      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px', borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  fontSize: '14px', background: 'rgba(255,255,255,0.05)',
  color: 'white', outline: 'none', width: '100%',
}
