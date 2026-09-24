/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin, Compass, Navigation, ZoomIn, ZoomOut, RotateCcw,
  Landmark, HeartPulse, GraduationCap, Mountain, Droplets,
  ExternalLink, Layers, CheckCircle2, Info
} from 'lucide-react';

export interface VillagePOI {
  id: string;
  name: string;
  category: 'coutumier' | 'sante-social' | 'nature-tourisme' | 'infrastructure';
  categoryLabel: string;
  coords: { x: number; y: number }; // SVG coords
  gps: string;
  altitude: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  routeHint: string;
}

const VILLAGE_POIS: VillagePOI[] = [
  {
    id: 'chefferie',
    name: 'Chefferie Traditionnelle & Palais Royal',
    category: 'coutumier',
    categoryLabel: 'Pouvoir Coutumier',
    coords: { x: 500, y: 440 },
    gps: '4°55\'00.1" N, 9°58\'00.2" E',
    altitude: '640 m',
    description: 'Siège de Sa Majesté le Chef de 3e degré, cour royale des Notables, salle d’audiences coutumières et archives du village.',
    icon: Landmark,
    color: 'text-amber-700',
    bgColor: 'bg-amber-100 border-amber-300',
    routeHint: 'Au centre du village, face à la place des fêtes.',
  },
  {
    id: 'marche',
    name: 'Place du Marché Coutumier & Gare Moto',
    category: 'sante-social',
    categoryLabel: 'Commerce & Transports',
    coords: { x: 440, y: 460 },
    gps: '4°54\'58.4" N, 9°57\'55.8" E',
    altitude: '635 m',
    description: 'Cœur économique hebdomadaire : vivres frais, banane plantain, étals d’artisanat et stationnement des mototaxis de Nlonako.',
    icon: Landmark,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100 border-emerald-300',
    routeHint: 'À 150 mètres à l’ouest du Palais Royal.',
  },
  {
    id: 'ecole',
    name: 'École Publique de Ntolo',
    category: 'sante-social',
    categoryLabel: 'Éducation',
    coords: { x: 580, y: 410 },
    gps: '4°55\'05.2" N, 9°58\'12.0" E',
    altitude: '648 m',
    description: 'Établissement primaire du village comprenant 6 salles de classe, bloc administratif et plateau de jeux sportifs scolaires.',
    icon: GraduationCap,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100 border-blue-300',
    routeHint: 'Accès par l’allée des Bambous, secteur Ntolo-Est.',
  },
  {
    id: 'csi',
    name: 'Centre de Santé Intégré (CSI) de Ntolo',
    category: 'sante-social',
    categoryLabel: 'Santé & Urgences',
    coords: { x: 530, y: 510 },
    gps: '4°54\'50.7" N, 9°58\'04.3" E',
    altitude: '632 m',
    description: 'Soins infirmiers de premier secours, maternité rurale, dispensaire et consultations médicales périodiques du district.',
    icon: HeartPulse,
    color: 'text-rose-700',
    bgColor: 'bg-rose-100 border-rose-300',
    routeHint: 'Près du forage communautaire sud.',
  },
  {
    id: 'forage',
    name: 'Château d’Eau Solaire & Forage d’Adduction',
    category: 'infrastructure',
    categoryLabel: 'Eau Potable',
    coords: { x: 490, y: 380 },
    gps: '4°55\'10.0" N, 9°57\'58.0" E',
    altitude: '665 m',
    description: 'Station de pompage solaire et réservoirs d’adduction distribuant l’eau potable aux bornes-fontaines des quartiers.',
    icon: Droplets,
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100 border-cyan-300',
    routeHint: 'Sur les hauteurs au nord de la chefferie.',
  },
  {
    id: 'nlonako-base',
    name: 'Départ du Sentier du Mont Nlonako',
    category: 'nature-tourisme',
    categoryLabel: 'Écotourisme',
    coords: { x: 670, y: 280 },
    gps: '4°55\'45.0" N, 9°58\'50.0" E',
    altitude: '780 m',
    description: 'Point de ralliement des expéditions guidées vers le pic volcanique (1 825 m), cascades et observation de la biodiversité.',
    icon: Mountain,
    color: 'text-emerald-800',
    bgColor: 'bg-emerald-100 border-emerald-300',
    routeHint: 'Piste rurale montante au nord-est de Ntolo.',
  },
  {
    id: 'foyer',
    name: 'Foyer Communautaire & Salle Polyvalente CODEV',
    category: 'coutumier',
    categoryLabel: 'Vie Communautaire',
    coords: { x: 420, y: 390 },
    gps: '4°55\'08.2" N, 9°57\'48.1" E',
    altitude: '642 m',
    description: 'Lieu des assemblées générales du village, réunions associatives, célébrations et formations agricoles.',
    icon: Landmark,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100 border-purple-300',
    routeHint: 'Secteur Ntolo-Nord.',
  },
  {
    id: 'carrefour-entree',
    name: 'Embranchement Axe Nkongsamba - Nlonako',
    category: 'infrastructure',
    categoryLabel: 'Voie d’Accès',
    coords: { x: 260, y: 620 },
    gps: '4°54\'15.0" N, 9°56\'40.0" E',
    altitude: '610 m',
    description: 'Carrefour principal de bifurcation vers le village depuis la route départementale Nlonako - Nkongsamba.',
    icon: Navigation,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100 border-slate-300',
    routeHint: 'À 2,8 km du centre du village par voie carrossable.',
  },
];

