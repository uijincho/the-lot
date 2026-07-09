import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#F5A623',
          red: '#C0392B',
          dark: '#0D0D0D',
          surface: '#1A1A1A',
          border: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
