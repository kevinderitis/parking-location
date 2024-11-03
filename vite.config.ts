import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['car.svg', 'car-192.png', 'car-512.png'],
      manifest: {
        name: 'Mi Auto Estacionado',
        short_name: 'Mi Auto',
        description: 'Guarda y encuentra dónde estacionaste tu auto',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'car-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'car-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  define: {
    'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_MAPS_API_KEY)
  }
});