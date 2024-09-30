import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'mantine': [
            '@mantine/core',
            '@mantine/carousel',
            '@mantine/dates',
            '@mantine/form',
            '@mantine/hooks',
            '@mantine/modals',
            '@mantine/notifications',
          ],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux'],
          'icons': ['@tabler/icons-react', 'react-icons'],
          'utils': ['axios', 'dayjs'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_mantine";`,
        api: 'modern-compiler',
      },
    },
  },
});
