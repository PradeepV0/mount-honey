import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTACT_INFO = [
  {
    icon: '📍',
    label: 'Location',
    value: 'Kolli Hills, Namakkal District, Tamil Nadu',
  },
  {
    icon: '📱',
    label: 'Social',
    value: '@f_mounthoney_',
    sub: 'Instagram & Facebook',
  },
  {
    icon: '📦',
    label: 'Order',
    value: 'Pre-order 2 days ahead',
    sub: 'Pan-India delivery',
  },
  {
    icon: '⏰',
    label: 'Response',
    value: 'Within 24 hours',
    sub: 'We reply to every message',
  },
]

function FloatInput({ label, name, type = 'text', required }) {
  return (
    <div className="float-label-group">
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        placeholder=" "
        autoComplete="off"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

function FloatTextarea({ label, name, rows = 4, required }) {
  return (
    <div className="float-label-group">
      <textarea
        name={name}
        id={name}
        rows={rows}
        required={required}
        placeholder=" "
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1600)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-44"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #FFF8E7 40%, #FAF7F2 100%)',
      }}
    >
      {/* Honeycomb bg */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.03]" />

      {/* Amber glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] translate-x-1/3 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244,180,0,0.1), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/60" />
            <span className="section-label">Get in Touch</span>
            <div className="h-px w-10 bg-[#F4B400]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#2D1F10] sm:text-5xl"
          >
            Connect With{' '}
            <span className="text-gradient-honey italic">Mount Honey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-sm leading-[2] text-[#2D1F10]/50"
          >
            Order, ask a question, or just say hello. We&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.5rem] border border-[#F4B400]/15 bg-white/70 p-8 shadow-[0_8px_40px_rgba(45,31,16,0.08)] backdrop-blur-sm sm:p-10"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-5 py-10 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4B400]/15">
                  <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="#F4B400" strokeWidth="2" />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      d="M12 20 L18 26 L28 14"
                      stroke="#D89C0D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#2D1F10]">Message Sent!</p>
                  <p className="mt-2 text-sm text-[#2D1F10]/55">
                    Thank you for reaching out. We&apos;ll reply within 24 hours.
                  </p>
                </div>
                <motion.button
                  onClick={() => setSent(false)}
                  whileHover={{ scale: 1.04 }}
                  className="btn-honey text-[10px]"
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="luxury-heading text-2xl font-bold text-[#2D1F10]">
                  Send a Message
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatInput label="Your Name" name="name" required />
                  <FloatInput label="Email Address" name="email" type="email" required />
                </div>

                <FloatInput label="Phone Number (optional)" name="phone" type="tel" />

                <div className="float-label-group">
                  <select
                    name="subject"
                    id="subject"
                    className="w-full rounded-2xl border border-[#2D1F10]/15 bg-[#FAF7F2]/80 px-5 py-4 text-sm text-[#2D1F10] outline-none transition focus:border-[#F4B400]/60 focus:shadow-[0_0_0_3px_rgba(244,180,0,0.12)]"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Subject</option>
                    <option>Place a Pre-Order</option>
                    <option>Product Inquiry</option>
                    <option>Bulk / Corporate Order</option>
                    <option>Shipping Question</option>
                    <option>Other</option>
                  </select>
                </div>

                <FloatTextarea label="Your Message" name="message" rows={4} required />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.03, boxShadow: '0 12px 40px rgba(244,180,0,0.5)' } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="btn-honey w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        className="h-4 w-4 rounded-full border-2 border-[#2D1F10]/30 border-t-[#2D1F10]"
                      />
                      Sending…
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info + map */}
          <div className="space-y-6">
            {/* Contact cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
            >
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-[#F4B400]/15 bg-white/60 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D89C0D] mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-[#2D1F10]">{item.value}</p>
                    {item.sub && (
                      <p className="text-[11px] text-[#2D1F10]/45">{item.sub}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative overflow-hidden rounded-[2rem] aspect-[4/3] border border-[#F4B400]/15 shadow-[0_8px_32px_rgba(45,31,16,0.08)]"
              style={{
                background: 'linear-gradient(160deg, #1A3A0A 0%, #2A5214 30%, #1B4A0E 60%, #0F2706 100%)',
              }}
            >
              {/* Topographic grid */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                {[0,1,2,3,4,5].map((i) => (
                  <ellipse key={i} cx="200" cy="150" rx={60 + i * 30} ry={40 + i * 20}
                    fill="none" stroke="#4ADE80" strokeWidth="0.5" opacity={0.4 - i * 0.06} />
                ))}
                {[0,1,2,3,4].map((i) => (
                  <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="300" stroke="#4ADE80" strokeWidth="0.3" opacity="0.15" />
                ))}
                {[0,1,2,3].map((i) => (
                  <line key={i} x1="0" y1={i * 100} x2="400" y2={i * 100} stroke="#4ADE80" strokeWidth="0.3" opacity="0.15" />
                ))}
              </svg>

              {/* Map pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-0"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4B400] shadow-[0_0_20px_rgba(244,180,0,0.6)]">
                    <svg viewBox="0 0 20 24" width="14" height="17" fill="#2D1F10">
                      <path d="M10,0 C5,0 0,4.5 0,10 C0,16 10,24 10,24 C10,24 20,16 20,10 C20,4.5 15,0 10,0 Z" />
                      <circle cx="10" cy="10" r="3.5" fill="#F4B400" />
                    </svg>
                  </div>
                  <div className="h-3 w-0.5 bg-[#F4B400]/60" />
                  <div className="h-1.5 w-3 rounded-full bg-black/30 blur-sm" />
                </motion.div>
              </div>

              {/* Location label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-center backdrop-blur-md">
                  <p className="text-xs font-bold text-white">Kolli Hills</p>
                  <p className="text-[9px] text-white/55 uppercase tracking-[0.25em]">Namakkal, Tamil Nadu</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
