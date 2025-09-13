<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import BrushStroke from './decorative/BrushStroke.svelte';
  
  let titleElement: HTMLElement;
  let imageContainer: HTMLElement;
  let textContainer: HTMLElement;
  let brushStrokeDecor: HTMLElement;
  let philosophyBox: HTMLElement;
  
  onMount(() => {
    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation des éléments avec esthétique wabi-sabi (légèrement asymétrique)
    if (titleElement) {
      gsap.from(titleElement, {
        y: 40,
        x: -5, // Légère asymétrie
        rotate: -1, // Légère rotation
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleElement,
          start: 'top 95%',
          once: true
        }
      });
    }
    
    if (imageContainer) {
      gsap.from(imageContainer, {
        x: -40,
        y: 10, // Légère asymétrie
        rotate: 1.5, // Légère rotation pour effet wabi-sabi
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top 95%',
          once: true
        }
      });
    }
    
    if (textContainer) {
      gsap.from(textContainer, {
        x: 40,
        y: -15, // Légère asymétrie
        rotate: -0.5, // Rotation subtile
        opacity: 0,
        duration: 0.9,
        delay: 0.4,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: textContainer,
          start: 'top 95%',
          once: true
        }
      });
    }
    
    
    // Animation spéciale pour la boîte de philosophie
    if (philosophyBox) {
      gsap.from(philosophyBox, {
        scaleY: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophyBox,
          start: 'top 95%',
          once: true
        }
      });
    }
  });
</script>

