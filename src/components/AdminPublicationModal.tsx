import React, { useState } from 'react';
import {
  X, Plus, Edit2, Trash2, CheckCircle2, Eye, EyeOff, Save,
  AlertTriangle, Image as ImageIcon, FileText, Download, Upload,
  Sparkles, ShieldCheck, Lock, Unlock, RefreshCw, Layers
} from 'lucide-react';
import { PublicationItem, ArticleCategory, AttachedDocument } from '../types';
import {
  ARTICLE_CATEGORIES,
  getStoredPublications,
  upsertPublication,
  deletePublication,
  togglePublicationPublished,
  resetPublicationsToDefault,
  exportPublicationsAsJSON,
  importPublicationsFromJSON,
} from '../services/publicationService';

interface AdminPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublicationsChanged: () => void;
}

const PRESET_IMAGES = [
  { label: 'Chantier / Eau', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'École / Éducation', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Santé / Médical', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cacao / Agriculture', url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Réunion / Chefferie', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Jeunesse / Sport', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Culture / Rites', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Communiqué / Avis', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80' },
];

export const AdminPublicationModal: React.FC<AdminPublicationModalProps> = ({
  isOpen,
  onClose,
  onPublicationsChanged,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ntolo_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Editing state
  const [editingItem, setEditingItem] = useState<PublicationItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ArticleCategory>('Vie du village');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formAuthorRole, setFormAuthorRole] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContentParagraphs, setFormContentParagraphs] = useState<string[]>(['']);
  const [formGalleryUrls, setFormGalleryUrls] = useState<string[]>([]);
  const [formGalleryInput, setFormGalleryInput] = useState('');
  const [formAttachedDocs, setFormAttachedDocs] = useState<AttachedDocument[]>([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<'PDF' | 'DOCX' | 'JPG'>('PDF');
  const [newDocSize, setNewDocSize] = useState('1.2 Mo');
  const [formIsUrgent, setFormIsUrgent] = useState(false);
  const [formPublished, setFormPublished] = useState(true);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default administrative passcode: 'admin123' or 'ntolo2026'
    if (passcode.trim() === 'admin123' || passcode.trim() === 'ntolo2026' || passcode.trim() === 'ntolo') {
      setIsAuthenticated(true);
      localStorage.setItem('ntolo_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Code d’accès erroné. Utilisez "ntolo2026" ou "admin123".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ntolo_admin_auth');
    setEditingItem(null);
    setIsCreating(false);
  };

  const startCreateNew = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormTitle('');
    setFormCategory('Vie du village');
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormAuthor('Secrétariat Général de la Chefferie');
    setFormAuthorRole('Cellule de Communication');
    setFormDate(new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }));
    setFormSummary('');
    setFormContentParagraphs(['']);
    setFormGalleryUrls([]);
    setFormAttachedDocs([]);
    setFormIsUrgent(false);
    setFormPublished(true);
  };

  const startEdit = (item: PublicationItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormImageUrl(item.imageUrl);
    setFormAuthor(item.author);
    setFormAuthorRole(item.authorRole || '');
    setFormDate(item.date);
    setFormSummary(item.summary);
    setFormContentParagraphs(item.content.length > 0 ? [...item.content] : ['']);
    setFormGalleryUrls(item.gallery ? [...item.gallery] : []);
    setFormAttachedDocs(item.attachedDocuments ? [...item.attachedDocuments] : []);
    setFormIsUrgent(item.isUrgent || false);
    setFormPublished(item.published);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) {
      alert('Veuillez renseigner au moins le titre et le résumé de la publication.');
      return;
    }

    const cleanParagraphs = formContentParagraphs.filter((p) => p.trim().length > 0);
    if (cleanParagraphs.length === 0) {
      cleanParagraphs.push(formSummary);
    }

    const id = editingItem ? editingItem.id : `actu-${Date.now()}`;
    const publication: PublicationItem = {
      id,
      title: formTitle.trim(),
      slug: formTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      imageUrl: formImageUrl.trim() || PRESET_IMAGES[0].url,
      date: formDate.trim() || 'Date non précisée',
      author: formAuthor.trim() || 'Comité de Rédaction de Ntolo',
      authorRole: formAuthorRole.trim(),
      category: formCategory,
      summary: formSummary.trim(),
      content: cleanParagraphs,
      gallery: formGalleryUrls,
      attachedDocuments: formAttachedDocs,
      isUrgent: formIsUrgent,
      published: formPublished,
      viewsCount: editingItem?.viewsCount || 1,
      readTimeMinutes: Math.max(1, Math.ceil(cleanParagraphs.join(' ').split(' ').length / 180)),
    };

    upsertPublication(publication);
    onPublicationsChanged();
    setEditingItem(null);
    setIsCreating(false);
    showFeedback('Publication enregistrée avec succès !');
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Êtes-vous certain de vouloir supprimer définitivement la publication "${title}" ?`)) {
      deletePublication(id);
      onPublicationsChanged();
      showFeedback('Publication supprimée.');
    }
  };

  const handleTogglePublish = (id: string) => {
    togglePublicationPublished(id);
    onPublicationsChanged();
  };

  const handleAddParagraph = () => {
    setFormContentParagraphs([...formContentParagraphs, '']);
  };

  const handleRemoveParagraph = (index: number) => {
    if (formContentParagraphs.length <= 1) return;
    const updated = formContentParagraphs.filter((_, i) => i !== index);
    setFormContentParagraphs(updated);
  };

  const handleAddGalleryUrl = () => {
    if (formGalleryInput.trim()) {
      setFormGalleryUrls([...formGalleryUrls, formGalleryInput.trim()]);
      setFormGalleryInput('');
    }
  };

  const handleRemoveGalleryUrl = (idx: number) => {
    setFormGalleryUrls(formGalleryUrls.filter((_, i) => i !== idx));
  };

  const handleAddDocument = () => {
    if (!newDocTitle.trim()) return;
    const newDoc: AttachedDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.trim(),
      fileType: newDocType,
      fileSize: newDocSize.trim() || '1.0 Mo',
    };
    setFormAttachedDocs([...formAttachedDocs, newDoc]);
    setNewDocTitle('');
  };

  const handleRemoveDocument = (id: string) => {
    setFormAttachedDocs(formAttachedDocs.filter((d) => d.id !== id));
  };

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleExportJSON = () => {
    const dataStr = exportPublicationsAsJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ntolo_publications_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('Fichier JSON de sauvegarde téléchargé.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importPublicationsFromJSON(content);
      if (success) {
        onPublicationsChanged();
        showFeedback('Publications importées avec succès !');
      } else {
        alert('Format de fichier JSON invalide.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Attention : cela réinitialisera toutes les publications aux exemples initiaux certifiés. Continuer ?')) {
      resetPublicationsToDefault();
      onPublicationsChanged();
      showFeedback('Contenus réinitialisés aux valeurs d’origine.');
    }
  };

  const allItems = getStoredPublications();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Studio de Publication & Administration
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900 text-amber-300 border border-emerald-700">
                  CMS Ntolo
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Ajouter, modifier, publier ou supprimer des actualités, annonces et événements
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 font-semibold"
                title="Verrouiller la session"
              >
                <Lock className="w-3.5 h-3.5 inline mr-1" />
                Déconnexion
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback message banner */}
        {feedbackMessage && (
          <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center animate-in fade-in">
            {feedbackMessage}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-800" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Accès Administrateur / Rédacteur</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Veuillez entrer le mot de passe administrateur pour gérer les publications du village.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Mot de passe (Ex: ntolo2026)"
                  className="w-full text-center tracking-widest text-sm p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-600 font-semibold">{authError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow"
                >
                  Déverrouiller le Studio de Publication
                </button>
              </form>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-slate-500">
                💡 <strong>Astuce de démonstration :</strong> Utilisez le code <code className="font-mono font-bold text-emerald-800">ntolo2026</code> ou <code className="font-mono font-bold text-emerald-800">admin123</code>.
              </div>
            </div>
          ) : isCreating || editingItem ? (
            /* Article Editor Form */
            <form onSubmit={handleSaveForm} className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-emerald-800" />
                  <span>{editingItem ? 'Modifier la publication' : 'Créer une nouvelle publication'}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsCreating(false); }}
                  className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
                >
                  ← Retour à la liste
                </button>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Titre de la publication *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ex: Travaux d’urgence sur le pont communal..."
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Catégorie *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ArticleCategory)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author, Role & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Auteur / Entité émettrice</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Ex: Secrétariat de la Chefferie"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Rôle / Commission</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="Ex: Commission Infrastructures"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date d'émission</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="Ex: 23 Septembre 2026"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Image principale (URL)</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-500 mr-1">Présélections :</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImageUrl(preset.url)}
                      className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 text-[10px] font-medium text-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Résumé introductif (Chapeau) *</label>
                <textarea
                  required
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Bref résumé accrocheur pour la liste des actualités..."
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              {/* Full Content Paragraphs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Contenu complet (Paragraphes détaillés) *</label>
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter un paragraphe</span>
                  </button>
                </div>
                {formContentParagraphs.map((par, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-[11px] font-mono text-slate-400 mt-2">{index + 1}.</span>
                    <textarea
                      rows={3}
                      value={par}
                      onChange={(e) => {
                        const updated = [...formContentParagraphs];
                        updated[index] = e.target.value;
                        setFormContentParagraphs(updated);
                      }}
                      placeholder={`Paragraphe ${index + 1}...`}
                      className="flex-1 text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                    {formContentParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(index)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 mt-1"
                        title="Supprimer ce paragraphe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Gallery Section */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-800" />
                    <span>Galerie photos complémentaire ({formGalleryUrls.length} photos)</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={formGalleryInput}
                    onChange={(e) => setFormGalleryInput(e.target.value)}
                    placeholder="URL de photo supplémentaire..."
                    className="flex-1 text-xs p-2 border border-stone-300 rounded-xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-semibold"
                  >
                    Ajouter
                  </button>
                </div>
                {formGalleryUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {formGalleryUrls.map((url, i) => (
                      <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-stone-300">
                        <img src={url} alt="mini" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryUrl(i)}
                          className="absolute inset-0 bg-red-900/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attached Documents Section */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Documents joints téléchargeables ({formAttachedDocs.length})</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="Nom du document (Ex: Devis estimatif officiel)"
                    className="sm:col-span-2 text-xs p-2 border border-stone-300 rounded-xl focus:outline-none"
                  />
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="text-xs p-2 border border-stone-300 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="JPG">Image / Scan</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold"
                  >
                    Joindre le document
                  </button>
                </div>
                {formAttachedDocs.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {formAttachedDocs.map((doc) => (
                      <div key={doc.id} className="p-2 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                            {doc.fileType}
                          </span>
                          <span className="font-medium text-slate-800">{doc.title}</span>
                          <span className="text-slate-400 text-[11px]">({doc.fileSize})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Switches: Urgent & Published */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formIsUrgent}
                    onChange={(e) => setFormIsUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>Marquer comme Communiqué Urgent / Alerte Officielle</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>Publier immédiatement (visible par tous les visiteurs)</span>
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsCreating(false); }}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer & Diffuser</span>
                </button>
              </div>
            </form>
          ) : (
            /* Items Management Table */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900">Catalogue des Publications ({allItems.length})</h4>
                  <p className="text-xs text-slate-500">Gérez le statut, éditez les paragraphes ou supprimez les articles</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={startCreateNew}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle Publication</span>
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1"
                    title="Sauvegarder toutes les publications en JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exporter JSON</span>
                  </button>
                  <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importer JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                  <button
                    onClick={handleResetDefaults}
                    className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl"
                    title="Restaurer les données officielles d'origine"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-slate-700 font-bold border-b border-stone-200 uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Titre & Résumé</th>
                      <th className="px-4 py-3">Catégorie</th>
                      <th className="px-4 py-3">Date & Auteur</th>
                      <th className="px-4 py-3 text-center">Statut</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {allItems.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/70">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-stone-200"
                            />
                            <div className="max-w-xs">
                              <span className="font-bold text-slate-900 block truncate">{item.title}</span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">{item.summary}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-stone-100 text-stone-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-600">
                          <div>{item.date}</div>
                          <div className="text-slate-400 text-[10px] truncate max-w-[120px]">{item.author}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleTogglePublish(item.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.published ? 'En ligne' : 'Brouillon'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Gestion autonome des contenus • Stockage persistant sécurisé</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-semibold"
          >
            Fermer le studio
          </button>
        </div>
      </div>
    </div>
  );
};
