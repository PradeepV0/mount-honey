import { motion } from 'framer-motion'

/**
 * Depth layers:
 *  'near'  — large, crisp, high opacity, front z-index
 *  'mid'   — medium, slight blur allowed, mid z-index
 *  'far'   — small, blurred, low opacity, behind text blocks
 */
const bees = [
  { x: '7%',  y: '18%', size: 58, blur: 0,   opacity: 0.9, delay: 0,    depth: 'near', zIndex: 25 },
  { x: '76%', y: '10%', size: 44, blur: 0,   opacity: 0.8, delay: 0.45, depth: 'mid',  zIndex: 15 },
  { x: '58%', y: '58%', size: 30, blur: 1.5, opacity: 0.45, delay: 0.2, depth: 'far',  zIndex: 8  },
  { x: '40%', y: '28%', size: 68, blur: 3,   opacity: 0.22, delay: 0.7, depth: 'far',  zIndex: 5  },
  { x: '87%', y: '52%', size: 22, blur: 2,   opacity: 0.38, delay: 1.1, depth: 'far',  zIndex: 8  },
]

function BeeSVG({ size, depth }) {
  const isNear = depth === 'near'
  const isMid  = depth === 'mid'
  const bodyFill = isNear ? '#F9C74F' : isMid ? '#F4A261' : '#E08C34'
  const sw = size < 32 ? 1.4 : size < 50 ? 1.8 : 2.2

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft glow beneath body */}
      <ellipse cx="32" cy="40" rx="18" ry="7" fill="rgba(255,176,32,0.18)" />

      {/* Body */}
      <ellipse cx="32" cy="34" rx="13" ry="17" fill={bodyFill} />

      {/* Belly gradient overlay */}
      <ellipse cx="32" cy="34" rx="13" ry="17" fill="rgba(244,162,97,0.55)" />

      {/* Stripes */}
      <path d="M21 28 Q32 23 43 28" stroke="#2C1B10" strokeWidth={sw} strokeLinecap="round" opacity="0.38"/>
      <path d="M20 34 Q32 29 44 34" stroke="#2C1B10" strokeWidth={sw} strokeLinecap="round" opacity="0.35"/>
      <path d="M21 40 Q32 35 43 40" stroke="#2C1B10" strokeWidth={sw} strokeLinecap="round" opacity="0.28"/>

      {/* Spine line */}
      <path d="M32 17V51" stroke="#2C1B10" strokeWidth={sw * 0.6} strokeLinecap="round" opacity="0.22"/>

      {/* Head */}
      <circle cx="32" cy="17" r="6" fill={bodyFill} />
      {/* Eyes */}
      <circle cx="29.5" cy="16" r="1.6" fill="#2C1B10" opacity="0.7" />
      <circle cx="34.5" cy="16" r="1.6" fill="#2C1B10" opacity="0.7" />
      {/* Eye shine */}
      <circle cx="30.2" cy="15.4" r="0.5" fill="white" opacity="0.8" />
      <circle cx="35.2" cy="15.4" r="0.5" fill="white" opacity="0.8" />

      {/* Antennae */}
      <path d="M29 13 Q24 8 22 5" stroke="#2C1B10" strokeWidth={sw * 0.75} strokeLinecap="round" opacity="0.55"/>
      <path d="M35 13 Q40 8 42 5" stroke="#2C1B10" strokeWidth={sw * 0.75} strokeLinecap="round" opacity="0.55"/>
      <circle cx="22" cy="5" r="1.5" fill="#D27D00" opacity="0.7"/>
      <circle cx="42" cy="5" r="1.5" fill="#D27D00" opacity="0.7"/>

      {/* Left wing */}
      <path
        className="bee-wing"
        d="M19 28C11 22 10 12 17 10C22 8 27 16 22 24"
        fill="rgba(255,255,255,0.58)"
        stroke="#2C1B10"
        strokeWidth={sw * 0.8}
        strokeLinecap="round"
      />
      {/* Right wing */}
      <path
        className="bee-wing"
        d="M45 28C53 22 54 12 47 10C42 8 37 16 42 24"
        fill="rgba(255,255,255,0.58)"
        stroke="#2C1B10"
        strokeWidth={sw * 0.8}
        strokeLinecap="round"
        style={{ animationDelay: '0.08s' }}
      />

      {/* Stinger */}
      <path d="M29 50 Q32 57 35 50" stroke="#2C1B10" strokeWidth={sw * 0.7} strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

export default function BeeFloatingEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bees.map((bee, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, bee.opacity, bee.opacity],
            y: [0, -(16 + i * 5), -(7 + i * 2), 0],
            x: [0, 9 + i * 2, -(5 + i * 2), 0],
            rotate: [0, 4, -3, 0]
          }}
          transition={{
            duration: 7 + i * 1.8,
            repeat: Infinity,
            repeatType: 'loop',
            delay: bee.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: bee.x,
            top: bee.y,
            zIndex: bee.zIndex,
            filter: [
              bee.blur > 0 ? `blur(${bee.blur}px)` : '',
              `drop-shadow(0 6px 16px rgba(210,125,0,${bee.depth === 'near' ? 0.45 : 0.2}))`
            ]
              .filter(Boolean)
              .join(' ')
          }}
        >
          <BeeSVG size={bee.size} depth={bee.depth} />
        </motion.div>
      ))}
    </div>
  )
}
