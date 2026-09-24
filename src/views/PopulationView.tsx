import React from 'react';
import { Users, Home, UserCheck, ShieldCheck, FileSpreadsheet, Globe, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface PopulationViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_POPULATION: OfficialSourceItem[] = [
  {
    title: 'Recensement Général de la Population et de l’Habitat (3e RGPH) - Données Moungo / Nlonako',
    reference: 'Bureau Central des Recensements et des Études de Population (BUCREP) / INS Cameroun',
    type: 'Recensement National Officiel',
    status: 'Disponible',
    locationOrAccess: 'Publications officielles INS Cameroun',
  },
  {
    title: 'Fichier d’identification et de dénombrement des foyers de Ntolo',
    reference: 'Secrétariat Général de la Chefferie de 3e Degré de Ntolo',
    type: 'Registre Communautaire',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie de Ntolo',
  },
  {
    title: 'Registres de l’État Civil (Naissances, Mariages, Décès)',
    reference: 'Centre Secondaire d’État Civil de Ntolo / Mairie de Nlonako',
    type: 'Actes d’État Civil',
    status: 'À compléter',
    locationOrAccess: 'Mairie de Nlonako',
  },
];

export const PopulationView: React.FC<PopulationViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 04"
        title="Démographie, Quartiers & Population de Ntolo"
        description="Composition démographique, découpage en quartiers traditionnels, structuration communautaire et dynamique migratoire des résidents et de la diaspora."
        icon={Users}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="En conformité avec les normes statistiques du BUCREP et du Ministère de l'Administration Territoriale, aucun chiffre de population non certifié par les données officielles de recensement n'est publié. Les données locales en cours de collecte sont indiquées [À compléter]."
      />

      {/* 1. Cadre Démographique Officiel */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-800" />
            <span>1. Indicateurs Démographiques Clés</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Norme BUCREP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Population Résidente Totale</span>
            <span className="text-base font-extrabold text-slate-900">[À compléter : Donnée certifiée BUCREP / Chefferie]</span>
            <p className="text-[11px] text-slate-500">Recensement local en cours de consolidation</p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Nombre de Foyers Estimés</span>
            <span className="text-base font-extrabold text-slate-900">[À compléter : Nombre de concessions]</span>
            <p className="text-[11px] text-slate-500">Foyers recensés dans les différents blocs</p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Profil par Tranche d'Âge</span>
            <span className="text-base font-extrabold text-emerald-900">Forte proportion de jeunes</span>
            <p className="text-[11px] text-slate-500">Majorité de moins de 30 ans et patriarches respectés</p>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
          <p>
            <strong>Note méthodologique :</strong> La population de Ntolo se caractérise par une double dynamique : une population résidente permanente dédiée aux travaux agropastoraux et à l'artisanat, et une importante population ressortissante établie dans les grands centres urbains (Douala, Nkongsamba, Yaoundé) qui maintient des attaches familiales constantes.
          </p>
        </div>
      </section>

      {/* 2. Quartiers & Blocs Traditionnels */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-800" />
            <span>2. Quartiers & Structuration Spatiale du Village</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Découpage Coutumier
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Le village de Ntolo est subdivisé en quartiers coutumiers et blocs d'habitation, placés sous la responsabilité de chefs de quartiers ou notables délégués par Sa Majesté.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Quartier / Bloc</th>
                <th className="px-4 py-3">Responsable Coutumier Délégué</th>
                <th className="px-4 py-3">Situation & Caractéristiques</th>
                <th className="px-4 py-3">Infrastructures Présentes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Quartier Chefferie (Palais)</td>
                <td className="px-4 py-3 font-medium text-slate-800">[À compléter : Notables de la Cour]</td>
                <td className="px-4 py-3 text-slate-600">Cœur cérémoniel, place royale et arbre à palabres</td>
                <td className="px-4 py-3 text-slate-600">Palais royal, esplanade coutumière</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">[À compléter : Quartier 2]</td>
                <td className="px-4 py-3 font-medium text-slate-800">[À compléter : Nom du responsable]</td>
                <td className="px-4 py-3 text-slate-600">Zone d'habitation et de plantations [À compléter]</td>
                <td className="px-4 py-3 text-slate-600">[À compléter : Point d'eau / École]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">[À compléter : Quartier 3]</td>
                <td className="px-4 py-3 font-medium text-slate-800">[À compléter : Nom du responsable]</td>
                <td className="px-4 py-3 text-slate-600">Zone de confluence agricole [À compléter]</td>
                <td className="px-4 py-3 text-slate-600">[À compléter : Voie de desserte]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">[À compléter : Quartier 4]</td>
                <td className="px-4 py-3 font-medium text-slate-800">[À compléter : Nom du responsable]</td>
                <td className="px-4 py-3 text-slate-600">Piémont du Mont Nlonako [À compléter]</td>
                <td className="px-4 py-3 text-slate-600">[À compléter : Sources aménagées]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Cohésion Sociale & Associations Communautaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <UserCheck className="w-5 h-5 text-emerald-800" />
          <span>3. Groupes Sociaux & Dynamique Associative</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Le Conseil des Sages</h4>
            <p className="text-slate-600 leading-relaxed">
              Composé des patriarches et aînés dépositaires des us et coutumes, garant de l'arbitrage pacifique et de l'intégrité de la terre de Ntolo.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Les Associations de Femmes</h4>
            <p className="text-slate-600 leading-relaxed">
              Groupements d'entraide agricole, tontines solidaires et gestionnaires des récoltes vivrières : un pilier indispensable de la sécurité alimentaire.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Le Mouvement des Jeunes</h4>
            <p className="text-slate-600 leading-relaxed">
              Moteur des journées citoyennes de Salongo, de l'animation sportive (football inter-quartiers) et de la sensibilisation au développement du village.
            </p>
          </div>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_POPULATION}
        themeTitle="la population, la démographie et les quartiers de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
