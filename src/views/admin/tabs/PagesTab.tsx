import React, { useState } from 'react';
import {
  FileCode, Search, Edit2, Globe, EyeOff, CheckCircle2,
  ExternalLink, Layers, X, Info, Edit3, BookOpen, Sparkles,
  ChevronRight, RefreshCw, Plus, ShieldCheck
} from 'lucide-react';
import { ManagedPage, PageId, UserRole } from '../../../types';
import { PageContentEditorModal } from '../../../components/admin/PageContentEditorModal';
import { getPageContent } from '../../../services/pageContentService';

interface PagesTabProps {
  pages: ManagedPage[];
  onSave: (page: ManagedPage) => void;
  onToggleVisibility: (pageId: PageId) => void;
  onPreviewPage: (pageId: PageId) => void;
  userRole: UserRole;
  currentUserName?: string;
}

export const PagesTab: React.FC<PagesTabProps> = ({
  pages,
  onSave,
  onToggleVisibility,
  onPreviewPage,
  userRole,
  currentUserName = 'Administrateur',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingMetadataPage, setEditingMetadataPage] = useState<ManagedPage | null>(null);

  // Deep Content Editing Modal state
  const [contentEditingPageId, setContentEditingPageId] = useState<PageId | null>(null);

  // Metadata Edit fields
  const [title, setTitle] = useState('');
  const [navLabel, setNavLabel] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const canEdit = userRole === 'administrateur_principal' || userRole === 'editeur';

  const categories = [
    { id: 'all', label: 'Toutes les rubriques' },
    { id: 'village', label: 'Village & Terroir' },
    { id: 'gouvernance', label: 'Gouvernance & Chefferie' },
    { id: 'vie-sociale', label: 'Vie Sociale & Éducation' },
    { id: 'economie', label: 'Économie & Agriculture' },
    { id: 'action', label: 'Projets & Diaspora' },
    { id: 'medias', label: 'Médias & Documents' },
  ];

  const filtered = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.navLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pageId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openMetadataModal = (page: ManagedPage) => {
    setEditingMetadataPage(page);
    setTitle(page.title);
    setNavLabel(page.navLabel);
    setSubtitle(page.subtitle || '');
    setMetaDescription(page.metaDescription || '');
  };

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMetadataPage) return;

    onSave({
      ...editingMetadataPage,
      title: title.trim(),
      navLabel: navLabel.trim(),
      subtitle: subtitle.trim(),
      metaDescription: metaDescription.trim(),
    });
    setEditingMetadataPage(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Banner / Guide info */}
      <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-100 text-sm flex items-center gap-2">
              <span>Gestionnaire de Contenu Intégral du Village (CMS Ntolo)</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                26 Pages Modifiables
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
              Modifiez à tout moment les textes, chronologies, récits historiques, chiffres clés et rubriques officielles de chaque page du site.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setContentEditingPageId('histoire')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modifier l’Histoire</span>
          </button>

          <button
            onClick={() => setContentEditingPageId('chefferie')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Modifier la Chefferie</span>
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="space-y-3 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une page (ex: Histoire, Santé, Chefferie...)"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="text-xs text-stone-400">
            <span className="font-bold text-amber-400">{filtered.length}</span> sur {pages.length} pages configurées
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors text-[11px] ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Route / ID</th>
                <th className="py-3 px-4">Titre de la Page</th>
                <th className="py-3 px-4">Rubrique</th>
                <th className="py-3 px-4">Dernière mise à jour</th>
                <th className="py-3 px-4 text-center">Visibilité</th>
                <th className="py-3 px-4 text-right">Actions de modification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((p) => {
                const pageContent = getPageContent(p.pageId);
                const sectionsCount = pageContent?.sections?.length || 0;

                return (
                  <tr key={p.pageId} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-amber-400">
                      /{p.pageId}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-bold text-stone-200 block text-xs">{p.title}</span>
                      <span className="text-[11px] text-stone-400 truncate block mt-0.5">
                        Libellé menu : <strong className="text-stone-300">{p.navLabel}</strong>
                        {sectionsCount > 0 && (
                          <span className="text-amber-400/80 ml-2 font-mono text-[10px]">
                            • {sectionsCount} section(s)
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-300">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 border border-stone-700 font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                      {p.lastUpdated}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {canEdit ? (
                        <button
                          onClick={() => onToggleVisibility(p.pageId)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all inline-flex items-center gap-1 ${
                            p.published
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-stone-800 text-stone-400 border border-stone-700'
                          }`}
                        >
                          {p.published ? <Globe className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-stone-400" />}
                          <span>{p.published ? 'Publiée' : 'Masquée'}</span>
                        </button>
                      ) : (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.published ? 'text-emerald-400' : 'text-stone-400'
                        }`}>
                          {p.published ? 'Publiée' : 'Masquée'}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Bouton principal : Éditeur de Contenu Détaillé */}
                        <button
                          onClick={() => setContentEditingPageId(p.pageId)}
                          title="Modifier le contenu, les textes et les rubriques de cette page"
                          className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold inline-flex items-center gap-1 text-[11px] transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Éditer le contenu</span>
                        </button>

                        {/* Bouton secondaire : Métadonnées et SEO */}
                        {canEdit && (
                          <button
                            onClick={() => openMetadataModal(p)}
                            title="Modifier les métadonnées SEO et le libellé de menu"
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Bouton aperçu en ligne */}
                        <button
                          onClick={() => onPreviewPage(p.pageId)}
                          title="Consulter la page sur le portail public"
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1 : Edit Page Metadata (Title, Nav, SEO) */}
      {editingMetadataPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                Métadonnées & SEO : /{editingMetadataPage.pageId}
              </h3>
              <button onClick={() => setEditingMetadataPage(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetadata} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Titre affiché de la page</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Libellé dans les menus & barre de navigation</label>
                <input
                  type="text"
                  required
                  value={navLabel}
                  onChange={(e) => setNavLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Sous-titre institutionnel</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Description pour le référencement (SEO & Recherche)</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingMetadataPage(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2 : Full Page Content CMS Editor (Sections, Texts, Lists) */}
      {contentEditingPageId && (
        <PageContentEditorModal
          isOpen={true}
          onClose={() => setContentEditingPageId(null)}
          pageId={contentEditingPageId}
          currentUserName={currentUserName}
          currentUserRole={userRole}
          onNavigateToAdmin={() => setContentEditingPageId(null)}
        />
      )}
    </div>
  );
};
