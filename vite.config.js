import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://portfolio-backend-u25c.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'https://portfolio-backend-u25c.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
