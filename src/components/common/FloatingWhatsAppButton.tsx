/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from '../../services/adminService';
import { SiteSettings } from '../../types';

export const FloatingWhatsAppButton: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
    
    // Show a greeting tooltip after 4 seconds once per session
    const timer = setTimeout(() => {
      setIsTooltipVisible(true);
    }, 4000);

    return () => {
      window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
      clearTimeout(timer);
    };
  }, []);

  const rawNumber = settings.whatsappNumber || '+237670001122';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const presetMessage = encodeURIComponent(
    settings.whatsappMessagePreset || 'Bonjour le Secrétariat de Ntolo, je souhaite me renseigner via le portail officiel...'
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${presetMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Friendly Tooltip Bubble */}
      {isTooltipVisible && !isDismissed && (
        <div className="mb-2 bg-white text-stone-900 px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-200 text-xs max-w-[240px] relative animate-fade-in flex items-start gap-2">
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
              Permanence du Village
            </span>
            <p className="text-[12px] text-slate-700 leading-snug">
              Une question urgente ? Écrivez directement au secrétariat sur WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title="Fermer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-emerald-200 transform rotate-45"></div>
        </div>
      )}

      {/* Main WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter le secrétariat de Ntolo sur WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="font-bold text-xs hidden sm:inline tracking-wide">
          WhatsApp Secrétariat
        </span>
      </a>
    </div>
  );
};
