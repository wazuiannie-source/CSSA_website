'use client'
import { useState } from 'react'
import { useMember, DEPT_LABELS, Department, Reimbursement } from '../context'

type Tab = 'submit' | 'mine'

export default function ReimbursementPage() {
  const { user, reimbursements, addReimbursement } = useMember()
  if (!user) return null

  const [tab, setTab] = useState<Tab>('submit')
  const [receipt, setReceipt] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    activityName: '',
    amount: '',
    description: '',
    department: user.department,
  })

  const myRequests = reimbursements
    .filter(r => user.role === 'admin' ? true : r.submittedById === user.id)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    const amt = parseFloat(form.amount)
    if (isNaN(amt) || amt <= 0) return
    setSubmitting(true)
    setTimeout(() => {
      addReimbursement({
        submittedBy: user!.name,
        submittedById: user!.id,
        department: form.department as Department,
        activityName: form.activityName,
        amount: amt,
        description: form.description,
        receiptName: receipt,
        submittedAt: new Date().toISOString().slice(0, 10),
      })
      setForm({ activityName: '', amount: '', description: '', department: user!.department })
      setReceipt(null)
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false); setTab('mine') }, 1800)
    }, 500)
  }

  return (
    <div style={{ padding: '48px 52px', maxWidth: '800px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '10px' }}>
          Club Finance
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: '34px', fontWeight: 900, color: '#18120C' }}>Reimbursements</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', background: 'rgba(24,18,12,0.05)', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {([['submit', 'Submit Request'], ['mine', user.role === 'admin' ? 'All Requests' : 'My Requests']] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', borderRadius: '7px', border: 'none',
            fontSize: '13px', fontWeight: tab === t ? 700 : 400,
            background: tab === t ? 'white' : 'transparent',
            color: tab === t ? '#18120C' : 'rgba(24,18,12,0.5)',
            cursor: 'pointer',
            boxShadow: tab === t ? '0 1px 4px rgba(24,18,12,0.08)' : 'none',
            transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'submit' && (
        submitted ? (
          <div style={{
            padding: '48px', borderRadius: '16px', background: 'white',
            border: '1px solid rgba(24,18,12,0.07)', textAlign: 'center',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 20px',
              background: 'rgba(43,168,110,0.1)', border: '1px solid rgba(43,168,110,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#2BA86E',
            }}>✓</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#18120C', marginBottom: '8px' }}>Request Submitted</div>
            <div style={{ fontSize: '13px', color: 'rgba(24,18,12,0.45)' }}>The Finance department has been notified.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: 'white', borderRadius: '16px', padding: '32px',
            border: '1px solid rgba(24,18,12,0.07)',
            boxShadow: '0 1px 6px rgba(24,18,12,0.05)',
            display: 'flex', flexDirection: 'column', gap: '22px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Activity Name *</label>
                <input required value={form.activityName} onChange={e => setForm(f => ({ ...f, activityName: e.target.value }))}
                  placeholder="e.g. Spring Festival Decoration" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Amount (USD) *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'rgba(24,18,12,0.4)' }}>$</span>
                  <input required type="number" min="0.01" step="0.01" value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    placeholder="0.00" style={{ ...inputStyle, paddingLeft: '26px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Department *</label>
                <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value as Department }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {Object.entries(DEPT_LABELS)
                    .filter(([k]) => k !== 'finance')
                    .map(([k, v]) => <option key={k} value={k}>{v.zh} · {v.en}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Receipt</label>
                <label htmlFor="receipt-upload" style={{ cursor: 'pointer' }}>
                  <div style={{
                    padding: '10px 12px', borderRadius: '8px',
                    border: `1px ${receipt ? 'solid rgba(200,151,58,0.5)' : 'dashed rgba(24,18,12,0.15)'}`,
                    background: receipt ? 'rgba(200,151,58,0.05)' : '#FDFAF5',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '13px', color: receipt ? '#C8973A' : 'rgba(24,18,12,0.4)',
                  }}>
                    <span>{receipt ? '📄' : '↑'}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {receipt ?? 'Upload receipt (PDF)'}
                    </span>
                    {receipt && (
                      <button type="button" onClick={e => { e.preventDefault(); setReceipt(null) }}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(24,18,12,0.4)', fontSize: '13px' }}>✕</button>
                    )}
                  </div>
                </label>
                <input id="receipt-upload" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => { const f = e.target.files?.[0]; if (f) setReceipt(f.name) }}
                  style={{ display: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description *</label>
                <textarea required rows={4} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe what was purchased and how it was used for club activity…"
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px' }}>
              <button type="submit" disabled={submitting} style={{
                background: 'linear-gradient(110deg, #C8973A, #E4C06A)',
                color: '#18120C', padding: '12px 28px', borderRadius: '8px',
                border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              }}>
                {submitting ? 'Submitting…' : 'Submit Request →'}
              </button>
              <div style={{ fontSize: '12px', color: 'rgba(24,18,12,0.4)', lineHeight: 1.6 }}>
                Finance dept will be notified and will review within 3–5 days.
              </div>
            </div>
          </form>
        )
      )}

      {tab === 'mine' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myRequests.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(24,18,12,0.35)', fontSize: '14px', background: 'white', borderRadius: '14px', border: '1px solid rgba(24,18,12,0.07)' }}>
              No reimbursement requests yet.
            </div>
          )}
          {myRequests.map(r => <ReimbursementCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  )
}

function ReimbursementCard({ r }: { r: Reimbursement }) {
  const deptLabel = DEPT_LABELS[r.department]
  const statusStyle: Record<string, { color: string; bg: string; border: string; label: string }> = {
    pending:  { color: '#C8973A', bg: 'rgba(200,151,58,0.08)', border: 'rgba(200,151,58,0.3)', label: 'Pending' },
    approved: { color: '#2BA86E', bg: 'rgba(43,168,110,0.08)', border: 'rgba(43,168,110,0.3)', label: 'Approved' },
    denied:   { color: '#D42B2B', bg: 'rgba(212,43,43,0.08)', border: 'rgba(212,43,43,0.3)', label: 'Denied' },
  }
  const s = statusStyle[r.status]

  return (
    <div style={{
      background: 'white', borderRadius: '14px', padding: '20px 24px',
      border: '1px solid rgba(24,18,12,0.07)',
      boxShadow: '0 1px 4px rgba(24,18,12,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#18120C', marginBottom: '4px' }}>{r.activityName}</div>
          <div style={{ fontSize: '12px', color: 'rgba(24,18,12,0.45)' }}>
            {deptLabel.zh} · {r.submittedBy} · {r.submittedAt}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'serif', color: '#18120C' }}>
            ${r.amount.toFixed(2)}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: s.color, padding: '3px 8px', borderRadius: '4px',
            background: s.bg, border: `1px solid ${s.border}`,
          }}>{s.label}</span>
        </div>
      </div>
      <div style={{ fontSize: '13px', color: 'rgba(24,18,12,0.6)', lineHeight: 1.6, marginBottom: r.receiptName || r.reviewedBy ? '12px' : '0' }}>
        {r.description}
      </div>
      {(r.receiptName || r.reviewedBy) && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(24,18,12,0.06)' }}>
          {r.receiptName && (
            <span style={{ fontSize: '11px', color: '#C8973A', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📄 {r.receiptName}
            </span>
          )}
          {r.reviewedBy && (
            <span style={{ fontSize: '11px', color: 'rgba(24,18,12,0.4)' }}>
              Reviewed by {r.reviewedBy} on {r.reviewedAt}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px', fontWeight: 700, color: 'rgba(24,18,12,0.45)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px', borderRadius: '8px',
  border: '1px solid rgba(24,18,12,0.12)',
  fontSize: '13px', background: '#FDFAF5',
  color: '#18120C', outline: 'none', width: '100%',
}
