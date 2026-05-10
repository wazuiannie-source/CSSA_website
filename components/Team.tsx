'use client'

import { useState } from 'react'

type Member = { name: string; role: string; image?: string; photoPosition?: string }
type Dept = { cn: string; en: string; leads: Member[]; members: Member[] }

const departments: Dept[] = [
  {
    cn: '主席团', en: 'Executive Board',
    leads: [
      { name: '唐榭雨 Angelina', role: 'President · 主席', image: '/member/唐榭雨Angelina.png' },
      { name: '李思睿 rose', role: 'Vice President · 副主席', image: '/member/李思睿rose.png' },
    ],
    members: [
      { name: '唐榭雨 Angelina', role: 'President · 主席', image: '/member/唐榭雨Angelina.png' },
      { name: '李思睿 rose', role: 'Vice President · 副主席', image: '/member/李思睿rose.png' },
    ],
  },
  {
    cn: '活动&文体部', en: 'Events & Sports',
    leads: [
      { name: '夏鑫豪 Sherlock', role: 'Minister · 部长', image: '/member/Sherlock夏鑫豪.png', photoPosition: '15% top' },
      { name: '孟修齐 Tina', role: 'Co-Minister · 部长', image: '/member/孟修齐Tina.png' },
      { name: '王明欣 cindy', role: 'Co-Minister · 部长', image: '/member/王明欣cindy.png' },
    ],
    members: [
      { name: '夏鑫豪 Sherlock', role: 'Minister · 部长', image: '/member/Sherlock夏鑫豪.png', photoPosition: '15% top' },
      { name: '孟修齐 Tina', role: 'Co-Minister · 部长', image: '/member/孟修齐Tina.png' },
      { name: '王明欣 cindy', role: 'Co-Minister · 部长', image: '/member/王明欣cindy.png' },
    ],
  },
  {
    cn: '新媒体部', en: 'Media Department',
    leads: [
      { name: '鲍欣悦', role: 'Minister · 部长', image: '/member/鲍欣悦.png' },
      { name: '张靖琪 Audra', role: 'Deputy · 副部长', image: '/member/张靖琪Audra.png' },
    ],
    members: [
      { name: '鲍欣悦', role: 'Minister · 部长', image: '/member/鲍欣悦.png' },
      { name: '张靖琪 Audra', role: 'Deputy · 副部长', image: '/member/张靖琪Audra.png' },
      { name: 'Lin Xiao', role: 'Member · 成员' },
      { name: 'Xu Rui', role: 'Member · 成员' },
      { name: 'He Ting', role: 'Member · 成员' },
    ],
  },
  {
    cn: '外联部', en: 'External Relations',
    leads: [
      { name: '侯子安', role: 'Minister · 部长', image: '/member/侯子安.png' },
      { name: '谢思怡 Sally', role: 'Deputy · 副部长', image: '/member/谢思怡Sally.png' },
    ],
    members: [
      { name: '侯子安', role: 'Minister · 部长', image: '/member/侯子安.png' },
      { name: '谢思怡 Sally', role: 'Deputy · 副部长', image: '/member/谢思怡Sally.png' },
      { name: 'Tang Hui', role: 'Member · 成员' },
      { name: 'Song Bo', role: 'Member · 成员' },
    ],
  },
  {
    cn: '财务部', en: 'Finance Department',
    leads: [
      { name: '张清扬 IVY', role: 'Co-Minister · 部长', image: '/member/IVY张清扬.png' },
      { name: '张曦桐 Tina', role: 'Co-Minister · 部长', image: '/member/张曦桐 Tina.png' },
      { name: '杜小曦 Gracie', role: 'Co-Minister · 部长', image: '/member/杜小曦 Gracie To.png' },
    ],
    members: [
      { name: '张清扬 IVY', role: 'Co-Minister · 部长', image: '/member/IVY张清扬.png' },
      { name: '张曦桐 Tina', role: 'Co-Minister · 部长', image: '/member/张曦桐 Tina.png' },
      { name: '杜小曦 Gracie', role: 'Co-Minister · 部长', image: '/member/杜小曦 Gracie To.png' },
      { name: 'Peng Fei', role: 'Member · 成员' },
    ],
  },
  {
    cn: '职发部', en: 'Career Dev',
    leads: [
      { name: '衣山 shan', role: 'Minister · 部长', image: '/member/衣山shan.png' },
    ],
    members: [
      { name: '衣山 shan', role: 'Minister · 部长', image: '/member/衣山shan.png' },
    ],
  },
]

const cardStyle: React.CSSProperties = {
  background: '#FDFAF5',
  border: '1.5px solid rgba(24,18,12,0.14)',
  borderRadius: '16px',
  padding: '28px 24px',
}

