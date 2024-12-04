import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  server: {
      proxy: {
          '/api': 'http://127.0.0.1:8000'
      }
  }
}

