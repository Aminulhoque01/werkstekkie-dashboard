import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-quill'],
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8080,
  }
})
