import React from 'react';
import { BookOpen, Landmark, Calendar, ShieldCheck, ScrollText, Users, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface HistoireViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_HISTOIRE: OfficialSourceItem[] = [
  {
    title: 'Témoignages du Conseil des Sages et Patriarches de Ntolo',
    reference: 'Tradition orale recueillie par le Comité de Développement',
    type: 'Récit Mémoriel Coutumier',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie de Ntolo',
  },
  {
    title: 'Archives préfectorales du Moungo sur les chefferies du canton',
    reference: '[À compléter : Cote d’archive / Référence préfectorale]',
    type: 'Archives Administratives Coloniales et Post-Indépendance',
    status: 'À compléter',
    locationOrAccess: 'Archives de Nkongsamba / Archives Nationales de Yaoundé',
  },
  {
    title: 'Études ethnographiques sur le peuplement du bassin de Nlonako',
    reference: 'Recherches universitaires et monographies régionales [À compléter]',
    type: 'Travaux Scientifiques',
    status: 'En cours de collationnement',
    locationOrAccess: 'Département d’Histoire, Universités camerounaises',
  },
];

export const HistoireView: React.FC<HistoireViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 02"
        title="Histoire & Mémoire du Village de Ntolo"
        description="Aux origines de la communauté : récits fondateurs, dynamiques de peuplement au pied du Mont Nlonako et jalons historiques documentés."
        icon={BookOpen}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="L'histoire de Ntolo repose sur une tradition orale vivante et des archives en cours de numérisation. Aucune généalogie ou date non formellement attestée n'est inventée. Les éléments en attente de validation portent la mention [À compléter]."
      />

      {/* Récit des Origines Fondatrices */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <ScrollText className="w-5 h-5 text-emerald-800" />
          <span>1. Les Origines et le Récit Fondateur</span>
        </h2>
        <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            L'implantation des populations de Ntolo sur les contreforts du Mont Nlonako s'inscrit dans les grandes migrations historiques qui ont façonné le peuplement du département du Moungo et des régions environnantes du Cameroun.
          </p>
          <p>
            Selon la mémoire collective transmise de génération en génération sous l'arbre à palabres, les pères fondateurs choisirent cet emplacement stratégique pour sa richesse écologique exceptionnelle : une eau abondante provenant des ruisseaux du massif, des sols volcaniques d'une rare fertilité et une topographie protectrice.
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-slate-700">
            <strong>Nom originel & Étymologie locale :</strong> [À compléter : Signification exacte du toponyme "NTOLO" selon les aînés et les linguistes du terroir].
          </div>
        </div>
      </section>

      {/* Tableau Chronologique des Grandes Périodes */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <span>2. Chronologie & Jalons Historiques Reconnus</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Repères Chronologiques
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 w-32">Époque / Année</th>
                <th className="px-4 py-3">Événement & Transformation</th>
                <th className="px-4 py-3">Statut & Sources</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-emerald-950">Période Précoloniale</td>
                <td className="px-4 py-3 text-slate-700">
                  Établissement des premiers foyers ancestraux, délimitation coutumière des terres avec les villages voisins et organisation du conseil des notables.
                </td>
                <td className="px-4 py-3 text-slate-500 italic">Tradition orale des aînés</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-emerald-950">Période Coloniale [À préciser]</td>
                <td className="px-4 py-3 text-slate-700">
                  Introduction progressive des cultures de rente (caféier et cacaoyer), traçage des premières pistes muletières d’évacuation vers le bassin de Nkongsamba.
                </td>
                <td className="px-4 py-3 text-slate-500 italic">Archives administratives du Moungo</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-emerald-950">1960 - 1977</td>
                <td className="px-4 py-3 text-slate-700">
                  Accession à l’indépendance du Cameroun, réorganisation administrative et promulgation du Décret N° 77/245 consacrant le statut légal des chefferies traditionnelles.
                </td>
                <td className="px-4 py-3 text-slate-500 italic">Journal Officiel du Cameroun</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-emerald-950">Années 1990 - 2000</td>
                <td className="px-4 py-3 text-slate-700">
                  Structuration du mouvement associatif villageois, création du premier Comité de Développement et émergence des premières antennes de la diaspora à Douala et Yaoundé.
                </td>
                <td className="px-4 py-3 text-slate-500 italic">Statuts et PV du CODEV</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-emerald-950">2020 - Présent</td>
                <td className="px-4 py-3 text-slate-700">
                  Modernisation institutionnelle, lancement des chantiers prioritaires d'adduction d'eau potable et mise en service du portail numérique officiel de Ntolo.
                </td>
                <td className="px-4 py-3 text-emerald-700 font-semibold">Portail officiel & Chefferie</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Lignée de la Chefferie & Succession Coutumière */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Landmark className="w-5 h-5 text-emerald-800" />
          <span>3. Lignée Dynastique & Succession des Chefs Traditionnels</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          La chefferie de Ntolo repose sur le principe de continuité dynastique et de respect des lois coutumières locales sous le contrôle du Conseil des Notables.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Ordre Dynastique</th>
                <th className="px-4 py-3">Nom du Chef Traditionnel</th>
                <th className="px-4 py-3">Période de Règne</th>
                <th className="px-4 py-3">Faits Notables & Héritage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-800">1er Chef mémorial</td>
                <td className="px-4 py-3 font-semibold text-slate-900">[À compléter : Nom du Chef fondateur]</td>
                <td className="px-4 py-3 text-slate-600">[À compléter : Années de règne]</td>
                <td className="px-4 py-3 text-slate-600">Fondation du village et sacralisation des lieux rituels [À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-800">Chefs intermédiaires</td>
                <td className="px-4 py-3 font-semibold text-slate-900">[À compléter : Liste certifiée par les Notables]</td>
                <td className="px-4 py-3 text-slate-600">[À compléter : Périodes successives]</td>
                <td className="px-4 py-3 text-slate-600">Stabilisation des limites et des alliances coutumières [À compléter]</td>
              </tr>
              <tr className="hover:bg-emerald-50/50 bg-emerald-50/30">
                <td className="px-4 py-3 font-bold text-emerald-900">Règne Actuel</td>
                <td className="px-4 py-3 font-extrabold text-emerald-950">{VILLAGE_INFO.chiefTitle}</td>
                <td className="px-4 py-3 text-emerald-900 font-semibold">[À compléter : Date d'intronisation et homologation]</td>
                <td className="px-4 py-3 text-emerald-950 font-medium">Conduite des chantiers modernes, rassemblement de la diaspora et préservation culturelle</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_HISTOIRE}
        themeTitle="l'histoire et la succession coutumière de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