<section id="about" class="min-h-screen lg:min-h-[calc(100vh-80px)] relative overflow-hidden flex items-center py-12 md:py-16" style="scroll-margin-top: 60px;">
  <!-- Arrière-plan crème avec effet wabi-sabi et texture -->
  <div class="absolute inset-0 z-0 bg-[#f8f3e8] wavy-gradient opacity-40 texture-bg">

    
    <!-- Monstera avec animation subtile -->
    <div class="absolute top-0 right-0 w-64 h-64 transform -rotate-12 opacity-15 z-0 floating-slow">
      <img src="/img/monstera.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Fougère en haut à gauche avec animation légère -->
    <div class="absolute bottom-10 left-0 w-50 h-51 transform rotate-15 opacity-10 z-0 floating">
      <img src="/img/fougere.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Jolie feuille avec positionnement wabi-sabi (décalé) -->
    <div class="absolute bottom-0 left-[45%] w-52 h-52 transform -rotate-3 opacity-15 z-0 breathing">
      <img src="/img/joli feuille.png" alt="" class="w-full h-full object-contain" />
    </div>
    
    <!-- Pngegg avec positionnement asymétrique -->
    <div class="absolute bottom-10 right-28 w-41 h-64 transform rotate-[8deg] opacity-10 z-0 floating-slow">
      <img src="/img/pngegg.png" alt="" class="w-full h-full object-contain" />
    </div>
  
    
    <!-- Petite monstera avec animation subtile -->
    <div class="absolute top-1/3 right-10 w-32 h-32 transform -rotate-5 opacity-15 z-0 breathing">
      <img src="/img/monstera.png" alt="" class="w-full h-full object-contain" />
    </div>
  </div>
  <div class="container mx-auto px-4">
    <!-- Titre avec style wabi-sabi : légèrement décalé, avec élément décoratif -->
    <div bind:this={titleElement} class="text-center mb-10">
      <div class="relative inline-block">
        <!-- Trait décoratif sous le titre -->
        <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-forest opacity-40 rounded-full"></div>
        
        <h2 class="section-title text-4xl md:text-5xl text-forest mb-16 uppercase relative inline-block transform -rotate-1">
          À propos
          <span class="absolute -right-6 -top-4 text-base opacity-50 rotate-12">ソーセージ</span>
        </h2>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="relative z-10" bind:this={imageContainer}>
        <!-- Image avec cadre wabi-sabi : imparfait, légèrement décalé -->
        <div class="relative transform rotate-[1.5deg] group hover:rotate-0 transition-transform duration-700">
          <!-- Texture papier en arrière-plan -->
          <div class="absolute -inset-4 texture-paper bg-white/80 -z-10 rounded-sm shadow-xl opacity-80 transform -rotate-1 transition-transform duration-700 group-hover:rotate-0"></div>
          

          
          <!-- Cadre principal avec bordure irrégulière -->
          <div class="relative p-3 bg-white wavy-border overflow-hidden shadow-lg">
            <!-- Image avec effets wabi-sabi -->
            <div class="overflow-hidden relative">
              <img 
                src="/images/artist-portrait.jpg" 
                alt="Loris - Artiste Tatoueur chez Delco Ink Studio Chambéry" 
                class="w-full object-cover transition-all duration-700 hover:scale-105 handcrafted-image"
              />
              
              <!-- Overlay avec texture douce -->
              <div class="absolute inset-0 opacity-20 texture-soft pointer-events-none mix-blend-soft-light"></div>
              <div class="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80"></div>
            </div>
          </div>
          

        </div>
      </div>

      <div class="relative z-10" bind:this={textContainer}>
        <!-- Conteneur avec style wabi-sabi : asymétrique, texture naturelle, imperfection délibérée -->
        <div class="p-7 backdrop-blur-sm bg-white/20 rounded-tl-sm rounded-br-3xl rounded-tr-lg rounded-bl-md transform rotate-[-0.5deg] border-l-2 border-t border-forest/10 shadow-md texture-paper">
          <!-- En-tête avec disposition wabi-sabi -->
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h3 class="font-title text-3xl text-forest relative inline-block transform -translate-y-1">
              Delco Ink <span class="text-forest font-semibold relative">Studio
                <!-- Petit trait décoratif sous le mot Studio -->
                <span class="absolute -bottom-1 left-0 right-0 h-[2px] bg-forest/30 transform skew-x-12"></span>
              </span>
            </h3>
            <span class="text-forest text-sm font-medium px-4 py-1.5 border border-forest/30 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-white/40 transform -rotate-1 shadow-sm">Salon privé - Sur rendez-vous uniquement</span>
          </div>
        
          <!-- Texte principal avec style wabi-sabi : espacement irrégulier, éléments légèrement décalés -->
          <div class="space-y-6 text-gray-700 leading-relaxed mb-10 pl-0 md:pl-3 border-l-0 md:border-l border-forest/10">
            <p class="transform translate-x-0 md:-translate-x-2">
              Situé à <span class="text-forest font-medium moving-text">Cognin</span>, à deux pas de <span class="text-forest font-medium moving-text">Chambéry</span> (frontière entre les deux communes), Delco Ink est un studio privé où l'art du tatouage devient une véritable expérience créative personnalisée dans un cadre exclusif et intime.
            </p>
            
            <p class="transform translate-x-0 md:translate-x-1">
              Je suis <span class="text-forest font-medium moving-text">Chloé</span>, tatoueuse spécialisée en <span class="text-forest font-medium moving-text">blackwork illustratif</span> et designs inspirés de la <span class="text-forest font-medium moving-text">pop-culture</span>. Après plusieurs années d'expérience dans différents studios, j'ai créé cet espace pour offrir une approche plus personnelle du tatouage.
            </p>

            <p class="transform translate-x-0 md:-translate-x-1">
              Chaque projet est élaboré sur mesure, en prenant le temps d'échanger et comprendre vos inspirations. Aucun design n'est reproduit à l'identique, assurant l'unicité de votre tatouage.
            </p>
          </div>

          <!-- Philosophie dans un cadre wabi-sabi : bordure organique, position décalée -->
          <div class="mb-12 relative" bind:this={philosophyBox}>
            <!-- Élément décoratif à gauche -->
            <div class="absolute inset-y-0 -left-1 w-[3px] bg-gradient-to-b from-forest/50 via-forest/30 to-transparent rounded-full"></div>
            
  
            
            <!-- Contenu avec style wabi-sabi -->
            <div class="pl-5 pt-2 pb-1 bg-white/20 border-t border-b border-r border-forest/10 rounded-tr-lg rounded-br-sm transform -rotate-[0.8deg]">
              <h4 class="text-lg font-medium text-forest mb-3 transform translate-y-[-2px]">Ma philosophie</h4>
              <p class="text-gray-600 italic">
                "Je considère chaque tatouage comme une œuvre d'art collaborative. Mon parcours artistique, enrichi par ma passion pour l'illustration, m'a permis de développer un style où la <span class="text-forest font-medium">technique précise</span> rencontre la <span class="text-forest font-medium">sensibilité artistique</span>. J'accorde une importance particulière à la signification personnelle de chaque pièce, transformant vos idées en créations durables qui racontent votre histoire."
              </p>
            </div>
          </div>

          <!-- Boutons avec style wabi-sabi : forme organique, animations douces -->
          <div class="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mt-4 justify-center md:justify-start">
            <!-- Premier bouton avec style organique -->
            <a href="/#gallery" class="px-7 py-3 bg-transparent hover:bg-white/20 text-forest font-medium transition-all duration-500 text-center border border-forest/30 hover:border-forest/60 organic-button group relative overflow-hidden">
              <span class="relative z-10">Découvrir les créations</span>
              <!-- Effet au survol -->
              <span class="absolute inset-0 bg-gradient-to-r from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
            
            <!-- Deuxième bouton avec style organique -->
            <a href="/#contact" class="px-7 py-3 bg-forest/50 hover:bg-forest/70 text-white font-medium transition-all duration-500 text-center shadow-sm hover:shadow organic-button group relative overflow-hidden">
              <span class="relative z-10">Parlons de votre projet</span>
              <!-- Effet au survol -->
              <span class="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ornement de coin inférieur droit supprimé -->
</section>
