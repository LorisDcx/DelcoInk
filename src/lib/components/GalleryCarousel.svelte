<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { fade, fly, scale } from 'svelte/transition';
  import { loadDynamicImages, organizeImages, type GalleryImage } from '$lib/utils/imageLoader';
  import BrushStroke from './decorative/BrushStroke.svelte';
  
  // Déclaration pour GSAP
  let gsap: any;
  let gsapLoaded = false;
  
  // ResizeObserver pour le carrousel
  let resizeObserver: ResizeObserver | undefined;
  
  // Références DOM
  let carouselContainer: HTMLElement | null = null;
  let carouselTrack: HTMLElement | null = null;
  let filterButtons: HTMLElement | null = null;
  
  // Variables pour la lightbox
  let currentImageIndex = 0;
  let isLightboxOpen = false;
  
  // Variables pour le carrousel wabi-sabi
  let activeFilter = 'all';
  let autoScrollInterval: ReturnType<typeof setInterval> | undefined;
  let isDragging = false;
  let isTransitioning = false;
  let scrollPosition = 0;
  let scrollSpeed = 0.8; // Vitesse du défilement
  
  // Variables pour le drag/swipe
  let startX = 0;
  let scrollLeft = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Liste des images de la galerie
  let images: GalleryImage[] = [];
  let filteredImages: GalleryImage[] = [];

  // Fonction pour ouvrir la lightbox
  function openLightbox(index: number) {
    currentImageIndex = index;
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Bloquer le scroll du body
    stopAutoScroll(); // Arrêter le défilement automatique
  }
  
  // Fonction pour fermer la lightbox
  function closeLightbox() {
    isLightboxOpen = false;
    document.body.style.overflow = '';
    if (!isDragging) {
      initAutoScroll();
    }
  }
  
  // Navigation dans la lightbox
  function navigateLightbox(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    } else {
      currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    }
  }
  
  // Gestion des swipes
  function checkSwipeDirection() {
    if (touchEndX < touchStartX - 50) { // Seuil de 50px pour éviter les micro-swipes
      navigateLightbox('next');
    } else if (touchEndX > touchStartX + 50) {
      navigateLightbox('prev');
    }
  }
  
  // Fonctions de défilement automatique du carrousel
  function initAutoScroll() {
    stopAutoScroll(); // S'assurer qu'il n'y a pas d'animation en cours
    scrollSpeed = 0.8; // Vitesse du défilement automatique
    autoScrollInterval = setInterval(animateCarousel, 16); // ~60fps
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = undefined;
    }
  }
  
  // Fonction pour gérer le défilement à la molette de souris
  function handleWheel(e: WheelEvent) {
    e.preventDefault(); // Empêcher le défilement de la page
    
    // Définir la vitesse de défilement
    const scrollSpeed = 25;
    
    // Défilement horizontal basé sur le défilement vertical de la molette
    scrollPosition += e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    
    // Obtenir les éléments originaux (sans les clones)
    if (carouselTrack) {
      const originalItems = carouselTrack.querySelectorAll('.carousel-item:not(.clone-item)');
      if (originalItems.length) {
        const firstItem = originalItems[0] as HTMLElement;
        const itemWidth = firstItem.offsetWidth + 20;
        
        // Assurer que le défilement reste dans les limites
        const maxScroll = itemWidth * originalItems.length;
        
        // Logique de bornage pour éviter le dépassement des limites
        if (scrollPosition < 0) scrollPosition = 0;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        
        // Appliquer le déplacement
        carouselTrack.style.transform = `translateX(${-scrollPosition}px)`;
      }
    }
  }
  
  // Animation fluide du défilement infini sans couture avec boucle parfaite
  function animateCarousel() {
    if (!carouselTrack) return;
    
    // Avancer la position de défilement
    scrollPosition += scrollSpeed;
    
    // Obtenir les éléments originaux (sans les clones)
    const originalItems = carouselTrack.querySelectorAll('.carousel-item:not(.clone-item)');
    if (!originalItems.length) return;
    
    // Cast de l'élément au type HTMLElement pour accéder à offsetWidth
    const firstItem = originalItems[0] as HTMLElement;
    const itemWidth = firstItem.offsetWidth + 40; // 40px pour les marges (20px de chaque côté)
    
    // Déterminer le point de reset (quand on a défilé tous les éléments originaux)
    const resetPoint = itemWidth * originalItems.length;
    
    // Logique de carrousel infini en boucle parfaite
    if (scrollPosition >= resetPoint) {
      // Reset instantané au début pour créer l'effet de portail
      scrollPosition = 0;
    } else if (scrollPosition < 0) {
      // Si on va en arrière, aller à la fin
      scrollPosition = resetPoint - scrollSpeed;
    }
    
    // Appliquer la position avec transformation
    carouselTrack.style.transform = `translateX(${-scrollPosition}px)`;
  }
  
  // Chargement et filtrage des images
  function handleFilterChange(filter: string) {
    // Ne rien faire si on clique sur le filtre déjà actif
    if (filter === activeFilter) return;
    
    // Activer la transition visuelle
    isTransitioning = true;
    setTimeout(() => {
      // Changer le filtre actif
      activeFilter = filter;
      
      // Filtrer les images selon la catégorie sélectionnée
      filterImages(filter);
      
      // Désactiver la transition après un court délai
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }, 150);
  }
  
  function filterImages(filter: string) {
    if (filter === 'all') {
      filteredImages = [...images];
    } else {
      filteredImages = images.filter(image => image.category === filter);
    }
  }
  
  function initInfiniteCarousel() {
    // Initialiser le filtrage avec toutes les images
    filterImages(activeFilter);
    
    // Démarrer le défilement automatique
    initAutoScroll();
  }
  
  // Gestion des événements de glisser-déposer (drag)
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    startX = e.pageX - (carouselTrack?.offsetLeft || 0);
    scrollLeft = scrollPosition;
    
    // Changer le curseur pour indiquer le déplacement
    if (carouselTrack) {
      carouselTrack.style.cursor = 'grabbing';
    }
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselTrack?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Vitesse du déplacement
    scrollPosition = scrollLeft - walk;
    
    // Obtenir les éléments originaux (sans les clones)
    if (carouselTrack) {
      const originalItems = carouselTrack.querySelectorAll('.carousel-item:not(.clone-item)');
      if (originalItems.length) {
        const firstItem = originalItems[0] as HTMLElement;
        const itemWidth = firstItem.offsetWidth + 20;
        
        // Assurer que le défilement reste dans les limites
        const maxScroll = itemWidth * originalItems.length;
        
        // Logique de bornage pour éviter le dépassement des limites
        if (scrollPosition < 0) scrollPosition = 0;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        
        carouselTrack.style.transform = `translateX(${-scrollPosition}px)`;
      }
    }
  }
  
  function handleMouseUp() {
    isDragging = false;
    
    // Restaurer le curseur normal
    if (carouselTrack) {
      carouselTrack.style.cursor = 'grab';
    }
    
    // Redémarrer le défilement automatique après un court délai
    setTimeout(() => {
      if (!isLightboxOpen) {
        initAutoScroll();
      }
    }, 2000);
  }
  
  // Gestion des événements tactiles pour mobile
  function handleTouchStart(e: TouchEvent) {
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    startX = touchStartX - (carouselTrack?.offsetLeft || 0);
    scrollLeft = scrollPosition;
    stopAutoScroll();
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    e.preventDefault(); // Empêcher le comportement par défaut (défilement de la page)
    const touchX = e.touches[0].clientX;
    touchEndX = touchX;
    const x = touchX - (carouselTrack?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollPosition = scrollLeft - walk;
    
    // Obtenir les éléments originaux (sans les clones)
    if (carouselTrack) {
      const originalItems = carouselTrack.querySelectorAll('.carousel-item:not(.clone-item)');
      if (originalItems.length) {
        const firstItem = originalItems[0] as HTMLElement;
        const itemWidth = firstItem.offsetWidth + 20;
        
        // Assurer que le défilement reste dans les limites
        const maxScroll = itemWidth * originalItems.length;
        
        // Logique de bornage pour éviter le dépassement des limites
        if (scrollPosition < 0) scrollPosition = 0;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        
        carouselTrack.style.transform = `translateX(${-scrollPosition}px)`;
      }
    }
  }
  
  function handleTouchEnd() {
    isDragging = false;
    
    // Redémarrer le défilement automatique après un court délai
    setTimeout(() => {
      if (!isLightboxOpen) {
        initAutoScroll();
      }
    }, 2000);
  }
  
  // Initialisation au montage du composant
  onMount(async () => {
    // Charger les images dynamiquement
    const loadedImages = await organizeImages();
    images = [...loadedImages];
    filteredImages = [...images];
    
    // Initialiser GSAP côté client
    if (browser) {
      // Charger GSAP dynamiquement en client-side
      import('gsap').then((module) => {
        gsap = module.default;
        gsapLoaded = true;
      });
      
      // Initialiser le carrousel avec événement wheel pour défilement à la souris
      if (carouselTrack && browser) {
        // Ajouter l'événement de défilement à la molette
        carouselTrack.addEventListener('wheel', handleWheel, { passive: false });
        // Configurer les gestionnaires d'événements pour drag/touch - uniquement côté client
        carouselContainer?.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        carouselContainer?.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        
        // Créer un ResizeObserver pour ajuster le carrousel au redimensionnement - uniquement côté client
        if (!resizeObserver && browser) {
          resizeObserver = new ResizeObserver(() => {
            if (carouselTrack) {
              // Recalculer les dimensions du carrousel si nécessaire
              initInfiniteCarousel();
            }
          });
          
          // Observer le conteneur du carrousel
          if (carouselContainer) {
            resizeObserver.observe(carouselContainer);
          }
        }
        
        await initInfiniteCarousel();
        // Démarrer le défilement automatique
        initAutoScroll();
      }
    }
  });

  onDestroy(() => {
    // Nettoyage des gestionnaires d'événements
    if (browser) {
      carouselContainer?.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      carouselContainer?.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Supprimer l'événement wheel
      carouselTrack?.removeEventListener('wheel', handleWheel);
      
      // Arrêter le défilement automatique
      stopAutoScroll();
      
      // Nettoyer l'observateur de redimensionnement
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    }
  });
</script>

<section id="gallery" class="gallery-section">
  <div class="section-title">

    <div class="relative inline-block">
      <h2>
        <span class="absolute -right-8 -top-6 text-base opacity-50 rotate-12 text-forest">木漏れ日</span>
        Galerie
      </h2>
    </div>
  </div>
  
  <!-- Filtres par catégorie -->
  <div class="filters" bind:this={filterButtons}>
    <button 
      class="filter-btn {activeFilter === 'all' ? 'active' : ''}" 
      on:click={() => handleFilterChange('all')}
    >
      Tous
    </button>
    <button 
      class="filter-btn {activeFilter === 'blackwork' ? 'active' : ''}" 
      on:click={() => handleFilterChange('blackwork')}
    >
      Blackwork
    </button>
    <button 
      class="filter-btn {activeFilter === 'popculture' ? 'active' : ''}" 
      on:click={() => handleFilterChange('popculture')}
    >
      Pop Culture
    </button>
    <button 
      class="filter-btn {activeFilter === 'flash' ? 'active' : ''}" 
      on:click={() => handleFilterChange('flash')}
    >
      Flash
    </button>
  </div>
  
  <!-- Carrousel incliné style wabi-sabi avec effet infini -->
  <div class="carousel-container">
    <div class="carousel-track" bind:this={carouselTrack}>
      <!-- Affichage des images originales -->
      {#each filteredImages as image, index (image.id)}
        <div 
          class="carousel-item"
          on:click={() => openLightbox(index)}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
          role="button"
          tabindex="0"
          transition:scale={{duration: 300}}
        >
          <img 
            src={image.src} 
            alt={image.alt || 'Tatouage'} 
            loading="lazy"
          />
        </div>
      {/each}
      
      <!-- Clones pour l'effet infini sans couture - doublent les premières images à la fin -->
      {#each filteredImages.slice(0, Math.min(6, filteredImages.length)) as image, index (image.id + '_clone')}
        <div 
          class="carousel-item clone-item"
          on:click={() => openLightbox(index)}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
          role="button"
          tabindex="0"
        >
          <img 
            src={image.src} 
            alt={image.alt || 'Tatouage'} 
            loading="lazy"
          />
        </div>
      {/each}
    </div>
    <!-- Éléments décoratifs supprimés pour plus de simplicité -->
  
  <!-- Message informatif sur la galerie -->
  <div class="gallery-info">
    <p>Cliquez sur une image pour l'afficher en plein écran</p>
    <div class="ink-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  </div>

  <!-- Lightbox -->
  {#if isLightboxOpen}
    <div 
      class="lightbox" 
      on:click={closeLightbox}
      transition:fade={{duration: 200}}
      on:keydown={(e) => {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigateLightbox('prev');
        else if (e.key === 'ArrowRight') navigateLightbox('next');
      }}
      on:touchstart={(e) => { touchStartX = e.touches[0].clientX; }}
      on:touchend={() => { checkSwipeDirection(); }}
      tabindex="0"
      role="dialog"
      aria-modal="true"
      aria-label="Visualisation d'image en plein écran"
    >
      <article 
        class="lightbox-content" 
        role="document">
        <button class="close-btn" on:click={closeLightbox}>×</button>
        <div class="lightbox-image-container">
          {#if filteredImages[currentImageIndex]}
            <img 
              src={filteredImages[currentImageIndex].src} 
              alt={filteredImages[currentImageIndex].alt || 'Image en plein écran'}
              transition:fade={{duration: 150}}
            />
            <div class="image-metadata">
              <h3>{filteredImages[currentImageIndex].alt || 'Sans titre'}</h3>
              <p class="metadata-description">{filteredImages[currentImageIndex].description || ''}</p>
            </div>
          {/if}
        </div>
        <div class="navigation-buttons">
          <button class="nav-btn prev" on:click|stopPropagation={() => navigateLightbox('prev')}>
            &larr;
          </button>
          <button class="nav-btn next" on:click|stopPropagation={() => navigateLightbox('next')}>
            &rarr;
          </button>
        </div>
      </article>
    </div>
  {/if}
</section>


<style lang="postcss">
  .gallery-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #faf7f0 0%, #f5f2e8 50%, #f0ead8 100%);
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(139, 92, 46, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.02) 0%, transparent 50%),
      linear-gradient(45deg, transparent 49%, rgba(222, 184, 135, 0.01) 50%, transparent 51%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 1rem 2rem 1rem;
  }

  .section-title {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    padding-top: 0.5rem;
  }

  .section-title h2 {
    font-family: 'Caveat Brush', cursive;
    font-size: 4rem;
    color: var(--color-forest);
    margin: 0;
    position: relative;
    z-index: 1;
    letter-spacing: 2px;
    display: inline-block;
    padding: 0 1rem 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
  }
  
  

  /* Filtres */
  .filters {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .filter-btn {
    background: linear-gradient(135deg, #ffffff, #fdfcf8);
    border: 2px solid rgb(171, 201, 182);
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    font-family: var(--font-title);
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgb(171, 201, 182);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(171, 201, 182, 0.15);
    margin: 0.3rem;
    backdrop-filter: blur(10px);
  }

  .filter-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgb(171, 201, 182);
    opacity: 0.2;
    transition: all 0.3s ease;
    z-index: -1;
  }

  .filter-btn:hover::before,
  .filter-btn.active::before {
    left: 0;
  }

  .filter-btn.active {
    color: white;
    background: linear-gradient(135deg, rgb(171, 201, 182), rgb(150, 180, 160));
    border-color: rgb(150, 180, 160);
    font-weight: 700;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(171, 201, 182, 0.4);
  }
  
  .filter-btn:hover:not(.active) {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }

  /* Carrousel style wabi-sabi incliné */
  .carousel-container {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 2rem 0;
  }
  
  /* Styles décoratifs supprimés pour plus de simplicité */
  
  .gallery-info {
    text-align: center;
    margin-top: 3rem;
    padding: 0;
  }
  
  .gallery-info p {
    font-family: var(--font-title);
    font-size: 0.9rem;
    font-weight: 700;
    color: rgb(171, 201, 182);
    margin: 0;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  
  .ink-dots {
    display: none;
  }


  .carousel-track {
    display: flex;
    padding: 1rem;
    transition: transform 0.3s ease-out;
    will-change: transform;
    align-items: center; /* Pour que les éléments soient alignés verticalement */
    /* Augmenter la largeur pour laisser place aux clones */
    min-width: max-content;
  }

  .carousel-item {
    flex: 0 0 auto;
    margin: 0 1.5rem;
    width: 320px;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(-6deg);
    user-select: none;
    -webkit-user-drag: none;
    cursor: grab;
    pointer-events: auto;
    border: 3px solid rgba(171, 201, 182, 0.6);
    backdrop-filter: blur(5px);
  }

  .carousel-item:nth-child(even) {
    transform: rotate(6deg) translateY(-20px);
  }
  
  .carousel-item:nth-child(odd) {
    transform: rotate(-6deg) translateY(20px);
  }

  .carousel-item:hover {
    transform: scale(1.1) rotate(0deg);
    z-index: 5;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    border-color: rgb(171, 201, 182);
  }

  .carousel-item:nth-child(even):hover {
    transform: rotate(2deg) translateY(-10px) scale(1.1);
  }

  .carousel-item:nth-child(odd):hover {
    transform: rotate(-2deg) translateY(10px) scale(1.1);
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none; /* Empêcher les interactions directes avec l'image */
    draggable: false; /* Empêcher le glisser-déposer natif */
    transition: all 0.3s ease;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lightbox-image-container {
    position: relative;
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    margin: 0 auto;
  }

  .lightbox-image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .image-metadata {
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 1.25rem;
    width: 100%;
    text-align: center;
    border-top: 1px solid var(--color-accent);
  }

  .image-metadata h3 {
    margin: 0 0 0.75rem 0;
    font-family: var(--font-title);
    font-size: 1.4rem;
    color: var(--color-accent);
  }
  
  .metadata-description {
    font-size: 1.1rem;
    margin: 0.5rem 0 0;
    font-weight: 500;
    opacity: 0.9;
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1010;
  }

  .navigation-buttons {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 1rem;
  }

  .nav-btn {
    background: linear-gradient(135deg, var(--color-forest), #4a5d23);
    color: white;
    border: none;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(92, 117, 41, 0.4);
    backdrop-filter: blur(10px);
  }

  .nav-btn:hover {
    background: linear-gradient(135deg, #4a5d23, var(--color-forest));
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(92, 117, 41, 0.6);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filters {
      flex-wrap: wrap;
    }
    
    .filter-btn {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
    }
    
    .carousel-item {
      width: 180px;
      height: 250px;
    }
    
    .navigation-buttons {
      padding: 0;
    }
    
    .nav-btn {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.2rem;
    }
  }
</style>
