'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const bgImages = ['/image3.jpg', '/image2.jpg', '/image10.jpg']

const positions = [
  {
    value: 'general',
    label: 'General Member',
    cn: '普通会员',
    desc: '参与活动、享受社区资源',
    icon: '🌟',
  },
  {
    value: 'department',
    label: 'Department Member',
    cn: '部门成员',
    desc: '加入活动、媒体、外联等职能部门',
    icon: '⚙️',
  },
  {
    value: 'board',
    label: 'Board / Core Team',
    cn: '核心团队',
    desc: '参与组织领导与战略决策',
    icon: '👑',
  },
]

export default function JoinPage() {
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null])
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0]
    if (file) {
      const updated = [...previews]
      updated[index] = URL.createObjectURL(file)
      setPreviews(updated)
    }
  }

  function removePhoto(index: number) {
    const updated = [...previews]
    updated[index] = null
    setPreviews(updated)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#18120C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '28px' }}>✓</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 900, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>感谢申请！<br />Thank You.</h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, marginBottom: '40px' }}>
            We've received your application and will be in touch soon through our official channels.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'linear-gradient(110deg, #C8973A, #E4C06A)', color: '#18120C', padding: '14px 36px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
            ← 返回主页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.4fr', background: '#18120C' }}>

      {/* Left panel */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 48px', borderRight: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>

        {/* Cycling background images */}
        {bgImages.map((src, i) => (
          <div key={src} style={{ position: 'absolute', inset: 0, transition: 'opacity 2.5s ease', opacity: i === bgIndex ? 1 : 0, zIndex: 0 }}>
            <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,12,8,0.72)', zIndex: 1 }} />

        <Link href="/" style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 2 }}>
          ← 返回主页
        </Link>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            加入我们
          </div>
          <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: '24px' }}>
            成为大家庭<br />的一员
          </h1>
          <div style={{ width: '40px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)', borderRadius: '1px', marginBottom: '24px' }}></div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: '300px' }}>
            Join UCI CSSA to stay connected with campus events, community resources, and leadership opportunities.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}>
          {positions.map((item) => (
            <div key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '14px', transition: 'opacity 0.2s', opacity: selected === item.value ? 1 : selected ? 0.3 : 0.6 }}>
              <span style={{ fontFamily: 'serif', fontSize: '13px', fontWeight: 900, background: 'linear-gradient(110deg, #C8973A, #E4C06A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {item.value === 'general' ? '01' : item.value === 'department' ? '02' : '03'}
              </span>
              <span style={{ fontSize: '12px', color: selected === item.value ? '#E4C06A' : 'rgba(255,255,255,0.35)' }}>{item.label} · {item.cn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Form */}
      <div style={{ padding: '52px 56px 80px', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '40px', fontWeight: 900, color: 'white', marginBottom: '48px' }}>
          Application Form
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

          {/* Name & Major */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>姓名 · Full Name <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="text" placeholder="Your full name" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>专业 · Major <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="text" placeholder="e.g. Computer Science" style={inputStyle} />
            </div>
          </div>

          {/* Position */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={labelStyle}>申请职位 · Position of Interest <span style={{ color: '#D42B2B' }}>*</span></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {positions.map((opt) => {
                const isSelected = selected === opt.value
                return (
                  <label
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '10px', padding: '24px 16px', borderRadius: '12px', cursor: 'pointer',
                      textAlign: 'center',
                      background: isSelected ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid rgba(200,151,58,0.6)' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input type="radio" name="position" value={opt.value} required style={{ display: 'none' }} />
                    <div style={{ fontSize: '28px' }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#E4C06A' : 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: isSelected ? 'rgba(200,151,58,0.7)' : 'rgba(255,255,255,0.25)' }}>{opt.cn}</div>
                    </div>
                    {isSelected && (
                      <div style={{ fontSize: '10px', color: 'rgba(200,151,58,0.7)', lineHeight: 1.6, marginTop: '4px' }}>{opt.desc}</div>
                    )}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Photo */}
          {true && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>照片 · Photos <span style={{ color: 'rgba(255,255,255,0.25)', textTransform: 'none', letterSpacing: 0 }}>· Optional</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {previews.map((preview, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <label htmlFor={`photo-${i}`} style={{ cursor: preview ? 'default' : 'pointer', display: 'block' }}>
                      <div style={{
                        width: '100%', aspectRatio: '1', borderRadius: '12px',
                        background: preview ? 'transparent' : 'rgba(255,255,255,0.03)',
                        border: `1.5px dashed ${preview ? 'rgba(200,151,58,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', gap: '8px',
                      }}>
                        {preview ? (
                          <img src={preview} alt={`preview-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>↑</div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Photo {i + 1}</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>JPG or PNG</div>
                          </>
                        )}
                      </div>
                    </label>
                    <input id={`photo-${i}`} type="file" accept="image/*" onChange={(e) => handlePhoto(e, i)} style={{ display: 'none' }} />
                    {preview && (
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', background: 'rgba(24,18,12,0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '50%', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>
              是什么吸引你加入我们？· What attracted you? <span style={{ color: '#D42B2B' }}>*</span>
            </label>
            <textarea required rows={6} placeholder="Tell us about yourself and what drew you to join..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Submit */}
          <button type="submit" style={{ background: 'linear-gradient(110deg, #C8973A, #E4C06A)', color: '#18120C', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.02em' }}>
            提交申请 · Submit Application →
          </button>

        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  fontSize: '14px',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}
