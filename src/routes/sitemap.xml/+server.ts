import type { RequestHandler } from '@sveltejs/kit';

const SITE = 'https://www.delco-ink.fr';
const routes = ['/', '/flash', '/privacy-policy']; // n’ajoute que des pages indexables

export const prerender = true;

export const GET: RequestHandler = () => {
  const now = new Date().toISOString();

  const urls = routes.map((p) => `
    <url>
      <loc>${SITE}${p}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${p === '/' ? '1.0' : '0.7'}</priority>
    </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
};
