import Image from 'next/image'

export default function Join() {
  return (
    <section id="join" style={{ padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', minHeight: '600px' }}>

        {/* Left image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/image2.jpg" alt="Join CSSA" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, rgba(253,250,245,0.7) 100%)' }} />
        </div>

        {/* Right content */}
        <div style={{ background: '#FDFAF5', padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(24,18,12,0.14)' }}>

          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            04 — 加入我们
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(26px, 2.8vw, 42px)', fontWeight: 900, lineHeight: 1.18, marginBottom: '8px' }}>
            成为 UCI CSSA<br />大家庭的一员
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(24,18,12,0.45)', marginBottom: '24px' }}>Join Our Community</p>
          <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(24,18,12,0.7)', marginBottom: '32px', maxWidth: '380px' }}>
            欢迎加入 UCI CSSA！我们会通过微信公众号定期发布招新信息、活动机会与组织动态，期待更多有想法、有热情的同学加入我们。
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
            <a href="/join" style={{ background: '#D42B2B', color: 'white', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
              立即加入我们 →
            </a>
            <a href="#" style={{ border: '1.5px solid rgba(24,18,12,0.14)', color: 'rgba(24,18,12,0.7)', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              招募信息
            </a>
          </div>

          {/* Channels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '70%' }}>
            {[
              { icon: '💬', name: '微信公众号', handle: 'UCI-CSSA' },
              { icon: '📸', name: 'Instagram', handle: '@uci_cssa' },
              { icon: '🌸', name: '小红书', handle: 'UCI_CSSA' },
              { icon: '✉️', name: '邮箱联系', handle: 'ucicssazotzot@gmail.com' },
            ].map((ch) => (
              <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'white', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '10px', height: '64px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>
                  {ch.icon}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#18120C', whiteSpace: 'nowrap' }}>{ch.name}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(24,18,12,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch.handle}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}