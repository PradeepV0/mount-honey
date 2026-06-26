import { motion } from 'framer-motion'

const highlights = [
  { icon: '🌿', label: 'Ethical Harvest', desc: 'Sustainably sourced from Kolli Hills', bg: 'from-green-50 to-emerald-100' },
  { icon: '🤝', label: 'Local Trust',     desc: 'Supporting communities with every jar', bg: 'from-amber-50 to-yellow-100' },
  { icon: '🔬', label: 'Lab Tested',      desc: 'Verified purity in every batch', bg: 'from-blue-50 to-indigo-50' },
  { icon: '🌄', label: 'Wild Forest',     desc: 'Kolli Hills altitude honey at its finest', bg: 'from-orange-50 to-amber-100' }
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Organic blob accents */}
      <div
        className="pointer-events-none absolute -right-48 top-0 h-[500px] w-[500px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #F59E0B, transparent 68%)', borderRadius: '62% 38% 68% 32% / 52% 58% 42% 48%' }}
      />
      <div
        className="pointer-events-none absolute -left-36 bottom-10 h-[320px] w-[320px] opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #D97706, transparent 70%)', borderRadius: '42% 58% 35% 65% / 55% 45% 55% 45%' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:gap-16
                        grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-honeyDark/90">
              Who We Are &amp; What We Do
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-earth sm:text-4xl lg:text-5xl">
              NOTHING ADDED.<br />NOTHING TAKEN AWAY.
            </h2>
            <p className="max-w-xl text-base leading-8 text-earth/75">
              MountHoney is a passion-driven brand dedicated to bringing you
              the purest honey from the untouched forests of the Kolli Hills.
            </p>
            <p className="max-w-xl text-base leading-8 text-earth/75">
              We work closely with local beekeepers, practising ethical and
              sustainable beekeeping to deliver raw, unfiltered honey — the
              way nature intended.
            </p>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_6px_24px_rgba(120,50,0,0.3)] transition-shadow"
              style={{ background: 'linear-gradient(135deg, #D97706, #92400E)' }}
            >
              Explore Products
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="glass-cream rounded-[2rem] p-6 sm:p-8 shadow-deep3d"
          >
            <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.bg} p-5 sm:p-6 cursor-default`}
                >
                  <div
                    className="pointer-events-none absolute -top-3 -right-3 h-14 w-14 rounded-full opacity-30"
                    style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}
                  />
                  <span className="mb-2 block text-xl sm:text-2xl">{item.icon}</span>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-honeyDark/80 font-semibold">{item.label}</p>
                  <p className="mt-1.5 text-sm font-semibold leading-relaxed text-earth">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
