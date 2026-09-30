/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Phone, ChevronRight, Sparkles, Send } from 'lucide-react';
import { getSiteSettings, formatWhatsAppUrl, EVENT_ADMIN_DATA_CHANGED } from '../../services/adminService';
import { SiteSettings } from '../../types';

export const FloatingWhatsAppButton: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);

    // Show a greeting tooltip after 4 seconds once per session
    const timer = setTimeout(() => {
      setIsTooltipVisible(true);
    }, 3500);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  const line1 = settings.whatsappNumber || '+237699217761';
  const line2 = settings.whatsappNumberSecondary || '+237694681840';
  const presetMessage =
    settings.whatsappMessagePreset ||
    'Bonjour le Secrétariat de Ntolo, je souhaite me renseigner via le portail officiel...';

  const whatsappUrl1 = formatWhatsAppUrl(line1, presetMessage);
  const whatsappUrl2 = formatWhatsAppUrl(line2, presetMessage);

  const cleanDigits1 = line1.replace(/[^0-9]/g, '');
  const cleanDigits2 = line2.replace(/[^0-9]/g, '');

  return (
    <div
      ref={menuRef}
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Expanded Multi-Line Secretariat WhatsApp Menu */}
      {isMenuOpen && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-emerald-300/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700/80 flex items-center justify-center border border-emerald-400/40">
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white">Secrétariat de Ntolo</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-200 font-medium">Permanence WhatsApp active</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-emerald-900/60 text-emerald-300 hover:text-white transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-emerald-100/90 mt-2.5 leading-snug">
              Écrivez directement au secrétariat sur l'un des deux numéros officiels :
            </p>
          </div>

          {/* Contact Numbers Options */}
          <div className="p-3.5 space-y-2.5 bg-slate-50">
            {/* Ligne 1: 699217761 */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  Ligne Principale 1
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  699 21 77 61
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={whatsappUrl1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:+237${cleanDigits1.startsWith('237') ? cleanDigits1.slice(3) : cleanDigits1}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>

            {/* Ligne 2: 694681840 */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Ligne Secrétariat 2
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  694 68 18 40
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={whatsappUrl2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:+237${cleanDigits2.startsWith('237') ? cleanDigits2.slice(3) : cleanDigits2}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-50/50 border-t border-emerald-100 text-center">
            <span className="text-[11px] text-emerald-900 font-medium">
              Horaires : {settings.secretariatHours || 'Lundi au Vendredi 08h00 - 15h30'}
            </span>
          </div>
        </div>
      )}

      {/* Friendly Tooltip Bubble */}
      {!isMenuOpen && isTooltipVisible && !isDismissed && (
        <div className="mb-2 bg-white text-stone-900 px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-200 text-xs max-w-[260px] relative animate-fade-in flex items-start gap-2">
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
              Permanence du Secrétariat
            </span>
            <p className="text-[12px] text-slate-700 leading-snug">
              Écrivez au secrétariat sur WhatsApp : <br />
              <strong className="text-emerald-800 font-mono">699217761</strong> ou <strong className="text-emerald-800 font-mono">694681840</strong>
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
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
          setIsTooltipVisible(false);
        }}
        aria-label="Contacter le secrétariat de Ntolo sur WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <div className="flex flex-col text-left">
          <span className="font-bold text-xs tracking-wide leading-none">
            WhatsApp Secrétariat
          </span>
          <span className="text-[10px] text-emerald-100 hidden sm:inline leading-tight font-mono mt-0.5">
            699 21 77 61 / 694 68 18 40
          </span>
        </div>
      </button>
    </div>
  );
};
