export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        honey:        '#F4B400',
        honeyDark:    '#C8860A',
        honeyDeep:    '#8B4500',
        honeyLight:   '#F8E7A1',
        amber:        '#D4860A',
        earth:        '#2D1F10',
        earthDark:    '#1A0D06',
        earthDeep:    '#0F0702',
        earthBlack:   '#0A0502',
        forest:       '#152B12',
        forestDark:   '#0D1A0A',
        forestDeep:   '#071209',
        cream:        '#FDF3E1',
        parchment:    '#EDD9A3',
        bark:         '#4A2810',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        luxury:  ['"Cormorant Garamond"', 'serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'amber-glow':  '0 0 40px rgba(244,180,0,0.25)',
        'amber-glowLg':'0 0 80px rgba(244,180,0,0.4)',
        'amber-inner': 'inset 0 0 30px rgba(244,180,0,0.12)',
        'dark-card':   '0 8px 40px rgba(0,0,0,0.6)',
        'dark-lg':     '0 24px 80px rgba(0,0,0,0.75)',
        'honey-ring':  '0 0 0 1px rgba(244,180,0,0.2), 0 8px 32px rgba(244,180,0,0.15)',
      },
      animation: {
        'honey-drip':   'honeyDrip 3s ease-in-out infinite',
        'float-slow':   'floatSlow 8s ease-in-out infinite',
        'float-med':    'floatSlow 5s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        shimmer:        'shimmer 2.5s linear infinite',
        marquee:        'marquee 30s linear infinite',
        'wing-flutter': 'wingFlutter 0.14s ease-in-out infinite alternate',
        'amber-pulse':  'amberPulse 4s ease-in-out infinite',
      },
      keyframes: {
        honeyDrip: {
          '0%,100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%':     { transform: 'scaleY(1.3)', opacity: '0.8' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-14px) rotate(1.5deg)' },
          '66%':     { transform: 'translateY(-7px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 30px rgba(244,180,0,0.2)' },
          '50%':     { boxShadow: '0 0 70px rgba(244,180,0,0.5)' },
        },
        amberPulse: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wingFlutter: {
          from: { transform: 'scaleX(1) rotate(-5deg)', opacity: '0.85' },
          to:   { transform: 'scaleX(0.45) rotate(5deg)', opacity: '0.6' },
        },
      },
      backgroundImage: {
        'honey-gradient':  'linear-gradient(135deg, #F8E7A1, #F4B400, #C8860A)',
        'honey-radial':    'radial-gradient(ellipse at 40% 40%, #F8E7A1, #F4B400 40%, #C8860A 80%)',
        'earth-gradient':  'linear-gradient(180deg, #1A0D06, #0F0702)',
        'forest-gradient': 'linear-gradient(180deg, #0D1A0A, #0F0702)',
        'honeycomb':       `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34zm0-98L0-32v-34L28-82l28 16v34z' fill='none' stroke='%23C8860A' stroke-width='1'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
