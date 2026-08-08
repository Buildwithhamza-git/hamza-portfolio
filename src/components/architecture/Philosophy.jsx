import SectionTitle from '@/components/common/SectionTitle'

const values = [
  {
    index: '01',
    name: 'BUILD',
    text: 'Turn ideas into working software with clean and maintainable architecture.',
  },
  {
    index: '02',
    name: 'LEARN',
    text: 'Study new technologies and sharpen fundamentals continuously.',
  },
  {
    index: '03',
    name: 'ITERATE',
    text: 'Ship, measure, and refine through fast feedback loops.',
  },
  {
    index: '04',
    name: 'IMPROVE',
    text: 'Review, refactor, and raise the bar on every pass.',
  },
]

export default function Philosophy() {
  return (
    <section aria-label="Development philosophy" className="relative py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="" text="PHILOSOPHY" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <article
              key={v.name}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition-colors duration-500 hover:border-accent/40"
            >
              <div className="font-mono text-[11px] tracking-[0.3em] text-accent">{v.index}</div>
              <h3 className="mt-6 font-sans text-2xl font-extrabold uppercase tracking-tight text-ink">
                {v.name}
              </h3>
              <p className="mt-3 max-h-40 overflow-hidden text-sm leading-relaxed text-muted opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100">
                {v.text}
              </p>
              <div className="mt-6 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
