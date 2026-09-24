import React, { useState, useEffect } from 'react';
import {
  X, Lock, ShieldCheck, Plus, Trash2, Edit3, Image as ImageIcon,
  Video, Mountain, Sparkles, MapPin, Calendar, User, Eye, Check,
  AlertCircle, RefreshCw, FolderHeart, Landmark, Info
} from 'lucide-react';
import { GalleryAlbum, MultimediaItem, PatrimoineItem } from '../types';
import {
  ALBUMS_LIST,
  getStoredMedia,
  saveMediaItem,
  deleteMediaItem,
  getStoredPatrimoine,
  savePatrimoineItem,
  deletePatrimoineItem,
  resetGalleryToDefault
} from '../services/galleryService';

interface AdminGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'media' | 'patrimoine';
}

const ADMIN_PASSCODES = ['ntolo2026', 'admin123', 'chefferie'];

export const AdminGalleryModal: React.FC<AdminGalleryModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'media',
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'media' | 'patrimoine'>(defaultTab);
  const [mediaList, setMediaList] = useState<MultimediaItem[]>([]);
  const [patrimoineList, setPatrimoineList] = useState<PatrimoineItem[]>([]);

  // Editing state for Media
  const [editingMedia, setEditingMedia] = useState<MultimediaItem | null>(null);
  const [isCreatingMedia, setIsCreatingMedia] = useState(false);

  // Form fields for Media
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaAlbum, setMediaAlbum] = useState<GalleryAlbum>('Ntolo aujourd’hui');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [mediaUrl, setMediaUrl] = useState('/src/assets/images/hero_ntolo_moungo_1790154817063.jpg');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('Ntolo (Arrondissement de Nlonako)');
  const [author, setAuthor] = useState('Archives Chefferie de Ntolo');

  // Editing state for Patrimoine
  const [editingPatrimoine, setEditingPatrimoine] = useState<PatrimoineItem | null>(null);
  const [isCreatingPatrimoine, setIsCreatingPatrimoine] = useState(false);

  // Form fields for Patrimoine
  const [patTitle, setPatTitle] = useState('');
  const [patCategory, setPatCategory] = useState<'Lieu' | 'Objet' | 'Tradition' | 'Événement'>('Lieu');
  const [patLocation, setPatLocation] = useState('Village de Ntolo');
  const [patCustodian, setPatCustodian] = useState('Sa Majesté et le Conseil des Sages');
  const [patStatus, setPatStatus] = useState('Répertoire coutumier officiel');
  const [patDescription, setPatDescription] = useState('');
  const [patSignificance, setPatSignificance] = useState('');
  const [patImageUrl, setPatImageUrl] = useState('/src/assets/images/village_tradition_craft_1790154848784.jpg');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setMediaList(getStoredMedia());
    setPatrimoineList(getStoredPatrimoine());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PASSCODES.includes(passcode.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const openNewMediaForm = () => {
    setEditingMedia(null);
    setMediaTitle('');
    setMediaAlbum('Ntolo aujourd’hui');
    setMediaType('photo');
    setMediaUrl('/src/assets/images/hero_ntolo_moungo_1790154817063.jpg');
    setVideoUrl('');
    setDuration('');
    setCaption('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocation('Ntolo (Arrondissement de Nlonako)');
    setAuthor('Comité de Développement de Ntolo');
    setIsCreatingMedia(true);
  };

  const openEditMediaForm = (item: MultimediaItem) => {
    setEditingMedia(item);
    setMediaTitle(item.title);
    setMediaAlbum(item.album);
    setMediaType(item.type);
    setMediaUrl(item.mediaUrl);
    setVideoUrl(item.videoUrl || '');
    setDuration(item.duration || '');
    setCaption(item.caption);
    setDate(item.date);
    setLocation(item.location);
    setAuthor(item.author || '[À renseigner]');
    setIsCreatingMedia(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim()) return;

    const newItem: MultimediaItem = {
      id: editingMedia ? editingMedia.id : `med-${Date.now()}`,
      title: mediaTitle.trim(),
      album: mediaAlbum,
      type: mediaType,
      mediaUrl: mediaUrl.trim() || '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
      videoUrl: mediaType === 'video' ? videoUrl.trim() : undefined,
      duration: mediaType === 'video' && duration.trim() ? duration.trim() : undefined,
      caption: caption.trim() || mediaTitle.trim(),
      date: date || new Date().toISOString().split('T')[0],
      location: location.trim() || 'Ntolo',
      author: author.trim() || '[À renseigner]',
      viewsCount: editingMedia ? editingMedia.viewsCount : 0,
    };

    saveMediaItem(newItem);
    setMediaList(getStoredMedia());
    setIsCreatingMedia(false);
    setEditingMedia(null);
    showNotice('Média enregistré avec succès !');
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Voulez-vous vraiment retirer ce média de la médiathèque ?')) {
      deleteMediaItem(id);
      setMediaList(getStoredMedia());
      showNotice('Média supprimé.');
    }
  };

  // Patrimoine handlers
  const openNewPatrimoineForm = () => {
    setEditingPatrimoine(null);
    setPatTitle('');
    setPatCategory('Lieu');
    setPatLocation('Ntolo (Arrondissement de Nlonako)');
    setPatCustodian('Conseil des Notables de Ntolo');
    setPatStatus('Inventaire coutumier [À renseigner]');
    setPatDescription('');
    setPatSignificance('');
    setPatImageUrl('/src/assets/images/village_tradition_craft_1790154848784.jpg');
    setIsCreatingPatrimoine(true);
  };

  const openEditPatrimoineForm = (item: PatrimoineItem) => {
    setEditingPatrimoine(item);
    setPatTitle(item.title);
    setPatCategory(item.category);
    setPatLocation(item.location);
    setPatCustodian(item.custodian);
    setPatStatus(item.status);
    setPatDescription(item.description);
    setPatSignificance(item.significance || '');
    setPatImageUrl(item.imageUrl || '/src/assets/images/village_tradition_craft_1790154848784.jpg');
    setIsCreatingPatrimoine(true);
  };

  const handleSavePatrimoine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patTitle.trim()) return;

    const newItem: PatrimoineItem = {
      id: editingPatrimoine ? editingPatrimoine.id : `pat-${Date.now()}`,
      title: patTitle.trim(),
      category: patCategory,
      location: patLocation.trim() || 'Ntolo',
      custodian: patCustodian.trim() || '[À renseigner]',
      status: patStatus.trim() || 'Inventaire en cours',
      description: patDescription.trim(),
      significance: patSignificance.trim() || undefined,
      imageUrl: patImageUrl.trim() || undefined,
    };

    savePatrimoineItem(newItem);
    setPatrimoineList(getStoredPatrimoine());
    setIsCreatingPatrimoine(false);
    setEditingPatrimoine(null);
    showNotice('Élément patrimonial enregistré avec succès !');
  };

  const handleDeletePatrimoine = (id: string) => {
    if (confirm('Voulez-vous retirer cet élément patrimonial ?')) {
      deletePatrimoineItem(id);
      setPatrimoineList(getStoredPatrimoine());
      showNotice('Élément patrimonial retiré.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Réinitialiser la galerie et le patrimoine aux données initiales de référence ?')) {
      resetGalleryToDefault();
      loadData();
      showNotice('Galerie et Patrimoine restaurés.');
    }
  };

  const showNotice = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-stone-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <FolderHeart className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif-royal flex items-center gap-2">
                <span>Gestionnaire Médiathèque & Patrimoine</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 font-normal">
                  Espace Officiel
                </span>
              </h2>
              <p className="text-xs text-stone-300">
                Administration des albums photos/vidéos et du répertoire patrimonial de Ntolo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-serif-royal">
                Accès Réservé à l’Administration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Veuillez renseigner le code d’accès officiel pour enrichir les albums photos, les capsules vidéos et le patrimoine du village de Ntolo.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Code d'accès (ex: ntolo2026)"
                  className="w-full px-4 py-3 text-center tracking-widest text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-600 font-semibold mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Code d'accès incorrect. Essayez « ntolo2026 ».
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors"
              >
                Déverrouiller le Gestionnaire
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400 bg-stone-50 p-2.5 rounded-xl border border-stone-200 w-full text-left">
              <p className="font-semibold text-slate-600 mb-0.5">Note institutionnelle :</p>
              Les données ajoutées sont enregistrées immédiatement dans la mémoire locale et synchronisées en temps réel sur le portail.
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Success notification banner */}
            {saveSuccessMsg && (
              <div className="bg-emerald-700 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  {saveSuccessMsg}
                </span>
                <button onClick={() => setSaveSuccessMsg(null)}>
                  <X className="w-3.5 h-3.5 text-white/80" />
                </button>
              </div>
            )}

            {/* Subheader / Tabs */}
            <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('media');
                    setIsCreatingMedia(false);
                    setIsCreatingPatrimoine(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'media'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Médias & Albums ({mediaList.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('patrimoine');
                    setIsCreatingMedia(false);
                    setIsCreatingPatrimoine(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'patrimoine'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Patrimoine de Ntolo ({patrimoineList.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {activeTab === 'media' ? (
                  <button
                    onClick={openNewMediaForm}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter un Média</span>
                  </button>
                ) : (
                  <button
                    onClick={openNewPatrimoineForm}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Inscrire un Patrimoine</span>
                  </button>
                )}

                <button
                  onClick={handleResetDefaults}
                  title="Restaurer les données de base"
                  className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/70 rounded-xl transition-colors text-xs"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'media' ? (
                /* MEDIA TAB */
                isCreatingMedia ? (
                  /* Form to Add / Edit Media */
                  <form onSubmit={handleSaveMedia} className="max-w-3xl mx-auto space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <h3 className="font-bold text-base text-slate-900">
                        {editingMedia ? 'Modifier le média' : 'Ajouter une nouvelle photo ou vidéo'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsCreatingMedia(false)}
                        className="text-xs text-stone-500 hover:text-stone-800"
                      >
                        Annuler
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Titre */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Titre du média *</label>
                        <input
                          type="text"
                          required
                          value={mediaTitle}
                          onChange={(e) => setMediaTitle(e.target.value)}
                          placeholder="Ex: Vue sur les caféières et le relief volcanique"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Album (One of the 11 official albums) */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Album de classement *</label>
                        <select
                          value={mediaAlbum}
                          onChange={(e) => setMediaAlbum(e.target.value as GalleryAlbum)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                        >
                          {ALBUMS_LIST.map((alb) => (
                            <option key={alb.id} value={alb.id}>
                              {alb.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Type: Photo ou Vidéo */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Type de média</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setMediaType('photo')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                              mediaType === 'photo'
                                ? 'bg-emerald-800 text-white border-emerald-800'
                                : 'bg-stone-50 text-slate-700 border-stone-200'
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Photo</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaType('video')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                              mediaType === 'video'
                                ? 'bg-emerald-800 text-white border-emerald-800'
                                : 'bg-stone-50 text-slate-700 border-stone-200'
                            }`}
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Vidéo</span>
                          </button>
                        </div>
                      </div>

                      {/* Image URL / Poster */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          {mediaType === 'photo' ? 'URL de la photo *' : 'Image miniature de couverture (Poster)'}
                        </label>
                        <input
                          type="text"
                          required
                          value={mediaUrl}
                          onChange={(e) => setMediaUrl(e.target.value)}
                          placeholder="/src/assets/images/... ou URL web https://"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setMediaUrl('/src/assets/images/hero_ntolo_moungo_1790154817063.jpg')}
                            className="text-[10px] text-emerald-800 underline hover:text-emerald-950"
                          >
                            Utiliser Image 1 (Paysage Moungo)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaUrl('/src/assets/images/gallery_nature_moungo_1790154831461.jpg')}
                            className="text-[10px] text-emerald-800 underline hover:text-emerald-950"
                          >
                            Utiliser Image 2 (Cascade & Forêt)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaUrl('/src/assets/images/village_tradition_craft_1790154848784.jpg')}
                            className="text-[10px] text-emerald-800 underline hover:text-emerald-950"
                          >
                            Utiliser Image 3 (Coutume & Trône)
                          </button>
                        </div>
                      </div>

                      {/* Video Embed URL if video */}
                      {mediaType === 'video' && (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Lien Vidéo (YouTube embed ou MP4)</label>
                            <input
                              type="text"
                              value={videoUrl}
                              onChange={(e) => setVideoUrl(e.target.value)}
                              placeholder="https://www.youtube.com/embed/..."
                              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Durée de la vidéo</label>
                            <input
                              type="text"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              placeholder="Ex: 05:20"
                              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                            />
                          </div>
                        </>
                      )}

                      {/* Date de prise de vue */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Date de prise de vue *</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Lieu */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Lieu précis *</label>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ex: Mont Nlonako, Chefferie de Ntolo, École Publique"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Auteur de la photo si disponible */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Auteur de la photo / Source (lorsque disponible)
                        </label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Ex: Sa Majesté, Archives Chefferie, CODEV, ou [À renseigner]"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Légende détaillée */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Légende & Description détaillée *</label>
                        <textarea
                          rows={3}
                          required
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Description contextuelle de la scène, des personnes ou du paysage représenté..."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setIsCreatingMedia(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-stone-100"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow-md transition-colors"
                      >
                        {editingMedia ? 'Mettre à jour le média' : 'Enregistrer dans l’album'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Media List Table */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Total : {mediaList.length} photos et vidéos réparties sur 11 albums</span>
                      <button
                        onClick={openNewMediaForm}
                        className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Nouveau média
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mediaList.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 bg-stone-50 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all flex items-start gap-3 group"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 relative">
                            <img
                              src={m.mediaUrl}
                              alt={m.title}
                              className="w-full h-full object-cover"
                            />
                            {m.type === 'video' && (
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                                {m.duration || 'Vidéo'}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                                {m.album}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {m.date}
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 truncate">
                              {m.title}
                            </h4>

                            <p className="text-[11px] text-slate-500 truncate">
                              {m.caption}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span className="truncate max-w-[120px]">{m.location}</span>
                              <span>•</span>
                              <span className="truncate max-w-[120px]">
                                {m.author || '[À renseigner]'}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 opacity-90 group-hover:opacity-100">
                            <button
                              onClick={() => openEditMediaForm(m)}
                              title="Modifier"
                              className="p-1.5 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 rounded-lg border border-stone-200 shadow-xs"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(m.id)}
                              title="Supprimer"
                              className="p-1.5 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg border border-stone-200 shadow-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                /* PATRIMOINE TAB */
                isCreatingPatrimoine ? (
                  /* Form to Add / Edit Patrimoine */
                  <form onSubmit={handleSavePatrimoine} className="max-w-3xl mx-auto space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <h3 className="font-bold text-base text-slate-900">
                        {editingPatrimoine ? 'Modifier le bien patrimonial' : 'Inscrire un élément au Patrimoine de Ntolo'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsCreatingPatrimoine(false)}
                        className="text-xs text-stone-500 hover:text-stone-800"
                      >
                        Annuler
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Titre */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Désignation du patrimoine *</label>
                        <input
                          type="text"
                          required
                          value={patTitle}
                          onChange={(e) => setPatTitle(e.target.value)}
                          placeholder="Ex: Sanctuaire coutumier, Tabouret royal sculpté, Danse des dignitaires..."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Catégorie */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Catégorie patrimoniale *</label>
                        <select
                          value={patCategory}
                          onChange={(e) => setPatCategory(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                        >
                          <option value="Lieu">Lieu remarquable & sacré</option>
                          <option value="Objet">Objet & Insigne coutumier</option>
                          <option value="Tradition">Tradition, Rite & Savoir-faire</option>
                          <option value="Événement">Événement historique & rassemblement</option>
                        </select>
                      </div>

                      {/* Statut */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Statut d'inventaire *</label>
                        <input
                          type="text"
                          required
                          value={patStatus}
                          onChange={(e) => setPatStatus(e.target.value)}
                          placeholder="Ex: Répertoire officiel, Inventaire en cours [À renseigner]"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Localisation */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Lieu / Emplacement *</label>
                        <input
                          type="text"
                          required
                          value={patLocation}
                          onChange={(e) => setPatLocation(e.target.value)}
                          placeholder="Ex: Palais royal, Mont Nlonako, Forêt sacrée [À renseigner]"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Gardien coutumier ou institutionnel */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Gardien coutumier ou institutionnel *</label>
                        <input
                          type="text"
                          required
                          value={patCustodian}
                          onChange={(e) => setPatCustodian(e.target.value)}
                          placeholder="Ex: Sa Majesté, Notables initiés, Familles fondatrices"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Image URL */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Image illustrative (optionnel)</label>
                        <input
                          type="text"
                          value={patImageUrl}
                          onChange={(e) => setPatImageUrl(e.target.value)}
                          placeholder="/src/assets/images/... ou URL web"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Description */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Description détaillée *</label>
                        <textarea
                          rows={3}
                          required
                          value={patDescription}
                          onChange={(e) => setPatDescription(e.target.value)}
                          placeholder="Origine, histoire, caractéristiques physiques ou spirituelles..."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>

                      {/* Portée symbolique */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">Portée symbolique & valeur culturelle</label>
                        <input
                          type="text"
                          value={patSignificance}
                          onChange={(e) => setPatSignificance(e.target.value)}
                          placeholder="Ex: Symbole de fertilité, transmission intergénérationnelle, autorité..."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setIsCreatingPatrimoine(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-stone-100"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow-md transition-colors"
                      >
                        {editingPatrimoine ? 'Mettre à jour le patrimoine' : 'Enregistrer au répertoire'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Patrimoine List Table */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Total : {patrimoineList.length} éléments répertoriés (Lieux, Objets, Traditions, Événements)</span>
                      <button
                        onClick={openNewPatrimoineForm}
                        className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Inscrire un patrimoine
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {patrimoineList.map((p) => (
                        <div
                          key={p.id}
                          className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all flex items-start gap-3 group"
                        >
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                                {p.category}
                              </span>
                              <span className="text-[10px] text-emerald-800 font-semibold truncate">
                                {p.status}
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 truncate">
                              {p.title}
                            </h4>

                            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                              {p.description}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                              <span className="truncate max-w-[150px]">Lieu : {p.location}</span>
                              <span>•</span>
                              <span className="truncate max-w-[150px]">Gardien : {p.custodian}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 opacity-90 group-hover:opacity-100">
                            <button
                              onClick={() => openEditPatrimoineForm(p)}
                              title="Modifier"
                              className="p-1.5 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 rounded-lg border border-stone-200 shadow-xs"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePatrimoine(p.id)}
                              title="Supprimer"
                              className="p-1.5 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg border border-stone-200 shadow-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Session d'administration active
              </span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-stone-600 hover:text-stone-900 font-semibold text-[11px]"
              >
                Verrouiller la session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
