'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const PHOTOS = [
  '/image1.jpg', '/image2.jpg', '/image3.jpg', '/image7.jpg',
  '/image8.jpg', '/image9.jpg', '/image10.jpg',
  '/yearbooks/2425/1.png', '/yearbooks/2425/3.png', '/yearbooks/2425/5.png',
  '/yearbooks/2425/8.png', '/yearbooks/2425/12.png', '/yearbooks/2425/15.png',
  '/yearbooks/2425/18.png', '/yearbooks/2425/20.png', '/yearbooks/2425/22.png',
  '/yearbooks/2425/25.png', '/yearbooks/2425/28.png', '/yearbooks/2425/30.png',
  '/yearbooks/2425/33.png',
]

interface Tile {
  id: number
  src: string
  sx: string
  sy: string
  delay: number
  size: number
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
      delay: 0,
      size: 180 + Math.floor(Math.random() * 100),
    }))
  )
  const [phase, setPhase] = useState<Phase>('scatter')

  useEffect(() => {
    setTimeout(() => setPhase('gather'), 200)
    setTimeout(() => setPhase('logo'), 4200)   // after all images arrive (200 + 3600 + buffer)
    setTimeout(() => setPhase('fade'), 5800)
    setTimeout(() => onDone(), 7200)
  }, [onDone])

  const logoOpacity = phase === 'scatter' || phase === 'gather' ? 0 : phase === 'logo' ? 1 : 0
  const logoScale = phase === 'scatter' || phase === 'gather' ? 0.6 : phase === 'logo' ? 1 : 1.05

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
            width: t.size,
            height: t.size,
            borderRadius: '12px',
            overflow: 'hidden',
            left: phase === 'scatter' ? t.sx : '50%',
            top: phase === 'scatter' ? t.sy : '50%',
            transform: phase === 'scatter'
              ? 'translate(-50%, -50%) scale(1.8)'
              : 'translate(-50%, -50%) scale(0.08)',
            opacity: phase === 'scatter' ? 0
              : phase === 'gather' ? 1
              : phase === 'logo' ? 0
              : 0,
            transition: phase === 'gather'
              ? `left 3.6s cubic-bezier(0.4,0,1,0.9), top 3.6s cubic-bezier(0.4,0,1,0.9), transform 3.6s cubic-bezier(0.4,0,1,0.9), opacity 0.8s ease`
              : phase === 'logo'
              ? 'opacity 2s ease'
              : 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Image src={t.src} alt="" fill style={{ objectFit: 'cover' }} />
        </div>
      ))}

      {/* Logo — starts as ghost, grows clear as images arrive */}
      <div style={{
        position: 'absolute',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        transition: phase === 'logo'
          ? 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.2,0,0,1)'
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
