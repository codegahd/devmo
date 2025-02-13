import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    port:5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true
      },
    },
  },
  publicDir: './public',
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
  root: "src",
})
