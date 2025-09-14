<script lang="ts">
  import '../app.css';
  import '../lib/styles/wabisabi.css';
  import { fade, slide, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { quintOut } from 'svelte/easing';
  import OrganicShape from '$lib/components/decorative/OrganicShape.svelte';
  import BrushStroke from '$lib/components/decorative/BrushStroke.svelte';
  import AnimatedBackground from '$lib/components/decorative/AnimatedBackground.svelte';
  import MobileHeader from '$lib/components/MobileHeader.svelte';

  let mobileMenuOpen = false;
  
  // Pour les animations de menu avec décalage wabi-sabi
  let menuItems = [];
  let menuHovered = false;
  
  // Variable pour contrôler la visibilité du bouton RDV
  let showBookingButton = true;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }


  
  // Effet de hover ondulant pour les liens du menu
  function handleMenuHover(isHovered: boolean) {
    menuHovered = isHovered;
  }
  
  // Fonction pour détecter la section contact
  function handleScroll() {
    if (typeof window !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Le bouton disparaît quand on entre dans la section contact (50% visible)
        showBookingButton = rect.top > windowHeight * 0.5;
      }
    }
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  onMount(() => {
    // Animation subtile des liens du menu
    const navLinks = document.querySelectorAll('.nav-link');
    menuItems = Array.from(navLinks) as HTMLElement[];
    menuItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`;
    });
  });
</script>

<style>
  /* Styles wabi-sabi pour le layout */
  :global(body) {
    overflow-x: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  .wabi-header {
    backdrop-filter: blur(8px);
    border-radius: 0 0 20px 5px;
    padding: 1rem 0;
  }
  
  .nav-link {
    position: relative;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .nav-link:hover {
    transform: translateY(-2px) rotate(-1deg);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
    border-radius: 4px;
    opacity: 0.7;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  .logo-container {
    transition: transform 0.5s ease;
  }
  
  .logo-container:hover {
    transform: translateY(-3px) rotate(1deg);
  }
  
  .booking-btn {
    border-radius: 60% 40% 40% 20% / 60% 30% 70% 40%;
    transition: border-radius 0.6s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .booking-btn:hover {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .booking-btn-bg {
    background: linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #2d6a4f 100%);
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
  }
  
  .booking-icon {
    transition: transform 0.5s ease;
  }
  
  .booking-btn:hover .booking-icon {
    transform: rotate(10deg);
  }
  
  /* Footer avec style wabi-sabi */
  .footer-wave {
    border-radius: 40% 60% 0 0 / 8%;
  }
  
  /* Création de l'effet irrégulier */
  .uneven-border {
    border-radius: 30% 70% 70% 30% / 30% 52% 48% 70%;
  }
  
  .mobile-menu-panel {
    border-radius: 10px 0 0 30px;
  }
  
  .nav-link-mobile {
    position: relative;
    padding: 0.5rem 0;
  }
  
  .nav-link-mobile::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #2d6a4f;
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  
  .nav-link-mobile:hover::after {
    width: 100%;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .header-with-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(45, 106, 79, 0.1);
  }
  
  .header-with-shadow::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to bottom, rgba(45, 106, 79, 0.15), transparent);
    pointer-events: none;
  }
</style>

<div class="flex flex-col min-h-screen texture-overlay texture-paper">
  <!-- Background animé subtil -->
  <AnimatedBackground type="grain" opacity={0.05} zIndex={-1} />  
  
  <!-- Mobile Header -->
  <MobileHeader />
  
  <!-- Desktop Header -->
  <header class={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 wabi-header header-with-shadow`} id="main-header">
    <!-- Formes organiques décoratives pour le header -->
    <div class="absolute left-0 bottom-0 w-48 h-48 overflow-hidden opacity-10 pointer-events-none">
      <OrganicShape type="blob1" fill="#2d6a4f" opacity={0.2} width="100%" height="100%" />    
    </div>
    
    <div class="container mx-auto px-4 flex justify-between items-center relative z-10">
      <div class="flex items-center space-x-4">
        <a href="/" class="flex items-center pl-0 md:pl-0 logo-container">
          <img src="/img/Logo.png" alt="Delco Ink Logo" class="h-10" />
        </a>
        <div class="hidden md:block pl-1 transform rotate-[-0.5deg]">
          <p class="text-gray-700 font-medium text-sm tracking-wide font-satisfy">Tattoo Shop Chambery - <span class="italic">Illustrative Blackwork</span></p>
          <p class="text-forest text-xs font-medium transform translate-x-1">Salon privé - Sur rendez-vous uniquement</p>
        </div>
      </div>
      <nav class="hidden md:flex items-center" on:mouseenter={() => handleMenuHover(true)} on:mouseleave={() => handleMenuHover(false)}>
        <div class="relative diagonal-layout flex space-x-5 xl:space-x-6 items-baseline mr-4">
          <a href="/#about" class="nav-link text-gray-800 hover:text-forest transition-colors font-quicksand py-2">À propos</a>
          <a href="/#services" class="nav-link text-gray-800 hover:text-forest transition-colors font-quicksand py-2 translate-y-1">Styles</a>
          <a href="/#gallery" class="nav-link text-gray-800 hover:text-forest transition-colors font-quicksand py-2 -translate-y-1">Galerie</a>
          <a href="/#process" class="nav-link text-gray-800 hover:text-forest transition-colors font-quicksand py-2 translate-y-0.5">Processus</a>
          <a href="/#contact" class="nav-link text-gray-800 hover:text-forest transition-colors font-quicksand py-2">Contact</a>
        </div>
        
        <a href="/flash" class="organic-button bg-forest bg-opacity-90 text-white hover:bg-opacity-100 transition-all duration-300 px-5 py-2 font-quicksand font-medium flex items-center gap-1 group shadow-sm" aria-label="Voir nos flash tattoos disponibles">
          Flash
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        

      </nav>
      
      <!-- Navigation mobile avec scroll horizontal -->
      <div class="md:hidden flex-1 mx-4">
        <nav class="overflow-x-auto scrollbar-hide">
          <div class="flex space-x-6 min-w-max px-2 py-2">
            <a href="/#home" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Accueil
            </a>
            <a href="/#about" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              À propos
            </a>
            <a href="/#services" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Services
            </a>
            <a href="/#gallery" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Galerie
            </a>
            <a href="/flash" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Flash
            </a>
            <a href="/#process" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Processus
            </a>
            <a href="/#contact" class="nav-link-mobile text-gray-800 hover:text-forest whitespace-nowrap font-medium transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </div>

  </header>
  
  <main class="flex-grow pt-16">
    <slot />
  </main>
  
  {#if showBookingButton}
    <div class="fixed bottom-8 right-8 z-40" transition:fade={{ duration: 300 }}>
    <a 
      href="/#contact" 
      class="booking-btn group flex items-center justify-center overflow-hidden relative p-5">
      
      <!-- Élément décoratif organique en arrière-plan -->
      <div class="absolute inset-0 opacity-60 pointer-events-none">
        <OrganicShape 
          type="blob1" 
          fill="#2d6a4f" 
          width="100%" 
          height="100%" 
          opacity={1} 
        />
      </div>
      
      <!-- Fond du bouton avec dégradé -->
      <div class="booking-btn-bg absolute w-full h-full rounded-lg transform transition-transform duration-500 ease-out"></div>
      
      <!-- Ombre du bouton (motion quand hover) -->
      <div class="absolute -bottom-2 left-0 right-0 h-4 bg-black opacity-10 blur-md rounded-full mx-4 group-hover:-bottom-1 transition-all duration-300"></div>
      
      <!-- Contenu principal -->
      <div class="booking-btn-content flex items-center z-10 relative">
        <!-- Image de feuille Monstera avec animation subtile -->
        <img 
          src="/img/monstera.png" 
          alt="Feuille Monstera" 
          class="booking-icon mr-3 transform -rotate-3 group-hover:rotate-3 transition-all duration-1000" 
        />
        
        <!-- Texte avec police d'origine -->
        <span class="font-title font-medium tracking-wide text-shadow text-white">Prendre RDV</span>
      </div>
    </a>
    </div>
  {/if}
  
  <!-- Footer avec style wabi-sabi -->
  <footer class="relative overflow-hidden">

    <!-- Arrière-plan avec motif subtil -->
    <div class="bg-gray-50 pt-16 pb-24 md:pb-10 relative border-t border-gray-100 texture-paper">
      <!-- Formes organiques décoratives -->
      <div class="absolute -right-32 -top-32 w-64 h-64 opacity-5 pointer-events-none">
        <OrganicShape type="blob3" fill="#2d6a4f" width="100%" height="100%" opacity={0.3} />
      </div>
      <div class="absolute left-10 bottom-20 w-32 h-32 opacity-5 pointer-events-none">
        <OrganicShape type="blob1" fill="#40916c" width="100%" height="100%" opacity={0.4} />
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 diagonal-layout">
          <!-- Colonne 1 - Logo et description -->
          <div class="transform -rotate-1">
            <div class="mb-5 logo-container">
              <img src="/img/Logo.png" alt="Delco Ink Logo" class="h-10" />
            </div>
            <p class="text-gray-600 font-quicksand">Studio privé de tatouage à Cognin</p>
            <p class="text-gray-600 font-quicksand">Blackwork illustratif & Pop-Culture</p>
          </div>
          
          <!-- Colonne 2 - Contact avec éléments décalés -->
          <div class="md:translate-y-2">
            <h4 class="font-satisfy text-2xl mb-4 text-forest">Contact</h4>
            <div class="flex items-start mb-2">
              <div class="mr-2 opacity-60 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="-3 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-gray-600 font-quicksand">19 Av. Général Cartier, 73160 Cognin</p>
            </div>
            <div class="flex items-start pl-1">
              <div class="mr-2 opacity-60 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="2 0 24 20" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-gray-600 font-quicksand">contact@delco-ink.fr</p>
            </div>
          </div>
          
          <!-- Colonne 3 - Réseaux sociaux avec éléments artistiques -->
          <div class="-rotate-1 md:translate-y-1">
            <h4 class="font-satisfy text-2xl mb-5 text-forest">Retrouvez moi sur mes réseaux !</h4>


            <div class="flex space-x-6">
              <a href="https://www.instagram.com/delco_ink/?hl=fr" target="_blank" rel="noopener noreferrer" 
                 class="text-gray-700 hover:text-forest transition-all transform hover:scale-110 hover:rotate-3 duration-300 organic-button p-3" 
                 aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/delcoink" target="_blank" rel="noopener noreferrer" 
                 class="text-gray-700 hover:text-forest transition-all transform hover:scale-110 hover:rotate-3 duration-300 organic-button p-3" 
                 aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                
              </a>
              <span class="text-sm pt-3 text-gray-600"> Tatoueur à Chambéry <a href="/#contact" class="text-forest underline"> prendre rendez-vous</a></span>
            </div>
          </div>
        </div>
        
        <!-- Copyright avec design organique -->
        <div class="mt-10 pt-8 border-t border-gray-200 text-center text-gray-500 relative">

          
          <p class="font-quicksand">&copy; {new Date().getFullYear()} Delco Ink. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  </footer>
</div>
