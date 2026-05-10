'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { MemberProvider, useMember, DEPT_LABELS, canReviewReimbursement, canPostEvent } from './context'

const NAV = [
  { href: '/member/dashboard',     label: 'Dashboard',      icon: '⊞' },
  { href: '/member/events',        label: 'Events',         icon: '◈' },
  { href: '/member/reimbursement', label: 'Reimbursements', icon: '◎' },
  { href: '/member/finance',       label: 'Finance',        icon: '◆', financeOnly: true },
]

function Sidebar() {
  const { user, setUser } = useMember()
  const pathname = usePathname()
  const router = useRouter()

  if (!user) return null

  const roleBadgeColor: Record<string, string> = {
    admin:   '#D42B2B',
    leader:  '#C8973A',
    member:  'rgba(255,255,255,0.3)',
    finance: '#2BA86E',
  }

  const visibleNav = NAV.filter(item => {
    if (item.financeOnly) return canReviewReimbursement(user.role)
    return true
  })

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: '#18120C',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: '#C8973A', textTransform: 'uppercase' }}>UCI CSSA</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>Member Portal</div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {visibleNav.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                marginBottom: '4px',
                background: active ? 'rgba(200,151,58,0.12)' : 'transparent',
                color: active ? '#E4C06A' : 'rgba(255,255,255,0.5)',
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '14px', opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
                {active && <div style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: '#C8973A' }} />}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User info + logout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(200,151,58,0.15)',
            border: '1px solid rgba(200,151,58,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, color: '#E4C06A', flexShrink: 0,
          }}>
            {user.name[0]}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: roleBadgeColor[user.role], padding: '1px 5px', borderRadius: '3px',
                background: `${roleBadgeColor[user.role]}1a`, border: `1px solid ${roleBadgeColor[user.role]}40`,
              }}>{user.role}</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '10px' }}>
          {DEPT_LABELS[user.department].zh} · {DEPT_LABELS[user.department].en}
        </div>
        <button
          onClick={() => { setUser(null); router.push('/member') }}
          style={{
            width: '100%', padding: '8px', borderRadius: '6px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.35)', fontSize: '11px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  )
}

function PortalShell({ children }: { children: ReactNode }) {
  const { user } = useMember()
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  if (pathname === '/member') return <>{children}</>

  if (!user) {
    router.push('/member')
    return null
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFAF5' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  )
}

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <MemberProvider>
      <PortalShell>{children}</PortalShell>
    </MemberProvider>
  )
}
