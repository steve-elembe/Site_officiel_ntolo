import React, { useState } from 'react';
import {
  FileCode, Search, Edit2, Globe, EyeOff, CheckCircle2,
  ExternalLink, Layers, X, Info
} from 'lucide-react';
import { ManagedPage, PageId, UserRole } from '../../../types';

interface PagesTabProps {
  pages: ManagedPage[];
  onSave: (page: ManagedPage) => void;
  onToggleVisibility: (pageId: PageId) => void;
  onPreviewPage: (pageId: PageId) => void;
  userRole: UserRole;
}

export const PagesTab: React.FC<PagesTabProps> = ({
  pages,
  onSave,
  onToggleVisibility,
  onPreviewPage,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPage, setEditingPage] = useState<ManagedPage | null>(null);

  // Edit fields
  const [title, setTitle] = useState('');
  const [navLabel, setNavLabel] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const canEdit = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.navLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pageId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditModal = (page: ManagedPage) => {
    setEditingPage(page);
    setTitle(page.title);
    setNavLabel(page.navLabel);
    setSubtitle(page.subtitle || '');
    setMetaDescription(page.metaDescription || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    onSave({
      ...editingPage,
      title: title.trim(),
      navLabel: navLabel.trim(),
      subtitle: subtitle.trim(),
      metaDescription: metaDescription.trim(),
    });
    setEditingPage(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer une page (ex: Histoire, Santé, Chefferie...)"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="text-xs text-stone-400">
          <span className="font-bold text-amber-400">{pages.length}</span> pages institutionnelles configurées
        </div>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Identifiant / Route</th>
                <th className="py-3 px-4">Titre & Menu</th>
                <th className="py-3 px-4">Rubrique</th>
                <th className="py-3 px-4">Dernière mise à jour</th>
                <th className="py-3 px-4 text-center">Visibilité</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((p) => (
                <tr key={p.pageId} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-amber-400">
                    /{p.pageId}
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-stone-200 block">{p.title}</span>
                    <span className="text-[11px] text-stone-400 truncate block mt-0.5">
                      Libellé : <span className="text-stone-300 font-semibold">{p.navLabel}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-300">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 border border-stone-700 font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400 text-[11px]">
                    {p.lastUpdated}
                  </td>
                  <td className="py-3 px-4 text-center">
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
                        <span>{p.published ? 'Visible' : 'Masquée'}</span>
                      </button>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.published ? 'text-emerald-400' : 'text-stone-400'
                      }`}>
                        {p.published ? 'Visible' : 'Masquée'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onPreviewPage(p.pageId)}
                        title="Consulter la page"
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      </button>

                      {canEdit && (
                        <button
                          onClick={() => openEditModal(p)}
                          title="Modifier les textes et métadonnées"
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                Modifier la page : /{editingPage.pageId}
              </h3>
              <button onClick={() => setEditingPage(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
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
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
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
    </div>
  );
};
