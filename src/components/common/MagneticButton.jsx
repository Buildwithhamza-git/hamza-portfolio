import { useRef } from 'react'
import { useIsTouch, useReducedMotion } from '@/hooks/useMediaQuery'

export default function MagneticButton({
  children,
  as: Comp = 'button',
  strength = 0.35,
  className = '',
  onClick,
  ...props
}) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()

  const onMove = (e) => {
    if (isTouch || reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`magnetic ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
