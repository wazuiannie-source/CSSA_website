export default function Partners() {
  const partners = [
    { name: 'Company A', category: '战略合作' },
    { name: 'Company B', category: '活动赞助' },
    { name: 'Company C', category: '招聘合作' },
    { name: 'Company D', category: '活动赞助' },
    { name: 'Company E', category: '媒体合作' },
    { name: 'Company F', category: '战略合作' },
    { name: 'Company G', category: '招聘合作' },
    { name: 'Company H', category: '活动赞助' },
  ]

  return (
    <section style={{ background: '#18120C', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            合作伙伴
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
            我们的合作伙伴
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginTop: '10px' }}>Our Partners & Sponsors</p>
        </div>

        {/* Partner grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {partners.map((p) => (
            <div key={p.name} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '10px', padding: '32px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
            }}>
              {/* Placeholder logo box */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '10px',
                background: 'rgba(200,151,58,0.08)',
                border: '1px solid rgba(200,151,58,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', color: 'rgba(200,151,58,0.4)',
              }}>
                ◈
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(200,151,58,0.6)', marginTop: '4px', letterSpacing: '0.05em' }}>{p.category}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
