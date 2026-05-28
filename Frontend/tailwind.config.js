/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F5F5',      // Clean off-white
          100: '#E4E4E7',     // Light silver
          200: '#A3A3A3',     // Muted silver
          300: '#52525B',     // Cool slate/zinc
          400: '#3F3F46',     // Dark slate
          500: '#27272A',     // Deep zinc
          600: '#FFFFFF',     // Pristine active white
          700: '#D4D4D8',     // Light grey border accent
          800: '#161616',     // Charcoal containers
          900: '#0D0D0D',     // Obsidian glass container
          950: '#050505',     // Absolute black base
        },
        obsidian: {
          base: '#050505',
          glass: '#0D0D0D',
          charcoal: '#161616',
          border: '#222222',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}