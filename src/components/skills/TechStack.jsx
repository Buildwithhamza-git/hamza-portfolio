import SectionTitle from '@/components/common/SectionTitle'
import RevealHeading from '@/components/common/RevealHeading'
import TechUniverse from '@/components/skills/TechUniverse'

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle number="02" text="STACK" />
        <RevealHeading
          lines={['TOOLS I', 'BUILD WITH']}
          className="mt-8 font-sans text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
        />
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          The technologies I reach for every day — from frontend to backend, databases to machine
          learning.
        </p>
      </div>
      <TechUniverse />
    </section>
  )
}
