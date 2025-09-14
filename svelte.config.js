import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html',
      precompress: true
    }),
    // Configuration du pré-rendu
    prerender: {
      entries: ['*', '/robots.txt', '/sitemap.xml']
    },
    // Désactivation de la vérification des origin pour les fichiers statiques
    csp: {
      mode: 'auto',
      directives: {
        'default-src': ['self']
      }
    }
  }
};

export default config;

