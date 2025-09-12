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
  <title>Delco Ink | Tatouage Blackwork & Pop-Culture à Cognin | Studio Privé</title>
  <meta name="description" content="Studio privé de tatouage à Cognin, spécialisé en blackwork illustratif et designs pop-culture sur rendez-vous. Tatouages personnalisés dans un espace exclusif." />
  <meta name="keywords" content="tatouage Cognin, blackwork illustratif, tattoo pop-culture, studio privé tatouage, salon sur rendez-vous, tatoueur Savoie" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://delco-ink.com/" />
  <meta property="og:title" content="Delco Ink | Studio Privé de Tatouage Blackwork à Cognin" />
  <meta property="og:description" content="Studio privé de tatouage à Cognin, spécialisé en blackwork illustratif et designs pop-culture. Sur rendez-vous uniquement." />
  <meta property="og:image" content="/images/og-image.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Delco Ink | Tatouage Blackwork à Cognin" />
  <meta name="twitter:description" content="Studio privé de tatouage spécialisé en blackwork et designs pop-culture. Sur rendez-vous uniquement." />
  <meta name="twitter:image" content="/images/og-image.jpg" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://delco-ink.com/" />
  
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Delco Ink",
      "description": "Studio privé de tatouage à Cognin spécialisé en blackwork illustratif et designs pop-culture. Sur rendez-vous uniquement.",
      "image": "https://delco-ink.com/images/logo.png",
      "@id": "https://delco-ink.com",
      "url": "https://delco-ink.com",
      "telephone": "+33000000000",
      "priceRange": "€€",
      "paymentAccepted": "Cash, Credit Card",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cognin",
        "addressRegion": "Savoie",
        "postalCode": "73160",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "45.564601",
        "longitude": "5.917781"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/delcoink",
        "https://www.facebook.com/delcoink"
      ],
      "keywords": "tatouage, blackwork, illustratif, pop-culture, chambéry, savoie, studio privé, sur rendez-vous",
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Tatouage Blackwork Illustratif",
          "description": "Créations personnalisées en style blackwork avec un accent sur l'illustration artistique"
        },
        {
          "@type": "Offer",
          "name": "Tatouage Pop-Culture",
          "description": "Designs inspirés de la pop-culture, films, séries, jeux vidéo et univers fantastiques"
        },
        {
          "@type": "Offer",
          "name": "Tatouage Personnalisé",
          "description": "Créations uniques conçues en collaboration avec le client pour une pièce originale"
        }
      ]
    }
  </script>
</svelte:head>

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
