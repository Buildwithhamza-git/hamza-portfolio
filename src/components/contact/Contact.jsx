import { GitBranch, Link, Mail, ArrowRight } from 'lucide-react'
import RevealHeading from '@/components/common/RevealHeading'
import MagneticButton from '@/components/common/MagneticButton'
import { site } from '@/data/site'

const socials = [
  {
    label: 'GitHub',
    href: site.github,
    icon: GitBranch,
    handle: 'View code & contributions',
  },
  {
    label: 'LinkedIn',
    href: site.linkedin,
    icon: Link,
    handle: 'Connect professionally',
  },
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    icon: Mail,
    handle: site.email,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 lg:py-44">
      <div className="glow-contact pointer-events-none absolute inset-x-0 bottom-0 h-[50%]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mb-8 font-mono text-[11px] tracking-[0.32em] text-muted">
          <span className="text-accent">06</span>
          <span className="mx-3 text-line-strong">—</span>
          <span>CONTACT</span>
        </div>

        <RevealHeading
          lines={["LET'S BUILD", 'SOMETHING', 'MEANINGFUL.']}
          accent={[2]}
          className="mx-auto font-sans text-[clamp(2.6rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.98] tracking-tight"
        />

        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-muted">
          Have an idea, project, or opportunity?
          <br />
          Let&apos;s turn it into something real.
        </p>

        <MagneticButton
          as="a"
          href={`mailto:${site.email}`}
          className="btn btn-solid mt-10 !px-8 !py-4 !text-[13px]"
          data-cursor="link"
        >
          Start a Conversation <ArrowRight size={16} aria-hidden="true" />
        </MagneticButton>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <MagneticButton
                key={s.label}
                as="a"
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor="link"
                className="group flex items-center gap-3 rounded-full border border-line bg-card px-5 py-3 transition-colors duration-300 hover:border-accent/50"
              >
                <Icon size={16} className="text-accent" aria-hidden="true" />
                <span className="font-mono text-[12px] tracking-[0.14em] text-ink">{s.label}</span>
                <span className="hidden font-mono text-[10px] text-faint sm:inline">{s.handle}</span>
              </MagneticButton>
            )
          })}
        </div>
      </div>
    </section>
  )
}
