import React from 'react';
import { Hammer, Droplets, Zap, Radio, Building2, Truck, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface InfrastructuresViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_INFRASTRUCTURES: OfficialSourceItem[] = [
  {
    title: 'Schéma directeur des pistes rurales du Département du Moungo',
    reference: 'Délégation Départementale des Travaux Publics (MINTP Moungo)',
    type: 'Plan Directeur Sectoriel',
    status: 'Disponible',
    locationOrAccess: 'MINTP Nkongsamba / Mairie de Nlonako',
  },
  {
    title: 'Inventaire des points d’eau et schémas d’adduction en milieu rural',
    reference: 'Délégation Départementale de l’Eau et de l’Énergie (MINEE Moungo)',
    type: 'Rapport Technique',
    status: 'Disponible',
    locationOrAccess: 'MINEE Nkongsamba',
  },
  {
    title: 'Cartographie de la couverture radioélectrique et réseau cellulaire 2G/3G/4G',
    reference: 'Agence de Régulation des Télécommunications (ART Cameroun)',
    type: 'Relevé Technique Réglementaire',
    status: 'Homologué',
    locationOrAccess: 'ART Cameroun',
  },
];

export const InfrastructuresView: React.FC<InfrastructuresViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 14"
        title="Infrastructures & Équipements Collectifs à Ntolo"
        description="Réseau routier et pistes rurales, adduction d'eau potable, électrification et kits solaires, télécommunications mobiles et bâtiments publics."
        icon={Hammer}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="L'état technique des ouvrages d'art (ponts en bois, buses métalliques) et le linéaire des pistes aménagées font l'objet d'un audit de voirie par le CODEV et les services communaux. Les fiches techniques en attente d'homologation sont marquées [À compléter]."
      />

      {/* 1. Tableau d'État des Lieux des Infrastructures */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-800" />
            <span>1. Diagnostic Global des Réseaux & Équipements</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            MINTP / MINEE / ART
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Secteur d'Infrastructure</th>
                <th className="px-4 py-3">Équipements Existants</th>
                <th className="px-4 py-3">État Opérationnel</th>
                <th className="px-4 py-3">Besoins Urgents & Chantiers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Pistes Rurales & Voies d'Accès</span>
                </td>
                <td className="px-4 py-3 text-slate-700">Piste principale reliant Ntolo à l'axe Nlonako et pistes de desserte des plantations</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    Praticable en saison sèche / Délicat en pluies
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">Rechargement en latérite, curage des fossés et pose de buses en béton aux passages de ruisseaux</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-700" />
                  <span>Eau Potable & Assainissement</span>
                </td>
                <td className="px-4 py-3 text-slate-700">Captages artisanaux de sources de montagne et puits villageois traditionnels</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold">
                    Insuffisant / Projet en cours
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">Chantier d'adduction par gravité avec réservoir de 10 m³ et 4 bornes-fontaines publiques</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span>Énergie & Électrification</span>
                </td>
                <td className="px-4 py-3 text-slate-700">Générateurs individuels, quelques panneaux solaires domestiques</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-bold">
                    Hors réseau interconnecté
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">Projet de mini-centrale solaire communautaire et lampadaires d'éclairage public</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-emerald-700" />
                  <span>Télécoms & Réseau Mobile</span>
                </td>
                <td className="px-4 py-3 text-slate-700">Couverture relais MTN, Orange et CAMTEL captée sur les hauteurs</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                    Opérationnel (Zones ouvertes)
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">Densification du signal 4G pour désenclaver totalement les concessions encaissées</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Focus Chantier d'Urgence : Pistes et Ouvrages d'Art */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Truck className="w-5 h-5 text-emerald-800" />
          <span>2. Priorité Absolue : Le Désenclavement Routier</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Évacuation des Récoltes</h4>
            <p className="text-slate-600 leading-relaxed">
              Sans pistes carrossables, les sacs de cacao et les régimes de plantain pourrissent bord-champ ou subissent des surcoûts de portage à dos d'homme qui diminuent le revenu des paysans.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Mobilisation Citoyenne (Salongo)</h4>
            <p className="text-slate-600 leading-relaxed">
              Chaque premier samedi du mois, les jeunes et les chefs de famille réalisent le débroussaillage des accotements et le calage des radiers en pierres pour maintenir le passage des véhicules.
            </p>
          </div>
        </div>
      </section>

      {/* Accès direct aux projets */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-emerald-950 block">Participez à la modernisation de nos infrastructures :</span>
          <p className="text-emerald-800">Consultez la liste des projets financés par le CODEV et apportez votre contribution citoyenne.</p>
        </div>
        <button
          onClick={() => onNavigate('projets')}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Consulter les chantiers</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_INFRASTRUCTURES}
        themeTitle="les infrastructures et équipements collectifs de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
