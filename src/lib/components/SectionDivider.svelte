<script>
  // Props pour personnaliser le séparateur
  export let customClass = '';
  export let backgroundColor = 'transparent';
  export let nextSectionColor = 'white';
  export let heightPx = 6; // hauteur en pixels
  export let opacity = 0.85; // opacité du séparateur
  export let showGradient = true; // option pour afficher ou masquer le gradient entre sections
</script>

<div 
  class="section-divider {customClass} {showGradient ? 'with-gradient' : 'no-gradient'}"
  style="
    --background-color: {backgroundColor}; 
    --next-section-color: {nextSectionColor};
    --divider-height: {heightPx}px;
    --divider-opacity: {opacity};
  "
>
  <div class="divider-container">
    <div class="divider-line"></div>
  </div>
</div>

<style>
  .section-divider {
    position: relative;
    width: 100%;
    height: var(--divider-height, 6px);
    z-index: 20;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  
  .divider-container {
    position: relative;
    width: 100%;
    height: 100%;
    opacity: var(--divider-opacity, 0.85);
  }
  
  .with-gradient .divider-container {
    background: linear-gradient(to bottom, var(--background-color), var(--next-section-color));
  }
  
  .no-gradient .divider-container {
    background: transparent;
  }
  
  .divider-line {
    position: absolute;
    top: calc(var(--divider-height, 6px) / 2 - 0.5px); /* Centré verticalement */
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, 
      rgba(44, 122, 68, 0) 0%, 
      rgba(76, 175, 80, 0.3) 25%,
      rgba(44, 122, 68, 0.7) 50%, 
      rgba(76, 175, 80, 0.3) 75%,
      rgba(44, 122, 68, 0) 100%);
    box-shadow: 0 0 4px rgba(44, 122, 68, 0.5);
    animation: pulse 5s ease-in-out infinite;
    filter: blur(0.3px);
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
</style>
