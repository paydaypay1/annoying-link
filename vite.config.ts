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
        },
        // Chunk certain libraries separately for better caching 
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     if (id.includes('react') || id.includes('react-dom')) {
        //       return 'vendor';
        //     } else if ( id.includes('three') || id.includes('animate.css') ) {
        //       return 'ui';
        //     } else if ( id.includes('types') ) {
        //       return 'types';
        //     } else {
        //       return 'misc';
        //     }
        //   }
        // }
      }
    }
  },
  base: '/',
})
