import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ChevronRight, FileText, Target, Newspaper, Calendar, Compass } from 'lucide-react';
import { PageId } from '../types';
import { PAGES_META, SAMPLE_PROJECTS, SAMPLE_EVENTS, SAMPLE_DOCUMENTS } from '../data/villageData';
import { getStoredPublications } from '../services/publicationService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K or Cmd+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle search
        if (isOpen) {
          onClose();
        } else {
          // let parent handle open if needed
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { pages: PAGES_META.slice(0, 6), projects: [], news: [], documents: [], events: [] };

    const pages = PAGES_META.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.navLabel.toLowerCase().includes(q)
    );

    const projects = SAMPLE_PROJECTS.filter(
      (proj) =>
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.sector.toLowerCase().includes(q)
    );

    const allPubs = getStoredPublications();
    const news = allPubs.filter(
      (n) =>
        n.published &&
        (n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.content.some((c) => c.toLowerCase().includes(q)))
    );

    const documents = SAMPLE_DOCUMENTS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.referenceCode.toLowerCase().includes(q)
    );

    const events = SAMPLE_EVENTS.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q)
    );

    return { pages, projects, news, documents, events };
  }, [query]);

  if (!isOpen) return null;

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    onClose();
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalResults =
    searchResults.pages.length +
    searchResults.projects.length +
    searchResults.news.length +
    searchResults.documents.length +
    searchResults.events.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="relative border-b border-slate-200 px-4 py-3 flex items-center bg-slate-50/70">
          <Search className="w-5 h-5 text-emerald-700 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une page, un projet, un arrêté, la chefferie, la santé..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2"
              title="Effacer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 text-xs font-semibold px-2.5"
          >
            Fermer
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          {totalResults === 0 && (
            <div className="text-center py-10">
              <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">
                Aucun résultat correspondant à « <span className="font-semibold">{query}</span> »
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Essayez des termes comme : chefferie, eau potable, café, santé, diaspora, Nlonako...
              </p>
            </div>
          )}

          {/* Pages */}
          {searchResults.pages.length > 0 && (
            <div className="pt-2 first:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                Rubriques & Pages ({searchResults.pages.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPage(p.id)}
                    className="flex items-start justify-between p-2.5 rounded-xl text-left bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/70 hover:border-emerald-300 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-900 block">
                        {p.title}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {p.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 mt-0.5 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projets */}
          {searchResults.projects.length > 0 && (
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                Projets de Développement ({searchResults.projects.length})
              </h4>
              <div className="space-y-1.5">
                {searchResults.projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectPage('projets')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 hover:border-amber-300 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          {proj.sector}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{proj.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{proj.description}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 flex-shrink-0 ml-2">
                      {proj.progressPercentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News */}
          {searchResults.news.length > 0 && (
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-sky-600" />
                Actualités & Avis ({searchResults.news.length})
              </h4>
              <div className="space-y-1.5">
                {searchResults.news.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPage('actualites')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-slate-50 hover:bg-sky-50/70 border border-slate-200/70 hover:border-sky-300 transition-all"
                  >
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">{item.title}</span>
                      <span className="text-xs text-slate-500 line-clamp-1">{item.summary}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex-shrink-0 ml-2">{item.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {searchResults.documents.length > 0 && (
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                Documents & Statuts ({searchResults.documents.length})
              </h4>
              <div className="space-y-1.5">
                {searchResults.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectPage('documents')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-slate-50 hover:bg-purple-50/70 border border-slate-200/70 hover:border-purple-300 transition-all"
                  >
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">{doc.title}</span>
                      <span className="text-xs text-slate-500">{doc.category} • Réf: {doc.referenceCode}</span>
                    </div>
                    <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      {doc.fileType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {searchResults.events.length > 0 && (
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-600" />
                Événements ({searchResults.events.length})
              </h4>
              <div className="space-y-1.5">
                {searchResults.events.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => handleSelectPage('evenements')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-slate-50 hover:bg-rose-50/70 border border-slate-200/70 hover:border-rose-300 transition-all"
                  >
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">{ev.title}</span>
                      <span className="text-xs text-slate-500">{ev.location}</span>
                    </div>
                    <span className="text-xs text-rose-700 font-semibold flex-shrink-0 ml-2">{ev.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-100 px-4 py-2 text-[11px] text-slate-500 flex justify-between items-center border-t border-slate-200">
          <span>Portail officiel de Ntolo (Nlonako - Moungo)</span>
          <span className="hidden sm:inline">Appuyez sur Échap pour quitter</span>
        </div>
      </div>
    </div>
  );
};
