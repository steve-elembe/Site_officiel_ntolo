import React, { useState } from 'react';
import {
  Image as ImageIcon, Video, Plus, Search, Trash2, Edit2,
  X, AlertTriangle, ExternalLink, Calendar, MapPin, User, Play
} from 'lucide-react';
import { MultimediaItem, GalleryAlbum, UserRole } from '../../../types';
import { ALBUMS_LIST } from '../../../services/galleryService';

interface MediaTabProps {
  initialType?: 'photo' | 'video';
  mediaItems: MultimediaItem[];
  onSaveMedia: (item: MultimediaItem) => void;
  onDeleteMedia: (id: string, title: string) => void;
  userRole: UserRole;
  currentUserName: string;
}

export const MediaTab: React.FC<MediaTabProps> = ({
  initialType = 'photo',
  mediaItems,
  onSaveMedia,
  onDeleteMedia,
  userRole,
  currentUserName,
}) => {
  const [activeType, setActiveType] = useState<'photo' | 'video'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | 'Tous'>('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MultimediaItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState<GalleryAlbum>('Ntolo aujourd’hui');
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Ntolo, Moungo');
  const [author, setAuthor] = useState('Archives Chefferie');
  const [date, setDate] = useState('2026');

  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = mediaItems.filter((m) => {
    if (m.type !== activeType) return false;
    if (selectedAlbum !== 'Tous' && m.album !== selectedAlbum) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.caption.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setAlbum('Ntolo aujourd’hui');
    setMediaUrl(
      activeType === 'photo'
        ? 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    );
    setVideoUrl(activeType === 'video' ? 'https://www.youtube.com/embed/dQw4w9WgXcQ' : '');
    setDuration(activeType === 'video' ? '04:15' : '');
    setCaption('');
    setLocation('Ntolo, Arrondissement de Nlonako');
    setAuthor(currentUserName);
    setDate('Septembre 2026');
    setIsModalOpen(true);
  };

  const openEditModal = (item: MultimediaItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setAlbum(item.album);
    setMediaUrl(item.mediaUrl);
    setVideoUrl(item.videoUrl || '');
    setDuration(item.duration || '');
    setCaption(item.caption);
    setLocation(item.location);
    setAuthor(item.author || '');
    setDate(item.date);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mediaUrl.trim()) return;

    onSaveMedia({
      id: editingItem ? editingItem.id : `med-${Date.now()}`,
      title: title.trim(),
      album,
      type: activeType,
      mediaUrl: mediaUrl.trim(),
      videoUrl: activeType === 'video' ? videoUrl.trim() : undefined,
      duration: activeType === 'video' ? duration.trim() : undefined,
      caption: caption.trim() || title.trim(),
      location: location.trim(),
      author: author.trim() || 'Archives Communautaires',
      date: date.trim(),
      viewsCount: editingItem?.viewsCount || 0,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Type switch & Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setActiveType('photo')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeType === 'photo' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos ({mediaItems.filter((m) => m.type === 'photo').length})</span>
            </button>
            <button
              onClick={() => setActiveType('video')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeType === 'video' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vidéos ({mediaItems.filter((m) => m.type === 'video').length})</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter {activeType === 'photo' ? 'une photo' : 'une vidéo'}</span>
        </button>
      </div>

      {/* Albums Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedAlbum('Tous')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedAlbum === 'Tous' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
          }`}
        >
          Tous les albums
        </button>
        {ALBUMS_LIST.map((alb) => (
          <button
            key={alb.id}
            onClick={() => setSelectedAlbum(alb.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedAlbum === alb.id ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
            }`}
          >
            {alb.title}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between group shadow-sm"
          >
            <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-950/80 text-amber-300 backdrop-blur-md">
                  {item.album}
                </span>
                {item.type === 'video' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{item.duration || 'Vidéo'}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-200 text-xs sm:text-sm line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-500">
                <span>{item.location}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1 rounded bg-stone-800 text-stone-300 hover:text-white"
                    title="Modifier"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">Supprimer ce média ?</h3>
            <p className="text-xs text-stone-300">
              L'élément sera définitivement retiré de la galerie officielle du village.
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
                  const target = mediaItems.find((m) => m.id === deleteConfirmId);
                  onDeleteMedia(deleteConfirmId, target?.title || 'Média');
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                {editingItem ? 'Modifier le média' : `Ajouter ${activeType === 'photo' ? 'une photo' : 'une vidéo'}`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Titre du média</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Vue panoramique du Mont Nlonako"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Album thématique</label>
                  <select
                    value={album}
                    onChange={(e) => setAlbum(e.target.value as GalleryAlbum)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    {ALBUMS_LIST.map((alb) => (
                      <option key={alb.id} value={alb.id}>
                        {alb.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Date de prise de vue</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Septembre 2026"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">
                  {activeType === 'photo' ? 'URL de la photo (HD)' : 'Image miniature de couverture (Poster URL)'}
                </label>
                <input
                  type="url"
                  required
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {activeType === 'video' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-300">URL Vidéo (Embed YouTube ou direct)</label>
                    <input
                      type="url"
                      required
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-300">Durée affichée</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="ex: 03:45"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Lieu précis</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Quartier Chefferie, Ntolo"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Auteur / Source</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Archives CODEV"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Légende descriptive</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Contexte de la prise de vue..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
