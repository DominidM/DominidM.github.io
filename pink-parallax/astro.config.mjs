import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dominidm.github.io',
  
  devToolbar: {
    enabled: false
  },
  
  vite: {
    plugins: [tailwindcss()]
  }
});