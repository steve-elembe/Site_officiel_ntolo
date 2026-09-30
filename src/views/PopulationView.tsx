import React from 'react';
import { Users, Home, UserCheck, ShieldCheck, FileSpreadsheet, Globe, ChevronRight, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';
import { usePageContent } from '../hooks/usePageContent';

interface PopulationViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_POPULATION: OfficialSourceItem[] = [
  {
    title: 'Recensement Général de la Population et de l’Habitat (3e RGPH) - Données Moungo / Nlonako',
    reference: 'Bureau Central des Recensements et des Études de Population (BUCREP) / INS Cameroun',
    type: 'Recensement National Officiel',
    status: 'Disponible',
    locationOrAccess: 'Publications officielles INS Cameroun',
  },
  {
    title: 'Fichier d’identification et de dénombrement des foyers de Ntolo',
    reference: 'Secrétariat Général de la Chefferie de 3e Degré de Ntolo',
    type: 'Registre Communautaire',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie de Ntolo',
  },
  {
    title: 'Registres de l’État Civil (Naissances, Mariages, Décès)',
    reference: 'Centre Secondaire d’État Civil de Ntolo / Mairie de Nlonako',
    type: 'Actes d’État Civil',
    status: 'À compléter',
    locationOrAccess: 'Mairie de Nlonako',
  },
];

export const PopulationView: React.FC<PopulationViewProps> = ({ onNavigate }) => {
  const content = usePageContent('population');

  const demoSection = content.sections.find((s) => s.id === 'demographie') || content.sections[0];
  const quartiersSection = content.sections.find((s) => s.id === 'quartiers-villages') || content.sections[1];
  const assocSection = content.sections.find((s) => s.id === 'associations-locales') || content.sections[2];

  const customSections = content.sections.filter(
    (s) => s.id !== 'demographie' && s.id !== 'quartiers-villages' && s.id !== 'associations-locales'
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge={content.badge || 'Portail Officiel • Section 04'}
        title={content.title || 'Démographie, Quartiers & Population de Ntolo'}
        description={content.description || 'Composition démographique, découpage en quartiers traditionnels, structuration communautaire et dynamique migratoire des résidents et de la diaspora.'}
        icon={Users}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText={content.provisionalNotice || 'En conformité avec les normes statistiques du BUCREP et du Ministère de l\'Administration Territoriale, aucun chiffre de population non certifié par les données officielles de recensement n\'est publié. Les données locales en cours de collecte sont indiquées [À compléter].'}
      />

      {/* 1. Cadre Démographique Officiel */}
      {demoSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-800" />
              <span>{demoSection.title}</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Norme BUCREP
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{demoSection.content}</p>

          {demoSection.bullets && demoSection.bullets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {demoSection.bullets.map((b, i) => {
                const parts = b.split(':');
                const title = parts[0]?.trim() || `Indicateur ${i + 1}`;
                const val = parts.slice(1).join(':').trim() || b;
                return (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-semibold text-slate-500 block">{title}</span>
                    <span className="text-sm font-extrabold text-slate-900 block">{val}</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 2. Quartiers & Blocs Traditionnels */}
      {quartiersSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-800" />
              <span>{quartiersSection.title}</span>
            </h2>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Découpage Coutumier
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{quartiersSection.content}</p>

          {quartiersSection.bullets && quartiersSection.bullets.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-4 py-3">Quartier / Bloc</th>
                    <th className="px-4 py-3">Spécificité Coutumière</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {quartiersSection.bullets.map((b, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70">
                      <td className="px-4 py-3 font-bold text-slate-900">{b}</td>
                      <td className="px-4 py-3 text-slate-600">Sous l'autorité du Conseil Coutumier</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* 3. Cohésion Sociale & Associations Communautaires */}
      {assocSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-800" />
              <span>{assocSection.title}</span>
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{assocSection.content}</p>

          {assocSection.bullets && assocSection.bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
              {assocSection.bullets.map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">Composante {i + 1}</span>
                  <p className="text-slate-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Sections personnalisées ajoutées par l'administration */}
      {customSections.map((sec) => (
        <section key={sec.id} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{sec.title}</span>
            </h2>
            {sec.isProvisional && (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                À compléter
              </span>
            )}
          </div>
          {sec.subtitle && (
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">{sec.subtitle}</p>
          )}
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{sec.content}</p>
          {sec.bullets && sec.bullets.length > 0 && (
            <ul className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {sec.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_POPULATION}
        themeTitle="la population, la démographie et les quartiers de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
