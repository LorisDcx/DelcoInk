<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  let formData = {
    name: '',
    email: '',
    message: '',
    subject: 'Renseignement'
  };
  
  let formSubmitted = false;
  let formError = false;
  let titleElement: HTMLElement;
  let mapContainer: HTMLElement;
  let formContainer: HTMLElement;
  
  onMount(() => {
    // Animations simples sans ScrollTrigger pour l'instant
    if (titleElement) {
      gsap.from(titleElement, {
        y: 50,
        opacity: 0,
        duration: 0.8
      });
    }
    
    if (mapContainer) {
      gsap.from(mapContainer, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      });
    }
    
    if (formContainer) {
      gsap.from(formContainer, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4
      });
    }
  });
  
  function handleSubmit() {
    // Ici, on simulerait l'envoi du formulaire à Netlify Forms
    // Pour l'instant on simule simplement une soumission réussie
    formSubmitted = true;
    
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

<section id="contact" class="py-24 bg-white relative">
  <div class="ornament-corner opacity-60"></div>
  <div class="container mx-auto px-4">
    <div bind:this={titleElement}>
      <h2 class="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">
        Contact
      </h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Map et coordonnées -->
      <div class="relative" bind:this={mapContainer}>
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
              <p class="text-gray-600">Chambéry, France</p>
              <p class="text-gray-600">Sur rendez-vous uniquement</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Email</h4>
              <p class="text-gray-600">contact@delco-ink.com</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Horaires</h4>
              <p class="text-gray-600">Mardi - Samedi: 10h - 19h</p>
              <p class="text-gray-600">Fermé les Dimanche et Lundi</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formulaire de contact -->
      <div bind:this={formContainer}
      >
        {#if formSubmitted}
          <div class="bg-white p-6 rounded-md border border-forest shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-forest mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-center font-title text-2xl mb-2 text-gray-800">Message envoyé !</h3>
            <p class="text-center text-gray-600">Merci de nous avoir contacté. Nous vous répondrons dans les meilleurs délais.</p>
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
  <div class="ornament-corner ornament-corner-bottom-left"></div>
</section>
