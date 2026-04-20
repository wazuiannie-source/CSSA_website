export default function Sponsors() {
  return (
    <section id="sponsors" style={{ background: '#18120C', padding: '104px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Watermark */}
      <div style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'serif', fontSize: '500px', fontWeight: 900, color: 'rgba(255,255,255,0.025)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>龙</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 2 }}>

        {/* Top line */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,151,58,0.4), transparent)', marginBottom: '72px' }} />

        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(200,151,58,0.7)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
          06 — 赞助合作
        </div>
        <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(30px, 3.5vw, 50px)', fontWeight: 900, lineHeight: 1.1, color: 'white', marginBottom: '10px' }}>
          与 UCI CSSA<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(110deg, #C8973A 0%, #E4C06A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>共同成长</em>
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginBottom: '56px' }}>Partner & Sponsor with Us</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginTop: '-80px' }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', marginBottom: '28px' }}>
              UCI CSSA 是 UCI 校园内最具影响力的中国学生学者组织之一，拥有覆盖广泛的学生学者社群与活跃的线上线下渠道。
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', marginBottom: '32px' }}>
              与我们合作，将帮助您的品牌精准触达 UCI 及周边华人留学生群体，实现高质量的品牌曝光与社区连接。
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '40px' }}>
              {[
                { n: '2K+', l: '覆盖学生学者' },
                { n: '20+', l: '年度活动' },
                { n: '35+', l: '年校园深耕' },
              ].map((s, i) => (
                <div key={s.n} style={{ paddingRight: '32px', marginRight: '32px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ fontFamily: 'serif', fontSize: '38px', fontWeight: 900, background: 'linear-gradient(110deg, #C8973A 0%, #E4C06A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <a href="mailto:ucicssazotzot@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(110deg, #C8973A 0%, #E4C06A 100%)', color: '#18120C', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
              联系我们洽谈合作 →
            </a>
          </div>

          {/* Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { n: '01', title: '精准受众触达', desc: '直接触达 UCI 在校中国学生学者，覆盖本科生、研究生及访问学者。' },
              { n: '02', title: '多渠道品牌曝光', desc: '线上社媒推广 + 线下活动现场展示，全方位提升品牌知名度。' },
              { n: '03', title: '高公信力背书', desc: '35 年历史的 UCI 官方注册学生组织，社区信任度高。' },
              { n: '04', title: '灵活合作方案', desc: '支持活动冠名、产品赞助、招聘合作等多种灵活形式。' },
            ].map((w) => (
              <div key={w.n} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '36px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                <div style={{ fontFamily: 'serif', fontSize: '32px', fontWeight: 900, background: 'linear-gradient(110deg, #C8973A 0%, #E4C06A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{w.n}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{w.title}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{w.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}