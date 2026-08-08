import { useRef, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [wipe, setWipe] = useState(null)
  const ticking = useRef(false)

  const handleClick = () => {
    if (ticking.current) return
    ticking.current = true
    setWipe('in')
    window.setTimeout(() => toggle(), 200)
    window.setTimeout(() => setWipe('out'), 460)
    window.setTimeout(() => {
      setWipe(null)
      ticking.current = false
    }, 1000)
  }

  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <>
      <div
        className={`theme-wipe ${
          wipe === 'in' ? 'theme-wipe-in' : ''
        } ${wipe === 'out' ? 'theme-wipe-out' : ''}`}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Switch to ${next} theme`}
        className="theme-toggle"
        data-cursor="hover"
      >
        <span className="theme-toggle-ring" aria-hidden="true" />
        <span className="theme-toggle-icon" aria-hidden="true">
          <Icon className="theme-icon-anim" />
        </span>
        <span className="theme-toggle-label">{next}</span>
      </button>
    </>
  )
}
