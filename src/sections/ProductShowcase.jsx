import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const PRODUCTS = [
  {
    id: 1,
    size: '250g',
    price: '₹249',
    priceNum: 249,
    badge: 'Popular',
    tagline: 'Perfect Start',
    desc: 'Small jar for daily luxury. Pure, raw & golden — ideal for tea, toast, or your morning wellness ritual.',
    features: ['Single-origin', '250g Net Weight', 'Glass Jar', 'Tamper-proof seal'],
    color: 'from-amber-400 to-yellow-500',
    glow: 'rgba(244,180,0,0.5)',
  },
  {
    id: 2,
    size: '500g',
    price: '₹499',
    priceNum: 499,
    badge: 'Bestseller',
    tagline: 'Family Favourite',
    desc: 'Perfect balance of richness and value. Our most loved pick — a full Kolli Hills experience for the whole family.',
    features: ['Single-origin', '500g Net Weight', 'Glass Jar', 'Gift-ready packaging'],
    color: 'from-yellow-500 to-amber-600',
    glow: 'rgba(216,156,13,0.55)',
    featured: true,
  },
  {
    id: 3,
    size: '1kg',
    price: '₹999',
    priceNum: 999,
    badge: 'Best Value',
    tagline: 'Generous Harvest',
    desc: 'The full forest harvest for serious honey lovers and gifting. Uncompromising purity in the largest size.',
    features: ['Single-origin', '1kg Net Weight', 'Premium Glass Jar', 'Ideal for gifting'],
    color: 'from-amber-600 to-orange-700',
    glow: 'rgba(180,80,0,0.45)',
  },
]

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotX = useSpring(useTransform(ry, [-0.5, 0.5], ['10deg', '-10deg']), { stiffness: 200, damping: 26 })
  const rotY = useSpring(useTransform(rx, [-0.5, 0.5], ['-10deg', '10deg']), { stiffness: 200, damping: 26 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    rx.set((e.clientX - r.left) / r.width - 0.5)
    ry.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { rx.set(0); ry.set(0); setHovered(false) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {product.featured && (
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            animate={{ boxShadow: ['0 0 16px rgba(244,180,0,0.4)', '0 0 32px rgba(244,180,0,0.7)', '0 0 16px rgba(244,180,0,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full bg-[#F4B400] px-5 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-[#2D1F10]"
          >
            ✦ Most Loved
          </motion.div>
        </div>
      )}

      <motion.article
        onMouseMove={move}
        onMouseLeave={leave}
        onMouseEnter={() => setHovered(true)}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1200 }}
        whileHover={{ y: -12 }}
        transition={{ duration: 0.35 }}
        className={`relative cursor-default overflow-hidden rounded-[2rem] ${
          product.featured
            ? 'shadow-[0_20px_60px_rgba(244,180,0,0.3),_0_0_0_2px_rgba(244,180,0,0.4)]'
            : 'shadow-[0_8px_32px_rgba(45,31,16,0.1)]'
        }`}
      >
        {/* Glass background */}
        <div className="glass-card absolute inset-0 rounded-[2rem]" />

        {/* Top accent gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
          style={{ background: `linear-gradient(90deg, #F4B400, #D89C0D)` }}
        />

        <div className="relative p-7 sm:p-8 space-y-6" style={{ transform: 'translateZ(22px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            {/* Jar visual */}
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} shadow-lg`}
            >
              <svg viewBox="0 0 40 50" width="28" height="35" fill="none">
                <rect x="10" y="5" width="20" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
                <path d="M7,11 L6,42 Q8,46 20,46 Q32,46 34,42 L33,11 Z" fill="rgba(255,255,255,0.25)" />
                <path d="M7,11 L6,42 Q8,46 20,46 Q32,46 34,42 L33,11 Z" fill="url(#j)" />
                <path d="M12,18 L11,38" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="j" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4B400" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D89C0D" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Badge */}
            <span
              className="shrink-0 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white"
              style={{ background: 'linear-gradient(135deg, #D89C0D, #8B4500)' }}
            >
              {product.badge}
            </span>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D89C0D] mb-1">{product.tagline}</p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#2D1F10]/60 font-semibold">{product.size} Jar</p>
            <p className="text-4xl font-black tracking-tight text-[#2D1F10] mt-1">{product.price}</p>
          </div>

          <p className="text-sm leading-[1.9] text-[#2D1F10]/60">{product.desc}</p>

          {/* Feature list */}
          <ul className="space-y-1.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[11px] text-[#2D1F10]/55">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F4B400] shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 32px ${product.glow}` }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-full py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2D1F10] transition-shadow"
            style={{ background: 'linear-gradient(135deg, #F4B400, #D89C0D)' }}
          >
            Prebook Now
          </motion.button>
        </div>

        {/* Floor shadow on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -bottom-8 left-8 right-8 h-12 rounded-[2rem] blur-2xl -z-10"
              style={{ background: product.glow }}
            />
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  )
}

export default function ProductShowcase() {
  return (
    <section
      id="products"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-44"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #FFF8E7 40%, #FAF7F2 100%)',
      }}
    >
      {/* Top wave */}
      <div className="pointer-events-none absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full" style={{ height: '60px' }}>
          <path d="M0,0 L0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,0 Z" fill="#FAF7F2" />
        </svg>
      </div>

      {/* Honeycomb bg */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.035]" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(244,180,0,0.09), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/60" />
            <span className="section-label">Products & Pricing</span>
            <div className="h-px w-10 bg-[#F4B400]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl lg:text-6xl"
          >
            Handpicked Honey Offerings{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-honey italic">for Every Moment</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs uppercase tracking-[0.3em] text-[#2D1F10]/45"
          >
            Prebook before 2 days · Delivery charges applicable*
          </motion.p>
        </div>

        {/* Products grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 perspective-1200">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 grid gap-5 rounded-3xl border border-[#F4B400]/20 bg-[#F4B400]/5 p-6 sm:grid-cols-3 sm:p-8"
        >
          {[
            { icon: '🚚', title: 'Pan-India Delivery', desc: 'We ship across India. Delivery charges at checkout.' },
            { icon: '📅', title: '2-Day Prebook', desc: 'Pre-order at least 2 days in advance for fresh harvest.' },
            { icon: '🔒', title: 'Secure Packaging', desc: 'Tamper-proof, airtight seals ensure freshness.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-[#2D1F10]">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#2D1F10]/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
