import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_API_BASE_URL || 'http://localhost:3000';
  return defineConfig({
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
          additionalData: `@use "/src/styles/_mantine";`,
        },
      },
    },
    server: {
      proxy: {
        '/api': apiUrl,
      },
    },
  });
};
