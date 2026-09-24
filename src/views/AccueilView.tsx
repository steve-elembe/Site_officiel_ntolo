import React, { useState } from 'react';
import {
  Compass, Users, Landmark, Target, HeartPulse, ChevronRight,
  Sparkles, Award, ArrowRight, ShieldCheck, MapPin, Calendar,
  CheckCircle2, Clock, PhoneCall, AlertCircle, Mountain, Wheat,
  Crown, Globe, Image as ImageIcon, X, ChevronLeft, HandHeart,
  Info, ExternalLink, BookOpen, BookMarked, GraduationCap,
  Egg, ShoppingBag, Hammer, Trees, Building2
} from 'lucide-react';
import { PageId, NewsItem, ProjectItem, GalleryItem } from '../types';
import {
  VILLAGE_INFO,
  LOGO_CONFIG,
  SLOGAN_CONFIG,
  HERO_CONFIG,
  KEY_FIGURES,
  PRESENTATION_FAST,
  LOCATION_DATA,
  DIASPORA_SECTION,
  CONTRIBUTION_CALLOUT,
  CONTACT_FAST,
  SAMPLE_NEWS,
  SAMPLE_PROJECTS,
  SAMPLE_EVENTS,
  SAMPLE_GALLERY
} from '../data/villageData';
import { getStoredPublications } from '../services/publicationService';
import { NtoloLogo } from '../components/NtoloLogo';

interface AccueilViewProps {
  onNavigate: (page: PageId) => void;
  onSelectNews: (news: NewsItem) => void;
}

