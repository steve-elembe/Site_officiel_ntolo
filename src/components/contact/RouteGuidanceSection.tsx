/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Car, Navigation, Clock, Compass, ShieldAlert,
  Fuel, CheckCircle2, ChevronRight, Bus, Bike
} from 'lucide-react';

interface Itinerary {
  id: string;
  origin: string;
  distance: string;
  estimatedTime: string;
  roadType: string;
  steps: string[];
  transportOptions: string;
  recommendedVehicle: string;
  indicativeFare: string;
}

const ITINERARIES: Itinerary[] = [
  {
    id: 'douala',
    origin: 'Depuis Douala (Métropole Économique)',
    distance: 'Environ 145 km',
    estimatedTime: '2h45 à 3h15',
    roadType: 'Route Nationale N5 (bitumée jusqu’à Nlonako) puis 3,5 km de piste aménagée',
    steps: [
      'Quitter Douala par le Rond-Point Deido / Sortie Nord (Axe Lourd N5).',
      'Passer Bomono, Mbanga et Loum au cœur du bassin agricole du Moungo.',
      'Atteindre l’entrée sud de Nkongsamba au carrefour de contournement vers Nlonako.',
      'Emprunter la route départementale vers Nlonako (trajet sinueux bordé de caféiers).',
      'Bifurquer à droite au panneau officiel « Chefferie Traditionnelle de Ntolo » (3,5 km avant le centre de Nlonako).'
    ],
    transportOptions: 'Véhicules particuliers, autocars de ligne Douala-Nkongsamba (gares de Bonabéri), puis mototaxi ou taxi de brousse.',
    recommendedVehicle: 'Berline praticable en toute saison, SUV ou 4x4 encore plus confortable.',
    indicativeFare: 'Autocar Douala-Nkongsamba : 2 500 à 3 500 FCFA • Moto Nkongsamba-Ntolo : 1 000 à 1 500 FCFA',
  },
  {
    id: 'nkongsamba',
    origin: 'Depuis Nkongsamba (Chef-lieu du Département du Moungo)',
    distance: 'Environ 22 km',
    estimatedTime: '35 à 45 minutes',
    roadType: 'Axe bitumé Nlonako puis piste rurale entretenue par le CODEV',
    steps: [
      'Se rendre à la Gare Routière de Nlonako (quartier Administratif / Marché de Nkongsamba).',
      'Prendre la direction des contreforts du Mont Nlonako.',
      'Après le pont sur la rivière secondaire, monter vers l’embranchement des plantations de Ntolo.',
      'Arrivée directe sur la Place des Fêtes et le Palais Royal de la Chefferie.'
    ],
    transportOptions: 'Taxis collectifs de brousse réguliers et mototaxis disponibles 7j/7 de 06h00 à 18h30.',
    recommendedVehicle: 'Tout véhicule, mototaxi ou pick-up agricole.',
    indicativeFare: 'Taxi collectif : 700 à 1 000 FCFA • Course moto directe : 1 500 FCFA',
  },
  {
    id: 'yaounde',
    origin: 'Depuis Yaoundé (Capitale Politique)',
    distance: 'Environ 350 km',
    estimatedTime: '5h30 à 6h00',
    roadType: 'RN3 (Yaoundé-Douala) ou RN4 (Yaoundé-Bafoussam-Nkongsamba)',
    steps: [
      'Option 1 (recommandée) : Yaoundé ➔ Douala (RN3 bitumée) ➔ Nkongsamba ➔ Ntolo (N5).',
      'Option 2 (panoramique des Hauts Plateaux) : Yaoundé ➔ Bafoussam ➔ Bafang ➔ descente sur le Moungo ➔ Nkongsamba ➔ Ntolo.',
      'Bifurcation au carrefour Nlonako en direction de Ntolo.'
    ],
    transportOptions: 'Agences de voyages interurbaines (VIP Yaoundé-Douala ou Yaoundé-Bafoussam), puis correspondance.',
    recommendedVehicle: 'Tout véhicule routier sur le bitume, SUV recommandé.',
    indicativeFare: 'Trajet interurbain global : ~8 000 à 12 000 FCFA par personne',
  },
  {
    id: 'melong',
    origin: 'Depuis Melong & Chutes d’Ekom Nkam',
    distance: 'Environ 38 km',
    estimatedTime: '50 minutes',
    roadType: 'Axe N5 sud via Nkongsamba ou piste de liaison écologique',
    steps: [
      'Quitter Melong vers le sud par la Route Nationale 5 en direction de Nkongsamba.',
      'Avant le centre urbain de Nkongsamba, prendre la bretelle est vers Nlonako.',
      'Suivre les panneaux indicateurs du Mont Nlonako jusqu’au village de Ntolo.'
    ],
    transportOptions: 'Véhicule de tourisme, mototaxi touristique au départ de Melong.',
    recommendedVehicle: 'Tout véhicule de tourisme.',
    indicativeFare: 'Course mototaxi : 2 000 à 2 500 FCFA',
  },
];

