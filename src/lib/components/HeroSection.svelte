<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let hero: HTMLElement;
  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let ctaButton: HTMLElement;
  let pathElements: SVGPathElement[] = [];
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  
  // Configuration des particules
  const particleCount = 40;
  const particles: Particle[] = [];
  
  // Couleurs des particules en différentes teintes de vert
  const particleColors = [
    '#34953e', // vert forêt principal
    '#2d5731', // vert forêt foncé
    '#1b3b1f', // vert très foncé
    '#5aae63', // vert clair
    '#a1d8a7'  // vert pâle
  ];
  
  // Type pour les particules
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
    pulsating: boolean;
  }
  
  // Création des particules
  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2, // Taille entre 2 et 6
        speedX: (Math.random() - 0.5) * 0.4, // Vitesse horizontale
        speedY: (Math.random() - 0.5) * 0.2, // Vitesse verticale plus lente
        opacity: Math.random() * 0.5 + 0.1, // Opacité entre 0.1 et 0.6
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        pulsating: Math.random() > 0.5 // Certaines particules pulsent
      });
    }
  }
  
  // Animation des particules
  function animateParticles() {
    if (!ctx || !canvas) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner et animer chaque particule
    particles.forEach(p => {
      // Déplacer la particule
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Rebondir sur les bords
      if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
      if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
      
      // Dessiner la particule (orbe avec gradient)
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = p.opacity;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Continuer l'animation
    requestAnimationFrame(animateParticles);
  }
  
  // Ajuster la taille du canvas quand la fenêtre change
  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  onMount(() => {
    // Initialiser le canvas
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        ctx = context;
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        createParticles();
        animateParticles();
        
        // Pulsation des particules avec GSAP
        particles.forEach((p, index) => {
          if (p.pulsating) {
            gsap.to(p, {
              opacity: p.opacity + 0.3,
              size: p.size * 1.3,
              duration: 1.5 + Math.random(), 
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.05
            });
          }
        });
      }
    }
    
    // Simple parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    });

    // GSAP animations for hero elements
    gsap.from(titleElement, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(subtitleElement, {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out"
    });

    gsap.from(ctaButton, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: "power3.out"
    });

    // Animate SVG paths
    pathElements.forEach((path, index) => {
      if (path && path.getTotalLength) {
        const length = path.getTotalLength();
        gsap.set(path, { 
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
          fill: "none"
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2 + (index * 0.3),
          delay: 0.3 * index,
          ease: "power3.inOut",
          onComplete: () => {
            const fillColor = path.getAttribute("data-fill") || "#1a9a5c";
            const fillOpacity = path.getAttribute("data-opacity") || "0.8";
            
            gsap.to(path, {
              fill: fillColor,
              fillOpacity: Number(fillOpacity),
              duration: 1
            });
          }
        });
      }
    });
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  });
</script>

<section id="home" class="relative h-screen overflow-hidden bg-white">
  <!-- Canvas pour les particules/orbes -->
  <canvas 
    bind:this={canvas} 
    class="absolute inset-0 z-5 w-full h-full pointer-events-none" 
    style="opacity: 0.6;"
  ></canvas>
  
  <!-- Background image with parallax effect -->
  <div class="absolute inset-0 z-0" bind:this={hero}>
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/hero-bg-light.jpg');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-70"></div>
  </div>
  
  <!-- Subtle leaf decorations -->
  <div class="absolute inset-0 z-10 pointer-events-none">
    <!-- Top left leaf -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="absolute top-10 left-10 w-16 h-16 text-forest opacity-30" fill="currentColor">
      <path bind:this={pathElements[0]} d="M50,0 C40,20 0,50 0,70 C0,90 20,100 50,90 C80,100 100,90 100,70 C100,50 60,20 50,0 Z" data-fill="#34953e" data-opacity="0.3"></path>
    </svg>
    
    <!-- Top right leaf -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="absolute top-24 right-16 w-12 h-12 text-forest opacity-20" fill="currentColor">
      <path bind:this={pathElements[1]} d="M50,0 C40,20 0,50 0,70 C0,90 20,100 50,90 C80,100 100,90 100,70 C100,50 60,20 50,0 Z" transform="rotate(45 50 50)" data-fill="#2d5731" data-opacity="0.2"></path>
    </svg>
    
    <!-- Bottom right leaf -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="absolute bottom-20 right-24 w-14 h-14 text-forest opacity-25" fill="currentColor">
      <path bind:this={pathElements[2]} d="M50,0 C40,20 0,50 0,70 C0,90 20,100 50,90 C80,100 100,90 100,70 C100,50 60,20 50,0 Z" transform="rotate(-30 50 50)" data-fill="#34953e" data-opacity="0.25"></path>
    </svg>
    
    <!-- Bottom left leaf -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="absolute bottom-16 left-20 w-10 h-10 text-forest opacity-15" fill="currentColor">
      <path bind:this={pathElements[3]} d="M50,0 C40,20 0,50 0,70 C0,90 20,100 50,90 C80,100 100,90 100,70 C100,50 60,20 50,0 Z" transform="rotate(75 50 50)" data-fill="#1b3b1f" data-opacity="0.15"></path>
    </svg>
    
    <!-- Center small leaf -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="absolute top-1/3 right-1/3 w-8 h-8 text-forest opacity-10" fill="currentColor">
      <path bind:this={pathElements[4]} d="M50,0 C40,20 0,50 0,70 C0,90 20,100 50,90 C80,100 100,90 100,70 C100,50 60,20 50,0 Z" transform="rotate(120 50 50)" data-fill="#2d5731" data-opacity="0.1"></path>
    </svg>
  </div>
  
  <!-- Hero Content -->
  <div class="absolute inset-0 z-20 flex items-center justify-center">
    <div class="container mx-auto px-4 text-center text-gray-900">
      <h1 
        bind:this={titleElement}
        class="font-title text-5xl md:text-7xl uppercase tracking-widest mb-4"
      >
        Delco <span class="text-forest">Ink</span>
      </h1>
      
      <p 
        bind:this={subtitleElement}
        class="font-body text-xl md:text-2xl mb-8 text-gray-700"
      >
        <span class="inline-block relative">
          Illustrative Blackwork & Pop-Culture Tattoos
          <span class="absolute bottom-0 left-0 h-0.5 bg-forest w-full opacity-70"></span>
        </span>
      </p>
      
      <a 
        bind:this={ctaButton}
        href="#about" 
        class="btn-primary group mt-12 shadow-sm hover:shadow-md transition-all"
      >
        Découvrir
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline-block transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </div>
</section>
