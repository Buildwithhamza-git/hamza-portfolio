import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToId } from '@/lib/lenis'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import MagneticButton from '@/components/common/MagneticButton'

const links = [
  { label: 'ABOUT', id: '#about' },
  { label: 'WORK', id: '#work' },
  { label: 'STACK', id: '#stack' },
  { label: 'CERTS', id: '#certifications' },
  { label: 'JOURNEY', id: '#journey' },
  { label: 'CONTACT', id: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 180 && y > lastY && !open)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-colors duration-500 ${
            scrolled
              ? 'border-line bg-bg2/70 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => go(e, '#top')}
            className="font-mono text-sm font-semibold tracking-[0.2em] text-ink"
          >
            HAMZA<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.id}
                onClick={(e) => go(e, l.id)}
                className="underline-draw font-mono text-[11px] tracking-[0.18em] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <MagneticButton
              as="a"
              href="#resume"
              onClick={(e) => go(e, '#resume')}
              className="btn btn-ghost !px-4 !py-2 text-[10px]"
            >
              RESUME <span aria-hidden>↗</span>
            </MagneticButton>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="flex flex-col items-center gap-[5px]">
              <motion.span
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 bg-ink"
              />
            </div>
          </button>
        </div>

        <div className="mx-auto mt-2 max-w-6xl px-5">
          <div className="h-px w-full bg-line overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2 px-8" aria-label="Mobile">
              {links.map((l, i) => (
                <div key={l.id} className="overflow-hidden">
                  <motion.a
                    href={l.id}
                    onClick={(e) => go(e, l.id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.07 }}
                    className="block py-3 font-sans text-5xl font-bold uppercase tracking-tight text-ink"
                  >
                    <span className="mr-4 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {l.label}
                  </motion.a>
                </div>
              ))}
              <motion.a
                href="#resume"
                onClick={(e) => go(e, '#resume')}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                exit={{ y: '110%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="btn btn-solid mt-6 w-max"
              >
                RESUME <span aria-hidden>↗</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
