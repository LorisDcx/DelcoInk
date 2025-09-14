<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import ParticlesBackground from './ParticlesBackground.svelte';
  import BrushStroke from './decorative/BrushStroke.svelte';
  
  // Références DOM pour les animations
  let titleElement: HTMLElement;
  let serviceCards: HTMLElement[] = [];
  let progressBars: HTMLElement[] = [];
  let servicesSection: HTMLElement;
  let decorElement: HTMLElement;
  
  onMount(() => {
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation du titre avec style wabi-sabi (légère asymétrie et rotation)
    if (titleElement && servicesSection) {
      gsap.from(titleElement, {
        y: 40,
        x: -8, // Décalage asymétrique wabi-sabi
        rotate: -1.5, // Légère rotation pour effet naturel
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none"
        }
      });
    }
    
    // Animation de l'élément décoratif
    if (decorElement) {
      gsap.from(decorElement, {
        scale: 0.8,
        opacity: 0,
        rotate: 5,
        duration: 1.5,
        delay: 0.3,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }
    
    // Animation des cartes avec style wabi-sabi (entrées décalées et asymétriques)
    if (serviceCards.length && servicesSection) {
      serviceCards.forEach((card, index) => {
        // Valeurs légèrement différentes pour chaque carte (asymétrie wabi-sabi)
        const xOffset = [12, -8, 5][index] || 0;
        const rotateVal = [-0.8, 1.2, -0.5][index] || 0;
        
        gsap.from(card, {
          y: 60,
          x: xOffset, // Décalage horizontal asymétrique
          rotate: rotateVal, // Rotation légère et variable
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 75%",
            end: "top 40%",
            toggleActions: "play none none none"
          },
          delay: 0.3 + (index * 0.25) // Délai progressif plus naturel
        });
      });
    }
    
    // Animation des barres de progression avec effet wabi-sabi (timing irrégulier)
    if (progressBars.length && servicesSection) {
      progressBars.forEach((bar, index) => {
        gsap.to(bar, {
          width: '100%',
          duration: 0.8 + (index * 0.15), // Durées légèrement différentes
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none"
          },
          delay: 0.6 + (index * 0.3) // Délais irréguliers pour effet naturel
        });
      });
    }
  });
</script>

