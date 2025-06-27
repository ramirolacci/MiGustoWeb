import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '54e6-2803-9810-b097-f910-8d3d-cb35-65d8-6446.ngrok-free.app',
      '.ngrok-free.app'
    ]
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
