import { useEffect, useRef } from 'react'
import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { journey } from '@/data/journey'

export default function Journey() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            end: 'bottom 85%',
            scrub: 1,
          },
        }
      )

      gsap.utils.toArray('.journey-item').forEach((item) => {
        gsap.fromTo(
          item.querySelector('.journey-node'),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 72%', once: true },
          }
        )
        gsap.fromTo(
          item.querySelector('.journey-body'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 75%', once: true },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="journey" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="05" text="JOURNEY" />
        <RevealHeading
          lines={['THE ROAD', 'SO FAR']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />
      </div>

      <div ref={root} className="mx-auto mt-16 max-w-3xl px-6">
        <div className="relative">
          <div className="journey-line absolute bottom-2 left-[15px] top-2 w-px origin-top bg-line-strong" />
          <ol className="relative">
            {journey.map((item) => (
              <li key={item.year} className="journey-item relative flex gap-6 pb-12 last:pb-0">
                <div className="relative z-10 mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center">
                  <span className="journey-node block h-3 w-3 rounded-full border border-accent bg-bg shadow-[0_0_0_4px_var(--color-accent-glow)]" />
                </div>
                <div className="journey-body flex-1">
                  <div className="font-mono text-[11px] tracking-[0.3em] text-accent">{item.year}</div>
                  <h3 className="mt-1 font-sans text-xl font-bold tracking-tight text-ink lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
