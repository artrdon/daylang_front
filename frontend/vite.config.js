import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}
    },
  resolve: {
    alias: {
      // Полифил для events
      events: 'events',
    },
  },
  optimizeDeps: {
    include: ['events'],
  },
});