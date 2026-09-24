import React from 'react';
import { Building2, Shield, Landmark, Scale, FileText, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface OrganisationAdministrativeViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_ADMINISTRATIVE: OfficialSourceItem[] = [
  {
    title: 'Loi N° 2019/024 du 24 décembre 2019 portant Code Général des Collectivités Territoriales Décentralisées',
    reference: 'Assemblée Nationale du Cameroun / Présidence de la République',
    type: 'Loi Républicaine',
    status: 'Homologué',
    locationOrAccess: 'Journal Officiel de la République du Cameroun',
  },
  {
    title: 'Décret N° 2008/376 du 12 novembre 2008 portant organisation administrative de la République du Cameroun',
    reference: 'Présidence de la République du Cameroun',
    type: 'Décret Républicain',
    status: 'Homologué',
    locationOrAccess: 'MINAT / Préfecture du Moungo',
  },
  {
    title: 'Récépissé de déclaration d’association du Comité de Développement de Ntolo (CODEV)',
    reference: 'Préfecture du Moungo (Nkongsamba) [À compléter : Numéro de récépissé]',
    type: 'Acte Administratif de Reconnaissance Légale',
    status: 'En cours de collationnement',
    locationOrAccess: 'Secrétariat du CODEV / Préfecture de Nkongsamba',
  },
];

export const OrganisationAdministrativeView: React.FC<OrganisationAdministrativeViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 06"
        title="Organisation Administrative & Tutelle Républicaine"
        description="Tutelle de l'État camerounais, chaîne de commandement territorial, Commune de Nlonako, services publics et Comité de Développement (CODEV)."
        icon={Building2}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Toutes les compétences administratives mentionnées sont strictement adossées aux lois de la République du Cameroun. Les références d'actes en cours d'enregistrement auprès de la Sous-Préfecture portent la mention [À compléter]."
      />

      {/* 1. Chaîne Administrative Territoriale */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-800" />
            <span>1. Chaîne Institutionnelle de Tutelle de l'État</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Cadre Républicain
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Le village de Ntolo s'insère harmonieusement dans l'armature administrative territoriale de la République du Cameroun sous l'autorité du Ministère de l'Administration Territoriale (MINAT).
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Échelon Administratif</th>
                <th className="px-4 py-3">Siège / Chef-Lieu</th>
                <th className="px-4 py-3">Autorité Tutélaire</th>
                <th className="px-4 py-3">Compétences à l'Égard de Ntolo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Région du Littoral</td>
                <td className="px-4 py-3 text-slate-700">Douala</td>
                <td className="px-4 py-3 text-slate-700">Monsieur le Gouverneur de Région</td>
                <td className="px-4 py-3 text-slate-600">Coordination régionale, ordre public et grands axes</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Département du Moungo</td>
                <td className="px-4 py-3 text-slate-700">Nkongsamba</td>
                <td className="px-4 py-3 text-slate-700">Monsieur le Préfet du Moungo</td>
                <td className="px-4 py-3 text-slate-600">Tutelle directe, homologation des chefferies et sécurité</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Arrondissement de Nlonako</td>
                <td className="px-4 py-3 text-slate-700">Nlonako Centre</td>
                <td className="px-4 py-3 text-slate-700">Monsieur le Sous-Préfet de Nlonako</td>
                <td className="px-4 py-3 text-slate-600">Autorité administrative de proximité immédiate</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Commune de Nlonako</td>
                <td className="px-4 py-3 text-slate-700">Hôtel de Ville de Nlonako</td>
                <td className="px-4 py-3 text-slate-700">Monsieur le Maire de la Commune</td>
                <td className="px-4 py-3 text-slate-600">Décentralisation, voirie rurale, état civil et écoles</td>
              </tr>
              <tr className="hover:bg-emerald-50/60 bg-emerald-50/30">
                <td className="px-4 py-3 font-bold text-emerald-950">Chefferie de 3e Degré de Ntolo</td>
                <td className="px-4 py-3 text-emerald-950 font-medium">Palais Royal de Ntolo</td>
                <td className="px-4 py-3 text-emerald-950 font-bold">{VILLAGE_INFO.chiefTitle}</td>
                <td className="px-4 py-3 text-emerald-900">Auxiliaire d'administration et autorité coutumière locale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Le Comité de Développement de Ntolo (CODEV) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-800" />
            <span>2. Le Comité de Développement de Ntolo (CODEV)</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Bras Exécutif du Développement
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Le Comité de Développement constitue l'organe technique, laïc et associatif chargé de concevoir, mobiliser et exécuter les chantiers d'intérêt communautaire en étroite liaison avec Sa Majesté et l'ensemble de la diaspora.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Fonction au Bureau du CODEV</th>
                <th className="px-4 py-3">Responsable Élu / Désigné</th>
                <th className="px-4 py-3">Attributions & Missions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Président du Comité</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom du Président du CODEV]</td>
                <td className="px-4 py-3 text-slate-600">Direction exécutive, représentation légale des projets et coordination</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Secrétaire Général</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom du Secrétaire Général]</td>
                <td className="px-4 py-3 text-slate-600">Administration générale, rédaction des procès-verbaux et communication</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Trésorier Général & Commissaire aux Comptes</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom du Trésorier]</td>
                <td className="px-4 py-3 text-slate-600">Gestion des souscriptions, tenue des livres comptables et transparence</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Délégués aux Antennes Régionales</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Délégués Douala, Yaoundé, Nkongsamba]</td>
                <td className="px-4 py-3 text-slate-600">Mobilisation de la diaspora et collecte des cotisations volontaires</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Services Publics & Sécurité */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Shield className="w-5 h-5 text-emerald-800" />
          <span>3. Services Publics & Sécurité de Proximité</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Ordre Public & Sécurité</h4>
            <p className="text-slate-600 leading-relaxed">
              Assuré par la <strong>Brigade de Gendarmerie de Nlonako</strong> et les services préfectoraux de Nkongsamba. Comité de vigilance villageois d'alerte pacifique.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Centre d'État Civil</h4>
            <p className="text-slate-600 leading-relaxed">
              Rattaché au <strong>Centre d'État Civil de la Mairie de Nlonako</strong>. Les déclarations de naissance et décès sont enregistrées sous contrôle de l'officier délégué.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Encadrement Agricole</h4>
            <p className="text-slate-600 leading-relaxed">
              Poste Agricole de Nlonako (Délégation d'Arrondissement du MINADER Moungo) : appui phytosanitaire et conseils aux producteurs de café et cacao.
            </p>
          </div>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_ADMINISTRATIVE}
        themeTitle="l'organisation administrative et la tutelle de l'État à Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
