import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/plans': "http://localhost:8080",
      '/contactus': "http://localhost:8080"
    }
  }
})
