'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdJs49CxIZViE3s_3DIuDADzpz5gggO_TUWHjS18UPnFjjWKQ/viewform'

export default function AlbumPage() {
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    setPageUrl(FORM_URL)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#18120C', paddingTop: '68px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* Header */}
        <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}>← 返回首页</Link>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '14px' }}>UCI CSSA · 新生相册</div>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: '8px' }}>2026年新生相册</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>报名通道 · Class of 2030</p>
        <div style={{ width: '40px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)', marginTop: '16px', marginBottom: '48px' }} />

        {/* Description */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '8px' }}>
            想在官方公众号C位出道？
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            欢迎大胆展示自己，让更多小食蚁兽们认识你，建立属于你的UCI朋友圈。
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'linear-gradient(110deg, #C8973A, #E4C06A)',
            color: '#18120C',
            padding: '18px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 800,
            textDecoration: 'none',
            marginBottom: '48px',
          }}
        >
          点击报名 →
        </a>

        {/* QR Code */}
        {pageUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px' }}>
              <QRCodeSVG value={pageUrl} size={160} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>扫码填写报名表</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>或点击上方按钮</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
