import React, { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Globe, EyeOff, AlertCircle,
  CheckCircle2, X, AlertTriangle, Eye, Calendar, User, Tag
} from 'lucide-react';
import { PublicationItem, ArticleCategory, UserRole } from '../../../types';
import { ARTICLE_CATEGORIES } from '../../../services/publicationService';

interface PublicationsTabProps {
  type: 'actualites' | 'annonces';
  items: PublicationItem[];
  onSave: (item: PublicationItem) => void;
  onDelete: (id: string, title: string) => void;
  onTogglePublish: (id: string, title: string) => void;
  userRole: UserRole;
  currentUserName: string;
}

export const PublicationsTab: React.FC<PublicationsTabProps> = ({
  type,
  items,
  onSave,
  onDelete,
  onTogglePublish,
  userRole,
  currentUserName,
}) => {
  const isAnnonce = type === 'annonces';
  const filteredByType = items.filter((item) =>
    isAnnonce ? item.category === 'Annonces' : item.category !== 'Annonces'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [editingItem, setEditingItem] = useState<PublicationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>(isAnnonce ? 'Annonces' : 'Vie du village');
  const [summary, setSummary] = useState('');
  const [contentRaw, setContentRaw] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [published, setPublished] = useState(true);

  const canPublish = userRole === 'administrateur_principal' || userRole === 'editeur';
  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const displayedItems = filteredByType.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'published') return item.published !== false;
    if (filterStatus === 'draft') return item.published === false;
    return true;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory(isAnnonce ? 'Annonces' : 'Vie du village');
    setSummary('');
    setContentRaw('');
    setImageUrl('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80');
    setAuthor(currentUserName);
    setAuthorRole(isAnnonce ? 'Secrétariat de la Chefferie' : 'Comité de Rédaction');
    setIsUrgent(false);
    setPublished(canPublish);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PublicationItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setSummary(item.summary);
    setContentRaw(Array.isArray(item.content) ? item.content.join('\n\n') : (item.content || ''));
    setImageUrl(item.imageUrl || '');
    setAuthor(item.author || currentUserName);
    setAuthorRole(item.authorRole || '');
    setIsUrgent(!!item.isUrgent);
    setPublished(item.published !== false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const paragraphs = contentRaw
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const saved: PublicationItem = {
      id: editingItem ? editingItem.id : `${isAnnonce ? 'ann' : 'actu'}-${Date.now()}`,
      title: title.trim(),
      slug: editingItem ? editingItem.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80',
      date: editingItem ? editingItem.date : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: author.trim() || 'Comité de Rédaction',
      authorRole: authorRole.trim() || 'Communication Officielle',
      category: isAnnonce ? 'Annonces' : category,
      summary: summary.trim(),
      content: paragraphs.length > 0 ? paragraphs : [summary.trim()],
      isUrgent,
      published: canPublish ? published : false, // Content managers save as draft
      viewsCount: editingItem ? editingItem.viewsCount : 0,
      readTimeMinutes: Math.max(2, Math.ceil(paragraphs.join(' ').split(' ').length / 150)),
    };

    onSave(saved);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Rechercher parmi les ${isAnnonce ? 'annonces' : 'actualités'}...`}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
            {(['all', 'published', 'draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === st ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'Tout' : st === 'published' ? 'Publiés' : 'Brouillons'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Rédiger {isAnnonce ? 'un avis officiel' : 'un article'}</span>
        </button>
      </div>

      {/* Publications Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        {displayedItems.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-400 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-stone-600" />
            <p>Aucun élément ne correspond aux critères de recherche.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Titre & Résumé</th>
                  <th className="py-3 px-4">Catégorie</th>
                  <th className="py-3 px-4">Auteur</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {displayedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-stone-100 flex items-center gap-2">
                        {item.isUrgent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-red-500/20 text-red-300 border border-red-500/30">
                            URGENT
                          </span>
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">{item.summary}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-stone-300 truncate max-w-[120px]">
                      {item.author}
                    </td>

                    <td className="py-3 px-4 text-stone-400 text-[11px] whitespace-nowrap">
                      {item.date}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {canPublish ? (
                        <button
                          onClick={() => onTogglePublish(item.id, item.title)}
                          title={item.published !== false ? 'Cliquer pour dépublier' : 'Cliquer pour publier'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            item.published !== false
                              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                              : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700'
                          }`}
                        >
                          {item.published !== false ? (
                            <>
                              <Globe className="w-3 h-3 text-emerald-400" />
                              <span>Publié</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-stone-400" />
                              <span>Brouillon</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.published !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-stone-800 text-stone-400'
                        }`}>
                          {item.published !== false ? 'Publié' : 'Brouillon'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {canDelete && (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base text-white">Confirmation de suppression</h3>
            </div>
            <p className="text-xs text-stone-300">
              Êtes-vous certain de vouloir supprimer définitivement cet élément ? Cette action est irréversible.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  const target = items.find((i) => i.id === deleteConfirmId);
                  onDelete(deleteConfirmId, target?.title || 'Élément');
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal (Create / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-serif-royal text-xl font-bold text-white">
                  {editingItem ? 'Modifier le contenu' : `Rédiger ${isAnnonce ? 'une annonce' : 'un article'}`}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Les modifications sont appliquées directement sur le portail public.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-300">Titre principal</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Réception officielle des tuyaux pour l’adduction d’eau"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-300">Catégorie thématique</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-300">Auteur officiel</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nom ou commission"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-300">Image d’en-tête (URL)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-300">Résumé chapeau (1 à 2 phrases courtes)</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Synthèse affichée sur la page d'accueil..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-300">Corps du texte (Paragraphes séparés par une ligne vide)</label>
                <textarea
                  rows={5}
                  value={contentRaw}
                  onChange={(e) => setContentRaw(e.target.value)}
                  placeholder="Détaillez le communiqué, les décisions ou le compte-rendu officiel..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                ></textarea>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-800 text-amber-500 focus:ring-0"
                    />
                    <span>Marquer comme Communiqué Urgent</span>
                  </label>

                  {canPublish ? (
                    <label className="flex items-center space-x-2 text-xs text-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="rounded bg-stone-950 border-stone-800 text-emerald-500 focus:ring-0"
                      />
                      <span className="font-bold text-emerald-400">Publier immédiatement</span>
                    </label>
                  ) : (
                    <span className="text-[11px] text-amber-400 italic">
                      Enregistré en brouillon pour validation
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
