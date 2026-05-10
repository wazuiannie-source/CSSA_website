'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMember, DEPT_LABELS, DEPT_COLORS, canReviewReimbursement, Department, Reimbursement } from '../context'

type StatusFilter = 'all' | 'pending' | 'approved' | 'denied'

export default function FinancePage() {
  const { user, reimbursements, reviewReimbursement } = useMember()
  const router = useRouter()

  if (!user) return null
  if (!canReviewReimbursement(user.role)) {
    router.push('/member/dashboard')
    return null
  }

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [deptFilter, setDeptFilter] = useState<Department | 'all'>('all')

  const filtered = reimbursements
    .filter(r => statusFilter === 'all' || r.status === statusFilter)
    .filter(r => deptFilter === 'all' || r.department === deptFilter)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))

  const pendingCount = reimbursements.filter(r => r.status === 'pending').length
  const approvedTotal = reimbursements
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0)
  const pendingTotal = reimbursements
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0)

  const statusColors = {
    pending:  { color: '#C8973A', bg: 'rgba(200,151,58,0.08)', border: 'rgba(200,151,58,0.3)' },
    approved: { color: '#2BA86E', bg: 'rgba(43,168,110,0.08)', border: 'rgba(43,168,110,0.3)' },
    denied:   { color: '#D42B2B', bg: 'rgba(212,43,43,0.08)', border: 'rgba(212,43,43,0.3)' },
  }

  return (
    <div style={{ padding: '48px 52px', maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '10px' }}>
          财务部 · Finance Dashboard
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: '34px', fontWeight: 900, color: '#18120C' }}>
          Reimbursement Review
        </h1>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
        {[
          { label: 'Pending Approval', value: pendingCount, sub: 'requests', color: '#C8973A' },
          { label: 'Pending Amount', value: `$${pendingTotal.toFixed(2)}`, sub: 'to review', color: '#D42B2B' },
          { label: 'Approved Total', value: `$${approvedTotal.toFixed(2)}`, sub: 'disbursed', color: '#2BA86E' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '14px', padding: '22px 24px',
            border: '1px solid rgba(24,18,12,0.07)',
            boxShadow: '0 1px 4px rgba(24,18,12,0.04)',
          }}>
            <div style={{ fontSize: '26px', fontFamily: 'serif', fontWeight: 900, color: '#18120C', marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#18120C' }}>{stat.label}</div>
            <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.35)', marginBottom: '14px' }}>{stat.sub}</div>
            <div style={{ width: '24px', height: '2px', background: stat.color, borderRadius: '1px' }} />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(24,18,12,0.05)', borderRadius: '8px', padding: '3px' }}>
          {(['all', 'pending', 'approved', 'denied'] as StatusFilter[]).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: statusFilter === s ? 700 : 400,
              background: statusFilter === s ? 'white' : 'transparent',
              color: statusFilter === s ? '#18120C' : 'rgba(24,18,12,0.45)',
              boxShadow: statusFilter === s ? '0 1px 3px rgba(24,18,12,0.08)' : 'none',
              textTransform: 'capitalize', transition: 'all 0.15s',
            }}>{s}</button>
          ))}
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value as Department | 'all')} style={{
          padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(24,18,12,0.12)',
          fontSize: '12px', background: 'white', color: '#18120C', cursor: 'pointer', outline: 'none',
        }}>
          <option value="all">All Departments</option>
          {Object.entries(DEPT_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v.zh} · {v.en}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid rgba(24,18,12,0.07)', overflow: 'hidden', boxShadow: '0 1px 6px rgba(24,18,12,0.05)' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(24,18,12,0.35)', fontSize: '14px' }}>
            No requests match the current filters.
          </div>
        ) : (
          filtered.map((r, i) => (
            <FinanceRow
              key={r.id}
              r={r}
              isLast={i === filtered.length - 1}
              onReview={reviewReimbursement}
              reviewerName={user.name}
              statusColors={statusColors}
            />
          ))
        )}
      </div>
    </div>
  )
}

function FinanceRow({
  r, isLast, onReview, statusColors,
}: {
  r: Reimbursement
  isLast: boolean
  onReview: (id: string, status: 'approved' | 'denied') => void
  reviewerName: string
  statusColors: Record<string, { color: string; bg: string; border: string }>
}) {
  const [confirming, setConfirming] = useState<'approved' | 'denied' | null>(null)
  const deptColor = DEPT_COLORS[r.department] ?? '#C8973A'
  const deptLabel = DEPT_LABELS[r.department]
  const s = statusColors[r.status]

  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: isLast ? 'none' : '1px solid rgba(24,18,12,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>

        {/* Dept color bar */}
        <div style={{ width: '4px', alignSelf: 'stretch', borderRadius: '2px', background: deptColor, flexShrink: 0 }} />

        {/* Main info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#18120C' }}>{r.activityName}</span>
            <span style={{
              fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              color: deptColor, padding: '2px 6px', borderRadius: '4px',
              background: `${deptColor}18`, border: `1px solid ${deptColor}40`,
            }}>{deptLabel.zh}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(24,18,12,0.5)', marginBottom: '6px' }}>
            {r.submittedBy} · Submitted {r.submittedAt}
            {r.receiptName && <span style={{ marginLeft: '8px', color: '#C8973A' }}>📄 {r.receiptName}</span>}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(24,18,12,0.65)', lineHeight: 1.55 }}>{r.description}</div>
          {r.reviewedBy && (
            <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.35)', marginTop: '6px' }}>
              {r.status === 'approved' ? 'Approved' : 'Denied'} by {r.reviewedBy} on {r.reviewedAt}
            </div>
          )}
        </div>

        {/* Amount + status + actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '20px', fontFamily: 'serif', fontWeight: 900, color: '#18120C' }}>
            ${r.amount.toFixed(2)}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: s.color, padding: '3px 8px', borderRadius: '4px',
            background: s.bg, border: `1px solid ${s.border}`,
          }}>{r.status}</span>

          {r.status === 'pending' && !confirming && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setConfirming('approved')} style={{
                padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700,
                background: 'rgba(43,168,110,0.1)', color: '#2BA86E',
                border: '1px solid rgba(43,168,110,0.3)',
              }}>Approve</button>
              <button onClick={() => setConfirming('denied')} style={{
                padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700,
                background: 'rgba(212,43,43,0.08)', color: '#D42B2B',
                border: '1px solid rgba(212,43,43,0.25)',
              }}>Deny</button>
            </div>
          )}

          {confirming && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ fontSize: '12px', color: '#18120C', fontWeight: 600 }}>
                Confirm {confirming}?
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setConfirming(null)} style={{
                  padding: '5px 12px', borderRadius: '5px', border: '1px solid rgba(24,18,12,0.15)',
                  fontSize: '11px', background: 'white', color: 'rgba(24,18,12,0.5)', cursor: 'pointer',
                }}>Cancel</button>
                <button onClick={() => { onReview(r.id, confirming); setConfirming(null) }} style={{
                  padding: '5px 12px', borderRadius: '5px', border: 'none',
                  fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                  background: confirming === 'approved' ? '#2BA86E' : '#D42B2B', color: 'white',
                }}>Yes, {confirming}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
