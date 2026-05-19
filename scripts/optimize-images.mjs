import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const imgDir = path.join(publicDir, 'img');

console.log('=== Optimisation des images DelcoInk ===\n');

// Tailles responsives pour les images de galerie
const SIZES = [
  { name: 'sm', width: 380 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 1200 }
];

const FLASH_CARD_SIZES = [
  { name: 'xs', width: 320, quality: 66 },
  { name: 'sm', width: 420, quality: 70 },
  { name: 'md', width: 560, quality: 74 }
];

async function convertToWebp(inputFile, quality = 80, outputName = null, resizeOptions = null) {
  const file = path.parse(inputFile);
  if (!outputName) {
    outputName = file.name + '.webp';
  }
  const outputPath = path.join(file.dir, outputName);
  
  console.log(`Conversion: ${file.base} -> ${outputName} (quality: ${quality}%)`);
  
  let pipeline = sharp(inputFile);
  
  if (resizeOptions) {
    pipeline = pipeline.resize(resizeOptions.width, resizeOptions.height, { 
      fit: 'inside',
      withoutEnlargement: true 
    });
  }
  
  await pipeline
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(outputPath);
  
  const originalSize = fs.statSync(inputFile).size;
  const newSize = fs.statSync(outputPath).size;
  const savedKB = ((originalSize - newSize) / 1024).toFixed(2);
  const percent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
  
  console.log(`  Original: ${(originalSize/1024).toFixed(2)} KB`);
  console.log(`  WebP: ${(newSize/1024).toFixed(2)} KB (économie: ${savedKB} KB = ${percent}%)\n`);
  return outputPath;
}

async function processGalleryImage(inputFile) {
  const file = path.parse(inputFile);
  
  // Ne pas traiter les fichiers déjà en WebP
  if (file.ext === '.webp') return;
  
  console.log(`\n--- Traitement galerie: ${file.base} ---`);
  
  // Créer les versions responsives
  for (const size of SIZES) {
    const outputName = `${file.name}-${size.name}.webp`;
    await convertToWebp(inputFile, 75, outputName, { width: size.width });
  }
  
  // Version originale en WebP aussi
  await convertToWebp(inputFile, 80, `${file.name}.webp`);
}

