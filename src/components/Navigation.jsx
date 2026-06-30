import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Our Story',   href: '#story' },
  { label: 'Benefits',    href: '#benefits' },
  { label: 'Products',    href: '#products' },
  { label: 'Gallery',     href: '#gallery' },
  { label: 'Contact',     href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  const close = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(10,5,2,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(244,180,0,0.1)',
        } : {}}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 no-underline group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4B400] shadow-[0_4px_12px_rgba(244,180,0,0.4)]">
              <HexLogo />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#FDF3E1]">
              Mount<span style={{ color: '#F4B400' }}>Honey</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative transition-colors duration-200
                  after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0
                  after:bg-[#F4B400] after:transition-all after:duration-300 hover:after:w-full
                  text-[#FDF3E1]/70 hover:text-[#FDF3E1]`}
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-[#F4B400] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2D1F10] shadow-[0_4px_20px_rgba(244,180,0,0.35)] hover:shadow-[0_6px_28px_rgba(244,180,0,0.55)] transition-shadow"
            >
              Order Now
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FDF3E1]/20 text-[#FDF3E1] transition md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {menuOpen ? (
                <><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></>
              ) : (
                <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
              )}
            </svg>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-[#2D1F10]/60 backdrop-blur-sm md:hidden"
              onClick={close}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-4 z-50 overflow-hidden rounded-3xl md:hidden"
              style={{
                background: 'rgba(10,5,2,0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                border: '1px solid rgba(244,180,0,0.15)',
              }}
            >
              <div className="flex items-center justify-between border-b border-[#F4B400]/15 px-5 py-4">
                <span className="text-xl font-extrabold tracking-tight text-[#FDF3E1]">
                  Mount<span style={{ color: '#F4B400' }}>Honey</span>
                </span>
                <button onClick={close} className="flex h-8 w-8 items-center justify-center rounded-full text-[#FDF3E1]/60"
                  style={{ background: 'rgba(244,180,0,0.1)', border: '1px solid rgba(244,180,0,0.2)' }}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-[#FDF3E1]/70 transition hover:bg-[#F4B400]/10 hover:text-[#FDF3E1]"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#products"
                  onClick={close}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-2 rounded-full bg-[#F4B400] py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#2D1F10] shadow-[0_4px_20px_rgba(244,180,0,0.35)]"
                >
                  Order Now
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function HexLogo() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
      <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="#2D1F10" opacity="0.85" />
      <text x="10" y="13.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="#F4B400" fontFamily="serif">M</text>
    </svg>
  )
}
