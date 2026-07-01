import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy, infrequently-changing dependencies into their
        // own chunks. This keeps the main app bundle small and lets
        // browsers cache the vendor chunks separately across deploys
        // (a code change in App.jsx won't invalidate the Leaflet/Turf
        // chunk a returning visitor already has cached).
        manualChunks: {
          leaflet: ['leaflet', 'react-leaflet'],
          geo: ['@turf/turf', 'h3-js'],
        },
      },
    },
  },
})
