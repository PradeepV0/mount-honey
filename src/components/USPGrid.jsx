import { motion } from 'framer-motion'

const usps = [
  {
    icon: '🌿',
    title: 'RAW & UNFILTERED',
    description: 'Retains natural goodness & nutrients exactly as the bees intended.',
    accentFrom: 'from-emerald-50',
    accentTo: 'to-green-100'
  },
  {
    icon: '✨',
    title: 'NO ADDED SUGAR',
    description: 'Naturally sweet, completely untouched — zero adulterants.',
    accentFrom: 'from-amber-50',
    accentTo: 'to-yellow-100'
  },
  {
    icon: '🌸',
    title: 'NO ARTIFICIAL ADDITIVES',
    description: 'No chemicals, no additives, no preservatives. Just pure honey.',
    accentFrom: 'from-rose-50',
    accentTo: 'to-pink-100'
  },
  {
    icon: '🍯',
    title: 'DIRECTLY EXTRACTED',
    description: 'Sustainably harvested by local beekeepers from the Kolli Hills.',
    accentFrom: 'from-orange-50',
    accentTo: 'to-amber-100'
  }
]

export default function USPGrid() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-honeyDark/90">
          Our Promise
        </p>
        <h2 className="mt-4 text-3xl font-extrabold text-earth sm:text-4xl lg:text-5xl">
          Crafted for purity,
          <br className="hidden sm:block" /> trust, and timeless nourishment.
        </h2>
      </motion.div>

      {/* 1-col on mobile, 2-col on tablet, 4-col on desktop */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {usps.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`group relative cursor-default overflow-hidden rounded-[1.75rem]
                        bg-gradient-to-br ${item.accentFrom} ${item.accentTo}
                        shadow-glass transition-shadow duration-300 hover:shadow-glowLg`}
          >
            <div className="absolute inset-0 glass-cream rounded-[1.75rem] opacity-55" />
            <div
              className="absolute top-0 left-8 right-8 h-px rounded-b-full opacity-65"
              style={{ background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)' }}
            />
            <div
              className="pointer-events-none absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-25 blur-xl"
              style={{ background: 'radial-gradient(circle, #FCD34D, transparent)' }}
            />
            <div className="relative p-6 sm:p-8 space-y-4">
              <div
                className="inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl shadow-[0_6px_18px_rgba(180,83,9,0.18)]"
                style={{ background: 'linear-gradient(135deg, rgba(252,211,77,0.45), rgba(245,158,11,0.28))' }}
              >
                <span className="text-xl sm:text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-earth">{item.title}</h3>
              <p className="text-sm leading-[1.85] text-earth/70">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
