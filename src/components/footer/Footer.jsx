import { ArrowUp } from 'lucide-react'
import { scrollToId } from '@/lib/lenis'

export default function Footer() {
  return (
    <footer className="relative border-t border-line py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <button
          onClick={() => scrollToId('#top')}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent hover:text-accent"
          aria-label="Back to top"
          data-cursor="link"
        >
          <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
        </button>

        <div className="font-mono text-sm font-semibold tracking-[0.28em] text-ink">
          HAMZA SARWAR
        </div>

        <p className="font-mono text-[11px] tracking-[0.18em] text-muted">
          Full-Stack Developer <span className="text-accent">•</span> AI/ML{' '}
          <span className="text-accent">•</span> Software Engineering
        </p>

        <div className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.12em] text-faint">
          <span>© 2026 Hamza Sarwar</span>
        </div>
      </div>
    </footer>
  )
}
