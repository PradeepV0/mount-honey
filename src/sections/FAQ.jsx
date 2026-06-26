import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Is Mount Honey 100% pure with no additives?',
    a: 'Absolutely. Mount Honey is 100% pure, raw, and unfiltered wild forest honey from the Kolli Hills. We add nothing — no sugar syrups, no water, no preservatives, no artificial flavours, and no colours. What goes into the jar is exactly what the bees produced.',
  },
  {
    q: 'Where is the honey sourced from?',
    a: 'Our honey is exclusively sourced from the ancient forests of the Kolli Hills, Tamil Nadu, at altitudes above 2,000 feet. This pristine, remote location ensures the honey is free from agricultural pesticides and urban pollution, giving it exceptional purity and a complex multi-floral flavour profile.',
  },
  {
    q: 'Why does raw honey sometimes crystallize?',
    a: 'Crystallization is a completely natural process and actually a sign of genuine, unadulterated honey. Pure honey contains natural glucose that crystallizes over time. You can restore it to liquid form by gently warming the jar in warm water (never microwave). Honey that never crystallizes is often highly processed.',
  },
  {
    q: 'How should I store Mount Honey?',
    a: 'Store your honey at room temperature in a cool, dry place away from direct sunlight. Avoid refrigerating, as cold temperatures accelerate crystallization. A tightly sealed jar at room temperature keeps honey fresh virtually indefinitely — honey never truly expires.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India. Delivery charges are calculated at checkout based on your location. We recommend prebooking at least 2 days in advance so we can ensure freshness and availability. Contact us via Instagram @f_mounthoney_ for bulk or corporate orders.',
  },
  {
    q: 'What makes Kolli Hills honey special?',
    a: 'The Kolli Hills ecosystem is home to hundreds of endemic plants including wild jamun, neem, jackfruit, forest orchids, and medicinal herbs. Bees foraging across this diverse, chemical-free landscape produce honey with extraordinary complexity — a layered flavour and aroma that changes subtly with each harvest season.',
  },
  {
    q: 'Is Mount Honey suitable for diabetics?',
    a: 'While raw honey contains natural sugars and has a lower glycaemic index than refined sugar, we recommend that anyone with diabetes consult their physician before including honey in their diet. Raw honey\'s natural enzymes do help moderate its effect compared to processed sugars.',
  },
  {
    q: 'How is the honey extracted without harming the bees?',
    a: 'Our beekeeping partners practise ethical, regenerative harvesting — only collecting the surplus honey that hives naturally produce beyond what the colony needs for their own sustenance. Hives are never over-harvested, colonies are never harmed, and the forest ecosystem is always respected.',
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-[#2D1F10]/10 last:border-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition hover:text-[#D89C0D]"
      >
        <span className="text-sm font-semibold text-[#2D1F10] sm:text-base leading-relaxed pr-2">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#F4B400]/40 bg-[#F4B400]/10"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
            <line x1="8" y1="2" x2="8" y2="14" stroke="#D89C0D" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="#D89C0D" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-sm leading-[2] text-[#2D1F10]/60">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const toggle = (i) => setOpen((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#FAF7F2] py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle honeycomb */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.025]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-8 lg:px-10">
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
            <span className="section-label">FAQ</span>
            <div className="h-px w-10 bg-[#F4B400]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl"
          >
            Everything You Want to{' '}
            <span className="text-gradient-honey italic">Know</span>
          </motion.h2>
        </div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-[#2D1F10]/8 bg-white/60 px-6 py-2 shadow-[0_4px_40px_rgba(45,31,16,0.06)] backdrop-blur-sm sm:px-10"
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-[#2D1F10]/50">
            Still have questions? We&apos;re happy to help.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-outline text-[10px] font-bold uppercase tracking-[0.22em] text-[#2D1F10]"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
