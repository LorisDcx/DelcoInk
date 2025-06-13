<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  let titleElement: HTMLElement;
  let imageContainer: HTMLElement;
  let textContainer: HTMLElement;
  
  onMount(() => {
    // Animation des éléments au chargement
    if (titleElement) {
      gsap.from(titleElement, {
        y: 50,
        opacity: 0,
        duration: 0.8
      });
    }
    
    if (imageContainer) {
      gsap.from(imageContainer, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      });
    }
    
    if (textContainer) {
      gsap.from(textContainer, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4
      });
    }
  });
</script>

<section id="about" class="py-20 relative overflow-hidden">
  <!-- Arrière-plan crème avec diverses plantes -->
  <div class="absolute inset-0 z-0 bg-[#f8f3e8]">
    <!-- Monstera en haut à droite -->
    <div class="absolute top-0 right-0 w-64 h-64 transform -rotate-12 opacity-15 z-0">
      <img src="/img/monstera.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Fougère en haut à gauche-->
    <div class="absolute bottom-10 left-0 w-50 h-51 transform rotate-15 opacity-10 z-0">
      <img src="/img/fougere.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Jolie feuille au centre -->
    <div class="absolute bottom-0 left-1/2 w-52 h-52 transform opacity-15 z-0">
      <img src="/img/joli feuille.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Pngegg en bas à droite -->
    <div class="absolute bottom-0 right-24 w-41 h-64 transform rotate-12 opacity-10 z-0">
      <img src="/img/pngegg.png" alt="" class="w-full h-full object-contain" />
    </div>
    

    
    <!-- Petite monstera en milieu droit -->
    <div class="absolute top-1/3 right-10 w-32 h-32 transform -rotate-5 opacity-15 z-0">
      <img src="/img/monstera.png" alt="" class="w-full h-full object-contain" />
    </div>
  </div>
  <div class="container mx-auto px-4">
    <div bind:this={titleElement} class="text-center">
      <h2 class="font-title text-4xl md:text-5xl text-center text-forest mb-16 uppercase relative inline-block">
        À propos
        <span class="absolute -bottom-2 left-0 h-1 bg-prune w-1/2"></span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="relative z-10" bind:this={imageContainer}>
        <!-- Image avec cadre élégant adapté au fond crème -->
        <div class="relative p-2 bg-white rounded-sm overflow-hidden shadow-lg">
          <!-- Cadre interne avec effet de profondeur -->
          <div class="p-1 border border-forest/20 rounded-sm">
            <!-- Image avec effets -->
            <div class="aspect-ratio-1/1 overflow-hidden relative">
              <img 
                src="/images/artist-portrait.jpg" 
                alt="Artiste Delco Ink" 
                class="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <!-- Overlay subtil -->
              <div class="absolute inset-0 shadow-inner pointer-events-none"></div>
              <div class="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>
          </div>
          
          <!-- Éléments décoratifs aux coins -->
          <div class="absolute top-0 left-0 w-6 h-6 border-t border-l border-forest/40"></div>
          <div class="absolute top-0 right-0 w-6 h-6 border-t border-r border-forest/40"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-forest/40"></div>
          <div class="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-forest/40"></div>
        </div>
      </div>

      <div class="relative z-10" bind:this={textContainer}>
        <!-- Conteneur plus doux et fluide -->
        <div class="p-6 backdrop-blur-sm bg-white/10 border-l border-forest/20 rounded-r-sm">
          <h3 class="font-title text-3xl mb-8 text-forest relative inline-block">
            Delco Ink <span class="text-prune font-semibold">Studio</span>
            <span class="absolute -bottom-2 left-0 h-0.5 bg-forest/60 w-3/4"></span>
          </h3>
        
          <div class="space-y-6 text-gray-700 leading-relaxed mb-8">
            <p>
              Niché au cœur de <span class="text-vivid">Chambéry</span>, Delco Ink est un studio privé où l'art du tatouage devient une véritable expérience créative personnalisée.
            </p>
            
            <p>
              Spécialisé en <span class="text-forest font-medium">blackwork illustratif</span> et puisant son inspiration dans l'univers de la <span class="text-forest font-medium">pop-culture</span>, l'atelier vous propose des créations uniques qui vous ressemblent.
            </p>
          </div>

          <!-- Philosophie au lieu des statistiques -->
          <div class="mb-10 relative">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-forest/40 to-transparent"></div>
            <div class="pl-4 border-forest/10">
              <h4 class="text-lg font-medium text-vivid mb-3">Notre philosophie</h4>
              <p class="text-gray-600 italic">
                "Chaque tatouage est une histoire, une partie de votre identité que nous créons ensemble. Mon approche mêle <span class="text-prune">technique précise</span> et <span class="text-prune">sensibilité artistique</span> pour transcender le simple dessin sur peau."
              </p>
            </div>
          </div>

          <!-- Boutons avec style adouci -->
          <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 mt-4">
            <a href="/#gallery" class="px-6 py-3 bg-transparent hover:bg-white/20 text-prune font-medium rounded-full transition-all duration-300 text-center border border-prune/30 hover:shadow-sm hover:border-prune/50">
              Découvrir les créations
            </a>
            <a href="/#contact" class="px-6 py-3 bg-forest/60 hover:bg-forest/80 text-white font-medium rounded-full transition-all duration-300 text-center shadow-sm hover:shadow">
              Parlons de votre projet
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ornement de coin inférieur droit supprimé -->
</section>