export const AccueilView: React.FC<AccueilViewProps> = ({
  onNavigate,
  onSelectNews,
}) => {
  // Modal pour la promesse de contribution citoyenne
  const [pledgeModalProject, setPledgeModalProject] = useState<ProjectItem | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState('25000');
  const [pledgerName, setPledgerName] = useState('');
  const [pledgerPhone, setPledgerPhone] = useState('');
  const [pledgeType, setPledgeType] = useState<'financier' | 'materiel' | 'competence'>('financier');
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Visionneuse plein écran pour la galerie photos (Lightbox)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSuccess(true);
    setTimeout(() => {
      setPledgeSuccess(false);
      setPledgeModalProject(null);
      setPledgerName('');
      setPledgerPhone('');
    }, 2500);
  };

  const getIconByKey = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-600" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-emerald-700" />;
      case 'Mountain':
        return <Mountain className="w-5 h-5 text-emerald-800" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5 text-amber-700" />;
      case 'Target':
        return <Target className="w-5 h-5 text-emerald-700" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-800" />;
      default:
        return <Info className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* =========================================================================
          AVIS INSTITUTIONNEL DISCRET
          ========================================================================= */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <p className="font-medium text-[12px] sm:text-xs leading-tight">
              <span className="font-bold">Portail Officiel en Ligne :</span> Certaines données historiques et administratives détaillées sont en cours de validation par la Chefferie et portent la mention <span className="underline font-semibold">[À compléter]</span>.
            </p>
          </div>
          <span className="hidden md:inline-block text-[11px] font-semibold text-amber-800 whitespace-nowrap bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
            Nlonako • Moungo
          </span>
        </div>
      </div>

      {/* =========================================================================
          1. GRANDE SECTION HERO AVEC IMAGE DU PAYSAGE DU MOUNGO / NTOLO
          ========================================================================= */}
      <section className="relative mx-3 sm:mx-6 lg:mx-8 overflow-hidden rounded-3xl shadow-xl border border-emerald-900/30">
        {/* Background Image avec fallback et overlay mesuré pour 100% de lisibilité */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_CONFIG.heroImageUrl}
            alt={HERO_CONFIG.heroImageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Scrim et dégradé cinématique sombre & chaleureux */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-emerald-950/50"></div>
          {/* Subtle noise/grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center space-y-6">
          {/* Ruban républicain miniature & badge institutionnel */}
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 backdrop-blur-md border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RÉPUBLIQUE DU CAMEROUN • CHEFFERIE DE 3E DEGRÉ</span>
          </div>

          {/* Logo temporaire emblématique & Nom du village */}
          <div className="pt-2">
            <NtoloLogo variant="hero" showSlogan={false} />
          </div>

          {/* Slogan provisoire mis en valeur */}
          <p className="text-sm sm:text-base text-amber-200 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            « {SLOGAN_CONFIG.slogan} »
          </p>

          {/* Courte présentation */}
          <p className="text-sm sm:text-lg text-stone-200/95 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
            {HERO_CONFIG.shortSummary}
          </p>

          {/* 4. Boutons requis "Découvrir Ntolo" et "Actualités" + Raccourcis */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 sm:pt-6">
            {/* Bouton Principal 1 : Découvrir Ntolo */}
            <button
              onClick={() => onNavigate('presentation')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-950/40 hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Découvrir Ntolo</span>
            </button>

            {/* Bouton Principal 2 : Actualités */}
            <button
              onClick={() => onNavigate('actualites')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/25 shadow-md transition-all duration-200 active:scale-[0.98] flex items-center space-x-2"
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Actualités</span>
            </button>

            {/* Bouton d'action solidaire : Projets */}
            <button
              onClick={() => onNavigate('projets')}
              className="px-5 py-3.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-semibold text-xs sm:text-sm border border-emerald-600/50 shadow-md transition-all duration-200 active:scale-[0.98] flex items-center space-x-2"
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Chantiers & Projets</span>
            </button>
          </div>

          {/* Bandeau d'information territoriale discrète */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 max-w-3xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs text-stone-300">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Arrondissement de Nlonako</span>
            </div>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <Mountain className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mont Nlonako (Sanctuaire écologique)</span>
            </div>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Département du Moungo</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CHIFFRES CLÉS SOUS FORME DE CARTES (DONNÉES MODIFIABLES)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-6 sm:flex sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="w-3.5 h-3.5" />
              Repères Institutionnels Modifiables
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Chiffres & Indicateurs Clés de Ntolo
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-2 sm:mt-0 max-w-xs">
            Données administratives et communautaires actualisables par le Secrétariat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEY_FIGURES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {getIconByKey(item.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.badgeStatus}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {item.label}
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {item.value}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-stone-100 leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. PRÉSENTATION RAPIDE DU VILLAGE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/70 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Colonne Gauche : Autorité & Dignité Coutumière */}
            <div className="lg:col-span-4 bg-gradient-to-b from-stone-50 to-stone-100/80 p-6 rounded-2xl border border-stone-200 text-center space-y-4">
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-900 flex items-center justify-center text-amber-300 shadow-md border-2 border-amber-400">
                <Crown className="w-12 h-12" />
                <span className="absolute -bottom-2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Chefferie 3e
                </span>
              </div>
              <div>
                <h3 className="font-serif-royal font-bold text-slate-900 text-base sm:text-lg">
                  {VILLAGE_INFO.chiefTitle}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  Garant de la mémoire et des traditions séculaires
                </p>
              </div>
              <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-stone-200">
                « La terre de Ntolo est notre héritage le plus précieux. Son développement harmonieux est le devoir de chacun. »
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Permanence coutumière au Palais</span>
              </div>
            </div>

            {/* Colonne Droite : Synthèse éditoriale & piliers */}
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {PRESENTATION_FAST.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {PRESENTATION_FAST.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {PRESENTATION_FAST.editorialIntro}
                </p>
              </div>

              {/* 3 Piliers du village */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {PRESENTATION_FAST.pillars.map((pillar, idx) => (
                  <div key={idx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
                    <h4 className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions de consultation */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('presentation')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5"
                >
                  <span>Consulter la Présentation Détaillée</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('histoire')}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                >
                  Histoire & Origines
                </button>
                <button
                  onClick={() => onNavigate('chefferie')}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                >
                  Organisation de la Chefferie
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION INSTITUTIONNELLE : LES 17 RUBRIQUES DU PORTAIL OFFICIEL
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-900/80 text-amber-300 border border-emerald-700/60 mb-1">
                <Landmark className="w-3 h-3" />
                <span>RÉPERTOIRE INSTITUTIONNEL COMPLET</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Les 17 Rubriques Officielles de Ntolo
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Documentation administrative, traditions, services publics, économie et projets d’avenir.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-800/80 text-white font-bold px-3 py-1.5 rounded-xl border border-emerald-600/60">
                Sources certifiées
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 text-xs">
            {[
              { id: 'presentation', label: '1. Présentation', icon: Compass, desc: 'Fiche d’identité' },
              { id: 'histoire', label: '2. Histoire', icon: BookOpen, desc: 'Origines & Dynastie' },
              { id: 'geographie', label: '3. Géographie', icon: MapPin, desc: 'Relief & Voies' },
              { id: 'population', label: '4. Population', icon: Users, desc: 'Démographie & Foyers' },
              { id: 'organisation-traditionnelle', label: '5. Trad. Chefferie', icon: Crown, desc: 'Cour & Coutume' },
              { id: 'organisation-administrative', label: '6. Administration', icon: Building2, desc: 'Sous-Préfecture' },
              { id: 'culture', label: '7. Culture & Rites', icon: Sparkles, desc: 'Fêtes & Rites' },
              { id: 'langues-patrimoine', label: '8. Langues & Savoirs', icon: BookMarked, desc: 'Lexique & Sites' },
              { id: 'education', label: '9. Éducation', icon: GraduationCap, desc: 'Écoles & Réussite' },
              { id: 'sante', label: '10. Santé', icon: HeartPulse, desc: 'Poste & Soins' },
              { id: 'agriculture', label: '11. Agriculture', icon: Wheat, desc: 'Café, Cacao & Vivres' },
              { id: 'elevage', label: '12. Élevage', icon: Egg, desc: 'Porciculture & Volaille' },
              { id: 'economie-commerce', label: '13. Commerce', icon: ShoppingBag, desc: 'Marchés & Tontines' },
              { id: 'infrastructures', label: '14. Infrastructures', icon: Hammer, desc: 'Pistes & Eau potable' },
              { id: 'environnement', label: '15. Environnement', icon: Trees, desc: 'Mont Nlonako' },
              { id: 'tourisme', label: '16. Tourisme', icon: Mountain, desc: 'Trekking & Cascades' },
              { id: 'projets', label: '17. Projets CODEV', icon: Target, desc: 'Chantiers prioritaires' },
              { id: 'contact', label: 'Liaison Directe', icon: PhoneCall, desc: 'Permanence royale' },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as PageId)}
                  className="p-3 rounded-2xl bg-stone-800/80 hover:bg-emerald-900/60 border border-stone-700/60 hover:border-emerald-600 transition-all text-left flex flex-col justify-between group h-24"
                >
                  <div className="flex items-center justify-between w-full">
                    <IconComp className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <ChevronRight className="w-3 h-3 text-stone-500 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-[11px] block leading-tight group-hover:text-amber-300 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. DERNIÈRES ACTUALITÉS & 8. PROCHAINS ÉVÉNEMENTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Section 7 : Actualités (8 colonnes) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Information Communautaire
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Dernières Actualités de Ntolo
                </h2>
              </div>
              <button
                onClick={() => onNavigate('actualites')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
              >
                <span>Toutes les actualités</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {getStoredPublications()
                .filter((p) => p.published)
                .slice(0, 3)
                .map((news) => (
                  <div
                    key={news.id}
                    onClick={() => onSelectNews(news as any)}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {news.category}
                        </span>
                        {news.isUrgent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase">
                            Officiel
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {news.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-800 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 flex-shrink-0">
                      <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Lire <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Section 8 : Prochains Événements (4 colonnes) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Agenda du Village
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Prochains Événements
                </h2>
              </div>
              <button
                onClick={() => onNavigate('evenements')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
              >
                <span>Agenda</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {SAMPLE_EVENTS.slice(0, 3).map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onNavigate('evenements')}
                  className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-800 flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Calendar className="w-3 h-3 text-amber-700" />
                      {ev.date}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {ev.time}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                    <span className="line-clamp-1">{ev.location}</span>
                  </p>
                </div>
              ))}

              {/* Raccourci vers la météo / saison agricole */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider">
                    Saison Agro-Climatique
                  </span>
                  <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-full">
                    Bassin Nlonako
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-tight">
                  Période favorable aux travaux d’entretien des cacaoyères et des caféières.
                </p>
                <div className="text-[11px] text-emerald-300 font-semibold pt-1">
                  Température moyenne : 24°C - 28°C
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. PROJETS DE DÉVELOPPEMENT AVEC JAUGE ET MODAL INTERACTIF
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Priorités d’Action Communautaire
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Projets de Développement en Cours
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projets')}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
          >
            <span>Voir l’ensemble des 4 chantiers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_PROJECTS.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    {project.sector}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Statut : {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Jauge d'avancement modifiable */}
                <div className="space-y-1.5 mb-4 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Avancement des travaux :</span>
                    <span className="text-emerald-800 font-bold">{project.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${project.progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Mobilisé : <strong className="text-slate-800">{project.fundsRaised}</strong></span>
                    <span>Objectif : <strong className="text-slate-800">{project.budgetEstimated}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setPledgeModalProject(project)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm transition-all duration-150 active:scale-[0.98] flex items-center gap-1.5"
                >
                  <HandHeart className="w-3.5 h-3.5 text-amber-300" />
                  <span>Soutenir ce projet</span>
                </button>
                <button
                  onClick={() => onNavigate('projets')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Fiche technique →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          10. GALERIE PHOTOS AVEC LIGHTBOX INTÉGRÉE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Médiathèque du Terroir
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Galerie Photos de Ntolo & du Moungo
            </h2>
          </div>
          <button
            onClick={() => onNavigate('galerie')}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
          >
            <span>Toute la médiathèque</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {SAMPLE_GALLERY.slice(0, 4).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm cursor-pointer bg-stone-900"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold line-clamp-2 text-white">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Visionneuse plein écran pour la galerie */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 focus:outline-none transition-colors"
            aria-label="Fermer la visionneuse"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : SAMPLE_GALLERY.length - 1
              )
            }
            className="absolute left-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 focus:outline-none transition-colors"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center space-y-3">
            <img
              src={SAMPLE_GALLERY[activePhotoIndex].imageUrl}
              alt={SAMPLE_GALLERY[activePhotoIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="text-white space-y-1 px-4">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                {SAMPLE_GALLERY[activePhotoIndex].category}
              </span>
              <h3 className="text-base sm:text-lg font-bold">
                {SAMPLE_GALLERY[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
                {SAMPLE_GALLERY[activePhotoIndex].caption}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev < SAMPLE_GALLERY.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 focus:outline-none transition-colors"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* =========================================================================
          11. SECTION DIASPORA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-emerald-800 shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-800/80 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>RESSORTISSANTS DE NTOLO AU CAMEROUN & DANS LE MONDE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {DIASPORA_SECTION.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200 font-medium italic">
                « {DIASPORA_SECTION.subtitle} »
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                {DIASPORA_SECTION.intro}
              </p>

              {/* 3 mini stats diaspora */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                {DIASPORA_SECTION.stats.map((st, idx) => (
                  <div key={idx} className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/60">
                    <span className="text-[10px] text-emerald-300 block uppercase font-bold">{st.label}</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{st.value}</span>
                    <span className="text-[10px] text-amber-300 block mt-0.5">{st.note}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('diaspora')}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow flex items-center space-x-2"
                >
                  <Users className="w-4 h-4 text-slate-950" />
                  <span>Se Recenser dans l’Annuaire</span>
                </button>
                <button
                  onClick={() => onNavigate('diaspora')}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
                >
                  Contacter une antenne régionale
                </button>
              </div>
            </div>

            {/* Illustration / Encadré solidaire */}
            <div className="lg:col-span-4 bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/60 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 border border-amber-400/40">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-white">Antennes Régionales</h3>
              <p className="text-xs text-emerald-200">
                Des coordinations fraternelles à Douala, Yaoundé et Nkongsamba pour relayer les projets du village.
              </p>
              <div className="pt-2 text-[11px] text-amber-300 font-semibold">
                Matricule d'adhérent délivré après recensement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. APPEL À CONTRIBUER AU DÉVELOPPEMENT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300">
                <HandHeart className="w-3.5 h-3.5 text-amber-400" />
                <span>SOLIDARITÉ CITOYENNE & PATRIOTISME LOCAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {CONTRIBUTION_CALLOUT.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200 font-medium italic">
                « {CONTRIBUTION_CALLOUT.subtitle} »
              </p>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                {CONTRIBUTION_CALLOUT.appealText}
              </p>

              {/* Garanties de transparence */}
              <div className="space-y-1.5 pt-1">
                {CONTRIBUTION_CALLOUT.guarantees.map((g, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setPledgeModalProject(SAMPLE_PROJECTS[0])}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center space-x-2"
                >
                  <HandHeart className="w-4 h-4" />
                  <span>Faire une promesse de don / contribution</span>
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
                >
                  Échanger avec le Comité
                </button>
              </div>
            </div>

            {/* Encadré modalité pratique */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-amber-300">Formes de Contribution</h3>
              <ul className="text-xs text-stone-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Financière :</strong> virement ou dépôt Mobile Money certifié auprès du CODEV.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Matérielle :</strong> dons de sacs de ciment, fer, tuyauterie, livres scolaires.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Technique :</strong> ingénieurs, médecins, agronomes pour des missions ponctuelles.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. CARTE / LOCALISATION & ACCÈS AU VILLAGE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="sm:flex sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Géographie & Itinéraire
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {LOCATION_DATA.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-2 sm:mt-0">
              {LOCATION_DATA.regionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visualisation Cartographique Stylisée */}
            <div className="lg:col-span-7 bg-gradient-to-br from-emerald-950 via-slate-900 to-stone-900 rounded-2xl p-6 text-white border border-emerald-800/60 shadow-md relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              {/* Decorative map contour lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="bg-emerald-800/80 px-2.5 py-1 rounded-full text-amber-300 font-bold border border-amber-400/40">
                    Bassin du Mont Nlonako
                  </span>
                  <span className="text-stone-300 text-[11px]">
                    Région du Littoral • Cameroun
                  </span>
                </div>

                <div className="space-y-2 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif-royal font-bold text-lg text-white">VILLAGE DE NTOLO</h4>
                      <p className="text-xs text-emerald-300 font-medium">Palais de la Chefferie Traditionnelle de 3e Degré</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 pl-11">
                    {LOCATION_DATA.coordinates}
                  </p>
                </div>
              </div>

              {/* Repères locaux */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-stone-300">
                {LOCATION_DATA.landmarks.map((landmark, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span className="line-clamp-1">{landmark}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guides d'accès depuis les grandes villes */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Comment se rendre à Ntolo
              </h3>
              <div className="space-y-3">
                {LOCATION_DATA.accessItinerary.map((it, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-950">{it.from}</span>
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {it.distance}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {it.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('presentation')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
                >
                  <span>En savoir plus sur la géographie et les limites</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. CONTACT OFFICIEL & PERMANENCE DE LA CHEFFERIE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/80 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                Permanence & Secrétariat
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {CONTACT_FAST.title}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-3 sm:mt-0 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <span>Ouvrir la page Contact & Doléances</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Adresse Physique
              </span>
              <h4 className="font-bold text-sm text-slate-900">{CONTACT_FAST.address}</h4>
              <p className="text-xs text-slate-500">{CONTACT_FAST.reception}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Permanence Téléphonique
              </span>
              <h4 className="font-bold text-sm text-slate-900">{CONTACT_FAST.officialPhone}</h4>
              <p className="text-xs text-slate-500">Appels, SMS & coordination locale</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Courrier Électronique
              </span>
              <h4 className="font-bold text-sm text-slate-900 break-all">{CONTACT_FAST.officialEmail}</h4>
              <p className="text-xs text-slate-500">Pour partenariats, diaspora et requêtes</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL INTERACTIF DE PROMESSE DE DON / SOUSCRIPTION CITOYENNE
          ========================================================================= */}
      {pledgeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <HandHeart className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">
                  Participer à l'effort de Ntolo
                </h3>
              </div>
              <button
                onClick={() => setPledgeModalProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-stone-100"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {pledgeSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Engagement Enregistré !</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Merci pour votre attachement et votre solidarité avec Ntolo. Le secrétariat du CODEV vous contactera pour les modalités.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} className="space-y-4">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                  <span className="text-slate-500 block">Projet soutenu :</span>
                  <span className="font-bold text-slate-900">{pledgeModalProject.title}</span>
                </div>

                {/* Type de contribution */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Forme de votre contribution
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPledgeType('financier')}
                      className={`p-2 rounded-xl border font-semibold text-center transition-all ${pledgeType === 'financier' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-slate-700 border-stone-200'}`}
                    >
                      Financière
                    </button>
                    <button
                      type="button"
                      onClick={() => setPledgeType('materiel')}
                      className={`p-2 rounded-xl border font-semibold text-center transition-all ${pledgeType === 'materiel' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-slate-700 border-stone-200'}`}
                    >
                      Matériel
                    </button>
                    <button
                      type="button"
                      onClick={() => setPledgeType('competence')}
                      className={`p-2 rounded-xl border font-semibold text-center transition-all ${pledgeType === 'competence' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-slate-700 border-stone-200'}`}
                    >
                      Bénévolat
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Votre Nom Complet / Famille
                  </label>
                  <input
                    type="text"
                    required
                    value={pledgerName}
                    onChange={(e) => setPledgerName(e.target.value)}
                    placeholder="Ex: Famille Elembe / Ressortissant Ntolo"
                    className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Téléphone (WhatsApp conseillé)
                  </label>
                  <input
                    type="tel"
                    required
                    value={pledgerPhone}
                    onChange={(e) => setPledgerPhone(e.target.value)}
                    placeholder="Ex: +237 6XX XX XX XX"
                    className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                {pledgeType === 'financier' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Montant de la promesse (FCFA)
                    </label>
                    <select
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="10000">10 000 FCFA</option>
                      <option value="25000">25 000 FCFA</option>
                      <option value="50000">50 000 FCFA</option>
                      <option value="100000">100 000 FCFA</option>
                      <option value="250000">250 000 FCFA</option>
                      <option value="libre">Montant libre à convenir</option>
                    </select>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setPledgeModalProject(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-stone-100 rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-md transition-all active:scale-[0.98]"
                  >
                    Confirmer ma contribution
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
