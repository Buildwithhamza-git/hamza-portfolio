import {
  Sparkles,
  ScanLine,
  Activity,
  Zap,
  Atom,
  Bot,
  Cloud,
  Layers,
} from 'lucide-react'
import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import { lab } from '@/data/lab'

const iconMap = {
  sparkles: Sparkles,
  scan: ScanLine,
  activity: Activity,
  zap: Zap,
  atom: Atom,
  bot: Bot,
  cloud: Cloud,
  layers: Layers,
}

const offsets = [
  'lg:mt-0',
  'lg:mt-6',
  'lg:-mt-2',
  'lg:mt-4',
  'lg:mt-10',
  'lg:mt-1',
  'lg:mt-8',
  'lg:mt-3',
]

export default function Lab() {
  return (
    <section id="lab" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="06" text="LAB" />
        <RevealHeading
          lines={['CURRENTLY', 'EXPLORING']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />

        <div className="mt-10 mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-faint">
          <span className="text-accent">$</span> npm run explore
          <span className="ml-1 inline-block h-3 w-1.5 bg-accent animate-pulse" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lab.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles
            return (
              <article
                key={item.name}
                data-cursor="hover"
                className={`group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-accent/40 hover:bg-hover ${offsets[i]}`}
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                <Icon size={18} className="text-accent" aria-hidden="true" />
                <h3 className="mt-6 font-mono text-[13px] font-semibold tracking-[0.1em] text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.note}</p>
                <div className="mt-5 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.24em] text-faint transition-colors group-hover:text-accent">
                  <span className="inline-block h-1 w-1 rounded-full bg-accent/60" />
                  EXPERIMENTING
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
