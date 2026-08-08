import { useRef } from 'react'
import { useIsTouch, useReducedMotion } from '@/hooks/useMediaQuery'

export default function TiltCard({ children, className = '', cursorLabel = 'view', label = 'VIEW' }) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()

  const onMove = (e) => {
    if (isTouch || reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * 8
    const ry = (px - 0.5) * 10
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursorLabel}
      aria-label={label}
      role="img"
      className={`tilt-card ${className}`}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
