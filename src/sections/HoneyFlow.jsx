import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const STATS = [
  { value: '2,000+', unit: 'ft', label: 'Harvest Altitude' },
  { value: '100%',   unit: '',   label: 'Raw & Unfiltered' },
  { value: '0',      unit: '%',  label: 'Added Sugar' },
  { value: '∞',      unit: '',   label: 'Shelf Life' },
]

export default function HoneyFlow() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Stream draws from top down to jar opening — completes early so fill can begin
  const pathLength = useTransform(scrollYProgress, [0.05, 0.32], [0, 1])
  const streamOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1])

  // Droplet travels down the stream
  const dropY  = useTransform(scrollYProgress, [0.06, 0.32], [-20, 192])
  const dropOp = useTransform(scrollYProgress, [0.06, 0.13, 0.28, 0.35], [0, 1, 1, 0])

  // Honey fills to ~75% WHILE section is in view
  // scrollYProgress 0=section enters, ~0.45=section centered, ~1=section exits
  // Fill completes by 0.62 so jar is full while user is still looking at the section
  const jarFillY = useTransform(scrollYProgress, [0.22, 0.62], [490, 198])
  const jarFillH = useTransform(scrollYProgress, [0.22, 0.62], [0,   292])
  const fillOpacity = useTransform(scrollYProgress, [0.20, 0.28], [0, 1])

  // Honey surface wave: oscillates ry between 4 and 10
  const waveRY  = useMotionValue(6)
  const smoothWave = useSpring(waveRY, { stiffness: 60, damping: 14 })
  useEffect(() => {
    let id
    const tick = () => {
      waveRY.set(6 + Math.sin(Date.now() / 900) * 4)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [waveRY])

  // Jar glow pulses subtly
  const glowScale = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1.4])

  return (
    <section
      ref={ref}
      id="honeyflow"
      className="relative overflow-hidden py-28 sm:py-36 lg:py-48 grain"
      style={{ background: 'linear-gradient(180deg, #071209 0%, #0F0702 35%, #1A0D06 65%, #0F0702 100%)' }}
    >
      {/* Honeycomb texture */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.05]" />

      {/* Jar amber glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[8%]"
        style={{ scale: glowScale, opacity: fillOpacity }}
      >
        <div
          className="h-[500px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(244,180,0,0.22), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">

          {/* ── LEFT: Text & Stats ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-px w-10 bg-[#F4B400]/40" />
              <span className="section-label">Living Honey</span>
              <div className="h-px w-10 bg-[#F4B400]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="luxury-heading mb-5 text-4xl font-bold text-[#FDF3E1] sm:text-5xl lg:text-6xl"
            >
              Watch It{' '}
              <span className="text-gradient-honey italic">Flow</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-10 max-w-md text-sm leading-[2.1] text-[#FDF3E1]/45"
            >
              From deep within the Kolli Hills forest, our honey flows exactly as nature
              intends — slow, thick, unheated, and alive with every enzyme and antioxidant
              the forest gifted it.
            </motion.p>

            {/* Stat badges */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.22 + i * 0.08 }}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(244,180,0,0.05)',
                    border: '1px solid rgba(244,180,0,0.12)',
                  }}
                >
                  <p className="text-2xl font-black text-[#F4B400]">
                    {s.value}<span className="text-lg">{s.unit}</span>
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FDF3E1]/40">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.38em] text-[#FDF3E1]/25"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#F4B400" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="3" x2="12" y2="21" />
                <polyline points="18 15 12 21 6 15" />
              </svg>
              Scroll to watch honey fill the jar
            </motion.p>
          </div>

          {/* ── RIGHT: Honey jar SVG ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <svg
              viewBox="0 0 300 580"
              className="w-full max-w-[340px] lg:max-w-[400px]"
              overflow="visible"
            >
              <defs>
                {/* Honey stream gradient */}
                <linearGradient id="hfStream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#FFF6D9" />
                  <stop offset="25%"  stopColor="#F4B400" />
                  <stop offset="100%" stopColor="#C8860A" />
                </linearGradient>

                {/* Jar glass gradient */}
                <linearGradient id="hfGlass" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(180,110,0,0.25)" />
                  <stop offset="20%"  stopColor="rgba(244,180,0,0.05)" />
                  <stop offset="75%"  stopColor="rgba(244,180,0,0.04)" />
                  <stop offset="100%" stopColor="rgba(180,110,0,0.20)" />
                </linearGradient>

                {/* Honey fill gradient */}
                <linearGradient id="hfHoney" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#8B4500" stopOpacity="0.9" />
                  <stop offset="25%"  stopColor="#C8860A" stopOpacity="0.92" />
                  <stop offset="50%"  stopColor="#F4B400" stopOpacity="0.85" />
                  <stop offset="75%"  stopColor="#C8860A" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#8B4500" stopOpacity="0.9" />
                </linearGradient>

                {/* Honey surface highlight */}
                <linearGradient id="hfSurface" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#F4B400" />
                  <stop offset="40%"  stopColor="#FFF6D9" stopOpacity="0.8" />
                  <stop offset="60%"  stopColor="#FFF6D9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F4B400" />
                </linearGradient>

                {/* Soft glow blur filter */}
                <filter id="hfGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Stream edge softener */}
                <filter id="hfSoft" x="-30%" y="-10%" width="160%" height="120%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
                </filter>

                {/* Drop shadow for jar */}
                <filter id="hfJarShadow" x="-20%" y="-10%" width="140%" height="130%">
                  <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000000" floodOpacity="0.55" />
                </filter>

                {/* Jar body clip path */}
                <clipPath id="hfJarClip">
                  <path d="M110,203 L96,472 Q100,492 150,492 Q200,492 204,472 L190,203 Z" />
                </clipPath>

                {/* Lid top clip */}
                <clipPath id="hfLidClip">
                  <rect x="98" y="138" width="104" height="20" rx="6" />
                </clipPath>
              </defs>

              {/* ── HONEY DRIP STREAM ── */}
              {/* Outer soft glow */}
              <motion.path
                d="M150,-10 C160,32 137,74 145,118 C148,138 149,162 150,205"
                fill="none"
                stroke="#F4B400"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#hfSoft)"
                style={{ pathLength, opacity: useTransform(streamOpacity, v => v * 0.25) }}
              />
              {/* Main thick body */}
              <motion.path
                d="M150,-10 C160,32 137,74 145,118 C148,138 149,162 150,205"
                fill="none"
                stroke="url(#hfStream)"
                strokeWidth="18"
                strokeLinecap="round"
                style={{ pathLength, opacity: streamOpacity }}
              />
              {/* Amber core */}
              <motion.path
                d="M150,-10 C160,32 137,74 145,118 C148,138 149,162 150,205"
                fill="none"
                stroke="#F4B400"
                strokeWidth="10"
                strokeLinecap="round"
                style={{ pathLength, opacity: streamOpacity }}
              />
              {/* Glossy highlight */}
              <motion.path
                d="M148,-10 C158,32 135,74 143,118 C146,138 147,162 148,205"
                fill="none"
                stroke="rgba(255,246,217,0.7)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength, opacity: streamOpacity }}
              />

              {/* ── DROPLET FALLING ── */}
              <motion.g style={{ y: dropY, opacity: dropOp }}>
                {/* Drop outer glow */}
                <ellipse cx="150" cy="6" rx="11" ry="17" fill="#F4B400" opacity="0.35" filter="url(#hfGlow)" />
                {/* Drop body */}
                <path d="M150,-5 C157,2 158,12 150,22 C142,12 143,2 150,-5 Z" fill="url(#hfStream)" />
                {/* Drop highlight */}
                <ellipse cx="147" cy="2" rx="3.5" ry="5" fill="rgba(255,246,217,0.65)" />
                {/* Drop shine bottom */}
                <ellipse cx="152" cy="16" rx="1.5" ry="2" fill="rgba(255,246,217,0.3)" />
              </motion.g>

              {/* ── JAR SHADOW ── */}
              <ellipse cx="150" cy="530" rx="85" ry="16"
                fill="rgba(0,0,0,0.45)" filter="url(#hfSoft)" />

              {/* ── JAR BODY ── */}
              <g filter="url(#hfJarShadow)">
                {/* Jar body fill */}
                <path
                  d="M110,203 L96,472 Q100,492 150,492 Q200,492 204,472 L190,203 Z"
                  fill="url(#hfGlass)"
                />
                {/* Jar body outline */}
                <path
                  d="M110,203 L96,472 Q100,492 150,492 Q200,492 204,472 L190,203 Z"
                  fill="none"
                  stroke="rgba(244,180,0,0.32)"
                  strokeWidth="1.5"
                />
              </g>

              {/* ── HONEY FILL (scroll-driven) ── */}
              <motion.g clipPath="url(#hfJarClip)" style={{ opacity: fillOpacity }}>
                {/* Honey body */}
                <motion.rect
                  x="95" width="110"
                  fill="url(#hfHoney)"
                  style={{ y: jarFillY, height: jarFillH }}
                />
                {/* Honey surface wave ellipse */}
                <motion.ellipse
                  cx="150" rx="54"
                  fill="url(#hfSurface)"
                  style={{ cy: jarFillY, ry: smoothWave }}
                />
                {/* Surface light reflection */}
                <motion.ellipse
                  cx="150" rx="24" ry="2.5"
                  fill="rgba(255,246,217,0.55)"
                  style={{ cy: useTransform(jarFillY, v => v - 2) }}
                />
              </motion.g>

              {/* ── JAR GLASS REFLECTIONS ── */}
              {/* Left vertical shine */}
              <path d="M118,218 L108,460"
                stroke="rgba(255,255,255,0.10)" strokeWidth="7" strokeLinecap="round" />
              <path d="M125,215 L118,340"
                stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
              {/* Right subtle edge */}
              <path d="M182,218 L192,440"
                stroke="rgba(0,0,0,0.08)" strokeWidth="4" strokeLinecap="round" />

              {/* ── JAR OPENING ELLIPSE (3D depth) ── */}
              <ellipse cx="150" cy="203" rx="40" ry="8"
                fill="rgba(244,180,0,0.06)"
                stroke="rgba(244,180,0,0.28)"
                strokeWidth="1.5" />

              {/* ── JAR NECK ── */}
              <rect x="108" y="158" width="84" height="48" rx="5"
                fill="rgba(244,180,0,0.05)"
                stroke="rgba(244,180,0,0.30)"
                strokeWidth="1.5" />
              {/* Neck internal ellipse top */}
              <ellipse cx="150" cy="158" rx="42" ry="7"
                fill="rgba(244,180,0,0.04)"
                stroke="rgba(244,180,0,0.20)"
                strokeWidth="1" />

              {/* ── JAR LID ── */}
              <rect x="96" y="138" width="108" height="24" rx="7"
                fill="rgba(200,134,10,0.55)"
                stroke="rgba(244,180,0,0.5)"
                strokeWidth="1.5" />
              {/* Lid highlight stripe */}
              <rect x="100" y="141" width="100" height="5" rx="3"
                fill="rgba(255,246,217,0.18)" />
              {/* Lid top ellipse */}
              <ellipse cx="150" cy="138" rx="54" ry="9"
                fill="rgba(200,134,10,0.6)"
                stroke="rgba(244,180,0,0.45)"
                strokeWidth="1.5" />
              {/* Lid top highlight */}
              <ellipse cx="140" cy="136" rx="22" ry="4"
                fill="rgba(255,246,217,0.22)" />

              {/* ── JAR BOTTOM ELLIPSE (3D depth) ── */}
              <ellipse cx="150" cy="490" rx="50" ry="8"
                fill="rgba(80,40,0,0.5)"
                stroke="rgba(244,180,0,0.15)"
                strokeWidth="1" />

              {/* ── HONEY LABEL ON JAR ── */}
              <motion.g style={{ opacity: fillOpacity }}>
                <rect x="115" y="330" width="70" height="44" rx="8"
                  fill="rgba(255,246,217,0.08)"
                  stroke="rgba(244,180,0,0.2)"
                  strokeWidth="1" />
                <text x="150" y="352" textAnchor="middle"
                  fontSize="7" fontWeight="700" letterSpacing="2"
                  fill="rgba(255,246,217,0.55)" fontFamily="serif">MOUNT</text>
                <text x="150" y="364" textAnchor="middle"
                  fontSize="6" fontWeight="600" letterSpacing="1.5"
                  fill="rgba(244,180,0,0.5)" fontFamily="sans-serif">HONEY</text>
              </motion.g>

              {/* ── HONEY DRIP FROM LID (when jar is filling) ── */}
              <motion.g style={{ opacity: useTransform(scrollYProgress, [0.28, 0.36], [0, 1]) }}>
                <ellipse cx="150" cy="162" rx="4" ry="6" fill="#F4B400" opacity="0.7" />
                <ellipse cx="150" cy="166" rx="2" ry="3" fill="#FFF6D9" opacity="0.45" />
              </motion.g>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom amber line divider */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(244,180,0,0.2), transparent)' }}
      />
    </section>
  )
}
