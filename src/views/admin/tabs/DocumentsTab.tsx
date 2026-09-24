import React, { useState } from 'react';
import {
  FileText, Plus, Search, Edit2, Trash2, Globe, EyeOff,
  AlertCircle, X, Download, ShieldCheck
} from 'lucide-react';
import { DocumentItem, UserRole } from '../../../types';

interface DocumentsTabProps {
  documents: DocumentItem[];
  onSave: (doc: DocumentItem) => void;
  onDelete: (id: string, title: string) => void;
  onTogglePublish: (id: string) => void;
  userRole: UserRole;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onSave,
  onDelete,
  onTogglePublish,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentItem['category']>('Administration');
  const [fileType, setFileType] = useState<'PDF' | 'DOCX'>('PDF');
  const [fileSize, setFileSize] = useState('450 Ko');
  const [referenceCode, setReferenceCode] = useState('');
  const [description, setDescription] = useState('');
  const [datePublished, setDatePublished] = useState('2026-09-23');
  const [published, setPublished] = useState(true);

  const canPublish = userRole === 'administrateur_principal' || userRole === 'editeur';
  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingDoc(null);
    setTitle('');
    setCategory('Administration');
    setFileType('PDF');
    setFileSize('350 Ko');
    setReferenceCode(`ACTE-NTL-${new Date().getFullYear()}-${Math.floor(Math.random() * 90 + 10)}`);
    setDescription('');
    setDatePublished(new Date().toISOString().split('T')[0]);
    setPublished(canPublish);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setTitle(doc.title);
    setCategory(doc.category);
    setFileType(doc.fileType);
    setFileSize(doc.fileSize);
    setReferenceCode(doc.referenceCode);
    setDescription(doc.description);
    setDatePublished(doc.datePublished);
    setPublished(doc.published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !referenceCode.trim()) return;

    onSave({
      id: editingDoc ? editingDoc.id : `doc-${Date.now()}`,
      title: title.trim(),
      category,
      fileType,
      fileSize: fileSize.trim() || '500 Ko',
      referenceCode: referenceCode.trim(),
      description: description.trim(),
      datePublished,
      published: canPublish ? published : false,
      downloadUrl: '#',
    });
    setIsModalOpen(false);
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
            placeholder="Rechercher par référence, titre, catégorie..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un document officiel</span>
        </button>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Référence</th>
                <th className="py-3 px-4">Titre du Document</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Format / Poids</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-amber-400 whitespace-nowrap">
                    {doc.referenceCode}
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-stone-200 block">{doc.title}</span>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">{doc.description}</p>
                  </td>
                  <td className="py-3 px-4 text-stone-300">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 border border-stone-700 font-medium">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400 whitespace-nowrap">
                    <span className="font-semibold text-stone-300">{doc.fileType}</span> • {doc.fileSize}
                  </td>
                  <td className="py-3 px-4 text-stone-400 text-[11px] whitespace-nowrap">
                    {doc.datePublished}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {canPublish ? (
                      <button
                        onClick={() => onTogglePublish(doc.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          doc.published !== false
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {doc.published !== false ? 'Publié' : 'Brouillon'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-bold">
                        {doc.published !== false ? 'Publié' : 'Brouillon'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => openEditModal(doc)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => setDeleteConfirmId(doc.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-red-200"
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
      </div>

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">Supprimer ce document ?</h3>
            <p className="text-xs text-stone-300">
              Le fichier ne sera plus téléchargeable par les usagers du portail.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  const target = documents.find((d) => d.id === deleteConfirmId);
                  onDelete(deleteConfirmId, target?.title || 'Document');
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

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                {editingDoc ? 'Modifier le document' : 'Ajouter un document officiel'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Titre officiel du document</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Règlement intérieur du CODEV 2026"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Référence d'archivage</label>
                  <input
                    type="text"
                    required
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                    placeholder="STAT-CODEV-01"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Statuts">Statuts</option>
                    <option value="Fiches Projets">Fiches Projets</option>
                    <option value="Formulaires">Formulaires</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Format de fichier</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Taille estimée</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="ex: 450 Ko"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Description / Objet de l'acte</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Objet et portée du document..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                {canPublish && (
                  <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-800 text-emerald-500"
                    />
                    <span>Rendre téléchargeable immédiatement</span>
                  </label>
                )}
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
