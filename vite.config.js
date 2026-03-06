import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Đảm bảo thư mục đầu ra là dist để khớp với netlify.toml
    outDir: 'dist',
  }
})
