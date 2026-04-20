'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Events from '@/components/Events'
import Team from '@/components/Team'
import Join from '@/components/Join'
import Services from '@/components/Services'
import Sponsors from '@/components/Sponsors'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'
import IntroAnimation from '@/components/IntroAnimation'

export default function Home() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('introDone') === 'true'
    }
    return false
  })

  return (
    <main>
      {!introDone && <IntroAnimation onDone={() => { sessionStorage.setItem('introDone', 'true'); setIntroDone(true) }} />}
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Team />
      <Join />
      <Services />
      <Sponsors />
      <Partners />
      <Footer />
    </main>
  )
}
