import React from 'react';
import { HeartPulse, Hospital, ShieldAlert, PhoneCall, Stethoscope, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface SanteViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_SANTE: OfficialSourceItem[] = [
  {
    title: 'Carte sanitaire du District de Santé de Nlonako / Nkongsamba',
    reference: 'Délégation Régionale de la Santé Publique pour le Littoral (DRSPL / MINSANTE)',
    type: 'Carte Sanitaire Publique',
    status: 'Disponible',
    locationOrAccess: 'District de Santé de Nkongsamba / Centre Médical de Nlonako',
  },
  {
    title: 'Registre des campagnes de vaccination PEV (Programme Élargi de Vaccination)',
    reference: 'Centre de Santé de Rattachement de Nlonako',
    type: 'Registre Médical Officiel',
    status: 'Homologué',
    locationOrAccess: 'CSI Nlonako',
  },
  {
    title: 'Protocole d’accord sur la pharmacopée traditionnelle responsable du Moungo',
    reference: 'Ordre National des Tradipraticiens / MINSANTE',
    type: 'Cadre Réglementaire',
    status: 'En cours de collationnement',
    locationOrAccess: 'Délégation Régionale de la Santé',
  },
];

export const SanteView: React.FC<SanteViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 10"
        title="Santé & Prise en Charge Médicale à Ntolo"
        description="Dispositif de soins primaires, Centre de Santé de rattachement, santé maternelle et infantile, urgences sanitaires et pharmacopée traditionnelle."
        icon={HeartPulse}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les horaires de permanence du personnel soignant et les effectifs d'infirmiers sont mis à jour selon les affectations de la Délégation Départementale de la Santé du Moungo. Les mentions à préciser sont signalées [À compléter]."
      />

      {/* 1. Échelon Sanitaire & Structures de Référence */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Hospital className="w-5 h-5 text-emerald-800" />
            <span>1. Dispositif Médical & Pyramide Sanitaire</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            District de Santé
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Échelon Sanitaire</th>
                <th className="px-4 py-3">Structure de Prise en Charge</th>
                <th className="px-4 py-3">Plateau Technique & Soins Assurés</th>
                <th className="px-4 py-3">Localisation & Distance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Poste de Santé Local</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Poste de Santé Communautaire de Ntolo</td>
                <td className="px-4 py-3 text-slate-600">Premiers secours, consultations de base, pansements et suivi paludisme [À compléter]</td>
                <td className="px-4 py-3 text-emerald-800 font-medium">Ntolo Centre</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Centre de Santé Intégré (CSI)</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Centre Médical d’Arrondissement de Nlonako</td>
                <td className="px-4 py-3 text-slate-600">Maternité, accouchements surveillés, carnet vaccinal PEV et laboratoire</td>
                <td className="px-4 py-3 text-slate-600">Nlonako Centre (~[À compléter] km)</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Hôpital de Référence</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Hôpital de District de Nkongsamba / Régional</td>
                <td className="px-4 py-3 text-slate-600">Chirurgie d'urgence, bloc opératoire, imagerie médicale et urgences vitales</td>
                <td className="px-4 py-3 text-slate-600">Nkongsamba (~30-35 km)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Pathologies Dominantes & Prévention */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Stethoscope className="w-5 h-5 text-emerald-800" />
          <span>2. Pathologies Prévalentes & Prévention Sanitaire</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Paludisme (Malaria)</h4>
            <p className="text-slate-600 leading-relaxed">
              Pathologie endémique majeure liée au climat chaud et humide. Distribution régulière de moustiquaires imprégnées (MILD) soutenue par le MINSANTE.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Maladies Hydriques</h4>
            <p className="text-slate-600 leading-relaxed">
              Amibes et diarrhées liées à l'usage d'eaux de ruissellement non bouillies. D'où l'urgence absolue des <strong>chantiers d'adduction d'eau potable</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Santé Mère-Enfant</h4>
            <p className="text-slate-600 leading-relaxed">
              Suivi des consultations prénatales (CPN) et calendrier vaccinal complet (BCG, Polio, Pentavalent, Rougeole) assuré lors des passages des équipes mobiles.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Besoins Prioritaires & Chantier Solaire */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sun className="w-5 h-5 text-emerald-800" />
          <span>3. Priorités d'Action Sanitaire du Village</span>
        </h2>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
          <h4 className="font-bold text-amber-950 text-sm">Projet d'Électrification Solaire & Chaîne du Froid</h4>
          <p className="text-xs text-amber-900 leading-relaxed">
            Pour sécuriser la conservation des sérums antivenimeux et des vaccins, le CODEV a inscrit l'installation d'un kit solaire photovoltaïque parmi les chantiers prioritaires à souscription ouverte.
          </p>
        </div>
      </section>

      {/* 4. Permanence & Numéros d'Urgence */}
      <section className="bg-stone-100 rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 block text-sm">Urgences & Évacuation Sanitaire :</span>
          <p className="text-slate-600">En cas d'accident grave ou d'accouchement complexe, contacter sans délai la permanence de la Chefferie ou le poste de santé.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono font-bold text-emerald-900 bg-white px-3 py-2 rounded-xl border border-stone-300 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            {VILLAGE_INFO.emergencyPhone}
          </span>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_SANTE}
        themeTitle="la santé et l'organisation sanitaire de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
