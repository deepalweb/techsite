/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        steel: '#64748b',
        primary: '#0ea5e9',
        secondary: '#14b8a6',
        accent: '#f97316',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 2rem + 3.2vw, 4.75rem)', { lineHeight: '1.02', fontWeight: '800' }],
        h1: ['clamp(2.25rem, 1.8rem + 2vw, 3.25rem)', { lineHeight: '1.08', fontWeight: '800' }],
        h2: ['clamp(1.85rem, 1.55rem + 1.3vw, 2.5rem)', { lineHeight: '1.15', fontWeight: '800' }],
        h3: ['clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.25', fontWeight: '800' }],
        body: ['1.05rem', { lineHeight: '1.75' }],
        caption: ['0.8rem', { lineHeight: '1.5', letterSpacing: '.16em' }],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(14, 165, 233, .24)',
      },
      keyframes: {
        gridShift: {
          from: { backgroundPosition: '0 0, 0 0' },
          to: { backgroundPosition: '72px 72px, 72px 72px' },
        },
        scan: {
          '0%': { transform: 'translateY(0)', opacity: '.15' },
          '45%': { opacity: '1' },
          '100%': { transform: 'translateY(340px)', opacity: '.15' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { opacity: '.55', transform: 'scale(1)' },
          '50%': { opacity: '.9', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'grid-shift': 'gridShift 18s linear infinite',
        scan: 'scan 3.2s linear infinite',
        marquee: 'marquee 24s linear infinite',
        breathe: 'breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
