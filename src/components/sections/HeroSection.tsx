'use client';
import React, { useRef, useEffect } from 'react';
import ParticlesBackground from '../decorative/ParticlesBackground';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip GSAP entirely on mobile — no parallax, no ScrollTrigger import
    // Saves ~45KB JS from critical chain on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (underlineRef.current) {
        underlineRef.current.style.width = '0';
      }
      return;
    }

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const heroTimeline = gsap.timeline();

      if (titleRef.current) {
        heroTimeline.from(titleRef.current, {
          y: 30, x: -10, opacity: 0, duration: 0.8, ease: 'power2.out'
        });
      }

      if (subtitleRef.current) {
        heroTimeline.from(subtitleRef.current, {
          y: 20, x: 5, opacity: 0, duration: 0.8, ease: 'power3.out'
        }, '-=0.6');
      }

      if (ctaRef.current) {
        heroTimeline.from(ctaRef.current, {
          y: 15, scale: 0.95, opacity: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)'
        }, '-=0.4');
      }

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: '30vh',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }

      if (heroContentRef.current && heroRef.current) {
        gsap.to(heroContentRef.current, {
          y: 50,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top+=120',
            end: 'bottom top+=120',
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }

      if (underlineRef.current) {
        gsap.set(underlineRef.current, { width: 0, left: 0 });
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    loadGsap();
  }, []);

  const handleDescriptionHover = async () => {
    const gsap = (await import('gsap')).default;
    if (underlineRef.current && subtitleRef.current) {
      gsap.to(underlineRef.current, {
        width: '100%',
        backgroundColor: '#1b4332',
        height: '2.5px',
        boxShadow: '0 0 8px 0 rgba(45, 106, 79, 0.75)',
        duration: 0.6,
        ease: 'power2.out'
      });
      gsap.to(subtitleRef.current, { color: '#2d6a4f', duration: 0.4 });
    }
  };

  const handleDescriptionLeave = async () => {
    const gsap = (await import('gsap')).default;
    if (underlineRef.current && subtitleRef.current) {
      gsap.to(underlineRef.current, {
        width: '0%',
        backgroundColor: '#2d6a4f',
        height: '1px',
        boxShadow: 'none',
        duration: 0.8,
        ease: 'power2.inOut'
      });
      gsap.to(subtitleRef.current, { color: '#374151', duration: 0.4 });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] h-screen overflow-hidden bg-white">
      <div
        ref={heroRef}
        className="absolute inset-0 z-0"
        style={{ transform: 'translateY(0px) translateX(0px)' }}
      >
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/delco-ink-studio-tatouage-chambery-hero-mobile.webp"
          />
          <source
            media="(max-width: 1280px)"
            srcSet="/images/delco-ink-studio-tatouage-chambery-hero-tablet.webp"
          />
          <img
            src="/images/delco-ink-studio-tatouage-chambery-hero.webp"
            alt="Delco Ink Studio Tatouage Chambéry"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.95)' }}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

      </div>
      <ParticlesBackground 
        color="#78a694" 
        opacity={0.72} 
        count={34} 
        minSize={4} 
        maxSize={9} 
        minSpeed={0.16}
        maxSpeed={0.34}
        interactive={true}
        zIndex={10} 
      />

      <div
        ref={heroContentRef}
        className="absolute inset-0 z-20 isolate flex items-start pt-40 md:pt-60 justify-center pointer-events-none"
      >
        <div className="container mx-auto px-4 text-gray-900 pointer-events-auto">
          <div ref={titleRef} className="mb-6 flex justify-center">
            <div className="relative group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/img/Logo-hero-mobile.webp"
                  srcSet="/img/Logo-hero-mobile.webp 180w, /img/Logo-hero.webp 320w"
                  sizes="(max-width: 768px) 160px, 320px"
                  alt="Delco Ink Logo"
                  className="h-40 md:h-60 relative z-[100] mix-blend-normal w-auto"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                  width={220}
                  height={148}
                  loading="eager"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-forest/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10"
                style={{ filter: 'blur(20px)' }}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center mb-6 md:mb-8 gap-2">
            <h1
              ref={subtitleRef}
              className="font-body text-lg sm:text-xl md:text-2xl text-gray-700 relative px-4"
              onMouseEnter={handleDescriptionHover}
              onMouseLeave={handleDescriptionLeave}
            >
              <span className="inline-block relative cursor-pointer px-1">
                Illustrative Blackwork<br className="block sm:hidden" /> &amp; Pop-Culture Tattoos
                <span ref={underlineRef} />
              </span>
            </h1>
            <p className="font-quicksand text-sm md:text-base text-forest/70 tracking-widest uppercase font-medium">
              Tatoueur · Chambéry &amp; Cognin
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex justify-center">
            <a
              ref={ctaRef}
              href="#about"
              className="group flex flex-col items-center justify-center relative overflow-hidden organic-hover-area py-3 px-5"
              aria-label="Défiler vers la section À propos"
            >
              <div className="relative overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-forest fade-down-arrow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 9l-7 7-7-7"
                    className="origin-center transform transition-transform duration-500 group-hover:scale-110"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(3px); }
        }
        
        .fade-down-arrow {
          animation: fadeInOut 2s infinite ease-in-out;
        }
        
        .organic-hover-area {
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          transition: border-radius 1s ease;
        }
        
        .organic-hover-area:hover {
          border-radius: 50% 70% 40% 60% / 60% 30% 70% 40%;
        }
      `}</style>
    </section>
  );
}
