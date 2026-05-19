'use client';
import React, { useRef, useEffect } from 'react';

export default function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const philosophyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip GSAP on mobile to eliminate CLS (layout shift)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40, x: -5, rotate: -1, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 95%', once: true }
        });
      }

      if (imageContainerRef.current) {
        gsap.from(imageContainerRef.current, {
          x: -40, y: 10, rotate: 1.5, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: imageContainerRef.current, start: 'top 95%', once: true }
        });
      }

      if (textContainerRef.current) {
        gsap.from(textContainerRef.current, {
          x: 40, y: -15, rotate: -0.5, opacity: 0, duration: 0.9, delay: 0.4, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: textContainerRef.current, start: 'top 95%', once: true }
        });
      }

      if (philosophyBoxRef.current) {
        gsap.from(philosophyBoxRef.current, {
          scaleY: 0.8, opacity: 0, duration: 1.2, delay: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: philosophyBoxRef.current, start: 'top 95%', once: true }
        });
      }
    };

    loadGsap();
  }, []);

  return (
    <section 
      id="about" 
      className="min-h-screen relative overflow-hidden texture-soft bg-white flex items-center py-12 md:py-16" 
      style={{ 
        scrollMarginTop: '70px',
        boxShadow: '0 -8px 16px -4px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.03)'
      }}
    >
      <div className="absolute inset-0 z-0 bg-white wavy-gradient opacity-40 texture-bg">
        <div className="absolute top-0 right-0 w-64 h-64 transform -rotate-12 opacity-15 z-0 floating-slow hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" width={256} height={256} loading="lazy" decoding="async" />
        </div>
        <div className="absolute bottom-10 left-0 w-[200px] h-[204px] transform rotate-[15deg] opacity-10 z-0 floating hidden md:block">
          <img src="/img/fougere.webp" alt="" className="w-full h-full object-contain" width={200} height={204} loading="lazy" decoding="async" />
        </div>
        <div className="absolute bottom-0 left-[45%] w-52 h-52 transform -rotate-3 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/joli feuille.webp" alt="" className="w-full h-full object-contain" width={208} height={208} loading="lazy" decoding="async" />
        </div>
        <div className="absolute bottom-10 right-28 w-[164px] h-64 transform rotate-[8deg] opacity-10 z-0 floating-slow hidden md:block">
          <img src="/img/pngegg.webp" alt="" className="w-full h-full object-contain" width={164} height={256} loading="lazy" decoding="async" />
        </div>
        <div className="absolute top-1/3 right-10 w-32 h-32 transform -rotate-5 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" width={128} height={128} loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-forest opacity-40 rounded-full" />
            <h2 className="section-title text-4xl md:text-5xl text-forest mb-16 uppercase relative inline-block transform -rotate-1">
              À propos
              <span className="absolute -right-6 -top-4 text-base opacity-50 rotate-12">ソーセージ</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageContainerRef} className="relative z-10">
            <div className="relative transform rotate-[1.5deg] group hover:rotate-0 transition-transform duration-700">
              <div className="absolute -inset-4 texture-paper bg-white/80 -z-10 rounded-sm shadow-xl opacity-80 transform -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
              <div className="relative p-3 bg-white overflow-hidden shadow-lg">
                <div className="overflow-hidden relative">
                  <img 
                    src="/images/delco-ink-portrait-tatoueuse-chambery-sm.webp"
                    srcSet="/images/delco-ink-portrait-tatoueuse-chambery-sm.webp 360w, /images/delco-ink-portrait-tatoueuse-chambery-md.webp 520w, /images/delco-ink-portrait-tatoueuse-chambery.webp 800w"
                    sizes="(max-width: 480px) 92vw, (max-width: 768px) 360px, (max-width: 1280px) 44vw, 520px"
                    alt="Chloé - Artiste Tatoueuse chez Delco Ink Studio Chambéry" 
                    className="w-full object-cover transition-all duration-700 hover:scale-105"
                    width={520}
                    height={406}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 opacity-20 texture-soft pointer-events-none mix-blend-soft-light" />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>

          <div ref={textContainerRef} className="relative z-10">
            <div className="p-7 backdrop-blur-sm bg-white/20 rounded-tl-sm rounded-br-3xl rounded-tr-lg rounded-bl-md transform rotate-[-0.5deg] border-l-2 border-t border-forest/10 shadow-md texture-paper">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h3 className="font-title text-3xl text-forest relative inline-block transform -translate-y-1">
                  Delco Ink <span className="text-forest font-semibold relative">Studio
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-forest/30 transform skew-x-12" />
                  </span>
                </h3>
                <span className="text-forest text-sm font-medium px-4 py-1.5 border border-forest/30 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-white/40 transform -rotate-1 shadow-sm">
                  Salon privé - Sur rendez-vous uniquement
                </span>
              </div>
            
              <div className="space-y-6 text-gray-700 leading-relaxed mb-10 pl-0 md:pl-3 border-l-0 md:border-l border-forest/10">
                <p className="transform translate-x-0 md:-translate-x-2">
                  Situé à <span className="text-forest font-medium moving-text">Cognin</span>, à deux pas de <span className="text-forest font-medium moving-text">Chambéry</span>, Delco Ink est un studio privé pensé pour des projets clairs, lisibles et durables.
                </p>
                <p className="transform translate-x-0 md:translate-x-1">
                  Je suis <span className="text-forest font-medium moving-text">Chloé</span>, tatoueuse spécialisée en <span className="text-forest font-medium moving-text">blackwork illustratif</span> et créations <span className="text-forest font-medium moving-text">pop‑culture</span>. Mon approche privilégie la composition, le contraste et un rendu qui vieillit bien.
                </p>
                <p className="transform translate-x-0 md:-translate-x-1">
                  Chaque projet est conçu sur mesure après un échange précis sur votre idée, la zone et la taille. Le but : une pièce unique, cohérente avec votre morphologie et votre style.
                </p>
              </div>

              <div ref={philosophyBoxRef} className="mb-12 relative">
                <div className="absolute inset-y-0 -left-1 w-[3px] bg-gradient-to-b from-forest/50 via-forest/30 to-transparent rounded-full" />
                <div className="pl-5 pt-2 pb-1 bg-white/20 border-t border-b border-r border-forest/10 rounded-tr-lg rounded-br-sm transform -rotate-[0.8deg]">
                  <h4 className="text-lg font-medium text-forest mb-3 transform translate-y-[-2px]">Ma philosophie</h4>
                  <p className="text-gray-600 italic">"Chaque tatouage est un dialogue : vos idées, mon regard, et une exécution précise pour un résultat lisible et durable."</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mt-4 justify-center md:justify-start">
                <a href="/#gallery" className="px-7 py-3 bg-transparent hover:bg-white/20 text-forest font-medium transition-all duration-500 text-center border border-forest/30 hover:border-forest/60 organic-button group relative overflow-hidden">
                  <span className="relative z-10">Découvrir les créations</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <a href="/le-studio" className="px-7 py-3 bg-white/30 hover:bg-white/40 text-forest font-medium transition-all duration-500 text-center border border-forest/40 hover:border-forest/60 organic-button group relative overflow-hidden">
                  <span className="relative z-10">Découvrir Le Studio</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <a href="/#contact-anchor" className="px-7 py-3 bg-forest/50 hover:bg-forest/70 text-white font-medium transition-all duration-500 text-center shadow-sm hover:shadow organic-button group relative overflow-hidden">
                  <span className="relative z-10">Parlons de votre projet</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Flèche de navigation vers la section suivante */}
      <a 
        href="#services" 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
        aria-label="Défiler vers la section Services"
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
