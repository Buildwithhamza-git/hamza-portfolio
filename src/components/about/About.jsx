import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import Terminal from '@/components/about/Terminal'

const highlights = [
  'Computer Science graduate',
  'MERN stack development',
  'Python-based AI / ML',
  'Scalable software design',
]

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="01" text="ABOUT" />

        <RevealHeading
          lines={['I BUILD THINGS', 'THAT SOLVE', 'REAL PROBLEMS.']}
          accent={[2]}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              I am a Computer Science graduate and Full-Stack Developer focused on
              building modern web applications, AI-powered systems, and scalable software
              solutions.
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              I works primarily with the MERN stack and Python-based AI/ML technologies — turning
              ideas into products that are clean, fast, and built to last.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <li key={h} className="flex items-center gap-3 text-sm text-ink/90">
                  <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line bg-bg2">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                <span className="ml-3 font-mono text-[11px] tracking-[0.14em] text-faint">~/hamza — zsh</span>
              </div>
              <div className="px-6 py-6">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
