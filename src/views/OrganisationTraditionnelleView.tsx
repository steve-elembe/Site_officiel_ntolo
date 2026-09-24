import React from 'react';
import { Crown, Landmark, Shield, Scale, ScrollText, Users, Award, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface OrganisationTraditionnelleViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_TRADITIONNELLE: OfficialSourceItem[] = [
  {
    title: 'Décret N° 77/245 du 15 juillet 1977 portant organisation des chefferies traditionnelles au Cameroun',
    reference: 'Présidence de la République du Cameroun / Journal Officiel',
    type: 'Cadre Légal National',
    status: 'Homologué',
    locationOrAccess: 'Archives du MINAT / Sous-Préfecture de Nlonako',
  },
  {
    title: 'Arrêté d’homologation de désignation du Chef traditionnel de 3e degré de Ntolo',
    reference: '[À compléter : Arrêté préfectoral / Ministériel]',
    type: 'Acte d’Homologation Officiel',
    status: 'En cours de collationnement',
    locationOrAccess: 'Préfecture de Nkongsamba / Palais de Ntolo',
  },
  {
    title: 'Code coutumier et règles orales de succession de la Chefferie de Ntolo',
    reference: 'Conseil des Sages et Notables Dépositaires',
    type: 'Droit Coutumier',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie',
  },
];

export const OrganisationTraditionnelleView: React.FC<OrganisationTraditionnelleViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 05"
        title="Organisation Traditionnelle & Pouvoir Coutumier"
        description="Chefferie de 3e degré, Conseil des Notables, justice coutumière, confréries patrimoniales et protocole séculaire du village de Ntolo."
        icon={Crown}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="L'organisation traditionnelle de Ntolo est régie par le Décret N° 77/245 et les coutumes séculaires du terroir. Les noms des dignitaires et les attributions spécifiques des collèges de notables en cours de mise à jour portent la mention [À compléter]."
      />

      {/* 1. La Chefferie Traditionnelle de 3e Degré */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" />
            <span>1. Statut Coutumier & Rôle de Sa Majesté</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Chefferie de 3e Degré
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-900 flex items-center justify-center text-amber-300 shadow-md border-2 border-amber-400">
              <Crown className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-serif-royal font-bold text-slate-900 text-base">
                {VILLAGE_INFO.chiefTitle}
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                Chef Traditionnel de Ntolo
              </p>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Homologation légale : [À compléter : Référence officielle]
            </p>
          </div>

          <div className="md:col-span-8 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Aux termes de la législation camerounaise, le Chef traditionnel de Ntolo est à la fois l'incarnation de l'autorité ancestrale auprès des siens et un auxiliaire de l'administration préfectorale et sous-préfectorale.
            </p>
            <p>
              Ses prérogatives coutumières et légales comprennent :
            </p>
            <ul className="space-y-1.5 pl-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span><strong>Préservation de l'harmonie sociale :</strong> conciliation des litiges fonciers, familiaux et de voisinage selon les us et coutumes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span><strong>Garde du patrimoine sacré :</strong> protection des forêts sacrées, des sanctuaires du Mont Nlonako et des reliques ancestrales.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span><strong>Représentation officielle :</strong> porte-parole du village auprès du Sous-Préfet de Nlonako, du Préfet du Moungo et des institutions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Le Conseil des Notables & Dignitaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-800" />
            <span>2. Le Conseil des Notables & les Dignitaires du Palais</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Collège Coutumier
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Le Chef traditionnel gouverne assisté d'un collège de notables représentant les grandes lignées fondatrices de Ntolo.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Charge Coutumière</th>
                <th className="px-4 py-3">Titulaire / Représentant</th>
                <th className="px-4 py-3">Rôle & Prérogatives Traditionnelles</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Premier Notable / Doyen des Sages</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom du Doyen]</td>
                <td className="px-4 py-3 text-slate-600">Présidence du Conseil des Sages en l'absence du Chef, conseiller premier</td>
                <td className="px-4 py-3 text-emerald-700 font-semibold">Confirmé</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Gardien des Rites & Forêts Sacrées</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom de l'initié]</td>
                <td className="px-4 py-3 text-slate-600">Supervision des libations, bénédictions de début de récolte et sanctuaires</td>
                <td className="px-4 py-3 text-amber-700 font-semibold">[À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Porte-Parole Coutumier</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom du Notable]</td>
                <td className="px-4 py-3 text-slate-600">Transmission solennelle des proclamations royales sous l'arbre à palabres</td>
                <td className="px-4 py-3 text-amber-700 font-semibold">[À compléter]</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Représentante des Femmes (Reine-Mère / Notabilité Féminine)</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">[À compléter : Nom de la Notabilité]</td>
                <td className="px-4 py-3 text-slate-600">Voix consultative des mères, protection de la famille et des rites de maternité</td>
                <td className="px-4 py-3 text-amber-700 font-semibold">[À compléter]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Justice Coutumière & Arbre à Palabres */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Scale className="w-5 h-5 text-emerald-800" />
          <span>3. Arbitrage Coutumier & Arbre à Palabres</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Principe de Conciliation</h4>
            <p className="text-slate-600 leading-relaxed">
              La justice coutumière à Ntolo ne vise pas la punition vindicative mais la réconciliation des cœurs et la réparation du préjudice. L'arbre à palabres reste le lieu de parole libre sous l'autorité bienveillante des juges traditionnels.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Articulation avec la Loi Républicaine</h4>
            <p className="text-slate-600 leading-relaxed">
              Les matières relevant du droit civil traditionnel (fiançailles coutumières, litiges de mitoyenneté de champs) sont traitées à l'amiable. Les infractions pénales sont immédiatement transmises aux brigades de gendarmerie et tribunaux de Nkongsamba.
            </p>
          </div>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_TRADITIONNELLE}
        themeTitle="l'organisation coutumière et la chefferie de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
