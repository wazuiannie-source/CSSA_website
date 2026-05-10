'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const bgImages = ['/image3.jpg', '/image2.jpg', '/image10.jpg']

const departments = [
  {
    value: 'activity',
    label: '活动部',
    en: 'Activities',
    img: '/activite.png',
    desc: '活动部是CSSA的脊骨部门之一，负责举办、策划和落实文化、娱乐和休闲活动，包括文化节、手工摊位、主题派对、志愿活动等。',
    why: '丰富校园生活，传播中华文化，培养大局观与领导力。',
    count: '3–6 人',
    req: '善于团队合作，积极回应消息，对活动策划保持热情，敢于表达想法。',
  },
  {
    value: 'career',
    label: '职发部',
    en: 'Career Development',
    img: '/career.png',
    desc: '职业发展部致力于为留美学生提供学术与职业发展支持，帮助大家在求学过程中更好地规划和实现个人职业目标。',
    why: '连接现在与未来，我们拥有打开各行各业大门的钥匙，现在将它交到你手中。',
    count: '人数不限',
    req: '落落大方，纪律性强，品行端正。',
  },
  {
    value: 'external',
    label: '外联部',
    en: 'Business Development',
    img: '/business.png',
    desc: '外联部是CSSA与外界社团、商家、合作伙伴的纽带，涉及创业创新、职业发展、媒体、餐饮、娱乐等领域。',
    why: '与行业龙头企业接触，锻炼商务谈判与沟通规划能力，在大一大二就充实你的CV。',
    count: '6–9 人',
    req: '擅长人际交往，细心耐心，时间观念强，对工作持续保持积极与热情。',
  },
  {
    value: 'operations',
    label: '运营部',
    en: 'Operations',
    img: '/operation.png',
    desc: '运营部负责活动所需资源的调配，包括场地预定、与各部门协同工作，确保活动当天顺利进行。',
    why: '锻炼组织活动、项目管理、团队协作与公共演讲等多方面实用技能。',
    count: '人数不限',
    req: '保持热情积极，富有责任心与团队精神，具备创新能力。',
  },
  {
    value: 'media',
    label: '新媒体部',
    en: 'New Media',
    img: '/media.png',
    desc: '加入新媒体部，锻炼社交媒体管理、编辑、设计等多种技能，同时发挥你的创造力，创造最酷最前沿的社媒内容。',
    why: '展示才华，影响更多人。优先考虑有艺术绘画、视频剪辑或摄影技能者。',
    count: '人数不限',
    req: '乐于学习新事物，富有创造力，积极参与活动，对新媒体工作充满热情。',
  },
  {
    value: 'sports',
    label: '体育部',
    en: 'Sports',
    img: '/sport.png',
    desc: '体育部负责CSSA体育赛事的前期策划及准备，确保活动当天能够按时开展且不出任何差错。',
    why: '拓展对体育赛事及户外运动的兴趣，锻炼策划运营能力，找到志同道合的运动伙伴。',
    count: '2–3 人',
    req: '有责任心，善于沟通，热爱体育活动，时间观念强，能认真完成每次任务。',
  },
]

