import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const BENEFITS = [
  {
    icon: '✦',
    title: 'Raw & Unfiltered',
    desc: 'Retains all natural enzymes, pollen, propolis, and antioxidants. Never heated above hive temperature — preserving every living nutrient exactly as nature intended.',
    accent: '#F4B400',
    glow: 'rgba(244,180,0,0.32)',
    iconBg: 'linear-gradient(135deg, #F4B400, #C8860A)',
  },
  {
    icon: '◈',
    title: 'Zero Additives',
    desc: 'No sugar syrups, no preservatives, no artificial colours or flavours. What you taste is exactly what the bees of Kolli Hills produced — pure and unadulterated.',
    accent: '#D4860A',
    glow: 'rgba(212,134,10,0.3)',
    iconBg: 'linear-gradient(135deg, #D4860A, #8B4500)',
  },
  {
    icon: '❋',
    title: 'Ethically Harvested',
    desc: 'Our beekeepers practise regenerative harvesting — taking only the surplus that hives naturally produce, ensuring thriving bee colonies and a healthy forest ecosystem.',
    accent: '#C8860A',
    glow: 'rgba(200,134,10,0.3)',
    iconBg: 'linear-gradient(135deg, #C8860A, #6B3200)',
  },
  {
    icon: '⬡',
    title: 'Lab Verified Purity',
    desc: 'Every batch undergoes rigorous testing for adulteration, moisture content, and microbial purity before it leaves our facility. Our transparency is our guarantee.',
    accent: '#F8E7A1',
    glow: 'rgba(248,231,161,0.22)',
    iconBg: 'linear-gradient(135deg, #F8E7A1, #D4860A)',
  },
  {
    icon: '✿',
    title: 'Wild Floral Nectar',
    desc: 'Foraged from 2,000+ feet elevation forests where jamun, neem, jackfruit, and endemic wildflowers create a multi-layered flavour profile impossible to replicate.',
    accent: '#EDD9A3',
    glow: 'rgba(237,217,163,0.2)',
    iconBg: 'linear-gradient(135deg, #EDD9A3, #C8860A)',
  },
  {
    icon: '◎',
    title: 'Altitude Advantage',
    desc: 'High altitude conditions mean lower contamination risk, superior antibacterial properties, lower moisture content, and a complexity of flavour found only in forest honey.',
    accent: '#8B4500',
    glow: 'rgba(139,69,0,0.4)',
    iconBg: 'linear-gradient(135deg, #C8860A, #4A1A00)',
  },
]

function BenefitCard({ benefit, index }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotX = useSpring(useTransform(ry, [-0.5, 0.5], ['10deg', '-10deg']), { stiffness: 200, damping: 28 })
  const rotY = useSpring(useTransform(rx, [-0.5, 0.5], ['-10deg', '10deg']), { stiffness: 200, damping: 28 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    rx.set((e.clientX - r.left) / r.width - 0.5)
    ry.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.article
      initial={{ opacity: 0, y: 56, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.72, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ y: -12 }}
      className="group relative cursor-default overflow-hidden rounded-[2rem]"
    >
      {/* Dark amber glass background */}
      <div
        className="absolute inset-0 rounded-[2rem]"
        style={{
          background: 'rgba(244,180,0,0.04)',
          border: `1px solid ${benefit.accent}22`,
          transition: 'border-color 0.4s ease, background 0.4s ease',
        }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          border: `1px solid ${benefit.accent}55`,
          boxShadow: `inset 0 0 30px ${benefit.glow}, 0 0 40px ${benefit.glow}`,
        }}
      />

      {/* Corner glow on hover */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${benefit.glow}, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 translate-x-[-110%] skew-x-[-15deg] opacity-0 transition-none group-hover:translate-x-[200%] group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${benefit.glow}, transparent)`,
          transition: 'transform 0.6s ease, opacity 0.1s',
        }}
      />

      <div className="relative space-y-4 p-7 sm:p-8" style={{ transform: 'translateZ(16px)' }}>
        {/* Icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg shadow-lg"
          style={{
            background: benefit.iconBg,
            color: '#0F0702',
            boxShadow: `0 8px 24px ${benefit.glow}`,
          }}
        >
          {benefit.icon}
        </div>

        <h3
          className="text-base font-bold"
          style={{ color: '#FDF3E1' }}
        >
          {benefit.title}
        </h3>

        <p className="text-sm leading-[1.95]" style={{ color: 'rgba(253,243,225,0.48)' }}>
          {benefit.desc}
        </p>

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
      className="relative overflow-hidden py-28 sm:py-36 lg:py-48 grain"
      style={{
        background: 'linear-gradient(180deg, #0F0702 0%, #0A0502 50%, #0F0702 100%)',
      }}
    >
      {/* Honeycomb texture */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.06]" />

      {/* Central amber orb */}
      <div
        className="amber-orb pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px]"
        style={{ opacity: 0.45 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-18 max-w-2xl text-center lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/40" />
            <span className="section-label">Why Mount Honey</span>
            <div className="h-px w-10 bg-[#F4B400]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#FDF3E1] sm:text-5xl lg:text-6xl"
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
            className="mt-5 text-sm leading-[2] text-[#FDF3E1]/40"
          >
            Six pillars that define every jar of Mount Honey — our non-negotiable commitment
            to the highest standards of purity and integrity.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-18 flex flex-col items-center gap-5 text-center"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#F4B400]/40 to-transparent" />
          <p className="text-sm text-[#FDF3E1]/35">
            Prebook before 2 days · Delivery charges applicable*
          </p>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, boxShadow: '0 14px 48px rgba(244,180,0,0.6)' }}
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
