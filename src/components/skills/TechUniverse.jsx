import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { techUniverse } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { gsap } from '@/lib/animations'

export default function TechUniverse() {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const [hovered, setHovered] = useState(null)
  const pausedRef = useRef(false)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let raf = 0
    const t0 = performance.now()

    const place = (t) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const R = Math.min(rect.width, rect.height) * 0.34

      itemRefs.current.forEach((node, i) => {
        if (!node) return
        const base = (i / techUniverse.length) * Math.PI * 2
        const speed = 0.14 + (i % 3) * 0.06
        const angle = base + t * speed
        const x = cx + Math.cos(angle) * R * 1.06
        const y = cy + Math.sin(angle) * R * 0.7
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        const depth = (Math.sin(angle) + 1) / 2
        node.style.opacity = String(0.45 + depth * 0.55)
        node.style.zIndex = String(Math.round(depth * 10))
      })
    }

    const loop = (now) => {
      place(pausedRef.current || reduced ? 0 : (now - t0) / 1000)
      raf = requestAnimationFrame(loop)
    }

    place(0)
    if (!reduced) raf = requestAnimationFrame(loop)

    const onResize = () => place(0)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    const onEnter = () => {
      pausedRef.current = true
    }
    const onLeave = () => {
      pausedRef.current = false
    }
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    if (hovered) {
      gsap.fromTo(
        '.tech-panel',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [hovered])

  const active = techUniverse.find((t) => t.name === hovered)

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-10 h-[420px] w-full max-w-3xl sm:h-[520px]"
      onMouseEnter={() => pausedRef.current = true}
      onMouseLeave={() => {
        pausedRef.current = false
        setHovered(null)
      }}
    >
      {/* orbit rings */}
      <div
        className="absolute left-1/2 top-1/2 h-[52%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-line/70"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[34%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-line/40"
        aria-hidden="true"
      />

      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-sans text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
          Hamza<span className="text-accent">.</span>
        </div>
        <div className="mt-2 font-mono text-[10px] tracking-[0.34em] text-faint">FULL-STACK · AI/ML</div>
      </div>

      {/* orbiting tech */}
      {techUniverse.map((t, i) => (
        <button
          key={t.name}
          ref={(el) => (itemRefs.current[i] = el)}
          type="button"
          onMouseEnter={() => setHovered(t.name)}
          onFocus={() => setHovered(t.name)}
          onBlur={() => setHovered(null)}
          aria-label={`${t.name} — ${t.category}`}
          className={`absolute left-0 top-0 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.14em] transition-colors duration-300 ${
            hovered === t.name
              ? 'border-accent bg-accent text-bg'
              : 'border-line bg-card/90 text-ink hover:border-line-strong'
          }`}
          style={{ transform: 'translate(-50%,-50%)', willChange: 'transform, opacity' }}
        >
          {t.name}
        </button>
      ))}

      {/* info panel */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 px-4">
        <div className="tech-panel overflow-hidden rounded-xl border border-line bg-bg2/90 p-4 text-center backdrop-blur-sm">
          {active ? (
            <>
              <div className="font-mono text-[10px] tracking-[0.3em] text-accent">{active.category.toUpperCase()}</div>
              <div className="mt-1 font-sans text-lg font-bold uppercase tracking-tight text-ink">{active.name}</div>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
                {active.points.map((p) => (
                  <span key={p} className="font-mono text-[11px] text-muted">
                    {p}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="font-mono text-[11px] tracking-[0.2em] text-faint">
              HOVER A TECHNOLOGY TO INSPECT
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
