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
        // Chunk vendor libraries separately for better caching 
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  base: '/',
})
