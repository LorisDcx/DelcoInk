<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ParticlesBackground from './ParticlesBackground.svelte';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // Importer ScrollTrigger uniquement côté client
  let ScrollTrigger;
  
  // État pour les questions FAQ
  let openedQuestions: number[] = [];
  
  // Questions fréquemment posées et leurs réponses
  const faqItems = [
    {
      question: "Quelle est votre politique d'annulation ?",
      answer: "Je comprends bien que les plans peuvent changer. Pour les annulations à moins de 48 heures du rendez-vous, l'accompte demandé au préalable (généralement de 20% du prix annoncé) sera encaissé. Pour les annulations avec plus de 48 heures de préavis, aucun frais ne sera appliqué. Penser bien à me contacter dès que possible si vous devez reprogrammer."
    },
    {
      question: "Comment préparer ma peau avant une séance ?",
      answer: "Pour une séance optimale, hydratez bien votre peau les jours précédents, évitez l'exposition prolongée au soleil, l'alcool et les médicaments fluidifiant le sang (comme l'aspirine) 24h avant. Arrivez reposé et après un repas léger. Une peau saine permet un meilleur résultat et une cicatrisation plus rapide."
    },
    {
      question: "Comment entretenir mon tatouage après la séance ?",
      answer: "Après votre séance, je vous fournirais des instructions détaillées pour l'entretien. Les principes de base incluent : garder le tatouage propre, le nettoyer à l'aide d'un savon au pH neutre, appliquer la crème cicatrisante recommandée, éviter les bains prolongés et l'exposition au soleil pendant au moins 2 semaines. Ne pas gratter les croûtes qui se forment naturellement. Un bon suivi des soins garantit une cicatrisation optimale et des couleurs durables."
    },
    {
      question: "Puis-je apporter mon propre design ?",
      answer: "Bien sûr ! J'accueille vos idées et références. Cependant, ma spécialité est d'adapter ces inspirations à mon style artistique distinctif. Nous affinerons votre projet ensemble pour créer une pièce unique qui respecte votre vision tout en bénéficiant de mon expertise en blackwork illustratif."
    },
    {
      question: "Est-ce que les tatouages font mal ?",
      answer: "La sensation varie selon les personnes et les zones du corps. Certaines parties comme les poignets, chevilles, côtes ou près des articulations sont généralement plus sensibles. La douleur est souvent décrite comme une sensation de brûlure ou de pincement. Notre approche douce et nos techniques précises visent à minimiser l'inconfort. N'hésitez pas à nous faire part de vos préoccupations, nous pouvons adapter le rythme de la session à votre tolérance."
    }
  ];
  
  // Fonction pour gérer l'ouverture/fermeture des questions
  function toggleQuestion(index: number): void {
    if (openedQuestions.includes(index)) {
      openedQuestions = openedQuestions.filter(i => i !== index);
    } else {
      openedQuestions = [...openedQuestions, index];
    }
  }
  
  onMount(async () => {
    if (typeof window !== 'undefined') {
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
          start: 'top 95%',
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
          start: 'top 95%',
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
          start: 'top 95%',
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
            start: 'top 95%',
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
          start: 'top 95%',
          once: true
        }
      });
    }
  }
</script>

<section id="process" class="min-h-screen lg:min-h-[calc(100vh-80px)] bg-gray-50 relative flex items-center py-12 md:py-16" style="scroll-margin-top: 80px;">
  <!-- Particules/orbes en arrière-plan (zIndex entre le fond et les éléments UI) -->
  <ParticlesBackground opacity={0.5} particleCount={35} zIndex={2} />
  <!-- Ornement de coin supprimé -->
  <div class="container mx-auto px-4 relative z-10">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-gray-900 mb-16 uppercase relative inline-block transform -rotate-[0.8deg]">
        Notre Processus
        <span class="absolute -right-8 -top-4 text-base opacity-40 rotate-12 font-serif">足の爪</span>
      </h2>
    </div>
    
    <!-- Timeline -->
    <div class="relative z-0">
      <!-- Centre vertical line -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 z-0">
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
            class="step-container mb-12 flex flex-col md:flex-row md:items-center relative {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}" 
            bind:this={processStepElements[index]}
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
              <div class="h-12 w-12 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-100 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${step.title === 'Design' || step.title === 'Session' ? 'text-forest' : 'text-forest'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        class="w-full container mx-auto px-4 sm:px-8 lg:px-12"
      >
        <h3 class="font-title text-3xl text-center mb-8 text-gray-900">FAQ</h3>
        
        <!-- Accordion en deux colonnes avec style minimaliste -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-10">
          <!-- Colonne gauche (3 premières questions) -->
          <div class="space-y-6">
            {#each faqItems.slice(0, 3) as faqItem, index}
              <div class="mb-6">
                <!-- Question comme titre sur une ligne -->
                <div 
                  class="flex items-center justify-between pb-3 cursor-pointer border-b-2 border-gray-200 hover:border-forest transition-colors duration-300" 
                  on:click={() => toggleQuestion(index)}
                  on:keydown={(e) => e.key === 'Enter' && toggleQuestion(index)}
                  role="button"
                  tabindex="0"
                  aria-expanded={openedQuestions.includes(index)}
                  aria-controls={`faq-content-${index}`}>
                  <h4 class="font-title text-2xl text-gray-800 font-medium pr-4">{faqItem.question}</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" class={`flex-shrink-0 h-5 w-5 text-forest transition-transform duration-300 ${openedQuestions.includes(index) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <!-- Réponse -->
                {#if openedQuestions.includes(index)}
                <div id="faq-content-{index}" class="mt-4 pl-1" transition:slide|local={{ duration: 300, easing: cubicOut }}>
                  <div class="text-gray-600 leading-relaxed text-lg">
                    <p>{faqItem.answer}</p>
                  </div>
                </div>
                {/if}
              </div>
            {/each}
          </div>
          
          <!-- Colonne droite (2 dernières questions) -->
          <div class="space-y-6">
            {#each faqItems.slice(3) as faqItem, index}
              <div class="mb-6">
                <!-- Question comme titre sur une ligne -->
                <div 
                  class="flex items-center justify-between pb-3 cursor-pointer border-b-2 border-gray-200 hover:border-forest transition-colors duration-300" 
                  on:click={() => toggleQuestion(index + 3)}
                  on:keydown={(e) => e.key === 'Enter' && toggleQuestion(index + 3)}
                  role="button"
                  tabindex="0"
                  aria-expanded={openedQuestions.includes(index + 3)}
                  aria-controls={`faq-content-${index + 3}`}>
                  <h4 class="font-title text-2xl text-gray-800 font-medium pr-4">{faqItem.question}</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" class={`flex-shrink-0 h-5 w-5 text-forest transition-transform duration-300 ${openedQuestions.includes(index + 3) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <!-- Réponse -->
                {#if openedQuestions.includes(index + 3)}
                <div id="faq-content-{index + 3}" class="mt-4 pl-1" transition:slide|local={{ duration: 300, easing: cubicOut }}>
                  <div class="text-gray-600 leading-relaxed text-lg">
                    <p>{faqItem.answer}</p>
                  </div>
                </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Ornement de coin inférieur droit supprimé -->
</section>
