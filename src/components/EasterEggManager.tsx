'use client';
import React, { useState, useEffect } from 'react';

// Codes promo par jour de la semaine (0=Dimanche, 6=Samedi)
const DAILY_CODES: Record<number, string> = {
  0: 'RONRON-EXPLOSION',     // Dimanche
  1: 'CODE-KOMO',        // Lundi
  2: 'DEUX-CHATS-DEUX-FAUVES',          // Mardi
  3: 'STREETY-LA-PATATE',  // Mercredi
  4: 'CODE-LYOKO',        // Jeudi
  5: 'BAT-KOMO',       // Vendredi
  6: 'KOMO-ET-STREETY',     // Samedi
};

// Vérifier si un mois s'est écoulé depuis la dernière utilisation
function canUseThisMonth(): boolean {
  const lastUsed = localStorage.getItem('easter-egg-last-used');
  if (!lastUsed) return true;

  const lastDate = new Date(lastUsed);
  const now = new Date();
  
  // Vérifier si c'est un nouveau mois ou une nouvelle année
  return lastDate.getMonth() !== now.getMonth() || lastDate.getFullYear() !== now.getFullYear();
}

// Marquer comme utilisé ce mois-ci
function markAsUsed(): void {
  localStorage.setItem('easter-egg-last-used', new Date().toISOString());
}

// Obtenir le code du jour
function getTodaysCode(): string {
  const day = new Date().getDay();
  return DAILY_CODES[day];
}

export function incrementExplosion() {
  const event = new CustomEvent('explosion-increment', { detail: { timestamp: Date.now() } });
  window.dispatchEvent(event);
}

export default function EasterEggManager() {
  const [mounted, setMounted] = useState(false);
  const [explosionCount, setExplosionCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [alreadyUsed, setAlreadyUsed] = useState(false);
  const [nextAvailable, setNextAvailable] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  useEffect(() => {
    // Check if already used this month
    const used = !canUseThisMonth();
    setAlreadyUsed(used);
    
    if (used) {
      const lastUsed = localStorage.getItem('easter-egg-last-used');
      if (lastUsed) {
        const lastDate = new Date(lastUsed);
        const nextMonth = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1);
        setNextAvailable(nextMonth.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' }));
      }
    }

    // Load explosion count
    const saved = localStorage.getItem('explosion-count');
    const savedCount = saved ? parseInt(saved, 10) : 0;
    
    if (savedCount > 0 && !used) {
      setExplosionCount(savedCount);
    }
    
    // Si déjà >= 100 et pas encore utilisé ce mois, afficher popup
    if (savedCount >= 100 && !used) {
      const code = getTodaysCode();
      setPromoCode(code);
      setShowPopup(true);
      setHasShownPopup(true);
      markAsUsed();
    }

    // Listen for explosion events
    const handleExplosion = () => {
      if (alreadyUsed) return; // Bloquer si déjà utilisé ce mois-ci
      
      setExplosionCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('explosion-count', newCount.toString());
        return newCount;
      });
    };

    window.addEventListener('explosion-increment', handleExplosion);
    return () => window.removeEventListener('explosion-increment', handleExplosion);
  }, [alreadyUsed]);

  // Show popup at 100
  useEffect(() => {
    if (explosionCount >= 100 && !hasShownPopup && !alreadyUsed) {
      const code = getTodaysCode();
      setPromoCode(code);
      setShowPopup(true);
      setHasShownPopup(true);
      markAsUsed();
      setAlreadyUsed(true);
    }
  }, [explosionCount, hasShownPopup, alreadyUsed]);

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setExplosionCount(0);
      setHasShownPopup(false);
      localStorage.removeItem('explosion-count');
      localStorage.removeItem('explosion-popup-shown');
    }, 300);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    const btn = document.getElementById('copy-btn-easter');
    if (btn) {
      btn.textContent = 'Copié !';
      setTimeout(() => btn.textContent = 'Copier le code', 2000);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Single counter - caché si déjà utilisé ce mois-ci */}
      {!isMobile && !alreadyUsed && (
        <div 
          className="fixed top-24 right-4 z-50 bg-forest/80 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm opacity-70 hover:opacity-100 transition-opacity pointer-events-auto"
          title="Clique sur les particules !"
        >
          {explosionCount}
        </div>
      )}

      {/* Message si déjà utilisé ce mois-ci */}
      {!isMobile && alreadyUsed && (
        <div 
          className="fixed top-24 right-4 z-50 bg-gray-500/80 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm"
          title={`Prochain code disponible le ${nextAvailable}`}
        >
          🐱 Reviens le {nextAvailable}
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl transform"
            style={{ animation: 'bounce-in 0.5s ease-out' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-3">🐱💥🐱</div>
            <h3 className="text-2xl font-bold text-forest mb-2">Explosion !</h3>
            <p className="text-gray-600 mb-4">100 particules explosées !</p>
            <p className="text-sm text-gray-500 mb-4">Komo et Streety sont fiers de toi.</p>
            
            <div className="bg-forest/10 border-2 border-dashed border-forest rounded-xl p-4 mb-4">
              <code className="text-xl font-mono font-bold text-forest tracking-wide break-all">
                {promoCode}
              </code>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">
              <strong>5% de réduction</strong> sur ton prochain tatouage !
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Copie ce code et colle-le maintenant dans le formulaire de contact pour en bénéficier.
            </p>
            <p className="text-xs text-orange-500 mb-6">
              ⚠️ Un seul code par mois et par personne
            </p>

            <div className="flex gap-3">
              <button
                id="copy-btn-easter"
                onClick={copyCode}
                className="flex-1 bg-forest text-white px-4 py-2 rounded-full font-medium hover:bg-forest/90 transition-colors"
              >
                Copier le code
              </button>
              <button
                onClick={closePopup}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
