'use client';
import React, { useRef, useEffect, useState } from 'react';
import ParticlesBackground from '../decorative/ParticlesBackground';

const processSteps = [
  { title: 'Consultation', description: 'Discussion initiale sur votre projet, vos inspirations et vos attentes. Cette étape peut se faire en personne ou à distance.', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
  { title: 'Design', description: 'Création d\'un design sur mesure qui correspond à votre vision tout en intégrant notre style et notre expertise technique.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Révisions', description: 'Affinements du design pour qu\'il soit parfaitement adapté à vos souhaits et à l\'emplacement choisi sur votre corps.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { title: 'Session', description: 'Le jour du tatouage, dans notre studio privé, confortable et respectueux des règles d\'hygiène les plus strictes.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { title: 'Après-soin', description: 'Instructions détaillées pour les soins post-tatouage et suivi personnalisé pour assurer une cicatrisation optimale.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
];

const faqItems = [
  { question: "Quelle est votre politique d'annulation ?", answer: "Je comprends bien que les plans peuvent changer. Pour les annulations à moins de 48 heures du rendez-vous, l'accompte demandé au préalable (généralement de 20% du prix annoncé) sera encaissé. Pour les annulations avec plus de 48 heures de préavis, aucun frais ne sera appliqué." },
  { question: "Comment préparer ma peau avant une séance ?", answer: "Pour une séance optimale, hydratez bien votre peau les jours précédents, évitez l'exposition prolongée au soleil, l'alcool et les médicaments fluidifiant le sang (comme l'aspirine) 24h avant. Arrivez reposé et après un repas léger." },
  { question: "Comment entretenir mon tatouage après la séance ?", answer: "Après votre séance, je vous fournirais des instructions détaillées. Les principes de base incluent : garder le tatouage propre, appliquer la crème cicatrisante recommandée, éviter les bains prolongés et l'exposition au soleil pendant au moins 2 semaines." },
  { question: "Puis-je apporter mon propre design ?", answer: "Bien sûr ! J'accueille vos idées et références. Cependant, ma spécialité est d'adapter ces inspirations à mon style artistique distinctif. Nous affinerons votre projet ensemble pour créer une pièce unique." },
  { question: "Est-ce que les tatouages font mal ?", answer: "La sensation varie selon les personnes et les zones du corps. Certaines parties comme les poignets, chevilles, côtes ou près des articulations sont généralement plus sensibles. N'hésitez pas à nous faire part de vos préoccupations." }
];

export default function ProcessSection() {
  const [openedQuestions, setOpenedQuestions] = useState<number[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleQuestion = (index: number) => {
    const isOpened = openedQuestions.includes(index);
    setOpenedQuestions(prev =>
      isOpened ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    // Skip GSAP on mobile to eliminate CLS and reduce JS
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (titleRef.current) {
        gsap.from(titleRef.current, { y: 50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 95%', once: true } });
      }

      if (timelineRef.current) {
        gsap.from(timelineRef.current, { height: 0, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 95%', end: 'bottom 10%', once: true } });
      }

      stepRefs.current.forEach((el, index) => {
        if (el) {
          gsap.from(el, { opacity: 0, y: 20, duration: 0.8, delay: index * 0.2, scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
        }
      });

      if (faqRef.current) {
        gsap.from(faqRef.current, { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: faqRef.current, start: 'top 95%', once: true } });

        // Animation des items FAQ
        const faqItems = faqRef.current.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              once: true
            }
          });
        });
      }
    };

    loadGsap();
  }, []);

  return (
    <section id="process" className="min-h-[calc(100vh+100px)] bg-gray-50 relative flex items-center py-12 md:py-16" style={{ scrollMarginTop: '70px' }}>
      <ParticlesBackground 
        color="#2d6a4f" 
        opacity={0.2} 
        count={25} 
        minSize={3} 
        maxSize={8} 
        interactive={true}
        zIndex={1}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef}>
          <h2 className="section-title text-4xl md:text-5xl text-gray-900 mb-16 uppercase relative inline-block transform -rotate-[0.8deg]">
            Notre Processus
            <span className="absolute -right-8 -top-4 text-base opacity-40 rotate-12 font-serif">足の爪</span>
          </h2>
        </div>

        <div className="relative z-0">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 z-0">
            <div ref={timelineRef} className="absolute top-0 left-0 w-full bg-forest h-0" />
          </div>

          <div className="flex flex-col gap-12">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                ref={el => { stepRefs.current[index] = el; }}
                className={`step-container mb-12 flex flex-col md:flex-row md:items-center relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="hidden md:flex absolute left-1/2 top-0 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center z-10 transition-all hover:border-forest">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={step.icon} />
                    </svg>
                  </div>
                </div>

                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                  <div className="card p-6 h-full relative">
                    <div className="card-content">
                      <h3 className="font-title text-2xl text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24" ref={faqRef}>
          <h3 className="font-title text-3xl text-center mb-8 text-gray-900">FAQ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-10">
            <div className="space-y-6">
              {faqItems.slice(0, 3).map((item, index) => (
                <div key={index} className="mb-6 faq-item">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between pb-3 text-left cursor-pointer border-b-2 border-gray-200 hover:border-forest transition-colors duration-300"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={openedQuestions.includes(index)}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h4 className="font-title text-2xl text-gray-800 font-medium pr-4">{item.question}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-5 w-5 text-forest transition-transform duration-300 ${openedQuestions.includes(index) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {openedQuestions.includes(index) && (
                    <div id={`faq-answer-${index}`} className="mt-4 pl-1 overflow-hidden animate-expandHeight">
                      <div className="animate-slideDown">
                        <p className="text-gray-600 leading-relaxed text-lg">{item.answer}</p>
                      </div>
                    </div>
                  )}
                  {!openedQuestions.includes(index) && (
                    <div aria-hidden="true" className="mt-4 pl-1 overflow-hidden animate-collapseHeight">
                      <div className="animate-slideUp">
                        <p className="text-gray-600 leading-relaxed text-lg">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {faqItems.slice(3).map((item, index) => (
                <div key={index + 3} className="mb-6 faq-item">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between pb-3 text-left cursor-pointer border-b-2 border-gray-200 hover:border-forest transition-colors duration-300"
                    onClick={() => toggleQuestion(index + 3)}
                    aria-expanded={openedQuestions.includes(index + 3)}
                    aria-controls={`faq-answer-${index + 3}`}
                  >
                    <h4 className="font-title text-2xl text-gray-800 font-medium pr-4">{item.question}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-5 w-5 text-forest transition-transform duration-300 ${openedQuestions.includes(index + 3) ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {openedQuestions.includes(index + 3) && (
                    <div id={`faq-answer-${index + 3}`} className="mt-4 pl-1 overflow-hidden animate-expandHeight">
                      <div className="animate-slideDown">
                        <p className="text-gray-600 leading-relaxed text-lg">{item.answer}</p>
                      </div>
                    </div>
                  )}
                  {!openedQuestions.includes(index + 3) && (
                    <div aria-hidden="true" className="mt-4 pl-1 overflow-hidden animate-collapseHeight">
                      <div className="animate-slideUp">
                        <p className="text-gray-600 leading-relaxed text-lg">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flèche de navigation vers la section suivante */}
      <a
        href="#contact"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
        aria-label="Défiler vers la section Contact"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-forest/60 animate-bounce-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
