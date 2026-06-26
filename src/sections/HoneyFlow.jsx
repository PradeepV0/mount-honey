import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/* Animated SVG honey drip that fills a jar on scroll */
export default function HoneyFlow() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Map scroll to drip and fill progress
  const dripProgress = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])
  const fillHeight   = useTransform(scrollYProgress, [0.35, 0.75], ['100%', '0%'])
  const fillOpacity  = useTransform(scrollYProgress, [0.3, 0.4],  [0, 1])
  const pathLength   = useTransform(scrollYProgress, [0.05, 0.55], [0, 1])
  const dropY        = useTransform(scrollYProgress, [0.05, 0.55], [0, 340])
  const dropOp       = useTransform(scrollYProgress, [0.05, 0.1, 0.5, 0.55], [0, 1, 1, 0])

  const textInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #1A0D06 40%, #1A0D06 60%, #FAF7F2 100%)' }}
    >
      {/* Ambient honeyglow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px]"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(244,180,0,0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col items-center gap-3 text-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-[#F4B400]/50" />
            <span className="section-label text-[#F4B400]">Living Honey</span>
            <div className="h-px w-10 bg-[#F4B400]/50" />
          </div>
          <h2 className="luxury-heading text-4xl font-bold text-white sm:text-5xl">
            Watch It <span className="text-gradient-honey italic">Flow</span>
          </h2>
          <p className="max-w-md text-sm text-white/45 leading-[1.9]">
            From the ancient Kolli Hills forests, slowly dripping into your jar — exactly
            as nature delivers it.
          </p>
        </motion.div>

        {/* The drip animation SVG */}
        <div className="relative flex justify-center">
          <svg
            width="220"
            height="480"
            viewBox="0 0 220 480"
            className="relative z-10"
            overflow="visible"
          >
            {/* Drip path — curved honey trail */}
            <motion.path
              d="M110,0 C120,60 90,100 110,160 C130,220 90,260 110,320 C125,360 108,390 110,420"
              fill="none"
              stroke="url(#honeyGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength, opacity: pathLength }}
            />

            {/* Animated honey droplet */}
            <motion.g style={{ y: dropY, opacity: dropOp }}>
              <ellipse cx="110" cy="8" rx="7" ry="10" fill="url(#dropGradient)" />
              <ellipse cx="110" cy="4" rx="3" ry="2" fill="rgba(255,255,255,0.35)" />
            </motion.g>

            {/* Honey jar outline */}
            <g transform="translate(60, 380)">
              {/* Jar body */}
              <path
                d="M10,10 L8,80 Q10,100 50,100 Q90,100 92,80 L90,10 Z"
                fill="none"
                stroke="rgba(244,180,0,0.5)"
                strokeWidth="2"
              />
              {/* Jar neck */}
              <rect x="25" y="2" width="50" height="12" rx="4"
                fill="none" stroke="rgba(244,180,0,0.5)" strokeWidth="2" />
              {/* Jar lid */}
              <rect x="22" y="-4" width="56" height="10" rx="4"
                fill="rgba(244,180,0,0.6)" />

              {/* Honey fill — clips from bottom as scroll progresses */}
              <clipPath id="jarClip">
                <rect x="8" y="0" width="84" height="100" />
              </clipPath>
              <motion.rect
                x="9" y="0" width="82"
                fill="url(#fillGradient)"
                clipPath="url(#jarClip)"
                style={{
                  height: fillHeight,
                  opacity: fillOpacity,
                  transformOrigin: 'bottom',
                }}
              />

              {/* Jar shine */}
              <path
                d="M20,20 L18,75"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="honeyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F8E7A1" />
                <stop offset="50%" stopColor="#F4B400" />
                <stop offset="100%" stopColor="#D89C0D" />
              </linearGradient>
              <radialGradient id="dropGradient" cx="40%" cy="30%">
                <stop offset="0%" stopColor="#FFF6D9" />
                <stop offset="60%" stopColor="#F4B400" />
                <stop offset="100%" stopColor="#D89C0D" />
              </radialGradient>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4B400" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D89C0D" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </svg>

          {/* Left stat */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute left-0 top-1/3 -translate-y-1/2 rounded-2xl border border-[#F4B400]/25 bg-white/8 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-lg font-black text-[#F4B400]">2,000+</p>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/50 mt-0.5">Ft Altitude</p>
          </motion.div>

          {/* Right stat */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl border border-[#F4B400]/25 bg-white/8 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-lg font-black text-[#F4B400]">RAW</p>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/50 mt-0.5">Unfiltered</p>
          </motion.div>
        </div>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-center text-xs uppercase tracking-[0.4em] text-white/30"
        >
          Scroll to watch honey fill the jar
        </motion.p>
      </div>
    </section>
  )
}
