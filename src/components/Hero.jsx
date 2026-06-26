import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HoneycombVisual from './HoneycombVisual'
import { HoneyDripDivider } from './HoneyDivider'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax layers
  const bgY         = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const honeycombY  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY       = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Warm amber background (matches reference image palette) ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 origin-center scale-[1.12]"
      >
        {/* Primary amber radial gradient – mirrors the image's warm glow */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 90% at 25% 55%, #D97706 0%, #F59E0B 28%, #FCD34D 58%, #FEF3C7 100%)'
          }}
        />
        {/* Subtle vignette around edges */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(120,50,0,0.32) 100%)'
          }}
        />
        {/* Honey drizzle bokeh blobs */}
        <div className="absolute top-[10%] right-[8%] h-40 w-40 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FDE68A, transparent 70%)', filter: 'blur(32px)' }} />
        <div className="absolute bottom-[20%] right-[18%] h-56 w-56 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #FCD34D, transparent 70%)', filter: 'blur(44px)' }} />
      </motion.div>

      {/* ── Main hero grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10"
           style={{ minHeight: '100svh' }}>
        <div className="grid min-h-screen items-center gap-8
                        grid-cols-1 pt-24 pb-16
                        lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-28 lg:pb-24
                        xl:grid-cols-[1.15fr_0.85fr]">

          {/* ══ LEFT — Honeycomb visual (desktop) / TOP on mobile ══ */}
          <motion.div
            style={{ y: honeycombY }}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
              {/* Warm glow behind the honeycomb */}
              <div className="absolute inset-[-8%] rounded-[40%] opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, rgba(180,80,0,0.55), transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
              <HoneycombVisual className="relative drop-shadow-[0_20px_50px_rgba(120,50,0,0.35)]" />

              {/* Floating "100% Pure" badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="absolute -top-3 right-4 sm:right-8 lg:-right-6 glass-honey rounded-2xl px-4 py-3 shadow-glass"
              >
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-earth">100% Pure</p>
                <p className="text-[10px] text-earth/70 mt-0.5 tracking-[0.18em]">No Additives</p>
              </motion.div>

              {/* Floating "Kolli Hills" badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7 }}
                className="absolute -bottom-2 left-4 sm:left-8 lg:-left-6 glass-honey rounded-2xl px-4 py-3 shadow-glass"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-earth">Kolli Hills</p>
                <p className="text-[10px] text-earth/70 mt-0.5 tracking-[0.18em]">Wild Harvest</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ══ RIGHT — Text content ══ */}
          <motion.div
            style={{ y: textY }}
            className="order-1 lg:order-2 flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            {/* Origin badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-earth/20 bg-earth/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-earth backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-honeyDark animate-pulse" />
              Premium Honey · Kolli Hills, Tamil Nadu
            </motion.span>

            {/* Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32 }}
                className="text-4xl font-extrabold leading-[1.1] tracking-[-0.04em] text-earth sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Taste the
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #7C2D00, #B45309, #92400E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  PURITY OF
                </span>
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #92400E, #B45309, #7C2D00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  NATURE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.48 }}
                className="text-lg font-semibold text-earth/85 sm:text-xl"
              >
                FOOD OF GODDESS. Pure. Natural. Untouched.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.6 }}
                className="max-w-lg text-base leading-8 text-earth/70"
              >
                Carefully extracted by beekeepers from the pristine forests of the
                Kolli Hills. 100% Pure &amp; Natural honey, just as nature made.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.74 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_32px_rgba(120,50,0,0.35)] transition-shadow hover:shadow-[0_12px_40px_rgba(120,50,0,0.5)]"
                style={{ background: 'linear-gradient(135deg, #B45309, #92400E)' }}
              >
                Shop Our Honey
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-earth/30 bg-earth/8 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-earth backdrop-blur-sm transition hover:bg-earth/15"
              >
                Our Story
              </motion.a>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.9 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { value: '100%', label: 'Pure & Natural' },
                { value: '0%',   label: 'Added Sugar' },
                { value: 'RAW',  label: 'Unfiltered' }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-earth/15 bg-earth/10 px-5 py-3 text-center backdrop-blur-sm"
                >
                  <p className="text-xl font-extrabold text-honeyDeep sm:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-earth/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-earth/45">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-earth/25 pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-0.5 rounded-full bg-honeyDark"
          />
        </div>
      </motion.div>

      {/* ── Honey drip bottom transition ── */}
      <HoneyDripDivider fillColor="#FDFBF7" />
    </section>
  )
}
