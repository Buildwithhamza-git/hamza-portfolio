import { useEffect, useRef } from 'react'
import { GitBranch, ExternalLink } from 'lucide-react'
import { gsap } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import TiltCard from '@/components/projects/TiltCard'

export default function ProjectShowcase({ project, side = 'left' }) {
  const pinRef = useRef(null)
  const imgWrapRef = useRef(null)
  const imgRef = useRef(null)
  const reduced = useReducedMotion()

  const imageOnLeft = side === 'left'

  useEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=110%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        imgRef.current,
        { scale: 1.3, opacity: 0.15, filter: 'blur(6px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }
      )
        .fromTo(
          '.p-title-line',
          { yPercent: 120 },
          { yPercent: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5'
        )
        .fromTo(
          '.p-desc',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(
          '.p-tag',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          '-=0.4'
        )
        .fromTo(
          '.p-feature',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          '-=0.35'
        )
        .fromTo('.p-links', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')

      if (project.pipeline) {
        tl.fromTo(
          '.p-pipeline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4'
        )
      }

      gsap.to('.p-bignum', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }, pinRef)

    return () => ctx.revert()
  }, [reduced, project.pipeline])

  const content = (
    <div className={imageOnLeft ? 'lg:order-2' : 'lg:order-1'}>
      <div className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-muted">
        <span className="text-accent">{project.index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{project.category}</span>
      </div>

      <h3 className="font-sans text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
        {project.title.map((line) => (
          <span key={line} className="block overflow-hidden pb-1">
            <span className="p-title-line block">{line}</span>
          </span>
        ))}
      </h3>

      <p className="p-desc mt-6 max-w-md text-[15px] leading-relaxed text-muted">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="p-tag rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <ul className="mt-6 grid max-w-md grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {project.features.map((f) => (
          <li key={f} className="p-feature flex items-center gap-2 text-sm text-ink/85">
            <span className="text-accent" aria-hidden="true">+</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="p-links mt-8 flex flex-wrap items-center gap-3">
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="btn btn-ghost !px-4 !py-2.5"
        >
          <GitBranch size={14} aria-hidden="true" /> GitHub
        </a>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="btn btn-solid !px-4 !py-2.5"
          >
            <ExternalLink size={14} aria-hidden="true" /> Live Demo
          </a>
        )}
      </div>
    </div>
  )

  const image = (
    <div className={imageOnLeft ? 'lg:order-1' : 'lg:order-2'}>
      <TiltCard cursorLabel={project.cursorLabel} label={project.title.join(' ')}>
        <div
          ref={imgWrapRef}
          className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-card"
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink/80">
            <span className="rounded-full bg-bg/70 px-3 py-1.5 backdrop-blur-sm">{project.cursorLabel.toUpperCase()}</span>
          </div>
        </div>
      </TiltCard>

      {project.pipeline && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.pipeline.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="p-pipeline rounded-md border border-line bg-card px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted">
                {step}
              </span>
              {i < project.pipeline.length - 1 && <span className="p-pipeline text-accent" aria-hidden="true">→</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section className="relative" aria-label={`Project ${project.index}: ${project.title.join(' ')}`}>
      <div ref={pinRef} className="relative flex min-h-screen items-center overflow-hidden py-24">
        <span
          className="p-bignum text-outline pointer-events-none absolute -top-2 left-0 select-none font-sans text-[clamp(9rem,22vw,18rem)] font-extrabold leading-none"
          aria-hidden="true"
        >
          {project.index}
        </span>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-8">
          <div className={imageOnLeft ? 'lg:col-span-7' : 'lg:col-span-5'}>{content}</div>
          <div className={imageOnLeft ? 'lg:col-span-5' : 'lg:col-span-7'}>{image}</div>
        </div>
      </div>
    </section>
  )
}
