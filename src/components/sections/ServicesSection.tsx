'use client';
import React, { useRef, useEffect } from 'react';
import ParticlesBackground from '../decorative/ParticlesBackground';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Skip GSAP on mobile to eliminate CLS and reduce JS
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Show progress bars immediately on mobile
      progressRefs.current.forEach(bar => {
        if (bar) bar.style.width = '100%';
      });
      return;
    }

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (titleRef.current && sectionRef.current) {
        gsap.from(titleRef.current, {
          y: 40, x: -8, rotate: -1.5, opacity: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', toggleActions: 'play none none none' }
        });
      }

      if (decorRef.current) {
        gsap.from(decorRef.current, {
          scale: 0.8, opacity: 0, rotate: 5, duration: 1.5, delay: 0.3, ease: 'elastic.out(1, 0.3)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        });
      }

      cardRefs.current.forEach((card, index) => {
        if (card && sectionRef.current) {
          const xOffset = [12, -8, 5][index] || 0;
          const rotateVal = [-0.8, 1.2, -0.5][index] || 0;
          gsap.from(card, {
            y: 60, x: xOffset, rotate: rotateVal, opacity: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 40%', toggleActions: 'play none none none' },
            delay: 0.3 + (index * 0.25)
          });
        }
      });

      progressRefs.current.forEach((bar, index) => {
        if (bar && sectionRef.current) {
          gsap.to(bar, {
            width: '100%', duration: 0.8 + (index * 0.15), ease: 'power2.inOut',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 40%', toggleActions: 'play none none none' },
            delay: 0.6 + (index * 0.3)
          });
        }
      });
    };

    loadGsap();
  }, []);

  const handleFilterClick = (filter: string) => {
    window.location.hash = 'gallery';
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('set-gallery-filter', { detail: filter }));
    }, 100);
  };

  const services = [
    {
      title: 'Blackwork',
      description: 'Des créations illustratives en noir profond avec ombrages et textures détaillées, alliant élégance et intensité.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      features: ['Style : Dotwork, line work, ombres graduées'],
      filter: 'blackwork',
      rotate: '-0.5deg',
      corners: 'rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-lg'
    },
    {
      title: 'Pop Culture',
      description: 'Des designs inspirés de la culture populaire : films, jeux vidéo, animés, comics, et autres univers emblématiques.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      features: ['Créations : Pièces uniques et personnalisées', 'Spécialités : Adaptations fidèles, crossovers originaux'],
      filter: 'popculture',
      rotate: '0.7deg',
      corners: 'rounded-tr-md rounded-tl-2xl rounded-bl-md rounded-br-lg'
    },
    {
      title: 'Flash',
      description: 'Des designs prêts à être tatoués, créés à l\'avance et disponibles pour une réalisation immédiate ou sur rendez-vous.',
      icon: 'M13 2 3 14h9l-1 8 10-12h-9l2-8z',
      features: ['Disponibilité : Collection régulièrement renouvelée', 'Avantage : Réalisation immédiate possible'],
      filter: 'flash',
      rotate: '-0.4deg',
      corners: 'rounded-tr-2xl rounded-tl-lg rounded-bl-2xl rounded-br-md'
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="min-h-[calc(100vh-70px)] relative overflow-hidden texture-soft bg-gray-50 flex items-center py-12 md:py-16" style={{ scrollMarginTop: '70px' }}>
      <div ref={decorRef} className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-forest/5 border-2 border-forest/20 transform rotate-12 z-0" />
      <div className="absolute inset-0 opacity-20 wavy-gradient z-0" />
      <ParticlesBackground 
        color="#2d6a4f" 
        opacity={0.2} 
        count={30} 
        minSize={2} 
        maxSize={8} 
        interactive={true}
        zIndex={1}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-[45%] w-28 h-1 bg-forest opacity-30 rounded-full" />
            <h2 className="section-title text-4xl md:text-5xl text-gray-900 mb-16 uppercase relative inline-block transform -rotate-[0.8deg]">
              Styles & Créations
              <span className="absolute -right-8 -top-4 text-base opacity-40 rotate-12 font-serif">歯磨き粉</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 relative z-10 px-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={el => { cardRefs.current[index] = el; }}
              className={`service-card group bg-white/95 p-6 ${service.corners} shadow-md hover:shadow-xl hover:shadow-forest/20 transition-all duration-700 border-t-2 border-l border-forest/30 relative overflow-hidden z-30 hover:-translate-y-2 transform texture-paper hover:rotate-0`}
              style={{ transform: `rotate(${service.rotate})` }}
            >
              <div className="card-content p-8 flex flex-col h-full relative">
                <div className="mb-8 text-center relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-forest group-hover:text-forest transition-all duration-700 group-hover:scale-[1.15] group-hover:rotate-[15deg] breathing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={service.icon} />
                  </svg>
                  <h3 className="font-satisfy text-2xl font-bold text-gray-800 group-hover:text-forest transition-all duration-500">
                    {service.title}
                  </h3>
                  <div className="relative h-[3px] w-16 bg-gray-200/60 mx-auto mt-4 rounded-full overflow-hidden">
                    <div ref={el => { progressRefs.current[index] = el; }} className="absolute top-0 left-0 h-full bg-forest/70 rounded-full w-0" />
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-8 px-2 leading-relaxed">{service.description}</p>
                <ul className="space-y-4 text-gray-700 mb-8 px-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start group">
                      <div className="relative mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-forest flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-auto">
                  <button
                    onClick={() => handleFilterClick(service.filter)}
                    className="inline-block relative text-forest hover:text-forest transition-all duration-500 uppercase font-title text-sm tracking-wider font-medium group"
                  >
                    <span className="relative z-10">Voir réalisations</span>
                    <span className="ml-1 group-hover:ml-2 transition-all duration-500">→</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-forest/40 transform origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-600">
          En savoir plus :
          <a href="/blackwork-chambery" className="text-forest underline ml-2">Blackwork</a>
          <a href="/tatouage-illustratif-chambery" className="text-forest underline ml-2">Illustratif</a>
          <a href="/tatouage-pop-culture-chambery" className="text-forest underline ml-2">Pop‑culture</a>
          <a href="/flash" className="text-forest underline ml-2">Flash</a>
        </div>
      </div>

      {/* Flèche de navigation vers la section suivante */}
      <a
        href="#gallery"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
        aria-label="Défiler vers la section Galerie"
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
