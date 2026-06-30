import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  { id: 1, h: 'tall',   label: 'Kolli Hills Forest',  sub: 'Wild harvest altitude',    bg: 'radial-gradient(ellipse at 40% 30%, #F8E7A1 0%, #F4B400 35%, #6B3200 70%, #0A0502 100%)' },
  { id: 2, h: 'short',  label: 'Golden Flow',          sub: 'Raw, unfiltered honey',    bg: 'radial-gradient(ellipse at 60% 60%, #FFF6D9 0%, #F4B400 40%, #C8860A 80%, #3A1500 100%)' },
  { id: 3, h: 'medium', label: 'The Hive',             sub: 'Natural honeycomb',         bg: 'linear-gradient(135deg, #C8860A 0%, #6B3200 40%, #1A0D06 100%)' },
  { id: 4, h: 'short',  label: 'Morning Ritual',       sub: 'A spoonful of purity',     bg: 'radial-gradient(ellipse at 30% 70%, #FFF6D9 0%, #F8E7A1 40%, #F4B400 80%, #6B3200 100%)' },
  { id: 5, h: 'tall',   label: 'Forest Mist',          sub: 'Kolli Hills at dawn',      bg: 'linear-gradient(160deg, #071209 0%, #152B12 30%, #2A5014 60%, #C8860A 100%)' },
  { id: 6, h: 'medium', label: 'Pure & Natural',       sub: '100% wild harvest',        bg: 'radial-gradient(circle at 50% 40%, #F4B400 0%, #C8860A 50%, #3A1500 100%)' },
  { id: 7, h: 'short',  label: 'Beekeeper Legacy',     sub: 'Third generation craft',   bg: 'linear-gradient(135deg, #0A0502 0%, #6B3200 50%, #C8860A 100%)' },
  { id: 8, h: 'tall',   label: 'Liquid Gold',          sub: "Nature's sweetest gift",   bg: 'radial-gradient(ellipse at 60% 40%, #FFF6D9 0%, #F4B400 30%, #C8860A 65%, #1A0D06 100%)' },
  { id: 9, h: 'medium', label: 'Wild Flowers',         sub: 'Multi-floral nectar',      bg: 'linear-gradient(160deg, #3A1500 0%, #C8860A 50%, #F8E7A1 100%)' },
]

const heightMap = { short: 'h-48', medium: 'h-64', tall: 'h-80' }

function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(item)}
      className={`masonry-item group relative cursor-pointer overflow-hidden rounded-[1.75rem] ${heightMap[item.h]}`}
      style={{
        background: item.bg,
        border: '1px solid rgba(244,180,0,0.08)',
      }}
      whileHover={{ scale: 1.025 }}
    >
      {/* Honeycomb texture overlay */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.07]" />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0502]/80 via-[#0A0502]/10 to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100" />

      {/* Amber shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: 'linear-gradient(135deg, rgba(244,180,0,0.08) 0%, transparent 60%)' }}
      />

      {/* Amber border glow on hover */}
      <div
        className="absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(244,180,0,0.35)' }}
      />

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-350 group-hover:translate-y-0">
        <p className="text-sm font-bold text-[#FDF3E1]">{item.label}</p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#F4B400]/70">{item.sub}</p>
      </div>

      {/* Expand icon */}
      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm"
        style={{ background: 'rgba(244,180,0,0.2)', border: '1px solid rgba(244,180,0,0.35)' }}
      >
        <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="#F4B400" strokeWidth="2">
          <path d="M3,3 L13,3 L13,13 M13,3 L3,13" />
        </svg>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lightbox-overlay flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full overflow-hidden rounded-[2.5rem]"
        style={{
          aspectRatio: '4/3',
          background: item.bg,
          border: '1px solid rgba(244,180,0,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        }}
      >
        <div className="absolute inset-0 bg-honeycomb opacity-[0.07]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(244,180,0,0.06) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-8"
          style={{ background: 'linear-gradient(0deg, rgba(10,5,2,0.85) 0%, transparent 100%)' }}
        >
          <p className="text-xl font-bold text-[#FDF3E1]">{item.label}</p>
          <p className="text-xs uppercase tracking-[0.38em] text-[#F4B400]/60 mt-1">{item.sub}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full transition"
          style={{
            background: 'rgba(15,7,2,0.7)',
            border: '1px solid rgba(244,180,0,0.25)',
            color: '#FDF3E1',
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const open  = useCallback((item) => setSelected(item), [])
  const close = useCallback(() => setSelected(null), [])

  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44 grain"
      style={{ background: 'linear-gradient(180deg, #071209 0%, #0A0502 50%, #071209 100%)' }}
    >
      {/* Honeycomb texture */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.05]" />

      {/* Ambient glow */}
      <div className="amber-orb pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/40" />
            <span className="section-label">Gallery</span>
            <div className="h-px w-10 bg-[#F4B400]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#FDF3E1] sm:text-5xl"
          >
            A Visual Journey Through{' '}
            <span className="text-gradient-honey italic">Kolli Hills</span>
          </motion.h2>
        </div>

        {/* Masonry */}
        <div className="masonry-grid">
          {ITEMS.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={open} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox item={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
