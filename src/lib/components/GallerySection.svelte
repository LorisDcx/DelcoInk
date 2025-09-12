<script lang="ts">
  import { onMount } from 'svelte';
  import GalleryCarousel from './GalleryCarousel.svelte';
  
  // Ce composant est déprécié et sert maintenant juste de wrapper autour de GalleryCarousel
  onMount(() => {
    console.log('GallerySection est déprécié. Utilisez GalleryCarousel.svelte directement.');
  });
</script>

<!-- Ce composant est déprécié et sert simplement de wrapper autour de GalleryCarousel -->
<div class="gallery-section">
  <GalleryCarousel />
</div>

<style>
  .gallery-section {
    width: 100%;
  }
</style>

<!-- 
L'ancien code du composant a été retiré pour éviter les erreurs de parsing et TypeScript.
Pour accéder à l'ancien code, consultez les versions précédentes du dépôt.

Ce fichier a été gardé uniquement pour des raisons de compatibilité avec les imports existants,
mais il est recommandé de migrer vers l'utilisation directe de GalleryCarousel.svelte.
-->
