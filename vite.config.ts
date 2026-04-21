import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const chunkGroups = {
  mantine: [
    '@mantine/core',
    '@mantine/carousel',
    '@mantine/dates',
    '@mantine/form',
    '@mantine/hooks',
    '@mantine/modals',
    '@mantine/notifications',
  ],
  'react-vendor': ['react', 'react-dom', 'react-router'],
  'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux'],
  icons: ['@tabler/icons-react', 'react-icons'],
  utils: ['axios', 'dayjs'],
} as const;

const manualChunks = (id: string) => {
  for (const [chunkName, packages] of Object.entries(chunkGroups)) {
    if (packages.some((packageName) => id.includes(packageName))) {
      return chunkName;
    }
  }

  return undefined;
};

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
          manualChunks,
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
