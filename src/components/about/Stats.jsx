import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const stats = [
  { value: 3, suffix: '+', label: 'Major Projects', infinite: false },
  { value: 2, suffix: '+', label: 'AI-Powered Applications', infinite: false },
  { value: 3, suffix: '+', label: 'Ideas to Build', infinite: false },
  { value: 2026, suffix: '', label: 'Computer Science Graduate', infinite: false },
]

function StatValue({ stat }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (stat.infinite) {
      el.textContent = '\u221E'
      return undefined
    }
    if (reduced) {
      el.textContent = String(stat.value)
      return undefined
    }
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: stat.value,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v))
        },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [stat, reduced])

  return (
    <span className="text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold tracking-tight text-ink">
      <span ref={ref}>0</span>
      {!stat.infinite && stat.suffix && <span className="text-accent">{stat.suffix}</span>}
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Key facts" className="relative border-y border-line bg-bg2/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group relative px-6 py-12 text-center lg:py-14">
            <StatValue stat={s} />
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-muted transition-colors group-hover:text-ink">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
