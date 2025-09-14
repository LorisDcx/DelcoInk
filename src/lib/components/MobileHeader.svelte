<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  
  let isMenuOpen = false;
  let isMobile = false;
  
  // Liste des rubriques du menu
  
  let currentPath = '';
  
  // Mettre à jour le chemin courant
  $: if (browser) {
    currentPath = window.location.pathname;
  }
  
  const menuItems = [
    { id: 'about', label: 'À Propos', href: '/#about' },
    { id: 'services', label: 'Services', href: '/#services' },
    { id: 'gallery', label: 'Galerie', href: '/#gallery' },
    { id: 'process', label: 'Processus', href: '/#process' },
    { id: 'contact', label: 'Contact', href: '/#contact' }
  ];
  
  const flashItem = { id: 'flash', label: 'Flash', href: '/flash' };
  
  // Définition du type pour les éléments de navigation
  interface NavItem {
    id: string;
    href: string | null;
  }

  // Fonction pour gérer la navigation
  function handleNavigation(item: NavItem) {
    if (!browser) return;
    
    // Fermer le menu
    isMenuOpen = false;
    document.body.classList.remove('menu-open');
    
    // Si c'est un lien externe ou une ancre
    if (item.href) {
      // Si on clique sur Flash depuis la page Flash, on ne fait rien
      if (window.location.pathname === item.href) return;
      
      // Si c'est un lien avec ancre (commençant par #)
      if (item.href.startsWith('#')) {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          // Ajustements spécifiques par section
          let sectionOffset = 20; // Marge par défaut
          const sectionId = item.href.substring(1);
          
          switch(sectionId) {
            case 'about':
              sectionOffset = 0; // La section about a déjà son propre padding
              break;
            case 'services':
              sectionOffset = 40; // Plus d'espace pour la section services
              break;
            case 'gallery':
              sectionOffset = 30; // Espace moyen pour la galerie
              break;
            case 'process':
              sectionOffset = 25; // Espace pour la section processus
              break;
            case 'contact':
              sectionOffset = 20; // Espace standard pour le contact
              break;
          }
          
          const offsetPosition = elementPosition - headerHeight - sectionOffset;
          
          window.scrollTo({
            top: Math.max(0, offsetPosition), // S'assurer qu'on ne dépasse pas le haut de la page
            behavior: 'smooth'
          });
          
          // Mettre à jour l'URL sans recharger la page
          history.pushState(null, '', `#${sectionId}`);
          return;
        }
      }
      
      // Pour les autres liens (comme /flash)
      window.location.href = item.href;
      return;
    }
    
    // Ancienne logique pour la navigation sur la même page
    requestAnimationFrame(() => {
      const element = document.getElementById(item.id);
      if (!element) return;
      
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  }
  
  // Gestion de l'ouverture/fermeture du menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (browser) {
      if (isMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }
  
  // Détection mobile et gestion des événements
  onMount(() => {
    if (browser) {
      // Détection initiale
      const checkMobile = () => {
        isMobile = window.innerWidth < 768;
        if (!isMobile) {
          isMenuOpen = false;
          document.body.classList.remove('menu-open');
        }
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
        document.body.classList.remove('menu-open');
      };
    }
  });
</script>

<header class="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <!-- Logo centré avec la police du site -->
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <a href="/" class="font-title text-gray-900 hover:text-green-800 transition-colors">
        DELCO INK
      </a>
    </div>
    
    <!-- Bouton menu burger -->
    <button 
      class="z-50 p-2 focus:outline-none text-gray-800 hover:text-green-800 transition-colors"
      on:click={toggleMenu}
      aria-label="Menu"
      aria-expanded={isMenuOpen}
      data-menu-open={isMenuOpen}
    >
      <div class="w-6 h-5 flex flex-col justify-between items-end">
        <span class="burger-line burger-line-1 block h-[2px] w-6 bg-current transition-all duration-300"></span>
        <span class="burger-line burger-line-2 block h-[2px] w-5 bg-current transition-all duration-300"></span>
        <span class="burger-line burger-line-3 block h-[2px] w-4 bg-current transition-all duration-300"></span>
      </div>
    </button>
    
    <!-- Menu déroulant -->
    <div 
      class="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out {isMenuOpen ? 'translate-x-0' : 'translate-x-full'}"
      style="height: calc(100vh - 4rem); top: 4rem;"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isMenuOpen}
    >
      <nav class="flex flex-col space-y-2 mt-8">
        {#each menuItems as item}
          <button 
            on:click={() => handleNavigation(item)}
            class="w-full text-3xl font-medium text-gray-900 py-4 px-4 text-right hover:bg-gray-50 rounded-lg transition-colors font-body"
          >
            {item.label}
          </button>
        {/each}
        
        <!-- Bouton Flash -->
        <div class="mt-4 mb-2 px-4">
          <button 
            on:click={() => handleNavigation(flashItem)}
            class="w-full text-3xl font-medium text-gray-900 py-4 px-4 text-right hover:bg-gray-50 rounded-lg transition-colors font-body {currentPath === '/flash' ? 'text-emerald-600' : ''}"
          >
            {flashItem.label}
          </button>
        </div>
        
        <!-- Bouton de contact -->
        <div class="mt-6 px-4">
          <button 
            class="w-full bg-black text-white px-6 py-3 text-sm sm:text-base rounded-full text-center font-medium hover:bg-gray-800 transition-colors font-display tracking-wide"
            on:click={() => handleNavigation({ id: 'contact', href: null })}
          >
            Prendre RDV
          </button>
        </div>
      </nav>
    </div>
  </div>
</header>

<!-- Espace pour le header fixe (supprimé pour éliminer l'espace) -->
<div class="h-0"></div>

<style>
  /* Empêcher le défilement du body quand le menu est ouvert */
  :global(body.menu-open) {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  
  /* Animation du bouton burger */
  [data-menu-open="true"] .burger-line-1 {
    transform: translateY(6px) rotate(45deg);
    width: 24px;
  }
  
  [data-menu-open="true"] .burger-line-2 {
    opacity: 0;
    transform: translateX(10px);
  }
  
  [data-menu-open="true"] .burger-line-3 {
    transform: translateY(-6px) rotate(-45deg);
    width: 24px;
  }
  
  /* Polices personnalisées */
  .font-title {
    font-family: 'Caveat Brush', cursive;
    font-size: 2rem;
    letter-spacing: 1px;
    line-height: 1.1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .font-display, .font-body {
    font-family: 'Caveat Brush', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
