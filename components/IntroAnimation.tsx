'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const PHOTOS = [
  '/image1.jpg', '/image2.jpg', '/image3.jpg',
  '/image7.jpg', '/image8.jpg', '/image9.jpg',
  '/image10.jpg', '/image1.jpg', '/image2.jpg', '/image3.jpg',
  '/image7.jpg', '/image8.jpg',
]

// 12 non-overlapping positions arranged in a 4×3 collage across the screen
const DESTINATIONS = [
  { tx: '11%', ty: '14%' }, { tx: '33%', ty: '10%' }, { tx: '56%', ty: '13%' }, { tx: '80%', ty: '11%' },
  { tx: '20%', ty: '46%' }, { tx: '42%', ty: '50%' }, { tx: '65%', ty: '44%' }, { tx: '87%', ty: '48%' },
  { tx: '10%', ty: '78%' }, { tx: '33%', ty: '82%' }, { tx: '57%', ty: '76%' }, { tx: '80%', ty: '80%' },
]

interface Tile {
  id: number
  src: string
  sx: string
  sy: string
  tx: string
  ty: string
  delay: number
}

type Phase = 'scatter' | 'gather' | 'logo' | 'fade'

function randomEdge() {
  const edge = Math.floor(Math.random() * 4)
  const pct = Math.random() * 100
  if (edge === 0) return { sx: `${pct}vw`, sy: `-15vh` }
  if (edge === 1) return { sx: `${pct}vw`, sy: `115vh` }
  if (edge === 2) return { sx: `-15vw`, sy: `${pct}vh` }
  return { sx: `115vw`, sy: `${pct}vh` }
}

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [tiles] = useState<Tile[]>(() =>
    PHOTOS.map((src, i) => ({
      id: i,
      src,
      ...randomEdge(),
      tx: DESTINATIONS[i].tx,
      ty: DESTINATIONS[i].ty,
      delay: i * 0.15,
    }))
  )
  const [phase, setPhase] = useState<Phase>('scatter')

  useEffect(() => {
    setTimeout(() => setPhase('gather'), 200)
    setTimeout(() => setPhase('logo'), 5800)
    setTimeout(() => setPhase('fade'), 6300)
    setTimeout(() => onDone(), 8200)
  }, [onDone])

  const logoOpacity = phase === 'scatter' ? 0 : phase === 'gather' ? 1 : phase === 'logo' || phase === 'fade' ? 1 : 0
  const logoScale = phase === 'scatter' ? 0.2 : phase === 'gather' ? 1 : phase === 'logo' ? 1 : phase === 'fade' ? 1.05 : 0.2

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#18120C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'fade' ? 0 : 1,
      transition: phase === 'fade' ? 'opacity 1.4s ease' : 'none',
      pointerEvents: phase === 'fade' ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* Flying photo tiles */}
      {tiles.map((t) => (
        <div
          key={t.id}
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '12px',
            overflow: 'hidden',
            left: phase === 'scatter' ? t.sx : t.tx,
            top: phase === 'scatter' ? t.sy : t.ty,
            transform: 'translate(-50%, -50%)',
            opacity: phase === 'scatter' ? 0
              : phase === 'gather' ? 1
              : phase === 'logo' ? 0
              : 0,
            transition: phase === 'gather'
              ? `left 3.6s cubic-bezier(0.4,0,1,0.9) ${t.delay}s, top 3.6s cubic-bezier(0.4,0,1,0.9) ${t.delay}s, opacity 1.4s ease ${t.delay}s`
              : phase === 'logo'
              ? 'opacity 2s ease'
              : 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Image src={t.src} alt="" fill style={{ objectFit: 'cover' }} />
        </div>
      ))}

      {/* Logo */}
      <div style={{
        position: 'absolute',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        transition: phase === 'gather'
          ? 'opacity 5.45s ease, transform 5.45s cubic-bezier(0.7,0,0.95,1)'
          : phase === 'logo'
          ? 'none'
          : 'opacity 1.4s ease',
        zIndex: 2,
      }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', overflow: 'hidden', position: 'relative', boxShadow: '0 0 80px rgba(200,151,58,0.3)' }}>
          <Image src="/logo.PNG" alt="UCI CSSA" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'serif', fontSize: '56px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>UCI CSSA</div>
          <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,151,58,0.8)', marginTop: '10px' }}>Est. 1990 · 中国学生学者联合会</div>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={onDone}
        style={{
          position: 'absolute', bottom: '36px', right: '36px',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 600,
          padding: '7px 16px', borderRadius: '100px', cursor: 'pointer',
          letterSpacing: '0.08em',
        }}
      >
        Skip →
      </button>
    </div>
  )
}
