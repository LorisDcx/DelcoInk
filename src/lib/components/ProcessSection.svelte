<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import gsap from 'gsap';
  import ParticlesBackground from './ParticlesBackground.svelte';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // Importer ScrollTrigger uniquement côté client
  let ScrollTrigger;
  
  // État pour les questions FAQ
  let openedQuestions: number[] = [];
  
  // Fonction pour gérer l'ouverture/fermeture des questions
  function toggleQuestion(index: number): void {
    if (openedQuestions.includes(index)) {
      openedQuestions = openedQuestions.filter(i => i !== index);
    } else {
      openedQuestions = [...openedQuestions, index];
    }
  }
  
  onMount(async () => {
    if (browser) {
      // Import dynamique côté client uniquement
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      
      initAnimations();
    }
  });
  
  // Étapes du processus de tatouage
  // Références DOM pour les animations GSAP
  let titleElement: HTMLElement | null = null;
  let timelineVertical: HTMLElement | null = null;
  let timelineVerticalMobile: HTMLElement | null = null;
  let processStepElements: HTMLElement[] = [];
  let faqContainer: HTMLElement | null = null;
  
  const processSteps = [
    {
      title: "Consultation",
      description: "Discussion initiale sur votre projet, vos inspirations et vos attentes. Cette étape peut se faire en personne ou à distance.",
      icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    },
    {
      title: "Design",
      description: "Création d'un design sur mesure qui correspond à votre vision tout en intégrant notre style et notre expertise technique.",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      title: "Révisions",
      description: "Affinements du design pour qu'il soit parfaitement adapté à vos souhaits et à l'emplacement choisi sur votre corps.",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    },
    {
      title: "Session",
      description: "Le jour du tatouage, dans notre studio privé, confortable et respectueux des règles d'hygiène les plus strictes.",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    },
    {
      title: "Après-soin",
      description: "Instructions détaillées pour les soins post-tatouage et suivi personnalisé pour assurer une cicatrisation optimale.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    }
  ];
  
  // Fonction d'initialisation des animations
  function initAnimations() {
    // Animation du titre
    if (titleElement) {
      gsap.from(titleElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleElement,
          start: 'top 80%',
          once: true
        }
      });
    }
    
    // Animation des lignes verticales
    if (timelineVertical) {
      gsap.from(timelineVertical, {
        height: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineVertical,
          start: 'top 90%',
          end: 'bottom 10%',
          once: true
        }
      });
    }
    
    if (timelineVerticalMobile) {
      gsap.from(timelineVerticalMobile, {
        height: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineVerticalMobile,
          start: 'top 90%',
          end: 'bottom 10%',
          once: true
        }
      });
    }
    
    // Animation des étapes du processus
    if (processStepElements.length > 0) {
      processStepElements.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            once: true
          }
        });
      });
    }
    
    // Animation de la FAQ
    if (faqContainer) {
      gsap.from(faqContainer, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: faqContainer,
          start: 'top 80%',
          once: true
        }
      });
    }
  }
</script>

