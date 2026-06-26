import { useMemo } from 'react'
import { motion } from 'framer-motion'

/* Single bee SVG */
function BeeSVG({ size = 1 }) {
  const s = size
  return (
    <svg
      viewBox="0 0 48 32"
      width={48 * s}
      height={32 * s}
      fill="none"
      style={{ overflow: 'visible' }}
    >
      {/* Left wing */}
      <ellipse
        cx="14"
        cy="9"
        rx="12"
        ry="7"
        fill="rgba(200,230,255,0.55)"
        stroke="rgba(150,200,255,0.3)"
        strokeWidth="0.5"
        className="bee-wing-left"
      />
      {/* Right wing */}
      <ellipse
        cx="34"
        cy="9"
        rx="12"
        ry="7"
        fill="rgba(200,230,255,0.55)"
        stroke="rgba(150,200,255,0.3)"
        strokeWidth="0.5"
        className="bee-wing-right"
      />
      {/* Body */}
      <ellipse cx="24" cy="19" rx="10" ry="8" fill="#F4B400" />
      {/* Body stripes */}
      <rect x="14.5" y="15" width="19" height="3.5" rx="1.5" fill="#2D1F10" opacity="0.65" />
      <rect x="15.5" y="20" width="17" height="3" rx="1.5" fill="#2D1F10" opacity="0.45" />
      {/* Head */}
      <circle cx="24" cy="11" r="5.5" fill="#2D1F10" />
      {/* Eyes */}
      <circle cx="22" cy="10" r="1.5" fill="white" />
      <circle cx="26" cy="10" r="1.5" fill="white" />
      <circle cx="22.5" cy="10.2" r="0.6" fill="#1A0D06" />
      <circle cx="26.5" cy="10.2" r="0.6" fill="#1A0D06" />
      {/* Antennae */}
      <path d="M22,6 C20,3 17,1 15,0" stroke="#2D1F10" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M26,6 C28,3 31,1 33,0" stroke="#2D1F10" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="14.5" cy="0.2" r="1.2" fill="#2D1F10" />
      <circle cx="33.5" cy="0.2" r="1.2" fill="#2D1F10" />
      {/* Stinger */}
      <path d="M24,27 L24,31" stroke="#D89C0D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* Generate unique flight keyframes for each bee */
function makeFlightPath(seed) {
  const w = typeof window !== 'undefined' ? window.innerWidth  : 1200
  const h = typeof window !== 'undefined' ? window.innerHeight : 800

  // Deterministic pseudo-random from seed
  const rng = (n) => Math.abs(Math.sin(seed * 9.3 + n * 137.5))

  const startX  = rng(0) * w
  const startY  = rng(1) * h * 0.8

  return {
    startX,
    startY,
    xPath: [
      startX,
      startX + (rng(2) - 0.5) * 400,
      startX + (rng(3) - 0.5) * 350,
      startX + (rng(4) - 0.5) * 450,
      startX + (rng(5) - 0.5) * 300,
      startX,
    ],
    yPath: [
      startY,
      startY + (rng(6) - 0.5) * 200,
      startY + (rng(7) - 0.5) * 250,
      startY + (rng(8) - 0.5) * 180,
      startY + (rng(9) - 0.5) * 220,
      startY,
    ],
    rotatePath: [0, rng(10) * 30 - 15, rng(11) * 40 - 20, rng(12) * 30 - 15, 0],
    duration: 10 + rng(13) * 14,
    delay: rng(14) * -12,
    size: 0.45 + rng(15) * 0.65,
    zIndex: Math.floor(rng(16) * 50) + 5,
    opacity: 0.5 + rng(17) * 0.5,
  }
}

const BEE_COUNT = 10

export default function BeeAnimation() {
  const bees = useMemo(
    () => Array.from({ length: BEE_COUNT }, (_, i) => ({ id: i, ...makeFlightPath(i + 1) })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 15 }}>
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          initial={{ x: bee.startX, y: bee.startY, opacity: 0 }}
          animate={{
            x: bee.xPath,
            y: bee.yPath,
            rotate: bee.rotatePath,
            opacity: [0, bee.opacity, bee.opacity, bee.opacity, 0],
          }}
          transition={{
            duration: bee.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: bee.delay,
            ease: 'easeInOut',
            times: [0, 0.08, 0.5, 0.92, 1],
          }}
          style={{
            position: 'absolute',
            zIndex: bee.zIndex,
            willChange: 'transform',
          }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.8 + (bee.id % 3) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <BeeSVG size={bee.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
