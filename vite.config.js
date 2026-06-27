import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/sn970527-cpu_bamti_files/**',
        '**/*.hwp',
        '**/*.hwpx',
        '**/*.pdf',
        '**/*.png',
        '**/*.docx'
      ]
    }
  }
})