<section id="services" class="min-h-screen relative overflow-hidden texture-soft bg-gray-50 flex items-center py-12 md:py-16" bind:this={servicesSection}>
  <!-- Élément décoratif -->
  <div bind:this={decorElement} class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-forest/5 border-2 border-forest/20 transform rotate-12 z-0"></div>
  
  <!-- Fond avec effet wabi-sabi -->
  <div class="absolute inset-0 opacity-20 wavy-gradient z-0"></div>
  

  
  <!-- Particules/orbes en arrière-plan avec style plus organique -->
  <ParticlesBackground opacity={0.4} particleCount={30} zIndex={1} />
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Titre avec style wabi-sabi -->
    <div bind:this={titleElement} class="text-center mb-16">
      <div class="relative inline-block">
        <!-- Trait décoratif sous le titre -->
        <div class="absolute -bottom-3 left-1/2 transform -translate-x-[45%] w-28 h-1 bg-forest opacity-30 rounded-full"></div>
        
        <h2 class="section-title text-4xl md:text-5xl text-gray-900 mb-16 uppercase relative inline-block transform -rotate-[0.8deg]">
          Styles & Créations
          <span class="absolute -right-8 -top-4 text-base opacity-40 rotate-12 font-serif">歯磨き粉</span>
        </h2>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 relative z-10 px-2">
      <!-- Blackwork Card avec style wabi-sabi -->
      <div class="service-card group bg-white/95 p-6 rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-lg shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-700 border-t-2 border-l border-forest/30 relative overflow-hidden z-30 hover:-translate-y-2 transform -rotate-[0.5deg] texture-paper wavy-border-subtle hover:rotate-0 before:absolute before:inset-0 before:rounded-tl-md before:rounded-tr-2xl before:rounded-br-md before:rounded-bl-lg before:opacity-0 before:bg-gradient-to-b before:from-forest/5 before:via-transparent before:to-forest/10 hover:before:opacity-100 before:transition-opacity before:duration-700 before:pointer-events-none" bind:this={serviceCards[0]}>
        <div class="card-content p-8 flex flex-col h-full relative">

          
          <div class="mb-8 text-center relative">
            <!-- Icone stylisée avec animation wabi-sabi -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-forest transition-all duration-700 group-hover:scale-[1.15] group-hover:rotate-[15deg] group-hover:filter breathing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-forest transition-all duration-500 group-hover:translate-y-[-2px] relative inline-block transform -rotate-[0.7deg]">
              <span class="relative z-10">Blackwork</span>
              <span class="absolute -bottom-1 inset-x-0 h-[2px] bg-forest/20 transform skew-x-12 -z-[1]"></span>
            </h3>
            
            <!-- Ligne décorative wabi-sabi (asymétrique) -->
            <div class="relative h-[3px] w-16 bg-gray-200/60 mx-auto mt-4 rounded-full overflow-hidden transform translate-x-[-4px]">
              <div 
                class="absolute top-0 left-0 h-full bg-forest/70 rounded-full"
                bind:this={progressBars[0]}
              ></div>
            </div>
          </div>
          
          <!-- Texte avec style wabi-sabi -->
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed transform -rotate-[0.3deg]">
            Des créations illustratives en noir profond avec ombrages et textures détaillées, alliant <span class="text-forest/90 moving-text">élégance</span> et <span class="text-forest/80 moving-text">intensité</span>.
          </p>
          
          <!-- Liste avec éléments wabi-sabi -->
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start group">
              <!-- Icône stylisée -->
              <div class="relative mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest flex-shrink-0 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="absolute inset-0 bg-forest/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-[1]"></span>
              </div>
              
              <span class="transform translate-y-[1px]"><span class="font-medium text-forest/90">Style :</span> Dotwork, line work, ombres graduées</span>
            </li>
          </ul>
          
          <!-- Bouton avec style wabi-sabi -->  
          <div class="text-center mt-auto">
            <a 
              href="#gallery" 
              class="inline-block relative text-forest hover:text-forest transition-all duration-500 uppercase font-title text-sm tracking-wider font-medium organic-link group"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'blackwork' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              <span class="relative z-10">Voir réalisations</span>
              <span class="ml-1 group-hover:ml-2 transition-all duration-500">&rarr;</span>
              <span class="absolute bottom-0 left-0 right-0 h-[1px] bg-forest/40 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></span>
            </a>
          </div>
        </div>
      </div>

      <!-- Pop-Culture Card avec style wabi-sabi -->
      <div class="service-card group bg-white/95 p-6 rounded-tr-md rounded-tl-2xl rounded-bl-md rounded-br-lg shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-700 border-t-2 border-r border-forest/30 relative overflow-hidden z-30 hover:-translate-y-2 transform rotate-[0.7deg] texture-paper wavy-border-subtle hover:rotate-0 before:absolute before:inset-0 before:rounded-tr-md before:rounded-tl-2xl before:rounded-bl-md before:rounded-br-lg before:opacity-0 before:bg-gradient-to-b before:from-forest/5 before:via-transparent before:to-forest/10 hover:before:opacity-100 before:transition-opacity before:duration-700 before:pointer-events-none" bind:this={serviceCards[1]}>
        <div class="card-content p-8 flex flex-col h-full relative">

          
          <div class="mb-8 text-center relative">
            <!-- Icone stylisée avec animation wabi-sabi -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-forest transition-all duration-700 group-hover:scale-[1.12] group-hover:rotate-[-12deg] group-hover:filter breathing-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-forest transition-all duration-500 group-hover:translate-y-[-2px] relative inline-block transform rotate-[0.5deg]">
              <span class="relative z-10">Pop Culture</span>
              <span class="absolute -bottom-1 inset-x-0 h-[2px] bg-forest/20 transform -skew-x-6 -z-[1]"></span>
            </h3>
            
            <!-- Ligne décorative wabi-sabi (asymétrique) -->
            <div class="relative h-[3px] w-16 bg-gray-200/60 mx-auto mt-4 rounded-full overflow-hidden transform translate-x-[3px]">
              <div 
                class="absolute top-0 left-0 h-full bg-forest/70 rounded-full"
                bind:this={progressBars[1]}
              ></div>
            </div>
          </div>
          
          <!-- Texte avec style wabi-sabi -->
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed transform rotate-[0.3deg]">
            Des designs inspirés de la culture populaire : films, jeux vidéo, <span class="text-forest/80 moving-text">animés</span>, comics, et autres univers <span class="text-forest/90 moving-text">emblématiques</span>.
          </p>
          
          <!-- Liste avec éléments wabi-sabi -->
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start group">
              <!-- Icône stylisée -->
              <div class="relative mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest flex-shrink-0 transition-transform duration-500 group-hover:-rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="absolute inset-0 bg-forest/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-[1]"></span>
              </div>
              
              <span class="transform translate-y-[1px]"><span class="font-medium text-forest/90">Créations :</span> Pièces uniques et personnalisées</span>
            </li>
            <li class="flex items-start group">
              <!-- Icône stylisée -->
              <div class="relative mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest flex-shrink-0 transition-transform duration-500 group-hover:-rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="absolute inset-0 bg-forest/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-[1]"></span>
              </div>
              
              <span class="transform translate-y-[1px]"><span class="font-medium text-forest/90">Spécialités :</span> Adaptations fidèles, crossovers originaux</span>
            </li>
          </ul>
          
          <!-- Bouton avec style wabi-sabi -->  
          <div class="text-center mt-auto">
            <a 
              href="#gallery" 
              class="inline-block relative text-forest hover:text-forest transition-all duration-500 uppercase font-title text-sm tracking-wider font-medium organic-link group"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'popculture' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              <span class="relative z-10">Voir réalisations</span>
              <span class="ml-1 group-hover:ml-2 transition-all duration-500">&rarr;</span>
              <span class="absolute bottom-0 left-0 right-0 h-[1px] bg-forest/40 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></span>
            </a>
          </div>
        </div>
      </div>

      <!-- Flash Card avec style wabi-sabi -->
      <div class="service-card group bg-white/95 p-6 rounded-tr-2xl rounded-tl-lg rounded-bl-2xl rounded-br-md shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-700 border-b-2 border-l border-forest/30 relative overflow-hidden z-30 hover:-translate-y-2 transform -rotate-[0.4deg] texture-paper wavy-border-subtle hover:rotate-0 before:absolute before:inset-0 before:rounded-tr-2xl before:rounded-tl-lg before:rounded-bl-2xl before:rounded-br-md before:opacity-0 before:bg-gradient-to-b before:from-forest/10 before:via-transparent before:to-forest/5 hover:before:opacity-100 before:transition-opacity before:duration-700 before:pointer-events-none" bind:this={serviceCards[2]}>
        <div class="card-content p-8 flex flex-col h-full relative">

          
          <div class="mb-8 text-center relative">
            <!-- Icone stylisée avec animation wabi-sabi -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-forest transition-all duration-700 group-hover:scale-[1.08] group-hover:rotate-[25deg] group-hover:filter breathing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-forest transition-all duration-500 group-hover:translate-y-[-2px] relative inline-block transform rotate-[0.3deg]">
              <span class="relative z-10">Flash</span>
              <span class="absolute -bottom-1 inset-x-0 h-[2px] bg-forest/20 transform skew-x-3 -z-[1]"></span>
            </h3>
            
            <!-- Ligne décorative wabi-sabi (asymétrique) -->
            <div class="relative h-[3px] w-16 bg-gray-200/60 mx-auto mt-4 rounded-full overflow-hidden transform translate-x-[2px]">
              <div 
                class="absolute top-0 left-0 h-full bg-forest/70 rounded-full"
                bind:this={progressBars[2]}
              ></div>
            </div>
          </div>
          
          <!-- Texte avec style wabi-sabi -->
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed transform rotate-[0.2deg]">
            Des designs prêts à être tatoués, <span class="text-forest/90 moving-text">créés</span> à l'avance et disponibles pour une réalisation <span class="text-forest/80 moving-text">immédiate</span> ou sur rendez-vous.
          </p>
          
          <!-- Liste avec éléments wabi-sabi -->
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start group">
              <!-- Icône stylisée -->
              <div class="relative mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest flex-shrink-0 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="absolute inset-0 bg-forest/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-[1]"></span>
              </div>
              
              <span class="transform translate-y-[1px]"><span class="font-medium text-forest/90">Disponibilité :</span> Collection régulièrement renouvelée</span>
            </li>
            <li class="flex items-start group">
              <!-- Icône stylisée -->
              <div class="relative mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest flex-shrink-0 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="absolute inset-0 bg-forest/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-[1]"></span>
              </div>
              
              <span class="transform translate-y-[1px]"><span class="font-medium text-forest/90">Avantage :</span> Réalisation immédiate possible</span>
            </li>
          </ul>
          
          <!-- Bouton avec style wabi-sabi -->  
          <div class="text-center mt-auto">
            <a 
              href="#gallery" 
              class="inline-block relative text-forest hover:text-forest transition-all duration-500 uppercase font-title text-sm tracking-wider font-medium organic-link group"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'flash' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              <span class="relative z-10">Voir catalogue</span>
              <span class="ml-1 group-hover:ml-2 transition-all duration-500">&rarr;</span>
              <span class="absolute bottom-0 left-0 right-0 h-[1px] bg-forest/40 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
