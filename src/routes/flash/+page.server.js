import { readdir } from 'fs/promises';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    // Chemin vers le dossier des images flash
    const flashDir = path.join(process.cwd(), 'static', 'images', 'flash');
    
    // Liste tous les fichiers dans le dossier
    const files = await readdir(flashDir);
    
    // Filtrer pour ne garder que les images
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Créer les objets pour chaque image
    const flashItems = imageFiles.map((file, index) => {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      return {
        id: index + 1,
        title: name,
        // Formater le chemin de l'image pour le navigateur
        image: `/images/flash/${file}`,
        // Par défaut, on peut assigner une catégorie générique
        // Ces valeurs pourront être modifiées manuellement si besoin
        category: "Blackwork",
        size: "Moyen"
      };
    });
    
    return {
      flashItems
    };
  } catch (error) {
    console.error('Erreur lors du chargement des images flash:', error);
    return {
      flashItems: []
    };
  }
}
