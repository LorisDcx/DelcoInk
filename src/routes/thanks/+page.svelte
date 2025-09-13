<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import gsap from 'gsap';

  let titleElement: HTMLElement;
  let messageElement: HTMLElement;
  let buttonElement: HTMLElement;
  let decorativeElement: HTMLElement;

  onMount(() => {
    if (browser) {
      // Animation d'entrée
      const tl = gsap.timeline();
      
      if (titleElement) {
        tl.from(titleElement, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      
      if (messageElement) {
        tl.from(messageElement, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
      }
      
      if (buttonElement) {
        tl.from(buttonElement, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");
      }
      
      if (decorativeElement) {
        tl.from(decorativeElement, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.3");
      }

      // Redirection automatique après 10 secondes
      const timer = setTimeout(() => {
        goto('/');
      }, 10000);

      return () => clearTimeout(timer);
    }
  });
</script>

<svelte:head>
  <title>Merci pour votre message - Delco Ink</title>
  <meta name="description" content="Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
  <!-- Fond décoratif avec brume subtile -->
  <div class="absolute inset-0 pointer-events-none">
    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="thanksTurbulence" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence baseFrequency="0.01 0.02" numOctaves="2" result="noise" seed="5">
            <animate attributeName="baseFrequency" values="0.01 0.02; 0.015 0.025; 0.01 0.02" dur="40s" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>
      
      <ellipse cx="20" cy="80" rx="30" ry="20" fill="white" opacity="0.3" filter="url(#thanksTurbulence)">
        <animateTransform attributeName="transform" type="translate" values="0 0; 20 -10; 40 -5; 60 -15" dur="60s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="80" cy="30" rx="25" ry="15" fill="#2d6a4f" opacity="0.1" filter="url(#thanksTurbulence)">
        <animateTransform attributeName="transform" type="translate" values="0 0; -15 5; -30 10; -45 2" dur="50s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  </div>

  <div class="max-w-2xl mx-auto text-center relative z-10">
    <!-- Élément décoratif animé -->
    <div bind:this={decorativeElement} class="mb-8 flex justify-center">
      <div class="relative">
        <div class="w-24 h-24 bg-forest rounded-full opacity-10 absolute -inset-2 animate-pulse"></div>
        <div class="w-20 h-20 bg-forest rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Titre principal -->
    <h1 bind:this={titleElement} class="text-4xl md:text-6xl font-title text-gray-900 mb-6 relative">
      <span class="absolute -right-4 -top-2 text-lg opacity-50 rotate-12 text-forest">ありがとう</span>
      Merci !
    </h1>

    <!-- Message principal -->
    <div bind:this={messageElement} class="space-y-4 mb-8">
      <p class="text-xl md:text-2xl text-gray-700 font-medium">
        Votre message a été envoyé avec succès
      </p>
      <p class="text-gray-600 font-quicksand leading-relaxed max-w-lg mx-auto">
        Je prends connaissance de votre demande et vous répondrai dans les plus brefs délais. 
        En général, je réponds dans les 24 heures.
      </p>
      <p class="text-sm text-gray-500 font-quicksand">
        Vous allez être redirigé vers l'accueil dans quelques secondes...
      </p>
    </div>

    <!-- Boutons d'action -->
    <div bind:this={buttonElement} class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
      <a 
        href="/" 
        class="inline-flex items-center px-6 py-3 bg-forest text-white font-medium rounded-lg hover:bg-forest/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Retour à l'accueil
      </a>
      
      <a 
        href="/flash" 
        class="inline-flex items-center px-6 py-3 bg-white text-forest font-medium rounded-lg border-2 border-forest hover:bg-forest hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Voir les Flash
      </a>
    </div>

    <!-- Informations supplémentaires -->
    <div class="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
      <h3 class="text-lg font-medium text-gray-900 mb-3">En attendant ma réponse</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Réponse sous 24h en général</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>contact@delco-ink.fr</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span>Studio privé à Cognin</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-forest mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Sur rendez-vous uniquement</span>
        </div>
      </div>
    </div>
  </div>
</section>
