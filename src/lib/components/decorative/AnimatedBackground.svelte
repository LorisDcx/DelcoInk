<script>
  export let type = "cloud"; // cloud, grain, wave
  export let opacity = 0.1;
  export let color1 = "#2d6a4f";
  export let color2 = "#855485";
  export let duration = 20; // seconds
  export let zIndex = -10;
</script>

<div 
  class="animated-bg {type}" 
  style="--opacity: {opacity}; --color1: {color1}; --color2: {color2}; --duration: {duration}s; z-index: {zIndex};"
></div>

<style>
  .animated-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
  
  .cloud {
    background: linear-gradient(
      45deg, 
      rgba(45, 106, 79, calc(var(--opacity) * 0.8)) 0%, 
      rgba(133, 84, 133, calc(var(--opacity) * 0.8)) 50%, 
      rgba(45, 106, 79, calc(var(--opacity) * 0.8)) 100%
    );
    background-size: 200% 200%;
    animation: cloudMove var(--duration) ease-in-out infinite;
    mix-blend-mode: overlay;
    filter: blur(60px);
  }
  
  @keyframes cloudMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .grain::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='var(--opacity)'/%3E%3C/svg%3E");
    opacity: var(--opacity);
    mix-blend-mode: overlay;
  }
  
  .wave {
    overflow: hidden;
  }
  
  .wave::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      rgba(45, 106, 79, calc(var(--opacity) * 0.5)) 0deg,
      rgba(133, 84, 133, calc(var(--opacity) * 0.5)) 90deg,
      rgba(45, 106, 79, calc(var(--opacity) * 0.5)) 180deg,
      rgba(133, 84, 133, calc(var(--opacity) * 0.5)) 270deg,
      rgba(45, 106, 79, calc(var(--opacity) * 0.5)) 360deg
    );
    animation: rotate var(--duration) linear infinite;
    mix-blend-mode: overlay;
    filter: blur(30px);
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  :global(:root) {
    --color1-rgb: 45, 106, 79; /* Forest green in RGB */
    --color2-rgb: 133, 84, 133; /* Prune in RGB */
  }
</style>