async function findImages(dir, extensions = ['.jpg', '.jpeg', '.png']) {
  const images = [];
  
  if (!fs.existsSync(dir)) return images;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      images.push(...await findImages(fullPath, extensions));
    } else if (extensions.includes(path.extname(item.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  
  return images;
}

async function main() {
  try {
    // Hero image
    console.log('--- Images Hero ---');
    const heroPath = path.join(imagesDir, 'delco-ink-studio-tatouage-chambery-hero.jpg');
    if (fs.existsSync(heroPath)) {
      await convertToWebp(heroPath, 72, 'delco-ink-studio-tatouage-chambery-hero-mobile.webp', { width: 768 });
      await convertToWebp(heroPath, 76, 'delco-ink-studio-tatouage-chambery-hero-tablet.webp', { width: 1280 });
      await convertToWebp(heroPath, 80, 'delco-ink-studio-tatouage-chambery-hero.webp', { width: 1920 });
    }

    // Logo
    console.log('--- Logo ---');
    const logoPath = path.join(imgDir, 'Logo.png');
    if (fs.existsSync(logoPath)) {
      await convertToWebp(logoPath, 90, 'Logo.webp');
      await convertToWebp(logoPath, 82, 'Logo-header.webp', { width: 96 });
      await convertToWebp(logoPath, 78, 'Logo-hero-mobile.webp', { width: 180 });
      await convertToWebp(logoPath, 82, 'Logo-hero.webp', { width: 320 });
    }

    // Images décoratives
    console.log('--- Images décoratives ---');
    const decorImages = [
      { file: path.join(imgDir, 'fougere.png'), quality: 80 },
      { file: path.join(imgDir, 'pngegg.png'), quality: 80 },
      { file: path.join(imgDir, 'joli feuille.png'), quality: 80 },
      { file: path.join(imgDir, 'monstera.png'), quality: 85 }
    ];

    for (const img of decorImages) {
      if (fs.existsSync(img.file)) {
        await convertToWebp(img.file, img.quality);
      }
    }

    // Images de galerie
    console.log('--- Images de galerie ---');
    const galleryDir = path.join(imagesDir, 'gallery');
    if (fs.existsSync(galleryDir)) {
      const galleryImages = await findImages(galleryDir);
      console.log(`Trouvé ${galleryImages.length} images dans la galerie`);
      
      for (const imgPath of galleryImages) { // Traiter toutes les images
        await processGalleryImage(imgPath);
      }
    }

    // Images flash
    console.log('--- Images flash ---');
    const flashDir = path.join(imagesDir, 'flash');
    if (fs.existsSync(flashDir)) {
      const flashImages = await findImages(flashDir);
      console.log(`Trouvé ${flashImages.length} images flash`);
      
      for (const imgPath of flashImages) {
        const file = path.parse(imgPath);
        if (file.ext === '.webp') continue;
        
        console.log(`Conversion flash: ${file.base}`);
        await convertToWebp(imgPath, 85, `${file.name}.webp`, { width: 800 });
        for (const size of FLASH_CARD_SIZES) {
          await convertToWebp(imgPath, size.quality, `${file.name}-${size.name}.webp`, { width: size.width });
        }
      }
    }

    // Portrait artiste
    console.log('--- Portrait artiste ---');
    const portraitPath = path.join(imagesDir, 'delco-ink-portrait-tatoueuse-chambery.jpg');
    if (fs.existsSync(portraitPath)) {
      await convertToWebp(portraitPath, 85, 'delco-ink-portrait-tatoueuse-chambery.webp', { width: 800 });
      await convertToWebp(portraitPath, 78, 'delco-ink-portrait-tatoueuse-chambery-sm.webp', { width: 360 });
      await convertToWebp(portraitPath, 80, 'delco-ink-portrait-tatoueuse-chambery-md.webp', { width: 520 });
    }

    // Logo artist
    console.log('--- Logo artist ---');
    const logoArtistPath = path.join(imagesDir, 'logoartist.png');
    if (fs.existsSync(logoArtistPath)) {
      await convertToWebp(logoArtistPath, 90, 'logoartist.webp', { width: 200 });
    }

    // Images artistes du studio
    console.log('--- Images artistes ---');
    const artistImages = [
      { file: path.join(imagesDir, 'tanjo-ink-tatoueur-chambery-fineline.jpg'), name: 'tanjo-ink-tatoueur-chambery-fineline.webp' },
      { file: path.join(imagesDir, 'delco-ink-tatoueuse-chambery-blackwork.jpg'), name: 'delco-ink-tatoueuse-chambery-blackwork.webp' },
      { file: path.join(imagesDir, 'diantre-tattoo-tatoueur-chambery-graphique.jpg'), name: 'diantre-tattoo-tatoueur-chambery-graphique.webp' }
    ];

    for (const img of artistImages) {
      if (fs.existsSync(img.file)) {
        console.log(`Conversion artiste: ${path.basename(img.file)}`);
        await convertToWebp(img.file, 85, img.name, { width: 800 });
      }
    }

    // Hero studio
    console.log('--- Hero Studio ---');
    const heroStudioPath = path.join(imagesDir, 'studio-enso-tatoueur-cognin-chambery.jpg');
    if (fs.existsSync(heroStudioPath)) {
      await convertToWebp(heroStudioPath, 80, 'studio-enso-tatoueur-cognin-chambery.webp', { width: 1920 });
    }

    // Images décoratives optimisées pour mobile
    console.log('--- Images décoratives (versions mobiles) ---');
    const decorativeImages = [
      { file: path.join(imgDir, 'pngegg.png'), name: 'pngegg-mobile.webp', width: 160 },
      { file: path.join(imgDir, 'joli feuille.png'), name: 'joli-feuille-mobile.webp', width: 192 },
      { file: path.join(imgDir, 'fougere.png'), name: 'fougere-mobile.webp', width: 240 },
      { file: path.join(imgDir, 'monstera.png'), name: 'monstera-mobile.webp', width: 180 },
      { file: path.join(imagesDir, 'logoartist.png'), name: 'logoartist-mobile.webp', width: 400 },
      { file: path.join(imagesDir, 'delco-ink-portrait-tatoueuse-chambery.jpg'), name: 'delco-ink-portrait-tatoueuse-chambery-mobile.webp', width: 400 }
    ];

    for (const img of decorativeImages) {
      if (fs.existsSync(img.file)) {
        console.log(`Conversion décorative mobile: ${path.basename(img.file)}`);
        await convertToWebp(img.file, 75, img.name, { width: img.width });
      }
    }

    console.log('=== Optimisation terminée ===');
    console.log('Les fichiers .webp ont été générés avec différentes tailles responsives');
  } catch (err) {
    console.error('Erreur:', err.message);
    process.exit(1);
  }
}

main();
