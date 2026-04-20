import Image from 'next/image'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: '#FDFAF5',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background watermark logo */}
      <div style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', width: '70vw', height: '70vw', zIndex: 1, pointerEvents: 'none', userSelect: 'none' }}>
        <Image src="/logo.PNG" alt="" fill style={{ objectFit: 'contain', opacity: 0.045 }} />
      </div>

      {/* Left - Text */}
      <div style={{ padding: '0 5vw 0 10vw', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>

          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '20px', height: '1.5px', background: '#C8973A', display: 'inline-block' }}></span>
            加州大学欧文分校 · Est. 1990
          </div>

          <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(40px, 6vw, 90px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            <span style={{ color: '#A81515' }}>中国学生</span><br />学者联合会
          </h1>

          <p style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', color: 'rgba(24,18,12,0.4)', marginBottom: '36px', lineHeight: 1.5 }}>
            Chinese Students and Scholars Association at UCI
          </p>

          <div style={{ width: '56px', height: '2px', background: 'linear-gradient(to right, #D42B2B, #C8973A)', borderRadius: '1px', marginBottom: '36px' }}></div>

          <p style={{ fontSize: 'clamp(13px, 1vw, 16px)', lineHeight: 1.85, color: 'rgba(24,18,12,0.65)', maxWidth: '420px', marginBottom: '48px' }}>
            服务中国留学生学者群体，弘扬中华文化，促进中美文化交流，打造 UCI 华人的温暖之家。
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/join" style={{ background: '#D42B2B', color: 'white', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, textAlign: 'center' }}>
              加入我们 →
            </a>
            <a href="#sponsors" style={{ border: '1.5px solid rgba(24,18,12,0.14)', color: 'rgba(24,18,12,0.7)', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 600, textAlign: 'center' }}>
              赞助合作
            </a>
          </div>

        </div>
      </div>

      {/* Right - Image */}
      <div style={{ position: 'relative', margin: '60px 80px 60px 8px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 72px rgba(24,18,12,0.15)', border: '1px solid rgba(200,151,58,0.35)' }}>
        <Image src="/image7.jpg" alt="UCI CSSA" fill style={{ objectFit: 'cover' }} />
        {/* Badge */}
        <div style={{ position: 'absolute', bottom: '28px', left: '24px', background: 'white', borderRadius: '12px', padding: '14px 18px', boxShadow: '0 12px 36px rgba(24,18,12,0.14)', borderLeft: '3px solid #D42B2B', maxWidth: '200px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D42B2B', marginBottom: '4px' }}>年度盛典</div>
          <div style={{ fontFamily: 'serif', fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>UCI CSSA 春晚</div>
          <div style={{ fontSize: '11px', color: 'rgba(24,18,12,0.45)' }}>Irvine Barclay Theatre</div>
        </div>
      </div>

    </section>
  )
}
