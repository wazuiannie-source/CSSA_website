'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '68px',
      background: 'rgba(18,12,8,0.82)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <Image src="/logo.PNG" alt="UCI CSSA" width={36} height={36} style={{ borderRadius: '50%' }} />
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'white', letterSpacing: '0.02em' }}>UCI CSSA</div>
          <div style={{ fontSize: '9px', color: 'rgba(200,151,58,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Chinese Students & Scholars</div>
        </div>
      </Link>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2px', listStyle: 'none', margin: 0, padding: 0, marginLeft: 'auto', marginRight: '24px' }}>
        {[
          { href: '#events', label: '活动' },
          { href: '/member', label: '成员中心' },
          { href: '/yearbook', label: '年鉴' },
          { href: '/yearbook/album', label: '新生相册' },
        ].map((link) => (
          <li key={link.href}>
            <a href={link.href} style={{
              fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none', padding: '8px 18px', borderRadius: '100px', display: 'block',
              letterSpacing: '0.02em',
            }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#sponsors" style={{
        fontSize: '12px', fontWeight: 700, color: '#18120C',
        background: 'linear-gradient(110deg, #C8973A, #E4C06A)',
        padding: '10px 24px', borderRadius: '100px', textDecoration: 'none',
        letterSpacing: '0.04em',
      }}>
        赞助合作
      </a>

    </nav>
  )
}
