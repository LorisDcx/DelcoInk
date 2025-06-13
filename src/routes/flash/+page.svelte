<script lang="ts">
  import { onMount } from 'svelte';
  import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';
  
  // Modèle pour les données des flashs
  interface FlashItem {
    id: number;
    title: string;
    image: string;
    category: string;
    size: string;
  }
  
  // Initialisation d'un tableau vide pour les flashs
  let flashItems: FlashItem[] = [];
  
  // Fonction pour convertir un nom de fichier en titre
  function filenameToTitle(filename: string): string {
    // Enlever l'extension
    const name = filename.split('.').slice(0, -1).join('.');
    // Remplacer les traits d'union et underscores par des espaces
    return name.replace(/[-_]/g, ' ')
      // Mettre la première lettre en majuscule et les autres après un espace
      .replace(/(^\w|\s\w)/g, match => match.toUpperCase());
  }
  
  // Fonction pour générer des données basées sur les images réelles du dossier
  function generateFlashItems() {
    // Liste des fichiers réels présents dans le dossier static/images/flash
    const realFlashFiles = [
      'Phénix.jpg',
      'Planche Dragons.jpg',
      'Planche FEMME - 2.jpg',
      'Planche FEMME .jpg',
      'Planche Miles Morales.jpg',
      'Planche Plantes.jpg',
      'Planche Spiderman.jpg'
    ];
    
    // Créer les objets pour chaque image
    const generatedItems = realFlashFiles.map((file, index) => {
      return {
        id: index + 1,
        title: filenameToTitle(file),
        image: `/images/flash/${file}`,
        // Assigner une catégorie aléatoire
        category: ['Blackwork', 'Illustratif', 'Minimaliste'][Math.floor(Math.random() * 3)],
        size: ['Petit', 'Moyen', 'Grand'][Math.floor(Math.random() * 3)]
      };
    });
    
    return generatedItems;
  }
  
  onMount(() => {
    // Ici, nous simulons le chargement des images
    // Dans une vraie implémentation, vous pourriez charger cette liste depuis le serveur
    flashItems = generateFlashItems();
  });
  
  // Filtres
  let selectedCategory: string = 'all';
  let selectedSize: string = 'all';
  
  // Fonction pour filtrer les flashs
  $: filteredFlashItems = flashItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const sizeMatch = selectedSize === 'all' || item.size === selectedSize;
    return categoryMatch && sizeMatch;
  });
  
  // Liste unique des catégories
  $: categories = ['all', ...new Set(flashItems.map(item => item.category))];
  
  // Liste unique des tailles
  $: sizes = ['all', ...new Set(flashItems.map(item => item.size))];
  
  // Pour l'affichage détaillé d'un flash
  let selectedFlash: FlashItem | null = null;
  
  function showFlashDetail(flash: FlashItem) {
    selectedFlash = flash;
  }
  
  function closeFlashDetail() {
    selectedFlash = null;
  }
</script>

<svelte:head>
  <title>Catalogue de Flash Tattoos | Delco Ink</title>
  <meta name="description" content="Découvrez notre catalogue de flash tattoos disponibles chez Delco Ink. Designs uniques, style blackwork illustratif.">
</svelte:head>

<div class="relative">
  <ParticlesBackground />
  
  <section class="py-20 px-4">
    <div class="container mx-auto">
      <h1 class="font-title text-4xl md:text-5xl mb-3 text-center text-gray-900">Flash Tattoos</h1>
      <p class="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        Découvrez notre collection de designs disponibles immédiatement pour tatouage.
        Ces créations originales n'attendent que vous. Chaque design ne sera généralement tatoué qu'une seule fois.
      </p>
      
      <!-- Filtres -->
      <div class="mb-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-center gap-4">
        <div class="flex-1">
          <label for="category-filter" class="block mb-2 font-medium text-gray-700">Catégorie</label>
          <select 
            id="category-filter"
            bind:value={selectedCategory}
            class="w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:border-forest focus:ring-1 focus:ring-forest"
          >
            {#each categories as category}
              <option value={category}>{category === 'all' ? 'Toutes les catégories' : category}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex-1">
          <label for="size-filter" class="block mb-2 font-medium text-gray-700">Taille</label>
          <select 
            id="size-filter"
            bind:value={selectedSize}
            class="w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:border-forest focus:ring-1 focus:ring-forest"
          >
            {#each sizes as size}
              <option value={size}>{size === 'all' ? 'Toutes les tailles' : size}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <!-- Grille de flashs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each filteredFlashItems as flash}
          <div 
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            on:click={() => showFlashDetail(flash)}
            on:keydown={(e) => e.key === 'Enter' && showFlashDetail(flash)}
            role="button"
            tabindex="0"
          >
            <div class="relative pb-[100%] overflow-hidden">
              <img 
                src={flash.image} 
                alt={flash.title}
                class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div class="p-4">
              <h3 class="font-title text-lg text-gray-800">{flash.title}</h3>
              <div class="mt-2 flex justify-between">
                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{flash.category}</span>
                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{flash.size}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Message si pas de résultats -->
      {#if filteredFlashItems.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-600">Aucun flash ne correspond à vos critères de recherche.</p>
        </div>
      {/if}
    </div>
  </section>
  
  <!-- Modal pour le détail d'un flash -->
  {#if selectedFlash}
    <div class="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col">
        <!-- En-tête de la modal -->
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="font-title text-2xl text-gray-900">{selectedFlash.title}</h3>
          <button 
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
            on:click={closeFlashDetail}
            aria-label="Fermer le détail du flash"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Corps de la modal -->
        <div class="flex-1 overflow-auto">
          <div class="p-6">
            <div class="mb-6">
              <img 
                src={selectedFlash.image} 
                alt={selectedFlash.title}
                class="w-full h-auto max-h-[50vh] object-contain"
              />
            </div>
            
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Catégorie</h4>
                  <p class="text-gray-800">{selectedFlash.category}</p>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Taille</h4>
                  <p class="text-gray-800">{selectedFlash.size}</p>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p class="text-gray-800">
                  Pour réserver ce design pour un tatouage, veuillez nous contacter en précisant la référence 
                  #{selectedFlash.id}. Le tatouage peut être légèrement personnalisé selon vos préférences.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pied de la modal -->
        <div class="px-6 py-4 border-t border-gray-100 flex justify-end">
          <a 
            href="#contact" 
            class="inline-flex items-center justify-center px-6 py-2 bg-forest text-white rounded-md hover:bg-opacity-90 transition-colors"
            on:click={closeFlashDetail}
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Styles spécifiques à la page Flash */
  :global(body) {
    overflow-y: auto; /* Assure que le scroll fonctionne même avec la modal ouverte */
  }
  
  /* Animation pour les cartes de flash */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .grid > div {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .grid > div:nth-child(n) {
    animation-delay: calc(0.1s * var(--n, 0));
  }
  
  .grid > div:nth-child(1) { --n: 1; }
  .grid > div:nth-child(2) { --n: 2; }
  .grid > div:nth-child(3) { --n: 3; }
  .grid > div:nth-child(4) { --n: 4; }
  .grid > div:nth-child(5) { --n: 5; }
  .grid > div:nth-child(6) { --n: 6; }
  .grid > div:nth-child(7) { --n: 7; }
  .grid > div:nth-child(8) { --n: 8; }
  .grid > div:nth-child(9) { --n: 9; }
  .grid > div:nth-child(10) { --n: 10; }
</style>
