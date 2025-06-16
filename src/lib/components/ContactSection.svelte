<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  
  let formData = {
    name: '',
    email: '',
    message: '',
    subject: 'Renseignement'
  };
  
  let formSubmitted = false;
  let formError = false;
  // Éléments DOM pour les animations
  let contactTitle: HTMLElement;
  let contactMap: HTMLElement;
  let contactForm: HTMLElement;
  
  onMount(() => {
    // Animation GSAP avec optimisation pour mobile
    gsap.registerPlugin(ScrollTrigger);
    
    const sections = [
      { el: contactTitle, delay: 0 },
      { el: contactMap, delay: 0.2 },
      { el: contactForm, delay: 0.4 }
    ];
    
    // Détection si l'appareil est mobile (écran tactile)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    sections.forEach(({ el, delay }) => {
      if (el) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: contactTitle,
            start: 'top 85%',
            // Désactiver le marqueur de débogage
            markers: false,
          },
          y: isMobile ? 30 : 50, // Animation plus subtile sur mobile
          opacity: 0,
          duration: isMobile ? 0.6 : 0.8, // Animation un peu plus rapide sur mobile
          delay,
          ease: 'power2.out', // Courbe d'accélération plus fluide
        });
      }
    });
    
    // Animation additionnelle pour une meilleure fluidité sur mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // Optimisations pour les appareils tactiles
      document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
        el.classList.add('tap-transparent');
      });
    }
  });
  
  function handleSubmit() {
    // Ici, on simulerait l'envoi du formulaire à Netlify Forms
    // Pour l'instant on simule simplement une soumission réussie
    formSubmitted = true;
    
    // En production, nous enverrions les données au backend
    // tout en respectant les principes GDPR de minimisation des données
    console.log('Formulaire soumis avec consentement GDPR');
    
    // Reset du formulaire après 5 secondes
    setTimeout(() => {
      formSubmitted = false;
      formData = {
        name: '',
        email: '',
        message: '',
        subject: 'Renseignement'
      };
    }, 5000);
  }
</script>

<section id="contact" class="py-32 bg-white relative">
  <!-- Ornement de coin supprimé -->
  <div class="container mx-auto px-4">
    <div bind:this={contactTitle}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">
        Contact
      </h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Map et coordonnées -->
      <div class="relative" bind:this={contactMap}>
        <div class="aspect-ratio-1/1 h-80 mb-8">
          <!-- Iframe Google Maps sans cookies (à remplacer par les vraies coordonnées) -->
          <iframe 
            title="Localisation Delco Ink"
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.9139%2C45.5646%2C5.9239%2C45.5746&amp;layer=mapnik" 
            class="w-full h-full border-0 rounded-sm"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Adresse</h4>
              <a href="https://maps.google.com/?q=171+avenue+de+Lyon,+73000+Chambéry,+France" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-forest transition-colors block mb-1">171 avenue de Lyon, 73000 Chambéry, France</a>
              <p class="text-gray-600">Sur rendez-vous uniquement</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Email</h4>
              <a href="mailto:contact@delco-ink.com" class="text-gray-600 hover:text-forest transition-colors">contact@delco-ink.com</a>
            </div>
          </div>

          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Téléphone</h4>
              <a href="tel:+33612345678" class="text-gray-600 hover:text-forest transition-colors">06 12 34 56 78</a>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Horaires</h4>
              <div class="text-gray-600 space-y-1">
                <p>Lundi, Mardi et mercredi : 9h00 – 19h00</p>
                <p>Dimanche : 13h00 – 19h00</p>
                <p>Fermé du Jeudi au Samedi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formulaire de contact -->
      <div bind:this={contactForm}
      >
        {#if formSubmitted}
          <div class="bg-white p-6 rounded-md border border-forest shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-forest mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-center font-title text-2xl mb-2 text-gray-800">Message envoyé !</h3>
            <p class="text-center text-gray-600">Merci de nous avoir contacté. Nous vous répondrons dans les meilleurs délais.</p>
            <p class="text-center text-gray-500 text-sm mt-4">Conformément au RGPD, vos données ne seront utilisées que pour traiter votre demande et ne seront pas conservées au-delà du temps nécessaire.</p>
          </div>
        {:else}
          <form 
            class="bg-white p-8 rounded-md border border-gray-200 shadow-sm"
            on:submit|preventDefault={handleSubmit}
            data-netlify="true"
            name="contact"
            netlify-honeypot="bot-field"
          >
            <div class="mb-6 hidden">
              <label for="bot-field">Ne pas remplir si vous êtes humain</label>
              <input type="hidden" name="bot-field" />
            </div>
            
            <div class="mb-6">
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                bind:value={formData.name}
                required
                class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm"
              />
            </div>
            
            <div class="mb-6">
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                bind:value={formData.email}
                required
                class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm"
              />
            </div>
            
            <div class="mb-6">
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
              <select 
                id="subject" 
                name="subject" 
                bind:value={formData.subject}
                class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm"
              >
                <option value="Renseignement">Renseignement</option>
                <option value="Rendez-vous">Demande de rendez-vous</option>
                <option value="Projet">Projet personnalisé</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div class="mb-8">
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                bind:value={formData.message}
                required
                rows="5"
                class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm"
              ></textarea>
            </div>

            <!-- Consentement GDPR -->
            <div class="mb-6">
              <div class="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  name="gdpr-consent"
                  required
                  class="mt-1 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded"
                />
                <label for="gdpr-consent" class="block text-sm text-gray-600">
                  J'accepte que mes données soient traitées conformément à la <a href="/privacy-policy" class="text-forest underline hover:text-forest/80">politique de confidentialité</a>. Delco Ink s'engage à protéger vos informations personnelles et ne les partagera jamais avec des tiers sans votre consentement explicite. Vous pouvez à tout moment exercer vos droits d'accès, de rectification ou de suppression de vos données.
                </label>
              </div>
            </div>
            
            <div class="text-center">
              <button type="submit" class="btn-primary inline-block group shadow-sm hover:shadow-md transition-all">
                Envoyer
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
  <!-- Ornement de coin inférieur gauche supprimé -->
  <!-- Barre d'action flottante mobile avec animation d'apparition --> 
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg md:hidden border-t border-gray-200 animate-slideUp">
    <div class="flex justify-around py-3 items-center">

      <a href="tel:+33612345678" class="flex flex-col items-center text-forest">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span class="text-xs mt-1">Appeler</span>
      </a>
      <a href="mailto:contact@delco-ink.com" class="flex flex-col items-center text-forest">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-xs mt-1">Email</span>
      </a>
      <a href="https://maps.google.com/?q=171+avenue+de+Lyon,+73000+Chamb%C3%A9ry,+France" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center text-forest">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span class="text-xs mt-1">Itinéraire</span>
      </a>
      <a href="#contact" class="flex flex-col items-center text-forest">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span class="text-xs mt-1">Contact</span>
      </a>
    </div>
  </div>
</section>
