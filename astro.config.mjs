import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  adapter: netlify(),
  site: 'https://www.delco-ink.fr',
  trailingSlash: 'never',
  build: {
    format: 'file'
  }
});
