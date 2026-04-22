export default function Services() {
  const services = [
    {
      tag: '新生',
      title: '刚到 UCI？我们帮你安顿',
      desc: '选课怎么选、住宿怎么找、公交怎么坐——这些问题我们都经历过，也都愿意认真回答你。',
      accent: '#C8973A',
    },
    {
      tag: '文化',
      title: '中国文化，不在异乡消失',
      desc: '春晚、中秋、各种节庆，不只是活动，是让你在这里也能感觉到"家"的方式。',
      accent: '#A0522D',
    },
    {
      tag: '职业',
      title: '实习、求职，不用一个人摸索',
      desc: '内推机会、职场分享、简历修改——我们把前辈踩过的坑变成你的捷径。',
      accent: '#5C6B3A',
    },
    {
      tag: '社区',
      title: '在这里认识真正的朋友',
      desc: '不是只有大型活动，我们也有小聚、兴趣组、随时可以加的群，找到属于你的圈子。',
      accent: '#3A5C6B',
    },
  ]

  return (
    <section id="services" style={{ background: '#FDFAF5', padding: '104px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end', marginBottom: '56px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
              05 — 服务
            </div>
            <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.1 }}>
              我们能帮到你<br />的那些事
            </h2>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(24,18,12,0.55)' }}>
            不是冷冰冰的服务列表。UCI CSSA 是一群真实的同学，在你需要的时候出现。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {services.map((s) => (
            <div key={s.tag} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '36px 32px',
              border: '1px solid rgba(24,18,12,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: s.accent,
                background: `${s.accent}14`,
                padding: '4px 10px',
                borderRadius: '100px',
                alignSelf: 'flex-start',
              }}>
                {s.tag}
              </span>
              <div style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 800, color: '#18120C', lineHeight: 1.3 }}>{s.title}</div>
              <p style={{ fontSize: '14px', color: 'rgba(24,18,12,0.5)', lineHeight: 1.9, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
