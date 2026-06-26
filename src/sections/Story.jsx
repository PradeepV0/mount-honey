import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const BLOCKS = [
  {
    label: 'Our Origin',
    num: '01',
    title: 'Born from the\nMists of Kolli Hills',
    body: 'Deep in the pristine ancient forests of the Kolli Hills, Tamil Nadu, where giant trees tower above misty valleys and wildflowers bloom undisturbed — our bees have always known something extraordinary. At 2,000 feet altitude, untouched by modern agriculture, they produce honey unlike anything else on earth.',
    stat: { value: '2,000+', label: 'Feet Altitude' },
    bg: 'radial-gradient(ellipse 80% 70% at 40% 55%, #F4B400 0%, #D89C0D 40%, #7B3F00 80%, #1A0D06 100%)',
  },
  {
    label: 'Our Mission',
    num: '02',
    title: 'Nothing Added.\nNothing Taken Away.',
    body: 'MountHoney was born from a single belief: nature\'s sweetest gift deserves absolute respect. We partner with local beekeeping families who have tended these forests for generations, practising ethical, sustainable harvesting that ensures thriving hives and a living forest ecosystem.',
    stat: { value: '3rd Gen', label: 'Beekeepers' },
    bg: 'radial-gradient(ellipse 70% 80% at 60% 40%, #F8E7A1 0%, #F4B400 30%, #8B4500 65%, #2D1F10 100%)',
  },
  {
    label: 'Our Promise',
    num: '03',
    title: 'Pure as the\nForest Itself.',
    body: 'Every single jar carries the soul of the Kolli Hills — 100% raw, unheated, unfiltered. No additives, no preservatives, no shortcuts. Exactly as the bees made it. Exactly as nature intended. Tested in certified labs, sealed with our promise of absolute purity.',
    stat: { value: '0g', label: 'Added Sugar' },
    bg: 'radial-gradient(ellipse 90% 60% at 30% 60%, #FFF6D9 0%, #F4B400 28%, #8B4500 68%, #1A0D06 100%)',
  },
]

/* Word-by-word reveal */
function WordReveal({ text, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className="inline">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.48, delay: delay + i * 0.038, ease: 'easeOut' }}
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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`grid gap-14 lg:gap-24 lg:grid-cols-2 lg:items-center ${
        !isEven ? 'lg:[&>*:first-child]:order-last' : ''
      }`}
    >
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -48 : 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-[0_32px_80px_rgba(45,31,16,0.2)]">
          <motion.div className="absolute inset-0 scale-[1.12]" style={{ y: imgY }}>
            <div className="h-full w-full" style={{ background: block.bg }} />
          </motion.div>

          {/* Honey drip shimmer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)',
            }}
          />

          {/* Origin badge */}
          <div className="absolute bottom-5 left-5">
            <div className="rounded-xl border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-md">
              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/70">
                {block.label}
              </p>
            </div>
          </div>
        </div>

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-6 -right-4 rounded-2xl border border-[#F4B400]/25 bg-white/90 px-5 py-4 shadow-[0_12px_40px_rgba(45,31,16,0.14)] backdrop-blur-xl"
        >
          <p className="text-2xl font-black text-[#D89C0D]">{block.stat.value}</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#2D1F10]/55 mt-0.5">
            {block.stat.label}
          </p>
        </motion.div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 48 : -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D89C0D]">
            {block.num}
          </span>
          <div className="h-px w-8 bg-[#F4B400]/50" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D89C0D]">
            {block.label}
          </span>
        </div>

        <h2
          className="luxury-heading text-4xl font-bold leading-[1.1] text-[#2D1F10] sm:text-5xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          <WordReveal text={block.title} delay={0.15} />
        </h2>

        <p className="max-w-lg text-[0.9375rem] leading-[2] text-[#2D1F10]/60">
          {block.body}
        </p>

        {/* Ornament divider */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-px w-16 bg-gradient-to-r from-[#F4B400] to-transparent" />
          <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0 text-[#F4B400]">
            <polygon
              points="7,0 8.5,5 14,5 9.5,8.5 11.5,14 7,10.5 2.5,14 4.5,8.5 0,5 5.5,5"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-[#F4B400] to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#FAF7F2] py-24 sm:py-32 lg:py-44"
    >
      {/* Honeycomb texture */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.025]" />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244,180,0,0.1), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none absolute left-0 bottom-1/4 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216,156,13,0.08), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center lg:mb-32"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#F4B400]/50" />
            <span className="section-label">Our Story</span>
            <div className="h-px w-12 bg-[#F4B400]/50" />
          </div>
          <h2 className="luxury-heading text-5xl font-bold text-[#2D1F10] sm:text-6xl lg:text-7xl">
            From Forest to{' '}
            <span className="text-gradient-honey italic">Your Table</span>
          </h2>
        </motion.div>

        {/* Story blocks */}
        <div className="space-y-32 lg:space-y-44">
          {BLOCKS.map((block, i) => (
            <StoryBlock key={block.num} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
