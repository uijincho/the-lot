import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/corps': 'http://localhost:8001',
      '/chat': 'http://localhost:8001',
      '/documents': 'http://localhost:8001',
      '/health': 'http://localhost:8001',
    },
  },
})
