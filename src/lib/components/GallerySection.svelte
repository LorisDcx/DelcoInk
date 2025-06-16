<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // Interface pour les images de la galerie
  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
    description?: string;
  }
  
  let selectedImage: GalleryImage | null = null;
  let hoveredImageId: number | null = null;
  let gallery: HTMLElement;
  let titleElement: HTMLElement;
  let galleryItems: HTMLElement[] = [];
  let isMobile = false;
  
  // Liste des images de la galerie avec descriptions détaillées pour SEO
  const images: GalleryImage[] = [
    { 
      id: 1, 
      src: '/images/gallery/tattoo-1.jpg', 
      alt: 'Tatouage blackwork géométrique créé par Loris à Delco Ink Studio Chambéry', 
      category: 'blackwork',
      description: 'Lignes fines et précises, design géométrique minimaliste'
    },
    { 
      id: 2, 
      src: '/images/gallery/tattoo-2.jpg', 
      alt: 'Tatouage pop-culture inspiré manga réalisé à Delco Ink Chambéry', 
      category: 'popculture',
      description: 'Style japonais contemporain avec influences manga'
    },
    { 
      id: 3, 
      src: '/images/gallery/tattoo-3.jpg', 
      alt: 'Tatouage flash botanique disponible au studio Delco Ink', 
      category: 'flash',
      description: 'Design exclusif floral, disponible en studio'
    },
    { 
      id: 4, 
      src: '/images/gallery/tattoo-4.jpg', 
      alt: 'Tatouage blackwork minimaliste avec ombrage profond', 
      category: 'blackwork',
      description: 'Technique dotwork, contrastes profonds'
    },
    { 
      id: 5, 
      src: '/images/gallery/tattoo-5.jpg', 
      alt: 'Tatouage pop-culture cinématographique avec détails fins', 
      category: 'popculture',
      description: 'Hommage à l\'univers cinématographique, création originale'
    },
    { 
      id: 6, 
      src: '/images/gallery/tattoo-6.jpg', 
      alt: 'Tatouage flash géométrique moderne disponible à Delco Ink', 
      category: 'flash',
      description: 'Design exclusif avec motifs abstraits et géométriques'
    },
    { 
      id: 7, 
      src: '/images/gallery/tattoo-7.jpg', 
      alt: 'Tatouage blackwork illustratif style gravure', 
      category: 'blackwork',
      description: 'Travail de précision, style gravure ancienne'
    },
    { 
      id: 8, 
      src: '/images/gallery/tattoo-8.jpg', 
      alt: 'Tatouage pop-culture inspiré jeux vidéo', 
      category: 'popculture',
      description: 'Création artistique unique inspirée du monde du gaming'
    }
  ];
  
  // Gestion du hover pour l'affichage des détails
  function handleMouseEnter(id: number) {
    hoveredImageId = id;
  }
  
  function handleMouseLeave() {
    hoveredImageId = null;
  }
  
  function openLightbox(image: GalleryImage) {
    selectedImage = image;
    document.body.classList.add('overflow-hidden');
  }
  
  function closeLightbox() {
    selectedImage = null;
    document.body.classList.remove('overflow-hidden');
  }
  
  // Swipe pour le mode mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  function checkSwipeDirection() {
    if (touchEndX < touchStartX) {
      // Swipe gauche (suivant)
      navigateGallery('next');
    } else if (touchEndX > touchStartX) {
      // Swipe droit (précédent)
      navigateGallery('prev');
    }
  }
  
  function navigateGallery(direction: 'next' | 'prev') {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage?.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    selectedImage = filteredImages[newIndex];
  }
  
  // Filtre par catégories
  let activeFilter = 'all';
  let previousFilter = 'all';
  let isTransitioning = false;
  
  // Les images à afficher
  let filteredImages = images;
  
  // Fonction pour changer de filtre avec animation
  function changeFilter(newFilter: string) {
    if (newFilter === activeFilter || isTransitioning) return;
    
    isTransitioning = true;
    previousFilter = activeFilter;
    activeFilter = newFilter;
    
    // Animation de disparition
    const galleryItemElements = document.querySelectorAll('.gallery-item');
    
    gsap.to(galleryItemElements, {
      opacity: 0,
      scale: 0.95,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // Mettre à jour les images filtrées
        filteredImages = activeFilter === 'all' 
          ? images 
          : images.filter((img: GalleryImage) => img.category === activeFilter);
        
        // Laisser le temps au DOM de se mettre à jour
        setTimeout(() => {
          // Animation d'apparition
          const newGalleryItems = document.querySelectorAll('.gallery-item');
          gsap.fromTo(newGalleryItems, 
            { opacity: 0, scale: 0.95 },
            { 
              opacity: 1, 
              scale: 1,
              stagger: 0.05,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "scale",
              onComplete: () => {
                isTransitioning = false;
              }
            }
          );
        }, 50);
      }
    });
  }
  
  // Type pour le resizeObserver
  let resizeObserver: ResizeObserver;
    
  onMount(() => {
    // Animations des éléments de titre
    if (titleElement) {
      gsap.from(titleElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
    }
    
    // Ajouter un écouteur pour l'événement personnalisé set-gallery-filter
    window.addEventListener('set-gallery-filter', (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent && customEvent.detail) {
        // Mettre à jour le filtre actif et faire défiler vers la section galerie
        activeFilter = customEvent.detail;
        
        // S'assurer que la section est visible
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    
    // Animation des éléments de galerie
    function animateGalleryItems() {
      if (galleryItems.length) {
        gsap.fromTo(galleryItems, 
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }
        );
      }
    }
    
    // Simple masonry layout 
    if (typeof window !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (!gallery) return;
        
        // Apply masonry layout using CSS grid
        const gridItems = gallery.querySelectorAll('.gallery-item');
        if (gridItems.length > 0 && window.innerWidth >= 768) {
          const rowHeight = parseInt(getComputedStyle(gridItems[0]).gridAutoRows);
          const rowGap = parseInt(getComputedStyle(gridItems[0]).gridRowGap);
          
          gridItems.forEach((item: Element) => {
            const content = item.querySelector('.gallery-item-content');
            if (content) {
              const rowSpan = Math.ceil(
                (content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
              );
              (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
            }
          });
        }
      });
      
      if (gallery) {
        resizeObserver.observe(gallery);
        animateGalleryItems();
      }
      
      return () => {
        if (gallery && resizeObserver) {
          resizeObserver.unobserve(gallery);
        }
        
        // Nettoyer l'écouteur d'événements
        window.removeEventListener('set-gallery-filter', (e: Event) => {});
      };
    }
  });
</script>

<section id="gallery" class="py-24 bg-white scroll-mt-20 relative">
  <!-- Éléments décoratifs en fond -->
  <div class="absolute opacity-5 -right-20 top-10 w-64 h-64 rounded-full border-8 border-prune"></div>
  <div class="absolute opacity-5 -left-10 bottom-10 w-96 h-96 rounded-full border-4 border-forest"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-6 uppercase relative inline-block text-gray-900 font-title">
        Galerie
      </h2>
      <div class="relative max-w-3xl mx-auto mb-16">
        <div class="absolute inset-0 bg-gradient-to-r from-prune/10 via-forest/10 to-prune/10 transform -skew-y-1 rounded-lg"></div>
        <p class="relative text-center py-4 px-6 text-gray-800 text-lg md:text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
          Découvrez mes créations les plus récentes et laissez-vous inspirer pour votre prochain tatouage
        </p>
      </div>
    </div>
    
    <!-- Filter Buttons avec effet hover moderne -->
    <div class="flex flex-wrap justify-center mb-16 gap-4">
      <button 
        class="px-5 py-2 rounded-full text-sm uppercase font-title tracking-wider transition-all duration-300
               {activeFilter === 'all' ? 'bg-prune text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:border-prune hover:text-prune'}"
        on:click={() => changeFilter('all')}
        disabled={isTransitioning}
      >
        Tous les styles
      </button>
      <button 
        class="px-5 py-2 rounded-full text-sm uppercase font-title tracking-wider transition-all duration-300
               {activeFilter === 'blackwork' ? 'bg-prune text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:border-prune hover:text-prune'}"
        on:click={() => changeFilter('blackwork')}
        disabled={isTransitioning}
      >
        Blackwork
      </button>
      <button 
        class="px-5 py-2 rounded-full text-sm uppercase font-title tracking-wider transition-all duration-300
               {activeFilter === 'popculture' ? 'bg-prune text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:border-prune hover:text-prune'}"
        on:click={() => changeFilter('popculture')}
        disabled={isTransitioning}
      >
        Pop-Culture
      </button>
      <button 
        class="px-5 py-2 rounded-full text-sm uppercase font-title tracking-wider transition-all duration-300
               {activeFilter === 'flash' ? 'bg-prune text-white shadow-md' : 'bg-white border border-gray-300 text-gray-700 hover:border-prune hover:text-prune'}"
        on:click={() => changeFilter('flash')}
        disabled={isTransitioning}
      >
        Flash
      </button>
    </div>
    
    <!-- Gallery avec design moderne -->
    <div 
      bind:this={gallery}
      class="gallery-masonry grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {#each filteredImages as image, i}
        <!-- Carte image avec effet d'élévation au hover -->
        <div 
          class="gallery-item overflow-hidden cursor-pointer relative group rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          bind:this={galleryItems[i]}
          on:mouseenter={() => handleMouseEnter(image.id)}
          on:mouseleave={handleMouseLeave}
          role="button"
          tabindex="0"
          on:click={() => openLightbox(image)}
          on:keydown={(e) => e.key === 'Enter' && openLightbox(image)}
          aria-label={`Voir l'image: ${image.alt}`}
        >
          <div class="aspect-square relative">
            <img 
              src={image.src} 
              alt={image.alt} 
              class="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <!-- Overlay avec info détaillée -->
            <div class="absolute inset-0 bg-gradient-to-t from-prune to-transparent opacity-0 group-hover:opacity-90 transition-all duration-300 flex flex-col justify-end p-4">
              <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-white font-title uppercase tracking-wider text-sm mb-1">{image.category}</p>
                <p class="text-white text-base font-light">{image.description}</p>
              </div>
            </div>
            
            <!-- Badge catégorie -->
            <div class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs uppercase text-prune font-title tracking-wider shadow-sm">
              {image.category}
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Bouton d'appel à l'action pour la page Flash -->
    <div class="text-center mt-16">
      <a 
        href="/flash" 
        class="group inline-flex items-center bg-prune hover:bg-forest text-white py-3 px-8 rounded-full transition-all duration-300 uppercase font-title tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        <span>Découvrir les flash disponibles</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Lightbox modal moderne -->
{#if selectedImage}
  <div
    class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 tap-transparent"
    on:click|self={closeLightbox}
    on:keydown={(e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') navigateGallery('next');
      else if (e.key === 'ArrowLeft') navigateGallery('prev');
    }}
    on:touchstart={(e) => { touchStartX = e.touches[0].clientX; }}
    on:touchend={(e) => { 
      touchEndX = e.changedTouches[0].clientX;
      checkSwipeDirection();
    }}
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 150 }}
    tabindex="0"
    aria-modal="true"
    role="dialog"
  >
    <!-- Image avec transition douce entre les images -->
    <div class="w-full max-w-5xl max-h-[85vh] relative">
      {#key selectedImage.id}
        <div in:fade={{ duration: 200 }}>
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            class="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-2xl" 
          />
          
          <!-- Description de l'image -->
          <div class="bg-white bg-opacity-90 p-4 mt-4 rounded-lg max-w-lg mx-auto text-center">
            <p class="uppercase text-prune font-title tracking-wider text-sm">{selectedImage.category}</p>
            <p class="text-gray-800 mt-1">{selectedImage.description}</p>
          </div>
        </div>
      {/key}
    </div>
    
    <!-- Boutons navigation -->    
    <!-- Précédent -->
    <button 
      class="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-60 rounded-full p-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-prune hidden md:block"
      on:click={() => navigateGallery('prev')}
      aria-label="Image précédente"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- Suivant -->
    <button 
      class="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-60 rounded-full p-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-prune hidden md:block"
      on:click={() => navigateGallery('next')}
      aria-label="Image suivante"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    <!-- Bouton fermer -->
    <button 
      class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-60 rounded-full p-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-prune transform hover:rotate-90"
      on:click={closeLightbox}
      aria-label="Fermer la lightbox"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- Indicateur de swipe pour mobile -->
    <div class="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-60 md:hidden">
      <p>Glissez pour naviguer</p>
    </div>
  </div>
{/if}

<style>
  /* Pour une animation plus fluide, nous utilisons la transition CSS native plutôt que GSAP ici */
  .gallery-item {
    transition: transform 0.3s ease-out;
  }
  
  .gallery-item:hover {
    z-index: 10;
  }
</style>
