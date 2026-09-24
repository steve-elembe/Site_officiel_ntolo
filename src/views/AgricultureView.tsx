import React from 'react';
import { Wheat, Sun, CloudRain, ShoppingBag, Truck, Trees, Award, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface AgricultureViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_AGRICULTURE: OfficialSourceItem[] = [
  {
    title: 'Statistiques agricoles du Département du Moungo (Campagnes Café-Cacao)',
    reference: 'Délégation Départementale du MINADER Moungo (Nkongsamba)',
    type: 'Rapport Annuel Officiel',
    status: 'Disponible',
    locationOrAccess: 'MINADER Moungo / Poste Agricole de Nlonako',
  },
  {
    title: 'Normes de qualité et barème de certification du Cacao et Café du Cameroun',
    reference: 'Office National du Cacao et du Café (ONCC) / CICC',
    type: 'Réglementation Filière',
    status: 'Homologué',
    locationOrAccess: 'Publications officielles ONCC',
  },
  {
    title: 'Registre d’immatriculation des GIC agricoles et coopératives de Ntolo',
    reference: 'Service Registre Coop/GIC du MINADER Moungo',
    type: 'Registre Légal',
    status: 'En cours de collationnement',
    locationOrAccess: 'Délégation d’Arrondissement de Nlonako',
  },
];

export const AgricultureView: React.FC<AgricultureViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 11"
        title="Agriculture & Terroirs Fertiles de Ntolo"
        description="Filières de rente (Café, Cacao), cultures vivrières volcaniques, calendrier agronomique et organisation des producteurs locaux."
        icon={Wheat}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les volumes annuels de récolte (tonnages de fèves de cacao et de sacs de café) et les cours moyens bord-champ varient à chaque campagne et sont consolidés par les GIC. Les données à préciser sont notées [À compléter]."
      />

      {/* 1. Filières de Rente : Café & Cacao */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-800" />
            <span>1. Grandes Cultures d'Exportation & Filières de Rente</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Filières Structurées
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Le Caféier (Robusta & Arabica)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Tradition centenaire
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grâce à l’altitude des contreforts du Mont Nlonako et au sol volcanique riche en minéraux, le café de Ntolo présente un arôme corsé et une acidité équilibrée très appréciés des torréfacteurs.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Production estimée : [À compléter : Tonnage annuel moyen]
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Le Cacaoyer (Fèves Marchandes)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                Piliers de trésorerie
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cultivé sous ombrage forestier naturel selon des pratiques agro-écologiques respectueuses de la biodiversité. La fermentation en caisses de bois et le séchage au soleil garantissent des fèves de qualité Grade I.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Production estimée : [À compléter : Tonnage annuel moyen]
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tableau des Cultures Vivrières & Maraîchères */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Wheat className="w-5 h-5 text-emerald-800" />
            <span>2. Cultures Vivrières & Sécurité Alimentaire</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Terres Noires Volcaniques
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Spéculation Agricole</th>
                <th className="px-4 py-3">Variétés & Pratiques Locales</th>
                <th className="px-4 py-3">Période de Grande Disponibilité</th>
                <th className="px-4 py-3">Destination Principale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Banane-Plantain</td>
                <td className="px-4 py-3 text-slate-700">Variétés cornes et faux-cornes, culture associée aux cacaoyères</td>
                <td className="px-4 py-3 text-slate-600">Toute l'année (pic en saison sèche)</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Consommation locale & marchés de Nkongsamba / Douala</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Macabo & Ignames</td>
                <td className="px-4 py-3 text-slate-700">Tubercules traditionnels à haute valeur calorique</td>
                <td className="px-4 py-3 text-slate-600">Novembre à Mars</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Aliment de base familial et vente directe</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Maïs & Légumineuses (Arachides)</td>
                <td className="px-4 py-3 text-slate-700">Deux cycles annuels grâce à la bimodalité des pluies</td>
                <td className="px-4 py-3 text-slate-600">Juillet - Août et Décembre - Janvier</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Consommation ménagère et élevage familial</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Arbres Fruitiers (Safou, Agrumes, Mangues)</td>
                <td className="px-4 py-3 text-slate-700">Safou du Moungo (prune noire), mandarines, avocats d'altitude</td>
                <td className="px-4 py-3 text-slate-600">Mai à Septembre selon les espèces</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Commercialisation le long des axes routiers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Calendrier Agronomique Saisonnier */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <CloudRain className="w-5 h-5 text-emerald-800" />
          <span>3. Calendrier des Travaux Champêtres</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              Saison Sèche (Décembre - Février)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Fin des récoltes de cacao, séchage complet, taille des caféiers, débroussaillage et brûlis contrôlé pour la préparation des nouveaux champs vivriers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-emerald-700" />
              Saison des Pluies (Mars - Novembre)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Semis des vivres dès les premières pluies de mars, floraison des caféiers, traitements phytosanitaires préventifs contre la pourriture brune du cacao et récoltes échelonnées.
            </p>
          </div>
        </div>
      </section>

      {/* Liens vers Élevage et Commerce */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('elevage')}
          className="p-4 rounded-xl bg-stone-100 hover:bg-emerald-50 border border-stone-200 text-left transition-colors flex items-center justify-between text-xs"
        >
          <div>
            <span className="font-bold text-slate-900 block">Explorer l'Élevage à Ntolo</span>
            <span className="text-slate-500">Petit élevage familial, aviculture et caprins</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
        <button
          onClick={() => onNavigate('economie-commerce')}
          className="p-4 rounded-xl bg-stone-100 hover:bg-emerald-50 border border-stone-200 text-left transition-colors flex items-center justify-between text-xs"
        >
          <div>
            <span className="font-bold text-slate-900 block">Commerce & Activités Économiques</span>
            <span className="text-slate-500">Circuits de vente, marchés et boutiques</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_AGRICULTURE}
        themeTitle="l'agriculture et la production végétale de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
