/**
 * HoneyDripDivider — SVG honey drip edge placed at the bottom of a section.
 * Renders a gentle wave with teardrop drips hanging from it.
 * fillColor should match the NEXT section's background.
 */
export function HoneyDripDivider({ fillColor = '#FDFBF7', className = '' }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 z-30 leading-none ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: '100px', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main wave fill */}
        <path
          d="M0,45 Q120,80 240,52 Q360,24 480,58 Q600,92 720,58 Q840,24 960,58 Q1080,92 1200,52 Q1320,12 1440,45 L1440,100 L0,100 Z"
          fill={fillColor}
        />
        {/* Drip 1 */}
        <ellipse cx="195" cy="44" rx="9" ry="17" fill={fillColor} />
        {/* Drip 2 */}
        <ellipse cx="510" cy="58" rx="7" ry="14" fill={fillColor} />
        {/* Drip 3 */}
        <ellipse cx="760" cy="53" rx="11" ry="19" fill={fillColor} />
        {/* Drip 4 */}
        <ellipse cx="1050" cy="57" rx="8" ry="15" fill={fillColor} />
        {/* Drip 5 */}
        <ellipse cx="1340" cy="42" rx="7" ry="13" fill={fillColor} />
        {/* Tiny accent drips */}
        <ellipse cx="350" cy="30" rx="5" ry="9" fill={fillColor} />
        <ellipse cx="900" cy="30" rx="5" ry="9" fill={fillColor} />
      </svg>
    </div>
  )
}

/**
 * HoneyWaveDivider — smooth wave transition between two sections.
 * Place at the top of a section; topColor = color of section above.
 */
export function HoneyWaveDivider({ topColor = '#FDFBF7', height = 80, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L0,28 Q180,72 360,38 Q540,4 720,38 Q900,72 1080,38 Q1260,4 1440,32 L1440,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  )
}

export default HoneyDripDivider
