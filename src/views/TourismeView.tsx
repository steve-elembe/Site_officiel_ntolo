import React from 'react';
import { Mountain, Trees, Compass, ShieldCheck, Footprints, Droplets, MapPin, Phone, Users, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface TourismeViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_TOURISME: OfficialSourceItem[] = [
  {
    title: 'Guide officiel de l’Écotourisme et des Parcs et Réserves du Cameroun',
    reference: 'Ministère du Tourisme et des Loisirs (MINTOUL)',
    type: 'Guide Public Officiel',
    status: 'Disponible',
    locationOrAccess: 'Délégation Régionale MINTOUL Littoral (Douala)',
  },
  {
    title: 'Inventaire des sites touristiques naturels et culturels du Moungo',
    reference: 'Délégation Départementale du Tourisme du Moungo (Nkongsamba)',
    type: 'Répertoire Officiel',
    status: 'Homologué',
    locationOrAccess: 'MINTOUL Nkongsamba',
  },
  {
    title: 'Charte d’accueil des visiteurs et de guidage de la Chefferie de Ntolo',
    reference: 'Comité Écotourisme et Jeunesse de Ntolo',
    type: 'Protocole Local',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie',
  },
];

export const TourismeView: React.FC<TourismeViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 16"
        title="Écotourisme, Randonnées & Découverte à Ntolo"
        description="Circuits d'ascension du Mont Nlonako, cascades naturelles, agro-tourisme dans les plantations de café-cacao et hospitalité villageoise."
        icon={Mountain}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les temps de parcours des sentiers pédestres et les tarifs de guidage communautaire sont validés par la commission d'accueil du village. Les informations d'hébergement en cours d'homologation sont indiquées [À compléter]."
      />

      {/* 1. Sanctuaire du Mont Nlonako */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 space-y-5">
        <div className="inline-flex items-center space-x-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
          <Compass className="w-3.5 h-3.5" />
          <span>DESTINATION ÉCOTOURISTIQUE MAJEURE DU MOUNGO</span>
        </div>

        <h2 className="font-serif-royal text-2xl sm:text-3xl font-extrabold text-white">
          Le Mont Nlonako : Entre Ciel, Canopée & Brumes
        </h2>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
          Dressé à plus de 1 800 mètres d'altitude, le Mont Nlonako offre aux passionnés de nature et aux randonneurs un cadre spectaculaire : panoramas à couper le souffle sur le bassin du Moungo, ruisseaux cristallins, forêts ombrophiles et une hospitalité légendaire.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 bg-emerald-900/60 rounded-xl border border-emerald-700/60">
            <span className="text-xs font-bold text-amber-300 block">Herpétofaune Unique</span>
            <span className="text-[11px] text-emerald-200 mt-1 block">Plus de 90 espèces d'amphibiens recensées par les scientifiques.</span>
          </div>
          <div className="p-3.5 bg-emerald-900/60 rounded-xl border border-emerald-700/60">
            <span className="text-xs font-bold text-amber-300 block">Agro-Tourisme Pédagogique</span>
            <span className="text-[11px] text-emerald-200 mt-1 block">Immersion dans la cueillette et le séchage traditionnel du café et cacao.</span>
          </div>
          <div className="p-3.5 bg-emerald-900/60 rounded-xl border border-emerald-700/60">
            <span className="text-xs font-bold text-amber-300 block">Pisteurs Locaux Expérimentés</span>
            <span className="text-[11px] text-emerald-200 mt-1 block">Randonnées guidées en sécurité par les jeunes résidents formés.</span>
          </div>
        </div>
      </section>

      {/* 2. Tableau des Circuits & Attractions Touristiques */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Footprints className="w-5 h-5 text-emerald-800" />
            <span>2. Circuits de Randonnée & Attractions Remarquables</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Itinéraires Écotouristiques
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Circuit / Site</th>
                <th className="px-4 py-3">Durée & Dénivelé</th>
                <th className="px-4 py-3">Niveau de Difficulté</th>
                <th className="px-4 py-3">Points Forts & Règles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Sentier des Cascades Sacrées</td>
                <td className="px-4 py-3 text-slate-700">~1h30 de marche aller-retour</td>
                <td className="px-4 py-3 text-emerald-800 font-bold">Facile / Tout public</td>
                <td className="px-4 py-3 text-slate-600">Baignade en eau vivifiante, observation d'oiseaux et libations coutumières discrètes</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Circuit Agro-écologique des Plantations</td>
                <td className="px-4 py-3 text-slate-700">~2 heures</td>
                <td className="px-4 py-3 text-emerald-800 font-bold">Facile / Familial</td>
                <td className="px-4 py-3 text-slate-600">Dégustation de fruits frais du terroir, explication de la fermentation du cacao</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Trek d'Ascension vers les Crêtes du Mont Nlonako</td>
                <td className="px-4 py-3 text-slate-700">~4h à 6h (dénivelé +800 m)</td>
                <td className="px-4 py-3 text-amber-800 font-bold">Moyen à Sportif</td>
                <td className="px-4 py-3 text-slate-600"><strong>Guide villageois obligatoire</strong>, vue panoramique exceptionnelle sur le Moungo</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Visite Historique de la Chefferie & Arbre à Palabres</td>
                <td className="px-4 py-3 text-slate-700">~45 minutes</td>
                <td className="px-4 py-3 text-emerald-800 font-bold">Accessible</td>
                <td className="px-4 py-3 text-slate-600">Découverte des insignes royaux, récits des Sages et bénédiction coutumière</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Protocole du Visiteur & Hébergement */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <span>3. Conseils Pratiques & Charte du Voyageur Responsable</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Civilité Coutumière</h4>
            <p className="text-slate-600 leading-relaxed">
              Avant toute expédition sur le mont ou tournage d'images professionnelles, il est de courtoisie de se présenter au secrétariat de la Chefferie royale pour saluer les autorités locales.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Équipement Recommandé</h4>
            <p className="text-slate-600 leading-relaxed">
              Chaussures de marche montantes crantées (sol humide et pentu), vêtement imperméable contre les averses subites du mont, gourde d'eau et répulsif anti-moustiques.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Hébergement & Restauration</h4>
            <p className="text-slate-600 leading-relaxed">
              Possibilité d'hébergement chez l'habitant avec repas traditionnels du terroir (sur réservation préalable) ou hôtels disponibles à Nkongsamba (~35 km).
            </p>
          </div>
        </div>
      </section>

      {/* Contact pour guides */}
      <section className="bg-stone-100 rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 block text-sm">Organisation de Visite & Réservation de Guides :</span>
          <p className="text-slate-600">Contactez le secrétariat de la Chefferie pour préparer votre venue et réserver un accompagnateur local.</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold flex items-center gap-1.5 flex-shrink-0"
        >
          <Phone className="w-4 h-4 text-amber-300" />
          <span>Contacter la permanence</span>
        </button>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_TOURISME}
        themeTitle="l'écotourisme et les randonnées à Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
