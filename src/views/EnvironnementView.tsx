import React from 'react';
import { Trees, Mountain, ShieldCheck, Droplets, Leaf, Bird, AlertCircle, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { InstitutionalPageHeader } from '../components/InstitutionalPageHeader';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

interface EnvironnementViewProps {
  onNavigate: (page: PageId) => void;
}

const SOURCES_ENVIRONNEMENT: OfficialSourceItem[] = [
  {
    title: 'Plan de gestion écologique et inventaire de biodiversité du Mont Nlonako',
    reference: 'Ministère des Forêts et de la Faune (MINFOF) / MINEPDED',
    type: 'Plan de Conservation Officiel',
    status: 'Disponible',
    locationOrAccess: 'Délégation Régionale MINFOF Littoral / UICN',
  },
  {
    title: 'Études herpétologiques internationales sur les amphibiens du Mont Nlonako (Herpetological Conservation)',
    reference: 'Chercheurs associés MNHN / Universités camerounaises / UICN Amphibian Specialist Group',
    type: 'Publications Scientifiques Internationales',
    status: 'Homologué',
    locationOrAccess: 'Revues Scientifiques Internationales',
  },
  {
    title: 'Charte coutumière de protection des sources d’eau et des bois sacrés de Ntolo',
    reference: 'Conseil des Notables et Chefferie Traditionnelle de Ntolo',
    type: 'Règlement Coutumier Environnemental',
    status: 'En cours de collationnement',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
];

export const EnvironnementView: React.FC<EnvironnementViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <InstitutionalPageHeader
        badge="Portail Officiel • Section 15"
        title="Environnement & Biodiversité du Mont Nlonako"
        description="Patrimoine écologique exceptionnel, forêt pluviale d'altitude, sanctuaire d'amphibiens mondialement réputé, protection des sources et éco-responsabilité."
        icon={Trees}
        onNavigateBack={() => onNavigate('accueil')}
        provisionalNoticeText="Les données taxonomiques relatives aux espèces végétales et animales menacées répertoriées sur le terroir de Ntolo s'appuient sur les listes rouges de l'UICN. Les inventaires naturalistes locaux en cours sont signalés [À compléter]."
      />

      {/* 1. L'Écosystème Exceptionnel du Mont Nlonako */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mountain className="w-5 h-5 text-emerald-800" />
            <span>1. Un Joyau Écologique de la Ligne du Cameroun</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Hotspot de Biodiversité
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Le village de Ntolo s’étend sur les versants fertiles et boisés du <strong>Mont Nlonako</strong> (qui culmine à environ 1 825 mètres d'altitude). Ce massif volcanique ancien constitue l'un des écosystèmes forestiers les plus riches d'Afrique centrale, abritant un microclimat brumeux et une canopée sempervirente propice aux espèces endémiques.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Leaf className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Forêt Primaire & Secondaire</h4>
            <p className="text-xs text-slate-600">
              Arbres géants d'essences nobles (Iroko, Moabi, Fraké), lianes et épiphytes maintenant une humidité constante bienfaisante pour l'agriculture.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Bird className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Avifaune Remarquable</h4>
            <p className="text-xs text-slate-600">
              Nombreuses espèces d'oiseaux forestiers d'altitude protégés, touracos, calaos et passereaux endémiques de la dorsale camerounaise.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Droplets className="w-4 h-4 text-blue-700" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Château d'Eau Naturel</h4>
            <p className="text-xs text-slate-600">
              Les versants captent les brumes humides de l'Atlantique et alimentent un réseau dense de ruisseaux pérennes aux eaux d'une pureté cristalline.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Tableau des Espèces Remarquables & Amphibiens Célèbres */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
            <span>2. Espèces Emblématiques du Massif</span>
          </h2>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Intérêt Scientifique Mondial
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Espèce / Groupe Biologique</th>
                <th className="px-4 py-3">Nom Scientifique & Statut UICN</th>
                <th className="px-4 py-3">Habitat Spécifique à Ntolo</th>
                <th className="px-4 py-3">Rôle Écologique & Coutumier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Grenouille Goliath</td>
                <td className="px-4 py-3 text-slate-700 font-mono">Conraua goliath (En danger)</td>
                <td className="px-4 py-3 text-slate-600">Rivières torrentielles vives et cascades ombragées du massif</td>
                <td className="px-4 py-3 text-slate-600">Plus grand anoure du monde, espèce intégralement protégée au Cameroun</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Crapauds & Grenouilles d'Arbres Endémiques</td>
                <td className="px-4 py-3 text-slate-700 font-mono">Cardioglossa, Leptodactylodon spp.</td>
                <td className="px-4 py-3 text-slate-600">Litière forestière humide et ruisselets d'altitude</td>
                <td className="px-4 py-3 text-slate-600">Attirent les expéditions de chercheurs et herpétologues internationaux</td>
              </tr>
              <tr className="hover:bg-stone-50/70">
                <td className="px-4 py-3 font-bold text-slate-900">Arbres à Bois d'Ébène et Essences Sacrées</td>
                <td className="px-4 py-3 text-slate-700 font-mono">Diospyros crassiflora / Entandrophragma spp.</td>
                <td className="px-4 py-3 text-slate-600">Forêts denses préservées et îlots sacrés de la Chefferie</td>
                <td className="px-4 py-3 text-slate-600">Interdiction formelle d'abattage sans autorisation coutumière préalable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Engagements Communautaires pour la Préservation */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Leaf className="w-5 h-5 text-emerald-800" />
          <span>3. Règles Coutumières de Protection de la Nature</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Préservation des Têtes de Source</h4>
            <p className="text-slate-600 leading-relaxed">
              Interdiction absolue de défricher dans un rayon de 50 mètres autour des captages et cours d'eau pour préserver l'eau potable des générations futures.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Gestion du Brûlis</h4>
            <p className="text-slate-600 leading-relaxed">
              Réglementation stricte des feux agricoles : pare-feux obligatoires autour des parcelles pour éviter tout incendie incontrôlé sur le Mont Nlonako.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Écotourisme Respectueux</h4>
            <p className="text-slate-600 leading-relaxed">
              Accueil des randonneurs et scientifiques sous réserve du guidage obligatoire par les jeunes du village et de l'interdiction de prélever des spécimens vivants.
            </p>
          </div>
        </div>
      </section>

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_ENVIRONNEMENT}
        themeTitle="l'environnement et la biodiversité du Mont Nlonako à Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />
    </div>
  );
};
