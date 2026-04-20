'use client'

import { useState } from 'react'

const departments = [
  {
    cn: '主席团', en: 'Executive Board',
    leads: [
      { name: 'Zhang Wei', role: 'President · 主席' },
      { name: 'Li Jing', role: 'Vice President · 副主席' },
      { name: 'Wang Fang', role: 'Vice President · 副主席' },
    ],
    members: [
      { name: 'Zhang Wei', role: 'President · 主席' },
      { name: 'Li Jing', role: 'Vice President · 副主席' },
      { name: 'Wang Fang', role: 'Vice President · 副主席' },
    ],
  },
  {
    cn: '活动部', en: 'Events Department',
    leads: [
      { name: 'Chen Hao', role: 'Minister · 部长' },
      { name: 'Liu Yang', role: 'Deputy · 副部长' },
    ],
    members: [
      { name: 'Chen Hao', role: 'Minister · 部长' },
      { name: 'Liu Yang', role: 'Deputy · 副部长' },
      { name: 'Zhao Xin', role: 'Member · 成员' },
      { name: 'Sun Li', role: 'Member · 成员' },
      { name: 'Zhou Yu', role: 'Member · 成员' },
    ],
  },
  {
    cn: '新媒体部', en: 'Media Department',
    leads: [
      { name: 'Wu Mei', role: 'Minister · 部长' },
      { name: 'Huang Lei', role: 'Deputy · 副部长' },
    ],
    members: [
      { name: 'Wu Mei', role: 'Minister · 部长' },
      { name: 'Huang Lei', role: 'Deputy · 副部长' },
      { name: 'Lin Xiao', role: 'Member · 成员' },
      { name: 'Xu Rui', role: 'Member · 成员' },
      { name: 'He Ting', role: 'Member · 成员' },
    ],
  },
  {
    cn: '外联部', en: 'External Relations',
    leads: [
      { name: 'Ma Jun', role: 'Minister · 部长' },
      { name: 'Gao Yan', role: 'Deputy · 副部长' },
    ],
    members: [
      { name: 'Ma Jun', role: 'Minister · 部长' },
      { name: 'Gao Yan', role: 'Deputy · 副部长' },
      { name: 'Tang Hui', role: 'Member · 成员' },
      { name: 'Song Bo', role: 'Member · 成员' },
    ],
  },
  {
    cn: '财务部', en: 'Finance Department',
    leads: [
      { name: 'Luo Jia', role: 'Minister · 部长' },
      { name: 'Jiang Nan', role: 'Deputy · 副部长' },
    ],
    members: [
      { name: 'Luo Jia', role: 'Minister · 部长' },
      { name: 'Jiang Nan', role: 'Deputy · 副部长' },
      { name: 'Peng Fei', role: 'Member · 成员' },
    ],
  },
]

export default function Team() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="team" style={{ background: 'white', padding: '104px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C8973A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '18px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            03 — 团队介绍
          </div>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.1 }}>认识我们的团队</h2>
          <p style={{ fontSize: '14px', color: 'rgba(24,18,12,0.45)', marginTop: '8px' }}>Meet the People Behind UCI CSSA</p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {departments.map((dept, i) => (
            <div
              key={dept.cn}
              style={{
                background: '#FDFAF5',
                border: '1.5px solid rgba(24,18,12,0.14)',
                borderRadius: '16px',
                padding: '28px 24px',
                gridColumn: i === 0 ? '1 / 5' : i <= 2 ? 'span 2' : 'span 2',
              }}
            >
              {/* Dept header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ background: '#D42B2B', color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '4px' }}>
                  {dept.cn}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(24,18,12,0.45)' }}>{dept.en}</span>
              </div>

              {/* Lead members */}
              <div style={{ display: 'grid', gridTemplateColumns: i === 0 ? 'repeat(3, 1fr)' : '1fr 1fr', gap: '10px' }}>
                {dept.leads.map((member) => (
                  <div key={member.name} style={{ background: 'white', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '12px', padding: '18px 12px', textAlign: 'center' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#F5EFE6', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>👤</div>
                    <div style={{ fontFamily: 'serif', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{member.name}</div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#D42B2B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Single view all button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{ background: 'transparent', border: '1.5px solid rgba(24,18,12,0.14)', borderRadius: '8px', padding: '13px 40px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: 'rgba(24,18,12,0.7)' }}
          >
            查看全部成员 →
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