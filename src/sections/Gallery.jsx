import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* Gallery items — styled visual cards with honey color palette */
const ITEMS = [
  { id: 1, h: 'tall',   label: 'Kolli Hills Forest',  sub: 'Wild harvest altitude',       bg: 'radial-gradient(ellipse at 40% 30%, #F8E7A1 0%, #F4B400 35%, #8B4500 70%, #1A0D06 100%)' },
  { id: 2, h: 'short',  label: 'Golden Flow',          sub: 'Raw, unfiltered honey',       bg: 'radial-gradient(ellipse at 60% 60%, #FFF6D9 0%, #F4B400 40%, #D89C0D 80%, #5C3300 100%)' },
  { id: 3, h: 'medium', label: 'The Hive',             sub: 'Natural honeycomb',            bg: 'linear-gradient(135deg, #D89C0D 0%, #8B4500 40%, #2D1F10 100%)' },
  { id: 4, h: 'short',  label: 'Morning Ritual',       sub: 'A spoonful of purity',        bg: 'radial-gradient(ellipse at 30% 70%, #FFF6D9 0%, #F8E7A1 40%, #F4B400 80%, #8B4500 100%)' },
  { id: 5, h: 'tall',   label: 'Forest Mist',          sub: 'Kolli Hills at dawn',         bg: 'linear-gradient(160deg, #1A0D06 0%, #5C3300 30%, #8B4500 60%, #D89C0D 100%)' },
  { id: 6, h: 'medium', label: 'Pure & Natural',       sub: '100% wild harvest',           bg: 'radial-gradient(circle at 50% 40%, #F4B400 0%, #D89C0D 50%, #5C3300 100%)' },
  { id: 7, h: 'short',  label: 'Beekeeper Legacy',     sub: 'Third generation craft',      bg: 'linear-gradient(135deg, #2D1F10 0%, #8B4500 50%, #D89C0D 100%)' },
  { id: 8, h: 'tall',   label: 'Liquid Gold',          sub: 'Nature\'s sweetest gift',     bg: 'radial-gradient(ellipse at 60% 40%, #FFF6D9 0%, #F4B400 30%, #D89C0D 65%, #2D1F10 100%)' },
  { id: 9, h: 'medium', label: 'Wild Flowers',         sub: 'Multi-floral nectar',         bg: 'linear-gradient(160deg, #5C3300 0%, #D89C0D 50%, #F8E7A1 100%)' },
]

const heightMap = { short: 'h-48', medium: 'h-64', tall: 'h-80' }

function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(item)}
      className={`masonry-item group relative cursor-pointer overflow-hidden rounded-[1.5rem] ${heightMap[item.h]}`}
      style={{ background: item.bg }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0803]/70 via-transparent to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100" />

      {/* Shimmer */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
        }}
      />

      {/* Honeycomb overlay subtle */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.06]" />

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-350 group-hover:translate-y-0">
        <p className="text-sm font-bold text-white">{item.label}</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/65">{item.sub}</p>
      </div>

      {/* Corner indicator */}
      <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
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
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full overflow-hidden rounded-[2.5rem]"
        style={{ aspectRatio: '4/3', background: item.bg }}
      >
        <div className="absolute inset-0 bg-honeycomb opacity-[0.07]" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-xl font-bold text-white">{item.label}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/55 mt-1">{item.sub}</p>
        </div>

        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition"
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
  const close = useCallback(() => setSelected(null),     [])

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#FAF7F2] py-24 sm:py-32 lg:py-40">
      {/* Top drip divider */}
      <div className="pointer-events-none absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="block w-full" style={{ height: '50px' }}>
          <path d="M0,25 Q360,50 720,25 Q1080,0 1440,25 L1440,0 L0,0 Z" fill="#FAF7F2" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/60" />
            <span className="section-label">Gallery</span>
            <div className="h-px w-10 bg-[#F4B400]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl"
          >
            A Visual Journey Through{' '}
            <span className="text-gradient-honey italic">Kolli Hills</span>
          </motion.h2>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {ITEMS.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={open} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox item={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
