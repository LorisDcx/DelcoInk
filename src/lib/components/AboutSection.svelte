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

<section id="about" class="py-24 bg-black relative">
  <div class="ornament-corner"></div>
  <div class="container mx-auto px-4">
    <div bind:this={titleElement}>
      <h2 class="font-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block">
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
        
        <!-- SVG ornamental decoration corners -->
        <svg width="60" height="60" viewBox="0 0 24 24" class="absolute -top-3 -left-3 text-forest opacity-80">
          <path fill="currentColor" d="M4,4H20V20H4V4M6,6V18H18V6H6Z" />
          <path fill="currentColor" d="M0,0 L8,0 L8,2 L2,2 L2,8 L0,8 Z" />
        </svg>
        
        <svg width="60" height="60" viewBox="0 0 24 24" class="absolute -bottom-3 -right-3 text-forest opacity-80">
          <path fill="currentColor" d="M4,4H20V20H4V4M6,6V18H18V6H6Z" />
          <path fill="currentColor" d="M24,24 L16,24 L16,22 L22,22 L22,16 L24,16 Z" />
        </svg>
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
  <div class="ornament-corner ornament-corner-bottom-right"></div>
</section>
