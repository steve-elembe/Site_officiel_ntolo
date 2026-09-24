import React, { useState } from 'react';
import { FileText, Download, Eye, ShieldCheck, CheckCircle2, Search, Filter } from 'lucide-react';
import { PageId, DocumentItem } from '../types';
import { SAMPLE_DOCUMENTS } from '../data/villageData';

interface DocumentsViewProps {
  onNavigate: (page: PageId) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onNavigate }) => {
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Statuts', 'Administration', 'Fiches Projets', 'Formulaires'];

  const filteredDocs = filterCategory === 'Tous'
    ? SAMPLE_DOCUMENTS
    : SAMPLE_DOCUMENTS.filter((d) => d.category === filterCategory);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadSuccessDoc(doc.title);
    setTimeout(() => {
      setDownloadSuccessDoc(null);
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-3">
          <FileText className="w-3.5 h-3.5 text-emerald-800" />
          <span>Section 15 • Centre de Documentation Officiel</span>
        </div>
        <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Documents & Textes de Référence de Ntolo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Consultation et téléchargement des statuts du comité, guides d'état civil, fiches techniques et formulaires administratifs.
        </p>
      </div>

      {/* Success alert */}
      {downloadSuccessDoc && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <div>
            <strong>Document préparé :</strong> Le fichier numérique « {downloadSuccessDoc} » est prêt pour consultation hors-ligne.
          </div>
        </div>
      )}

      {/* Filter by Category */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-emerald-800" />
          <span>Type de document :</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                {doc.fileType}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Réf : {doc.referenceCode}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {doc.description}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Publié le {doc.datePublished} • Poids : {doc.fileSize}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Aperçu</span>
              </button>
              <button
                onClick={() => handleDownload(doc)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guide des Actes Administratifs et Coutumiers */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <span>Délivrance des Attestations Coutumières par la Chefferie</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Pour l'établissement d'une <strong>Attestation de Coutume</strong>, d'un <strong>Certificat de Résidence Coutumière</strong> ou d'un acte de cession foncière traditionnelle dans le terroir de Ntolo, les usagers doivent s'adresser au Secrétariat Général de la Chefferie munis de leur Carte Nationale d'Identité (CNI) et se conformer au barème en vigueur.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="text-xs font-bold text-emerald-800 hover:underline"
        >
          Formulaire de demande d'attestation auprès de la Chefferie →
        </button>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {previewDoc.referenceCode}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <p><strong>Catégorie :</strong> {previewDoc.category}</p>
              <p><strong>Format :</strong> {previewDoc.fileType} ({previewDoc.fileSize})</p>
              <p><strong>Dernière révision officielle :</strong> {previewDoc.datePublished}</p>
              <p className="pt-2 border-t border-slate-200 leading-relaxed">
                {previewDoc.description}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2 text-xs font-bold bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger la copie</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('galerie')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← 14. Galerie
        </button>
        <button
          onClick={() => onNavigate('tourisme')}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
        >
          16. Tourisme & Lieux d’Intérêt →
        </button>
      </div>
    </div>
  );
};
