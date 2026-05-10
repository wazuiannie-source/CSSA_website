'use client'
import Link from 'next/link'
import { useMember, DEPT_LABELS, DEPT_COLORS, canPostEvent, canReviewReimbursement } from '../context'

export default function DashboardPage() {
  const { user, events, reimbursements } = useMember()
  if (!user) return null

  const today = new Date().toISOString().slice(0, 10)

  const upcomingEvents = events
    .filter(e => e.date >= today && (e.department === 'all' || e.department === user.department || user.role === 'admin'))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  const myReimbursements = reimbursements.filter(r =>
    user.role === 'admin' || user.role === 'finance'
      ? true
      : r.submittedById === user.id
  )

  const pendingCount = reimbursements.filter(r => r.status === 'pending').length
  const myPendingCount = reimbursements.filter(r => r.submittedById === user.id && r.status === 'pending').length

  const roleColor: Record<string, string> = {
    admin: '#D42B2B', leader: '#C8973A', member: 'rgba(24,18,12,0.4)', finance: '#2BA86E'
  }

  const quickActions = [
    canPostEvent(user.role) && { href: '/member/events', label: 'Post Event', icon: '＋', desc: 'Announce to your department' },
    { href: '/member/reimbursement', label: 'Request Reimbursement', icon: '◎', desc: 'Submit a money request' },
    canReviewReimbursement(user.role) && { href: '/member/finance', label: 'Review Requests', icon: '◆', desc: `${pendingCount} pending approval` },
  ].filter(Boolean) as { href: string; label: string; icon: string; desc: string }[]

  return (
    <div style={{ padding: '48px 52px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '10px' }}>
          Welcome back
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: '38px', fontWeight: 900, color: '#18120C', lineHeight: 1.1, marginBottom: '12px' }}>
          {user.name}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: roleColor[user.role],
            padding: '3px 8px', borderRadius: '4px',
            background: `${roleColor[user.role]}18`,
            border: `1px solid ${roleColor[user.role]}40`,
          }}>{user.role}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(24,18,12,0.2)' }} />
          <span style={{ fontSize: '13px', color: 'rgba(24,18,12,0.5)' }}>
            {DEPT_LABELS[user.department].zh} · {DEPT_LABELS[user.department].en}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '44px' }}>
        {[
          {
            label: 'Upcoming Events',
            value: upcomingEvents.length,
            sub: 'in your scope',
            color: '#D42B2B',
          },
          {
            label: canReviewReimbursement(user.role) ? 'Pending Approvals' : 'My Pending Requests',
            value: canReviewReimbursement(user.role) ? pendingCount : myPendingCount,
            sub: 'awaiting review',
            color: '#C8973A',
          },
          {
            label: 'Departments',
            value: 7,
            sub: 'in CSSA',
            color: '#2BA86E',
          },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white',
            borderRadius: '14px',
            padding: '24px',
            border: '1px solid rgba(24,18,12,0.07)',
            boxShadow: '0 1px 4px rgba(24,18,12,0.04)',
          }}>
            <div style={{ fontSize: '32px', fontFamily: 'serif', fontWeight: 900, color: '#18120C', marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#18120C', marginBottom: '3px' }}>{stat.label}</div>
            <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.35)' }}>{stat.sub}</div>
            <div style={{ marginTop: '16px', width: '28px', height: '2px', background: stat.color, borderRadius: '1px' }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Quick actions */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(24,18,12,0.4)', marginBottom: '14px' }}>
            Quick Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quickActions.map(action => (
              <Link key={action.href} href={action.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 18px', borderRadius: '12px',
                  background: 'white', border: '1px solid rgba(24,18,12,0.07)',
                  boxShadow: '0 1px 3px rgba(24,18,12,0.04)',
                  transition: 'all 0.15s',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', color: '#C8973A',
                  }}>{action.icon}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#18120C' }}>{action.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.4)', marginTop: '2px' }}>{action.desc}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'rgba(24,18,12,0.25)', fontSize: '16px' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(24,18,12,0.4)', marginBottom: '14px' }}>
            Upcoming Events
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingEvents.length === 0 && (
              <div style={{ padding: '24px', borderRadius: '12px', background: 'white', border: '1px solid rgba(24,18,12,0.07)', fontSize: '13px', color: 'rgba(24,18,12,0.35)', textAlign: 'center' }}>
                No upcoming events
              </div>
            )}
            {upcomingEvents.map(evt => {
              const deptColor = evt.department === 'all' ? '#C8973A' : DEPT_COLORS[evt.department as keyof typeof DEPT_COLORS] ?? '#C8973A'
              const deptLabel = evt.department === 'all' ? 'All Depts' : DEPT_LABELS[evt.department as keyof typeof DEPT_LABELS]?.zh ?? evt.department
              return (
                <div key={evt.id} style={{
                  padding: '16px 18px', borderRadius: '12px',
                  background: 'white', border: '1px solid rgba(24,18,12,0.07)',
                  boxShadow: '0 1px 3px rgba(24,18,12,0.04)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#18120C', lineHeight: 1.4, flex: 1, paddingRight: '8px' }}>{evt.title}</div>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, flexShrink: 0,
                      color: deptColor, padding: '2px 6px', borderRadius: '4px',
                      background: `${deptColor}18`, border: `1px solid ${deptColor}40`,
                    }}>{deptLabel}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.4)' }}>
                    {new Date(evt.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              )
            })}
            <Link href="/member/events" style={{ fontSize: '12px', color: '#C8973A', textDecoration: 'none', textAlign: 'right', display: 'block', marginTop: '4px' }}>
              View all events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
