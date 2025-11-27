import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
