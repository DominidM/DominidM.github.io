import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dominidm.github.io',
  // NO agregues 'base' aquí
  
  trailingSlash: 'never',
  output: 'static',
  
  devToolbar: {
    enabled: false
  },
  
  vite: {
    plugins:  [tailwindcss()]
  },

  integrations: [
    sitemap({
      serialize: (item) => {
        const url = item.url.endsWith('/') ? item.url.slice(0, -1) : item.url;
        return { ...item, url };
      },
    }),
  ],
});