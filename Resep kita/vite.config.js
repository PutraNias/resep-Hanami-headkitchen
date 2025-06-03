import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    https: true,
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
});