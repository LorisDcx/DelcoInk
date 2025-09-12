<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SectionDivider from './SectionDivider.svelte';
  import BrushStroke from './decorative/BrushStroke.svelte';
  
  let hero: HTMLElement;
  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let ctaButton: HTMLElement;
  let logoElement: HTMLElement;
  let underlineElement: HTMLElement;
  
  // Références pour les animations wabi-sabi et effets de fondu
  let heroContent: HTMLElement;
  let fadeOutThreshold = 300; // Seuil de défilement pour déclencher le fondu

  onMount(() => {
    // Effet de parallaxe et de fondu sortant sur défilement avec animation wabi-sabi
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (hero) {
        // Effet de parallaxe sur l'arrière-plan avec léger décalage en X pour l'effet wabi-sabi
        hero.style.transform = `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.005) * 5}px)`;
      }
      
      // Animation des formes organiques supprimées pour plus de netteté
      
      // Effet de fondu sortant sur le contenu du hero avec effet wabi-sabi (léger décalage)
      if (heroContent) {
        
        // Calcul de l'opacité basée sur le défilement (1 au début, 0 à fadeOutThreshold)
        const opacity = Math.max(0, 1 - scrollY / fadeOutThreshold);
        heroContent.style.opacity = opacity.toString();
        
        // Effet de translation avec léger décalage horizontal pour aspect wabi-sabi
        if (scrollY <= fadeOutThreshold) {
          const translateY = scrollY * 0.2;
          const translateX = Math.sin(scrollY * 0.01) * 3; // Léger mouvement latéral
          heroContent.style.transform = `translateY(-${translateY}px) translateX(${translateX}px)`;
        }
      }
      
      // Animation du trait de pinceau supprimée
    });

    // Animation séquencée des éléments du hero avec aspect wabi-sabi
    const heroTimeline = gsap.timeline();
    
    // Animation du titre avec légère désynchronisation wabi-sabi - timing accéléré
    heroTimeline.from(titleElement, {
      y: 30,
      x: -10, // Décalage horizontal pour l'asymétrie
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Animation du logo supprimée

    // Animation du sous-titre avec effet décalé - timing accéléré
    heroTimeline.from(subtitleElement, {
      y: 20,
      x: 5, // Léger décalage pour l'imperfection wabi-sabi
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Animation du CTA bouton avec mouvement organique - timing accéléré
    heroTimeline.from(ctaButton, {
      y: 15,
      scale: 0.95,
      opacity: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)" // Effet ressort plus organique
    }, "-=0.4");
    
    // Animation des éléments décoratifs supprimée pour plus de netteté
    // Animation des éléments décoratifs supprimée
    
    // Ne pas animer au début - uniquement au survol
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
  <!-- Textures supprimées pour plus de netteté -->
  
  <!-- Formes organiques décoratives supprimées pour plus de netteté -->
  
  <!-- Particules supprimées pour plus de simplicité -->
  
  <!-- Background image pour le Hero -->
  <div class="absolute inset-0 z-0 overflow-hidden" bind:this={hero}>
    <!-- Fond beige simple en dessous de l'image -->
    <div class="absolute inset-0 w-full h-full bg-[#f8f3e8]"></div>
    
    <!-- Image de fond pour le Hero avec position optimale -->
    <div class="absolute inset-0 w-full h-full bg-cover bg-center" 
         style="background-image: url('/images/hero-bg-light.jpg'); background-position: center 30%; filter: brightness(0.97) contrast(1.02);"></div>
    
    <!-- Overlays pour améliorer la lisibilité et créer une atmosphère wabi-sabi -->
    <div class="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-black/15 opacity-80"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
    
    
    <!-- Transition supprimée -->
  </div>
  
  <!-- Élément décoratif supprimé -->
  
  <!-- Hero Content avec effet de fondu -->
  <div class="absolute inset-0 z-30 flex items-center justify-center" bind:this={heroContent} style="transition: transform 0.1s ease-out;">
    <div class="container mx-auto px-4 text-gray-900">
      <!-- Logo avec style wabi-sabi : légèrement décalé, imperfection intentionnelle -->
      <div class="mb-6 flex justify-center translate-x-3 -rotate-2" bind:this={titleElement}>
        <div class="relative group">
          <div class="overflow-visible transition-all duration-500">
            <img 
              bind:this={logoElement}
              src="/img/Logo.png" 
              alt="Delco Ink Logo" 
              class="h-32 md:h-40 relative z-10 transition-all duration-500 ease-out group-hover:brightness-110 filter contrast-110 brightness-105 drop-shadow-2xl" 
            />
          </div>
          <!-- Utilisation de mix-blend-mode pour que la luminosité respecte les contours du PNG avec une variation naturelle -->
          <div class="absolute inset-0 bg-gradient-to-br from-forest to-forest/80 opacity-0 blur-2xl transition-all duration-700 ease-out group-hover:opacity-20 z-0 transform scale-125 mix-blend-soft-light"></div>
          <div class="absolute -inset-1 bg-gradient-to-r from-transparent via-forest/10 to-transparent opacity-0 blur-xl transition-all duration-500 ease-out group-hover:opacity-70 z-0 mix-blend-screen"></div>
        </div>
      </div>
      
      <!-- Sous-titre avec style wabi-sabi : espacement et rythme irrégulier -->
      <div class="flex justify-center md:justify-center mb-8 -ml-3 md:ml-6">
        <p 
          bind:this={subtitleElement}
          class="font-body text-xl md:text-2xl text-gray-700 relative transform rotate-1"
          on:mouseenter={handleDescriptionHover}
          on:mouseleave={handleDescriptionLeave}
        >
          <span class="inline-block relative cursor-pointer px-1">
            Illustrative Blackwork & Pop-Culture Tattoos
            <span 
              bind:this={underlineElement} 
              class="absolute bottom-0 left-0 h-1.5 bg-forest/80 w-0 transition-all duration-500 wavy-line"
            ></span>
          </span>
        </p>
      </div>
      
      <!-- Bouton de défilement avec style wabi-sabi : mouvement fluide, organique -->
      <div class="mt-14 flex justify-center md:translate-x-5">
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
