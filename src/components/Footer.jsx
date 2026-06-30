import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  { section: 'Navigate', links: [
    { label: 'Home',      href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Benefits',  href: '#benefits' },
    { label: 'Products',  href: '#products' },
    { label: 'Gallery',   href: '#gallery' },
  ]},
  { section: 'Contact', links: [
    { label: 'Instagram @f_mounthoney_', href: '#' },
    { label: 'Facebook @f_mounthoney_',  href: '#' },
    { label: 'Kolli Hills, Tamil Nadu',  href: '#contact' },
  ]},
  { section: 'Policy', links: [
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Refund Policy',   href: '#' },
    { label: 'Shipping Info',   href: '#' },
  ]},
]

const STATS = [
  { value: '100%', label: 'Pure & Natural' },
  { value: '0%',   label: 'Added Sugar' },
  { value: 'RAW',  label: 'Unfiltered' },
  { value: '∞',    label: 'Purity Promised' },
]

export default function Footer() {
  return (
    <footer
      id="connect"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1A0D06 0%, #2D1F10 50%, #1A0D06 100%)' }}
    >
      {/* Amber drip divider from previous dark section */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height: '80px', display: 'block' }}>
          <path d="M0,40 Q180,80 360,45 Q540,10 720,48 Q900,86 1080,45 Q1260,4 1440,40 L1440,0 L0,0 Z" fill="#071209" />
          <ellipse cx="215" cy="46" rx="9" ry="18" fill="#071209" />
          <ellipse cx="540" cy="50" rx="7" ry="15" fill="#071209" />
          <ellipse cx="830" cy="54" rx="11" ry="20" fill="#071209" />
          <ellipse cx="1130" cy="44" rx="8" ry="16" fill="#071209" />
        </svg>
      </div>

      {/* Honeycomb texture */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.04] pointer-events-none" />

      {/* Amber glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(244,180,0,0.06), transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-8 sm:pt-28 lg:px-10">
        {/* Brand + Stats */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B400]">
                <span className="text-lg font-black text-[#2D1F10]">M</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  Mount<span style={{ color: '#F4B400' }}>Honey</span>
                </p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mt-0.5">
                  Pure · Natural · Kolli Hills
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/45">
              Harvested from the pristine ancient forests of the Kolli Hills, Tamil Nadu.
              Pure honey the way nature intended — nothing added, nothing taken away.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-4 gap-3"
          >
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center">
                <p className="text-xl font-black text-[#F4B400] sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/35">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Links grid */}
        <div className="grid gap-8 border-t border-white/8 pt-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {FOOTER_LINKS.map((col, i) => (
            <motion.div
              key={col.section}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F4B400]/60">
                {col.section}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/45 transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F4B400]/60">
              Order
            </p>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(244,180,0,0.45)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#F4B400] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2D1F10] shadow-[0_4px_20px_rgba(244,180,0,0.3)] whitespace-nowrap"
            >
              Prebook Now
            </motion.a>
            <p className="text-[10px] text-white/25 text-center lg:text-right">
              Delivery across India*
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/6 pt-8 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-white/25">
            © 2026 Mount Honey. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20">
            Crafted with care in Kolli Hills, Tamil Nadu 🌿
          </p>
        </div>
      </div>
    </footer>
  )
}
