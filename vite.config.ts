import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Generate a manifest for cache-busting
    manifest: true,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'common',
              test: /node_modules/,
              minSize: 100000, // 100KB
              maxSize: 250000, // 250KB
              priority: 10,
            },
          ],
        }
      }
    }
  },
  base: '/',
})
