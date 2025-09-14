<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Propriétés configurables
  export let opacity = 0.8;
  export let zIndex = 5;
  export let particleCount = 20; // Default particle count
  
  // Références DOM
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  
  // Configuration des particules
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
  }
  
  let particles: Particle[] = [];
  let animationId: number;
  let isMobile = false;
  
  // Couleurs des particules (teintes de vert)
  const particleColors = [
    '#4CAF50', // vert frais
    '#8BC34A', // vert lime clair
    '#66BB6A', // vert plus soutenu
    '#81C784', // vert moyen
    '#A5D6A7'  // vert pâle
  ];
  
  // Création des particules
  function createParticles() {
    if (!canvas) return;
    
    const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount; // Moins de particules sur mobile
    particles = [];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      });
    }
  }
  
  // Animation des particules
  function animateParticles() {
    if (!ctx || !canvas) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Mettre à jour et dessiner chaque particule
    particles.forEach(p => {
      // Mise à jour de la position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Rebond sur les bords
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Dessiner la particule
      if (ctx) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
    });
  }
  
  // Redimensionnement du canvas
  function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    
    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    
    // Mettre à jour la taille du canvas
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Recréer les particules pour la nouvelle taille
    createParticles();
  }
  
  // Boucle d'animation
  function animate(timestamp: number) {
    if (!ctx) return;
    
    animateParticles();
    animationId = requestAnimationFrame(animate);
  }
  
  // Gestion du redimensionnement avec debounce
  let resizeTimeout: NodeJS.Timeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
    }, 100);
  }
  
  // Initialisation
  onMount(() => {
    if (!browser) return;
    
    // Détecter si on est sur mobile
    isMobile = window.innerWidth < 768;
    
    // Configurer le canvas
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Redimensionner et créer les particules
    resizeCanvas();
    
    // Gestion du redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Démarrer l'animation
    animationId = requestAnimationFrame(animate);
    
    // Nettoyage
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div class="particles-container absolute inset-0 w-full h-full overflow-hidden">
  <canvas 
    bind:this={canvas}
    class="absolute inset-0 w-full h-full pointer-events-none" 
    style="opacity: {opacity}; z-index: {zIndex}; will-change: transform;"
  ></canvas>
</div>
