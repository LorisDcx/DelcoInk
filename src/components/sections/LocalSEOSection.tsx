import React from 'react';

export default function LocalSEOSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-title text-3xl text-forest mb-6">
            Votre tatoueur à Chambéry & Cognin
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Situé à <strong className="text-forest">Cognin</strong>, aux portes de <strong className="text-forest">Chambéry</strong>, 
            Delco Ink vous accueille dans un studio privé dédié au <strong className="text-forest">blackwork illustratif</strong> et 
            aux créations <strong className="text-forest">pop-culture</strong>. Que vous cherchiez un tatoueur spécialisé en 
            Savoie ou un salon de tatouage à proximité de Chambéry, notre studio répond à vos attentes avec des créations 
            sur mesure, une hygiène irréprochable et une approche artistique unique.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 rounded-full">Tatoueur Chambéry</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Tatouage Cognin</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Blackwork Savoie</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Studio tatouage 73</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Tatouage illustratif</span>
          </div>
        </div>
      </div>
    </section>
  );
}
