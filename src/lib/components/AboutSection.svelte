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

<section id="about" class="py-24 relative overflow-hidden">
  <!-- Overlay pour la section About (l'image de fond est fournie par le Hero) -->
  <div class="absolute inset-0 z-0">
    <!-- Overlay foncé pour la lisibilité du contenu -->
    <div class="absolute inset-0 bg-black bg-opacity-70"></div>
    <!-- Gradient pour améliorer la lisibilité du texte et créer une transition -->
    <div class="absolute inset-0 bg-gradient-to-b from-green-800/70 to-black/50"></div>
  </div>
  <!-- Ornements supprimés -->
  <div class="container mx-auto px-4">
    <div bind:this={titleElement}>
      <h2 class="font-title text-4xl md:text-5xl text-white text-center mb-16 uppercase relative inline-block">
        À propos
        <span class="absolute -bottom-2 left-0 h-1 bg-forest w-1/2"></span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="relative" bind:this={imageContainer}>
        <div class="aspect-ratio-1/1 bg-gray-900 rounded-sm overflow-hidden relative">
          <img 
            src="/images/artist-portrait.jpg" 
            alt="Artiste Delco Ink" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
        
        <!-- Coins décoratifs SVG supprimés -->
      </div>

      <div class="relative" bind:this={textContainer}>
        <h3 class="font-title text-3xl mb-6 text-white relative inline-block">
          Delco Ink <span class="text-forest">Studio</span>
          <span class="absolute -bottom-2 left-0 h-0.5 bg-forest w-1/3"></span>
        </h3>
        
        <p class="text-gray-300 mb-6 leading-relaxed">
          Niché au cœur de Chambéry, Delco Ink est un studio privé dédié au <strong class="text-vivid">blackwork illustratif</strong> 
          et à l'univers de la <strong class="text-vivid">pop-culture</strong>.
        </p>
        
        <p class="text-gray-300 mb-6 leading-relaxed">
          Notre approche artistique s'inspire de la dualité entre la nature et les structures abandonnées, 
          créant ainsi des tatouages où le noir profond et les lignes précises s'épanouissent comme le ferait 
          la nature reprenant ses droits sur des ruines modernes.
        </p>
        
        <p class="text-gray-300 mb-8 leading-relaxed">
          Chaque tatouage est une œuvre unique, mélangeant technique traditionnelle et vision contemporaine,
          pour un résultat aussi personnel que durable.
        </p>
        
        <div class="flex items-center space-x-6">
          <div>
            <p class="font-title text-3xl text-vivid">7+</p>
            <p class="text-sm text-gray-400">Années d'expérience</p>
          </div>
          <div class="h-12 w-px bg-forest"></div>
          <div>
            <p class="font-title text-3xl text-vivid">300+</p>
            <p class="text-sm text-gray-400">Projets réalisés</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Ornement de coin inférieur droit supprimé -->
</section>
