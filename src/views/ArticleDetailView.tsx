import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Calendar, User, Clock, Eye, Share2, Check,
  Download, FileText, Image as ImageIcon, ChevronRight,
  ShieldCheck, AlertTriangle, MessageCircle, Twitter, Facebook,
  Link, X, ChevronLeft, ExternalLink, Bookmark
} from 'lucide-react';
import { PageId, PublicationItem } from '../types';
import {
  getPublicationById,
  getStoredPublications,
  incrementPublicationViews,
} from '../services/publicationService';
import { NtoloLogo } from '../components/NtoloLogo';

interface ArticleDetailViewProps {
  articleId: string;
  onNavigate: (page: PageId) => void;
  onSelectArticle: (articleId: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  articleId,
  onNavigate,
  onSelectArticle,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState<string | null>(null);

  const article = getPublicationById(articleId);

  // Increment views count once on mount
  useEffect(() => {
    if (articleId) {
      incrementPublicationViews(articleId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-amber-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Article ou publication introuvable</h2>
        <p className="text-sm text-slate-600">
          Cette publication a peut-être été déplacée, archivée ou retirée par la rédaction.
        </p>
        <button
          onClick={() => onNavigate('actualites')}
          className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retourner aux actualités</span>
        </button>
      </div>
    );
  }

  // Related articles in same category
  const allPublications = getStoredPublications();
  const relatedArticles = allPublications
    .filter((p) => p.id !== article.id && (p.category === article.category || p.published))
    .slice(0, 3);

  // Share handlers
  const articleUrl = window.location.href;
  const shareTitle = `${article.title} - Portail Officiel du Village de Ntolo`;
  const shareText = `${article.title}\n${article.summary}\nConsultez l’article officiel sur le portail de Ntolo :`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + articleUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(articleUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadDoc = (docTitle: string) => {
    setDownloadSuccessDoc(docTitle);
    setTimeout(() => setDownloadSuccessDoc(null), 3500);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between flex-wrap gap-3 text-xs">
          <button
            onClick={() => onNavigate(article.category === 'Annonces' ? 'annonces' : 'actualites')}
            className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à {article.category === 'Annonces' ? 'la liste des annonces' : 'toutes les actualités'}</span>
          </button>

          <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
            <button onClick={() => onNavigate('accueil')} className="hover:underline">Accueil</button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button onClick={() => onNavigate('actualites')} className="hover:underline">Actualités</button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-emerald-800">{article.category}</span>
          </div>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-8 p-6 sm:p-10">
          
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-stone-100 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                {article.category}
              </span>
              {article.isUrgent && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border border-red-200 uppercase tracking-wide">
                  Avis Urgent / Communiqué Officiel
                </span>
              )}
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                Lecture ~ {article.readTimeMinutes || 3} min
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Author and Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-300 font-bold flex items-center justify-center text-sm shadow-sm">
                  {article.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{article.author}</div>
                  <div className="text-[11px] text-slate-500">{article.authorRole || 'Rédaction Officielle de Ntolo'}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{article.viewsCount || 1} consultations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Hero Image */}
          {article.imageUrl && (
            <div className="space-y-2">
              <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-inner relative group border border-stone-200">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-400 italic text-right">
                Illustration officielle • Village de Ntolo, Région du Littoral
              </p>
            </div>
          )}

          {/* Executive Summary (Chapeau) */}
          <div className="bg-emerald-50/70 border-l-4 border-emerald-800 p-4 sm:p-5 rounded-r-2xl">
            <p className="text-sm sm:text-base font-semibold text-emerald-950 leading-relaxed italic">
              « {article.summary} »
            </p>
          </div>

          {/* Full Article Content */}
          <div className="space-y-5 text-slate-800 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-emerald-950">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photo Gallery if available */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-800" />
                  <span>Galerie de reportage ({article.gallery.length} clichés)</span>
                </h3>
                <span className="text-[11px] text-slate-400">Cliquez pour agrandir</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {article.gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    onClick={() => setActiveLightboxIndex(gIdx)}
                    className="aspect-video rounded-xl overflow-hidden border border-stone-200 cursor-pointer group relative shadow-sm"
                  >
                    <img
                      src={imgUrl}
                      alt={`Photo ${gIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-1.5 rounded-full bg-white/90 text-slate-800">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attached Documents if available */}
          {article.attachedDocuments && article.attachedDocuments.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-stone-200">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Documents officiels & pièces jointes ({article.attachedDocuments.length})</span>
              </h3>

              {downloadSuccessDoc && (
                <div className="p-3 bg-emerald-100 text-emerald-900 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Téléchargement initié : <strong>{downloadSuccessDoc}</strong>.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.attachedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                        {doc.fileType || 'PDF'}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 line-clamp-1">{doc.title}</div>
                        <div className="text-[11px] text-slate-500">Document certifié • {doc.fileSize || '1.2 Mo'}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadDoc(doc.title)}
                      className="p-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-stone-200 hover:border-emerald-300 transition-colors"
                      title="Télécharger la pièce jointe"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Section (Mandatory Feature) */}
          <div className="pt-6 border-t border-stone-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-emerald-800" />
                  <span>Partager cette information officielle</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Diffusez auprès de vos proches, de la communauté villageoise et de la diaspora.
                </p>
              </div>

              {/* Share buttons */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  title="Partager sur WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleShareFacebook}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  title="Partager sur Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>

                <button
                  onClick={handleShareTwitter}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  title="Partager sur X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                  <span>X / Twitter</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-slate-700 border border-stone-300 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  title="Copier le lien permanent"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-700">Lien copié !</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      <span>Copier le lien</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Official Seal / Source Verification Footer */}
          <div className="bg-stone-100 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-800">Diffusion conforme aux directives de la Chefferie :</span> Cet article est rédigé sous la responsabilité éditoriale des organes coutumiers et du CODEV de Ntolo.
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-lg text-slate-900">
              Dans la même catégorie ou actualité récente
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.id)}
                  className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-32 rounded-xl object-cover mb-2"
                    />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-between border-t border-stone-100 mt-2">
                    <span>{rel.date}</span>
                    <span className="text-emerald-700 font-bold group-hover:underline">Lire →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {activeLightboxIndex !== null && article.gallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          {activeLightboxIndex > 0 && (
            <button
              onClick={() => setActiveLightboxIndex(activeLightboxIndex - 1)}
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] text-center space-y-2">
            <img
              src={article.gallery[activeLightboxIndex]}
              alt="Agrandissement"
              className="max-h-[75vh] w-auto max-w-full mx-auto rounded-xl object-contain"
            />
            <p className="text-xs text-stone-300">
              Photo {activeLightboxIndex + 1} sur {article.gallery.length} • {article.title}
            </p>
          </div>

          {activeLightboxIndex < article.gallery.length - 1 && (
            <button
              onClick={() => setActiveLightboxIndex(activeLightboxIndex + 1)}
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
