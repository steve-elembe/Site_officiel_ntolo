import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Clock, MapPin, Users, CheckCircle2, Filter,
  BellRing, Search, Share2, PlusCircle, Check, ArrowRight,
  ExternalLink, Sparkles
} from 'lucide-react';
import { PageId, EventItem } from '../types';
import { SAMPLE_EVENTS } from '../data/villageData';
import { getStoredPublications } from '../services/publicationService';
import { AdminPublicationModal } from '../components/AdminPublicationModal';

interface EvenementsViewProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle?: (articleId: string) => void;
}

export const EvenementsView: React.FC<EvenementsViewProps> = ({
  onNavigate,
  onSelectArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);
  const [participantName, setParticipantName] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Combine static events + events from publication service
  const publications = getStoredPublications();
  const pubEvents = useMemo(() => {
    return publications
      .filter((p) => p.published && p.category === 'Événements')
      .map((p) => ({
        id: p.id,
        title: p.title,
        date: p.date,
        time: 'À confirmer',
        location: 'Chefferie de Ntolo',
        category: 'Culture' as const,
        description: p.summary,
        organizer: p.author,
      }));
  }, [publications]);

  const allEvents = useMemo(() => {
    return [...pubEvents, ...SAMPLE_EVENTS];
  }, [pubEvents]);

  const categories = ['Tous', 'Réunion', 'Travaux Communautaires', 'Culture', 'Sport & Jeunesse'];

  const filteredEvents = useMemo(() => {
    return allEvents.filter((e) => {
      if (selectedCategory !== 'Tous' && e.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allEvents, selectedCategory, searchQuery]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
      setParticipantName('');
      setParticipantPhone('');
    }, 2500);
  };

  const handleShareEvent = (e: React.MouseEvent, ev: EventItem) => {
    e.stopPropagation();
    const text = `[Événement Ntolo] ${ev.title} - Date : ${ev.date} à ${ev.time} (${ev.location}). Recommandé par le portail officiel de Ntolo.`;
    navigator.clipboard.writeText(text);
    setCopiedEventId(ev.id);
    setTimeout(() => setCopiedEventId(null), 2000);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-800" />
              <span>AGENDA COMMUNAUTAIRE & RENCONTRES</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Événements & Agenda du Village
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Assemblées générales, journées citoyennes de salongo, tournois sportifs de la jeunesse, fêtes patronales et cérémonies coutumières au pied du Mont Nlonako.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => onNavigate('actualites')}
              className="px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs transition-colors text-center"
            >
              Consulter les actualités
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Programmer un événement</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un événement, lieu ou date..."
                className="w-full text-xs pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              <strong>{filteredEvents.length}</strong> rendez-vous répertorié{filteredEvents.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Timeline Cards */}
        <div className="space-y-4">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm hover:border-emerald-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              {/* Date Box */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex flex-col items-center justify-center font-extrabold shadow-inner">
                  <Calendar className="w-5 h-5 text-emerald-800 mb-0.5" />
                  <span className="text-[10px] font-bold uppercase text-emerald-800">Ntolo</span>
                </div>
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800">
                    {ev.category}
                  </span>
                  <div className="text-xs font-bold text-amber-800 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{ev.date} à {ev.time}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {ev.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {ev.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                    <strong>{ev.location}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Organisateur : {ev.organizer}</span>
                  </span>
                </div>
              </div>

              {/* RSVP and Share buttons */}
              <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 w-full md:w-auto flex-shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                <button
                  onClick={() => setRsvpEvent(ev)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <BellRing className="w-3.5 h-3.5 text-amber-300" />
                  <span>Confirmer présence</span>
                </button>

                <button
                  onClick={(e) => handleShareEvent(e, ev)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                  title="Copier les détails"
                >
                  {copiedEventId === ev.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{copiedEventId === ev.id ? 'Copié' : 'Partager'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirmation de Présence</h3>
                <p className="text-xs text-slate-500">Pour le registre de la Chefferie & de l'organisation</p>
              </div>
              <button
                onClick={() => setRsvpEvent(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">{rsvpEvent.title}</span>
              <span className="text-slate-500 block">{rsvpEvent.date} à {rsvpEvent.time} • {rsvpEvent.location}</span>
            </div>

            {rsvpSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Présence confirmée !</h4>
                <p className="text-xs text-slate-600">
                  Votre nom a été transmis au comité organisateur. Merci pour votre engagement civique à Ntolo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Votre Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Ex: Jean Paul Tchouta"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Numéro de téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={participantPhone}
                    onChange={(e) => setParticipantPhone(e.target.value)}
                    placeholder="Ex: +237 677 00 00 00"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpEvent(null)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow"
                  >
                    Valider ma participation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Admin Publication Modal */}
      <AdminPublicationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onPublicationsChanged={() => {}}
      />
    </div>
  );
};
