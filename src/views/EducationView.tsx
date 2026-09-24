import React from 'react';
import { GraduationCap, School, BookOpen, Users, AlertCircle, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface EducationViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_EDUCATION: OfficialSourceItem[] = [
  {
    title: 'Carte scolaire de l’Arrondissement de Nlonako',
    reference: 'Inspection d’Arrondissement de l’Éducation de Base de Nlonako (IAEB / MINEDUB)',
    type: 'Document Administratif Sectoriel',
    status: 'Disponible',
    locationOrAccess: 'Inspection de Nlonako / Délégation Départementale du Moungo',
  },
  {
    title: 'Arrêté de création et d’ouverture de l’École Publique de Ntolo',
    reference: 'Ministère de l’Éducation de Base (MINEDUB) [À compléter : Référence]',
    type: 'Acte Ministériel Officiel',
    status: 'En cours de collationnement',
    locationOrAccess: 'Archives MINEDUB Yaoundé / Nkongsamba',
  },
  {
    title: 'Rapport d’évaluation des besoins en infrastructures scolaires du CODEV Ntolo',
    reference: 'Commission Éducation et Jeunesse du CODEV Ntolo',
    type: 'Rapport Communautaire de Terrain',
    status: 'Disponible',
    locationOrAccess: 'Secrétariat du CODEV',
  },
];

export const EducationView: React.FC<EducationViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 09"
        title="Éducation & Scolarisation à Ntolo"
        description="Infrastructures scolaires, encadrement pédagogique, cycle primaire, continuum secondaire et priorités pour la réussite de la jeunesse."
        icon={GraduationCap}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les statistiques d'effectifs scolaires et le nombre exact de maîtres qualifiés sont réactualisés à chaque rentrée scolaire en liaison avec la direction de l'école et l'IAEB de Nlonako. Les champs en cours de pointage sont notés [À compléter]."
      />

      {/* 1. Carte des Établissements Scolaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <School className="w-5 h-5 text-emerald-800" />
            <span>1. Établissements Scolaires de Proximité</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            MINEDUB / MINESEC
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Établissement</th>
                <th className="px-4 py-3">Cycle & Niveau</th>
                <th className="px-4 py-3">Statut Administratif</th>
                <th className="px-4 py-3">Effectif Estimé & Classes</th>
                <th className="px-4 py-3">Situation Géographique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">École Publique de Ntolo</td>
                <td className="px-4 py-3 text-slate-700">Enseignement Primaire (SIL au CM2)</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    Public (État)
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  [À compléter : Effectif d'élèves] • [À compléter : Salles en dur]
                </td>
                <td className="px-4 py-3 text-slate-600">Centre du village de Ntolo</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Lycée / CES de Nlonako</td>
                <td className="px-4 py-3 text-slate-700">Enseignement Secondaire Général (6e à Tle)</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    Public (MINESEC)
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">Accueille les collégiens et lycéens de Ntolo</td>
                <td className="px-4 py-3 text-slate-600">Nlonako Centre (~[À compléter] km)</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Lycée Technique de Nlonako / Nkongsamba</td>
                <td className="px-4 py-3 text-slate-700">Enseignement Technique & Professionnel</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    Public (MINESEC)
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">Filières agricoles, artisanat et maçonnerie</td>
                <td className="px-4 py-3 text-slate-600">Bassin urbain du Moungo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. État des Lieux & Besoins Prioritaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-800" />
            <span>2. Diagnostic & Besoins Urgents pour l'École de Ntolo</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Chantier Prioritaire
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Mobilier & Tables-Bancs</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Déficit estimé à <strong>[À compléter : ~60 tables-bancs]</strong> pour permettre à chaque enfant d'étudier dans des conditions dignes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Rénovation Toitures & Peinture</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Réhabilitation du bloc principal de 3 salles de classe détérioré par les pluies torrentielles du Mont Nlonako.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Manuels & Énergie Solaire</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dotation d'une bibliothèque scolaire villageoise et kit solaire pour éclairer les séances de soutien scolaire du soir.
            </p>
          </div>
        </div>

        {/* Action / Soutien */}
        <div className="pt-2 flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <div className="text-xs">
            <span className="font-bold text-emerald-950 block">Projet en cours de souscription :</span>
            <span className="text-emerald-800">Participez au financement de la réfection de l'école primaire de Ntolo.</span>
          </div>
          <button
            onClick={() => onNavigate('projets')}
            className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-1 flex-shrink-0"
          >
            <span>Voir le projet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Soutien de la Diaspora & Bourses d'Excellence */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Users className="w-5 h-5 text-emerald-800" />
          <span>3. Initiatives Communautaires de Réussite Scolaire</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Chaque année, lors de la rentrée scolaire de septembre, les associations de ressortissants de Douala, Yaoundé et Nkongsamba mobilisent des fournitures scolaires (cahiers, stylos, trousses, cartables) distribuées aux enfants nécessiteux de Ntolo.
        </p>
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-600">
          <strong>Prix de l'Excellence de la Chefferie :</strong> Distinction annuelle récompensant les meilleurs élèves aux examens du CEP (Certificat d'Études Primaires) et du concours d'entrée en 6e.
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_EDUCATION}
        themeTitle="l'éducation et les infrastructures scolaires de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
