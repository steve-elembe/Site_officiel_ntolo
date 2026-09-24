import React, { useState, useEffect } from 'react';
import {
  Landmark, Phone, Mail, MapPin, ArrowUp, ShieldCheck, Heart,
  MessageCircle, Facebook, Twitter, Linkedin, Youtube
} from 'lucide-react';
import { PageId, SiteSettings } from '../types';
import { SLOGAN_CONFIG } from '../data/villageData';
import { NtoloLogo } from './NtoloLogo';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from '../services/adminService';
import { SocialShareBar } from './common/SocialShareBar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
    return () => window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappRaw = settings.whatsappNumber || '+237670001122';
  const whatsappClean = whatsappRaw.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappClean}&text=${encodeURIComponent(
    settings.whatsappMessagePreset || 'Bonjour le Secrétariat de Ntolo, je vous contacte via le portail officiel...'
  )}`;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 lg:pb-12 border-t-4 border-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emblem & Official Motto */}
        <div className="flex flex-col items-center text-center pb-10 border-b border-slate-800 space-y-3">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-extrabold uppercase tracking-widest bg-slate-800/80 px-4 py-1.5 rounded-full border border-amber-500/30">
            <span>RÉPUBLIQUE DU CAMEROUN</span>
            <span>•</span>
            <span>PAIX – TRAVAIL – PATRIE</span>
          </div>

          <NtoloLogo variant="footer" onClick={() => handleNav('accueil')} />

          <p className="text-xs text-amber-300/90 font-medium italic max-w-md mx-auto pt-1">
            « {SLOGAN_CONFIG.slogan} »
          </p>
        </div>

        {/* 5 Multi-column directory of all institutional pages */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10 text-sm">
          {/* Col 1: Terroir & Espace */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              Terroir & Espace
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('accueil')} className="hover:text-amber-300 transition-colors">
                  Accueil du portail
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('presentation')} className="hover:text-amber-300 transition-colors">
                  Présentation générale
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('histoire')} className="hover:text-amber-300 transition-colors">
                  Histoire du village
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('geographie')} className="hover:text-amber-300 transition-colors">
                  Situation géographique
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('environnement')} className="hover:text-amber-300 transition-colors">
                  Environnement & Mont Nlonako
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tourisme')} className="hover:text-amber-300 transition-colors">
                  Tourisme & Randonnées
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Gouvernance & Institutions */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400">
              Gouvernance Locale
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('organisation-traditionnelle')} className="hover:text-amber-300 transition-colors">
                  Organisation traditionnelle
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('organisation-administrative')} className="hover:text-amber-300 transition-colors">
                  Organisation administrative
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('chefferie')} className="hover:text-amber-300 transition-colors">
                  Chefferie & Notables
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('population')} className="hover:text-amber-300 transition-colors">
                  Population & Quartiers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mentions-legales')} className="hover:text-amber-300 transition-colors">
                  Mentions Légales
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Culture & Société */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400">
              Culture & Société
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('culture')} className="hover:text-amber-300 transition-colors">
                  Culture & Traditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('langues-patrimoine')} className="hover:text-amber-300 transition-colors">
                  Langues & Patrimoine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('education')} className="hover:text-amber-300 transition-colors">
                  Éducation & Scolarité
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sante')} className="hover:text-amber-300 transition-colors">
                  Santé & Soins Primaires
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Économie & Terroir */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400">
              Économie & Activités
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('agriculture')} className="hover:text-amber-300 transition-colors">
                  Agriculture (Café, Cacao)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('elevage')} className="hover:text-amber-300 transition-colors">
                  Élevage & Pastoralisme
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('economie-commerce')} className="hover:text-amber-300 transition-colors">
                  Commerce & Artisanat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('infrastructures')} className="hover:text-amber-300 transition-colors">
                  Infrastructures & Eau
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projets')} className="hover:text-amber-300 font-semibold text-emerald-300 transition-colors">
                  Grands Chantiers d'Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projets-participatifs')} className="hover:text-amber-300 font-bold text-amber-300 transition-colors">
                  Projets Participatifs Citoyens
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Médias & Communauté */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400">
              Médias & Diaspora
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('actualites')} className="hover:text-amber-300 transition-colors">
                  Actualités & Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('annonces')} className="hover:text-amber-300 font-semibold text-emerald-300 transition-colors">
                  Annonces & Avis Officiels
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('evenements')} className="hover:text-amber-300 transition-colors">
                  Agenda des Événements
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('galerie')} className="hover:text-amber-300 transition-colors">
                  Galerie Photos & Vidéos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('documents')} className="hover:text-amber-300 transition-colors">
                  Documents & Archives
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('diaspora')} className="hover:text-amber-300 transition-colors">
                  Espace Diaspora
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partenaires')} className="hover:text-amber-300 font-semibold text-amber-300 transition-colors">
                  Espace Partenaires & Mécénat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('devenir-partenaire')} className="hover:text-amber-300 transition-colors">
                  Devenir Partenaire Officiel
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-300 transition-colors">
                  Contact & Permanence
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Liaison & Configurable Contacts Banner */}
        <div className="bg-emerald-950/70 border border-emerald-800 rounded-3xl p-5 sm:p-6 my-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs shadow-lg">
          <div className="space-y-2 text-center lg:text-left">
            <span className="font-serif-royal text-sm sm:text-base font-bold text-amber-300 block">
              Chefferie Traditionnelle de Ntolo & Comité de Développement (CODEV)
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{settings.address || 'Ntolo, Arrondissement de Nlonako, Moungo, Cameroun'}</span>
              </span>
              <a href={`tel:${settings.contactPhone?.split('/')[0]?.trim() || '+237670001122'}`} className="flex items-center gap-1.5 hover:text-amber-300 font-mono">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{settings.contactPhone}</span>
              </a>
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-1.5 hover:text-amber-300 font-mono">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{settings.contactEmail}</span>
              </a>
            </div>

            {/* Social Network Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mr-1">
                Réseaux :
              </span>
              {settings.socialFacebookUrl && (
                <a
                  href={settings.socialFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-white transition-colors"
                  title="Facebook officiel"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1"
                title="WhatsApp Secrétariat"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold hidden sm:inline">WhatsApp</span>
              </a>
              {settings.socialYoutubeUrl && (
                <a
                  href={settings.socialYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-white transition-colors"
                  title="YouTube officiel"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.socialTwitterUrl && (
                <a
                  href={settings.socialTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-stone-700 text-white transition-colors"
                  title="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.socialLinkedinUrl && (
                <a
                  href={settings.socialLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-700 text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => handleNav('contact')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contacter le Secrétariat</span>
            </button>
            <button
              onClick={() => handleNav('diaspora')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs border border-emerald-600 transition-colors flex-shrink-0"
            >
              Recensement Diaspora
            </button>
          </div>
        </div>

        {/* Social Share Bar on Footer */}
        <div className="py-4 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Faites rayonner le terroir de Ntolo : partagez le portail officiel dans vos groupes et réseaux
          </span>
          <SocialShareBar compact={true} />
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} Village de NTOLO (Arrondissement de Nlonako, Cameroun). Tous droits réservés.</p>
            <p className="text-[11px] text-slate-600">
              Conformément au Décret N° 77/245 du 15 juillet 1977 portant organisation des chefferies traditionnelles au Cameroun.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNav('admin')}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Espace Administration</span>
            </button>
            <button
              onClick={() => handleNav('mentions-legales')}
              className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Mentions Légales & Confidentialité
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Retourner en haut de page"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
