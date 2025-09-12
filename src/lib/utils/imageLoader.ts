import { browser } from '$app/environment';

export interface GalleryImage {
  id: number;
  src: string;
  fileName: string;
  alt: string;
  category: 'blackwork' | 'popculture' | 'flash';
  description?: string;
}

// Images par défaut pour fallback si chargement dynamique échoue
export const defaultGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery/blackwork/tattoo-1.jpg',
    fileName: 'tattoo-1.jpg',
    alt: 'Tatouage blackwork géométrique',
    category: 'blackwork',
    description: 'Tatouage blackwork avec motifs géométriques'
  },
  {
    id: 2,
    src: '/images/gallery/popculture/tattoo-2.jpg',
    fileName: 'tattoo-2.jpg',
    alt: 'Tatouage pop-culture inspiré de film',
    category: 'popculture',
    description: 'Design pop-culture basé sur un film iconique'
  },
  {
    id: 3,
    src: '/images/gallery/flashtattoo/tattoo-3.jpg',
    fileName: 'tattoo-3.jpg',
    alt: 'Flash tattoo traditionnel',
    category: 'flash',
    description: 'Design flash traditionnel'
  }
];

// Fonction pour charger les images dynamiquement depuis les dossiers statiques
export async function loadDynamicImages(): Promise<GalleryImage[]> {
  // Si pas de navigateur (SSR), retourner les images par défaut
  if (!browser) return defaultGalleryImages;
  
  const dynamicImages: GalleryImage[] = [];
  let nextId = 1;
  
  // Au lieu d'utiliser import.meta.glob, nous allons utiliser les chemins directs avec ?url
  // pour les images que nous avons trouvées dans le répertoire static
  
  // Liste des images blackwork
  const blackworkImages = [
    '/images/gallery/blackwork/tattoo-1.jpg?url',
    '/images/gallery/blackwork/tattoo-4.jpg?url',
    '/images/gallery/blackwork/tattoo-6.jpg?url',
    '/images/gallery/blackwork/tattoo-8.jpg?url'
  ];
  
  // Ajouter les images blackwork
  for (const imagePath of blackworkImages) {
    const fileName = imagePath.split('/').pop()?.replace('?url', '') || '';
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    
    dynamicImages.push({
      id: nextId++,
      src: imagePath,
      fileName: fileName,
      alt: `Tatouage blackwork - ${nameWithoutExt}`,
      category: 'blackwork',
      description: `Objet: Tatouage blackwork ${nameWithoutExt}`
    });
  }
  
  // Liste des images popculture
  const popCultureImages = [
    '/images/gallery/popculture/tattoo-2.jpg?url'
  ];
  
  // Ajouter les images popculture
  for (const imagePath of popCultureImages) {
    const fileName = imagePath.split('/').pop()?.replace('?url', '') || '';
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    
    dynamicImages.push({
      id: nextId++,
      src: imagePath,
      fileName: fileName,
      alt: `Tatouage pop-culture - ${nameWithoutExt}`,
      category: 'popculture',
      description: `Objet: Illustration pop-culture ${nameWithoutExt}`
    });
  }
  
  // Liste des images flash
  const flashImages = [
    '/images/gallery/flashtattoo/tattoo-3.jpg?url',
    '/images/gallery/flashtattoo/tattoo-5.jpg?url',
    '/images/gallery/flashtattoo/tattoo-7.jpg?url'
  ];
  
  // Ajouter les images flash
  for (const imagePath of flashImages) {
    const fileName = imagePath.split('/').pop()?.replace('?url', '') || '';
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    
    dynamicImages.push({
      id: nextId++,
      src: imagePath,
      fileName: fileName,
      alt: `Flash tattoo - ${nameWithoutExt}`,
      category: 'flash',
      description: `Objet: Flash design ${nameWithoutExt}`
    });
  }
    
  // Si aucune image dynamique n'a été trouvée, utiliser les images par défaut
  return dynamicImages.length > 0 ? dynamicImages : defaultGalleryImages;
}

// Organise les images selon la catégorie spécifiée (blackwork -> popculture -> flash)
export async function organizeImages(): Promise<GalleryImage[]> {
  // Charger les images dynamiquement
  const loadedImages = await loadDynamicImages();
  
  // Réorganiser les images pour s'assurer qu'elles sont correctement triées par catégorie
  return [
    // D'abord les images blackwork
    ...loadedImages.filter(img => img.category === 'blackwork'),
    // Ensuite les images pop-culture
    ...loadedImages.filter(img => img.category === 'popculture'),
    // Enfin les images flash
    ...loadedImages.filter(img => img.category === 'flash')
  ];
}