export const InteractiveVillageMap: React.FC = () => {
  const [selectedPoi, setSelectedPoi] = useState<VillagePOI>(VILLAGE_POIS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'relief' | 'plan'>('relief');

  const filteredPois = filterCategory === 'all'
    ? VILLAGE_POIS
    : VILLAGE_POIS.filter((p) => p.category === filterCategory);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Map Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-1">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Repérage Cartographique Interactif</span>
          </div>
          <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-slate-900">
            Carte Officielle du Village de Ntolo & Sites Remarquables
          </h3>
          <p className="text-xs text-slate-500">
            Coordonnées GPS : 4.9167° N, 9.9667° E • Altitude moyenne : 640 m • Flanc sud du Mont Nlonako
          </p>
        </div>

        {/* View Mode & Map Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer toggle */}
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold">
            <button
              onClick={() => setViewMode('relief')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'relief' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Relief & Terroir
            </button>
            <button
              onClick={() => setViewMode('plan')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${viewMode === 'plan' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Schéma Routier
            </button>
          </div>

          {/* Zoom controls */}
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              onClick={handleZoomIn}
              title="Agrandir"
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Réduire"
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Réinitialiser le zoom"
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* External links */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=4.9167,9.9667"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span>Google Maps</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
        <span className="font-bold text-slate-400 mr-1 flex-shrink-0">Filtrer :</span>
        {[
          { id: 'all', label: 'Tous les repères' },
          { id: 'coutumier', label: 'Coutumier & Administration' },
          { id: 'sante-social', label: 'Santé, Écoles & Commerce' },
          { id: 'nature-tourisme', label: 'Mont Nlonako & Rando' },
          { id: 'infrastructure', label: 'Voies & Eau Potable' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              filterCategory === tab.id
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Map Canvas + POI Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Interactive Vector Map SVG Canvas */}
        <div className="lg:col-span-2 relative bg-stone-900 overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none">
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 1000 700"
              className="w-full h-full max-h-[500px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Relief Gradients */}
                <linearGradient id="forestTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#064e3b" />
                  <stop offset="50%" stop-color="#065f46" />
                  <stop offset="100%" stop-color="#047857" />
                </linearGradient>

                <linearGradient id="mountainMassif" x1="0%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stop-color="#047857" />
                  <stop offset="60%" stop-color="#1e3a2f" />
                  <stop offset="100%" stop-color="#3f3f46" />
                </linearGradient>

                <radialGradient id="villageCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
                </radialGradient>
              </defs>

              {/* Base terrain */}
              <rect width="1000" height="700" fill={viewMode === 'relief' ? 'url(#forestTerrain)' : '#1c1917'} />

              {/* Topographic Elevation Curves (Mont Nlonako Massif) */}
              {viewMode === 'relief' && (
                <g opacity="0.35" stroke="#a7f3d0" strokeWidth="1" fill="none">
                  <path d="M400 100 Q650 60 900 150 Q950 350 800 450 Q600 380 400 100 Z" strokeWidth="2" fill="url(#mountainMassif)" />
                  <path d="M500 130 Q700 90 850 180 Q880 300 750 360 Q600 300 500 130 Z" />
                  <path d="M600 150 Q750 120 820 200 Q830 260 720 290 Q650 250 600 150 Z" />
                  <path d="M680 170 Q770 150 800 210 Q780 240 700 240 Z" fill="#52525b" opacity="0.5" />
                  <text x="760" y="190" fill="#fef08a" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                    ▲ Pic Mont Nlonako (1825 m)
                  </text>
                </g>
              )}

              {/* River and Water Catchment */}
              <g stroke="#38bdf8" fill="none" opacity="0.8">
                <path d="M720 220 Q650 320 540 460 Q450 540 380 680" strokeWidth="4" strokeLinecap="round" />
                <path d="M850 320 Q700 420 540 460" strokeWidth="2.5" strokeDasharray="4 2" />
                <text x="400" y="650" fill="#7dd3fc" fontSize="11" fontFamily="sans-serif">
                  Cours d’eau vers bassin du Moungo
                </text>
              </g>

              {/* Village Agricultural & Canopy Area */}
              <circle cx="500" cy="440" r="160" fill="url(#villageCenterGlow)" />

              {/* Secondary agricultural paths */}
              <g stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" fill="none" opacity="0.6">
                <path d="M260 620 Q350 540 440 460" />
                <path d="M440 460 L500 440 L580 410 L670 280" />
                <path d="M500 440 L490 380 L420 390" />
                <path d="M500 440 L530 510" />
              </g>

              {/* Main Access Road (Axe Nlonako / Nkongsamba) */}
              <g stroke="#e2e8f0" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M80 680 Q180 650 260 620 Q380 560 440 460 Q480 450 500 440" />
                {/* Road center dash */}
                <path d="M80 680 Q180 650 260 620 Q380 560 440 460 Q480 450 500 440" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 6" />
              </g>

              {/* Road labels */}
              <text x="110" y="660" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                Axe routier vers Nkongsamba / Nlonako
              </text>

              {/* Village Quarters Labels */}
              <text x="470" y="470" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                Ntolo-Centre
              </text>
              <text x="590" y="440" fill="#93c5fd" fontSize="11" fontFamily="sans-serif">
                Quartier Est
              </text>
              <text x="400" y="370" fill="#d8b4fe" fontSize="11" fontFamily="sans-serif">
                Quartier Nord
              </text>

              {/* Compass Rose */}
              <g transform="translate(80, 80)">
                <circle cx="0" cy="0" r="30" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" opacity="0.85" />
                <polygon points="0,-22 6,-6 0,-2 -6,-6" fill="#ef4444" />
                <polygon points="0,22 6,6 0,2 -6,6" fill="#cbd5e1" />
                <text x="0" y="-8" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">N</text>
                <text x="0" y="15" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
                <text x="15" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">E</text>
                <text x="-15" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">O</text>
              </g>

              {/* POI Markers */}
              {filteredPois.map((poi) => {
                const isSelected = selectedPoi.id === poi.id;
                return (
                  <g
                    key={poi.id}
                    transform={`translate(${poi.coords.x}, ${poi.coords.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedPoi(poi)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="22" fill="#fbbf24" opacity="0.4" className="animate-ping" />
                    )}

                    {/* Outer marker pin */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 16 : 13}
                      fill={isSelected ? '#fbbf24' : '#ffffff'}
                      stroke={isSelected ? '#78350f' : '#0f172a'}
                      strokeWidth={isSelected ? 3 : 2}
                      className="shadow-lg"
                    />

                    {/* Small inner dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#78350f' : '#047857'}
                    />

                    {/* Label tag above marker */}
                    <rect
                      x="-60"
                      y="-32"
                      width="120"
                      height="18"
                      rx="9"
                      fill={isSelected ? '#1e293b' : '#0f172ab3'}
                      stroke={isSelected ? '#fbbf24' : '#ffffff33'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-20"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {poi.name.length > 20 ? poi.name.slice(0, 19) + '…' : poi.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Map Legend Badge */}
          <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-stone-700 text-white text-[11px] flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Point sélectionné</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>Sites d'intérêt</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-sky-400"></span>
              <span>Hydrographie</span>
            </span>
          </div>
        </div>

        {/* Selected POI Inspector Panel (Right 1 Col) */}
        <div className="p-5 sm:p-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${selectedPoi.bgColor} ${selectedPoi.color}`}>
                <selectedPoi.icon className="w-3.5 h-3.5" />
                <span>{selectedPoi.categoryLabel}</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Alt. {selectedPoi.altitude}
              </span>
            </div>

            <div>
              <h4 className="font-serif-royal text-xl font-bold text-slate-900 leading-snug">
                {selectedPoi.name}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedPoi.description}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  Coordonnées GPS :
                </span>
                <span className="font-mono text-slate-800 font-semibold">{selectedPoi.gps}</span>
              </div>
              <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-slate-200">
                <span className="font-bold text-slate-600 flex items-center gap-1 flex-shrink-0">
                  <Navigation className="w-3.5 h-3.5 text-blue-700" />
                  Repère d'accès :
                </span>
                <span className="text-slate-600 text-right">{selectedPoi.routeHint}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=4.9167,9.9667`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Itinéraire vers ce point</span>
            </a>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              <span>Cliquez sur un marqueur de la carte pour afficher sa fiche</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
