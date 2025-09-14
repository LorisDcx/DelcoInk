<script>
  import HeroSection from "$lib/components/HeroSection.svelte";
  import AboutSection from "$lib/components/AboutSection.svelte";
  import ServicesSection from "$lib/components/ServicesSection.svelte";
  import GalleryCarousel from "$lib/components/GalleryCarousel.svelte";
  import ProcessSection from "$lib/components/ProcessSection.svelte";
  import ContactSection from "$lib/components/ContactSection.svelte";
  import SectionDivider from "$lib/components/SectionDivider.svelte";
  
  // Définition des couleurs de fond des sections pour les séparateurs
  const heroBackground = "transparent"; // Transition transparente pour l'image partagée
  const aboutBackground = "rgba(0, 0, 0, 0.3)"; // Léger assombrissement pour la transition
  const servicesBackground = "#F9FAFB"; // bg-gray-50 en hex
  const galleryBackground = "#FFFFFF"; // bg-white
  const processBackground = "#F9FAFB"; // bg-gray-50 en hex
  const contactBackground = "#FFFFFF"; // bg-white

 </script>
 
 <svelte:head>
  <title>Delco Ink - Tattoo Artist à Chambery</title>
  <meta name="description" content="Artiste tatoueur spécialisé en blackwork et pop-culture à Chambéry. Créations uniques sur rendez-vous. Découvrez mon portfolio et réservez votre séance." />

  <!-- Canonical -->
  <link rel="canonical" href="https://www.delco-ink.fr/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Delco Ink - Tattoo Artist à Chambery" />
  <meta property="og:description" content="Tatoueur spécialisé en blackwork et pop-culture à Chambéry. Créations uniques et sur-mesure sur rendez-vous." />
  <meta property="og:url" content="https://www.delco-ink.fr/" />
  <meta property="og:image" content="https://www.delco-ink.fr/images/og-image.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Delco Ink - Tattoo Artist à Chambery" />
  <meta name="twitter:description" content="Tatoueur spécialisé en blackwork et pop-culture à Chambéry. Créations uniques et sur-mesure sur rendez-vous." />
  <meta name="twitter:image" content="https://www.delco-ink.fr/images/og-image.jpg" />

  <!-- Social -->
  <meta property="og:site_name" content="Delco Ink" />
  <meta property="og:locale" content="fr_FR" />
  <meta name="twitter:site" content="@delcoink" /> <!-- mets ton @ si tu as X/Twitter, sinon supprime -->

  <!-- Perf -->
  <link rel="preload" as="image" href="/images/hero-bg-light.jpg" />

  <!-- Favicon (si pas déjà) -->
  <link rel="icon" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />
</svelte:head>

<!-- JSON-LD principal : TattooParlor -->
{@html `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": "https://www.delco-ink.fr/#tattoo-parlor",
  "name": "Delco Ink",
  "url": "https://www.delco-ink.fr/",
  "image": "https://www.delco-ink.fr/images/og-image.jpg",
  "telephone": "+33612345678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "19 Avenue Général Cartier",
    "addressLocality": "Cognin",
    "postalCode": "73160",
    "addressCountry": "FR"
  },
  "hasMap": "https://maps.google.com/?q=19+Av.+G%C3%A9n%C3%A9ral+Cartier,+73160+Cognin,+France",
  "areaServed": ["Chambéry", "Grand Chambéry", "Savoie"],
  "geo": { "@type":"GeoCoordinates", "latitude": 45.574277, "longitude": 5.902913 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday"], "opens": "09:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"], "opens": "13:00", "closes": "19:00" }
  ],
  "priceRange": "€€",
  "sameAs": [
    "https://www.instagram.com/delcoink"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"Puis-je apporter mon propre design ?",
     "acceptedAnswer":{"@type":"Answer","text":"Oui. On part de vos références et on adapte en blackwork illustratif pour un résultat lisible et durable."}},
    {"@type":"Question","name":"Est-ce que les tatouages font mal ?",
     "acceptedAnswer":{"@type":"Answer","text":"La sensation varie selon la zone et la durée. Je vous guide sur la préparation et je fais des pauses si besoin."}},
    {"@type":"Question","name":"Comment préparer ma peau avant une séance ?",
     "acceptedAnswer":{"@type":"Answer","text":"Hydratez bien la peau les jours précédents, évitez alcool/aspirine la veille, dormez bien et mangez avant la séance."}},
    {"@type":"Question","name":"Comment entretenir mon tatouage après la séance ?",
     "acceptedAnswer":{"@type":"Answer","text":"Nettoyage doux, crème adaptée, éviter bains/soleil/gréssage 2–3 semaines. Un guide détaillé vous est remis le jour J."}}
  ]
}
</script>


`}


<!-- Sections -->
<HeroSection />

<SectionDivider backgroundColor={heroBackground} nextSectionColor={aboutBackground} />

<AboutSection />

<SectionDivider backgroundColor={aboutBackground} nextSectionColor={servicesBackground} />

<ServicesSection />

<SectionDivider backgroundColor={servicesBackground} nextSectionColor={galleryBackground} />

<GalleryCarousel />

<SectionDivider backgroundColor={galleryBackground} nextSectionColor={processBackground} />

<ProcessSection />

<SectionDivider backgroundColor={processBackground} nextSectionColor={contactBackground} />

<ContactSection />
