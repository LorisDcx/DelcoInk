<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import ParticlesBackground from './ParticlesBackground.svelte';
  
  let titleElement: HTMLElement;
  let serviceCards: HTMLElement[] = [];
  let progressBars: HTMLElement[] = [];
  let servicesSection: HTMLElement;
  
  onMount(() => {
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation du titre liée au scroll
    if (titleElement && servicesSection) {
      gsap.from(titleElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none"
        }
      });
    }
    
    // Animation des cartes de service avec délai progressif
    if (serviceCards.length && servicesSection) {
      serviceCards.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 75%",
            end: "top 45%",
            toggleActions: "play none none none"
          },
          delay: 0.2 + (index * 0.2)
        });
      });
    }
    
    // Animation des barres de progression
    if (progressBars.length && servicesSection) {
      progressBars.forEach((bar, index) => {
        gsap.to(bar, {
          width: '100%',
          duration: 1,
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none"
          },
          delay: 0.5 + (index * 0.2)
        });
      });
    }
  });
</script>

<section id="services" class="py-24 bg-gray-50 relative" bind:this={servicesSection}>
  <!-- Particules/orbes en arrière-plan (zIndex entre le fond et les éléments UI) -->
  <ParticlesBackground opacity={0.5} particleCount={35} zIndex={2} />
  <div class="container mx-auto px-4 relative z-10">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">
        Nos Services
        <span class="absolute -bottom-2 left-0 h-1 bg-prune w-1/2"></span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative z-10">
      <!-- Blackwork Card -->
      <div class="service-card group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-500 border-t-4 border-forest relative overflow-hidden z-30 hover:-translate-y-3 hover:scale-[1.03] before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:bg-gradient-to-b before:from-forest/10 before:to-transparent hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none" bind:this={serviceCards[0]}>
        <div class="card-content p-8 flex flex-col h-full">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-prune transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:filter group-hover:drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-prune transition-all duration-300 group-hover:scale-110">Blackwork</h3>
            
            <!-- Growing line animation -->
            <div class="relative h-0.5 w-16 bg-gray-200 mx-auto mt-3">
              <div 
                class="absolute top-0 left-0 h-full bg-prune"
                bind:this={progressBars[0]}
              ></div>
            </div>
          </div>
          
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed">
            Des créations illustratives en noir profond avec ombrages et textures détaillées, alliant élégance et intensité.
          </p>
          
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Durée :</span> Sessions de 2-4h selon le projet</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Style :</span> Dotwork, line work, ombres graduées</span>
            </li>
          </ul>
          
          <div class="text-center">
            <a 
              href="#gallery" 
              class="inline-block text-forest hover:text-prune transition-colors duration-300 uppercase font-title text-sm tracking-wider font-medium border-b border-forest/40 pb-1 hover:border-prune/60"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'blackwork' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              Voir réalisations
              <span class="ml-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Pop-Culture Card -->
      <div class="service-card group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-500 border-t-4 border-forest relative overflow-hidden z-30 hover:-translate-y-3 hover:scale-[1.03] before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:bg-gradient-to-b before:from-forest/10 before:to-transparent hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none" bind:this={serviceCards[1]}>
        <div class="card-content p-8 flex flex-col h-full">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-prune transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:filter group-hover:drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-prune transition-all duration-300 group-hover:scale-110">Pop Culture</h3>
            
            <!-- Growing line animation -->
            <div class="relative h-0.5 w-16 bg-gray-200 mx-auto mt-3">
              <div 
                class="absolute top-0 left-0 h-full bg-prune"
                bind:this={progressBars[1]}
              ></div>
            </div>
          </div>
          
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed">
            Des designs inspirés de la culture populaire : films, jeux vidéo, animés, comics, et autres univers emblématiques.
          </p>
          
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Durée :</span> Sessions de 3-5h selon le projet</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Spécialités :</span> Adaptations fidèles, crossovers originaux</span>
            </li>
          </ul>
          
          <div class="text-center">
            <a 
              href="#gallery" 
              class="inline-block text-forest hover:text-prune transition-colors duration-300 uppercase font-title text-sm tracking-wider font-medium border-b border-forest/40 pb-1 hover:border-prune/60"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'popculture' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              Voir réalisations
              <span class="ml-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Flash Card -->
      <div class="service-card group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-500 border-t-4 border-forest relative overflow-hidden z-30 hover:-translate-y-3 hover:scale-[1.03] before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:bg-gradient-to-b before:from-forest/10 before:to-transparent hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none" bind:this={serviceCards[2]}>
        <div class="card-content p-8 flex flex-col h-full">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-prune transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:filter group-hover:drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <h3 class="font-title text-2xl uppercase text-gray-800 group-hover:text-prune transition-all duration-300 group-hover:scale-110">Flash</h3>
            
            <!-- Growing line animation -->
            <div class="relative h-0.5 w-16 bg-gray-200 mx-auto mt-3">
              <div 
                class="absolute top-0 left-0 h-full bg-prune"
                bind:this={progressBars[2]}
              ></div>
            </div>
          </div>
          
          <p class="text-gray-600 text-center mb-8 px-2 leading-relaxed">
            Des designs prêts à être tatoués, créés à l'avance et disponibles pour une réalisation immédiate ou sur rendez-vous.
          </p>
          
          <ul class="space-y-4 text-gray-700 mb-8 px-1">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Durée :</span> Sessions rapides de 1-2h</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-prune flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Avantage :</span> Réalisation immédiate possible</span>
            </li>
          </ul>
          
          <div class="text-center">
            <a 
              href="#gallery" 
              class="inline-block text-forest hover:text-prune transition-colors duration-300 uppercase font-title text-sm tracking-wider font-medium border-b border-forest/40 pb-1 hover:border-prune/60"
              on:click={() => {
                // Définir le type de filtre et faire défiler vers la galerie
                window.location.hash = 'gallery';
                setTimeout(() => {
                  const event = new CustomEvent('set-gallery-filter', { detail: 'flash' });
                  window.dispatchEvent(event);
                }, 100);
              }}
            >
              Voir catalogue
              <span class="ml-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
