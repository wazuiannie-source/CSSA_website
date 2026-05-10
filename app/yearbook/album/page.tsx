'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'

type SocialChoice = 'instagram' | 'wechat' | 'prefer_not' | 'other'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}

const SOCIAL_OPTIONS: { key: SocialChoice; label: string; placeholder?: string }[] = [
  { key: 'instagram', label: 'Instagram', placeholder: '@username' },
  { key: 'wechat', label: '微信', placeholder: '微信号' },
  { key: 'prefer_not', label: 'Prefer not to say' },
  { key: 'other', label: '其他', placeholder: '账号' },
]

export default function AlbumPage() {
  const [name, setName] = useState('')
  const [major, setMajor] = useState('')
  const [selectedSocials, setSelectedSocials] = useState<Record<SocialChoice, boolean>>({ instagram: false, wechat: false, prefer_not: false, other: false })
  const [socialValues, setSocialValues] = useState<Record<SocialChoice, string>>({ instagram: '', wechat: '', prefer_not: '', other: '' })
  const [tags, setTags] = useState('')
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null])
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  function handlePhoto(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotos(p => { const next = [...p]; next[index] = ev.target?.result as string; return next })
    reader.readAsDataURL(file)
  }

  function toggleSocial(key: SocialChoice) {
    setSelectedSocials(s => ({ ...s, [key]: !s[key] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) { setError('请填写姓名。'); return }
    if (!major) { setError('请填写专业。'); return }
    if (!Object.values(selectedSocials).some(Boolean)) { setError('请选择至少一项社交账号。'); return }
    if (!tags) { setError('请填写兴趣爱好/Tag。'); return }
    if (!photos[0]) { setError('请上传至少一张照片。'); return }
    if (!agreed) { setError('请同意使用条款。'); return }

    const socials = SOCIAL_OPTIONS
      .filter(o => selectedSocials[o.key])
      .map(o => ({ type: o.key, value: socialValues[o.key] }))

    setLoading(true)
    try {
      const res = await fetch('/api/album', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, major, socials, tags, photos }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('提交失败，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#18120C', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
          <h2 style={{ fontFamily: 'serif', fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '12px' }}>提交成功！</h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>感谢你的投稿，我们会尽快审核并发布。</p>
          <Link href="/" style={{ fontSize: '13px', color: '#C8973A', textDecoration: 'none' }}>← 返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#18120C', paddingTop: '68px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* Header */}
        <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}>← 返回首页</Link>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '14px' }}>UCI CSSA · 新生相册</div>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: '8px' }}>2026年新生相册</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>报名通道 · Class of 2030</p>
        <div style={{ width: '40px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)', marginTop: '16px', marginBottom: '48px' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Preferred Name */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
              Preferred Name <span style={{ color: '#E83C3C' }}>*</span>
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>请填写想要放在介绍部分的名字</p>
            <input style={inputStyle} placeholder="姓名或者昵称均可" value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* 专业 */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
              专业 <span style={{ color: '#E83C3C' }}>*</span>
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>Major</p>
            <input style={inputStyle} value={major} onChange={e => setMajor(e.target.value)} />
          </div>

          {/* 社交账号 */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
              社交账号 <span style={{ color: '#E83C3C' }}>*</span>
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>请选择你想要放在介绍里的社交媒体</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOCIAL_OPTIONS.map(opt => (
                <div key={opt.key}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
                    <input type="checkbox" checked={selectedSocials[opt.key]} onChange={() => toggleSocial(opt.key)}
                      style={{ width: '16px', height: '16px', accentColor: '#C8973A', cursor: 'pointer' }} />
                    {opt.label}
                  </label>
                  {selectedSocials[opt.key] && opt.placeholder && (
                    <input style={{ ...inputStyle, marginTop: '8px' }} placeholder={opt.placeholder}
                      value={socialValues[opt.key]} onChange={e => setSocialValues(s => ({ ...s, [opt.key]: e.target.value }))} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tag / 兴趣爱好 */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
              #Tag / 兴趣爱好 <span style={{ color: '#E83C3C' }}>*</span>
            </p>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' } as React.CSSProperties}
              placeholder="例：旅游 拍照 烘焙 音乐 篮球" value={tags} onChange={e => setTags(e.target.value)} />
          </div>

          {/* Photos */}
          {[
            { label: '请上传你的照片', required: true, index: 0 },
            { label: '请上传你的第二张照片', required: false, index: 1 },
            { label: '请上传你的第三张照片', required: false, index: 2 },
          ].map(({ label, required, index }) => (
            <div key={index}>
              <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
                {label}{' '}
                {required
                  ? <span style={{ color: '#E83C3C' }}>*</span>
                  : <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>(Optional)</span>
                }
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>
                支持 .jpg .png .gif .bmp .webp 格式
              </p>
              <div onClick={() => fileRefs[index].current?.click()} style={{
                width: '160px', height: '160px', borderRadius: '10px', overflow: 'hidden',
                border: '1.5px dashed rgba(255,255,255,0.15)', cursor: 'pointer',
                background: photos[index] ? 'transparent' : 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {photos[index]
                  ? <img src={photos[index]!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>📷</div>
                      选择图片
                    </div>
                }
              </div>
              <input ref={fileRefs[index]} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handlePhoto(index, e)} />
            </div>
          ))}

          {/* 同意条款 */}
          <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
              是否同意将上述信息用于CHINESE UNION的媒体当中 <span style={{ color: '#E83C3C' }}>*</span>
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
              所有图片以及信息将不会用于商用，仅用于CU公众号发表
            </p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
              <input type="radio" checked={agreed} onChange={() => setAgreed(true)}
                style={{ width: '16px', height: '16px', accentColor: '#C8973A', cursor: 'pointer' }} />
              同意
            </label>
          </div>

          {error && (
            <div style={{ fontSize: '12px', color: '#E83C3C', padding: '10px 12px', borderRadius: '7px', background: 'rgba(212,43,43,0.1)', border: '1px solid rgba(212,43,43,0.25)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            background: loading ? 'rgba(200,151,58,0.35)' : 'linear-gradient(110deg, #C8973A, #E4C06A)',
            color: loading ? 'rgba(255,255,255,0.5)' : '#18120C',
            border: 'none', padding: '16px',
            borderRadius: '8px', fontSize: '15px', fontWeight: 800,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? '提交中…' : '提交'}
          </button>

        </form>

        {/* QR Code */}
        {pageUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '56px', padding: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px' }}>
              <QRCodeSVG value={pageUrl} size={160} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>扫码填写报名表</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{pageUrl}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
