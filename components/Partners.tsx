import Image from 'next/image'

const sponsors = [
  { name: 'ENC Mobile', logo: '/sponsor_logo/ENC.png' },
  { name: '亨瑞移民・留学', logo: '/sponsor_logo/HG.png' },
  { name: 'Virtuous Sea', logo: '/sponsor_logo/Virtuous_sea.png' },
  { name: 'Kimber Health', logo: '/sponsor_logo/kimber_health.png' },
  { name: 'Wall Street Tequila', logo: '/sponsor_logo/wall_street_tequila.png' },
  { name: '新東方教育科技集团', logo: '/sponsor_logo/xindongfang.png' },
]

export default function Partners() {
  return (
    <section style={{ background: '#18120C', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            赞助商
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
            我们的赞助商
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginTop: '10px' }}>Our Sponsors</p>
        </div>

        {/* Sponsor grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {sponsors.map((s) => (
            <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '2 / 1',
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <Image src={s.logo} alt={s.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: 'serif', fontSize: '15px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center', letterSpacing: '0.02em', lineHeight: 1.35 }}>{s.name}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
