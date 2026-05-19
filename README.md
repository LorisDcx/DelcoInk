# Delco Ink - Astro + React

Site web pour Delco Ink, studio de tatouage à Chambéry/Cognin. Migré de SvelteKit vers **Astro + React**.

## 🚀 Stack technique

- **Astro 4** - Framework web avec SSG
- **React 18** - Composants interactifs (islands)
- **Tailwind CSS 3** - Styling
- **GSAP** - Animations
- **Netlify** - Déploiement

## 📦 Installation

```bash
cd astro
npm install
```

## 🛠️ Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de dev sur `localhost:4321` |
| `npm run build` | Build le site dans `./dist/` |
| `npm run preview` | Prévisualise le build localement |

## 📁 Structure du projet

```
astro/
├── public/              # Assets statiques (à copier depuis /static)
│   ├── img/            # Logo, feuilles décoratives
│   ├── images/         # Hero, galerie, portraits
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── decorative/ # ParticlesBackground, OrganicShape, AnimatedBackground
│   │   ├── sections/   # HeroSection, AboutSection, ServicesSection, etc.
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── BookingButton.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── flash.astro
│   │   ├── thanks.astro
│   │   ├── privacy-policy.astro
│   │   ├── blackwork-chambery.astro
│   │   ├── tatoueur-chambery.astro
│   │   └── tatouage-pop-culture-chambery.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## ⚠️ Avant de lancer

**Copier les assets statiques** depuis le dossier original :

```bash
# Depuis la racine du projet
cp -r static/* astro/public/
```

Fichiers nécessaires :
- `/img/Logo.png`, `/img/monstera.png`, `/img/fougere.png`, etc.
- `/images/` (galerie, hero, portraits)
- `/favicon.png`

## 🌐 Déploiement Netlify

Le fichier `netlify.toml` est déjà configuré. Il suffit de :

1. Connecter le repo à Netlify
2. Définir le dossier de base : `astro`
3. Build command : `npm run build`
4. Publish directory : `dist`

## ✅ Avantages de la migration

- **Performance** : HTML statique par défaut, hydratation partielle
- **Bundle size** : Seuls les composants interactifs chargent du JS
- **SEO** : Meilleur contrôle des meta tags et du HTML généré
- **DX** : React mature avec meilleur écosystème d'outils
