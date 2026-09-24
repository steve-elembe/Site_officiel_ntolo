import React from 'react';
import { Compass, Landmark, MapPin, Mountain, Building2, Users, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO, SLOGAN_CONFIG } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface PresentationViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_PRESENTATION: OfficialSourceItem[] = [
  {
    title: 'Décret N° 77/245 du 15 juillet 1977 portant organisation des chefferies traditionnelles',
    reference: 'Présidence de la République du Cameroun / MINAT',
    type: 'Décret Républicain',
    status: 'Homologué',
    locationOrAccess: 'Journal Officiel de la République du Cameroun',
  },
  {
    title: 'Arrêté d’homologation de la Chefferie traditionnelle de 3e degré de Ntolo',
    reference: '[À compléter : Référence N° / Année / Signataire]',
    type: 'Acte Préfectoral / Sous-Préfectoral',
    status: 'En cours de collationnement',
    locationOrAccess: 'Préfecture du Moungo (Nkongsamba) / Sous-Préfecture de Nlonako',
  },
  {
    title: 'Monographie administrative du Département du Moungo',
    reference: 'Services du Gouverneur de la Région du Littoral',
    type: 'Document Administratif',
    status: 'Disponible',
    locationOrAccess: 'Archives régionales et préfectorales',
  },
];

export const PresentationView: React.FC<PresentationViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 01"
        title="Présentation Générale de Ntolo"
        description="Fiche synthétique, identité institutionnelle, vocation du terroir et cadre d'action de la communauté de Ntolo dans l'Arrondissement de Nlonako (Département du Moungo)."
        icon={Compass}
        onNavigateBack={() => onNavigate('accueil')}
      />

      {/* Carte d'identité institutionnelle du village (Tableau officiel) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-800" />
            <span>Fiche Signalétique Officielle du Village</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Données Administratives
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-stone-100">
              <tr className="bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-700 w-1/3">Dénomination Officielle</td>
                <td className="px-4 py-3 font-extrabold text-slate-900">{VILLAGE_INFO.fullName} ({VILLAGE_INFO.name})</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">Statut Coutumier</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.administrativeStatus}</td>
              </tr>
              <tr className="bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-700">Arrondissement de Rattachement</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.arrondissement} (Sous-Préfecture de Nlonako)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">Département</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.departement} (Chef-lieu : Nkongsamba)</td>
              </tr>
              <tr className="bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-700">Région</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.region} (Chef-lieu : Douala)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">État Souverain</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.country}</td>
              </tr>
              <tr className="bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-700">Devise Communautaire</td>
                <td className="px-4 py-3 italic text-amber-900 font-medium">« {SLOGAN_CONFIG.slogan} »</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">Autorité Traditionnelle</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.chiefTitle}</td>
              </tr>
              <tr className="bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-700">Organe de Concertation</td>
                <td className="px-4 py-3 text-slate-800">{VILLAGE_INFO.developmentCommittee}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">Superficie Estimée</td>
                <td className="px-4 py-3 text-slate-600 font-mono">[À compléter : Superficie exacte en km² ou hectares]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Vocation & Caractère du Village */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-stone-100 pb-3">
          Vocation & Identité de Ntolo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-emerald-700" />
              Un Terroir Volcanique
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bordé par les massifs du Mont Nlonako, Ntolo jouit d’une fertilité agronomique reconnue pour le café, le cacao et les cultures vivrières pérennes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-amber-700" />
              Une Dignité Coutumière
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La Chefferie de 3e degré assure la conciliation pacifique, le maintien de la paix sociale et la transmission intergénérationnelle des repères moraux.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-stone-700" />
              Un Élan de Modernisation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              À travers le CODEV et les réseaux de la diaspora, Ntolo conduit activement des projets d’eau potable, d’école et de désenclavement routier.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Rapide vers les sections institutionnelles */}
      <section className="bg-stone-100/80 rounded-2xl p-6 border border-stone-200 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Explorer les thématiques officielles détaillées
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <button
            onClick={() => onNavigate('geographie')}
            className="p-3 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 text-left transition-colors flex items-center justify-between"
          >
            <span>Situation Géographique</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('histoire')}
            className="p-3 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 text-left transition-colors flex items-center justify-between"
          >
            <span>Histoire & Origines</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('organisation-traditionnelle')}
            className="p-3 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 text-left transition-colors flex items-center justify-between"
          >
            <span>Organisation Coutumière</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('agriculture')}
            className="p-3 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 text-left transition-colors flex items-center justify-between"
          >
            <span>Agriculture & Économie</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </section>

      {/* Section Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_PRESENTATION}
        themeTitle="la présentation générale et le statut administratif de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
