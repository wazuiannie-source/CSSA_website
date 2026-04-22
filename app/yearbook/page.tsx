'use client'
import Link from 'next/link'
import Image from 'next/image'

const yearbooks = [
  {
    year: '2425',
    label: '2024 — 25',
    cover: '/yearbooks/2425/1.png',
    count: 50,
    theme: 'Be Loved',
  },
]

export default function YearbookPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#18120C', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 44px 56px' }}>
        <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>← 返回首页</Link>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
          UCI CSSA · 年鉴
        </div>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: '12px' }}>
          历年年鉴
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>Yearbook Collection · UCI CSSA</p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,151,58,0.3), transparent)', marginBottom: '56px' }} />
      </div>

      {/* Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px 100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {yearbooks.map((yb) => (
          <Link key={yb.year} href={`/yearbook/${yb.year}`} style={{ textDecoration: 'none' }}>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(200,151,58,0.2)',
              background: 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,151,58,0.6)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,151,58,0.2)'
              }}
            >
              {/* Cover image */}
              <div style={{ position: 'relative', height: '480px' }}>
                <Image src={yb.cover} alt={yb.label} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,12,8,0.9) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                  <div style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{yb.label}</div>
                  <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'rgba(200,151,58,0.8)', marginTop: '4px' }}>{yb.theme}</div>
                </div>
              </div>
              {/* Footer */}
              <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{yb.count} photos</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#C8973A' }}>查看年鉴 →</div>
              </div>
            </div>
          </Link>
        ))}

        {/* Future placeholder */}
        <div style={{ borderRadius: '16px', border: '1.5px dashed rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '550px', gap: '12px' }}>
          <div style={{ fontSize: '32px', color: 'rgba(200,151,58,0.2)' }}>+</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>Coming Soon</div>
        </div>
      </div>

    </div>
  )
}
