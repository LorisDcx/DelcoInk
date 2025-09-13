import type { RequestHandler } from '@sveltejs/kit';
const SITE = 'https://www.delco-ink.fr';

export const prerender = true;

export const GET: RequestHandler = () =>
  new Response(`User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain' } });
