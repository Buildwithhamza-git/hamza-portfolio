import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import ProjectShowcase from '@/components/projects/ProjectShowcase'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:pt-36">
        <SectionTitle number="03" text="SELECTED WORK" />
        <RevealHeading
          lines={['THINGS I\'VE', 'BUILT']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          Selected projects that show how I think — from product to system to delivery.
        </p>
      </div>

      <div className="mt-16">
        {projects.map((p, i) => (
          <ProjectShowcase key={p.id} project={p} side={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
    </section>
  )
}
