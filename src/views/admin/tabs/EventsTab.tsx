import React, { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Calendar, MapPin, Clock,
  Globe, EyeOff, AlertCircle, X, AlertTriangle, Users
} from 'lucide-react';
import { EventItem, UserRole } from '../../../types';

interface EventsTabProps {
  events: (EventItem & { published: boolean; attendeesCount?: number })[];
  onSave: (event: EventItem & { published: boolean; attendeesCount?: number }) => void;
  onDelete: (id: string, title: string) => void;
  onTogglePublish: (id: string) => void;
  userRole: UserRole;
}

export const EventsTab: React.FC<EventsTabProps> = ({
  events,
  onSave,
  onDelete,
  onTogglePublish,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<(EventItem & { published: boolean; attendeesCount?: number }) | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Réunion');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);

  const canPublish = userRole === 'administrateur_principal' || userRole === 'editeur';
  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setDate('2026-10-15');
    setTime('09h00');
    setLocation('Place de la Chefferie, Ntolo');
    setCategory('Réunion');
    setOrganizer('Comité de Développement & Chefferie');
    setDescription('');
    setPublished(canPublish);
    setIsModalOpen(true);
  };

  const openEditModal = (item: EventItem & { published: boolean; attendeesCount?: number }) => {
    setEditingItem(item);
    setTitle(item.title);
    setDate(item.date);
    setTime(item.time);
    setLocation(item.location);
    setCategory(item.category);
    setOrganizer(item.organizer);
    setDescription(item.description);
    setPublished(item.published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    onSave({
      id: editingItem ? editingItem.id : `evt-${Date.now()}`,
      title: title.trim(),
      date: date.trim(),
      time: time.trim() || '09h00',
      location: location.trim() || 'Ntolo',
      category,
      organizer: organizer.trim() || 'Chefferie de Ntolo',
      description: description.trim(),
      published: canPublish ? published : false,
      attendeesCount: editingItem?.attendeesCount || 0,
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
            placeholder="Rechercher un événement, un lieu ou un organisateur..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un événement</span>
        </button>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Événement & Thème</th>
                <th className="py-3 px-4">Date & Heure</th>
                <th className="py-3 px-4">Lieu</th>
                <th className="py-3 px-4">Organisateur</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-stone-100 block">{item.title}</span>
                    <span className="text-[10px] text-amber-400 font-semibold">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 text-stone-300 whitespace-nowrap">
                    <div>{item.date}</div>
                    <div className="text-[10px] text-stone-400">{item.time}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-400 max-w-[150px] truncate">
                    {item.location}
                  </td>
                  <td className="py-3 px-4 text-stone-400 max-w-[150px] truncate">
                    {item.organizer}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {canPublish ? (
                      <button
                        onClick={() => onTogglePublish(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          item.published !== false
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {item.published !== false ? 'Publié' : 'Brouillon'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-bold">
                        {item.published ? 'Publié' : 'Brouillon'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
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
            <h3 className="font-bold text-base text-white">Supprimer cet événement ?</h3>
            <p className="text-xs text-stone-300">
              L'événement sera retiré de l'agenda officiel du village.
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
                  const target = events.find((e) => e.id === deleteConfirmId);
                  onDelete(deleteConfirmId, target?.title || 'Événement');
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

      {/* Event Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                {editingItem ? 'Modifier l’événement' : 'Créer un nouvel événement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Intitulé de l'événement</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Assemblée Générale du CODEV"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Date (AAAA-MM-JJ)</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Heure</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="ex: 09h30"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Lieu précis</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Place de la Chefferie..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Réunion">Réunion</option>
                    <option value="Culture">Culture</option>
                    <option value="Travaux Communautaires">Travaux Communautaires</option>
                    <option value="Sport & Jeunesse">Sport & Jeunesse</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Organisateur</label>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="ex: Conseil des Notables & CODEV"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Description / Ordre du jour</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Objectifs et public visé..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                {canPublish && (
                  <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-800 text-emerald-500"
                    />
                    <span>Publier sur l'agenda public</span>
                  </label>
                )}
                <div className="flex items-center gap-2 ml-auto">
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