export const RouteGuidanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('douala');

  const selectedItinerary = ITINERARIES.find((it) => it.id === activeTab) || ITINERARIES[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-1.5">
            <Car className="w-3.5 h-3.5 text-amber-700" />
            <span>Guide d'Accès & Transports</span>
          </div>
          <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-slate-900">
            Itinéraires Pratiques pour Rejoindre le Village de Ntolo
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Détail des voies d’accès, état des pistes, types de véhicules préconisés et tarifs indicatifs des transports locaux.
          </p>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=4.9167,9.9667"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex-shrink-0"
        >
          <Navigation className="w-4 h-4 text-amber-300" />
          <span>Calculer l’itinéraire GPS</span>
        </a>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ITINERARIES.map((it) => (
          <button
            key={it.id}
            onClick={() => setActiveTab(it.id)}
            className={`p-3 rounded-2xl text-left border transition-all ${
              activeTab === it.id
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-xs font-bold truncate">
              {it.origin.replace('Depuis ', '')}
            </div>
            <div className={`text-[11px] mt-0.5 ${activeTab === it.id ? 'text-emerald-200' : 'text-slate-500'}`}>
              {it.distance} • {it.estimatedTime}
            </div>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
        {/* Key figures bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Compass className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Distance</span>
              <span className="text-xs font-bold text-slate-800">{selectedItinerary.distance}</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Durée estimée</span>
              <span className="text-xs font-bold text-slate-800">{selectedItinerary.estimatedTime}</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Car className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Véhicule conseillé</span>
              <span className="text-xs font-bold text-slate-800">{selectedItinerary.recommendedVehicle}</span>
            </div>
          </div>
        </div>

        {/* Steps roadmap */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-emerald-700" />
            <span>Étapes de la feuille de route :</span>
          </h4>
          <div className="space-y-2">
            {selectedItinerary.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transports & Tarifs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Bus className="w-3.5 h-3.5 text-blue-700" />
              <span>Transports en commun & Motos :</span>
            </div>
            <p className="text-slate-600">{selectedItinerary.transportOptions}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Fuel className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tarifs indicatifs (en FCFA) :</span>
            </div>
            <p className="text-slate-600">{selectedItinerary.indicativeFare}</p>
          </div>
        </div>
      </div>

      {/* Seasonal Advice Alert */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Recommandation selon les saisons du Moungo :</span>
          <p className="text-slate-700">
            • <strong>En saison sèche (Novembre à Mars) :</strong> Voies dégagées et facilement praticables par tout véhicule léger.<br />
            • <strong>En grande saison des pluies (Juillet à Octobre) :</strong> Prudence sur les derniers kilomètres de terre battue. Privilégiez les mototaxis ou les véhicules avec garde au sol rehaussée.
          </p>
        </div>
      </div>
    </div>
  );
};
