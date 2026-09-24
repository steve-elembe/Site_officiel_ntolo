import React from 'react';
import { Crown, Landmark, Shield, Users, Award, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';

interface ChefferieViewProps {
  onNavigate: (page: PageId) => void;
}

export const ChefferieView: React.FC<ChefferieViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-3">
          <Crown className="w-3.5 h-3.5 text-emerald-800" />
          <span>Section 04 • Institutions Coutumières</span>
        </div>
        <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Chefferie et Gouvernance Locale
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Organisation coutumière, autorité traditionnelle, conseil des notables et comité de développement de Ntolo.
        </p>
      </div>

      {/* Chieftaincy Presentation Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-emerald-900 via-emerald-800 to-amber-700 flex items-center justify-center text-amber-300 border-4 border-amber-400 shadow-md flex-shrink-0">
            <Crown className="w-14 h-14" />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full">
              Chefferie Traditionnelle de 3e Degré
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-slate-900">
              {VILLAGE_INFO.chiefTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Auxiliaire de l'Administration Publique Camerounaise • Gardien du Temple Sacré de Ntolo
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-600">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md font-mono text-amber-800 font-semibold">
                Arrêté préfectoral : [À compléter]
              </span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md font-mono text-amber-800 font-semibold">
                Date d’intronisation : [À compléter]
              </span>
            </div>
          </div>
        </div>

        {/* Roles of the Traditional Chief */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide text-emerald-900">
            Attributions Républicaines & Coutumières du Chef de Village :
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Conformément aux dispositions du <strong>Décret présidentiel N° 77/245 du 15 juillet 1977</strong> portant organisation des chefferies traditionnelles au Cameroun :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span>Transmission des directives de l'autorité administrative (Sous-Préfet de Nlonako).</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span>Maintien de la paix sociale, conciliation et arbitrage coutumier des différends.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span>Aide au recouvrement de l'impôt et participation aux opérations d'état civil.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <span>Préservation des terres sacrées, de la forêt coutumière et du patrimoine moral.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Council of Notables and Elders */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Users className="w-5 h-5 text-emerald-800" />
          <span>Le Conseil des Notables & des Sages</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Le Conseil des Notables entoure Sa Majesté. Il est constitué des patriarches dépositaires de la mémoire des différents lignages et quartiers de Ntolo.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Composition officielle du Conseil coutumier :
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Premier Notable</span>
              <span className="text-amber-800 font-mono text-[11px]">[À compléter : Nom]</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Notable Chargé des Rites</span>
              <span className="text-amber-800 font-mono text-[11px]">[À compléter : Nom]</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Notable Porte-Parole</span>
              <span className="text-amber-800 font-mono text-[11px]">[À compléter : Nom]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comité de Développement de Ntolo (CODEV) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-emerald-800" />
            <h2 className="text-xl font-bold text-slate-900">
              Le Comité de Développement du Village de Ntolo
            </h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
            Organe Exécutif Communautaire
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Le Comité de Développement rassemble les résidents locaux, les élites extérieures et les représentants de la diaspora pour planifier, financer et exécuter les chantiers de progrès du village.
        </p>

        {/* Executive Board Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold block">Président du Comité</span>
            <span className="text-sm font-bold text-slate-800">[À compléter : Nom]</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold block">Secrétaire Général</span>
            <span className="text-sm font-bold text-slate-800">[À compléter : Nom]</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold block">Trésorier Général</span>
            <span className="text-sm font-bold text-slate-800">[À compléter : Nom]</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold block">Commissaire aux Comptes</span>
            <span className="text-sm font-bold text-slate-800">[À compléter : Nom]</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => onNavigate('documents')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>Consulter les statuts officiels du Comité</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Administrative Hierarchy */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
          Tutelle Républicaine & Autorités Partenaires
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Le village de Ntolo œuvre en étroite symbiose avec les institutions de la République du Cameroun :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-amber-400 font-semibold block">Sous-Préfecture de Nlonako</span>
            <span className="text-slate-300">Tutelle administrative directe</span>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-amber-400 font-semibold block">Mairie de Nlonako</span>
            <span className="text-slate-300">Développement communal & État civil</span>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-amber-400 font-semibold block">Préfecture du Moungo</span>
            <span className="text-slate-300">Siège départemental à Nkongsamba</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('histoire')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← 3. Histoire
        </button>
        <button
          onClick={() => onNavigate('population')}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
        >
          5. Population & Quartiers →
        </button>
      </div>
    </div>
  );
};
