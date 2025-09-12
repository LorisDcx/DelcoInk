<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  export let opacity: number = 0.8;
  export let particleCount: number = 36; // Augmenté de 20% (30 + 20% = 36)
  export let zIndex: number = 5;
  export let clickable: boolean = true; // Nouvelle prop pour contrôler si les particules sont cliquables
  
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  
  // Couleurs des particules exclusivement en teintes de vert
  const particleColors = [
    '#4CAF50', // vert frais
    '#8BC34A', // vert lime clair
    '#66BB6A', // vert plus soutenu
    '#81C784', // vert moyen
    '#A5D6A7', // vert pâle
    '#C8E6C9', // vert très pâle
    '#00E676', // vert vif
    '#69F0AE', // vert menthe
    '#B9F6CA'  // vert aqua pâle
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
    exploding?: boolean;
    explosionProgress?: number;
    explosionSpeed?: number;
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
    particles = particles.filter(p => p.opacity > 0.05); // Ne garder que les particules visibles
    
    particles.forEach(p => {
      // Pour les particules en éclatement
      if (p.exploding && p.explosionProgress !== undefined && p.explosionSpeed !== undefined) {
        p.explosionProgress += p.explosionSpeed;
        p.opacity -= 0.02; // Très lent pour un effet d'évanouissement subtil
        
        // Déplacer les particules vers l'extérieur selon leur direction d'éclatement
        if (p.speedX) p.x += p.speedX * 1.2; // Augmenter la vitesse pour renforcer l'effet d'éclatement
        if (p.speedY) p.y += p.speedY * 1.2;
        
        // Pour les petites particules, l'effet est différent
        if (p.size < 1.5) {
          p.size *= 0.98; // Les microgouttelettes rétrécissent lentement
        } else {
          p.size *= 0.99; // Toutes les particules rétrécissent légèrement
        }
      } else {
        // Déplacer la particule normalement
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Rebondir sur les bords
        if (canvas && (p.x < 0 || p.x > canvas.width)) p.speedX = -p.speedX;
        if (canvas && (p.y < 0 || p.y > canvas.height)) p.speedY = -p.speedY;
      }
      
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
        gradient.addColorStop(0.2, centerColor); // Centre plus lumineux
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
  
  // Gestion du clic sur une particule
  function handleCanvasClick(event: MouseEvent) {
    if (!canvas || !ctx) return;
    
    // Position du clic relative au canvas
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Chercher la particule la plus proche du clic dans un certain rayon
    let closestParticle: Particle | null = null;
    let closestDistance = 15; // Rayon de détection du clic (en pixels)
    
    particles.forEach(p => {
      // Ignorer les particules déjà en éclatement
      if (p.exploding) return;
      
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestParticle = p;
      }
    });
    
    // Si on a trouvé une particule proche du clic, la faire éclater
    if (closestParticle) {
      // Prevénir la propagation du clic uniquement quand une particule est touchée
      event.stopPropagation();
      event.preventDefault();
      explodeParticle(closestParticle, clickX, clickY);
    }
    // Sinon, laisse passer le clic vers les éléments en dessous
  }
  
  // Créer un effet d'éclatement en divisant la particule en plusieurs plus petites
  function explodeParticle(particle: Particle, x: number, y: number) {
    // Effet subtil d'éclatement
    if (ctx && canvas) {
      // Léger effet lumineux au point d'éclatement
      ctx.beginPath();
      const flashGradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 2.5);
      flashGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      flashGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
      flashGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = flashGradient;
      ctx.arc(x, y, particle.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Supprimer la particule cliquée immédiatement pour ne pas gêner l'effet d'éclatement
    particles = particles.filter(p => p !== particle);
    
    // Créer l'effet d'éclatement avec 6 à 10 petites particules
    
    // Division de la particule principale en 6-10 fragments
    const numFragments = 6 + Math.floor(Math.random() * 5); // 6-10 fragments
    for (let i = 0; i < numFragments; i++) {
      const angle = (Math.PI * 2 / numFragments) * i;
      const speed = 0.8 + Math.random() * 0.8; // Vitesse plus rapide pour plus d'effet d'éclatement
      
      // Créer une particule avec un léger décalage initial pour éviter l'impression d'implosion
      const offsetFactor = 2; // Décalage initial pour simuler un effet d'éclatement instantané
      particles.push({
        x: particle.x + Math.cos(angle) * particle.size * offsetFactor * 0.5, // Décalage initial
        y: particle.y + Math.sin(angle) * particle.size * offsetFactor * 0.5, // Décalage initial
        size: particle.size * (0.3 + Math.random() * 0.3), // 30-60% de la taille originale
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: particle.opacity * (0.6 + Math.random() * 0.4), // 60-100% de l'opacité originale
        color: particle.color,
        pulsating: false,
        exploding: true,
        explosionProgress: 0,
        explosionSpeed: 0.03 + Math.random() * 0.03
      });
    }
    
    // Quelques microgouttelettes en plus pour un effet éclatement plus riche
    const numDroplets = 3 + Math.floor(Math.random() * 5); // 3-7 microgouttelettes
    for (let i = 0; i < numDroplets; i++) {
      // Angles aléatoires
      const angle = Math.random() * Math.PI * 2;
      // Vitesses variables pour un pattern d'éclatement plus naturel
      const speed = 0.3 + Math.random() * 1.2;
      
      // Microgouttelettes avec décalage initial également
      const microOffsetFactor = 1.5;
      particles.push({
        x: particle.x + Math.cos(angle) * particle.size * microOffsetFactor * 0.5,
        y: particle.y + Math.sin(angle) * particle.size * microOffsetFactor * 0.5,
        size: particle.size * 0.15 * (0.5 + Math.random() * 0.5), // Particules très petites
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 0.4 + Math.random() * 0.3, // Opacité variée
        color: particle.color,
        pulsating: false,
        exploding: true,
        explosionProgress: 0,
        explosionSpeed: 0.04 + Math.random() * 0.04
      });
    }
    
    // Double cercle irisé pour un effet plus éclatant
    createRippleEffect(particle.x, particle.y, particle.color);
    // Second cercle légèrement plus petit avec délai
    setTimeout(() => {
      if (canvas && ctx) {
        createRippleEffect(particle.x, particle.y, particle.color);
      }
    }, 120);
  }
  
  // Créer un effet d'iridescence subtil après éclatement
  function createRippleEffect(x: number, y: number, color: string, scaleFactor: number = 1) {
    // Convertir la couleur hexadécimale en composants RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Créer un cercle irisé qui s'évanouit avec une taille de base
    const baseSize = 3; // Taille de base pour le cercle
    const ripple = {
      x: x,
      y: y,
      radius: baseSize, // Commence petit
      opacity: 0.5,
      color: `rgba(${r}, ${g}, ${b}, 0.2)`
    };
    
    // Animation du cercle irisé qui s'évanouit
    gsap.to(ripple, {
      radius: baseSize * 3, // S'agrandit légèrement
      opacity: 0,
      duration: 0.7 + Math.random() * 0.3,
      ease: "power1.out",
      onUpdate: () => {
        if (ctx && canvas) {
          // Cercle irisé très fin
          ctx.beginPath();
          ctx.strokeStyle = ripple.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = ripple.opacity;
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    });
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

  // Ce bloc a été supprimé car c'était un doublon de la fonction handleCanvasClick

  onMount(() => {
    // Initialiser le canvas principal pour l'affichage
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
        window.addEventListener('resize', () => {
          resizeCanvas();
        });
        
        // Ajouter l'écouteur d'événement pour détecter les clics sur le canvas
        if (clickable) {
          canvas.addEventListener('click', handleCanvasClick);
        }
        
        createParticles();
        animateParticles();
        // Plus besoin de drawHitboxes()
        
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
          if (clickable && canvas) {
            canvas.removeEventListener('click', handleCanvasClick);
          }
          resizeObserver.disconnect();
        };
      }
    }
  });
  
  // Plus besoin de resizeHitboxCanvas
</script>

<div class="particles-container absolute inset-0 w-full h-full overflow-hidden">
  <canvas 
    bind:this={canvas} 
    class="absolute inset-0 w-full h-full {clickable ? '' : 'pointer-events-none'}" 
    style={`opacity: ${opacity}; z-index: ${zIndex}; cursor: ${clickable ? 'pointer' : 'default'};`}
  ></canvas>
</div>
