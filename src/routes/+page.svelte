<script>
  import HeroSection from '$lib/components/HeroSection.svelte';
  import AboutSection from '$lib/components/AboutSection.svelte';
  import ServicesSection from '$lib/components/ServicesSection.svelte';
  import GallerySection from '$lib/components/GallerySection.svelte';
  import ProcessSection from '$lib/components/ProcessSection.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
</script>

<svelte:head>
  <title>Delco Ink | Studio de tatouage à Chambéry | Blackwork & Pop-Culture</title>
  <meta name="description" content="Studio privé de tatouage à Chambéry, spécialisé en blackwork illustratif et tatouages inspirés de la pop-culture. Designs uniques et expérience personnalisée." />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://delco-ink.com/" />
  <meta property="og:title" content="Delco Ink | Studio de tatouage à Chambéry" />
  <meta property="og:description" content="Studio privé de tatouage spécialisé en blackwork illustratif et tattoos pop-culture" />
  <meta property="og:image" content="/images/og-image.jpg" />
  
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Delco Ink",
      "image": "https://delco-ink.com/images/logo.png",
      "@id": "https://delco-ink.com",
      "url": "https://delco-ink.com",
      "telephone": "+33000000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chambéry",
        "addressRegion": "Savoie",
        "postalCode": "73000",
        "addressCountry": "FR"
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
      ]
    }
  </script>
</svelte:head>

<!-- Sections -->
<HeroSection />
<AboutSection />
<ServicesSection />
<GallerySection />
<ProcessSection />
<ContactSection />
