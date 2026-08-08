import { motion } from 'motion/react'

export default function SectionTitle({ number, text, className = '', align = 'left' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`font-mono text-[11px] tracking-[0.32em] text-muted uppercase ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      <span className="text-accent">{number}</span>
      <span className="mx-3 text-line-strong">—</span>
      <span>{text}</span>
    </motion.p>
  )
}
