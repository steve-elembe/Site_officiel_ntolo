import React from 'react';
import { LOGO_CONFIG, SLOGAN_CONFIG } from '../data/villageData';

interface NtoloLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'badge';
  showSlogan?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Composant de Logo officiel temporaire de Ntolo.
 * Conçu pour être facilement modifiable ou remplacé soit par un logo image
 * (en renseignant `customLogoUrl` dans LOGO_CONFIG), soit en adaptant les textes.
 */
export const NtoloLogo: React.FC<NtoloLogoProps> = ({
  variant = 'navbar',
  showSlogan = false,
  className = '',
  onClick,
}) => {
  const isCustomImage = Boolean(LOGO_CONFIG.customLogoUrl);

  if (variant === 'hero') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {isCustomImage ? (
          <img
            src={LOGO_CONFIG.customLogoUrl!}
            alt={LOGO_CONFIG.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl shadow-lg border-2 border-amber-400 mb-3"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="relative mb-3 group">
            {/* Blason institutionnel temporaire Ntolo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-900 border-2 border-amber-400/90 shadow-2xl flex flex-col items-center justify-center text-amber-300 relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              {/* Cameroon tricolor mini ribbon inside emblem */}
              <div className="absolute top-0 inset-x-0 h-1.5 grid grid-cols-3">
                <div className="bg-emerald-600"></div>
                <div className="bg-red-600"></div>
                <div className="bg-amber-400"></div>
              </div>
              <span className="font-serif-royal text-3xl sm:text-4xl font-extrabold tracking-wider text-amber-300 drop-shadow">
                N
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-emerald-200/90 -mt-0.5">
                MOUNGO
              </span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-serif-royal text-3xl sm:text-5xl font-black tracking-wider text-white drop-shadow-md">
              {LOGO_CONFIG.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-amber-300 font-semibold tracking-wide uppercase">
            {LOGO_CONFIG.subtitle}
          </p>
          <p className="text-xs text-emerald-100/90 font-medium">
            {LOGO_CONFIG.location}
          </p>
          {showSlogan && (
            <p className="text-xs text-amber-200/90 italic font-serif pt-1 max-w-md mx-auto">
              « {SLOGAN_CONFIG.slogan} »
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`flex items-start space-x-3.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        {isCustomImage ? (
          <img
            src={LOGO_CONFIG.customLogoUrl!}
            alt={LOGO_CONFIG.title}
            className="w-12 h-12 object-contain rounded-xl border border-amber-400/70"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-950 border border-amber-400/70 flex flex-col items-center justify-center text-amber-300 flex-shrink-0 shadow-md">
            <span className="font-serif-royal text-xl font-extrabold">N</span>
            <span className="text-[8px] font-bold text-emerald-200 uppercase tracking-tighter -mt-1">
              NLONAKO
            </span>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-royal text-lg font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
              {LOGO_CONFIG.title}
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-700/50">
              Officiel
            </span>
          </div>
          <p className="text-xs text-stone-300 font-medium">
            Village de Ntolo • Nlonako
          </p>
          <p className="text-[11px] text-stone-400">
            Département du Moungo, Littoral
          </p>
        </div>
      </div>
    );
  }

  // Default navbar variant
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Retour à l'accueil"
    >
      {isCustomImage ? (
        <img
          src={LOGO_CONFIG.customLogoUrl!}
          alt={LOGO_CONFIG.title}
          className="w-11 h-11 object-contain rounded-xl border border-amber-400 shadow-sm"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-950 border border-amber-400/80 flex flex-col items-center justify-center text-amber-300 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 grid grid-cols-3">
            <div className="bg-emerald-600"></div>
            <div className="bg-red-600"></div>
            <div className="bg-amber-400"></div>
          </div>
          <span className="font-serif-royal text-xl font-bold tracking-tight text-amber-300">
            N
          </span>
          <span className="text-[7.5px] uppercase tracking-wider font-bold text-emerald-200/90 -mt-1">
            NTOLO
          </span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-serif-royal font-black text-lg tracking-wider text-emerald-950 group-hover:text-emerald-800 transition-colors uppercase">
            {LOGO_CONFIG.title}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Officiel
          </span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-tight">
          Nlonako • Moungo • Littoral
        </p>
      </div>
    </div>
  );
};
