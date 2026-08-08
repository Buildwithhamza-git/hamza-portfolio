import { useEffect, useRef } from 'react'
import { Atom, Server, Database, BrainCircuit, Sparkles } from 'lucide-react'
import { gsap } from '@/lib/animations'
import { useIsTouch, useReducedMotion } from '@/hooks/useMediaQuery'
import { profileImage } from '@/data/projects'

const innerOrbit = [
  { icon: Atom, label: 'React', a: '0deg', t: 22 },
  { icon: Server, label: 'Node', a: '90deg', t: 22 },
  { icon: Database, label: 'Mongo', a: '180deg', t: 22 },
  { icon: BrainCircuit, label: 'AI/ML', a: '270deg', t: 22 },
]

const midOrbit = [
  { label: 'MERN', a: '30deg', t: 34 },
  { label: 'PYTHON', a: '150deg', t: 34 },
  { label: 'AWS', a: '270deg', t: 34 },
]

export default function OrbitProfile() {
  const stage = useRef(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(
        '.orbit-portrait',
        { scale: 0.82, opacity: 0, rotate: -6 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.1, delay: 0.15 }
      )
        .fromTo(
          '.orbit-ring',
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, stagger: 0.12 },
          '-=0.6'
        )
        .fromTo('.orbit-halo', { opacity: 0 }, { opacity: 0.9, duration: 0.8 }, '-=0.8')
    }, stage)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (isTouch || reduced) return undefined
    const el = stage.current
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateY: px * 14,
        rotateX: -py * 14,
        transformPerspective: 900,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    const onLeave = () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch, reduced])

  return (
    <div className="orbit-stage relative mx-auto" ref={stage} aria-label="Hamza Sarwar profile">
      <div className="orbit-float">
        <div className="orbit-inner">
          <div className="orbit-glow" aria-hidden="true" />
          <div className="orbit-halo" aria-hidden="true" />
          <div className="orbit-dashed" aria-hidden="true" />

          <div className="orbit-ring orbit-ring--inner" style={{ animationDuration: '22s' }} aria-hidden="true">
            {innerOrbit.map((item) => (
              <div
                key={item.label}
                className="orbit-item"
                style={{
                  '--a': item.a,
                  '--t': `${item.t}s`,
                  '--r': 'calc(var(--d) / 2 + 40px)',
                  '--s': '38px',
                }}
              >
                <span className="orbit-fix">
                  <span className="orbit-badge" title={item.label}>
                    <item.icon />
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="orbit-ring orbit-ring--mid" style={{ animationDuration: '34s' }} aria-hidden="true">
            {midOrbit.map((item) => (
              <div
                key={item.label}
                className="orbit-item"
                style={{
                  '--a': item.a,
                  '--t': `${item.t}s`,
                  '--r': 'calc(var(--d) / 2 + 88px)',
                  '--s': '32px',
                  '--w': '84px',
                }}
              >
                <span className="orbit-fix">
                  <span className="orbit-pill">{item.label}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="orbit-portrait">
            <img src={profileImage} alt="Hamza Sarwar" />
            <span className="orbit-status" aria-hidden="true">
              <span className="orbit-status-dot" />
              OPEN TO WORK
            </span>
          </div>

          <Sparkles className="orbit-spark orbit-spark--1" aria-hidden="true" />
          <Sparkles className="orbit-spark orbit-spark--2" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
