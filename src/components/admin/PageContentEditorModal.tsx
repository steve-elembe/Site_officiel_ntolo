import React, { useState, useEffect } from 'react';
import {
  X, Save, RotateCcw, Plus, Trash2, CheckCircle2,
  AlertCircle, Edit3, HelpCircle, Eye, ExternalLink, ShieldCheck,
  FileText, Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';
import { PageId, UserRole } from '../../types';
import {
  getPageContent,
  savePageContent,
  resetPageToDefault,
  PageContentData,
  PageSectionData,
} from '../../services/pageContentService';

interface PageContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: PageId;
  currentUserName: string;
  currentUserRole: UserRole;
  onNavigateToAdmin?: () => void;
}

export const PageContentEditorModal: React.FC<PageContentEditorModalProps> = ({
  isOpen,
  onClose,
  pageId,
  currentUserName,
  currentUserRole,
  onNavigateToAdmin,
}) => {
  const [formData, setFormData] = useState<PageContentData | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'add_section'>('general');
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // New section form state
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionBullets, setNewSectionBullets] = useState('');
  const [newSectionIsProvisional, setNewSectionIsProvisional] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const data = getPageContent(pageId);
      // deep clone to avoid mutating directly
      setFormData(JSON.parse(JSON.stringify(data)));
      setSaveSuccess(false);
      setConfirmReset(false);
      setActiveTab('general');
      setExpandedSectionIndex(0);
    }
  }, [isOpen, pageId]);

  if (!isOpen || !formData) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData) return;

    savePageContent(formData, currentUserName);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2800);
  };

  const handleReset = () => {
    const defaultData = resetPageToDefault(pageId, currentUserName);
    setFormData(JSON.parse(JSON.stringify(defaultData)));
    setConfirmReset(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2800);
  };

  const handleSectionChange = (index: number, field: keyof PageSectionData, value: any) => {
    if (!formData) return;
    const sections = [...formData.sections];
    sections[index] = { ...sections[index], [field]: value };
    setFormData({ ...formData, sections });
  };

  const handleBulletsChange = (index: number, rawText: string) => {
    if (!formData) return;
    const bullets = rawText
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    handleSectionChange(index, 'bullets', bullets);
  };

  const handleDeleteSection = (index: number) => {
    if (!formData) return;
    const sections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections });
  };

  const handleAddNewSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !newSectionTitle.trim()) return;

    const bullets = newSectionBullets
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const newSec: PageSectionData = {
      id: `sec-${Date.now()}`,
      title: newSectionTitle.trim(),
      subtitle: newSectionSubtitle.trim() || undefined,
      content: newSectionContent.trim(),
      bullets: bullets.length > 0 ? bullets : undefined,
      isProvisional: newSectionIsProvisional,
    };

    setFormData({
      ...formData,
      sections: [...formData.sections, newSec],
    });

    setNewSectionTitle('');
    setNewSectionSubtitle('');
    setNewSectionContent('');
    setNewSectionBullets('');
    setNewSectionIsProvisional(false);
    setActiveTab('sections');
    setExpandedSectionIndex(formData.sections.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-stone-100 text-xs">
        {/* Modal Header */}
        <div className="bg-stone-950 p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 uppercase">
                  Édition en direct • /{pageId}
                </span>
                <span className="text-[10px] text-stone-400">
                  Par {currentUserName} ({currentUserRole})
                </span>
              </div>
              <h2 className="font-serif-royal text-base sm:text-lg font-bold text-white mt-0.5">
                Modifier le contenu : {formData.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onNavigateToAdmin && (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                title="Ouvrir la console complète d'administration"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] font-semibold transition-colors"
              >
                <span>Console Admin</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-stone-950/50 px-4 sm:px-6 pt-3 border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-2 font-semibold text-xs border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>En-tête & Présentation ({pageId})</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3.5 py-2 font-semibold text-xs border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sections'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sections de contenu ({formData.sections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_section')}
            className={`px-3.5 py-2 font-semibold text-xs border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'add_section'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter une rubrique</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {saveSuccess && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold">
                  Modifications enregistrées avec succès ! La page a été mise à jour en direct.
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Visible immédiatement</span>
            </div>
          )}

          {/* TAB 1: General Header & Presentation */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                <h3 className="font-bold text-stone-200 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Titres & Accroches Officielles</span>
                </h3>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Titre principal de la page</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Sous-titre / Slogan de la rubrique</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Description générale & Présentation institutionnelle</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-300">Badge supérieur (ex: "Portail Officiel • Section 01")</label>
                    <input
                      type="text"
                      value={formData.badge || ''}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="Portail Officiel • Section XX"
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-300">Dernière mise à jour affichée</label>
                    <input
                      type="text"
                      value={formData.lastUpdated}
                      onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Avis de contenu provisoire [À compléter]</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.provisionalNotice || ''}
                    onChange={(e) => setFormData({ ...formData, provisionalNotice: e.target.value })}
                    placeholder="Mention affichée si des données historiques ou administratives sont en attente de collationnement..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-amber-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Sections List & Editors */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                <span>
                  Cette page comporte <strong className="text-amber-400">{formData.sections.length}</strong> section(s) modifiable(s).
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('add_section')}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ajouter une section</span>
                </button>
              </div>

              {formData.sections.map((section, idx) => {
                const isExpanded = expandedSectionIndex === idx;
                return (
                  <div
                    key={section.id || idx}
                    className="bg-stone-950/70 border border-stone-800 rounded-2xl overflow-hidden transition-all"
                  >
                    <div
                      onClick={() => setExpandedSectionIndex(isExpanded ? -1 : idx)}
                      className="p-3 sm:p-4 bg-stone-950 cursor-pointer flex items-center justify-between gap-3 hover:bg-stone-900/80 transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-stone-800 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-stone-100 truncate text-xs sm:text-sm">
                            {section.title || `Section sans titre #${idx + 1}`}
                          </h4>
                          {section.subtitle && (
                            <p className="text-[11px] text-stone-400 truncate">{section.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {section.isProvisional && (
                          <span className="text-[10px] bg-amber-950/80 border border-amber-800 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                            À compléter
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Supprimer définitivement la section "${section.title}" ?`)) {
                              handleDeleteSection(idx);
                            }
                          }}
                          className="p-1 rounded text-stone-500 hover:text-red-400 transition-colors"
                          title="Supprimer la section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 sm:p-5 border-t border-stone-800 space-y-3 bg-stone-900/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="font-bold text-stone-300">Titre de la section</label>
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-amber-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-stone-300">Sous-titre / Accroche</label>
                            <input
                              type="text"
                              value={section.subtitle || ''}
                              onChange={(e) => handleSectionChange(idx, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-stone-300">Texte principal & Paragraphes</label>
                          <textarea
                            rows={4}
                            value={section.content}
                            onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white leading-relaxed focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-stone-300 flex items-center justify-between">
                            <span>Points clés & Puces (un élément par ligne)</span>
                            <span className="text-[10px] text-stone-500 font-normal">Optionnel</span>
                          </label>
                          <textarea
                            rows={3}
                            value={(section.bullets || []).join('\n')}
                            onChange={(e) => handleBulletsChange(idx, e.target.value)}
                            placeholder="Arrondissement de Nlonako&#10;Chefferie de 3e degré&#10;Mont Nlonako"
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 font-mono text-[11px] focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                          <label className="flex items-center space-x-2 cursor-pointer text-stone-300">
                            <input
                              type="checkbox"
                              checked={section.isProvisional || false}
                              onChange={(e) => handleSectionChange(idx, 'isProvisional', e.target.checked)}
                              className="rounded bg-stone-950 border-stone-700 text-amber-500 focus:ring-amber-500"
                            />
                            <span className="text-[11px]">
                              Marquer comme « Contenu provisoire en attente de collationnement [À compléter] »
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={() => handleSave()}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold inline-flex items-center gap-1 shadow"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Enregistrer cette section</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: Add New Section */}
          {activeTab === 'add_section' && (
            <form onSubmit={handleAddNewSection} className="bg-stone-950/70 p-5 rounded-2xl border border-stone-800 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-2">
                <Plus className="w-4 h-4" />
                <span>Créer une nouvelle rubrique pour cette page</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Titre de la nouvelle rubrique *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Les Lieux Sacrés & Arbre à Palabres"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Sous-titre / Catégorie</label>
                  <input
                    type="text"
                    placeholder="Ex: Patrimoine Coutumier & Rites"
                    value={newSectionSubtitle}
                    onChange={(e) => setNewSectionSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Texte explicatif & Paragraphes *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Rédigez les explications, faits historiques ou descriptions..."
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Points clés / Liste à puces (une ligne par puce)</label>
                <textarea
                  rows={3}
                  placeholder="Premier point fort&#10;Deuxième point fort&#10;Troisième point"
                  value={newSectionBullets}
                  onChange={(e) => setNewSectionBullets(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 font-mono text-[11px] focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer text-stone-300">
                <input
                  type="checkbox"
                  checked={newSectionIsProvisional}
                  onChange={(e) => setNewSectionIsProvisional(e.target.checked)}
                  className="rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-[11px]">Marquer comme élément provisoire [À compléter]</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('sections')}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insérer dans la page</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-950 p-4 sm:p-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-stone-400 hover:text-stone-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rétablir les valeurs par défaut officielles</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-700">
                <span className="text-amber-400 text-[11px] font-bold">Confirmer la réinitialisation ?</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px]"
                >
                  Oui, rétablir
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px]"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold transition-colors"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all active:scale-[0.98]"
            >
              <Save className="w-4 h-4 text-stone-950" />
              <span>Enregistrer & Publier en direct</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
