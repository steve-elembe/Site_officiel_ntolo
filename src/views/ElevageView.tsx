import React from 'react';
import { Egg, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface ElevageViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_ELEVAGE: OfficialSourceItem[] = [
  {
    title: 'Rapport d’activités et statistiques zootechniques du Département du Moungo',
    reference: 'Délégation Départementale du MINEPIA Moungo (Nkongsamba)',
    type: 'Rapport Administratif Officiel',
    status: 'Disponible',
    locationOrAccess: 'MINEPIA Nkongsamba / Poste Vétérinaire de Nlonako',
  },
  {
    title: 'Calendrier des campagnes de prophylaxie et vaccination du bétail et de la volaille',
    reference: 'Service Vétérinaire de l’Arrondissement de Nlonako',
    type: 'Protocole Sanitaire Animal',
    status: 'Homologué',
    locationOrAccess: 'Poste Zootechnique de Nlonako',
  },
  {
    title: 'Recensement des éleveurs de porcins et petits ruminants de Ntolo',
    reference: 'Commission Agropastorale du CODEV Ntolo',
    type: 'Enquête Communautaire',
    status: 'En cours de collationnement',
    locationOrAccess: 'Secrétariat du CODEV',
  },
];

export const ElevageView: React.FC<ElevageViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 12"
        title="Élevage & Productions Animales à Ntolo"
        description="Petit élevage de case, porciculture, petits ruminants, aviculture villageoise, apiculture de forêt et suivi zootechnique du MINEPIA."
        icon={Egg}
        onNavigateBack={() => onNavigate('agriculture')}
        provisionalNoticeText="Les données chiffrées sur la taille globale du cheptel villageois (nombre de têtes de caprins, porcins et volailles) sont en cours de dénombrement par le comité agropastoral. Les statistiques non définitives portent la mention [À compléter]."
      />

      {/* 1. Typologie des Espèces Élevées */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Egg className="w-5 h-5 text-emerald-800" />
            <span>1. Espèces Élevées & Pratiques Zootechniques</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            MINEPIA Moungo
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          L'élevage à Ntolo est traditionnellement pratiqué en complément des activités agricoles. Il constitue une réserve d'épargne sur pied pour les ménages, mobilisable pour les cérémonies coutumières, la rentrée scolaire ou les imprévus médicaux.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Filière Animale</th>
                <th className="px-4 py-3">Mode de Conduite & Alimentation</th>
                <th className="px-4 py-3">Rôle Économique & Coutumier</th>
                <th className="px-4 py-3">Effectif Estimé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Porciculture (Porcs locaux & améliorés)</td>
                <td className="px-4 py-3 text-slate-700">Porcheries familiales en matériaux locaux, affouragement par drêches et résidus vivriers</td>
                <td className="px-4 py-3 text-slate-600">Forte rentabilité, banquet de grandes fêtes villageoises</td>
                <td className="px-4 py-3 text-slate-600 font-mono">[À compléter : Nombre de porcheries]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Petits Ruminants (Chèvres & Moutons)</td>
                <td className="px-4 py-3 text-slate-700">Divagation diurne contrôlée en sous-bois, parquage nocturne</td>
                <td className="px-4 py-3 text-slate-600">Dot traditionnelle, sacrifices rituels et viande de fête</td>
                <td className="px-4 py-3 text-slate-600 font-mono">[À compléter : Nombre de têtes]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Aviculture Villageoise (Poulets du village)</td>
                <td className="px-4 py-3 text-slate-700">Élevage en plein air, maïs concassé et insectes du sol</td>
                <td className="px-4 py-3 text-slate-600">Consommation courante, accueil solennel des hôtes de marque</td>
                <td className="px-4 py-3 text-slate-600 font-mono">[À compléter : Présent dans chaque foyer]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Apiculture Forestière (Miel du Mont Nlonako)</td>
                <td className="px-4 py-3 text-slate-700">Ruches kenyanes et traditionnelles en écorce suspendues aux grands arbres</td>
                <td className="px-4 py-3 text-slate-600">Miel sauvage pur, haute valeur thérapeutique et pharmacopée</td>
                <td className="px-4 py-3 text-slate-600 font-mono">[À compléter : Nombre de ruches]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Suivi Vétérinaire & Défis Sanitaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Activity className="w-5 h-5 text-emerald-800" />
          <span>2. Encadrement Vétérinaire & Défis Sanitaires</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Peste Porcine Africaine (PPA)</h4>
            <p className="text-slate-600 leading-relaxed">
              Vigilance permanente sur la biosécurité des enclos pour prévenir les épizooties périodiques qui menacent le cheptel porcin du Moungo.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Prophylaxie Aviaire</h4>
            <p className="text-slate-600 leading-relaxed">
              Vaccination contre la maladie de Newcastle lors des passages d'appui de l'agent technique vétérinaire de Nlonako.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Potentiel Piscicole</h4>
            <p className="text-slate-600 leading-relaxed">
              Présence de ruisseaux permanents propices au creusement d'étangs de silures et tilapias, projet porté par les jeunes du village.
            </p>
          </div>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_ELEVAGE}
        themeTitle="l'élevage et les productions animales à Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
