import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import { certifications } from '@/data/certifications'

function CertCard({ cert }) {
  return (
    <a
      href={cert.image}
      target="_blank"
      rel="noreferrer"
      data-cursor="view"
      className="cert-card"
      aria-label={`${cert.title} certificate`}
    >
      <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
    </a>
  )
}

export default function Certifications() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-row',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 78%' },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const row = (key) => (
    <div key={key} className="cert-row flex shrink-0 items-center gap-6 pr-6">
      {certifications.map((cert) => (
        <CertCard key={`${key}-${cert.title}`} cert={cert} />
      ))}
    </div>
  )

  return (
    <section id="certifications" ref={root} className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:pt-36">
        <SectionTitle number="07" text="CERTIFICATIONS" />
        <RevealHeading
          lines={['PROVEN', 'SKILLS']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          Certifications earned along the way — machine learning, web and more.
        </p>
      </div>

      <div className="cert-marquee mt-14">
        <div className="cert-track">
          {row('a')}
          {row('b')}
        </div>
      </div>
    </section>
  )
}
