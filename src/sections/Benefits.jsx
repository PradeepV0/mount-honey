import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const BENEFITS = [
  {
    icon: '✦',
    title: 'Raw & Unfiltered',
    desc: 'Retains all natural enzymes, pollen, propolis, and antioxidants. Never heated above hive temperature — preserving every living nutrient exactly as nature intended.',
    from: 'from-amber-50',
    to: 'to-yellow-50/80',
    glow: 'rgba(244,180,0,0.3)',
    accent: '#F4B400',
  },
  {
    icon: '◈',
    title: 'Zero Additives',
    desc: 'No sugar syrups, no preservatives, no artificial colours or flavours. What you taste is exactly what the bees of Kolli Hills produced — pure and unadulterated.',
    from: 'from-orange-50',
    to: 'to-amber-50/80',
    glow: 'rgba(216,156,13,0.28)',
    accent: '#D89C0D',
  },
  {
    icon: '❋',
    title: 'Ethically Harvested',
    desc: 'Our beekeepers practise regenerative harvesting — taking only the surplus that hives naturally produce, ensuring thriving bee colonies and a healthy forest ecosystem.',
    from: 'from-emerald-50',
    to: 'to-green-50/80',
    glow: 'rgba(16,185,129,0.2)',
    accent: '#10B981',
  },
  {
    icon: '⬡',
    title: 'Lab Verified Purity',
    desc: 'Every batch undergoes rigorous testing for adulteration, moisture content, and microbial purity before it leaves our facility. Our transparency is our guarantee.',
    from: 'from-blue-50',
    to: 'to-indigo-50/80',
    glow: 'rgba(99,102,241,0.2)',
    accent: '#6366F1',
  },
  {
    icon: '✿',
    title: 'Wild Floral Nectar',
    desc: 'Foraged from 2,000+ feet elevation forests where jamun, neem, jackfruit, and endemic wildflowers create a multi-layered flavour profile impossible to replicate.',
    from: 'from-rose-50',
    to: 'to-pink-50/80',
    glow: 'rgba(244,63,94,0.18)',
    accent: '#F43F5E',
  },
  {
    icon: '◎',
    title: 'Altitude Advantage',
    desc: 'High altitude conditions mean lower contamination risk, superior antibacterial properties, lower moisture content, and a complexity of flavour found only in forest honey.',
    from: 'from-violet-50',
    to: 'to-purple-50/80',
    glow: 'rgba(139,92,246,0.2)',
    accent: '#8B5CF6',
  },
]

function Card3D({ benefit, index }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotX = useSpring(useTransform(ry, [-0.5, 0.5], ['11deg', '-11deg']), { stiffness: 220, damping: 26 })
  const rotY = useSpring(useTransform(rx, [-0.5, 0.5], ['-11deg', '11deg']), { stiffness: 220, damping: 26 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    rx.set((e.clientX - r.left) / r.width - 0.5)
    ry.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.article
      initial={{ opacity: 0, y: 52, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ y: -10 }}
      className={`group relative cursor-default overflow-hidden rounded-[2rem] bg-gradient-to-br ${benefit.from} ${benefit.to} transition-shadow duration-400 hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)]`}
    >
      {/* Glass layer */}
      <div
        className="absolute inset-0 rounded-[2rem]"
        style={{
          background: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95)',
        }}
      />

      {/* Top shimmer on hover */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${benefit.glow}, transparent)`,
        }}
      />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${benefit.glow}, transparent)`,
          filter: 'blur(16px)',
        }}
      />

      <div className="relative space-y-4 p-7 sm:p-8" style={{ transform: 'translateZ(18px)' }}>
        {/* Icon badge */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${benefit.accent}, ${benefit.glow.replace('rgba', 'rgb').replace(/,[\d.]+\)/, ')')})`,
          }}
        >
          {benefit.icon}
        </div>

        <h3 className="text-base font-bold text-[#2D1F10]">{benefit.title}</h3>
        <p className="text-sm leading-[1.95] text-[#2D1F10]/60">{benefit.desc}</p>

        {/* Bottom accent line */}
        <div
          className="h-px w-0 rounded-full transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${benefit.accent}, transparent)` }}
        />
      </div>
    </motion.article>
  )
}

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-44"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #FFF8E7 45%, #FAF7F2 100%)',
      }}
    >
      {/* Centre glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244,180,0,0.07), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/60" />
            <span className="section-label">Why Mount Honey</span>
            <div className="h-px w-10 bg-[#F4B400]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl lg:text-6xl"
          >
            Crafted for Purity,
            <br />
            <span className="text-gradient-honey italic">Trust & Nourishment</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-sm leading-[2] text-[#2D1F10]/55"
          >
            Six pillars that define every jar of Mount Honey — our non-negotiable commitment
            to the highest standards of purity and integrity.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Card3D key={b.title} benefit={b} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 flex flex-col items-center gap-5 text-center"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />
          <p className="text-sm text-[#2D1F10]/50">
            Prebook before 2 days · Delivery charges applicable*
          </p>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(244,180,0,0.5)' }}
            whileTap={{ scale: 0.96 }}
            className="btn-honey"
          >
            Explore Products
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
