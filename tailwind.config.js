/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        steel: '#526477',
      },
      fontSize: {
        h1: ['clamp(2.25rem, 1.8rem + 2vw, 3.25rem)', { lineHeight: '1.08', fontWeight: '800' }],
        body: ['1.05rem', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [],
}
