import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell, AlertTriangle, Clock, Calendar, User, Search,
  Share2, ChevronRight, PlusCircle, ShieldCheck, FileText,
  Check, Filter, Megaphone, Printer, Pin
} from 'lucide-react';
import { PageId, PublicationItem } from '../types';
import { getStoredPublications } from '../services/publicationService';
import { AdminPublicationModal } from '../components/AdminPublicationModal';
import { VILLAGE_INFO } from '../data/villageData';

interface AnnoncesViewProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (articleId: string) => void;
}

export const AnnoncesView: React.FC<AnnoncesViewProps> = ({
  onNavigate,
  onSelectArticle,
}) => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'tous' | 'urgents' | 'chefferie' | 'necrologie'>('tous');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadAnnouncements = () => {
    setPublications(getStoredPublications());
  };

  useEffect(() => {
    loadAnnouncements();
    const handleStorageUpdate = () => loadAnnouncements();
    window.addEventListener('ntolo_publications_updated', handleStorageUpdate);
    return () => window.removeEventListener('ntolo_publications_updated', handleStorageUpdate);
  }, []);

  // Filter for Announcements (category 'Annonces' or has isUrgent)
  const announcements = useMemo(() => {
    return publications.filter((p) => {
      if (!p.published) return false;
      const isAnnouncementCategory = p.category === 'Annonces' || p.isUrgent;
      if (!isAnnouncementCategory) return false;

      // Filter sub-type
      if (filterType === 'urgents' && !p.isUrgent) return false;
      if (filterType === 'chefferie' && !p.author.toLowerCase().includes('chefferie')) return false;
      if (filterType === 'necrologie' && !p.title.toLowerCase().includes('décès') && !p.title.toLowerCase().includes('obsèques')) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [publications, filterType, searchQuery]);

  const handleShare = (e: React.MouseEvent, item: PublicationItem) => {
    e.stopPropagation();
    const url = window.location.origin + `/#article-${item.id}`;
    navigator.clipboard.writeText(`[Avis Officiel Ntolo] ${item.title} : ${url}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
              <Megaphone className="w-3.5 h-3.5 text-amber-800" />
              <span>PANNEAU D'AFFICHAGE OFFICIEL DU VILLAGE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Annonces, Avis & Communiqués
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Tableau officiel des notifications de Sa Majesté le Chef, convocations aux réunions communautaires, avis de salongo, nécrologie et alertes d'utilité publique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              title="Imprimer le tableau d'affichage"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Imprimer</span>
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Publier un avis</span>
            </button>
          </div>
        </div>

        {/* Noticeboard Information Strip */}
        <div className="bg-emerald-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-300 block">Valeur légale des affichages officiels</span>
              <span className="text-stone-300 text-[11px]">
                Tout avis scellé sur ce portail est certifié conforme au registre du Secrétariat Royal de Ntolo.
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('actualites')}
            className="text-amber-300 hover:underline text-xs font-semibold flex-shrink-0"
          >
            Voir aussi les actualités générales →
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une annonce..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('tous')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'tous'
                  ? 'bg-slate-900 text-white'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              Tous les avis
            </button>
            <button
              onClick={() => setFilterType('urgents')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'urgents'
                  ? 'bg-red-700 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              Urgences & Alertes
            </button>
            <button
              onClick={() => setFilterType('chefferie')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'chefferie'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Chefferie & Sages
            </button>
            <button
              onClick={() => setFilterType('necrologie')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'necrologie'
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Faire-part & Obsèques
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 space-y-3">
              <Bell className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-base text-slate-800">Aucune annonce ne correspond à ce filtre</h3>
              <p className="text-xs text-slate-500">Tous les avis officiels sont à jour.</p>
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id)}
                className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all cursor-pointer group flex flex-col sm:flex-row gap-5 items-start justify-between ${
                  item.isUrgent
                    ? 'bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 border-red-200 hover:border-red-400'
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-slate-400">
                      <Pin className="w-3 h-3 text-amber-600" />
                      NTOLO-AVIS-{item.id.slice(-6).toUpperCase()}
                    </span>
                    {item.isUrgent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600 text-white uppercase tracking-wider animate-pulse">
                        Avis Urgent
                      </span>
                    )}
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      • Émis par : <strong className="text-slate-700">{item.author}</strong>
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Attached docs preview pill */}
                  {item.attachedDocuments && item.attachedDocuments.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{item.attachedDocuments.length} document(s) officiel(s) annexé(s)</span>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 w-full sm:w-auto flex-shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  <button
                    onClick={(e) => handleShare(e, item)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    title="Partager cet avis"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">Partager</span>
                  </button>

                  <span className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold group-hover:bg-emerald-900 transition-colors flex items-center gap-1 shadow-sm">
                    <span>Ouvrir l’avis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Admin Publication Modal */}
      <AdminPublicationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onPublicationsChanged={loadAnnouncements}
      />
    </div>
  );
};
