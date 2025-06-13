<script>
  /* Full-book page-flip with all pages pre-rendered */
  const rawImages = [
    '/images/gallery/tattoo-1.jpg',
    '/images/gallery/tattoo-2.jpg',
    '/images/gallery/tattoo-3.jpg',
    '/images/gallery/tattoo-4.jpg',
    '/images/gallery/tattoo-5.jpg',
    '/images/gallery/tattoo-6.jpg',
    '/images/gallery/tattoo-7.jpg',
    '/images/gallery/tattoo-8.jpg'
  ];

  // Organiser les images en paires (gauche/droite)
  const pairs = [];
  for (let i = 0; i < rawImages.length; i += 2) {
    pairs.push({ left: rawImages[i], right: rawImages[i + 1] || rawImages[i] });
  }
  const totalPairs = pairs.length;

  // État des pages
  let current = 0; // index de la paire affichée actuellement

  // Contrôles de navigation
  function nextPage() {
    if (current < totalPairs - 1) {
      current += 1;
    }
  }
  
  function prevPage() {
    if (current > 0) {
      current -= 1;
    }
  }
</script>

<style>
  .book {
    position: relative;
    width: 100%;
    max-width: 720px;
    height: 460px;
    margin: 0 auto;
    perspective: 2000px;
    user-select: none;
  }

  .book-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    transform-style: preserve-3d;
    transition: transform 0.7s ease;
  }

  .page {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    backface-visibility: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .page img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .leftPage {
    left: 0;
    border-right: 1px solid #ddd;
  }

  .rightPage {
    right: 0;
  }

  /* Coins cornés */
  .leftPage::before, .rightPage::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    pointer-events: none;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.15) 80%);
  }

  .leftPage::before {
    left: 0;
    bottom: 0;
    clip-path: polygon(0 100%, 100% 100%, 0 0);
  }

  .rightPage::after {
    right: 0;
    bottom: 0;
    clip-path: polygon(100% 100%, 0 100%, 100% 0);
  }

  /* Contrôles de navigation */
  .controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0 20px;
    z-index: 10;
  }

  .nav-button {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  .nav-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .nav-button:disabled {
    opacity: 0.3;
    cursor: default;
    transform: scale(1);
  }

  /* Animation de page qui tourne */
  .page-turn-enter {
    animation: flipRightToLeft 0.7s forwards;
  }
  
  .page-turn-exit {
    animation: flipLeftToRight 0.7s forwards;
  }

  @keyframes flipRightToLeft {
    from { transform: rotateY(0); }
    to { transform: rotateY(-180deg); }
  }

  @keyframes flipLeftToRight {
    from { transform: rotateY(-180deg); }
    to { transform: rotateY(0); }
  }
</style>

<div class="book">
  <div class="book-container">
    <!-- Page gauche -->
    <div class="page leftPage">
      <img src={pairs[current].left} alt={`Page gauche ${current + 1}`} draggable="false" />
    </div>
    
    <!-- Page droite -->
    <div class="page rightPage">
      <img src={pairs[current].right} alt={`Page droite ${current + 1}`} draggable="false" />
    </div>
  </div>

  <!-- Contrôles de navigation -->
  <div class="controls">
    <button 
      type="button" 
      class="nav-button" 
      on:click={prevPage} 
      disabled={current <= 0}
      aria-label="Page précédente">
      <!-- Icône flèche gauche -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    
    <button 
      type="button" 
      class="nav-button" 
      on:click={nextPage} 
      disabled={current >= totalPairs - 1}
      aria-label="Page suivante">
      <!-- Icône flèche droite -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  </div>

  <!-- Indicateur de progression -->
  <p class="text-center text-sm mt-4 text-gray-500 select-none">
    {current + 1} / {totalPairs}
  </p>
</div>
