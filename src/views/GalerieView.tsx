import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Image as ImageIcon, Video, Filter, Maximize2, X, Film, Play, Pause,
  ChevronLeft, ChevronRight, Search, Calendar, MapPin, User, Landmark,
  Compass, Mountain, Sparkles, Crown, Users, GraduationCap, Wheat,
  Hammer, Target, Award, Globe, Share2, Check, Clock, ShieldCheck,
  FolderHeart, Layers, ArrowUpRight, Info, Eye
} from 'lucide-react';
import { PageId, GalleryAlbum, MultimediaItem, PatrimoineItem } from '../types';
import {
  ALBUMS_LIST,
  getStoredMedia,
  getStoredPatrimoine
} from '../services/galleryService';
import { AdminGalleryModal } from '../components/AdminGalleryModal';

interface GalerieViewProps {
  onNavigate: (page: PageId) => void;
}

export const GalerieView: React.FC<GalerieViewProps> = ({ onNavigate }) => {
  // Navigation tabs: 'galerie' | 'patrimoine'
  const [currentTab, setCurrentTab] = useState<'galerie' | 'patrimoine'>('galerie');

  // Media data & filters
  const [mediaItems, setMediaItems] = useState<MultimediaItem[]>([]);
  const [patrimoineItems, setPatrimoineItems] = useState<PatrimoineItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | 'Tous'>('Tous');
  const [selectedMediaType, setSelectedMediaType] = useState<'tous' | 'photo' | 'video'>('tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Patrimoine category filter
  const [selectedPatrimoineCategory, setSelectedPatrimoineCategory] = useState<string>('Tous');

  // Lightbox & Slideshow state
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);
  const [slideshowSpeed, setSlideshowSpeed] = useState<number>(4000); // 4s
  const [slideshowProgress, setSlideshowProgress] = useState<number>(0);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(true);

  // Admin Modal
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminDefaultTab, setAdminDefaultTab] = useState<'media' | 'patrimoine'>('media');

  // Share notification
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Listen to updates from localStorage service
  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('ntolo_gallery_updated', handleUpdate);
    return () => window.removeEventListener('ntolo_gallery_updated', handleUpdate);
  }, []);

  const loadData = () => {
    setMediaItems(getStoredMedia());
    setPatrimoineItems(getStoredPatrimoine());
  };

  // Filtered media list
  const filteredMedia = useMemo(() => {
    let result = [...mediaItems];

    if (selectedAlbum !== 'Tous') {
      result = result.filter((m) => m.album === selectedAlbum);
    }

    if (selectedMediaType !== 'tous') {
      result = result.filter((m) => m.type === selectedMediaType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.caption.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q) ||
          (m.author && m.author.toLowerCase().includes(q)) ||
          m.album.toLowerCase().includes(q)
      );
    }

    return result;
  }, [mediaItems, selectedAlbum, selectedMediaType, searchQuery]);

  // Filtered patrimoine list
  const filteredPatrimoine = useMemo(() => {
    let result = [...patrimoineItems];

    if (selectedPatrimoineCategory !== 'Tous') {
      result = result.filter((p) => p.category === selectedPatrimoineCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.custodian.toLowerCase().includes(q) ||
          (p.significance && p.significance.toLowerCase().includes(q))
      );
    }

    return result;
  }, [patrimoineItems, selectedPatrimoineCategory, searchQuery]);

  // Slideshow timer
  useEffect(() => {
    if (!isSlideshowRunning || activeMediaIndex === null) {
      setSlideshowProgress(0);
      return;
    }

    const intervalTime = 100;
    const step = (intervalTime / slideshowSpeed) * 100;

    const timer = setInterval(() => {
      setSlideshowProgress((prev) => {
        if (prev >= 100) {
          handleNextMedia();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isSlideshowRunning, activeMediaIndex, slideshowSpeed, filteredMedia.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMediaIndex === null) return;

      if (e.key === 'ArrowRight') {
        handleNextMedia();
      } else if (e.key === 'ArrowLeft') {
        handlePrevMedia();
      } else if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshowRunning((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMediaIndex, filteredMedia.length]);

  const openLightbox = (index: number) => {
    setActiveMediaIndex(index);
    setSlideshowProgress(0);
  };

  const closeLightbox = () => {
    setActiveMediaIndex(null);
    setIsSlideshowRunning(false);
    setSlideshowProgress(0);
  };

  const handleNextMedia = () => {
    if (activeMediaIndex === null || filteredMedia.length === 0) return;
    setActiveMediaIndex((prev) => (prev !== null ? (prev + 1) % filteredMedia.length : 0));
    setSlideshowProgress(0);
  };

  const handlePrevMedia = () => {
    if (activeMediaIndex === null || filteredMedia.length === 0) return;
    setActiveMediaIndex((prev) => (prev !== null ? (prev - 1 + filteredMedia.length) % filteredMedia.length : 0));
    setSlideshowProgress(0);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  const currentMedia = activeMediaIndex !== null ? filteredMedia[activeMediaIndex] : null;

  // Icon mapping for albums
  const getAlbumIcon = (albumId: GalleryAlbum) => {
    switch (albumId) {
      case 'Ntolo aujourd’hui': return Compass;
      case 'Paysages': return Mountain;
      case 'Culture et traditions': return Sparkles;
      case 'Cérémonies': return Crown;
      case 'Jeunesse': return Users;
      case 'Éducation': return GraduationCap;
      case 'Agriculture': return Wheat;
      case 'Infrastructures': return Hammer;
      case 'Projets': return Target;
      case 'Personnalités': return Award;
      case 'Diaspora': return Globe;
      default: return ImageIcon;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/60 pb-16">
      {/* Header Institutionnel */}
      <section className="bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Médiathèque Officielle • Section 14</span>
              </div>
              <h1 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Galerie & Patrimoine de Ntolo
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Archives photographiques, reportages vidéo et inventaire patrimonial du terroir sous le Mont Nlonako.
              </p>
            </div>

            {/* Admin Management Trigger & Citizen Contribution */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('ntolo_open_community_modal', { detail: { type: 'media' } }))}
                className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Envoyer une Photo / Vidéo</span>
              </button>

              <button
                onClick={() => {
                  setAdminDefaultTab(currentTab === 'patrimoine' ? 'patrimoine' : 'media');
                  setIsAdminModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2"
              >
                <FolderHeart className="w-4 h-4" />
                <span>Gérer la Médiathèque</span>
              </button>

              <button
                onClick={() => {
                  if (filteredMedia.length > 0) {
                    openLightbox(0);
                    setIsSlideshowRunning(true);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lancer le Diaporama</span>
              </button>
            </div>
          </div>

          {/* Main View Switcher: Galerie Médias VS Patrimoine de Ntolo */}
          <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80">
            <button
              onClick={() => setCurrentTab('galerie')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'galerie'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Albums Photos & Vidéos ({mediaItems.length})</span>
            </button>

            <button
              onClick={() => setCurrentTab('patrimoine')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'patrimoine'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Patrimoine de Ntolo ({patrimoineItems.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {currentTab === 'galerie' ? (
          /* =========================================================================
             SECTION GALERIE MULTIMÉDIA (ALBUMS, PHOTOS, VIDÉOS)
             ========================================================================= */
          <div className="space-y-6">
            {/* Search and Media Type Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une photo, un lieu, un auteur ou une légende..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Type selector: Photos / Vidéos */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Format :</span>
                {[
                  { id: 'tous', label: 'Tout' },
                  { id: 'photo', label: 'Photos' },
                  { id: 'video', label: 'Vidéos' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedMediaType(t.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedMediaType === t.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* The 11 Albums Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Albums Thématiques Officiels ({ALBUMS_LIST.length})</span>
                </span>
                <span className="text-xs text-slate-500">
                  {selectedAlbum === 'Tous' ? 'Affichage global' : `Album : ${selectedAlbum}`}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                <button
                  onClick={() => setSelectedAlbum('Tous')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
                    selectedAlbum === 'Tous'
                      ? 'bg-emerald-900 text-white shadow-sm ring-2 ring-emerald-700'
                      : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Tous les albums ({mediaItems.length})
                </button>

                {ALBUMS_LIST.map((album) => {
                  const IconComp = getAlbumIcon(album.id);
                  const count = mediaItems.filter((m) => m.album === album.id).length;
                  const isSelected = selectedAlbum === album.id;

                  return (
                    <button
                      key={album.id}
                      onClick={() => setSelectedAlbum(album.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-amber-400'
                          : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`} />
                      <span>{album.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-950 text-amber-200' : 'bg-stone-100 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Items Grid */}
            {filteredMedia.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
                <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">Aucun média ne correspond à vos filtres</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Modifiez votre mot-clé de recherche ou sélectionnez un autre album.
                </p>
                <button
                  onClick={() => {
                    setSelectedAlbum('Tous');
                    setSelectedMediaType('tous');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((item, idx) => {
                  const IconComp = getAlbumIcon(item.album);

                  return (
                    <div
                      key={item.id}
                      onClick={() => openLightbox(idx)}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Visual Header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white text-xs font-bold flex items-center gap-1.5">
                            <Maximize2 className="w-4 h-4 text-amber-300" />
                            <span>Agrandir / Diaporama</span>
                          </span>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900/85 backdrop-blur-md text-amber-300 border border-stone-700/60 flex items-center gap-1 shadow-sm">
                            <IconComp className="w-3 h-3 text-amber-400" />
                            <span>{item.album}</span>
                          </span>

                          {item.type === 'video' ? (
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
                              <Video className="w-3 h-3" />
                              <span>{item.duration || 'Vidéo'}</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-slate-800 backdrop-blur-md">
                              Photo
                            </span>
                          )}
                        </div>

                        {/* Video Play indicator */}
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Meta & Caption */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-900 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.caption}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex flex-col gap-1 text-[11px] text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-slate-600 font-medium truncate max-w-[170px]">
                              <MapPin className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                              <span className="truncate">{item.location}</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                              <Calendar className="w-3 h-3" />
                              <span>{item.date}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-stone-500 italic truncate">
                            <User className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">
                              Auteur : {item.author || '[À renseigner]'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* =========================================================================
             SECTION PATRIMOINE DE NTOLO (LIEUX, OBJETS, TRADITIONS, ÉVÉNEMENTS)
             ========================================================================= */
          <div className="space-y-8">
            {/* Intro Banner Patrimoine */}
            <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>RÉPERTOIRE DU PATRIMOINE MATÉRIEL & IMMATÉRIEL</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-royal text-white">
                    Le Patrimoine Sacré & Séculaire de Ntolo
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setAdminDefaultTab('patrimoine');
                    setIsAdminModalOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <FolderHeart className="w-4 h-4" />
                  <span>Enrichir le Patrimoine</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 max-w-4xl leading-relaxed">
                Ce recueil officiel présente les sanctuaires naturels, insignes d’autorité, rites coutumiers et rassemblements fondateurs de notre terroir. Les informations sont consignées sous le contrôle du Conseil des Sages et portent la mention <span className="text-amber-300 font-semibold">[À renseigner]</span> lorsqu’un travail de documentation est en cours.
              </p>

              {/* 4 Pillars count */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: 'Lieux remarquables', count: patrimoineItems.filter((p) => p.category === 'Lieu').length },
                  { label: 'Objets & Insignes', count: patrimoineItems.filter((p) => p.category === 'Objet').length },
                  { label: 'Traditions & Rites', count: patrimoineItems.filter((p) => p.category === 'Tradition').length },
                  { label: 'Événements majeurs', count: patrimoineItems.filter((p) => p.category === 'Événement').length },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60 text-center">
                    <span className="block text-xl font-extrabold text-amber-400">{stat.count}</span>
                    <span className="text-[11px] text-stone-300 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter by Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-800" />
                <span className="text-xs font-bold text-slate-700">Filtrer par nature :</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Tous', 'Lieu', 'Objet', 'Tradition', 'Événement'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPatrimoineCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedPatrimoineCategory === cat
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat === 'Tous' ? 'Tout le patrimoine' : cat === 'Lieu' ? 'Lieux & Sanctuaires' : cat === 'Objet' ? 'Objets & Insignes' : cat === 'Tradition' ? 'Traditions & Rites' : 'Événements fondateurs'}
                  </button>
                ))}
              </div>
            </div>

            {/* Patrimoine Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatrimoine.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Image banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl || '/src/assets/images/village_tradition_craft_1790154848784.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow-sm">
                      {item.category}
                    </span>
                    <span className="absolute bottom-2 left-3 right-3 text-xs text-white font-bold truncate">
                      {item.title}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                        <span>{item.status}</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {item.significance && (
                        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-slate-700 space-y-0.5">
                          <span className="font-bold text-emerald-900 block text-[10px] uppercase tracking-wider">
                            Portée symbolique :
                          </span>
                          <p className="italic leading-snug">{item.significance}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                        <span className="truncate">Lieu : {item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span className="truncate">Gardien : {item.custodian}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL PLEIN ÉCRAN & DIAPORAMA (LIGHTBOX AVEC COMMANDES)
          ========================================================================= */}
      {currentMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md animate-in fade-in">
          {/* Slideshow Top Progress Bar */}
          {isSlideshowRunning && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-stone-800 z-50">
              <div
                className="h-full bg-amber-400 transition-all duration-100 ease-linear"
                style={{ width: `${slideshowProgress}%` }}
              ></div>
            </div>
          )}

          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20">
                {activeMediaIndex! + 1} / {filteredMedia.length}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-800/80 text-emerald-200 hidden sm:inline">
                {currentMedia.album}
              </span>
            </div>

            {/* Middle Slideshow Control Buttons */}
            <div className="flex items-center space-x-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-stone-700">
              <button
                onClick={() => setIsSlideshowRunning((prev) => !prev)}
                className={`p-2 rounded-xl transition-colors ${
                  isSlideshowRunning ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-white/10 text-white'
                }`}
                title={isSlideshowRunning ? 'Mettre en pause' : 'Démarrer le diaporama'}
              >
                {isSlideshowRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <select
                value={slideshowSpeed}
                onChange={(e) => setSlideshowSpeed(Number(e.target.value))}
                className="bg-stone-800 text-xs text-stone-200 rounded-lg px-2 py-1 border border-stone-700 focus:outline-none"
                title="Vitesse du diaporama"
              >
                <option value={3000}>3 sec</option>
                <option value={5000}>5 sec</option>
                <option value={8000}>8 sec</option>
              </select>

              <button
                onClick={() => setShowDetailsOverlay((prev) => !prev)}
                className={`p-2 rounded-xl transition-colors ${
                  showDetailsOverlay ? 'text-amber-300' : 'text-stone-400 hover:text-white'
                }`}
                title="Afficher/masquer les détails"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Partager le lien"
              >
                {copyFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Fermer (Échap)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrevMedia}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white border border-stone-700/60 transition-all hover:scale-110"
            title="Précédent (Flèche gauche)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextMedia}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white border border-stone-700/60 transition-all hover:scale-110"
            title="Suivant (Flèche droite)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Media Container */}
          <div className="relative max-w-5xl w-full h-[75vh] flex items-center justify-center px-4 sm:px-16">
            {currentMedia.type === 'video' && currentMedia.videoUrl ? (
              <div className="w-full h-full max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <iframe
                  src={currentMedia.videoUrl}
                  title={currentMedia.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={currentMedia.mediaUrl}
                alt={currentMedia.title}
                decoding="async"
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl select-none"
              />
            )}
          </div>

          {/* Bottom Information Overlay */}
          {showDetailsOverlay && (
            <div className="absolute bottom-4 left-4 right-4 max-w-4xl mx-auto z-40 bg-stone-950/85 backdrop-blur-md text-white rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-2xl space-y-2 animate-in slide-in-from-bottom-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-slate-950">
                    {currentMedia.album}
                  </span>
                  <span className="text-xs text-stone-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Prise de vue : {currentMedia.date}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentMedia.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auteur : {currentMedia.author || '[À renseigner]'}</span>
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-white text-base sm:text-lg">
                {currentMedia.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentMedia.caption}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Admin Modal for Gallery & Patrimoine */}
      <AdminGalleryModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        defaultTab={adminDefaultTab}
      />
    </div>
  );
};
