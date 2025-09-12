<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let color = "#2d6a4f";
  export let opacity = 0.2;
  export let count = 30;
  export let minSize = 2;
  export let maxSize = 8;
  export let minSpeed = 0.2;
  export let maxSpeed = 0.6;
  export let interactive = false;
  
  let canvas;
  let ctx;
  let particles = [];
  let animationId;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let isActive = false;
  
  class Particle {
    constructor(x, y, size, speedX, speedY, opacity) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.baseSize = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.opacity = opacity;
      this.angle = Math.random() * Math.PI * 2; // Pour la rotation
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Rebondir aux bords
      if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
      if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
      
      // Ajout d'un léger mouvement organique
      this.angle += 0.01;
      this.size = this.baseSize + Math.sin(this.angle) * 0.5;
    }
    
    draw(ctx) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Forme légèrement irrégulière pour un effet wabi-sabi
      const irregularFactor = 0.2; // Facteur d'irrégularité
      const controlPoints = [];
      
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const randomRadius = this.size * (1 + (Math.random() * irregularFactor) - irregularFactor/2);
        const x = this.x + Math.cos(angle) * randomRadius;
        const y = this.y + Math.sin(angle) * randomRadius;
        controlPoints.push({ x, y });
      }
      
      ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
      
      for (let i = 0; i < controlPoints.length; i++) {
        const nextIndex = (i + 1) % controlPoints.length;
        const nextNextIndex = (i + 2) % controlPoints.length;
        
        const xc = (controlPoints[nextIndex].x + controlPoints[nextNextIndex].x) / 2;
        const yc = (controlPoints[nextIndex].y + controlPoints[nextNextIndex].y) / 2;
        
        ctx.quadraticCurveTo(controlPoints[nextIndex].x, controlPoints[nextIndex].y, xc, yc);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  function createParticles() {
    particles = [];
    for (let i = 0; i < count; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      const speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + (Math.random() > 0.5 ? minSpeed : -minSpeed);
      const speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + (Math.random() > 0.5 ? minSpeed : -minSpeed);
      const particleOpacity = (Math.random() * 0.5 + 0.5) * opacity; // Variation d'opacité
      
      particles.push(new Particle(x, y, size, speedX, speedY, particleOpacity));
    }
  }
  
  function animate() {
    if (!isActive) return;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  function handleMouseMove(e) {
    if (!interactive || !isActive) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particles.forEach(particle => {
      // Calculer la distance entre la particule et le curseur
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Appliquer une répulsion si proche
      if (distance < 80) {
        const forceX = dx / distance * 0.5;
        const forceY = dy / distance * 0.5;
        particle.speedX -= forceX;
        particle.speedY -= forceY;
      }
    });
  }
  
  function handleResize() {
    if (!canvas) return;
    
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    createParticles();
  }
  
  onMount(() => {
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    isActive = true;
    createParticles();
    animate();
    
    window.addEventListener('resize', handleResize);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      isActive = false;
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });
  
  onDestroy(() => {
    isActive = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
</script>

<canvas bind:this={canvas} class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
