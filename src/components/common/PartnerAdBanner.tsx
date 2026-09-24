/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Emplacement Publicitaire Partenaire Éthique & Non-intrusif
 * Village de Ntolo (Nlonako, Cameroun)
 */

import React, { useState, useEffect } from 'react';
import { Handshake, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../../types';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from '../../services/adminService';

interface PartnerAdBannerProps {
  onNavigateToPartners?: () => void;
}

export const PartnerAdBanner: React.FC<PartnerAdBannerProps> = ({ onNavigateToPartners }) => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
    return () => window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
  }, []);

  // Si désactivé dans les paramètres ou masqué temporairement par l'utilisateur
  if (!settings.partnerAdBannerActive || dismissed) {
    return null;
  }

  const title = settings.partnerAdBannerTitle || 'Partenaire Officiel du Terroir';
  const sponsor = settings.partnerAdBannerSponsor || 'Union des Coopératives du Moungo (UCAM)';
  const text =
    settings.partnerAdBannerText ||
    'Soutien actif à la filière caféière et cacaoyère biologique des contreforts du Mont Nlonako.';
  const link = settings.partnerAdBannerLink || 'https://nlonako.cm';
  const cta = settings.partnerAdBannerCta || 'Découvrir le projet';

  return (
    <aside
      aria-label="Annonce Partenaire Officiel"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4"
    >
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-amber-500/30 p-4 sm:p-5 shadow-sm text-white overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Handshake className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  {title}
                </span>
                <span className="text-xs font-bold text-amber-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {sponsor}
                </span>
              </div>
              <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                {text}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center flex-shrink-0">
            {onNavigateToPartners && (
              <button
                onClick={onNavigateToPartners}
                className="text-[11px] font-semibold text-stone-300 hover:text-white underline underline-offset-2 transition-colors mr-2"
              >
                Espace Partenaires
              </button>
            )}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>{cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Masquer cette annonce pour la session"
              aria-label="Masquer l'annonce partenaire"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