function DeptHeader({ cn, en, center, vertical }: { cn: string; en: string; center?: boolean; vertical?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: vertical !== false ? 'column' : 'row', alignItems: 'center', gap: vertical !== false ? '6px' : '10px', marginBottom: '20px', justifyContent: center ? 'center' : 'flex-start' }}>
      <span style={{ background: '#D42B2B', color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '4px' }}>
        {cn}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(24,18,12,0.45)' }}>{en}</span>
    </div>
  )
}

function MemberCard({ name, role, image, photoPosition = 'center top' }: { name: string; role: string; image?: string; photoPosition?: string }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '12px', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ width: '100%', aspectRatio: '3 / 4', background: '#F5EFE6', position: 'relative' }}>
        {image
          ? <img src={image} alt={name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: photoPosition }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>👤</div>
        }
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <div style={{ fontFamily: 'serif', fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>{name}</div>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#D42B2B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{role}</div>
      </div>
    </div>
  )
}

export default function Team() {
  const [modalOpen, setModalOpen] = useState(false)

  const exec = departments[0]
  const depts = departments.slice(1)
  const career = departments[5]

  function renderLeads(leads: Member[], centerFirst = false) {
    if (centerFirst && leads.length % 2 !== 0 && leads.length > 1) {
      const [first, ...rest] = leads
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'calc(50% - 5px)' }}>
              <MemberCard name={first.name} role={first.role} image={first.image} photoPosition={first.photoPosition} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {rest.map((m) => <MemberCard key={m.name} name={m.name} role={m.role} image={m.image} photoPosition={m.photoPosition} />)}
          </div>
        </div>
      )
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {leads.map((m, i) => {
          const isLoneLastItem = leads.length % 2 !== 0 && leads.length > 1 && i === leads.length - 1
          return isLoneLastItem
            ? <div key={m.name} style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 'calc(50% - 5px)' }}>
                  <MemberCard name={m.name} role={m.role} image={m.image} photoPosition={m.photoPosition} />
                </div>
              </div>
            : <MemberCard key={m.name} name={m.name} role={m.role} image={m.image} photoPosition={m.photoPosition} />
        })}
      </div>
    )
  }

  return (
    <section id="team" style={{ background: 'white', padding: '104px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            03 — 团队介绍
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.1 }}>认识我们的团队</h2>
          <p style={{ fontSize: '14px', color: 'rgba(24,18,12,0.45)', marginTop: '8px' }}>Meet the People Behind UCI CSSA</p>
        </div>

        {/* Grid: left col | exec board | right col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.3fr', gap: '20px', alignItems: 'start' }}>

          {/* Left column: Events & Sports, Media */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={depts[0].cn} en={depts[0].en} />
              {renderLeads(depts[0].leads, true)}
            </div>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={depts[1].cn} en={depts[1].en} />
              {renderLeads(depts[1].leads)}
            </div>
          </div>

          {/* Center: Executive Board + Career Dev */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={exec.cn} en={exec.en} center vertical />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {exec.leads.map((m) => <MemberCard key={m.name} name={m.name} role={m.role} image={m.image} photoPosition={m.photoPosition} />)}
              </div>
            </div>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={career.cn} en={career.en} center vertical />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '64%' }}>
                  <MemberCard name={career.leads[0].name} role={career.leads[0].role} image={career.leads[0].image} photoPosition={career.leads[0].photoPosition} />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: External, Finance, Sports — independent stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={depts[2].cn} en={depts[2].en} />
              {renderLeads(depts[2].leads)}
            </div>
            <div style={{ ...cardStyle }}>
              <DeptHeader cn={depts[3].cn} en={depts[3].en} />
              {renderLeads(depts[3].leads)}
            </div>
          </div>

        </div>

        {/* View all button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{ background: 'transparent', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '8px', padding: '13px 40px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: 'rgba(24,18,12,0.7)' }}
          >
            查看全部成員 →
          </button>
        </div>

      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(24,18,12,0.45)', backdropFilter: 'blur(6px)', zIndex: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '580px', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}
          >
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', width: '32px', height: '32px', borderRadius: '50%', background: '#F5EFE6', border: 'none', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            <div style={{ fontFamily: 'serif', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>全部成员</div>
            <div style={{ fontSize: '13px', color: 'rgba(24,18,12,0.45)', marginBottom: '28px' }}>All Members · UCI CSSA</div>

            {departments.map((dept) => (
              <div key={dept.cn} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1.5px solid rgba(24,18,12,0.14)' }}>
                  <span style={{ background: '#D42B2B', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase' }}>{dept.cn}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(24,18,12,0.45)' }}>{dept.en}</span>
                </div>
                {dept.members.map((member) => (
                  <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#FDFAF5', borderRadius: '10px', border: '1.5px solid rgba(24,18,12,0.14)', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F5EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>👤</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{member.name}</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#D42B2B', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
