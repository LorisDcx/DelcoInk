<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  // Interface pour les images de la galerie
  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
  }
  
  let selectedImage: GalleryImage | null = null;
  let gallery: HTMLElement;
  let titleElement: HTMLElement;
  let galleryItems: HTMLElement[] = [];
  
  // Liste des images de la galerie (à remplacer par les vraies images)
  const images: GalleryImage[] = [
    { id: 1, src: '/images/gallery/tattoo-1.jpg', alt: 'Tatouage blackwork', category: 'blackwork' },
    { id: 2, src: '/images/gallery/tattoo-2.jpg', alt: 'Tatouage pop-culture', category: 'popculture' },
    { id: 3, src: '/images/gallery/tattoo-3.jpg', alt: 'Tatouage flash', category: 'flash' },
    { id: 4, src: '/images/gallery/tattoo-4.jpg', alt: 'Tatouage blackwork', category: 'blackwork' },
    { id: 5, src: '/images/gallery/tattoo-5.jpg', alt: 'Tatouage pop-culture', category: 'popculture' },
    { id: 6, src: '/images/gallery/tattoo-6.jpg', alt: 'Tatouage flash', category: 'flash' },
    { id: 7, src: '/images/gallery/tattoo-7.jpg', alt: 'Tatouage blackwork', category: 'blackwork' },
    { id: 8, src: '/images/gallery/tattoo-8.jpg', alt: 'Tatouage pop-culture', category: 'popculture' }
  ];
  
  function openLightbox(image: GalleryImage) {
    selectedImage = image;
    document.body.classList.add('overflow-hidden');
  }
  
  function closeLightbox() {
    selectedImage = null;
    document.body.classList.remove('overflow-hidden');
  }
  
  // Filtre par catégories
  let activeFilter = 'all';
  let previousFilter = 'all';
  let isTransitioning = false;
  
  // Interface pour les images de la galerie
  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
  }
  
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

<section id="gallery" class="py-24 bg-white scroll-mt-20">
  <div class="container mx-auto px-4">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">
        Galerie
      </h2>
    </div>
    
    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center mb-12">
      <button 
        class="px-4 py-2 m-2 text-sm uppercase font-title tracking-wider transition-colors {activeFilter === 'all' ? 'text-forest border-b-2 border-forest' : 'text-gray-700 hover:text-forest'}"
        on:click={() => changeFilter('all')}
        disabled={isTransitioning}
      >
        Tous
      </button>
      <button 
        class="px-4 py-2 m-2 text-sm uppercase font-title tracking-wider transition-colors {activeFilter === 'blackwork' ? 'text-forest border-b-2 border-forest' : 'text-gray-700 hover:text-forest'}"
        on:click={() => changeFilter('blackwork')}
        disabled={isTransitioning}
      >
        Blackwork
      </button>
      <button 
        class="px-4 py-2 m-2 text-sm uppercase font-title tracking-wider transition-colors {activeFilter === 'popculture' ? 'text-forest border-b-2 border-forest' : 'text-gray-700 hover:text-forest'}"
        on:click={() => changeFilter('popculture')}
        disabled={isTransitioning}
      >
        Pop-Culture
      </button>
      <button 
        class="px-4 py-2 m-2 text-sm uppercase font-title tracking-wider transition-colors {activeFilter === 'flash' ? 'text-forest border-b-2 border-forest' : 'text-gray-700 hover:text-forest'}"
        on:click={() => changeFilter('flash')}
        disabled={isTransitioning}
      >
        Flash
      </button>
    </div>
    
    <!-- Gallery Grid with square photos -->
    <div 
      bind:this={gallery}
      class="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {#each filteredImages as image, i}
        <button 
          class="gallery-item overflow-hidden cursor-pointer relative group aspect-square block w-full"
          bind:this={galleryItems[i]}
          on:click={() => openLightbox(image)}
          on:keydown={(e) => e.key === 'Enter' && openLightbox(image)}
          aria-label={`Voir l'image: ${image.alt}`}
        >
          <div class="gallery-item-content h-full w-full">
            <img 
              src={image.src} 
              alt={image.alt} 
              class="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-forest bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span class="bg-white bg-opacity-90 px-4 py-2 rounded-md shadow-sm text-gray-900 font-title uppercase tracking-wider text-lg">
                Voir
              </span>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
{#if selectedImage}
  <div 
    class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    on:click={closeLightbox}
    on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="lightbox-title"
    tabindex="0"
  >
    <div 
      class="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
      on:click|stopPropagation={() => {}}
    >
      <button 
        class="absolute top-4 right-4 z-10 text-white hover:text-vivid"
        on:click={closeLightbox}
        aria-label="Fermer la galerie"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <img 
        src={selectedImage.src} 
        alt={selectedImage.alt} 
        class="max-h-[80vh] mx-auto object-contain"
        id="lightbox-title"
      />
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
