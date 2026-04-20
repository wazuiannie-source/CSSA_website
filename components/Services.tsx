export default function Services() {
  const services = [
    { num: '01', icon: '🧭', title: '新生答疑', desc: '解答报到、选课、住宿、交通等常见问题，帮助新生快速适应 UCI 生活。' },
    { num: '02', icon: '📚', title: '资源整合', desc: '整合校园内外实用信息与支持渠道，提升信息获取效率。' },
    { num: '03', icon: '💼', title: '学术与职业支持', desc: '职业发展活动、实习求职资源与企业交流，助力职场起步。' },
    { num: '04', icon: '🎉', title: '社交活动', desc: '节日活动与兴趣类活动，让你在异乡也能感受到家的温暖。' },
    { num: '05', icon: '🏫', title: '校园融入', desc: '帮助学生融入 UCI 校园与本地社区，拓宽视野，连接多元文化。' },
    { num: '06', icon: '🤝', title: '社区连接', desc: '搭建中美文化交流平台，打造真正属于你的 UCI 华人家园。' },
  ]

  return (
    <section id="services" style={{ background: '#FDFAF5', padding: '104px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end', marginBottom: '48px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
              05 — 服务
            </div>
            <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.1 }}>
              全方位支持<br />陪伴每一步
            </h2>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(24,18,12,0.7)' }}>
            UCI CSSA 为每一位在 UCI 的中国学生学者提供全面支持，无论你是刚刚抵达的新生，还是已在校的同学，我们都在这里。
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {services.map((s) => (
            <div key={s.num} style={{ background: 'white', borderRadius: '12px', padding: '28px 24px', border: '1.5px solid rgba(24,18,12,0.14)' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, color: 'rgba(212,43,43,0.08)', lineHeight: 1, marginBottom: '12px' }}>{s.num}</div>
              <div style={{ fontSize: '26px', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'serif', fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</div>
              <p style={{ fontSize: '13px', color: 'rgba(24,18,12,0.45)', lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}