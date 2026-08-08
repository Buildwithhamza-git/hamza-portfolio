import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export default function RevealHeading({
  lines,
  className = '',
  accent = [],
  as: Tag = 'h2',
  start = 'top 82%',
  delay = 0,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rh-line',
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.11,
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced, start, delay])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <span className={`rh-line block ${accent.includes(i) ? 'text-accent' : ''}`}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
