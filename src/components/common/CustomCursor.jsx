import { useEffect, useRef } from 'react'
import { useIsTouch, useReducedMotion } from '@/hooks/useMediaQuery'

const LABEL_MAP = {
  view: 'VIEW',
  explore: 'EXPLORE',
  open: 'OPEN',
  link: 'OPEN',
}

export default function CustomCursor() {
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (isTouch || reduced) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return undefined

    document.body.classList.add('cursor-active')

    let mx = -100
    let my = -100
    let dx = -100
    let dy = -100
    let rx = -100
    let ry = -100
    let lx = -100
    let ly = -100
    let raf = 0
    let mode = 'default'
    let labelText = ''

    const applyMode = () => {
      const showDot = mode === 'default' || mode === 'down'
      const showRing = mode === 'hover' || mode === 'down'
      const showLabel = mode === 'label'

      dot.style.opacity = showDot ? '1' : '0'
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${mode === 'down' ? 0.5 : 1})`
      ring.style.opacity = showRing ? '1' : '0'
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${mode === 'down' ? 0.7 : 1})`
      label.style.opacity = showLabel ? '1' : '0'
      if (showLabel) {
        label.textContent = labelText
      }
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const onOver = (e) => {
      const el = e.target.closest
        ? e.target.closest('[data-cursor], a, button, [role="button"], input, textarea, select, label, [tabindex]')
        : null
      if (!el) {
        mode = 'default'
        applyMode()
        return
      }
      const attr = el.getAttribute('data-cursor')
      if (attr && LABEL_MAP[attr]) {
        mode = 'label'
        labelText = LABEL_MAP[attr]
      } else {
        mode = 'hover'
      }
      applyMode()
    }

    const onDown = () => {
      if (mode === 'label') return
      mode = 'down'
      applyMode()
    }
    const onUp = () => {
      if (mode === 'down') mode = 'default'
      applyMode()
    }

    const loop = () => {
      dx += (mx - dx) * 0.24
      dy += (my - dy) * 0.24
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      lx += (mx - lx) * 0.14
      ly += (my - ly) * 0.14
      if (mode !== 'label') {
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${mode === 'down' ? 0.5 : 1})`
      }
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${mode === 'down' ? 0.7 : 1})`
      label.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('cursor-active')
    }
  }, [isTouch, reduced])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-dot cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  )
}
