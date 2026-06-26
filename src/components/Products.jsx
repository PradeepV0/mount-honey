import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { HoneyWaveDivider } from './HoneyDivider'

const products = [
  {
    title: '250g Honey',
    price: '₹249',
    description:
      'Small jar for daily luxury. Pure, raw & golden — perfect for tea, toast, or a daily wellness ritual.',
    badge: 'Popular'
  },
  {
    title: '500g Honey',
    price: '₹499',
    description:
      'Perfect balance of richness and natural sweetness. Our most loved family pick from the Kolli Hills.',
    badge: 'Bestseller'
  },
  {
    title: '1kg Honey',
    price: '₹999',
    description:
      'Generous harvest for family rituals and gifting. The full Kolli Hills experience in one jar.',
    badge: 'Best Value'
  }
]

export default function Products() {
  return (
    <section
      id="products"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #FFF8E7 35%, #FDFBF7 100%)' }}
    >
      <HoneyWaveDivider topColor="#FDFBF7" height={72} />

      {/* Honeycomb bg texture */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.04] pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full opacity-[0.1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.8), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-3xl flex-col gap-4 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-honeyDark/90">
            Products &amp; Pricing
          </p>
          <h2 className="text-3xl font-extrabold text-earth sm:text-4xl lg:text-5xl">
            Handpicked honey offerings
            <br className="hidden sm:block" /> for every moment.
          </h2>
          <p className="text-sm leading-7 text-earth/60">
            Prebook Before Two Days &amp; Delivery Charges Applicable*
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 perspective-1200
                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
