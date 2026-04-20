import Image from 'next/image'

export default function Events() {
  return (
    <section id="events" style={{ background: '#FDFAF5', padding: '104px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
              02 — 活动
            </div>
            <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              每一场活动<br />都是印记
            </h2>
          </div>
          <a href="#team" style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(24,18,12,0.45)', textDecoration: 'none' }}>
            查看全部相册 →
          </a>
        </div>

        {/* Featured event */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '480px', marginBottom: '10px', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 56px rgba(24,18,12,0.1)' }}>
          <div style={{ position: 'relative' }}>
            <Image src="/image3.jpg" alt="Spring Gala" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ background: '#18120C', padding: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E4B55A', marginBottom: '20px' }}>年度盛典 · Annual Event</div>
              <h3 style={{ fontFamily: 'serif', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: 'white' }}>
                春晚<br />Spring Gala
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)' }}>
                UCI 华人社团中具有代表性的年度大型活动，涵盖舞台表演、嘉宾互动与节庆体验。
              </p>
            </div>
            <a href="#" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E4B55A', textDecoration: 'none' }}>
              查看活动相册 →
            </a>
          </div>
        </div>

        {/* Small event cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { src: '/image8.jpg', tag: '迎新活动', title: '新生见面会', desc: '学长学姐分享在美留学生活经验，互动答疑抽奖。' },
            { src: '/image9.jpg', tag: '体育竞技', title: '篮球赛', desc: '组队竞技，增强同学联系与参与感。' },
            { src: '/image1.jpg', tag: '社交娱乐', title: '万圣节活动', desc: '换装出行，一起体验美国节日文化。' },
          ].map((card) => (
            <div key={card.title} style={{ position: 'relative', height: '280px', borderRadius: '14px', overflow: 'hidden' }}>
              <Image src={card.src} alt={card.title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(24,18,12,0.88) 0%, transparent 55%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E4B55A', marginBottom: '6px' }}>{card.tag}</div>
                <div style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginTop: '6px' }}>{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}