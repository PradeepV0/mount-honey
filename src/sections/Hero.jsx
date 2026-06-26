import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import heroVideo from '../assests/Hero.mp4'

const HEADING = ['PURE', 'FOREST', 'HONEY']

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const videoScale   = useTransform(scrollYProgress, [0, 1], [1, 1.22])
  const overlayOp    = useTransform(scrollYProgress, [0, 0.7], [0.52, 0.1])
  const headingY     = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const headingOp    = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const subY         = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#0F0803]"
    >
      {/* ── Video background with zoom-on-scroll ── */}
      <motion.div className="absolute inset-0 origin-center" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
        />
      </motion.div>

      {/* ── Cinematic dark gradient overlay ── */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          opacity: overlayOp,
          background:
            'linear-gradient(180deg, rgba(8,4,2,0.82) 0%, rgba(8,4,2,0.28) 45%, rgba(8,4,2,0.9) 100%)',
        }}
      />

      {/* ── Vignette edges ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(8,4,2,0.75) 100%)',
        }}
      />

      {/* ── Film grain ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      {/* ── Main hero content ── */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Eyebrow line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px w-14 bg-[#F4B400]/50" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.55em] text-[#F4B400]/80">
            Kolli Hills · Tamil Nadu · Est. 2020
          </span>
          <div className="h-px w-14 bg-[#F4B400]/50" />
        </motion.div>

        {/* Heading — each word slides up from below */}
        <motion.div style={{ y: headingY, opacity: headingOp }}>
          <div className="overflow-visible">
            {HEADING.map((word, i) => (
              <div key={word} className="overflow-hidden leading-[0.9]">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.15,
                    delay: 0.55 + i * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="luxury-heading block select-none text-[clamp(4.5rem,15vw,11rem)] font-black leading-[0.88] text-white"
                  style={{
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 140px rgba(244,180,0,0.22)',
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-6 text-[10px] font-semibold uppercase text-white/45"
          >
            Food of Goddess · Pure · Natural · Untouched
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          style={{ y: subY }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticBtn href="#products" primary>Shop Now</MagneticBtn>
            <MagneticBtn href="#story">Explore Story</MagneticBtn>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {['100% Pure', '0% Sugar', 'Raw · Unfiltered', 'Lab Tested'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-[9px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.55em] text-white/35">
          Scroll
        </span>
        <div className="relative flex h-10 w-5 items-start justify-center overflow-hidden rounded-full border border-white/25 pt-1.5">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-0.5 rounded-full bg-[#F4B400]"
          />
        </div>
      </motion.div>

      {/* ── Bottom wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="block w-full" style={{ height: '72px' }}>
          <path
            d="M0,36 Q180,70 360,38 Q540,6 720,42 Q900,78 1080,40 Q1260,2 1440,36 L1440,72 L0,72 Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>
    </section>
  )
}

/* Magnetic hover button */
function MagneticBtn({ href, children, primary = false }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 20 })
  const sy = useSpring(y, { stiffness: 160, damping: 20 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.32)
    y.set((e.clientY - r.top - r.height / 2) * 0.32)
  }
  const leave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative overflow-hidden rounded-full px-8 py-[1.1rem] text-[10px] font-bold uppercase tracking-[0.24em] transition-shadow duration-300 ${
        primary
          ? 'bg-[#F4B400] text-[#2D1F10] shadow-[0_8px_30px_rgba(244,180,0,0.45)] hover:shadow-[0_14px_50px_rgba(244,180,0,0.65)]'
          : 'border border-white/38 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/55'
      }`}
    >
      {primary && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white/30"
          initial={{ x: '-110%', skewX: '-15deg' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.55 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}
