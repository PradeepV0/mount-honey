import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const PRODUCTS = [
  {
    id: 1,
    size: '250g',
    price: '₹249',
    badge: 'Popular',
    tagline: 'Perfect Start',
    desc: 'Small jar for daily luxury. Pure, raw & golden — ideal for tea, toast, or your morning wellness ritual.',
    features: ['Single-origin', '250g Net Weight', 'Glass Jar', 'Tamper-proof seal'],
    accent: '#D4860A',
    glow: 'rgba(212,134,10,0.45)',
    jarColor: 'linear-gradient(160deg, #F8E7A1, #F4B400, #C8860A)',
  },
  {
    id: 2,
    size: '500g',
    price: '₹499',
    badge: 'Bestseller',
    tagline: 'Family Favourite',
    desc: 'Perfect balance of richness and value. Our most loved pick — a full Kolli Hills experience for the whole family.',
    features: ['Single-origin', '500g Net Weight', 'Glass Jar', 'Gift-ready packaging'],
    accent: '#F4B400',
    glow: 'rgba(244,180,0,0.55)',
    jarColor: 'linear-gradient(160deg, #FFF6D9, #F4B400, #D4860A)',
    featured: true,
  },
  {
    id: 3,
    size: '1kg',
    price: '₹999',
    badge: 'Best Value',
    tagline: 'Generous Harvest',
    desc: 'The full forest harvest for serious honey lovers and gifting. Uncompromising purity in the largest size.',
    features: ['Single-origin', '1kg Net Weight', 'Premium Glass Jar', 'Ideal for gifting'],
    accent: '#C8860A',
    glow: 'rgba(200,134,10,0.45)',
    jarColor: 'linear-gradient(160deg, #F4B400, #C8860A, #6B3200)',
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
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {product.featured && (
        <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 16px rgba(244,180,0,0.4)',
                '0 0 36px rgba(244,180,0,0.75)',
                '0 0 16px rgba(244,180,0,0.4)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="rounded-full px-6 py-1.5 text-[9px] font-bold uppercase tracking-[0.32em]"
            style={{ background: 'linear-gradient(135deg, #F4B400, #C8860A)', color: '#0F0702' }}
          >
            ✦ Most Loved
          </motion.div>
        </div>
      )}

      <motion.article
        onMouseMove={move}
        onMouseLeave={leave}
        onMouseEnter={() => setHovered(true)}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        whileHover={{ y: -14 }}
        transition={{ duration: 0.35 }}
        className="relative cursor-default overflow-hidden rounded-[2rem]"
      >
        {/* Dark glass base */}
        <div
          className="absolute inset-0 rounded-[2rem]"
          style={{
            background: 'rgba(244,180,0,0.04)',
            border: `1px solid ${product.accent}28`,
            boxShadow: product.featured
              ? `0 0 0 1px ${product.accent}40, 0 20px 60px rgba(0,0,0,0.6)`
              : '0 8px 40px rgba(0,0,0,0.55)',
          }}
        />

        {/* Hover glow border */}
        <div
          className={`absolute inset-0 rounded-[2rem] transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            border: `1px solid ${product.accent}60`,
            boxShadow: `inset 0 0 30px ${product.glow.replace('0.', '0.0')}, 0 0 50px ${product.glow}`,
          }}
        />

        {/* Top amber line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2rem]"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }}
        />

        <div
          className="relative p-7 sm:p-8 space-y-6"
          style={{ transform: 'translateZ(24px)' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            {/* Honey jar illustration */}
            <div
              className="flex h-18 w-18 items-center justify-center rounded-2xl shadow-lg"
              style={{
                background: product.jarColor,
                boxShadow: `0 8px 28px ${product.glow}`,
                width: '72px',
                height: '72px',
              }}
            >
              <svg viewBox="0 0 40 52" width="30" height="38" fill="none">
                <rect x="10" y="4" width="20" height="7" rx="2.5" fill="rgba(255,255,255,0.3)" />
                <path d="M7,11 L5.5,43 Q7.5,48 20,48 Q32.5,48 34.5,43 L33,11 Z"
                  fill="rgba(255,255,255,0.15)" />
                <path d="M7,11 L5.5,43 Q7.5,48 20,48 Q32.5,48 34.5,43 L33,11 Z"
                  fill="url(#j)" />
                <path d="M12,20 L11,40" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="j" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4B400" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#8B4500" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Badge */}
            <span
              className="shrink-0 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: `rgba(244,180,0,0.12)`,
                border: `1px solid ${product.accent}40`,
                color: product.accent,
              }}
            >
              {product.badge}
            </span>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.42em] mb-1" style={{ color: product.accent }}>
              {product.tagline}
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#FDF3E1]/45 font-semibold">
              {product.size} Jar
            </p>
            <p className="text-4xl font-black tracking-tight text-[#FDF3E1] mt-1">
              {product.price}
            </p>
          </div>

          <p className="text-sm leading-[1.95] text-[#FDF3E1]/50">{product.desc}</p>

          {/* Features */}
          <ul className="space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[11px] text-[#FDF3E1]/45">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: product.accent }}
                />
                {f}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 36px ${product.glow}` }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-full py-4 text-[10px] font-bold uppercase tracking-[0.24em] transition-shadow"
            style={{
              background: `linear-gradient(135deg, #F4B400, ${product.accent})`,
              color: '#0F0702',
              boxShadow: `0 6px 24px ${product.glow}`,
            }}
          >
            Prebook Now
          </motion.button>
        </div>

        {/* Floor shadow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -bottom-10 left-8 right-8 h-14 rounded-[2rem] blur-2xl -z-10"
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
      className="relative overflow-hidden py-28 sm:py-36 lg:py-48 grain"
      style={{
        background: 'linear-gradient(180deg, #0F0702 0%, #1A0D06 50%, #0F0702 100%)',
      }}
    >
      {/* Honeycomb bg */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.05]" />

      {/* Ambient glow */}
      <div
        className="amber-orb pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[900px]"
        style={{ opacity: 0.35 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-18 text-center lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/40" />
            <span className="section-label">Products & Pricing</span>
            <div className="h-px w-10 bg-[#F4B400]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#FDF3E1] sm:text-5xl lg:text-6xl"
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
            className="mt-4 text-xs uppercase tracking-[0.32em] text-[#FDF3E1]/30"
          >
            Prebook before 2 days · Delivery charges applicable*
          </motion.p>
        </div>

        {/* Products */}
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
          className="mt-14 grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-8"
          style={{
            background: 'rgba(244,180,0,0.04)',
            border: '1px solid rgba(244,180,0,0.1)',
          }}
        >
          {[
            { icon: '🚚', title: 'Pan-India Delivery', desc: 'We ship across India. Delivery charges at checkout.' },
            { icon: '📅', title: '2-Day Prebook', desc: 'Pre-order at least 2 days in advance for fresh harvest.' },
            { icon: '🔒', title: 'Secure Packaging', desc: 'Tamper-proof, airtight seals ensure freshness.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-[#FDF3E1]">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#FDF3E1]/45">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
