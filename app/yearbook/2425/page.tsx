'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TOTAL = 50
const images = Array.from({ length: TOTAL }, (_, i) => `/yearbooks/2425/${i + 1}.png`)
const KB = ['kb1', 'kb2', 'kb3', 'kb4']
const DURATION = 4000

export default function Yearbook2425() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [shownImages, setShownImages] = useState<number[]>([])

  const goTo = useCallback((idx: number) => {
    setShownImages(prev => prev.includes(current) ? prev : [...prev, current])
    setPrev(current)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => goTo((current + 1) % TOTAL), [current, goTo])
  const back = useCallback(() => goTo((current - 1 + TOTAL) % TOTAL), [current, goTo])

  useEffect(() => {
    if (!playing || showGrid) return
    const t = setTimeout(next, DURATION)
    return () => clearTimeout(t)
  }, [current, playing, showGrid, next])

  if (showGrid) {
    return (
      <div style={{ minHeight: '100vh', background: '#18120C', paddingTop: '68px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <Link href="/yearbook" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-block', marginBottom: '10px' }}>← 年鉴</Link>
              <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 900, color: 'white' }}>2024 — 25</h1>
              <p style={{ fontSize: '13px', color: 'rgba(200,151,58,0.7)', marginTop: '4px', fontStyle: 'italic' }}>Be Loved</p>
            </div>
            <button onClick={() => setShowGrid(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              ▶ 播放幻灯片
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {images.map((src, i) => (
              <div key={i} onClick={() => setLightbox(i)} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '10px 10px 32px',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) rotate(0.5deg)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.6)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                  <Image src={src} alt={`Photo ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', letterSpacing: '0.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
              <Image src={images[lightbox]} alt="" width={1200} height={800} style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto' }} />
              <button onClick={() => setLightbox((lightbox - 1 + TOTAL) % TOTAL)} style={{ position: 'absolute', left: '-56px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>‹</button>
              <button onClick={() => setLightbox((lightbox + 1) % TOTAL)} style={{ position: 'absolute', right: '-56px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>›</button>
              <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '-44px', right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '20px' }}>✕</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#18120C', overflow: 'hidden' }}>

      {/* Background mosaic of previously viewed images */}
      {shownImages.length > 0 && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gap: '2px',
          opacity: 0.28,
          overflow: 'hidden',
        }}>
          {shownImages.map((idx) => (
            <div key={idx} style={{ overflow: 'hidden', animation: 'flyToBack 0.9s cubic-bezier(0.2,0,0.4,1) forwards' }}>
              <img src={images[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      {/* Previous slide (fading out) */}
      {prev !== null && (
        <div key={`prev-${prev}`} style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 1.5s ease', zIndex: 1 }}>
          <div style={{ position: 'absolute', inset: '5%', animation: `${KB[prev % 4]} 6s ease forwards` }}>
            <Image src={images[prev]} alt="" fill style={{ objectFit: 'contain' }} priority />
          </div>
        </div>
      )}

      {/* Current slide */}
      <div key={`cur-${current}`} style={{ position: 'absolute', inset: 0, opacity: 1, animation: 'fadeIn 1.5s ease', zIndex: 2 }}>
        <div style={{ position: 'absolute', inset: '5%', animation: `${KB[current % 4]} 6s ease forwards` }}>
          <Image src={images[current]} alt="" fill style={{ objectFit: 'contain' }} priority />
        </div>
      </div>

      {/* Dark vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)', zIndex: 3, pointerEvents: 'none' }} />

      {/* Film grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")', opacity: 0.4, zIndex: 4, pointerEvents: 'none', mixBlendMode: 'overlay' }} />

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}>
        <Link href="/yearbook" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>← 年鉴</Link>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 900, color: 'white' }}>2024 — 25</div>
          <div style={{ fontSize: '10px', fontStyle: 'italic', color: 'rgba(200,151,58,0.7)' }}>Be Loved</div>
        </div>
        <button onClick={() => setShowGrid(true)} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '100px', cursor: 'pointer' }}>
          Skip →
        </button>
      </div>

      {/* Prev / Next */}
      <button onClick={back} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', fontSize: '22px' }}>‹</button>
      <button onClick={next} style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', fontSize: '22px' }}>›</button>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 36px 28px', zIndex: 10, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '400px' }}>
          {images.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === current ? '#E4C06A' : 'rgba(255,255,255,0.25)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
          ))}
        </div>
        {/* Counter + play/pause */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{current + 1} / {TOTAL}</span>
          <button onClick={() => setPlaying(p => !p)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '100px', cursor: 'pointer', fontSize: '12px' }}>
            {playing ? '⏸ 暂停' : '▶ 播放'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes flyToBack {
          from { transform: scale(3.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes kb1 { from { transform: scale(1.0) translate(0%,0%); } to { transform: scale(1.15) translate(-3%,-2%); } }
        @keyframes kb2 { from { transform: scale(1.1) translate(2%,1%); } to { transform: scale(1.0) translate(-2%,-1%); } }
        @keyframes kb3 { from { transform: scale(1.0) translate(-2%,2%); } to { transform: scale(1.15) translate(3%,-2%); } }
        @keyframes kb4 { from { transform: scale(1.15) translate(0%,-2%); } to { transform: scale(1.0) translate(-3%,2%); } }
      `}</style>
    </div>
  )
}
