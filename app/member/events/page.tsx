'use client'
import { useState } from 'react'
import { useMember, DEPT_LABELS, DEPT_COLORS, canPostEvent, Department, MemberEvent } from '../context'

type DeptFilter = Department | 'all'

export default function EventsPage() {
  const { user, events, addEvent } = useMember()
  if (!user) return null

  const [filter, setFilter] = useState<DeptFilter>('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', date: '', department: user.department as DeptFilter })
  const [submitting, setSubmitting] = useState(false)

  const visibleEvents = events
    .filter(e => {
      if (filter === 'all') return true
      return e.department === filter || e.department === 'all'
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  function handlePost(e: { preventDefault(): void }) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      addEvent({
        title: form.title,
        description: form.description,
        date: form.date,
        department: form.department,
        postedBy: user!.name,
        postedById: user!.id,
      })
      setForm({ title: '', description: '', date: '', department: user!.department })
      setShowForm(false)
      setSubmitting(false)
    }, 400)
  }

  const FILTERS: { value: DeptFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...Object.entries(DEPT_LABELS).map(([k, v]) => ({ value: k as Department, label: v.zh })),
  ]

  return (
    <div style={{ padding: '48px 52px', maxWidth: '860px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '10px' }}>
            Announcements
          </div>
          <h1 style={{ fontFamily: 'serif', fontSize: '34px', fontWeight: 900, color: '#18120C' }}>Events</h1>
        </div>
        {canPostEvent(user.role) && (
          <button
            onClick={() => setShowForm(v => !v)}
            style={{
              background: showForm ? 'rgba(24,18,12,0.07)' : 'linear-gradient(110deg, #C8973A, #E4C06A)',
              color: showForm ? '#18120C' : '#18120C',
              padding: '10px 20px', borderRadius: '8px', border: 'none',
              fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            {showForm ? 'Cancel' : '＋ Post Event'}
          </button>
        )}
      </div>

      {/* Post form */}
      {showForm && (
        <form onSubmit={handlePost} style={{
          marginBottom: '32px', padding: '28px', borderRadius: '14px',
          background: 'white', border: '1px solid rgba(24,18,12,0.1)',
          boxShadow: '0 2px 12px rgba(24,18,12,0.06)',
          display: 'flex', flexDirection: 'column', gap: '18px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#18120C' }}>New Event Announcement</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Event title" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <label style={labelStyle}>Date *</label>
              <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <label style={labelStyle}>Department</label>
              <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value as DeptFilter }))}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                {user.role === 'admin' && <option value="all">All Departments</option>}
                {Object.entries(DEPT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v.zh} · {v.en}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description *</label>
              <textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Details about the event…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
            </div>
          </div>
          <button type="submit" disabled={submitting} style={{
            alignSelf: 'flex-start',
            background: 'linear-gradient(110deg, #C8973A, #E4C06A)',
            color: '#18120C', padding: '10px 24px', borderRadius: '8px',
            border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}>
            {submitting ? 'Posting…' : 'Post Announcement →'}
          </button>
        </form>
      )}

      {/* Dept filter tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {FILTERS.map(f => {
          const active = filter === f.value
          return (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{
              padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
              fontSize: '12px', fontWeight: active ? 700 : 400,
              background: active ? '#18120C' : 'white',
              color: active ? 'white' : 'rgba(24,18,12,0.5)',
              boxShadow: active ? 'none' : '0 1px 3px rgba(24,18,12,0.06)',
              border: active ? 'none' : '1px solid rgba(24,18,12,0.08)',
              transition: 'all 0.15s',
            }}>{f.label}</button>
          )
        })}
      </div>

      {/* Event list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {visibleEvents.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(24,18,12,0.35)', fontSize: '14px' }}>
            No events found for this department.
          </div>
        )}
        {visibleEvents.map(evt => <EventCard key={evt.id} evt={evt} />)}
      </div>
    </div>
  )
}

function EventCard({ evt }: { evt: MemberEvent }) {
  const deptColor = evt.department === 'all' ? '#C8973A' : (DEPT_COLORS[evt.department as Department] ?? '#C8973A')
  const deptLabel = evt.department === 'all'
    ? { zh: '全部', en: 'All Depts' }
    : (DEPT_LABELS[evt.department as Department] ?? { zh: evt.department, en: evt.department })

  const dateObj = new Date(evt.date + 'T12:00:00')
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const isPast = evt.date < new Date().toISOString().slice(0, 10)

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '72px 1fr', gap: '0',
      borderRadius: '14px', overflow: 'hidden',
      background: 'white', border: '1px solid rgba(24,18,12,0.07)',
      boxShadow: '0 1px 4px rgba(24,18,12,0.04)',
      opacity: isPast ? 0.65 : 1,
    }}>
      {/* Date column */}
      <div style={{
        background: deptColor, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '16px 8px',
      }}>
        <div style={{ fontSize: '22px', fontFamily: 'serif', fontWeight: 900, color: 'white', lineHeight: 1 }}>
          {dateObj.getDate()}
        </div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
          {dateObj.toLocaleDateString('en-US', { month: 'short' })}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: deptColor, padding: '2px 6px', borderRadius: '4px',
            background: `${deptColor}18`, border: `1px solid ${deptColor}40`,
          }}>{deptLabel.zh}</span>
          {isPast && <span style={{ fontSize: '9px', color: 'rgba(24,18,12,0.35)', fontWeight: 600 }}>Past</span>}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#18120C', marginBottom: '6px', lineHeight: 1.4 }}>{evt.title}</div>
        <div style={{ fontSize: '12px', color: 'rgba(24,18,12,0.55)', lineHeight: 1.65, marginBottom: '10px' }}>{evt.description}</div>
        <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.35)' }}>
          {dateStr} · Posted by {evt.postedBy}
        </div>
      </div>
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
