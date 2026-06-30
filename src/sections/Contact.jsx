import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTACT_INFO = [
  { icon: '📍', label: 'Location',  value: 'Kolli Hills, Namakkal District, Tamil Nadu' },
  { icon: '📱', label: 'Social',    value: '@f_mounthoney_', sub: 'Instagram & Facebook' },
  { icon: '📦', label: 'Order',     value: 'Pre-order 2 days ahead', sub: 'Pan-India delivery' },
  { icon: '⏰', label: 'Response',  value: 'Within 24 hours', sub: 'We reply to every message' },
]

function FloatInput({ label, name, type = 'text', required }) {
  return (
    <div className="float-label-group">
      <input type={type} name={name} id={name} required={required} placeholder=" " autoComplete="off" />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

function FloatTextarea({ label, name, rows = 4, required }) {
  return (
    <div className="float-label-group">
      <textarea name={name} id={name} rows={rows} required={required} placeholder=" " />
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
    setTimeout(() => { setLoading(false); setSent(true) }, 1600)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 sm:py-36 lg:py-48 grain"
      style={{ background: 'linear-gradient(180deg, #071209 0%, #0F0702 50%, #071209 100%)' }}
    >
      {/* Honeycomb */}
      <div className="pointer-events-none absolute inset-0 bg-honeycomb opacity-[0.05]" />

      {/* Amber glow right */}
      <div className="amber-orb pointer-events-none absolute right-0 top-1/3 h-[550px] w-[550px] translate-x-1/3 opacity-35" />
      <div className="amber-orb pointer-events-none absolute left-0 bottom-1/3 h-[400px] w-[400px] -translate-x-1/3 opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-[#F4B400]/40" />
            <span className="section-label">Get in Touch</span>
            <div className="h-px w-10 bg-[#F4B400]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="luxury-heading text-4xl font-bold text-[#FDF3E1] sm:text-5xl"
          >
            Connect With{' '}
            <span className="text-gradient-honey italic">Mount Honey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-sm leading-[2] text-[#FDF3E1]/38"
          >
            Order, ask a question, or just say hello. We&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.5rem] p-8 sm:p-10"
            style={{
              background: 'rgba(244,180,0,0.04)',
              border: '1px solid rgba(244,180,0,0.12)',
              boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-5 py-10 text-center"
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: 'rgba(244,180,0,0.12)', border: '1px solid rgba(244,180,0,0.3)' }}
                >
                  <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="#F4B400" strokeWidth="1.5" />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      d="M12 20 L18 26 L28 14"
                      stroke="#F4B400"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#FDF3E1]">Message Sent!</p>
                  <p className="mt-2 text-sm text-[#FDF3E1]/45">
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
                <h3 className="luxury-heading text-2xl font-bold text-[#FDF3E1]">
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
                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition"
                    style={{
                      background: 'rgba(244,180,0,0.04)',
                      border: '1px solid rgba(244,180,0,0.15)',
                      color: 'rgba(253,243,225,0.7)',
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled style={{ background: '#1A0D06' }}>Select Subject</option>
                    <option style={{ background: '#1A0D06' }}>Place a Pre-Order</option>
                    <option style={{ background: '#1A0D06' }}>Product Inquiry</option>
                    <option style={{ background: '#1A0D06' }}>Bulk / Corporate Order</option>
                    <option style={{ background: '#1A0D06' }}>Shipping Question</option>
                    <option style={{ background: '#1A0D06' }}>Other</option>
                  </select>
                </div>

                <FloatTextarea label="Your Message" name="message" rows={4} required />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.03, boxShadow: '0 14px 48px rgba(244,180,0,0.55)' } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="btn-honey w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        className="h-4 w-4 rounded-full border-2 border-[#0F0702]/30 border-t-[#0F0702]"
                      />
                      Sending…
                    </span>
                  ) : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info + map */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
                  className="flex items-start gap-4 rounded-2xl p-4"
                  style={{
                    background: 'rgba(244,180,0,0.04)',
                    border: '1px solid rgba(244,180,0,0.1)',
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{ background: 'rgba(244,180,0,0.1)', border: '1px solid rgba(244,180,0,0.2)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] mb-0.5 text-[#F4B400]/75">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-[#FDF3E1]">{item.value}</p>
                    {item.sub && <p className="text-[11px] text-[#FDF3E1]/35">{item.sub}</p>}
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
              className="relative overflow-hidden rounded-[2rem] aspect-[4/3]"
              style={{
                background: 'linear-gradient(160deg, #071209 0%, #0D2E0A 40%, #152B12 70%, #0A1508 100%)',
                border: '1px solid rgba(244,180,0,0.1)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Topographic grid */}
              <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                {[0,1,2,3,4,5].map((i) => (
                  <ellipse key={i} cx="200" cy="150" rx={55 + i * 28} ry={38 + i * 18}
                    fill="none" stroke="#F4B400" strokeWidth="0.5" opacity={0.35 - i * 0.05} />
                ))}
                {[0,1,2,3,4].map((i) => (
                  <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="300" stroke="#F4B400" strokeWidth="0.3" opacity="0.12" />
                ))}
                {[0,1,2,3].map((i) => (
                  <line key={i} x1="0" y1={i * 100} x2="400" y2={i * 100} stroke="#F4B400" strokeWidth="0.3" opacity="0.12" />
                ))}
              </svg>

              {/* Map pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: '#F4B400', boxShadow: '0 0 28px rgba(244,180,0,0.7)' }}
                  >
                    <svg viewBox="0 0 20 24" width="14" height="17" fill="#0F0702">
                      <path d="M10,0 C5,0 0,4.5 0,10 C0,16 10,24 10,24 C10,24 20,16 20,10 C20,4.5 15,0 10,0 Z" />
                      <circle cx="10" cy="10" r="3.5" fill="#F4B400" />
                    </svg>
                  </div>
                  <div className="h-3 w-0.5" style={{ background: 'rgba(244,180,0,0.6)' }} />
                  <div className="h-1.5 w-4 rounded-full blur-sm" style={{ background: 'rgba(0,0,0,0.4)' }} />
                </motion.div>
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div
                  className="rounded-xl px-4 py-2 text-center backdrop-blur-md"
                  style={{ background: 'rgba(10,5,2,0.75)', border: '1px solid rgba(244,180,0,0.2)' }}
                >
                  <p className="text-xs font-bold text-[#FDF3E1]">Kolli Hills</p>
                  <p className="text-[9px] text-[#F4B400]/55 uppercase tracking-[0.28em]">Namakkal, Tamil Nadu</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
