import React from 'react';
import { Sparkles, Music, Utensils, Shirt, BookMarked, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface CultureViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_CULTURE: OfficialSourceItem[] = [
  {
    title: 'Inventaire du patrimoine culturel immatériel du département du Moungo',
    reference: 'Délégation Régionale des Arts et de la Culture (MINAC Littoral)',
    type: 'Inventaire Patrimonial National',
    status: 'Disponible',
    locationOrAccess: 'Délégation des Arts et de la Culture (Douala / Nkongsamba)',
  },
  {
    title: 'Recueil des danses traditionnelles et rites coutumiers du bassin de Nlonako',
    reference: 'Secrétariat Général de la Chefferie et Cercle des Sages de Ntolo',
    type: 'Registre Coutumier',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
  {
    title: 'Études d’anthropologie culturelle sur les traditions agraires du Moungo',
    reference: 'Ministère de la Recherche Scientifique et de l’Innovation (MINRESI)',
    type: 'Publication Scientifique',
    status: 'En cours de collationnement',
    locationOrAccess: 'Centre de Recherches Régionales',
  },
];

export const CultureView: React.FC<CultureViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 07"
        title="Culture, Rites & Traditions de Ntolo"
        description="Danses sacrées, célébrations agraires, art culinaire traditionnel, apparats coutumiers et valeurs éthiques transmises de génération en génération."
        icon={Sparkles}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les terminologies rituelles et les noms des confréries sacrées sont validés sous le contrôle des Notables initiés. Les désignations en cours de transcription portent la mention [À compléter]."
      />

      {/* 1. Les Grandes Fêtes & Rites Coutumiers */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <span>1. Calendrier des Rites & Célébrations Rituelles</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Cycles Traditionnels
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Cérémonie / Fête</th>
                <th className="px-4 py-3">Période / Fréquence</th>
                <th className="px-4 py-3">Signification & Déroulement</th>
                <th className="px-4 py-3">Lieu Cérémoniel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Rites de Début de Récolte & Bénédiction agraire</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Début de la grande saison des récoltes</td>
                <td className="px-4 py-3 text-slate-600">Offrande des premières cabosses de cacao et cerises de café aux aïeux pour assurer la fertilité</td>
                <td className="px-4 py-3 text-slate-600">Sanctuaire coutumier & Palais</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Grande Célébration Annuelle du Village</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Période de fin d’année (Décembre)</td>
                <td className="px-4 py-3 text-slate-600">Retrouvailles fraternelles des résidents et de la diaspora, danses patrimoniales et banquet collectif</td>
                <td className="px-4 py-3 text-slate-600">Esplanade royale de Ntolo</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Mariage Coutumier & Dot Traditionnelle</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Au gré des unions familiales</td>
                <td className="px-4 py-3 text-slate-600">Alliance scellée entre deux familles selon les étapes coutumières (Kola, vin de palme et consentement des patriarches)</td>
                <td className="px-4 py-3 text-slate-600">Concession familiale de la promise</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Obsèques Coutumières & Hommage aux Patriarches</td>
                <td className="px-4 py-3 text-slate-700 font-semibold">Lors de la disparition d’un aîné</td>
                <td className="px-4 py-3 text-slate-600">Célébration solennelle du passage vers le monde des ancêtres avec danses des sociétés coutumières</td>
                <td className="px-4 py-3 text-slate-600">Cour royale et terre ancestrale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Danses, Musiques & Instruments Coutumiers */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Music className="w-5 h-5 text-emerald-800" />
          <span>2. Danses Patrimoniales & Rythmes du Terroir</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Les Danses des Guerriers & Notables</h4>
            <p className="text-slate-600 leading-relaxed">
              [À compléter : Nom de la danse des notables / danse d'apparat royal] : exécutée lors des grandes sorties de Sa Majesté, au son du grand tambour à fente.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Les Danses Féminines de Réjouissance</h4>
            <p className="text-slate-600 leading-relaxed">
              [À compléter : Noms vernaculaires des danses des femmes] : rythmes joyeux marquant les mariages, naissances et succès scolaires des enfants de Ntolo.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Instruments de Musique Traditionnelle</h4>
            <p className="text-slate-600 leading-relaxed">
              Tam-tam parleur en bois sculpté, tambours recouverts de peau d'antilope, balafons, grelots de chevilles et cors en corne de bélier.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Gastronomie & Art Culinaire */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Utensils className="w-5 h-5 text-emerald-800" />
          <span>3. Art Culinaire & Mets Emblématiques</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Mets à Base de Tubercules & Plantain</h4>
            <p className="text-slate-600 leading-relaxed">
              Le terroir volcanique de Ntolo produit en abondance la banane-plantain, le macabo, l’igname et le manioc. Ils sont consommés pilés, braisés ou en ragoûts parfumés à l’huile de palme rouge locale.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Sauces Traditionnelles & Gibier</h4>
            <p className="text-slate-600 leading-relaxed">
              [À compléter : Dénominations des sauces traditionnelles réputées à Ntolo], accompagnées de poisson d'eau douce des rivières du Mont Nlonako et d'herbes aromatiques forestières.
            </p>
          </div>
        </div>
      </section>

      {/* Lien vers la page Langues & Patrimoine */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-emerald-950 block">Complément linguistique et mémoriel :</span>
          <p className="text-emerald-800">Découvrez le lexique vernaculaire, les proverbes et la préservation du patrimoine immatériel de Ntolo.</p>
        </div>
        <button
          onClick={() => onNavigate('langues-patrimoine')}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Langues & Patrimoine</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_CULTURE}
        themeTitle="la culture, les rites et traditions de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
