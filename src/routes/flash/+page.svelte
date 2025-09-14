<script lang="ts">
  import { onMount } from 'svelte';
  import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';

  interface FlashItem {
    id: number;
    title: string;
    image: string;
    category: string;
    size: string;
  }

  let flashItems: FlashItem[] = [];

  function filenameToTitle(filename: string): string {
    const name = filename.split('.').slice(0, -1).join('.');
    return name.replace(/[-_]/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  }

  function generateFlashItems() {
    const realFlashFiles = [
      'Phénix.jpg',
      'Planche Dragons.jpg',
      'Planche FEMME - 2.jpg',
      'Planche FEMME .jpg',
      'Planche Miles Morales.jpg',
      'Planche Plantes.jpg',
      'Planche Spiderman.jpg'
    ];
    return realFlashFiles.map((file, i) => ({
      id: i + 1,
      title: filenameToTitle(file),
      image: `/images/flash/${file}`,
      category: ['Blackwork', 'Illustratif', 'Minimaliste'][Math.floor(Math.random() * 3)],
      size: ['Petit', 'Moyen', 'Grand'][Math.floor(Math.random() * 3)]
    }));
  }

  onMount(() => { flashItems = generateFlashItems(); });

  let selectedCategory = 'all';
  let selectedSize = 'all';

  $: filteredFlashItems = flashItems.filter((it) =>
    (selectedCategory === 'all' || it.category === selectedCategory) &&
    (selectedSize === 'all' || it.size === selectedSize)
  );

  $: categories = ['all', ...new Set(flashItems.map((i) => i.category))];
  $: sizes = ['all', ...new Set(flashItems.map((i) => i.size))];

  let selectedFlash: FlashItem | null = null;
  const showFlashDetail = (f: FlashItem) => selectedFlash = f;
  const closeFlashDetail = () => selectedFlash = null;
</script>

<!-- 👉 TOUT le head ici (pas dans <script>) -->
<svelte:head>
  <title>Flash Tattoos blackwork à Chambéry | Delco Ink</title>
  <meta name="description" content="Découvrez nos flash tattoos disponibles chez Delco Ink à Chambéry : designs blackwork et illustratifs, pièces uniques, réservables sur rendez-vous." />
  <link rel="canonical" href="https://www.delco-ink.fr/flash" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Flash Tattoos à Chambéry | Delco Ink" />
  <meta property="og:description" content="Catalogue de flash tattoos disponibles : blackwork, illustratif. Réservation sur rendez-vous à Chambéry." />
  <meta property="og:url" content="https://www.delco-ink.fr/flash" />
  <meta property="og:image" content="https://www.delco-ink.fr/images/og-image.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Flash Tattoos à Chambéry | Delco Ink" />
  <meta name="twitter:description" content="Catalogue de flash tattoos disponibles : blackwork, illustratif. Réservation sur rendez-vous à Chambéry." />
  <meta name="twitter:image" content="https://www.delco-ink.fr/images/og-image.jpg" />
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
                  Si ce flash vous interesse vous pouvez m'envoyer un email ou un message sur mon compte instagram dans la rubrique contact pour en savoir plus.
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
