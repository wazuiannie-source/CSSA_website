import Image from 'next/image'

export default function About() {
  return (
    <section id="about" style={{ background: 'white', padding: '104px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background watermark logo */}
      <div style={{ position: 'absolute', left: '-10%', top: '50%', transform: 'translateY(-50%)', width: '60vw', height: '60vw', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <Image src="/logo.PNG" alt="" fill style={{ objectFit: 'contain', opacity: 0.045 }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px', display: 'grid', gridTemplateColumns: '340px 1fr', gap: '88px', alignItems: 'start', position: 'relative', zIndex: 1 }}>

        {/* Left sticky sidebar */}
        <div style={{ position: 'sticky', top: '84px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            01 — 关于我们
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, lineHeight: 1.18, marginBottom: '10px' }}>
            UCI 华人学生<br />的温暖之家
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(24,18,12,0.45)', marginBottom: '28px' }}>A Home Away from Home</p>
          <blockquote style={{ fontFamily: 'serif', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.75, color: 'rgba(24,18,12,0.7)', paddingLeft: '18px', borderLeft: '3px solid #D42B2B' }}>
            "在异乡，我们是彼此的家园。"
          </blockquote>
        </div>

        {/* Right content */}
        <div>
          <p style={{ fontSize: '15px', lineHeight: 2, color: 'rgba(24,18,12,0.7)', marginBottom: '20px' }}>
            加州大学欧文分校中国学生学者联合会（CSSA at UCI）是一个非政治、非宗教、非营利的公益性自治学生学者团体，也是中国海外留学生学者全球官方组织的重要组成部分。
          </p>
          <p style={{ fontSize: '15px', lineHeight: 2, color: 'rgba(24,18,12,0.7)', marginBottom: '28px' }}>
            UCI-CSSA 成立于 1990 年，并于 2023 年成功注册为 NPO 组织。我们致力于服务中国留学生学者群体，弘扬中华文化，促进中美文化交流。
          </p>

          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
            {['成立于 1990', '注册 NPO 2023', '非政治', '非宗教', '非营利', 'UCI 官方组织'].map((chip, i) => (
              <span key={chip} style={{
                padding: '7px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                background: i < 2 ? '#FDF2F2' : '#F5EFE6',
                border: `1.5px solid ${i < 2 ? '#FAE0E0' : '#EDE4D6'}`,
                color: i < 2 ? '#D42B2B' : 'rgba(24,18,12,0.7)',
              }}>
                {chip}
              </span>
            ))}
          </div>

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { icon: '🎓', title: '新生与在校支持', desc: '选课、住宿、交通答疑，快速适应 UCI 生活' },
              { icon: '🎭', title: '文化活动与社交', desc: '春晚、节庆，让中华文化在海外延续' },
              { icon: '💼', title: '职业发展支持', desc: '峰会、实习资源，助力职业起步' },
              { icon: '🌐', title: '社区与跨文化连接', desc: '搭建中美文化交流平台，连接多元社区' },
            ].map((card) => (
              <div key={card.title} style={{ background: '#FDFAF5', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '12px', padding: '22px 20px' }}>
                <div style={{ fontSize: '22px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ fontFamily: 'serif', fontSize: '14px', fontWeight: 700, marginBottom: '5px' }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(24,18,12,0.45)', lineHeight: 1.7 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}