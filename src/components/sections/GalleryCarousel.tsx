'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'blackwork' | 'popculture' | 'flash';
  description?: string;
}

const defaultImages: GalleryImage[] = [
  { id: 1, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-1.webp', alt: 'Tatouage blackwork géométrique — Delco Ink Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 2, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-ghibli-1.webp', alt: 'Tatouage Ghibli blackwork — Studio Ensō Cognin Chambéry', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 3, src: '/images/gallery/flashtattoo/flash-tattoo-chambery-delco-ink-disponible-1.webp', alt: 'Flash tattoo disponible — Delco Ink studio tatouage Chambéry', category: 'flash', description: 'Flash tattoo disponible au studio à Chambéry.' },
  { id: 4, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-2.webp', alt: 'Tatouage blackwork trait fin illustratif — Delco Ink Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 5, src: '/images/gallery/flashtattoo/flash-tattoo-chambery-delco-ink-disponible-2.webp', alt: 'Flash tattoo pop-culture disponible — tatoueur Chambéry Cognin', category: 'flash', description: 'Flash tattoo disponible au studio à Chambéry.' },
  { id: 6, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-3.webp', alt: 'Tatouage blackwork ombrages encre noire — Studio Ensō Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 7, src: '/images/gallery/flashtattoo/flash-tattoo-chambery-delco-ink-disponible-3.webp', alt: 'Flash tattoo floral blackwork — Delco Ink Chambéry', category: 'flash', description: 'Flash tattoo disponible au studio à Chambéry.' },
  { id: 8, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-4.webp', alt: 'Tatouage blackwork fineline composition — Delco Ink Cognin Savoie', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 9, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-5.webp', alt: 'Tatouage blackwork ornemental motifs — studio tatouage Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 10, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-manga.webp', alt: 'Tatouage manga anime blackwork — Delco Ink tatoueur Chambéry', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 11, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-6.webp', alt: 'Tatouage blackwork graphique structure forte — Delco Ink Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 12, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-ghibli-3.webp', alt: 'Tatouage anime Ghibli personnage — Studio Ensō Cognin Chambéry', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 13, src: '/images/gallery/flashtattoo/flash-tattoo-chambery-delco-ink-disponible-4.webp', alt: 'Flash tattoo graphique disponible immédiatement — Delco Ink Chambéry', category: 'flash', description: 'Flash tattoo disponible au studio à Chambéry.' },
  { id: 14, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-ghibli-4.webp', alt: 'Tatouage Ghibli illustration blackwork — tatoueur Chambéry Savoie', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 15, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-7.webp', alt: 'Tatouage blackwork abstrait fort contraste — Delco Ink Cognin', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 16, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-ghibli-5.webp', alt: 'Tatouage pop-culture Ghibli personnalisé — studio Chambéry', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 21, src: '/images/gallery/popculture/tatouage-pop-culture-chambery-delco-ink-manga.webp', alt: 'Tatouage manga noir et gris blackwork — Delco Ink Chambéry', category: 'popculture', description: 'Réalisation popculture signée Delco Ink à Chambéry.' },
  { id: 17, src: '/images/gallery/blackwork/blackwork-chambery-tatouage-encre-noire-8.webp', alt: 'Tatouage blackwork encre noire trait net — Studio Ensō Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 18, src: '/images/gallery/DSC_0855.jpg', alt: 'Tatouage floral blackwork détails fins — Delco Ink tatoueur Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 19, src: '/images/gallery/DSC_0860.jpg', alt: 'Tatouage blackwork délicat style épuré — Delco Ink Cognin Savoie', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
  { id: 20, src: '/images/gallery/blackwork/DSC_0877.jpg', alt: 'Tatouage toucan floral blackwork — Studio Ensō Cognin Chambéry', category: 'blackwork', description: 'Réalisation blackwork signée Delco Ink à Chambéry.' },
];


const getLightboxTitle = (category: GalleryImage['category']) => {
  if (category === 'blackwork') return 'Tatouage Blackwork Chambéry';
  if (category === 'popculture') return 'Tatouage Popculture Chambéry';
  return 'Flash Tattoo Chambéry';
};

const getLightboxDescription = (category: GalleryImage['category']) => {
  if (category === 'blackwork') return 'Réalisation blackwork signée Delco Ink à Chambéry.';
  if (category === 'popculture') return 'Réalisation popculture signée Delco Ink à Chambéry.';
  return 'Flash tattoo disponible au studio à Chambéry.';
};

export default function GalleryCarousel() {
  const [images] = useState<GalleryImage[]>(defaultImages);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(defaultImages);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxKey, setLightboxKey] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLightboxTransitioning, setIsLightboxTransitioning] = useState(false);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    if (filter === activeFilter) return;
    // Fade out
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(filter);
      if (filter === 'all') {
        setFilteredImages(images);
      } else {
        setFilteredImages(images.filter(img => img.category === filter));
      }
      setScrollPosition(0);
      // Fade in
      setTimeout(() => setIsTransitioning(false), 50);
    }, 280);
  }, [activeFilter, images]);

  useEffect(() => {
    const handleSetFilter = (e: CustomEvent) => {
      handleFilterChange(e.detail);
    };
    window.addEventListener('set-gallery-filter', handleSetFilter as EventListener);
    return () => window.removeEventListener('set-gallery-filter', handleSetFilter as EventListener);
  }, [handleFilterChange]);

  useEffect(() => {
    if (isMobileLayout) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (isLightboxOpen || isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const scrollSpeed = window.matchMedia('(pointer: coarse)').matches ? 1.5 : 2.5;
    
    const animate = (timestamp: number) => {
      if (!isActiveRef.current || !trackRef.current) return;
      
      const deltaTime = timestamp - (lastFrameTimeRef.current || timestamp);
      lastFrameTimeRef.current = timestamp;
      
      const frameScroll = scrollSpeed * (deltaTime / 16);
      
      setScrollPosition(prev => {
        const itemWidth = 368;
        const totalWidth = itemWidth * filteredImages.length;
        let newPos = prev + frameScroll;
        if (newPos >= totalWidth) newPos = newPos - totalWidth;
        return newPos;
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLightboxOpen, isPaused, filteredImages, isMobileLayout]);

  useEffect(() => {
    if (trackRef.current && !isMobileLayout) {
      trackRef.current.style.transform = `translate3d(${-Math.round(scrollPosition)}px, 0, 0)`;
    }
  }, [scrollPosition, isMobileLayout]);

  const handleTouchStart = () => {
    if (isMobileLayout) return;
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (isMobileLayout) return;
    setTimeout(() => setIsPaused(false), 1000);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (isLightboxTransitioning) return;
    setIsLightboxTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(prev => {
        if (direction === 'prev') return (prev - 1 + filteredImages.length) % filteredImages.length;
        return (prev + 1) % filteredImages.length;
      });
      setLightboxKey(k => k + 1);
      setTimeout(() => setIsLightboxTransitioning(false), 50);
    }, 200);
  };

  return (
    <section id="gallery" className="gallery-section relative w-full min-h-[calc(100vh-70px)] overflow-hidden flex flex-col justify-center py-12" style={{ scrollMarginTop: '70px', boxShadow: '0 -8px 16px -4px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.03)' }}>
      <div className="absolute inset-0 z-0 bg-[#f8f3e8] wavy-gradient opacity-40 texture-bg">
        <div className="absolute top-0 right-0 w-64 h-64 transform -rotate-12 opacity-15 z-0 floating-slow hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-10 left-0 w-[200px] h-[204px] transform rotate-[15deg] opacity-10 z-0 floating hidden md:block">
          <img src="/img/fougere.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-0 left-[45%] w-52 h-52 transform -rotate-3 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/joli feuille.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-10 right-28 w-[164px] h-64 transform rotate-[8deg] opacity-10 z-0 floating-slow hidden md:block">
          <img src="/img/pngegg.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute top-1/3 right-10 w-32 h-32 transform -rotate-5 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
      </div>
      <div className="relative z-10 w-full">
        <div className="section-title text-4xl md:text-5xl mb-16 uppercase relative inline-block transform -rotate-1 text-center w-full">
          <div className="relative inline-block">
            <h2 className="font-title text-forest">
              <span className="absolute -right-8 -top-6 text-base opacity-50 rotate-12 text-forest">Delco Ink</span>
              Galerie
            </h2>
          </div>
        </div>

        <div className="filters flex justify-center gap-3 mb-6 flex-wrap px-4">
        {['all', 'blackwork', 'popculture', 'flash'].map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`filter-btn px-6 py-3 rounded-full font-title text-sm font-semibold uppercase tracking-wide transition-all duration-400 border-2 ${
              activeFilter === filter
                ? 'bg-forest text-white border-forest shadow-lg transform -translate-y-1 scale-105'
                : 'bg-white text-forest border-forest/30 hover:border-forest/60 hover:-translate-y-0.5'
            }`}
          >
            {filter === 'all' ? 'Tous' : filter === 'popculture' ? 'Pop Culture' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {isMobileLayout ? (
        <div className="w-full overflow-x-auto scrollbar-hide px-4 pb-2">
          <div
            className="flex gap-4 snap-x snap-mandatory"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
            }}
          >
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openLightbox(index)}
                className="snap-center flex-shrink-0 w-[78vw] max-w-[320px] h-[360px] rounded-2xl overflow-hidden relative cursor-pointer border border-forest/20 shadow-lg bg-white"
                role="button"
                tabIndex={0}
                aria-label={`Ouvrir l'image ${image.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: 'center', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="carousel-container w-full relative overflow-hidden py-8" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            ref={trackRef}
            className="carousel-track flex will-change-transform"
            style={{
              minWidth: 'max-content',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? 'translateY(12px) scale(0.98)'
                : 'translateY(0) scale(1)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
            }}
          >
            {[...filteredImages, ...filteredImages, ...filteredImages].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                onClick={() => openLightbox(index % filteredImages.length)}
                className={`carousel-item flex-shrink-0 mx-6 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 border border-forest/20 ${
                  index % 2 === 0 ? 'transform rotate-[-6deg] translate-y-5' : 'transform rotate-[6deg] -translate-y-5'
                } hover:scale-105 hover:rotate-0 hover:z-10 hover:border-forest/50`}
                style={{ width: '320px', height: '384px', flexShrink: 0, display: 'block', boxSizing: 'border-box' }}
                role="button"
                tabIndex={0}
                aria-label={`Ouvrir l'image ${image.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index % filteredImages.length);
                  }
                }}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: 'center', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="gallery-info text-center mt-8">
        <p className="font-title text-sm font-bold text-forest/70 uppercase tracking-wide">
          {isMobileLayout ? 'Faites glisser puis touchez une image' : 'Cliquez sur une image pour l afficher en plein écran'}
        </p>
      </div>
      </div>

      {isLightboxOpen && filteredImages[currentImageIndex] && (
        <div
          className="lightbox fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          style={{ background: 'linear-gradient(135deg, rgba(45,106,79,0.15) 0%, rgba(0,0,0,0.92) 50%, rgba(45,106,79,0.1) 100%)' }}
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
          }}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/images/texture-overlay.png")', backgroundSize: '300px', mixBlendMode: 'overlay' }} />
          
          <div className="lightbox-content relative w-[min(94vw,980px)] max-h-[95%] flex flex-col items-center animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              type="button"
              aria-label="Fermer la galerie"
              onClick={closeLightbox} 
              className="absolute -top-4 -right-4 md:top-4 md:right-4 w-12 h-12 rounded-full bg-[#f8f3e8] text-forest text-2xl flex items-center justify-center cursor-pointer z-50 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 border border-forest/20"
            >
              X
            </button>
            
            {/* Main image container */}
            <div className="lightbox-image-container relative w-full rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg overflow-hidden shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(45,106,79,0.2)' }}>
              <div className="relative bg-[#f8f3e8] w-full h-[min(65vh,620px)] flex items-center justify-center px-4 py-4">
                <img
                  key={lightboxKey}
                  src={filteredImages[currentImageIndex].src}
                  alt={filteredImages[currentImageIndex].alt}
                  className="max-w-full max-h-full object-contain animate-fadeIn"
                  style={{
                    opacity: isLightboxTransitioning ? 0 : 1,
                    transform: isLightboxTransitioning ? 'scale(0.97)' : 'scale(1)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)' }} />
              </div>
              
              {/* Info card */}
              <div className="bg-[#f8f3e8] px-6 md:px-8 py-4 border-t border-forest/10 h-[120px]">
                <div className="flex items-start justify-between gap-4 h-full">
                  <div className="overflow-hidden">
                    <h3 id="gallery-lightbox-title" className="font-title text-lg md:text-2xl text-forest mb-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{getLightboxTitle(filteredImages[currentImageIndex].category)}</h3>
                    <p className="text-gray-600 text-sm md:text-base overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{getLightboxDescription(filteredImages[currentImageIndex].category)}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-forest/50 text-sm">
                    <span className="font-title">{currentImageIndex + 1}</span>
                    <span>/</span>
                    <span className="font-title">{filteredImages.length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="navigation-buttons absolute inset-x-0 top-[40%] md:top-[42%] -translate-y-1/2 px-2 md:px-8 pointer-events-none z-50 flex justify-between">
              <button
                type="button"
                aria-label="Image précédente"
                onClick={() => navigateLightbox('prev')} 
                className="nav-btn pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg bg-[#f8f3e8] text-forest text-xl md:text-2xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 hover:bg-white transition-all duration-300 border border-forest/20"
              >
                {'<'}
              </button>
              <button
                type="button"
                aria-label="Image suivante"
                onClick={() => navigateLightbox('next')} 
                className="nav-btn pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg bg-[#f8f3e8] text-forest text-xl md:text-2xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 hover:bg-white transition-all duration-300 border border-forest/20"
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Flèche de navigation vers la section suivante */}
      <a 
        href="#process" 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
        aria-label="Défiler vers la section Processus"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-forest/60 animate-bounce-slow" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
