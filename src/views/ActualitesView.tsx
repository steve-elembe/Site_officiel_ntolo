import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper, Clock, User, AlertCircle, ChevronRight, Filter,
  Share2, Search, PlusCircle, Sparkles, LayoutGrid, List,
  Eye, Check, ShieldCheck, Tag, ArrowUpRight
} from 'lucide-react';
import { PageId, PublicationItem, ArticleCategory } from '../types';
import {
  ARTICLE_CATEGORIES,
  getStoredPublications,
} from '../services/publicationService';
import { AdminPublicationModal } from '../components/AdminPublicationModal';

interface ActualitesViewProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (articleId: string) => void;
}

export const ActualitesView: React.FC<ActualitesViewProps> = ({
  onNavigate,
  onSelectArticle,
}) => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadPublications = () => {
    setPublications(getStoredPublications());
  };

  useEffect(() => {
    loadPublications();
    // Listen for storage update events
    const handleStorageUpdate = () => loadPublications();
    window.addEventListener('ntolo_publications_updated', handleStorageUpdate);
    return () => window.removeEventListener('ntolo_publications_updated', handleStorageUpdate);
  }, []);

  // Filter and sort publications
  const filteredPublications = useMemo(() => {
    return publications.filter((item) => {
      // Must be published for public view
      if (!item.published) return false;

      // Category filter
      if (selectedCategory !== 'Toutes' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        const matchesContent = item.content.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesAuthor && !matchesContent) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      // Recent (default by index or timestamp)
      return 0;
    });
  }, [publications, selectedCategory, searchQuery, sortBy]);

  // Urgent alerts
  const urgentAlerts = useMemo(() => {
    return publications.filter((p) => p.published && p.isUrgent);
  }, [publications]);

  const handleQuickShare = (e: React.MouseEvent, item: PublicationItem) => {
    e.stopPropagation();
    const url = window.location.origin + `/#article-${item.id}`;
    navigator.clipboard.writeText(`${item.title} - ${url}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900">
              <Newspaper className="w-3.5 h-3.5 text-emerald-800" />
              <span>JOURNAL OFFICIEL & FLUX D'INFORMATIONS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Actualités du Village de NTOLO
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consultez les informations communautaires, les avancées des chantiers du CODEV, les rapports d’activités et les actualités du terroir du Mont Nlonako.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('ntolo_open_community_modal', { detail: { type: 'actualite' } }))}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Proposer une actualité</span>
            </button>
            <button
              onClick={() => onNavigate('annonces')}
              className="px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs transition-colors text-center"
            >
              Voir les Annonces & Avis
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Publier / Administration</span>
            </button>
          </div>
        </div>

        {/* Urgent Announcement Banner if active */}
        {urgentAlerts.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-amber-600 text-white p-4 sm:p-5 rounded-2xl shadow flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-black/20 px-2 py-0.5 rounded">
                  Avis Urgent
                </span>
                <p className="font-bold text-xs sm:text-sm text-white mt-0.5">
                  {urgentAlerts[0].title}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectArticle(urgentAlerts[0].id)}
              className="px-4 py-1.5 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition-colors flex-shrink-0 shadow"
            >
              Consulter
            </button>
          </div>
        )}

        {/* Search, Filter and Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
          
          {/* Search and Sort row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par mot-clé, thème ou auteur..."
                className="w-full text-xs pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">Trier :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs p-2 border border-stone-300 rounded-xl bg-white font-medium focus:outline-none"
                >
                  <option value="recent">Plus récents</option>
                  <option value="popular">Plus consultés</option>
                </select>
              </div>

              <div className="flex items-center border border-stone-200 rounded-xl p-1 bg-stone-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs ${
                    viewMode === 'grid' ? 'bg-white shadow text-emerald-800 font-bold' : 'text-stone-400'
                  }`}
                  title="Vue Grille"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs ${
                    viewMode === 'list' ? 'bg-white shadow text-emerald-800 font-bold' : 'text-stone-400'
                  }`}
                  title="Vue Liste"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('Toutes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === 'Toutes'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Toutes ({publications.filter((p) => p.published).length})
            </button>
            {ARTICLE_CATEGORIES.map((cat) => {
              const count = publications.filter((p) => p.published && p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Affichage de <strong>{filteredPublications.length}</strong> article{filteredPublications.length > 1 ? 's' : ''}
            {selectedCategory !== 'Toutes' && ` dans la catégorie "${selectedCategory}"`}
          </span>
          {searchQuery && (
            <span>Filtre de recherche appliqué : « {searchQuery} »</span>
          )}
        </div>

        {/* Publications Grid / List */}
        {filteredPublications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Aucun article ne correspond à votre recherche</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Essayez de modifier votre requête, de réinitialiser le filtre de catégorie ou de publier une nouvelle information.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => { setSelectedCategory('Toutes'); setSearchQuery(''); }}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl"
              >
                Réinitialiser les filtres
              </button>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl"
              >
                Publier un article
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectArticle(item.id)}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="w-full h-48 overflow-hidden relative bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-emerald-900 shadow-sm backdrop-blur-sm">
                        {item.category}
                      </span>
                      {item.isUrgent && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-red-600 text-white uppercase shadow-sm">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" />
                        {item.viewsCount || 1}
                      </span>
                    </div>

                    <h2 className="font-bold text-base text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                    Par <span className="font-semibold text-slate-700">{item.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleQuickShare(e, item)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-800 hover:bg-stone-100 transition-colors"
                      title="Copier le lien"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-emerald-800 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Lire <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredPublications.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectArticle(item.id)}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full sm:w-44 h-32 sm:h-28 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.category}
                    </span>
                    {item.isUrgent && (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-red-100 text-red-700 uppercase">
                        Urgent
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {item.author}
                    </span>
                  </div>

                  <h2 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 w-full sm:w-auto flex-shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                  <span className="text-xs font-bold text-emerald-800 group-hover:underline flex items-center gap-1">
                    Consulter <ChevronRight className="w-4 h-4" />
                  </span>
                  <button
                    onClick={(e) => handleQuickShare(e, item)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-800 text-xs flex items-center gap-1"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">Partager</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Admin Publication Modal */}
      <AdminPublicationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onPublicationsChanged={loadPublications}
      />
    </div>
  );
};
