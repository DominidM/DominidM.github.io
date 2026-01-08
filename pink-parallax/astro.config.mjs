import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dominidm.github.io',
  // NO agregues 'base' aquí
  
  trailingSlash: 'never',
  output: 'static', // ← Cambiar a static
  
  devToolbar: {
    enabled: false
  },
  
  vite: {
    plugins:  [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      serialize: (item) => {
        const url = item.url.endsWith('/') ? item.url.slice(0, -1) : item.url;
        return { ...item, url };
      },
    }),
  ],
});