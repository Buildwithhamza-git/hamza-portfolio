import { useEffect, useRef } from 'react'
import { Monitor, Layers, Database, BrainCircuit, Cpu } from 'lucide-react'
import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const iconMap = {
  user: Monitor,
  frontend: Layers,
  api: Cpu,
  db: Database,
  ai: BrainCircuit,
}

function FlowDot({ delay = 0, duration = 2.2, dist = null }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const el = ref.current
    if (!el) return undefined
    const distance = dist ?? el.parentElement?.offsetHeight ?? 48
    const anim = gsap.fromTo(
      el,
      { y: 0, opacity: 0 },
      {
        y: distance,
        opacity: [0, 1, 1, 0],
        duration,
        delay,
        repeat: -1,
        ease: 'sine.inOut',
      }
    )
    return () => anim.kill()
  }, [delay, duration, dist, reduced])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full bg-accent"
      style={{ transform: 'translateX(-50%)' }}
    />
  )
}

function Node({ label, sub, icon, className = '' }) {
  const Icon = iconMap[icon] || Layers
  return (
    <div
      className={`node flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-3.5 ${className}`}
      data-cursor="hover"
    >
      <Icon size={16} className="shrink-0 text-accent" aria-hidden="true" />
      <div>
        <div className="font-mono text-[12px] font-semibold tracking-[0.14em] text-ink">{label}</div>
        <div className="font-mono text-[10px] tracking-[0.1em] text-faint">{sub}</div>
      </div>
    </div>
  )
}

export default function Architecture() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      })

      tl.fromTo('.arch-node', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.18 })
        .fromTo(
          '.arch-line',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
          '-=0.4'
        )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="how" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="04" text="HOW I BUILD" />
        <RevealHeading
          lines={['FROM IDEA', 'TO SYSTEM']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />
      </div>

      <div ref={root} className="mx-auto mt-14 max-w-3xl px-6">
        <div className="rounded-2xl border border-line bg-bg2/50 px-6 py-12 sm:px-12">
          <div className="arch-flow relative flex flex-col items-center">
            {/* USER */}
            <div className="arch-node">
              <Node icon="user" label="USER" sub="Browser / Client" />
            </div>

            {/* connector */}
            <div className="arch-line relative my-2 h-12 w-px origin-top bg-line-strong">
              <FlowDot />
            </div>

            {/* FRONTEND */}
            <div className="arch-node">
              <Node icon="frontend" label="REACT FRONTEND" sub="SPA · Components" />
            </div>

            {/* connector */}
            <div className="arch-line relative my-2 h-12 w-px origin-top bg-line-strong">
              <FlowDot delay={1.1} />
            </div>

            {/* API */}
            <div className="arch-node">
              <Node icon="api" label="NODE / EXPRESS API" sub="REST · Middleware" />
            </div>

            {/* split connector */}
            <div className="arch-line relative my-2 h-16 w-full">
              <div className="absolute left-[24%] top-0 h-px w-[52%] bg-line-strong" />
              <div className="absolute left-[24%] top-0 h-16 w-px bg-line-strong">
                <FlowDot dist={64} delay={1.6} duration={2.6} />
              </div>
              <div className="absolute left-[76%] top-0 h-16 w-px bg-line-strong">
                <FlowDot dist={64} delay={2.2} duration={2.6} />
              </div>
            </div>

            {/* split nodes */}
            <div className="arch-node grid w-full grid-cols-2 gap-4">
              <Node icon="db" label="DATABASE" sub="MongoDB" />
              <Node icon="ai" label="AI SERVICE" sub="Python / ML" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <p className="text-[15px] leading-relaxed text-muted">
            I care about more than making things look good.
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            I focus on clean architecture, reusable components, API consistency, scalability,
            security, and maintainability.
          </p>
        </div>
      </div>
    </section>
  )
}
