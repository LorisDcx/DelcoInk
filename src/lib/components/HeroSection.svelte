<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ParticlesBackground from './ParticlesBackground.svelte';
  import SectionDivider from './SectionDivider.svelte';
  
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
  <!-- Particules/orbes interactives en arrière-plan avec hitbox améliorée -->
  <ParticlesBackground 
    opacity={0.6} 
    particleCount={48} 
    zIndex={2} 
    clickable={true} 
  />
  
  <!-- Background image pour le Hero -->
  <div class="absolute inset-0 z-0 overflow-hidden" bind:this={hero}>
    <!-- Image de fond pour le Hero avec position optimale -->
    <div class="absolute inset-0 w-full h-full bg-cover bg-center" style="background-image: url('/images/hero-bg-light.jpg'); background-position: center 30%; filter: brightness(0.98) contrast(1.02);"></div>
    <!-- Overlays pour améliorer la lisibilité et créer une atmosphère -->
    <div class="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-black/15"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
    <!-- Transition vers l'About -->
    <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent"></div>
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
        class="group flex items-center justify-center mt-12"
        aria-label="Défiler vers la section À propos"
      >
        <div class="relative flex items-center justify-center">
          <!-- Uniquement les ailes de la flèche (chevron) avec animation de fondu -->
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-8 w-8 text-forest fade-down-arrow" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <!-- Juste le chevron descendant, sans la ligne verticale -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </a>
      
      <style>
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(3px); }
        }
        
        .fade-down-arrow {
          animation: fadeInOut 2s infinite ease-in-out;
        }
      </style>
    </div>
  </div>
  
  <!-- Diviseur entre Hero et About -->
  <div class="absolute bottom-0 w-full z-30">
    <SectionDivider 
      backgroundColor="transparent" 
      nextSectionColor="#f8f3e8" 
      heightPx={10} 
      opacity={0.9} 
      showGradient={true} 
    />
  </div>
</section>
