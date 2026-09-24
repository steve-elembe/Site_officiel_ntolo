import React from 'react';
import { ShoppingBag, Store, Coins, Truck, Wrench, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface EconomieCommerceViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_ECONOMIE: OfficialSourceItem[] = [
  {
    title: 'Règlement de police des marchés et activités commerciales de la Commune de Nlonako',
    reference: 'Arrêté Municipal de la Commune de Nlonako',
    type: 'Arrêté Municipal',
    status: 'Disponible',
    locationOrAccess: 'Mairie de Nlonako',
  },
  {
    title: 'Barème officiel d’homologation des prix et lutte contre la vie chère dans le Moungo',
    reference: 'Délégation Départementale du Commerce du Moungo (MINCOMMERCE)',
    type: 'Circulaire Administrative',
    status: 'Homologué',
    locationOrAccess: 'Nkongsamba',
  },
  {
    title: 'Statuts et règlements intérieurs des tontines et mutuelles solidaires de Ntolo',
    reference: 'Comité de Suivi Économique de la Chefferie de Ntolo',
    type: 'Règlement Coutumier et Associatif',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
];

export const EconomieCommerceView: React.FC<EconomieCommerceViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 13"
        title="Commerce & Activités Économiques à Ntolo"
        description="Boutiques de proximité, circuits de commercialisation des récoltes, artisanat, transport rural, tontines solidaires et potentiel d'investissement."
        icon={ShoppingBag}
        onNavigateBack={() => onNavigate('agriculture')}
        provisionalNoticeText="Le répertoire des commerces enregistrés et des ateliers artisanaux fait l'objet d'une mise à jour en concertation avec la commission économique communale. Les éléments en cours d'enregistrement portent la mention [À compléter]."
      />

      {/* 1. Réseau Commercial Local */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-800" />
            <span>1. Commerces de Proximité & Marchés de Rattachement</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Circuits de Distribution
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Type de Commerce / Marché</th>
                <th className="px-4 py-3">Rôle & Biens Échangés</th>
                <th className="px-4 py-3">Périodicité / Horaires</th>
                <th className="px-4 py-3">Emplacement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Boutiques d'Alimentation Générale</td>
                <td className="px-4 py-3 text-slate-700">Produits de première nécessité (sel, savon, huile raffinée, riz, bougies, piles, quincaillerie courante)</td>
                <td className="px-4 py-3 text-slate-600">Ouvert tous les jours</td>
                <td className="px-4 py-3 text-slate-600">Quartier Chefferie et carrefours du village</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Marché Périodique de Nlonako Centre</td>
                <td className="px-4 py-3 text-slate-700">Vente en gros et détail des régimes de plantain, sacs de cacao, légumes, friperie et viande</td>
                <td className="px-4 py-3 text-slate-600 font-semibold">[À compléter : Jours de marché réguliers]</td>
                <td className="px-4 py-3 text-slate-600">Place du marché de Nlonako (~[À compléter] km)</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Grand Marché de Nkongsamba</td>
                <td className="px-4 py-3 text-slate-700">Pôle commercial régional majeur, grossistes en intrants agricoles (engrais, pulvérisateurs)</td>
                <td className="px-4 py-3 text-slate-600">Permanent (forte affluence le week-end)</td>
                <td className="px-4 py-3 text-slate-600">Centre urbain de Nkongsamba</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Artisanat & Services de Terroir */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Wrench className="w-5 h-5 text-emerald-800" />
          <span>2. Artisanat, Métiers & Services Locaux</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Transport Rural (Moto-Taxis)</h4>
            <p className="text-slate-600 leading-relaxed">
              Essentiel pour l'évacuation rapide des denrées périssables et le déplacement des habitants vers Nlonako et l'axe bitumé.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Bâtiment & Maçonnerie</h4>
            <p className="text-slate-600 leading-relaxed">
              Fabrication de briques de terre comprimée, charpenterie traditionnelle et équipes de maçons mobilisées sur les chantiers d'habitat durable.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Transformation Agro-alimentaire</h4>
            <p className="text-slate-600 leading-relaxed">
              Moulins à manioc et maïs, presses traditionnelles d'huile de palme et séchoirs à cacao villageois partagés.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tontines & Microfinance Communautaire */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Coins className="w-5 h-5 text-emerald-800" />
          <span>3. Épargne Populaire & Tontines Solidaires</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          En l’absence d’agences bancaires classiques au village, les tontines rotatives et les caisses d'entraide féminines constituent le moteur de l’inclusion financière locale. Elles permettent l'achat des semences, le financement des frais de scolarité et l'octroi de micro-crédits d'urgence sans intérêt prohibitif.
        </p>
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-600">
          <strong>Caisse Communautaire du CODEV :</strong> Système de traçabilité des cotisations volontaires de la diaspora avec délivrance de récépissés numérotés pour garantir l'intégrité des fonds.
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_ECONOMIE}
        themeTitle="le commerce, l'artisanat et les activités économiques de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
