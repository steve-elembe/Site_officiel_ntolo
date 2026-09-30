import React from 'react';
import { BookOpen, Landmark, Calendar, ShieldCheck, ScrollText, Users, ArrowRight, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';
import { usePageContent } from '../hooks/usePageContent';

interface HistoireViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_HISTOIRE: OfficialSourceItem[] = [
  {
    title: 'Témoignages du Conseil des Sages et Patriarches de Ntolo',
    reference: 'Tradition orale recueillie par le Comité de Développement',
    type: 'Récit Mémoriel Coutumier',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie de Ntolo',
  },
  {
    title: 'Archives préfectorales du Moungo sur les chefferies du canton',
    reference: '[À compléter : Cote d’archive / Référence préfectorale]',
    type: 'Archives Administratives Coloniales et Post-Indépendance',
    status: 'À compléter',
    locationOrAccess: 'Archives de Nkongsamba / Archives Nationales de Yaoundé',
  },
  {
    title: 'Études ethnographiques sur le peuplement du bassin de Nlonako',
    reference: 'Recherches universitaires et monographies régionales [À compléter]',
    type: 'Travaux Scientifiques',
    status: 'En cours de collationnement',
    locationOrAccess: 'Département d’Histoire, Universités camerounaises',
  },
];

export const HistoireView: React.FC<HistoireViewProps> = ({ onNavigate }) => {
  const content = usePageContent('histoire');

  const originesSection = content.sections.find((s) => s.id === 'origines') || content.sections[0];
  const chronologieSection = content.sections.find((s) => s.id === 'chronologie') || content.sections[1];
  const ligneeSection = content.sections.find((s) => s.id === 'lignee-dynastique') || content.sections[2];

  // Any extra sections created dynamically by administrators
  const customSections = content.sections.filter(
    (s) => s.id !== originesSection?.id && s.id !== chronologieSection?.id && s.id !== ligneeSection?.id
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge={content.badge || 'Portail Officiel • Section 02'}
        title={content.title || 'Histoire & Mémoire du Village de Ntolo'}
        description={content.description || 'Aux origines de la communauté : récits fondateurs, dynamiques de peuplement au pied du Mont Nlonako et jalons historiques documentés.'}
        icon={BookOpen}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText={content.provisionalNotice || 'L\'histoire de Ntolo repose sur une tradition orale vivante et des archives en cours de numérisation. Aucune généalogie ou date non formellement attestée n\'est inventée. Les éléments en attente de validation portent la mention [À compléter].'}
      />

      {/* Récit des Origines Fondatrices */}
      {originesSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-emerald-800" />
              <span>{originesSection.title}</span>
            </h2>
            {originesSection.isProvisional && (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                À compléter
              </span>
            )}
          </div>
          <div className="text-sm text-slate-700 space-y-3 leading-relaxed whitespace-pre-line">
            <p>{originesSection.content}</p>

            {originesSection.bullets && originesSection.bullets.length > 0 && (
              <ul className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                {originesSection.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Tableau Chronologique des Grandes Périodes */}
      {chronologieSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-800" />
              <span>{chronologieSection.title}</span>
            </h2>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Repères Chronologiques
            </span>
          </div>

          {chronologieSection.content && (
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {chronologieSection.content}
            </p>
          )}

          {chronologieSection.bullets && chronologieSection.bullets.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
                  <tr>
                    <th className="px-4 py-3 w-40">Période</th>
                    <th className="px-4 py-3">Événement & Transformation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {chronologieSection.bullets.map((bullet, idx) => {
                    const parts = bullet.split(':');
                    const period = parts[0]?.trim() || `Étape ${idx + 1}`;
                    const details = parts.slice(1).join(':').trim() || bullet;

                    return (
                      <tr key={idx} className="hover:bg-stone-50/70">
                        <td className="px-4 py-3 font-bold text-emerald-950">{period}</td>
                        <td className="px-4 py-3 text-slate-700">{details}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Lignée de la Chefferie & Succession Coutumière */}
      {ligneeSection && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-800" />
              <span>{ligneeSection.title}</span>
            </h2>
            {ligneeSection.isProvisional && (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                À compléter
              </span>
            )}
          </div>

          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {ligneeSection.content}
          </p>

          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3">Ordre Dynastique</th>
                  <th className="px-4 py-3">Nom du Chef Traditionnel</th>
                  <th className="px-4 py-3">Période de Règne</th>
                  <th className="px-4 py-3">Faits Notables & Héritage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/70">
                  <td className="px-4 py-3 font-bold text-slate-800">1er Chef mémorial</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">[À compléter : Nom du Chef fondateur]</td>
                  <td className="px-4 py-3 text-slate-600">[À compléter : Années de règne]</td>
                  <td className="px-4 py-3 text-slate-600">Fondation du village et sacralisation des lieux rituels [À compléter]</td>
                </tr>
                <tr className="hover:bg-stone-50/70">
                  <td className="px-4 py-3 font-bold text-slate-800">Chefs intermédiaires</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">[À compléter : Liste certifiée par les Notables]</td>
                  <td className="px-4 py-3 text-slate-600">[À compléter : Périodes successives]</td>
                  <td className="px-4 py-3 text-slate-600">Stabilisation des limites et des alliances coutumières [À compléter]</td>
                </tr>
                <tr className="hover:bg-emerald-50/50 bg-emerald-50/30">
                  <td className="px-4 py-3 font-bold text-emerald-900">Règne Actuel</td>
                  <td className="px-4 py-3 font-extrabold text-emerald-950">{VILLAGE_INFO.chiefTitle}</td>
                  <td className="px-4 py-3 text-emerald-900 font-semibold">[À compléter : Date d'intronisation et homologation]</td>
                  <td className="px-4 py-3 text-emerald-950 font-medium">Conduite des chantiers modernes, rassemblement de la diaspora et préservation culturelle</td>
                </tr>
              </tbody>
            </table>
          </div>

          {ligneeSection.bullets && ligneeSection.bullets.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
              <strong className="block font-bold">Notes coutumières complémentaires :</strong>
              <ul className="list-disc list-inside space-y-1">
                {ligneeSection.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
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
        sources={SOURCES_HISTOIRE}
        themeTitle="l'histoire et la succession coutumière de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
