import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5880,
    open: true,
    proxy: {
      '/api': {
        target: 'https://datamall2.mytransport.sg', // The target API server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // Disable SSL verification (for local testing)
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix from requests
        // logLevel: 'debug',
      },
    },
  },
});
