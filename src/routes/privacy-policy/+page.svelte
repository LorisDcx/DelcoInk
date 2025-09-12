<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';
  
  let titleElement;
  let contentElements = [];
  
  onMount(() => {
    // Animations GSAP
    gsap.from(titleElement, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
    
    contentElements.forEach((el, index) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4 + (index * 0.1)
      });
    });
  });
</script>

<svelte:head>
  <title>Politique de Confidentialité | Delco Ink | Studio de Tatouage à Cognin</title>
  <meta name="description" content="Politique de confidentialité et traitement des données personnelles du studio de tatouage Delco Ink à Cognin, conformément au RGPD." />
  <meta name="robots" content="noindex,follow" />
</svelte:head>

<section class="py-24 bg-white relative min-h-screen">
  <!-- Particules en arrière-plan -->
  <ParticlesBackground opacity={0.3} particleCount={25} zIndex={2} />
  
  <div class="container mx-auto px-4 relative z-10">
    <div bind:this={titleElement} class="mb-12">
      <h1 class="section-title text-4xl md:text-5xl text-center mb-6 uppercase relative inline-block text-gray-900">
        Politique de Confidentialité
      </h1>
      <p class="text-center text-gray-600 max-w-3xl mx-auto">
        Dernière mise à jour : 16 juin 2025
      </p>
    </div>
    
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
      <div bind:this={contentElements[0]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Introduction</h2>
        <p class="text-gray-700 mb-4">
          Chez Delco Ink, nous attachons une grande importance à la protection de votre vie privée et de vos données personnelles. 
          Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web 
          et nos services de tatouage.
        </p>
        <p class="text-gray-700">
          Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et à être transparents 
          sur les données que nous collectons et la façon dont nous les utilisons.
        </p>
      </div>
      
      <div bind:this={contentElements[1]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Données collectées</h2>
        <p class="text-gray-700 mb-4">
          Lorsque vous utilisez notre site web et nos services, nous pouvons collecter les types de données suivants :
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li><strong>Données d'identification</strong> : nom, prénom, adresse e-mail, numéro de téléphone</li>
          <li><strong>Données de communication</strong> : messages envoyés via notre formulaire de contact</li>
          <li><strong>Données techniques</strong> : adresse IP, type et version de navigateur, statistiques de visite anonymisées</li>
          <li><strong>Données relatives aux rendez-vous</strong> : dates, types de projet de tatouage, références visuelles</li>
        </ul>
      </div>
      
      <div bind:this={contentElements[2]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Utilisation des données</h2>
        <p class="text-gray-700 mb-4">
          Nous utilisons vos données personnelles uniquement dans les cas suivants :
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Pour répondre à vos demandes de renseignements et vous contacter concernant nos services</li>
          <li>Pour organiser, confirmer et assurer le suivi de vos rendez-vous</li>
          <li>Pour vous informer de changements relatifs à nos services</li>
          <li>Pour améliorer notre site web et la qualité de nos services</li>
          <li>Pour respecter nos obligations légales, notamment en matière sanitaire</li>
        </ul>
      </div>
      
      <div bind:this={contentElements[3]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Conservation des données</h2>
        <p class="text-gray-700 mb-4">
          Nous conservons vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Les données de contact sont conservées pendant 3 ans à compter de notre dernier contact</li>
          <li>Les données relatives aux rendez-vous et aux projets de tatouage sont conservées pendant 5 ans</li>
          <li>Les données nécessaires à des fins légales et médicales peuvent être conservées plus longtemps, conformément aux exigences légales</li>
        </ul>
      </div>
      
      <div bind:this={contentElements[4]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Partage des données</h2>
        <p class="text-gray-700 mb-4">
          Nous ne vendons pas vos données personnelles à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Avec des prestataires qui nous aident à gérer notre site web et nos services (hébergement, calendrier)</li>
          <li>Si nous sommes légalement tenus de partager ces informations</li>
        </ul>
        <p class="text-gray-700">
          Tous nos prestataires de services sont soigneusement sélectionnés et sont tenus de garantir la confidentialité et la sécurité de vos données.
        </p>
      </div>
      
      <div bind:this={contentElements[5]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Cookies et technologies similaires</h2>
        <p class="text-gray-700 mb-4">
          Notre site utilise des cookies essentiels pour son fonctionnement. Nous utilisons également des cookies analytiques anonymisés pour comprendre comment notre site est utilisé.
        </p>
        <p class="text-gray-700">
          Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur.
        </p>
      </div>
      
      <div bind:this={contentElements[6]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Vos droits</h2>
        <p class="text-gray-700 mb-4">
          Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li><strong>Droit d'accès</strong> : vous pouvez demander une copie des données personnelles que nous détenons vous concernant</li>
          <li><strong>Droit de rectification</strong> : vous pouvez demander la correction de données inexactes</li>
          <li><strong>Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données sous certaines conditions</li>
          <li><strong>Droit à la limitation du traitement</strong> : vous pouvez demander de limiter l'utilisation de vos données</li>
          <li><strong>Droit à la portabilité</strong> : vous pouvez demander le transfert de vos données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données dans certaines circonstances</li>
        </ul>
        <p class="text-gray-700">
          Pour exercer l'un de ces droits, veuillez nous contacter via notre formulaire de contact ou par email.
        </p>
      </div>
      
      <div bind:this={contentElements[7]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Sécurité des données</h2>
        <p class="text-gray-700 mb-4">
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, utilisation abusive, divulgation, altération ou destruction.
        </p>
      </div>
      
      <div bind:this={contentElements[8]} class="mb-10">
        <h2 class="text-2xl text-forest font-title mb-4">Modifications de notre politique de confidentialité</h2>
        <p class="text-gray-700 mb-4">
          Nous pouvons occasionnellement mettre à jour cette politique de confidentialité. Les modifications importantes seront notifiées sur notre site web.
        </p>
        <p class="text-gray-700">
          Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques en matière de confidentialité.
        </p>
      </div>
      
      <div bind:this={contentElements[9]} class="mb-6">
        <h2 class="text-2xl text-forest font-title mb-4">Nous contacter</h2>
        <p class="text-gray-700 mb-4">
          Si vous avez des questions concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, n'hésitez pas à nous contacter :
        </p>
        <div class="text-gray-700">
          <p><strong>Delco Ink</strong></p>
          <p>Studio privé de tatouage</p>
          <p>19 Av. Général Cartier, 73160 Cognin</p>
          <p>Email : contact@delco-ink.com</p>
        </div>
      </div>
      
      <div bind:this={contentElements[10]} class="text-center mt-12">
        <a href="/" class="inline-flex items-center text-forest hover:text-forest-dark transition-colors duration-300 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Retour à la page d'accueil
        </a>
      </div>
    </div>
  </div>
</section>
