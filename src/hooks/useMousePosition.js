import { useRef } from 'react'

export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  const onMove = (e) => {
    target.current.x = e.clientX
    target.current.y = e.clientY
  }

  return { pos, target, onMove }
}
