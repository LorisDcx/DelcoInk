<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ParticlesBackground from './ParticlesBackground.svelte';
  
  let hero: HTMLElement;
  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let ctaButton: HTMLElement;
  let logoElement: HTMLElement;
  let underlineElement: HTMLElement;
  
  // Référence pour le conteneur qui va recevoir l'effet de fondu
  let heroContent: HTMLElement;
  let fadeOutThreshold = 300; // Seuil de défilement pour déclencher le fondu

  onMount(() => {
    // Effet de parallaxe et de fondu sortant sur défilement
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (hero) {
        // Effet de parallaxe sur l'arrière-plan
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      
      // Effet de fondu sortant sur le contenu du hero
      if (heroContent) {
        // Calcul de l'opacité basée sur le défilement (1 au début, 0 à fadeOutThreshold)
        const opacity = Math.max(0, 1 - scrollY / fadeOutThreshold);
        heroContent.style.opacity = opacity.toString();
        
        // Effet de translation vers le haut
        if (scrollY <= fadeOutThreshold) {
          const translateY = scrollY * 0.2; // Légère translation
          heroContent.style.transform = `translateY(-${translateY}px)`;
        }
      }
    });

    // GSAP animations for hero elements
    gsap.from(titleElement, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(subtitleElement, {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out"
    });

    gsap.from(ctaButton, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: "power3.out"
    });
    
    // Ne pas animer au début - ça sera uniquement au survol
    if (underlineElement) {
      gsap.set(underlineElement, {
        width: 0,
        left: 0
      });
    }
    
    // Nettoyage
    return () => {};
  });
  
  // Fonctions pour l'animation du surlignage au survol
  function handleDescriptionHover() {
    if (underlineElement) {
      // Animation du slide de gauche à droite
      gsap.to(underlineElement, {
        width: "100%",
        backgroundColor: "#1b4332", // Vert foncé
        height: "2.5px",
        boxShadow: "0 0 8px 0 rgba(45, 106, 79, 0.75)", // Effet de surbrillance
        duration: 0.6,
        ease: "power2.out"
      });
      
      // Animation de la couleur du texte
      gsap.to(subtitleElement, {
        color: "#2d6a4f", // Teinte verte pour le texte
        duration: 0.4
      });
    }
  }
  
  function handleDescriptionLeave() {
    if (underlineElement) {
      // Retour à zéro
      gsap.to(underlineElement, {
        width: "0%",
        backgroundColor: "#2d6a4f", // Retour au vert clair (forest)
        height: "1px",
        boxShadow: "none",
        duration: 0.8,
        ease: "power2.inOut"
      });
      
      // Retour couleur texte normale
      gsap.to(subtitleElement, {
        color: "#374151", // Gris d'origine (gray-700)
        duration: 0.4
      });
    }
  }
</script>

<section id="home" class="relative h-screen overflow-hidden bg-white">
  <!-- Particules/orbes en arrière-plan (zIndex entre le fond et les éléments UI) -->
  <ParticlesBackground opacity={0.6} particleCount={40} zIndex={2} />
  
  <!-- Background image unique pour le Hero et l'About -->
  <div class="absolute inset-0 z-0 overflow-hidden" bind:this={hero}>
    <!-- Position fixe avec l'image couvrant les deux sections -->
    <div class="fixed inset-0 w-full h-[200vh] bg-cover bg-top bg-fixed bg-opacity-90" style="background-image: url('/images/bg-hero-about.jpg'); filter: opacity(0.85); background-position: center top;"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10"></div>
  </div>
  

  
  <!-- Hero Content avec effet de fondu -->
  <div class="absolute inset-0 z-30 flex items-center justify-center" bind:this={heroContent} style="transition: transform 0.1s ease-out;">
    <div class="container mx-auto px-4 text-center text-gray-900">
      <div bind:this={titleElement} class="mb-4 flex justify-center">
        <div class="relative group">
          <div class="overflow-visible transition-all duration-500">
            <img 
              bind:this={logoElement}
              src="/img/Logo.png" 
              alt="Delco Ink Logo" 
              class="h-32 md:h-40 relative z-10 transition-all duration-500 ease-out group-hover:brightness-110 filter drop-shadow-md" 
            />
          </div>
          <!-- Utilisation de mix-blend-mode pour que la luminosité respecte les contours du PNG -->
          <div class="absolute inset-0 bg-forest opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:opacity-20 z-0 transform scale-125 mix-blend-screen"></div>
          <div class="absolute -inset-1 bg-gradient-to-r from-transparent via-forest/10 to-transparent opacity-0 blur-xl transition-all duration-500 ease-out group-hover:opacity-70 z-0 mix-blend-screen"></div>
        </div>
      </div>
      
      <p 
        bind:this={subtitleElement}
        class="font-body text-xl md:text-2xl mb-8 text-gray-700"
        on:mouseenter={handleDescriptionHover}
        on:mouseleave={handleDescriptionLeave}
      >
        <span class="inline-block relative cursor-pointer">
          Illustrative Blackwork & Pop-Culture Tattoos
          <span 
            bind:this={underlineElement} 
            class="absolute bottom-0 left-0 h-1 bg-forest w-0 opacity-80 transition-all duration-500"
          ></span>
        </span>
      </p>
      
      <a 
        bind:this={ctaButton}
        href="#about" 
        class="group flex flex-col items-center justify-center mt-12"
        aria-label="Défiler vers la section À propos"
      >
        <span class="text-forest text-sm mb-2 opacity-60 group-hover:opacity-90 transition-opacity duration-500 font-light">Découvrir</span>
        <div class="relative w-12 h-12 flex items-center justify-center">
          <div class="absolute inset-0 bg-forest opacity-0 rounded-full group-hover:opacity-5 transition-all duration-500"></div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 text-forest animate-pulse opacity-70 group-hover:opacity-90" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </a>
    </div>
  </div>
</section>
