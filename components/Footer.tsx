import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#FDFAF5', borderTop: '1px solid rgba(24,18,12,0.14)', padding: '56px 0 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 44px' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '40px', borderBottom: '1px solid rgba(24,18,12,0.14)', marginBottom: '24px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '12px' }}>
              <Image src="/logo.PNG" alt="UCI CSSA" width={32} height={32} style={{ borderRadius: '50%' }} />
              <div>
                <div style={{ fontFamily: 'serif', fontSize: '14px', fontWeight: 700, color: '#18120C' }}>加州大学欧文分校中国学生学者联合会</div>
                <div style={{ fontSize: '10px', color: 'rgba(24,18,12,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>UCI CSSA · Est. 1990</div>
              </div>
            </div>
            <p style={{ fontFamily: 'serif', fontSize: '13px', fontStyle: 'italic', color: 'rgba(24,18,12,0.45)', marginBottom: '12px', lineHeight: 1.7 }}>
              "在异乡，我们是彼此的家园。"
            </p>
            <a href="mailto:ucicssazotzot@gmail.com" style={{ fontSize: '12px', color: 'rgba(24,18,12,0.45)', textDecoration: 'none' }}>
              ucicssazotzot@gmail.com
            </a>
          </div>

          {/* Nav */}
          {[
            {
              title: '导航',
              links: [
                { label: '关于我们', href: '#about' },
                { label: '活动回顾', href: '#events' },
                { label: '团队介绍', href: '#team' },
                { label: '学生服务', href: '#services' },
              ],
            },
            {
              title: '参与',
              links: [
                { label: '加入 CSSA', href: '#join' },
                { label: '赞助合作', href: '#sponsors' },
                { label: '联系我们', href: 'mailto:ucicssazotzot@gmail.com' },
              ],
            },
            {
              title: '关注我们',
              links: [
                { label: '微信公众号', href: 'https://mp.weixin.qq.com/s/pgl5zEOw-oG5NmkOJ9HNNQ' },
                { label: 'Instagram', href: 'https://www.instagram.com/ucicssa?igsh=NTc4MTIwNjQ2YQ==' },
                { label: '小红书', href: 'https://xhslink.com/m/9qYitZKxsI3' },
                { label: 'Discord', href: '#' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(24,18,12,0.45)', marginBottom: '16px' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={{ fontSize: '13px', color: 'rgba(24,18,12,0.7)', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.45)' }}>
            © 2025 UCI CSSA · Made with <span style={{ color: '#D42B2B' }}>♥</span> for the UCI Chinese community
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.45)' }}>
            Non-political · Non-religious · Non-profit · Est. 1990
          </div>
        </div>

      </div>
    </footer>
  )
}