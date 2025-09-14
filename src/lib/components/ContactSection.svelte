<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { goto } from '$app/navigation'; // ✅ pour rediriger vers /thanks après envoi
  
  let formData = {
    name: '',
    email: '',
    message: '',
    subject: 'Renseignement'
  };
  
    // champs utilitaires
    let gdprConsent = false;    // ⬅️ bind sur la case RGPD
  let botField = '';          // ⬅️ honeypot
  let isSubmitting = false;
  let submitError = '';
  let formSubmitted = false;
  let formError = false;

  // Éléments DOM pour les animations
  let contactTitle: HTMLElement | null = null;
  let contactMap: HTMLElement | null = null;
  let contactForm: HTMLElement | null = null;
  
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
  

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitError = '';
    isSubmitting = true;

    // Corps x-www-form-urlencoded attendu par Netlify
    const payload = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': botField || '',
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      'gdpr-consent': gdprConsent ? 'on' : 'off'
    }).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload
      });
      if (!res.ok) throw new Error('Submission failed');
      // Reset + redirection page merci
      formData = { name: '', email: '', message: '', subject: 'Renseignement' };
      gdprConsent = false;
      botField = '';
      await goto('/thanks');
    } catch (err) {
      submitError = "Oups, l'envoi a échoué. Réessaie ou écris à contact@delco-ink.fr";
    } finally {
      isSubmitting = false;
    }
  }

</script>


<section id="contact" class="min-h-screen lg:min-h-[calc(100vh-80px)] bg-white relative overflow-hidden texture-soft bg-gray-50 flex items-center py-12 md:py-16" style="scroll-margin-top: 80px;">
  <!-- Ornement de coin supprimé -->
  <div class="container mx-auto px-4">
    <div bind:this={contactTitle}>
      <span class="absolute left-36 -top-6 text-xl opacity-50 rotate-12 text-forest">ジャガイモ猫</span>
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
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.8057%2C45.5626%2C6.0057%2C45.5926&amp;layer=mapnik&amp;marker=45.5742770%2C5.9029130" 
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
              <a href="https://maps.google.com/?q=19+Av.+Général+Cartier,+73160+Cognin,+France" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-forest transition-colors block mb-1">19 Av. Général Cartier, 73160 Cognin</a>
              <p class="text-gray-600">Sur rendez-vous uniquement</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 class="font-title text-lg text-gray-800">Email</h4>
              <a href="mailto:contact@delco-ink.fr" class="text-gray-600 hover:text-forest transition-colors">contact@delco-ink.fr</a>
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
      
      <!-- QR Code et Notez-nous -->
      <div class="flex flex-col items-center justify-center py-6">
        <div class="bg-white p-4 rounded-lg shadow-md mb-3">
          <img src="/images/Qrcode.png" alt="QR Code pour noter Delco Ink" class="w-32 h-32 object-contain" />
        </div>
        <div class="text-center">
          <p class="text-gray-700 font-medium mb-1">Notez-nous</p>
          <div class="flex items-center justify-center text-forest">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

<form
name="contact"
method="POST"
action="/thanks"
data-netlify="true"
netlify-honeypot="bot-field"
class="bg-white p-8 rounded-md border border-gray-200 shadow-sm"
on:submit={handleSubmit}
bind:this={contactForm}
>
  <!-- requis par Netlify pour détecter le formulaire -->
  <input type="hidden" name="form-name" value="contact" />

  <!-- honeypot anti-spam -->
  <div class="hidden">
    <label>Ne pas remplir : <input name="bot-field" bind:value={botField} /></label>
  </div>

  <!-- Nom -->
  <div class="mb-6">
    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
    <input id="name" name="name" type="text" autocomplete="name" bind:value={formData.name} required
      class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" />
  </div>

  <!-- Email -->
  <div class="mb-6">
    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
    <input id="email" name="email" type="email" autocomplete="email" bind:value={formData.email} required
      class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" />
  </div>

  <!-- Sujet -->
  <div class="mb-6">
    <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
    <select id="subject" name="subject" autocomplete="off" bind:value={formData.subject}
      class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm">
      <option value="Renseignement">Renseignement</option>
      <option value="Rendez-vous">Demande de rendez-vous</option>
      <option value="Projet">Projet personnalisé</option>
      <option value="Autre">Autre</option>
    </select>
  </div>

  <!-- Message -->
  <div class="mb-8">
    <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
    <textarea id="message" name="message" autocomplete="off"rows="5" required bind:value={formData.message}
      class="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm"></textarea>
  </div>

  <!-- Consentement RGPD -->
  <div class="mb-6">
    <label class="flex items-start space-x-2">
      <input type="checkbox" id="gdpr-consent" name="gdpr-consent" bind:checked={gdprConsent} required
        class="mt-1 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded" />
      <span class="text-sm text-gray-600">
        J'accepte que mes données soient traitées conformément à la <a href="/privacy-policy" class="text-forest underline">politique de confidentialité.</a> Delco Ink s'engage à protéger vos informations personnelles et ne les partagera jamais avec des tiers sans votre consentement explicite. Vous pouvez à tout moment exercer vos droits d'accès, de rectification ou de suppression de vos données.
      </span>
    </label>
  </div>

  <!-- Erreur -->
  {#if submitError}
  <p class="text-red-600 text-sm mb-4" role="alert" aria-live="assertive">{submitError}</p>
{/if}


  <!-- CTA -->
  <div class="text-center">
    <button type="submit" class="btn-primary inline-block group shadow-sm hover:shadow-md transition-all" disabled={isSubmitting}>
      {isSubmitting ? 'Envoi…' : 'Envoyer'}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
</form>
    </div>
  </div>
  
</section>
