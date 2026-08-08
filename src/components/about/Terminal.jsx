import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMediaQuery'

const blocks = [
  { cmd: 'whoami', out: ['Hamza Sarwar'] },
  { cmd: 'role', out: ['Full-Stack Developer'] },
  { cmd: 'focus', out: ['Web Development', 'AI / ML', 'Software Engineering'] },
  { cmd: 'status', out: ['Building & Learning'] },
]

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-accent animate-pulse" />
}

export default function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [doneCount, setDoneCount] = useState(0)
  const [current, setCurrent] = useState({ cmdIndex: -1, typed: '' })

  const active = reduced ? true : inView

  useEffect(() => {
    if (!active) return undefined
    let cancelled = false
    let t = 500

    blocks.forEach((block, i) => {
      for (let ch = 1; ch <= block.cmd.length; ch += 1) {
        const index = ch
        setTimeout(() => {
          if (!cancelled) setCurrent({ cmdIndex: i, typed: block.cmd.slice(0, index) })
        }, t)
        t += 34
      }
      t += 280
      setTimeout(() => {
        if (!cancelled) {
          setDoneCount(i + 1)
          setCurrent({ cmdIndex: -1, typed: '' })
        }
      }, t)
      t += 340
    })

    return () => {
      cancelled = true
    }
  }, [active])

  return (
    <div ref={ref} className="font-mono text-sm leading-7" aria-label="Developer terminal">
      {blocks.map((b, i) => {
        const complete = doneCount > i
        const typingNow = current.cmdIndex === i
        const cmdText = complete ? b.cmd : typingNow ? current.typed : ''
        if (!complete && !typingNow && reduced) {
          return null
        }
        return (
          <div key={b.cmd}>
            <div className="text-muted">
              <span className="text-accent">$</span> {cmdText}
              {typingNow && <Cursor />}
            </div>
            {(complete || reduced) && (
              <div>
                {b.out.map((line, j) => (
                  <div
                    key={j}
                    className="text-ink"
                    style={reduced ? undefined : { animation: 'fade-up 0.5s ease forwards' }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
      <div className="h-4">
        {doneCount >= blocks.length && <Cursor />}
      </div>
    </div>
  )
}
