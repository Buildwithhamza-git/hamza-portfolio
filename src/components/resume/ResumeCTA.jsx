import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, X } from 'lucide-react'
import RevealHeading from '@/components/common/RevealHeading'
import MagneticButton from '@/components/common/MagneticButton'
import { site } from '@/data/site'

export default function ResumeCTA() {
  const [open, setOpen] = useState(false)

  return (
    <section id="resume" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <RevealHeading
          lines={['WANT THE', 'FULL STORY?']}
          accent={[1]}
          className="mx-auto font-sans text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold uppercase leading-[1] tracking-tight"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="button"
            onClick={() => setOpen(true)}
            className="btn btn-solid"
            data-cursor="view"
          >
            View Resume
          </MagneticButton>
          <MagneticButton as="a" href={site.resume} download className="btn btn-ghost" data-cursor="link">
            Download Resume <Download size={14} aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  <span className="ml-3 font-mono text-[11px] tracking-[0.14em] text-faint">
                    resume.pdf
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={site.resume}
                    download
                    className="btn btn-ghost !px-3 !py-1.5 text-[10px]"
                    data-cursor="link"
                  >
                    <Download size={12} aria-hidden="true" /> Save
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
                    aria-label="Close resume preview"
                    data-cursor="hover"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <iframe
                src={site.resume}
                title="Hamza Sarwar — Resume"
                className="h-full w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
