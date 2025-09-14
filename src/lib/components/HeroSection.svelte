<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer ScrollTrigger seulement côté client
  if (browser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let hero: HTMLElement;
  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let ctaButton: HTMLElement;
  let logoElement: HTMLElement;
  let underlineElement: HTMLElement;
  let textBlock: HTMLElement;
  let heroContent: HTMLElement;
  const fadeOutThreshold = 300;

  onMount(() => {
    if (!browser) return;
    
    // Détecter si c'est un appareil mobile
    const isMobile = window.innerWidth < 768;
    
    // Désactiver les animations sur mobile pour de meilleures performances
    if (!isMobile) {
      // Animation du contenu au chargement
      const heroTimeline = gsap.timeline();
      if (titleElement) {
        heroTimeline.from(titleElement, { 
          y: 30, 
          x: -10, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power2.out' 
        });
      }
      
      if (subtitleElement) {
        heroTimeline.from(subtitleElement, { 
          y: 20, 
          x: 5, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.6');
      }
      
      if (ctaButton) {
        heroTimeline.from(ctaButton, { 
          y: 15, 
          scale: 0.95, 
          opacity: 0, 
          duration: 0.7, 
          ease: 'elastic.out(1, 0.5)' 
        }, '-=0.4');
      }
      
      // Animation au scroll avec GSAP ScrollTrigger (plus performant que l'écouteur de scroll manuel)
      if (hero) {
        gsap.to(hero, {
          y: '30vh',
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
      
      if (heroContent) {
  gsap.to(heroContent, {
    // opacity: 0,   ← retire cette ligne
    y: 50,
    scrollTrigger: {
      trigger: hero,
      start: 'top top+=120',
      end: 'bottom top+=120',
      scrub: 0.5
    }
  });
}



// Moved the animation logic into onMount to ensure elements are properly bound
onMount(() => {
  if (!browser) return;
  
  // Détecter si c'est un appareil mobile
  const isMobile = window.innerWidth < 768;
  
  // Désactiver les animations sur mobile pour de meilleures performances
  if (!isMobile && textBlock && hero) {
    gsap.to(textBlock, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: hero,
        start: 'top top+=120',
        end: 'bottom top+=120',
        scrub: 0.5
      }
    });
  }
});

    } else {
      // Sur mobile, désactiver les animations complexes
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
      }
    }
    
    // Initialisation de l'élément de soulignement
    if (underlineElement) {
      gsap.set(underlineElement, { width: 0, left: 0 });
    }
    
    // Nettoyage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });

  export function handleDescriptionHover() {
    if (underlineElement && subtitleElement) {
      gsap.to(underlineElement, {
        width: '100%',
        backgroundColor: '#1b4332',
        height: '2.5px',
        boxShadow: '0 0 8px 0 rgba(45, 106, 79, 0.75)',
        duration: 0.6,
        ease: 'power2.out'
      });
      gsap.to(subtitleElement, { color: '#2d6a4f', duration: 0.4 });
    }
  }

  export function handleDescriptionLeave() {
    if (underlineElement && subtitleElement) {
      gsap.to(underlineElement, {
        width: '0%',
        backgroundColor: '#2d6a4f',
        height: '1px',
        boxShadow: 'none',
        duration: 0.8,
        ease: 'power2.inOut'
      });
      gsap.to(subtitleElement, { color: '#374151', duration: 0.4 });
    }
  }
</script>


<section id="home" class="relative h-screen overflow-hidden bg-white">
  <!-- Textures supprimées pour plus de netteté -->
  
  <!-- Formes organiques décoratives supprimées pour plus de netteté -->
  
  <!-- Particules supprimées pour plus de simplicité -->
  
  <!-- Background image pour le Hero -->
  <div class="absolute inset-0 z-0 overflow-hidden" bind:this={hero} style="transform: translateY(0px) translateX(0px);">
    <!-- Fond beige simple en dessous de l'image avec will-change pour de meilleures performances -->
    <div class="absolute inset-0 w-full h-full bg-[#f8f3e8]"></div>
    
    <!-- Image de fond pour le Hero avec position optimale -->
    <div class="absolute inset-0 w-full h-full bg-cover bg-center" 
         style="background-image: url('/images/hero-bg-light.jpg'); background-position: center 30%; filter: brightness(0.97) contrast(1.02);"></div>
    

    
<!-- ajoute -z-10 + pointer-events-none aux deux overlays -->
<div class="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-black/15 opacity-80 -z-10 pointer-events-none"></div>
<div class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 -z-10 pointer-events-none"></div>

  </div>
  
  <!-- Élément décoratif supprimé -->
  
<!-- ajoute isolate + z-20 au container du contenu -->
<div class="absolute inset-0 z-20 isolate flex items-start pt-40 md:pt-60 justify-center" bind:this={heroContent}>

    <div class="container mx-auto px-4 text-gray-900">
      <!-- Logo avec style wabi-sabi -->
      <div class="mb-6 flex justify-center" bind:this={titleElement}>
        <div class="relative group">
          <div class="transition-transform duration-300 group-hover:scale-105">
            <img
            bind:this={logoElement}
            src="/img/Logo.png"
            alt="Delco Ink Logo"
            class="h-36 md:h-48 relative z-[100] mix-blend-normal"
            style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));"
          />
          
          </div>
          <!-- Effet de lueur subtil au survol -->
          <div class="absolute inset-0 bg-gradient-to-br from-forest/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10" style="filter: blur(20px);"></div>
        </div>
      </div>
      
      <!-- Sous-titre -->
      <div class="w-full flex justify-center mb-6 md:mb-8">
        <h1 class="sr-only">Delco Ink – Tatoueur spécialiste du blackwork à Chambéry</h1>
        
        <p 
          bind:this={subtitleElement}
          class="font-body text-lg sm:text-xl md:text-2xl text-gray-700 relative px-4"
          on:mouseenter={handleDescriptionHover}
          on:mouseleave={handleDescriptionLeave}
        >
          <span class="inline-block relative cursor-pointer px-1">
            Illustrative Blackwork<br class="block sm:hidden"> & Pop-Culture Tattoos
            <span 
              bind:this={underlineElement} 
              class="absolute bottom-0 left-1/2 h-1.5 bg-forest/80 w-0 -translate-x-1/2 transition-all duration-500 wavy-line"
            ></span>
          </span>
        </p>
      </div>
      
      <!-- Bouton de défilement avec style wabi-sabi : mouvement fluide, organique -->
      <div class="mt-8 md:mt-12 flex justify-center">
        <a 
          bind:this={ctaButton}
          href="#about" 
          class="group flex flex-col items-center justify-center relative overflow-hidden organic-hover-area py-3 px-5"
          aria-label="Défiler vers la section À propos"
        >
          
          <!-- Flèche avec style wabi-sabi : légèrement incurvée et asymmétrique -->
          <div class="relative overflow-hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-8 w-8 text-forest fade-down-arrow" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="1.5" 
                d="M19 9l-7 7-7-7" 
                class="origin-center transform transition-transform duration-500 group-hover:scale-110"
              />
            </svg>
          </div>
        </a>
      </div>
      
      <style>
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(3px); }
        }
        
        .fade-down-arrow {
          animation: fadeInOut 2s infinite ease-in-out;
        }
        
        /* Styles wabi-sabi */
        .wavy-line {
          border-radius: 1px;
          box-shadow: 0 0 4px rgba(45, 106, 79, 0.3);
        }
        
        .organic-hover-area {
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          transition: border-radius 1s ease;
        }
        
        .organic-hover-area:hover {
          border-radius: 50% 70% 40% 60% / 60% 30% 70% 40%;
        }
        
        .texture-overlay {
          position: relative;
        }
        
        .texture-overlay::after {
          content: '';
          position: absolute;
        }
        
        /* Effet de texture sur le path SVG */
        .texture-path {
          filter: url(#paper-texture);
        }
        
        .texture-path {
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(120, 120, 120, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(120, 120, 120, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 120, 120, 0.05) 0%, transparent 50%);
          mix-blend-mode: multiply;
        }
        
        .texture-overlay::after {
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.08;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        
        /* Masques organiques */
        .wavy-bottom-mask {
          -webkit-mask-image: url('/img/masks/wave-mask.svg');
          mask-image: url('/img/masks/wave-mask.svg');
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
        }
        
        .organic-gradient-mask {
          background: linear-gradient(to top, rgba(248, 243, 232, 1) 10%, rgba(248, 243, 232, 0.8) 30%, transparent 100%);
          mask-image: url('/img/masks/irregular-edge.svg');
          -webkit-mask-image: url('/img/masks/irregular-edge.svg');
          position: relative;
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          mask-position: bottom;
          -webkit-mask-position: bottom;
        }
        
        /* Ajout de texture sur le masque de transition */
        .organic-gradient-mask::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
      </style>
    </div>
  </div>
  

    <!-- Forme organique comme diviseur de section -->
    <div class="absolute bottom-0 w-full h-16 overflow-hidden">
      <div class="absolute inset-x-0 bottom-0 h-full organic-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50,0,142.29,19.59,242.94,52.83,121.83,41.92,159.73,56.92,321.39,56.44Z" 
            fill="#f8f3e8"
            class="organic-divider-path texture-soft"
          ></path>
        </svg>

    </div>
    
  </div>
</section>
