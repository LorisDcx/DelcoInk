// Sitemap dynamique pour Studio Ensō - Delco Ink
// Génère automatiquement le sitemap XML

export async function GET() {
  const baseUrl = 'https://www.delco-ink.fr';
  const currentDate = new Date().toISOString().split('T')[0];

  const pages = [
    // Pages principales (priorité haute)
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/le-studio', changefreq: 'weekly', priority: '0.9' },
    { url: '/tatoueur-chambery', changefreq: 'monthly', priority: '0.9' },
    { url: '/blackwork-chambery', changefreq: 'monthly', priority: '0.9' },
    { url: '/salon-tatouage-chambery', changefreq: 'monthly', priority: '0.85' },
    { url: '/tatouage-manga-chambery', changefreq: 'monthly', priority: '0.85' },
    { url: '/tatouage-pop-culture-chambery', changefreq: 'monthly', priority: '0.85' },
    { url: '/specialites', changefreq: 'monthly', priority: '0.80' },
    { url: '/flash', changefreq: 'weekly', priority: '0.8' },
    
    // Blog (priorité moyenne-haute)
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    { url: '/blog/premier-tatouage-conseils', changefreq: 'monthly', priority: '0.7' },
    { url: '/blog/comment-choisir-son-tatoueur', changefreq: 'monthly', priority: '0.7' },
    { url: '/blog/blackwork-style-tatouage', changefreq: 'monthly', priority: '0.7' },
    { url: '/blog/preparer-seance-tatouage', changefreq: 'monthly', priority: '0.6' },
    { url: '/blog/entretien-tatouage-cicatrisation', changefreq: 'monthly', priority: '0.6' },
    { url: '/blog/tatouage-pop-culture-tendances', changefreq: 'monthly', priority: '0.6' },
    
    // Pages légales (priorité basse)
    { url: '/conditions-generales', changefreq: 'yearly', priority: '0.4' },
    { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
  
  <!-- Images principales pour Google Images -->
  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${baseUrl}/images/delco-ink-studio-tatouage-chambery-hero.webp</image:loc>
      <image:title>Studio Ensō - Tatouage Chambéry</image:title>
      <image:caption>Studio de tatouage blackwork à Cognin/Chambéry</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/delco-ink-tatoueuse-chambery-blackwork.webp</image:loc>
      <image:title>Delco Ink - Tatoueuse blackwork Chambéry</image:title>
      <image:caption>Delco Ink, spécialiste blackwork illustratif</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/tanjo-ink-tatoueur-chambery-fineline.webp</image:loc>
      <image:title>Tanjo Ink - Fineline Chambéry</image:title>
      <image:caption>Tanjo Ink, experte fineline et minimaliste</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/diantre-tattoo-tatoueur-chambery-graphique.webp</image:loc>
      <image:title>Diantre Tattoo - Blackwork couleur Chambéry</image:title>
      <image:caption>Diantre Tattoo, blackwork et couleurs vibrantes</image:caption>
    </image:image>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
