<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  export let opacity: number = 0.6;
  export let particleCount: number = 30;
  export let zIndex: number = 5;
  
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  
  // Couleurs des particules en différentes teintes de vert (7 types)
  const particleColors = [
    '#4CAF50', // vert frais
    '#8BC34A', // vert lime clair
    '#CDDC39', // vert-jaune (jeune pousse)
    '#7CFF73', // vert tendre lumineux
    '#A5D6A7', // vert pâle
    '#C5E1A5', // vert très pâle
    '#D4E157'  // vert-jaune chartreuse (jeune pousse)
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
    particles = [];
    if (!canvas) return;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * 4 + 2, // Taille entre 2 et 6
        speedX: (Math.random() - 0.5) * 0.4, // Vitesse horizontale
        speedY: (Math.random() - 0.5) * 0.2, // Vitesse verticale plus lente
        opacity: Math.random() * 0.6 + 0.2, // Opacité entre 0.2 et 0.8 (plus visible)
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        pulsating: Math.random() > 0.4 // Plus de particules pulsantes (60%)
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
      if (canvas && (p.x < 0 || p.x > canvas.width)) p.speedX = -p.speedX;
      if (canvas && (p.y < 0 || p.y > canvas.height)) p.speedY = -p.speedY;
      
      // Dessiner la particule (orbe avec gradient) seulement si ctx existe
      if (ctx && canvas) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        
        // Créer une version plus lumineuse de la couleur pour le centre
        const baseColor = p.color;
        
        // Convertir la couleur hexadécimale en composants RGB
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        // Éclaircir la couleur pour le centre (en augmentant la luminosité)
        const lightenAmount = 50; // Ajustement de la luminosité
        const centerR = Math.min(r + lightenAmount, 255);
        const centerG = Math.min(g + lightenAmount, 255);
        const centerB = Math.min(b + lightenAmount, 255);
        
        // Créer la couleur du centre plus lumineuse
        const centerColor = `rgb(${centerR}, ${centerG}, ${centerB})`;
        
        // Créer un gradient plus doux
        gradient.addColorStop(0, centerColor); // Centre plus lumineux
        gradient.addColorStop(0.4, baseColor); // Transition douce vers la couleur de base
        gradient.addColorStop(1, 'transparent'); // Fondu en transparence
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Continuer l'animation
    requestAnimationFrame(animateParticles);
  }
  
  // Ajuster la taille du canvas
  function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    
    const parentRect = canvas.parentElement.getBoundingClientRect();
    canvas.width = parentRect.width;
    canvas.height = parentRect.height;
    
    // Recréer les particules pour qu'elles s'adaptent à la nouvelle taille
    createParticles();
  }

  onMount(() => {
    // Initialiser le canvas
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        ctx = context;
        
        // Observer les changements de dimension du conteneur parent
        const resizeObserver = new ResizeObserver(() => {
          resizeCanvas();
        });
        
        if (canvas.parentElement) {
          resizeObserver.observe(canvas.parentElement);
        }
        
        // Configuration initiale
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        createParticles();
        animateParticles();
        
        // Pulsation des particules avec GSAP
        particles.forEach((p, index) => {
          if (p.pulsating) {
            gsap.to(p, {
              opacity: p.opacity + 0.4,
              size: p.size * 1.5,
              duration: 1.8 + Math.random(), 
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.05
            });
          }
        });
        
        // Nettoyage
        return () => {
          window.removeEventListener('resize', resizeCanvas);
          resizeObserver.disconnect();
        };
      }
    }
  });
</script>

<div class="particles-container absolute inset-0 w-full h-full overflow-hidden">
  <canvas 
    bind:this={canvas} 
    class="absolute inset-0 w-full h-full pointer-events-none" 
    style={`opacity: ${opacity}; z-index: ${zIndex};`}
  ></canvas>
</div>
