import React, { useState } from 'react';
import {
  Mail, Search, Trash2, CheckCircle2, Clock, AlertCircle,
  Archive, Phone, User, MessageSquare, Send, X, ShieldAlert
} from 'lucide-react';
import { ContactMessage, UserRole } from '../../../types';

interface ContactsTabProps {
  messages: ContactMessage[];
  onUpdateStatus: (id: string, status: ContactMessage['status'], notes?: string) => void;
  onDeleteMessage: (id: string) => void;
  userRole: UserRole;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({
  messages,
  onUpdateStatus,
  onDeleteMessage,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ContactMessage['status'] | 'all'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = messages.filter((m) => {
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.senderName.toLowerCase().includes(q) ||
        m.senderEmail.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setAdminNoteInput(msg.adminNotes || '');
    if (msg.status === 'nouveau') {
      onUpdateStatus(msg.id, 'lu');
    }
  };

  const handleSaveNotes = () => {
    if (!selectedMessage) return;
    onUpdateStatus(selectedMessage.id, selectedMessage.status, adminNoteInput);
    setSelectedMessage((prev) => (prev ? { ...prev, adminNotes: adminNoteInput } : null));
  };

  const handleChangeStatus = (status: ContactMessage['status']) => {
    if (!selectedMessage) return;
    onUpdateStatus(selectedMessage.id, status, adminNoteInput);
    setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
  };

  const getStatusBadge = (status: ContactMessage['status']) => {
    switch (status) {
      case 'nouveau':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-stone-950">Nouveau</span>;
      case 'lu':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300">Lu</span>;
      case 'en_cours':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300">En cours</span>;
      case 'traite':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Traité</span>;
      case 'archive':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-400">Archivé</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par citoyen, email, doléance..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
            {(['all', 'nouveau', 'en_cours', 'traite'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === st ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'Tous' : st === 'nouveau' ? 'Nouveaux' : st === 'en_cours' ? 'En cours' : 'Traités'}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-stone-400">
          <span className="font-bold text-amber-400">{messages.length}</span> messages reçus
        </div>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Citoyen / Expéditeur</th>
                <th className="py-3 px-4">Objet & Objet de la requête</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Date de réception</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((msg) => (
                <tr
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  className="hover:bg-stone-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-200">{msg.senderName}</div>
                    <div className="text-[11px] text-stone-400">{msg.senderEmail}</div>
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-semibold text-stone-200 truncate">{msg.subject}</div>
                    <div className="text-[11px] text-stone-400 truncate">{msg.message}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-300">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 border border-stone-700 font-medium">
                      {msg.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400 text-[11px] whitespace-nowrap">
                    {msg.receivedAt}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {getStatusBadge(msg.status)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMessage(msg);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold text-[11px]"
                    >
                      Ouvrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail & Processing Drawer Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Requête Citoyenne</h3>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-stone-100">{selectedMessage.senderName}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-3">
                    <span>{selectedMessage.senderEmail}</span>
                    <span>•</span>
                    <span>{selectedMessage.senderPhone}</span>
                  </div>
                </div>
                <div>{getStatusBadge(selectedMessage.status)}</div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">Objet :</span>
                <p className="font-bold text-stone-200 text-sm">{selectedMessage.subject}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">Message du citoyen :</span>
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-800">
                <label className="font-bold text-amber-400 block uppercase text-[10px] tracking-wider">
                  Notes Administratives Internes & Suivi (Secrétariat / Notables)
                </label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="ex: Audience accordée par Sa Majesté le 14 octobre. Transmis au greffier coutumier..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                  >
                    Enregistrer la note
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-400">Statut :</span>
                  {(['nouveau', 'en_cours', 'traite', 'archive'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleChangeStatus(st)}
                      className={`px-2 py-1 rounded text-[10px] font-bold capitalize transition-all ${
                        selectedMessage.status === st
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {canDelete && (
                  <button
                    onClick={() => {
                      onDeleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900"
                    title="Supprimer la requête"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
