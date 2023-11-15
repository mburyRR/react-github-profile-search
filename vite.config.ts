import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const faviconURL = '/favicon-16x16.png';
const faviconLargeURL = '/favicon.png';
const screenshotURL = '/dashboard.png';
const screenshotMobileURL = '/dashboardMobile.png';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
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
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#efefef',
        background_color: '#efefef',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'GithubProfileSearch',
        description: 'Github Profile Search',
        name: 'Github Profile Search',
        icons: [
          {
            src: faviconURL,
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: faviconLargeURL,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: screenshotURL,
            sizes: '1142x835',
            type: 'image/png',
            form_factor: 'wide',
            label: 'dashboard',
          },
          {
            src: screenshotMobileURL,
            sizes: '449x836',
            type: 'image/png',
            label: 'dashboard',
          },
        ],
      },
    }),
  ],
});
