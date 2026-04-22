'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', paddingTop: '68px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>

      {/* Full background image */}
      <Image
        src="/image2.jpg"
        alt="UCI CSSA"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(24,18,12,0.85) 0%, rgba(24,18,12,0.1) 50%, rgba(24,18,12,0.3) 100%)' }} />

      {/* Top — title */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '100px 44px 0' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#E4C06A', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1.5px', background: '#E4C06A', display: 'inline-block' }} />
          UCI CSSA · Est. 1990
          <span style={{ width: '20px', height: '1.5px', background: '#E4C06A', display: 'inline-block' }} />
        </div>

        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: '16px', animation: 'heroFadeIn 1.2s ease forwards', opacity: 0, textShadow: '2px 4px 16px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
          University of California, <span style={{ color: '#E4C06A' }}>Irvine</span><br /><span style={{ color: '#D42B2B' }}>中国</span>学生学者联合会
        </h1>
        <style>{`
          @keyframes heroFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ height: '2px', width: '40px', background: '#D42B2B' }} />
          <div style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#D42B2B' }} />
          <div style={{ height: '2px', width: '40px', background: '#D42B2B' }} />
        </div>
      </div>

      {/* Bottom — subtitle + buttons + label */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.9, textAlign: 'center', margin: 0 }}>
          在异乡，我们是彼此的家园。<br />
          <span style={{ fontSize: '13px', letterSpacing: '0.04em' }}>Chinese Students &amp; Scholars Association · UC Irvine</span>
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/join" style={{
            background: '#D42B2B', color: 'white',
            padding: '15px 44px', borderRadius: '6px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700, letterSpacing: '0.03em',
          }}>
            加入我们 →
          </Link>
          <a href="/yearbook" style={{
            border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)',
            padding: '15px 40px', borderRadius: '6px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 600,
            backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.08)',
          }}>
            了解更多
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '3px', height: '36px', background: '#D42B2B', borderRadius: '2px' }} />
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '3px' }}>社区活动</div>
              <div style={{ fontFamily: 'serif', fontSize: '15px', fontWeight: 700, color: 'white' }}>UCI CSSA 篮球赛</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</div>
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
          </div>
        </div>
      </div>

    </section>
  )
}