export default function JoinPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [firstChoice, setFirstChoice] = useState<string | null>(null)
  const [secondChoice, setSecondChoice] = useState<string | null>(null)
  const [grade, setGrade] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bgIndex, setBgIndex] = useState(0)

  const resume = resumeFile?.name ?? null
  const selected = firstChoice
  const selectedDept = departments.find(d => d.value === firstChoice) ?? null

  useEffect(() => {
    if (selectedDept) return
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [selectedDept])

  function handleResume(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setResumeFile(file)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!grade || !firstChoice) return
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData()
    data.append('name', (form.elements.namedItem('name') as HTMLInputElement).value)
    data.append('major', (form.elements.namedItem('major') as HTMLInputElement).value)
    data.append('email', (form.elements.namedItem('email') as HTMLInputElement).value)
    data.append('wechat', (form.elements.namedItem('wechat') as HTMLInputElement).value)
    data.append('grade', grade)
    data.append('firstChoice', firstChoice)
    if (secondChoice) data.append('secondChoice', secondChoice)
    data.append('statement', (form.elements.namedItem('statement') as HTMLTextAreaElement).value)
    if (resumeFile) data.append('resume', resumeFile)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Submission failed')
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#18120C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '28px' }}>✓</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 900, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>感谢申请！<br />Thank You.</h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, marginBottom: '40px' }}>
            We've received your application and will be in touch soon through our official channels.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'linear-gradient(110deg, #C8973A, #E4C06A)', color: '#18120C', padding: '14px 36px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
            ← 返回主页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.4fr', background: '#18120C' }}>

      {/* Left panel */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 48px', borderRight: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>

        {/* Background: cycling or selected dept image */}
        {selectedDept ? (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, transition: 'opacity 0.8s ease' }}>
            <Image src={selectedDept.img} alt="" fill style={{ objectFit: selectedDept.value === 'operations' ? 'contain' : 'cover', objectPosition: 'center' }} />
          </div>
        ) : (
          bgImages.map((src, i) => (
            <div key={src} style={{ position: 'absolute', inset: 0, transition: 'opacity 2.5s ease', opacity: i === bgIndex ? 1 : 0, zIndex: 0 }}>
              <Image src={src} alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          ))
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,12,8,0.88)', zIndex: 1 }} />

        <Link href="/" style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 2 }}>
          ← 返回主页
        </Link>

        {/* Dept info or default content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {selectedDept ? (
            <div style={{ background: 'radial-gradient(ellipse at 35% center, rgba(255,255,255,0.09) 0%, transparent 75%)', padding: '28px 24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '12px' }}>{selectedDept.en}</div>
              <h2 style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: '20px' }}>{selectedDept.label}</h2>
              <div style={{ width: '32px', height: '2px', background: '#D42B2B', marginBottom: '20px' }} />
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, marginBottom: '20px', maxWidth: '300px' }}>{selectedDept.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>招新人数</div>
                <div style={{ fontSize: '17px', color: '#E4C06A', fontWeight: 700 }}>{selectedDept.count}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>要求</div>
                <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: '300px' }}>{selectedDept.req}</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }} />
                加入我们
              </div>
              <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: '24px' }}>
                成为大家庭<br />的一员
              </h1>
              <div style={{ width: '40px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)', borderRadius: '1px', marginBottom: '24px' }} />
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: '300px' }}>
                选择一个部门，了解更多信息，然后提交你的申请。
              </p>
            </>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 2 }}>
          {departments.map((d, i) => (
            <div key={d.value} style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: selected === d.value ? 1 : selected ? 0.3 : 0.55, transition: 'opacity 0.2s' }}>
              <span style={{ fontFamily: 'serif', fontSize: '11px', fontWeight: 900, color: '#C8973A' }}>0{i + 1}</span>
              <span style={{ fontSize: '12px', color: selected === d.value ? '#E4C06A' : 'rgba(255,255,255,0.4)' }}>{d.label} · {d.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Form */}
      <div style={{ padding: '52px 56px 80px', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '40px', fontWeight: 900, color: 'white', marginBottom: '48px' }}>
          Application Form
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

          {/* Name & Major */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>姓名 · Full Name <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="text" name="name" placeholder="Your full name" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>专业 · Major <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="text" name="major" placeholder="e.g. Computer Science" style={inputStyle} />
            </div>
          </div>

          {/* Email & WeChat */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>邮箱 · Email <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="email" name="email" placeholder="your@email.com" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>微信号 · WeChat ID <span style={{ color: '#D42B2B' }}>*</span></label>
              <input required type="text" name="wechat" placeholder="Your WeChat ID" style={inputStyle} />
            </div>
          </div>

          {/* Grade */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>年级 · Current Grade <span style={{ color: '#D42B2B' }}>*</span></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {['大一 · Freshman', '大二 · Sophomore', '大三 · Junior', '大四+ · Senior+'].map((g) => {
                const isSelected = grade === g
                return (
                  <div key={g} onClick={() => setGrade(g)} style={{
                    padding: '12px 8px', borderRadius: '8px', textAlign: 'center', fontSize: '12px',
                    color: isSelected ? '#E4C06A' : 'rgba(255,255,255,0.6)',
                    background: isSelected ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.03)',
                    border: isSelected ? '1.5px solid rgba(200,151,58,0.6)' : '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 400,
                  }}>{g}</div>
                )
              })}
            </div>
          </div>

          {/* Department selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* First choice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>第一志愿 · First Choice <span style={{ color: '#D42B2B' }}>*</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {departments.map((dept) => {
                  const isSelected = firstChoice === dept.value
                  return (
                    <div key={dept.value} onClick={() => { setFirstChoice(dept.value); if (secondChoice === dept.value) setSecondChoice(null) }}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '6px', padding: '20px 12px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                        background: isSelected ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1.5px solid rgba(200,151,58,0.6)' : '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                      }}>
                      <div style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 900, color: isSelected ? '#E4C06A' : 'white' }}>{dept.label}</div>
                      <div style={{ fontSize: '10px', color: isSelected ? 'rgba(200,151,58,0.7)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{dept.en}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Second choice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={labelStyle}>第二志愿 · Second Choice <span style={{ color: 'rgba(255,255,255,0.25)', textTransform: 'none', letterSpacing: 0 }}>· Optional</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {departments.map((dept) => {
                  const isSelected = secondChoice === dept.value
                  const isFirst = firstChoice === dept.value
                  return (
                    <div key={dept.value} onClick={() => { if (!isFirst) setSecondChoice(isSelected ? null : dept.value) }}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '6px', padding: '20px 12px', borderRadius: '12px', cursor: isFirst ? 'not-allowed' : 'pointer', textAlign: 'center',
                        background: isSelected ? 'rgba(212,43,43,0.1)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1.5px solid rgba(212,43,43,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        opacity: isFirst ? 0.3 : 1,
                        transition: 'all 0.2s',
                      }}>
                      <div style={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 900, color: isSelected ? '#D42B2B' : 'white' }}>{dept.label}</div>
                      <div style={{ fontSize: '10px', color: isSelected ? 'rgba(212,43,43,0.7)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{dept.en}</div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Resume */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>简历 · Resume <span style={{ color: 'rgba(255,255,255,0.25)', textTransform: 'none', letterSpacing: 0 }}>· Optional</span></label>
            <label htmlFor="resume" style={{ cursor: 'pointer' }}>
              <div style={{
                borderRadius: '12px', padding: '28px',
                background: resume ? 'rgba(200,151,58,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1.5px dashed ${resume ? 'rgba(200,151,58,0.5)' : 'rgba(255,255,255,0.12)'}`,
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {resume ? '📄' : '↑'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: resume ? '#E4C06A' : 'rgba(255,255,255,0.6)', marginBottom: '3px' }}>
                    {resume ?? 'Upload Resume'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>PDF, DOC, or DOCX</div>
                </div>
                {resume && (
                  <button type="button" onClick={(e) => { e.preventDefault(); setResumeFile(null) }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                )}
              </div>
            </label>
            <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResume} style={{ display: 'none' }} />
          </div>

          {/* Personal Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>个人陈述 · Personal Statement <span style={{ color: '#D42B2B' }}>*</span></label>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, marginBottom: '4px' }}>
              Please address the following: (1) relevant experience or skills, (2) what you bring to this department, (3) your goals within CSSA.
            </div>
            <textarea required name="statement" rows={7} placeholder="e.g. I have 2 years of experience in event planning and social media management. I believe I can contribute by... My goal is to..." style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '14px 16px', borderRadius: '8px', background: 'rgba(212,43,43,0.1)', border: '1px solid rgba(212,43,43,0.3)', fontSize: '13px', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading} style={{ background: loading ? 'rgba(200,151,58,0.4)' : 'linear-gradient(110deg, #C8973A, #E4C06A)', color: '#18120C', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.02em' }}>
            {loading ? '提交中… · Submitting…' : '提交申请 · Submit Application →'}
          </button>

        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  fontSize: '14px',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}
