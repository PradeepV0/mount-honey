import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const BLOCKS = [
  {
    label: 'Our Origin',
    num: '01',
    title: 'Born from the\nMists of Kolli Hills',
    body: 'Deep in the pristine ancient forests of the Kolli Hills, Tamil Nadu, where giant trees tower above misty valleys and wildflowers bloom undisturbed — our bees have always known something extraordinary. At 2,000 feet altitude, untouched by modern agriculture, they produce honey unlike anything else on earth.',
    stat: { value: '2,000+', label: 'Feet Altitude' },
    bg: 'radial-gradient(ellipse 80% 70% at 40% 55%, #F4B400 0%, #C8860A 40%, #4A1A00 80%, #0A0502 100%)',
    accent: '#F4B400',
  },
  {
    label: 'Our Mission',
    num: '02',
    title: 'Nothing Added.\nNothing Taken Away.',
    body: "MountHoney was born from a single belief: nature's sweetest gift deserves absolute respect. We partner with local beekeeping families who have tended these forests for generations, practising ethical, sustainable harvesting that ensures thriving hives and a living forest ecosystem.",
    stat: { value: '3rd Gen', label: 'Beekeepers' },
    bg: 'radial-gradient(ellipse 70% 80% at 60% 40%, #F8E7A1 0%, #F4B400 30%, #6B3200 65%, #0D1A0A 100%)',
    accent: '#D4860A',
  },
  {
    label: 'Our Promise',
    num: '03',
    title: 'Pure as the\nForest Itself.',
    body: 'Every single jar carries the soul of the Kolli Hills — 100% raw, unheated, unfiltered. No additives, no preservatives, no shortcuts. Exactly as the bees made it. Exactly as nature intended. Tested in certified labs, sealed with our promise of absolute purity.',
    stat: { value: '0g', label: 'Added Sugar' },
    bg: 'radial-gradient(ellipse 90% 60% at 30% 60%, #FFF6D9 0%, #F4B400 28%, #6B3200 68%, #071209 100%)',
    accent: '#C8860A',
  },
]

function WordReveal({ text, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className="inline">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.52, delay: delay + i * 0.04, ease: 'easeOut' }}
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}

function StoryBlock({ block, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`grid gap-14 lg:gap-28 lg:grid-cols-2 lg:items-center ${
        !isEven ? 'lg:[&>*:first-child]:order-last' : ''
      }`}
    >
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -56 : 56 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
          style={{ border: '1px solid rgba(244,180,0,0.12)' }}
        >
          <motion.div className="absolute inset-0 scale-[1.12]" style={{ y: imgY }}>
            <div className="h-full w-full" style={{ background: block.bg }} />
          </motion.div>

          {/* Honey shimmer overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Label badge */}
          <div className="absolute bottom-5 left-5">
            <div className="rounded-xl bg-black/50 px-4 py-2 backdrop-blur-md"
              style={{ border: '1px solid rgba(244,180,0,0.2)' }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#F4B400]/80">
                {block.label}
              </p>
            </div>
          </div>
        </div>

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-6 -right-4 rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(15,7,2,0.92)',
            border: `1px solid ${block.accent}40`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${block.accent}20`,
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-2xl font-black" style={{ color: block.accent }}>{block.stat.value}</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#FDF3E1]/45 mt-0.5">
            {block.stat.label}
          </p>
        </motion.div>

        {/* Ambient glow behind image */}
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${block.accent}55, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 56 : -56 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-7"
      >
        {/* Section label row */}
        <div className="flex items-center gap-3">
          <span
            className="text-5xl font-black opacity-15 luxury-heading select-none"
            style={{ color: block.accent, lineHeight: 1 }}
          >
            {block.num}
          </span>
          <div className="h-px flex-1 max-w-[32px]" style={{ background: `${block.accent}60` }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.48em]" style={{ color: block.accent }}>
            {block.label}
          </span>
        </div>

        <h2
          className="luxury-heading text-4xl font-bold leading-[1.08] text-[#FDF3E1] sm:text-5xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          <WordReveal text={block.title} delay={0.12} />
        </h2>

        <p className="max-w-lg text-[0.9375rem] leading-[2] text-[#FDF3E1]/50">
          {block.body}
        </p>

        {/* Ornament */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-px w-14 bg-gradient-to-r from-[#F4B400]/60 to-transparent" />
          <svg width="12" height="12" viewBox="0 0 14 14" style={{ color: block.accent }}>
            <polygon
              points="7,0 8.5,5 14,5 9.5,8.5 11.5,14 7,10.5 2.5,14 4.5,8.5 0,5 5.5,5"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-14 bg-gradient-to-l from-[#F4B400]/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden py-28 sm:py-36 lg:py-52 grain"
      style={{
        background: 'linear-gradient(180deg, #071209 0%, #0F0702 50%, #0D1A0A 100%)',
      }}
    >
      {/* Honeycomb texture */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.04]" />

      {/* Amber orbs */}
      <div className="amber-orb pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/4" />
      <div className="amber-orb pointer-events-none absolute left-0 bottom-1/4 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/4 opacity-60" />

      {/* Top wave from hero */}
      <div className="pointer-events-none absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="block w-full" style={{ height: '72px' }}>
          <path
            d="M0,36 Q180,70 360,38 Q540,6 720,42 Q900,78 1080,40 Q1260,2 1440,36 L1440,0 L0,0 Z"
            fill="#0F0702"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="mb-28 text-center lg:mb-40"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-[#F4B400]/35" />
            <span className="section-label">Our Story</span>
            <div className="h-px w-14 bg-[#F4B400]/35" />
          </div>
          <h2 className="luxury-heading text-5xl font-bold text-[#FDF3E1] sm:text-6xl lg:text-7xl">
            From Forest to{' '}
            <span className="text-gradient-honey italic">Your Table</span>
          </h2>
          <p className="mt-6 text-sm text-[#FDF3E1]/40 max-w-md mx-auto leading-[2]">
            Three generations of forest wisdom, one unbroken promise of purity.
          </p>
        </motion.div>

        {/* Story blocks */}
        <div className="space-y-36 lg:space-y-52">
          {BLOCKS.map((block, i) => (
            <StoryBlock key={block.num} block={block} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="block w-full" style={{ height: '72px' }}>
          <path
            d="M0,36 Q180,70 360,38 Q540,6 720,42 Q900,78 1080,40 Q1260,2 1440,36 L1440,72 L0,72 Z"
            fill="#0F0702"
          />
        </svg>
      </div>
    </section>
  )
}
