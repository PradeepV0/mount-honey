import { motion } from 'framer-motion'
import { useMemo } from 'react'

// ─── Hex grid constants ───────────────────────────────────────────────────────
const R = 38           // circumradius: center → vertex
const SQRT3 = 1.7320508
const COL_STEP = R * SQRT3    // ≈ 65.82  (horizontal center-to-center)
const ROW_STEP = R * 1.5      // = 57     (vertical center-to-center)
const COLS = 7
const ROWS = 5
const PAD = 8

// Pointy-top hexagon: vertex at top (angle offset = -90°)
function hexPts(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

const SVG_W = Math.ceil(PAD + R + (COLS - 1) * COL_STEP + COL_STEP / 2 + R + PAD)
const SVG_H = Math.ceil(PAD + R + (ROWS - 1) * ROW_STEP + R + PAD + 80) // +80 for bee area

// Build the hex cell grid
function buildCells() {
  const cells = []
  for (let row = 0; row < ROWS; row++) {
    const xOffset = row % 2 === 1 ? COL_STEP / 2 : 0
    for (let col = 0; col < COLS; col++) {
      const cx = PAD + R + col * COL_STEP + xOffset
      const cy = PAD + R + row * ROW_STEP
      // 3 fill variants for visual texture variation
      const variant = (row * 3 + col * 2 + (row % 2)) % 3
      cells.push({ cx, cy, variant, id: `${row}-${col}` })
    }
  }
  return cells
}

// ─── Bee Component (SVG group, facing right) ─────────────────────────────────
function BeeSVG() {
  // Bee drawn at its own local coordinate space (≈ 200 × 90 bounding box)
  // centered around (0, 0), facing RIGHT, body from x≈-85 to x≈50
  return (
    <g>
      <defs>
        {/* Abdomen gradient */}
        <linearGradient id="abdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#E07800" />
        </linearGradient>
        {/* Wing gradient */}
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(220,240,255,0.72)" />
          <stop offset="100%" stopColor="rgba(180,220,255,0.38)" />
        </linearGradient>
        {/* Thorax gradient */}
        <linearGradient id="thoraxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B3A00" />
          <stop offset="100%" stopColor="#3D1C00" />
        </linearGradient>
        {/* Abdomen clip */}
        <clipPath id="abdClip">
          <ellipse cx="-28" cy="4" rx="52" ry="24" />
        </clipPath>
      </defs>

      {/* ── Soft ground shadow ── */}
      <ellipse cx="-15" cy="36" rx="65" ry="9" fill="rgba(80,30,0,0.22)" />

      {/* ── Hind wings (behind body) ── */}
      <path
        d="M 8,-4 Q 20,-38 46,-32 Q 52,-22 35,-10 Z"
        fill="url(#wingGrad)"
        stroke="rgba(140,180,220,0.5)"
        strokeWidth="0.6"
      />
      {/* hindwing vein */}
      <line x1="8" y1="-4" x2="44" y2="-24" stroke="rgba(120,160,200,0.35)" strokeWidth="0.5" />

      {/* ── Fore wings (on top of hind wings) ── */}
      <path
        d="M 6,-8 Q 18,-58 60,-44 Q 68,-28 48,-12 Z"
        fill="url(#wingGrad)"
        stroke="rgba(140,180,220,0.55)"
        strokeWidth="0.7"
      />
      {/* forewing veins */}
      <line x1="6" y1="-8" x2="54" y2="-38" stroke="rgba(120,160,200,0.38)" strokeWidth="0.55" />
      <line x1="18" y1="-24" x2="58" y2="-36" stroke="rgba(120,160,200,0.28)" strokeWidth="0.45" />
      <line x1="30" y1="-34" x2="55" y2="-32" stroke="rgba(120,160,200,0.22)" strokeWidth="0.4" />

      {/* ── Abdomen (main striped body) ── */}
      <ellipse cx="-28" cy="4" rx="52" ry="24" fill="url(#abdGrad)" />
      {/* Black stripes — clipped to abdomen ellipse */}
      <rect x="-72" y="-22" width="13" height="52" fill="#1C1008" opacity="0.88" clipPath="url(#abdClip)" />
      <rect x="-51" y="-22" width="13" height="52" fill="#1C1008" opacity="0.85" clipPath="url(#abdClip)" />
      <rect x="-30" y="-22" width="13" height="52" fill="#1C1008" opacity="0.82" clipPath="url(#abdClip)" />
      <rect x="-10" y="-22" width="11" height="52" fill="#1C1008" opacity="0.72" clipPath="url(#abdClip)" />
      {/* Abdomen sheen */}
      <ellipse cx="-38" cy="-8" rx="28" ry="9" fill="rgba(255,255,200,0.18)" />
      {/* Stinger tip */}
      <path d="M -78,4 Q -88,2 -84,8 Q -79,12 -78,4 Z" fill="#2C1400" opacity="0.9" />

      {/* ── Thorax (middle section, textured/fuzzy) ── */}
      <ellipse cx="16" cy="1" rx="17" ry="15" fill="url(#thoraxGrad)" />
      {/* Fuzz texture on thorax */}
      <ellipse cx="12" cy="-7" rx="11" ry="5" fill="rgba(200,130,20,0.28)" />
      <ellipse cx="20" cy="-6" rx="7" ry="4" fill="rgba(220,160,30,0.22)" />

      {/* ── Legs (3 visible pairs) ── */}
      {/* Front legs */}
      <path d="M 24,12 Q 32,24 30,36" stroke="#4A2C00" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 18,14 Q 14,26 10,36" stroke="#4A2C00" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Mid legs */}
      <path d="M 8,12 Q 2,25 -4,34" stroke="#4A2C00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 2,13 Q -6,26 -12,34" stroke="#4A2C00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Rear legs */}
      <path d="M -14,20 Q -22,30 -28,36" stroke="#4A2C00" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M -22,22 Q -32,30 -38,35" stroke="#4A2C00" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75" />

      {/* ── Head ── */}
      <circle cx="38" cy="-1" r="14" fill="#3D1C00" />
      {/* Mandibles */}
      <path d="M 46,5 Q 54,8 52,12 Q 48,14 44,10 Z" fill="#2C1000" />
      {/* Compound eye */}
      <ellipse cx="46" cy="-5" rx="6" ry="7" fill="#0F0800" />
      {/* Eye facets (honeycomb pattern on eye) */}
      <ellipse cx="46" cy="-5" rx="4.5" ry="5.5" fill="#1A1000" />
      <ellipse cx="46" cy="-5" rx="3" ry="4" fill="#221500" />
      {/* Eye highlight */}
      <circle cx="48" cy="-7" r="2" fill="rgba(255,255,255,0.55)" />
      {/* Head fuzz */}
      <ellipse cx="34" cy="-12" rx="8" ry="4" fill="rgba(180,100,10,0.32)" />
      <ellipse cx="40" cy="-13" rx="5" ry="3" fill="rgba(200,130,20,0.25)" />

      {/* ── Antennae ── */}
      {/* Left antenna */}
      <path d="M 42,-13 Q 52,-40 60,-38" stroke="#2C1000" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="-38" r="2.8" fill="#1C0A00" />
      {/* Right antenna */}
      <path d="M 40,-15 Q 46,-42 52,-45" stroke="#2C1000" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="-45" r="2.8" fill="#1C0A00" />
    </g>
  )
}

// ─── Main HoneycombVisual Export ─────────────────────────────────────────────
export default function HoneycombVisual({ className = '' }) {
  const cells = useMemo(buildCells, [])

  // Bee position: center-bottom of the grid, sitting on the lower cells
  const beeX = SVG_W / 2 - 10
  const beeY = PAD + R + (ROWS - 1) * ROW_STEP + R + 35

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* 3 honey fill variants for cell interiors */}
          <radialGradient id="fill0" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFE570" />
            <stop offset="50%" stopColor="#FFAD0D" />
            <stop offset="100%" stopColor="#E07800" />
          </radialGradient>
          <radialGradient id="fill1" cx="40%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#FFD040" />
            <stop offset="55%" stopColor="#E89000" />
            <stop offset="100%" stopColor="#A85500" />
          </radialGradient>
          <radialGradient id="fill2" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#FFDB50" />
            <stop offset="60%" stopColor="#FFB020" />
            <stop offset="100%" stopColor="#CC7200" />
          </radialGradient>

          {/* Cell wall gradient (darker edges) */}
          <linearGradient id="wallGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#C06800" />
            <stop offset="100%" stopColor="#7A3C00" />
          </linearGradient>

          {/* Cell top highlight */}
          <linearGradient id="hlGrad" x1="20%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,220,0.52)" />
            <stop offset="100%" stopColor="rgba(255,230,120,0)" />
          </linearGradient>

          {/* Honey drop gradient */}
          <radialGradient id="dropGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFD040" />
            <stop offset="100%" stopColor="#B86000" />
          </radialGradient>

          {/* Overall glow filter */}
          <filter id="honeyGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0.6 0 0 0.1  0.8 0.4 0 0 0.05  0 0 0 0 0  0 0 0 0.6 0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop shadow for depth */}
          <filter id="cellShadow" x="-5%" y="-5%" width="115%" height="120%">
            <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#7A3C00" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ── Cell walls (outer hex, dark amber) ── */}
        {cells.map(({ cx, cy, id }) => (
          <polygon
            key={`w-${id}`}
            points={hexPts(cx, cy, R - 0.5)}
            fill="url(#wallGrad)"
            filter="url(#cellShadow)"
          />
        ))}

        {/* ── Cell honey interiors (inner hex, warm amber gradient) ── */}
        {cells.map(({ cx, cy, id, variant }) => (
          <polygon
            key={`h-${id}`}
            points={hexPts(cx, cy, R - 6)}
            fill={`url(#fill${variant})`}
          />
        ))}

        {/* ── Cell top-left highlights (3D depth illusion) ── */}
        {cells.map(({ cx, cy, id }) => (
          <polygon
            key={`hl-${id}`}
            points={hexPts(cx - 5, cy - 6, R - 19)}
            fill="url(#hlGrad)"
            opacity="0.85"
          />
        ))}

        {/* ── Honey drip drops at base of some cells ── */}
        {[
          { cx: cells[COLS * 4]?.cx ?? 80,  cy: SVG_H - 88, rx: 7, ry: 14 },
          { cx: cells[COLS * 4 + 2]?.cx ?? 180, cy: SVG_H - 95, rx: 6, ry: 11 },
          { cx: cells[COLS * 4 + 4]?.cx ?? 300, cy: SVG_H - 82, rx: 8, ry: 16 },
          { cx: cells[COLS * 4 + 3]?.cx ?? 240, cy: SVG_H - 98, rx: 5, ry: 9 },
        ].map((drop, i) => (
          <g key={`drop-${i}`}>
            {/* Drip stem */}
            <rect
              x={drop.cx - drop.rx * 0.55}
              y={drop.cy - drop.ry * 0.4}
              width={drop.rx * 1.1}
              height={drop.ry * 0.7}
              rx={drop.rx * 0.55}
              fill="url(#dropGrad)"
              opacity="0.85"
            />
            {/* Drop teardrop shape */}
            <ellipse
              cx={drop.cx}
              cy={drop.cy + drop.ry * 0.4}
              rx={drop.rx}
              ry={drop.ry * 0.75}
              fill="url(#dropGrad)"
              opacity="0.9"
            />
            {/* Drop shine */}
            <ellipse
              cx={drop.cx - drop.rx * 0.3}
              cy={drop.cy + drop.ry * 0.1}
              rx={drop.rx * 0.28}
              ry={drop.ry * 0.22}
              fill="rgba(255,255,220,0.55)"
            />
          </g>
        ))}

        {/* ── Bee (sits on the lower honeycomb cells) ── */}
        <motion.g
          transform={`translate(${beeX}, ${beeY})`}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${beeX}px ${beeY}px` }}
          filter="url(#honeyGlow)"
        >
          <BeeSVG />
        </motion.g>

        {/* ── Ambient honey pool beneath bee ── */}
        <ellipse
          cx={beeX - 12}
          cy={beeY + 38}
          rx={42}
          ry={8}
          fill="rgba(200,100,0,0.18)"
        />
      </svg>
    </motion.div>
  )
}
