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
import ScrollReveal from '@/components/ScrollReveal'

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
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal delay={100}><Events /></ScrollReveal>
      <ScrollReveal delay={100}><Team /></ScrollReveal>
      <ScrollReveal delay={100}><Join /></ScrollReveal>
      <ScrollReveal delay={100}><Services /></ScrollReveal>
      <ScrollReveal delay={100}><Sponsors /></ScrollReveal>
      <ScrollReveal delay={100}><Partners /></ScrollReveal>
      <Footer />
    </main>
  )
}
