<script>
  import '../app.css';
  import { fade, slide, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let mobileMenuOpen = false;
  let scrolled = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Fonction pour gérer le scroll et l'apparence du header
  function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      scrolled = true;
    } else {
      scrolled = false;
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="flex flex-col min-h-screen texture-overlay">
  <header class={`py-4 fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm ${scrolled ? 'scrolled' : ''}`} id="main-header">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <a href="/" class="flex items-center pl-0 md:pl-0">
          <img src="/img/Logo.png" alt="Delco Ink Logo" class="h-12" />
        </a>
        <div class="hidden md:block">
          <p class="text-gray-700 font-medium text-sm tracking-wide">Tattoo Shop Chambéry - <span class="italic">Illustrative Blackwork</span></p>
          <p class="text-forest text-xs font-medium">Salon privé - Sur rendez-vous uniquement</p>
        </div>
      </div>
      <nav class="hidden md:flex space-x-8 items-center">
        <a href="/#about" class="text-gray-800 hover:text-forest transition-colors font-body">À propos</a>
        <a href="/#services" class="text-gray-800 hover:text-forest transition-colors font-body">Styles</a>
        <a href="/#gallery" class="text-gray-800 hover:text-forest transition-colors font-body">Galerie</a>
        <a href="/#contact" class="text-gray-800 hover:text-forest transition-colors font-body">Contact</a>
        <a href="/flash" class="bg-forest text-white hover:bg-opacity-90 transition-colors rounded-md px-4 py-1 font-body font-medium flex items-center gap-1" aria-label="Voir nos flash tattoos disponibles">
          Flash
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </nav>
      <button class="md:hidden" aria-label="Menu" on:click={toggleMobileMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Menu mobile - Overlay et panneau avec transitions optimisées -->
    {#if mobileMenuOpen}
      <!-- Fond opaque avec transition fade - priorité de chargement élevée -->
      <div 
        transition:fade={{ duration: 150, delay: 0 }} 
        class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 tap-transparent" 
        on:click|self={toggleMobileMenu}
        on:keydown|self={e => e.key === 'Escape' && toggleMobileMenu()}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        tabindex="-1">
        <!-- Panneau latéral avec transition fly - animation synchronisée -->
        <div 
          transition:fly={{ duration: 200, x: 100, easing: cubicOut, opacity: 1 }}
          class="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-5">
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-900 font-title text-xl">Menu</p>
            <button class="text-gray-500 hover:text-gray-800" on:click={toggleMobileMenu} aria-label="Fermer le menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="flex flex-col space-y-4">
            <a href="/#about" class="text-gray-800 hover:text-forest transition-colors font-body py-2 border-b border-gray-100" on:click={toggleMobileMenu}>À propos</a>
            <a href="/#services" class="text-gray-800 hover:text-forest transition-colors font-body py-2 border-b border-gray-100" on:click={toggleMobileMenu}>Styles</a>
            <a href="/#gallery" class="text-gray-800 hover:text-forest transition-colors font-body py-2 border-b border-gray-100" on:click={toggleMobileMenu}>Galerie</a>
            <a href="/#contact" class="text-gray-800 hover:text-forest transition-colors font-body py-2 border-b border-gray-100" on:click={toggleMobileMenu}>Contact</a>
            <a href="/flash" class="bg-forest text-white hover:bg-opacity-90 transition-colors rounded-md px-4 py-2 font-body font-medium flex items-center gap-1 mt-2" on:click={toggleMobileMenu}>
              Flash
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    {/if}
  </header>
  
  <main class="flex-grow pt-16">
    <slot />
  </main>
  
  <div class="fixed bottom-8 right-8 z-40">
    <a 
      href="/#contact" 
      class="booking-btn group flex items-center justify-center overflow-hidden relative">
      
      <!-- Fond du bouton avec dégradé -->
      <div class="booking-btn-bg absolute w-full h-full rounded-lg transform transition-transform duration-500 ease-out"></div>
      
      <!-- Contenu principal -->
      <div class="booking-btn-content flex items-center z-10 relative">
        <!-- Image de feuille Monstera depuis le dossier static -->
        <img src="/img/monstera.png" alt="Feuille Monstera" class="booking-icon mr-3" />
        
        <!-- Texte -->
        <span class="font-title font-medium tracking-wide text-shadow text-white">Prendre RDV</span>
      </div>
    </a>
  </div>
  
  <footer class="bg-gray-50 py-10 pb-24 md:pb-10 relative border-t border-gray-100 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="mb-4">
            <img src="/img/Logo.png" alt="Delco Ink Logo" class="h-10" />
          </div>
          <p class="text-gray-600">Studio privé de tatouage à Chambéry</p>
          <p class="text-gray-600">Blackwork illustratif & Pop-Culture</p>
        </div>
        <div>
          <h4 class="font-title text-xl mb-4 text-gray-900">Contact</h4>
          <p class="text-gray-600">171 avenue de Lyon, 73000 Chambéry, France</p>
          <p class="text-gray-600">contact@delco-ink.com</p>
        </div>
        <div>
          <h4 class="font-title text-xl mb-4 text-gray-900">Suivez-nous</h4>
          <div class="flex space-x-4">
            <a href="https://www.instagram.com/delco_ink/?hl=fr" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-forest transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/delcoink" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-forest transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Delco Ink. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</div>
