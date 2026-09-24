import React from 'react';
import { MapPin, Mountain, Waves, Compass, Navigation, Car, ShieldAlert } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO, LOCATION_DATA } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

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
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 03"
        title="Situation Géographique & Cadre Territorial"
        description="Localisation spatiale, topographie du Mont Nlonako, limites administratives, hydrographie et voies d'accès au village de Ntolo."
        icon={MapPin}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les coordonnées GPS exactes de la Chefferie et les délimitations cadastrales précises avec les terroirs voisins font l'objet d'un bornage technique et sont indiquées par la mention [À compléter]."
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
          <div><strong>Coordonnées GPS certifiées de la Chefferie :</strong> {LOCATION_DATA.coordinates}</div>
          <div><strong>Altitude moyenne estimée du village :</strong> [À compléter : ~600 m à 900 m selon les quartiers d’altitude]</div>
        </div>
      </section>

      {/* 2. Limites Territoriales & Terroirs Voisins */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Navigation className="w-5 h-5 text-emerald-800" />
          <span>2. Limites Territoriales & Confinements Coutumiers</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Le finage traditionnel de Ntolo est circonscrit par des repères naturels ancestraux (lignes de crêtes, cours d'eau pérennes, grands arbres remarquables) et par les limites administratives de l'Arrondissement de Nlonako.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 w-36">Orientation Cardinale</th>
                <th className="px-4 py-3">Villages / Entités Limitrophes</th>
                <th className="px-4 py-3">Repères Naturels de Délimitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Nord</td>
                <td className="px-4 py-3 text-slate-700">[À compléter : Villages ou crêtes au Nord de Ntolo]</td>
                <td className="px-4 py-3 text-slate-600">Contreforts et ravins du Mont Nlonako [À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Sud</td>
                <td className="px-4 py-3 text-slate-700">[À compléter : Villages limitrophes vers le Sud]</td>
                <td className="px-4 py-3 text-slate-600">Ruisseaux et zones de plantations ombragées [À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Est</td>
                <td className="px-4 py-3 text-slate-700">[À compléter : Limites vers la forêt d'altitude]</td>
                <td className="px-4 py-3 text-slate-600">Pente forestière et sanctuaires écologiques [À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Ouest</td>
                <td className="px-4 py-3 text-slate-700">[À compléter : Axe de liaison vers Nlonako centre / Nkongsamba]</td>
                <td className="px-4 py-3 text-slate-600">Piste de desserte et bassins agricoles [À compléter]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Relief, Climat & Hydrographie */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Mountain className="w-5 h-5 text-emerald-800" />
          <span>3. Relief, Climat & Réseau Hydrographique</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-emerald-800" />
              Relief & Géologie
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Ntolo se caractérise par une topographie de moyenne montagne, marquée par les épanchements basaltiques de la Ligne volcanique du Cameroun. Les pentes fertiles favorisent le drainage naturel des eaux pluviales.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-emerald-800" />
              Hydrographie & Sources
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Le village est arrosé par plusieurs cours d’eau pérennes prenant leur source sur les cimes du Mont Nlonako : [À compléter : Noms vernaculaires des principaux ruisseaux, cascades et cours d'eau qui traversent Ntolo].
            </p>
          </div>
        </div>
      </section>

      {/* 4. Voies d'accès et Itinéraires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Car className="w-5 h-5 text-emerald-800" />
          <span>4. Voies d'Accès & Distances de Référence</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Point de Départ</th>
                <th className="px-4 py-3">Itinéraire Emprunté</th>
                <th className="px-4 py-3">Distance Estimée</th>
                <th className="px-4 py-3">État de la Voie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {LOCATION_DATA.accessItinerary.map((it, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70">
                  <td className="px-4 py-3 font-bold text-slate-900">{it.from}</td>
                  <td className="px-4 py-3 text-slate-700">{it.detail}</td>
                  <td className="px-4 py-3 font-semibold text-amber-900">{it.distance}</td>
                  <td className="px-4 py-3 text-slate-500">Bitume jusqu'à l'axe Nlonako, puis piste rurale [À préciser]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_GEOGRAPHIE}
        themeTitle="la géographie, la topographie et l'accès à Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
