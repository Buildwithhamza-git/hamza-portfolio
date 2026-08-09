import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { scrollToId } from '@/lib/lenis'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import MagneticButton from '@/components/common/MagneticButton'
import Particles from '@/components/hero/Particles'
import OrbitProfile from '@/components/hero/OrbitProfile'

const roles = ['FULL-STACK DEVELOPER', 'AI/ML ENTHUSIAST', 'SOFTWARE ENGINEER']

const floatingLabels = [
  { text: 'REACT', className: 'left-[6%] top-[22%]', speed: 0.6 },
  { text: 'NODE.JS', className: 'right-[4%] top-[18%] lg:right-[38%]', speed: 0.5 },
  { text: 'AI/ML', className: 'left-[12%] bottom-[24%]', speed: 0.7 },
  { text: 'MONGODB', className: 'right-[10%] bottom-[30%]', speed: 0.45 },
  { text: 'PYTHON', className: 'left-[44%] top-[14%] hidden lg:block', speed: 0.8 },
]

export default function Hero() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-eyebrow',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.1
      )
        .fromTo(
          '.hero-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          0.25
        )
        .fromTo(
          '.hero-role',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.7
        )
        .fromTo(
          '.hero-desc',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.95
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          1.1
        )
        .fromTo(
          '.hero-orbit',
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'expo.out' },
          0.5
        )
        .fromTo(
          '.hero-scroll-hint',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.6
        )

      gsap.utils.toArray('.hero-float').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-14, 14)',
          duration: 3 + i * 0.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      gsap.to('.hero-content', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray('.hero-float').forEach((el) => {
        gsap.to(el, {
          y: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden pt-24 lg:pt-28"
    >
      {/* background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="tech-grid absolute inset-0" />
        <div className="glow-hero absolute inset-0" />
        <Particles className="absolute inset-0 h-full w-full opacity-60" />
      </div>

      {/* floating tech labels */}
      {floatingLabels.map((l) => (
        <span
          key={l.text}
          className={`hero-float absolute hidden font-mono text-[10px] tracking-[0.3em] text-faint md:block ${l.className}`}
          aria-hidden="true"
        >
          {l.text}
        </span>
      ))}

      <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-4">
        {/* LEFT */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="hero-eyebrow mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            HELLO, I&apos;M
          </p>

          <h1 className="font-sans text-[clamp(3.2rem,9vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Hamza</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line text-outline block">
                Sarwar<span className="text-accent" style={{ WebkitTextStroke: '0' }}>.</span>
              </span>
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {roles.map((r) => (
              <span
                key={r}
                className="hero-role font-mono text-[11px] tracking-[0.24em] text-muted lg:text-xs"
              >
                <span className="mr-2 text-accent">/</span>
                {r}
              </span>
            ))}
          </div>

          <p className="hero-desc mt-8 max-w-md text-[15px] leading-relaxed text-muted">
            I build scalable web applications and intelligent digital experiences using modern
            technologies, AI, and thoughtful engineering.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              as="a"
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('#work')
              }}
              className="hero-cta btn btn-solid"
            >
              Explore My Work <span aria-hidden>↓</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('#contact')
              }}
              className="hero-cta btn btn-ghost"
            >
              Let&apos;s Connect <span aria-hidden>↗</span>
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT — orbit profile */}
        <div className="hero-orbit order-1 lg:order-2 lg:col-span-5">
          <OrbitProfile />
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-center md:block">
        <div className="font-mono text-[10px] tracking-[0.3em] text-faint">SCROLL TO EXPLORE</div>
        <div className="mx-auto mt-3 h-14 w-px overflow-hidden bg-line-strong">
          <div className="scroll-line-anim h-full w-full bg-accent" />
        </div>
      </div>
    </section>
  )
}
