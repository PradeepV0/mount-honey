import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProductCard({ title, price, description, badge = 'Bestseller' }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 160, damping: 22 })
  const y = useSpring(rawY, { stiffness: 160, damping: 22 })

  const rotateX = useTransform(y, [-0.5, 0.5], ['14deg', '-14deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-14deg', '14deg'])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative cursor-default overflow-hidden rounded-[2rem]"
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass-cream rounded-[2rem]" />

      {/* Honey gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem]"
        style={{ background: 'linear-gradient(90deg, #FFD166, #B45309)' }}
      />

      {/* Card body */}
      <div className="relative p-6 sm:p-8 space-y-5" style={{ transform: 'translateZ(24px)' }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div
              className="mb-3 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgba(180,83,9,0.22)]"
              style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}
            >
              <span className="text-2xl">🍯</span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-honeyDark/90 font-semibold">{title}</p>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-earth">{price}</p>
          </div>
          <span
            className="shrink-0 inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #D97706, #92400E)' }}
          >
            {badge}
          </span>
        </div>

        <p className="text-sm leading-[1.85] text-earth/70">{description}</p>

        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(180,83,9,0.4)' }}
          whileTap={{ scale: 0.96 }}
          className="w-full rounded-full px-5 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-shadow"
          style={{ background: 'linear-gradient(135deg, #D97706, #92400E)' }}
        >
          Prebook Now
        </motion.button>
      </div>

      {/* 3D floor shadow */}
      <div className="pointer-events-none absolute -bottom-8 left-6 right-6 h-14 rounded-[2rem] bg-honeyDark/12 blur-2xl -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  )
}
