import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const FALLBACK_ACCENT = { r: 163, g: 230, b: 53 }

function readAccent() {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim()
    .replace('#', '')
  const m = hex.match(/^([0-9a-f]{6})$/i)
  if (!m) return FALLBACK_ACCENT
  const n = parseInt(m[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export default function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let particles = []
    let accent = readAccent()

    const rand = (min, max) => min + Math.random() * (max - min)

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const count = window.innerWidth < 768 ? 16 : 42
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 1.7),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.1, 0.1),
        a: rand(0.08, 0.3),
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
        if (p.y < -4) p.y = h + 4
        if (p.y > h + 4) p.y = -4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      init()
      if (!reduced) {
        cancelAnimationFrame(raf)
        draw()
      }
    }

    const onThemeChange = () => {
      accent = readAccent()
    }

    init()
    if (!reduced) draw()

    window.addEventListener('resize', onResize)
    window.addEventListener('hamza-themechange', onThemeChange)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('hamza-themechange', onThemeChange)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
