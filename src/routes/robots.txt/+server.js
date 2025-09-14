export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://delco-ink.fr/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
}
