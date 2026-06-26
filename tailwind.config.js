export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        honey: '#F4B400',
        honeyDark: '#D89C0D',
        honeyLight: '#F8E7A1',
        honeyDeep: '#8B4500',
        earth: '#2D1F10',
        earthLight: '#4A2E1A',
        cream: '#FAF7F2',
        creamWarm: '#FFF8E7',
        forest: '#1B371F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        luxury: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px rgba(244,180,0,0.22)',
        glowLg: '0 30px 90px rgba(244,180,0,0.32)',
        honeyInner: 'inset 0 0 30px rgba(244,180,0,0.15)',
        glass: '0 8px 32px rgba(45,31,16,0.1)',
        deep3d: '0 40px 100px rgba(45,31,16,0.16), 0 8px 20px rgba(45,31,16,0.10)',
        card: '0 4px 24px rgba(45,31,16,0.08), 0 1px 4px rgba(45,31,16,0.04)',
      },
      animation: {
        'honey-drip': 'honeyDrip 3s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-med': 'floatSlow 5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'wing-flutter': 'wingFlutter 0.14s ease-in-out infinite alternate',
        'bee-bob': 'beeBob 3s ease-in-out infinite',
      },
      keyframes: {
        honeyDrip: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%': { transform: 'scaleY(1.3)', opacity: '0.8' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-14px) rotate(1.5deg)' },
          '66%': { transform: 'translateY(-7px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(244,180,0,0.2)' },
          '50%': { boxShadow: '0 0 60px rgba(244,180,0,0.45)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wingFlutter: {
          from: { transform: 'scaleX(1) rotate(-5deg)', opacity: '0.85' },
          to: { transform: 'scaleX(0.45) rotate(5deg)', opacity: '0.6' },
        },
        beeBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'honey-gradient': 'linear-gradient(135deg, #F8E7A1, #F4B400, #D89C0D)',
        'honey-radial': 'radial-gradient(ellipse at 40% 40%, #F8E7A1, #F4B400 40%, #D89C0D 80%)',
        'earth-gradient': 'linear-gradient(180deg, #2D1F10, #1A0F08)',
        'honeycomb': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34zm0-98L0-32v-34L28-82l28 16v34z' fill='none' stroke='%23D89C0D' stroke-width='1.5'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
