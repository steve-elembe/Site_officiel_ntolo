import React from 'react';
import { MapPin, Mountain, Waves, Compass, Navigation, Car, ShieldAlert, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO, LOCATION_DATA } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';
import { usePageContent } from '../hooks/usePageContent';
import { getSiteSettings } from '../services/adminService';

interface GeographieViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_GEOGRAPHIE: OfficialSourceItem[] = [
  {
    title: 'Cartes topographiques du bassin du Mont Nlonako au 1/50 000',
    reference: 'Institut National de Cartographie du Cameroun (INC)',
    type: 'Cartographie d’État',
    status: 'Homologué',
    locationOrAccess: 'Archives cartographiques de Yaoundé & INC',
  },
  {
    title: 'Délimitation administrative et plan cadastral du Moungo',
    reference: 'Délégation Départementale du Cadastre et des Affaires Foncières du Moungo',
    type: 'Registre Foncier et Cadastral',
    status: 'En cours de collationnement',
    locationOrAccess: 'Nkongsamba',
  },
  {
    title: 'Monographie géo-environnementale de l’Arrondissement de Nlonako',
    reference: 'Sous-Préfecture de Nlonako / Commune de Nlonako',
    type: 'Rapport Territorial',
    status: 'Disponible',
    locationOrAccess: 'Sous-Préfecture de Nlonako',
  },
];

export const GeographieView: React.FC<GeographieViewProps> = ({ onNavigate }) => {
  const content = usePageContent('geographie');
  const settings = getSiteSettings();

  const reliefSection = content.sections.find((s) => s.id === 'relief-climat') || content.sections[0];
  const hydroSection = content.sections.find((s) => s.id === 'hydrographie-sources') || content.sections[1];
  const accesSection = content.sections.find((s) => s.id === 'voies-acces') || content.sections[2];

  const customSections = content.sections.filter(
    (s) => s.id !== 'relief-climat' && s.id !== 'hydrographie-sources' && s.id !== 'voies-acces'
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge={content.badge || 'Portail Officiel • Section 03'}
        title={content.title || 'Situation Géographique & Cadre Territorial'}
        description={content.description || 'Localisation spatiale, topographie du Mont Nlonako, limites administratives, hydrographie et voies d\'accès au village de Ntolo.'}
        icon={MapPin}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText={content.provisionalNotice || 'Les coordonnées GPS exactes de la Chefferie et les délimitations cadastrales précises avec les terroirs voisins font l\'objet d\'un bornage technique et sont indiquées par la mention [À compléter].'}
      />

      {/* 1. Coordonnées et Repères Spatiaux */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Compass className="w-5 h-5 text-emerald-800" />
          <span>1. Coordonnées & Positionnement Territorial</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-slate-500 block">Région</span>
            <span className="text-base font-extrabold text-slate-900">{VILLAGE_INFO.region}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Sud-Ouest littoral</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-slate-500 block">Département</span>
            <span className="text-base font-extrabold text-slate-900">{VILLAGE_INFO.departement}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Bassin de Nkongsamba</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-slate-500 block">Arrondissement</span>
            <span className="text-base font-extrabold text-slate-900">{VILLAGE_INFO.arrondissement}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Circonscription de Nlonako</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-slate-500 block">Massif Tutélaire</span>
            <span className="text-base font-extrabold text-emerald-900">Mont Nlonako</span>
            <span className="text-[11px] text-emerald-700 block mt-0.5">Point culminant : ~1 825 m</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-slate-700 space-y-1">
          <div>
            <strong>Coordonnées GPS certifiées de la Chefferie :</strong>{' '}
            {settings.gpsLatitude && settings.gpsLongitude
              ? `${settings.gpsLatitude}° N, ${settings.gpsLongitude}° E`
              : LOCATION_DATA.coordinates}
          </div>
          <div>
            <strong>Altitude moyenne estimée :</strong> {settings.gpsAltitude || '[À compléter : ~600 m à 900 m selon les quartiers d’altitude]'}
          </div>
        </div>
      </section>

      {/* 2. Relief, Climat & Hydrographie */}
      {reliefSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-emerald-800" />
              <span>{reliefSection.title}</span>
            </h2>
            {reliefSection.subtitle && (
              <span className="text-xs text-stone-500">{reliefSection.subtitle}</span>
            )}
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{reliefSection.content}</p>
          {reliefSection.bullets && reliefSection.bullets.length > 0 && (
            <ul className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {reliefSection.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* 3. Hydrographie & Richesse des Eaux */}
      {hydroSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Waves className="w-5 h-5 text-emerald-800" />
              <span>{hydroSection.title}</span>
            </h2>
            {hydroSection.subtitle && (
              <span className="text-xs text-stone-500">{hydroSection.subtitle}</span>
            )}
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{hydroSection.content}</p>
          {hydroSection.bullets && hydroSection.bullets.length > 0 && (
            <ul className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5 text-xs text-emerald-950 list-disc list-inside">
              {hydroSection.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* 4. Voies d'Accès & Desserte */}
      {accesSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-emerald-800" />
              <span>{accesSection.title}</span>
            </h2>
            {accesSection.subtitle && (
              <span className="text-xs text-stone-500">{accesSection.subtitle}</span>
            )}
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{accesSection.content}</p>
          {accesSection.bullets && accesSection.bullets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              {accesSection.bullets.map((b, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-slate-800 block">Itinéraire {i + 1}</span>
                  <span className="text-slate-600 block">{b}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Sections personnalisées ajoutées par l'administration */}
      {customSections.map((sec) => (
        <section key={sec.id} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{sec.title}</span>
            </h2>
            {sec.isProvisional && (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                À compléter
              </span>
            )}
          </div>
          {sec.subtitle && (
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">{sec.subtitle}</p>
          )}
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{sec.content}</p>
          {sec.bullets && sec.bullets.length > 0 && (
            <ul className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {sec.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Section Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_GEOGRAPHIE}
        themeTitle="la géographie, le relief et les voies d'accès de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
