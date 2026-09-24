import React, { useState } from 'react';
import {
  Menu, X, Search, PhoneCall, ChevronDown, Landmark,
  Compass, Users, Building2, Newspaper, HeartPulse,
  Target, Globe, Shield, Sparkles
} from 'lucide-react';
import { PageId } from '../types';
import { VILLAGE_INFO, PAGES_META } from '../data/villageData';
import { NtoloLogo } from './NtoloLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  fontSize,
  onChangeFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      name: 'Le Terroir',
      icon: Compass,
      items: [
        { id: 'accueil' as PageId, label: 'Accueil' },
        { id: 'presentation' as PageId, label: 'Présentation générale' },
        { id: 'histoire' as PageId, label: 'Histoire du village' },
        { id: 'geographie' as PageId, label: 'Situation géographique' },
        { id: 'environnement' as PageId, label: 'Environnement & Mont Nlonako' },
        { id: 'tourisme' as PageId, label: 'Tourisme & Randonnées' },
      ],
    },
    {
      name: 'Gouvernance',
      icon: Landmark,
      items: [
        { id: 'organisation-traditionnelle' as PageId, label: 'Organisation traditionnelle' },
        { id: 'organisation-administrative' as PageId, label: 'Organisation administrative' },
        { id: 'chefferie' as PageId, label: 'Chefferie & Notables' },
        { id: 'population' as PageId, label: 'Population & Quartiers' },
      ],
    },
    {
      name: 'Culture & Société',
      icon: Sparkles,
      items: [
        { id: 'culture' as PageId, label: 'Culture & Traditions' },
        { id: 'langues-patrimoine' as PageId, label: 'Langues & Patrimoine' },
        { id: 'education' as PageId, label: 'Éducation & Jeunesse' },
        { id: 'sante' as PageId, label: 'Santé & Soins' },
      ],
    },
    {
      name: 'Économie & Projets',
      icon: Target,
      items: [
        { id: 'agriculture' as PageId, label: 'Agriculture (Café, Cacao)' },
        { id: 'elevage' as PageId, label: 'Élevage & Productions' },
        { id: 'economie-commerce' as PageId, label: 'Commerce & Activités' },
        { id: 'infrastructures' as PageId, label: 'Infrastructures & Eau' },
        { id: 'projets' as PageId, label: 'Grands Projets d’Infrastructure' },
        { id: 'projets-participatifs' as PageId, label: 'Projets Participatifs Citoyens' },
        { id: 'partenaires' as PageId, label: 'Espace Partenaires & Sponsoring' },
        { id: 'devenir-partenaire' as PageId, label: 'Devenir Partenaire' },
      ],
    },
    {
      name: 'Médias & Contact',
      icon: Newspaper,
      items: [
        { id: 'actualites' as PageId, label: 'Actualités & Journal' },
        { id: 'annonces' as PageId, label: 'Annonces & Avis Officiels' },
        { id: 'evenements' as PageId, label: 'Agenda des Événements' },
        { id: 'galerie' as PageId, label: 'Galerie Photos & Vidéos' },
        { id: 'documents' as PageId, label: 'Textes & Documents Officiels' },
        { id: 'diaspora' as PageId, label: 'Espace Diaspora' },
        { id: 'contact' as PageId, label: 'Contact & Permanence' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      {/* Cameroon Ribbon Accent Header Bar */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-emerald-700" title="Vert : Forêts et fertilité du Cameroun"></div>
        <div className="bg-red-600 relative flex items-center justify-center" title="Rouge : Unité nationale">
          <div className="w-1.5 h-1.5 bg-amber-400 rotate-45 transform"></div>
        </div>
        <div className="bg-amber-500" title="Jaune : Soleil et prospérité"></div>
      </div>

      {/* Institutional Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              République du Cameroun
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              Région du Littoral • Département du Moungo • Arrondissement de Nlonako
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <span>Taille texte :</span>
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSize === 'normal' ? 'bg-emerald-800 text-white' : 'hover:text-white'}`}
                title="Taille de texte standard"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-1.5 py-0.5 rounded text-xs font-bold ${fontSize === 'large' ? 'bg-emerald-800 text-white' : 'hover:text-white'}`}
                title="Taille de texte agrandie"
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-1.5 py-0.5 rounded text-sm font-bold ${fontSize === 'xlarge' ? 'bg-emerald-800 text-white' : 'hover:text-white'}`}
                title="Taille de texte maximale"
              >
                A++
              </button>
            </div>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 text-[11px] font-medium"
            >
              <PhoneCall className="w-3 h-3" />
              Permanence Chefferie
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 text-[11px] font-bold bg-emerald-950/70 hover:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-800 transition-colors"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Espace Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Village Identity */}
          <NtoloLogo variant="navbar" onClick={() => handleNavClick('accueil')} />

          {/* Desktop Navigation Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navGroups.map((group) => {
              const hasActiveChild = group.items.some((item) => item.id === currentPage);
              const isOpen = activeDropdown === group.name;

              return (
                <div
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      hasActiveChild
                        ? 'text-emerald-900 bg-emerald-50 border border-emerald-200'
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveDropdown(isOpen ? null : group.name)}
                  >
                    <span>{group.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 w-64 pt-1 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                        {group.items.map((item) => {
                          const pageMeta = PAGES_META.find((p) => p.id === item.id);
                          const isCurrent = currentPage === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex flex-col ${
                                isCurrent
                                  ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-4 border-emerald-700'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-800'
                              }`}
                            >
                              <span className="leading-snug">{item.label}</span>
                              {pageMeta && (
                                <span className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                                  {pageMeta.description}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors border border-slate-200"
              title="Rechercher sur le portail de Ntolo (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium">Rechercher...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Projets Participatifs CTA */}
            <button
              onClick={() => handleNavClick('projets-participatifs')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Participer</span>
            </button>

            {/* Projets CTA */}
            <button
              onClick={() => handleNavClick('projets')}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm hover:shadow transition-all"
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>Grands Chantiers</span>
            </button>
          </div>

          {/* Mobile Right Icons (Search & Menu) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 focus:outline-none"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[85vh] overflow-y-auto px-4 py-4 space-y-4 shadow-2xl">
          {/* Quick font adjust on mobile */}
          <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
            <span className="text-xs font-medium text-slate-700">Lisibilité du texte :</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700'}`}
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'large' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700'}`}
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'xlarge' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700'}`}
              >
                A++
              </button>
            </div>
          </div>

          {/* Mobile All 19 Pages Categorized */}
          <div className="space-y-4 divide-y divide-slate-100">
            {navGroups.map((group) => (
              <div key={group.name} className="pt-3 first:pt-0">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 px-1">
                  <group.icon className="w-3.5 h-3.5 text-amber-600" />
                  <span>{group.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {group.items.map((item) => {
                    const isCurrent = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                          isCurrent
                            ? 'bg-emerald-700 text-white font-semibold'
                            : 'text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isCurrent && <span className="text-xs bg-emerald-800 text-amber-300 px-2 py-0.5 rounded-full">Actif</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Emergency Contact & Admin */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Numéros d’Urgence & Chefferie</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold border border-stone-800 shadow"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Espace Administration Sécurisé</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
