import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "The purest honey I've ever tasted. You can literally feel the difference from anything sold in supermarkets. Kolli Hills forest honey is on another level.",
    name: 'Priya Anand',
    role: 'Wellness Coach, Chennai',
    rating: 5,
  },
  {
    quote: "I've been ordering for 6 months and the consistency is remarkable. Every jar smells and tastes exactly the same — like pure golden forest. Absolutely no adulteration.",
    name: 'Karthik Subramanian',
    role: 'Ayurvedic Practitioner, Bangalore',
    rating: 5,
  },
  {
    quote: 'Gifted this to my family during Pongal. They couldn\'t believe honey could taste this rich. The packaging is beautiful, the honey is divine. Will never go back to brands.',
    name: 'Meena Krishnaswamy',
    role: 'Home Chef, Coimbatore',
    rating: 5,
  },
  {
    quote: 'As someone with strict purity requirements for my diet, MountHoney is the only honey I trust. Lab tested, single origin, zero processing. This is how honey should be.',
    name: 'Dr. Arun Venkatesan',
    role: 'Naturopath, Madurai',
    rating: 5,
  },
  {
    quote: 'I mix it into my morning warm water every day. Energy levels, digestion, skin — everything improved. The wild floral aroma is intoxicating. Reordered the 1kg jar.',
    name: 'Lakshmi Rajan',
    role: 'Yoga Instructor, Pondicherry',
    rating: 5,
  },
  {
    quote: "Finally found honey that doesn't crystallize weirdly or taste fake. The raw, unheated honey from Mount Honey retains all the benefits. My kids love it too!",
    name: 'Venkat Balaji',
    role: 'Software Engineer, Hyderabad',
    rating: 5,
  },
]

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#F4B400">
          <polygon points="6,0 7.5,4.5 12,4.5 8.5,7.5 9.9,12 6,9.5 2.1,12 3.5,7.5 0,4.5 4.5,4.5" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -6 }}
      transition={{ duration: 0.3 }}
      className="mx-3 w-[340px] shrink-0 cursor-default rounded-[1.75rem] p-6 shadow-[0_4px_24px_rgba(45,31,16,0.1)]"
      style={{
        background: 'rgba(253,243,225,0.92)',
        border: '1px solid rgba(200,134,10,0.18)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="mb-4 text-5xl leading-none font-black select-none luxury-heading"
        style={{ color: 'rgba(200,134,10,0.3)', lineHeight: 1 }}
      >
        "
      </div>

      <p className="mb-5 text-sm leading-[2] text-[#2D1F10]/70 italic">
        "{t.quote}"
      </p>

      <div
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: '1px solid rgba(200,134,10,0.15)' }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#0F0702]"
          style={{ background: 'linear-gradient(135deg, #F4B400, #C8860A)' }}
        >
          {t.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#2D1F10] truncate">{t.name}</p>
          <p className="text-[10px] text-[#2D1F10]/45 truncate">{t.role}</p>
        </div>
        <StarRow count={t.rating} />
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: 'linear-gradient(180deg, #FDF3E1 0%, #F5E6C8 50%, #FDF3E1 100%)' }}
    >
      {/* Subtle honeycomb on parchment */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.06]" />

      {/* Amber centre glow */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(244,180,0,0.12), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-14 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#C8860A]/50" />
            <span className="section-label" style={{ color: '#C8860A' }}>Testimonials</span>
            <div className="h-px w-10 bg-[#C8860A]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl"
          >
            Loved by{' '}
            <span className="text-gradient-honey italic">Thousands</span>{' '}
            Across India
          </motion.h2>
        </div>

        {/* Fade masks */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 sm:w-44"
            style={{ background: 'linear-gradient(90deg, #FDF3E1, transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 sm:w-44"
            style={{ background: 'linear-gradient(270deg, #FDF3E1, transparent)' }} />

          <div className="overflow-hidden pb-5">
            <div className="marquee-track">
              {items.map((t, i) => <TestimonialCard key={i} t={t} />)}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '34s' }}>
              {[...items].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
            </div>
          </div>
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <StarRow count={5} />
          <p className="text-sm text-[#2D1F10]/55">
            <strong className="text-[#2D1F10]">4.9 / 5</strong> from 200+ verified customers
          </p>
        </motion.div>
      </div>
    </section>
  )
}
