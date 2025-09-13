import type { RequestHandler } from '@sveltejs/kit';
const SITE = 'https://www.delco-ink.fr';
const routes = ['/', '/flash', '/privacy-policy']; // ajoute d'autres pages si besoin

export const prerender = true;

export const GET: RequestHandler = () => {
  const urls = routes.map((p) =>
    `<url><loc>${SITE}${p}</loc><changefreq>weekly</changefreq><priority>${p==='/'?'1.0':'0.7'}</priority></url>`
  ).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
