import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const faviconURL = '/favicon.png';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@graphql': path.resolve(__dirname, './graphql'),
      '@common': path.resolve(__dirname, './common'),
    },
  },
  plugins: [
    react(),
    eslint({
      include: [`${path.resolve(__dirname, '')}/**/*.{js, ts, tsx}`],
    }),
    svgr(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: [faviconURL],
      manifest: {
        theme_color: '#efefef',
        background_color: '#efefef',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'work4all',
        description: 'work4all coding challenge',
        name: 'work4all',
        icons: [
          {
            src: faviconURL,
            sizes: '32x32',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: faviconURL,
            sizes: '32x32',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
