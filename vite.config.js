import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/discord': {
        target: 'https://discordlookup.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/discord/, '/api/v1'),
      },
    },
  },
})