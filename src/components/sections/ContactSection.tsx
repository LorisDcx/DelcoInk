'use client';
import React, { useRef, useEffect, useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'Renseignement' });
  const [gdprConsent, setGdprConsent] = useState(false);
  const [cgpConsent, setCgpConsent] = useState(false);
  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const sections = [
        { el: titleRef.current, delay: 0 },
        { el: mapRef.current, delay: 0.2 },
        { el: formRef.current, delay: 0.4 }
      ];

      sections.forEach(({ el, delay }) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%', markers: false },
            y: isMobile ? 30 : 50, opacity: 0, duration: isMobile ? 0.6 : 0.8, delay, ease: 'power2.out'
          });
        }
      });
    };

    loadGsap();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const payload = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': botField || '',
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      'gdpr-consent': gdprConsent ? 'on' : 'off',
      'cgp-consent': cgpConsent ? 'on' : 'off',
      'cgp-accepted-at': cgpConsent ? new Date().toISOString() : ''
    }).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload
      });
      if (!res.ok) throw new Error('Submission failed');
      setFormData({ name: '', email: '', message: '', subject: 'Renseignement' });
      setGdprConsent(false);
      setCgpConsent(false);
      setBotField('');
      window.location.href = '/thanks';
    } catch (err) {
      setSubmitError("Oups, l'envoi a échoué. Réessaie ou écris à contact@delco-ink.fr");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-[calc(100vh-70px)] relative overflow-hidden flex items-center py-12 md:py-16" style={{ scrollMarginTop: '70px', boxShadow: '0 -8px 16px -4px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.03)' }}>
      <div id="contact-anchor" aria-hidden="true" className="absolute top-0 left-0 h-px w-px pointer-events-none" style={{ scrollMarginTop: '70px' }} />
      <div className="absolute inset-0 z-0 bg-[#f8f3e8] wavy-gradient opacity-40 texture-bg">
        <div className="absolute top-0 right-0 w-64 h-64 transform -rotate-12 opacity-15 z-0 floating-slow hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 transform -rotate-12 opacity-15 z-0 floating-slow md:hidden hidden" />
        <div className="absolute bottom-10 left-0 w-[200px] h-[204px] transform rotate-[15deg] opacity-10 z-0 floating hidden md:block">
          <img src="/img/fougere.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-10 left-0 w-32 h-32 transform rotate-[15deg] opacity-10 z-0 floating md:hidden hidden" />
        <div className="absolute bottom-0 left-[45%] w-52 h-52 transform -rotate-3 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/joli feuille.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-0 left-[45%] w-24 h-24 transform -rotate-3 opacity-15 z-0 breathing md:hidden hidden" />
        <div className="absolute bottom-10 right-28 w-[164px] h-64 transform rotate-[8deg] opacity-10 z-0 floating-slow hidden md:block">
          <img src="/img/pngegg.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute bottom-10 right-10 w-20 h-32 transform rotate-[8deg] opacity-10 z-0 floating-slow md:hidden hidden" />
        <div className="absolute top-1/3 right-10 w-32 h-32 transform -rotate-5 opacity-15 z-0 breathing hidden md:block">
          <img src="/img/monstera.webp" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div className="absolute top-1/3 right-4 w-16 h-16 transform -rotate-5 opacity-15 z-0 breathing md:hidden hidden" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef}>
          <span className="absolute left-36 -top-6 text-xl opacity-50 rotate-12 text-forest">ジャガイモ猫</span>
          <h2 className="section-title text-4xl md:text-5xl text-center mb-16 uppercase relative inline-block text-gray-900">Contact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={mapRef} className="relative">
            <div className="aspect-ratio-1/1 h-80 mb-8">
              <iframe
                title="Localisation Delco Ink"
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.8057%2C45.5626%2C6.0057%2C45.5926&amp;layer=mapnik&amp;marker=45.5742770%2C5.9029130"
                className="w-full h-full border-0 rounded-sm"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="font-title text-lg text-gray-800">Adresse</h4>
                  <a href="https://maps.google.com/?q=19+Av.+Général+Cartier,+73160+Cognin,+France" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-forest transition-colors block mb-1">19 Av. Général Cartier, 73160 Cognin</a>
                  <p className="text-gray-600">Sur rendez-vous uniquement</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <h4 className="font-title text-lg text-gray-800">Le Studio</h4>
                  <p className="text-gray-600 mb-1">Espace partagé avec d'autres artistes</p>
                  <a href="/le-studio" className="text-forest hover:text-forest/80 transition-colors font-medium text-sm">
                    Découvrir Le Studio Enso →
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="font-title text-lg text-gray-800">Email</h4>
                  <a href="mailto:contact@delco-ink.fr" className="text-gray-600 hover:text-forest transition-colors">contact@delco-ink.fr</a>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-title text-lg text-gray-800">Horaires</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>Lundi, Mardi et mercredi : 9h00 – 19h00</p>
                    <p>Dimanche : 13h00 – 19h00</p>
                    <p>Fermé du Jeudi au Samedi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form id="contact-form" ref={formRef} name="contact" method="POST" action="/thanks" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="bg-white p-8 rounded-md border border-gray-200 shadow-sm h-full flex flex-col justify-between">
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden"><label>Ne pas remplir : <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} /></label></div>

            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
              <input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" style={{ backgroundColor: 'white' }} />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" style={{ backgroundColor: 'white' }} />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
              <select id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" style={{ backgroundColor: 'white' }}>
                <option value="Renseignement">Renseignement</option>
                <option value="Rendez-vous">Demande de rendez-vous</option>
                <option value="Projet">Projet personnalisé</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/30 shadow-sm" style={{ backgroundColor: 'white' }} />
            </div>

            <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Consentements obligatoires</p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" id="cgp-consent" name="cgp-consent" checked={cgpConsent} onChange={(e) => setCgpConsent(e.target.checked)} required className="mt-0.5 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">
                  J'ai lu et j'accepte les <a href="/conditions-generales" target="_blank" rel="noopener noreferrer" className="text-forest font-medium underline hover:text-forest/80">Conditions Générales de Prestation (CGP)</a>.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" id="gdpr-consent" name="gdpr-consent" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} required className="mt-0.5 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">
                  J'accepte que mes données soient traitées conformément à la <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-forest font-medium underline hover:text-forest/80">politique de confidentialité</a>.
                </span>
              </label>
              <input type="hidden" name="cgp-accepted-at" value="" />
            </div>

            {submitError && <p className="text-red-600 text-sm mb-4" role="alert">{submitError}</p>}

            <div className="text-center">
              <button type="submit" className="btn-primary inline-block group shadow-sm hover:shadow-md transition-all" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi…' : 'Envoyer'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
