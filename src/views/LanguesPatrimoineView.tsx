import React from 'react';
import { BookOpen, Sparkles, Landmark, ScrollText, Volume2, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface LanguesPatrimoineViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_LANGUES: OfficialSourceItem[] = [
  {
    title: 'Atlas Linguistique du Cameroun (ALCAM)',
    reference: 'CERDOTOLA / DÉLÉGATION GÉNÉRALE À LA RECHERCHE SCIENTIFIQUE (DGRST)',
    type: 'Classification Linguistique Scientifique',
    status: 'Homologué',
    locationOrAccess: 'Publications scientifiques CERDOTOLA',
  },
  {
    title: 'Recueil des proverbes et contes oraux du terroir de Ntolo',
    reference: 'Secrétariat Général de la Chefferie et Commission Culturelle du CODEV',
    type: 'Corpus de Littérature Orale',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
  {
    title: 'Inventaire des sites sacrés et du patrimoine matériel coutumier',
    reference: 'Conseil des Sages et Patriarches de Ntolo',
    type: 'Registre Patrimonial Coutumier',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais de la Chefferie',
  },
];

export const LanguesPatrimoineView: React.FC<LanguesPatrimoineViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 08"
        title="Langues, Sagesses & Patrimoine de Ntolo"
        description="Expression vernaculaire, classification linguistique, lexique usuel, proverbes ancestraux et préservation du patrimoine matériel et immatériel."
        icon={BookOpen}
        onNavigateBack={() => onNavigate('culture')}
        provisionalNoticeText="La transcription phonétique et orthographique de la langue maternelle de Ntolo s'appuie sur l'Alphabet Général des Langues Camerounaises (AGLC). Les entrées lexicales en cours de collecte sont annotées [À compléter]."
      />

      {/* 1. Situation Linguistique & Classification */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Volume2 className="w-5 h-5 text-emerald-800" />
          <span>1. Situation Linguistique & Aire Culturelle</span>
        </h2>
        <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            Le terroir de Ntolo s’inscrit dans l’aire linguistique et culturelle du département du Moungo. Les familles pratiquent quotidiennement une langue maternelle locale riche en métaphores agraires et proverbes moraux.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-950 uppercase">Langue Maternelle Vernaculaire</span>
              <p className="text-xs text-slate-700 font-semibold">
                [À compléter : Dénomination précise selon l'Atlas Linguistique du Cameroun - ALCAM]
              </p>
              <p className="text-[11px] text-slate-500">
                Famille Niger-Congo, sous-groupe bantou du littoral / Grassfields.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-950 uppercase">Langues Officielles & Véhiculaires</span>
              <p className="text-xs text-slate-700 font-semibold">
                Français (langue officielle) & Pidgin-English (échanges commerciaux)
              </p>
              <p className="text-[11px] text-slate-500">
                Pratique bilingue généralisée au sein des jeunes et des commerçants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Lexique des Formules Usuelles de Salutation & Respect */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-emerald-800" />
            <span>2. Formules Usuelles & Termes de Respect Coutumier</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Lexique Pratique
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">
          Ces expressions sont utilisées pour accueillir les visiteurs, saluer Sa Majesté et manifester le respect envers les aînés.
        </p>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Sens en Français</th>
                <th className="px-4 py-3">Expression en Langue Locale de Ntolo</th>
                <th className="px-4 py-3">Contexte d'Usage & Protocole</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Salutation du matin (Bonjour)</td>
                <td className="px-4 py-3 text-emerald-950 font-semibold font-mono">[À compléter : Formule locale]</td>
                <td className="px-4 py-3 text-slate-600">Salutation matinale rituelle adressée aux chefs de famille</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Bienvenue au village</td>
                <td className="px-4 py-3 text-emerald-950 font-semibold font-mono">[À compléter : Formule d'accueil]</td>
                <td className="px-4 py-3 text-slate-600">Offrande de bienvenue prononcée par l'aîné de la concession</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Salutation solennelle au Chef (Majesté)</td>
                <td className="px-4 py-3 text-emerald-950 font-semibold font-mono">[À compléter : Titulature d'hommage royal]</td>
                <td className="px-4 py-3 text-slate-600">Prononcée en inclinant légèrement la tête devant Sa Majesté</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Remerciement / Gratitude</td>
                <td className="px-4 py-3 text-emerald-950 font-semibold font-mono">[À compléter : Mot de remerciement]</td>
                <td className="px-4 py-3 text-slate-600">Remerciement pour l'hospitalité ou un service communautaire rendu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Proverbes & Sagesses Populaires */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-800" />
          <span>3. Proverbes & Sagesses des Anciens</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Sur l'Union & la Solidarité</h4>
            <p className="italic text-amber-900 font-serif">
              « [À compléter : Proverbe en langue locale sur la force du fagot de bois ou de la terre partagée] »
            </p>
            <p className="text-slate-600">
              <strong>Traduction & Enseignement :</strong> Un seul doigt ne peut pas ramasser un grain de café à terre ; c'est l'ensemble des mains réunies qui bâtit le village.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Sur le Respect de la Terre Mère</h4>
            <p className="italic text-amber-900 font-serif">
              « [À compléter : Proverbe vernaculaire sur la protection de la forêt et des récoltes] »
            </p>
            <p className="text-slate-600">
              <strong>Traduction & Enseignement :</strong> Celui qui coupe sans replanter laisse ses petits-enfants dans la faim sous le soleil ardent.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Lieux Sacrés & Patrimoine Matériel */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Landmark className="w-5 h-5 text-emerald-800" />
          <span>4. Inventaire des Lieux de Mémoire & Sites Sacrés</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Site / Monument Coutumier</th>
                <th className="px-4 py-3">Localisation</th>
                <th className="px-4 py-3">Valeur Patrimoniale</th>
                <th className="px-4 py-3">Règles d'Accès</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Arbre à Palabres du Palais Royal</td>
                <td className="px-4 py-3 text-slate-700">Cour de la Chefferie de Ntolo</td>
                <td className="px-4 py-3 text-slate-600">Lieu séculaire de conciliation et des délibérations communautaires</td>
                <td className="px-4 py-3 text-emerald-700 font-semibold">Accès public respectueux</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Sanctuaire des Ancêtres du Mont Nlonako</td>
                <td className="px-4 py-3 text-slate-700">Pente sacrée d'altitude</td>
                <td className="px-4 py-3 text-slate-600">Lieu de recueillement et libations traditionnelles des Notables</td>
                <td className="px-4 py-3 text-amber-700 font-semibold">Accès restreint / Initiés uniquement</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Chute d'Eau Mémoire</td>
                <td className="px-4 py-3 text-slate-700">[À compléter : Ruisseau / cascade locale]</td>
                <td className="px-4 py-3 text-slate-600">Point de purification rituelle lors des initiations de jeunesse</td>
                <td className="px-4 py-3 text-slate-600">Accès encadré par les anciens</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_LANGUES}
        themeTitle="les langues vernaculaires, les proverbes et le patrimoine de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
