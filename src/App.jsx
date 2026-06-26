import Navigation       from './components/Navigation'
import Footer          from './components/Footer'
import Hero            from './sections/Hero'
import Story           from './sections/Story'
import Benefits        from './sections/Benefits'
import HoneyFlow       from './sections/HoneyFlow'
import ProductShowcase from './sections/ProductShowcase'
import Gallery         from './sections/Gallery'
import Testimonials    from './sections/Testimonials'
import FAQ             from './sections/FAQ'
import Contact         from './sections/Contact'
import BeeAnimation    from './animations/BeeAnimation'

export default function App() {
  return (
    <div className="relative overflow-x-hidden bg-[#FAF7F2] text-[#2D1F10]">
      {/* Global bee swarm — floats above all sections */}
      <BeeAnimation />

      <Navigation />

      <main>
        <Hero />
        <Story />
        <Benefits />
        <HoneyFlow />
        <ProductShowcase />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
