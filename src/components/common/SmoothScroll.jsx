import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/animations'
import { setLenis } from '@/lib/lenis'
import { useReducedMotion } from '@/hooks/useMediaQuery'

export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <>{children}</>
}