<section id="process" class="py-24 bg-gray-50 relative">
  <!-- Particules/orbes en arrière-plan (zIndex entre le fond et les éléments UI) -->
  <ParticlesBackground opacity={0.5} particleCount={35} zIndex={2} />
  <!-- Ornement de coin supprimé -->
  <div class="container mx-auto px-4 relative z-10">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">
        Notre Processus
      </h2>
    </div>
    
    <!-- Timeline -->
    <div class="relative z-10">
      <!-- Centre vertical line -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 z-10">
        <div 
          bind:this={timelineVertical}
          class="absolute top-0 left-0 w-full bg-forest h-0"
        ></div>
      </div>

      <!-- Mobile vertical line -->
      <div class="md:hidden absolute left-8 top-0 h-full w-0.5 bg-gray-200">
        <div 
          bind:this={timelineVerticalMobile}
          class="absolute top-0 left-0 w-full bg-forest h-0"
        ></div>
      </div>
      
      <div class="flex flex-col gap-12">
        {#each processSteps as step, index}
          <div 
            bind:this={processStepElements[index]}
            class="relative flex flex-col md:flex-row {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} z-30"
          >
            <!-- Icon circle for desktop -->
            <div class="hidden md:flex absolute left-1/2 top-0 transform -translate-x-1/2 items-center justify-center">
              <div class="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center z-10 transition-all hover:border-forest">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={step.icon} />
                </svg>
              </div>
            </div>
            
            <!-- Icon circle for mobile -->
            <div class="md:hidden flex absolute left-8 top-0 transform -translate-x-1/2 items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center z-10 transition-all hover:border-forest">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={step.icon} />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <div class="ml-16 md:ml-0 md:w-5/12 {index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}">
              <div 
                class="card p-6 h-full relative animate-grow-vertical"
                style="transform-origin: top center"
              >
                <div 
                  class="absolute top-0 left-0 w-0.5 h-0 bg-forest"
                ></div>
                <div class="card-content">
                  <h3 class="font-title text-2xl text-gray-900 mb-3">{step.title}</h3>
                  <p class="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
            
            <!-- Empty space for opposite side -->
            <div class="hidden md:block md:w-5/12"></div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="mt-24">
      <div
        bind:this={faqContainer}
        class="max-w-3xl mx-auto"
      >
        <h3 class="font-title text-3xl text-center mb-8 text-gray-900">FAQ</h3>
        
        <!-- Accordion -->
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-md mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group bg-white">
            <div 
              class="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-300" 
              on:click={() => toggleQuestion(0)} 
              on:keydown={(e) => e.key === 'Enter' && toggleQuestion(0)}
              role="button"
              tabindex="0"
              aria-expanded={openedQuestions.includes(0)}
              aria-controls="faq-content-0">
              <h4 class="font-title text-xl text-gray-800 font-medium">Quelle est votre politique d'annulation ?</h4>
              <svg xmlns="http://www.w3.org/2000/svg" class={`h-6 w-6 text-forest transition-transform duration-300 ${openedQuestions.includes(0) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            {#if openedQuestions.includes(0)}
            <div id="faq-content-0" class="border-t border-gray-100 bg-white" transition:slide|local={{ duration: 300, easing: cubicOut }}>
              <div class="p-5 text-gray-600 leading-relaxed">
                <p>Nous comprenons que les plans peuvent changer. Pour les annulations à moins de 48 heures du rendez-vous, nous demandons un acompte de 30 € qui sera crédité sur votre future séance. Pour les annulations avec plus de 48 heures de préavis, aucun frais ne sera appliqué. Nous vous encourageons à nous contacter dès que possible si vous devez reprogrammer.</p>
              </div>
            </div>
            {/if}
          </div>
          
          <div class="border border-gray-200 rounded-md mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group bg-white">
            <div 
              class="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-300" 
              on:click={() => toggleQuestion(1)} 
              on:keydown={(e) => e.key === 'Enter' && toggleQuestion(1)}
              role="button"
              tabindex="0"
              aria-expanded={openedQuestions.includes(1)}
              aria-controls="faq-content-1">
              <h4 class="font-title text-xl text-gray-800 font-medium">Comment préparer ma peau avant une séance ?</h4>
              <svg xmlns="http://www.w3.org/2000/svg" class={`h-6 w-6 text-forest transition-transform duration-300 ${openedQuestions.includes(1) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            {#if openedQuestions.includes(1)}
            <div id="faq-content-1" class="border-t border-gray-100 bg-white" transition:slide|local={{ duration: 300, easing: cubicOut }}>
              <div class="p-5 text-gray-600 leading-relaxed">
                <p>Pour une séance optimale, hydratez bien votre peau les jours précédents, évitez l'exposition au soleil, l'alcool et les médicaments fluidifiant le sang (comme l'aspirine) 24h avant. Arrivez reposé et après un repas léger. Une peau saine permet un meilleur résultat et une cicatrisation plus rapide.</p>
              </div>
            </div>
            {/if}
          </div>
          
          <div class="border border-gray-200 rounded-md mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group bg-white">
            <div 
              class="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-300" 
              on:click={() => toggleQuestion(2)} 
              on:keydown={(e) => e.key === 'Enter' && toggleQuestion(2)}
              role="button"
              tabindex="0"
              aria-expanded={openedQuestions.includes(2)}
              aria-controls="faq-content-2">
              <h4 class="font-title text-xl text-gray-800 font-medium">Puis-je apporter mon propre design ?</h4>
              <svg xmlns="http://www.w3.org/2000/svg" class={`h-6 w-6 text-forest transition-transform duration-300 ${openedQuestions.includes(2) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            {#if openedQuestions.includes(2)}
            <div id="faq-content-2" class="border-t border-gray-100 bg-white" transition:slide|local={{ duration: 300, easing: cubicOut }}>
              <div class="p-5 text-gray-600 leading-relaxed">
                <p>Bien sûr ! Nous accueillons vos idées et références. Cependant, notre spécialité est d'adapter ces inspirations à notre style artistique distinctif. Nous collaborerons avec vous pour créer une pièce unique qui respecte votre vision tout en bénéficiant de notre expertise en blackwork illustratif.</p>
              </div>
            </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Ornement de coin inférieur droit supprimé -->
</section>
