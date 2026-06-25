const baseUrl = 'https://www.delco-ink.fr';

const pages = [
  {
    path: '/',
    images: [
      {
        loc: '/images/delco-ink-studio-tatouage-chambery-hero.webp',
        title: 'Studio Enso - Tatouage Chambery',
        caption: 'Studio de tatouage blackwork a Cognin pres de Chambery'
      },
      {
        loc: '/images/delco-ink-tatoueuse-chambery-blackwork.webp',
        title: 'Delco Ink - Tatoueuse blackwork Chambery',
        caption: 'Delco Ink, specialiste blackwork illustratif'
      },
      {
        loc: '/images/tanjo-ink-tatoueur-chambery-fineline.webp',
        title: 'Tanjo Ink - Fineline Chambery',
        caption: 'Tanjo Ink, fineline et minimaliste au Studio Enso'
      },
      {
        loc: '/images/diantre-tattoo-tatoueur-chambery-graphique.webp',
        title: 'Diantre Tattoo - Blackwork couleur Chambery',
        caption: 'Diantre Tattoo, blackwork et couleurs vibrantes'
      }
    ]
  },
  { path: '/le-studio' },
  { path: '/tatoueur-chambery' },
  { path: '/blackwork-chambery' },
  { path: '/salon-tatouage-chambery' },
  { path: '/tatouage-manga-chambery' },
  { path: '/tatouage-pop-culture-chambery' },
  { path: '/specialites' },
  { path: '/flash' },
  { path: '/faq-tatouage' },
  { path: '/blog' },
  { path: '/blog/premier-tatouage-conseils' },
  { path: '/blog/comment-choisir-son-tatoueur' },
  { path: '/blog/blackwork-style-tatouage' },
  { path: '/blog/preparer-seance-tatouage' },
  { path: '/blog/entretien-tatouage-cicatrisation' },
  { path: '/blog/tatouage-pop-culture-tendances' },
  { path: '/conditions-generales' },
  { path: '/privacy-policy' }
];

function absoluteUrl(path: string) {
  return path === '/' ? `${baseUrl}/` : `${baseUrl}${path}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderImage(image: NonNullable<(typeof pages)[number]['images']>[number]) {
  return `    <image:image>
      <image:loc>${escapeXml(absoluteUrl(image.loc))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`;
}

export async function GET() {
  const urls = pages.map((page) => {
    const images = page.images?.map(renderImage).join('\n') ?? '';
    return `  <url>
    <loc>${escapeXml(absoluteUrl(page.path))}</loc>${images ? `\n${images}` : ''}
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
