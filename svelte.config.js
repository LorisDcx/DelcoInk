import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    // Prérend tout en HTML statique (pages + endpoints robots/sitemap)
    prerender: {
      entries: ['*']
    }
  }
};

export default config;

