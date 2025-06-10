<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ParticlesBackground from './ParticlesBackground.svelte';
  
  let hero: HTMLElement;
  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let ctaButton: HTMLElement;
  
  onMount(() => {
    // Simple parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
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


    
    // Nettoyage
    return () => {
    };
  });
</script>

<section id="home" class="relative h-screen overflow-hidden bg-white">
  <!-- Particules/orbes en arrière-plan -->
  <ParticlesBackground opacity={0.6} particleCount={40} zIndex={5} />
  
  <!-- Background image with parallax effect -->
  <div class="absolute inset-0 z-0" bind:this={hero}>
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/hero-bg-light.jpg');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70"></div>
  </div>
  

  
  <!-- Hero Content -->
  <div class="absolute inset-0 z-20 flex items-center justify-center">
    <div class="container mx-auto px-4 text-center text-gray-900">
      <h1 
        bind:this={titleElement}
        class="font-title text-5xl md:text-7xl uppercase tracking-widest mb-4"
      >
        Delco <span class="text-forest">Ink</span>
      </h1>
      
      <p 
        bind:this={subtitleElement}
        class="font-body text-xl md:text-2xl mb-8 text-gray-700"
      >
        <span class="inline-block relative">
          Illustrative Blackwork & Pop-Culture Tattoos
          <span class="absolute bottom-0 left-0 h-0.5 bg-forest w-full opacity-70"></span>
        </span>
      </p>
      
      <a 
        bind:this={ctaButton}
        href="#about" 
        class="btn-primary group mt-12 shadow-sm hover:shadow-md transition-all"
      >
        Découvrir
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline-block transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </div>
</section>
