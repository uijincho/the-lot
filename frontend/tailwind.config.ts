import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg:           'var(--bg)',
        'bg-elevated':'var(--bg-elevated)',
        surface:      'var(--surface)',
        'surface-2':  'var(--surface-2)',
        text:         'var(--text)',
        'text-dim':   'var(--text-dim)',
        border:       'var(--border)',
        structure: {
          DEFAULT: 'var(--structure)',
          line:    'var(--structure-line)',
          soft:    'var(--structure-soft)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          text:    'var(--accent-text)',
          soft:    'var(--accent-soft)',
          muted:   'var(--accent-muted)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
