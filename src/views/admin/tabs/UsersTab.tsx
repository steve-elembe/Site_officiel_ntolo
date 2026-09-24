import React, { useState } from 'react';
import {
  Users, UserPlus, KeyRound, ShieldCheck, Crown, Edit3,
  FolderHeart, Trash2, Edit2, AlertTriangle, X, CheckCircle2, Lock
} from 'lucide-react';
import { AdminUser, UserRole } from '../../../types';
import { hashPassword } from '../../../services/authService';

interface UsersTabProps {
  users: AdminUser[];
  onSaveUser: (user: AdminUser) => void;
  onDeleteUser: (id: string, name: string) => void;
  currentUserId: string;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  onSaveUser,
  onDeleteUser,
  currentUserId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('editeur');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const openCreateModal = () => {
    setEditingUser(null);
    setFullName('');
    setEmail('');
    setRole('editeur');
    setPassword('');
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (u: AdminUser) => {
    setEditingUser(u);
    setFullName(u.fullName);
    setEmail(u.email);
    setRole(u.role);
    setPassword(''); // leave blank to keep current password
    setIsActive(u.active);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim()) {
      setFormError('Veuillez renseigner le nom complet et l’adresse email.');
      return;
    }

    if (!editingUser && !password) {
      setFormError('Le mot de passe initial est obligatoire lors de la création d’un compte.');
      return;
    }

    setSaving(true);
    try {
      let finalHash = editingUser?.passwordHash || '';
      if (password) {
        finalHash = await hashPassword(password);
      }

      const updatedUser: AdminUser = {
        id: editingUser ? editingUser.id : `usr-${Date.now()}`,
        username: email.split('@')[0],
        email: email.trim(),
        fullName: fullName.trim(),
        role,
        passwordHash: finalHash,
        active: isActive,
        createdAt: editingUser ? editingUser.createdAt : new Date().toISOString().split('T')[0],
        lastLogin: editingUser?.lastLogin,
      };

      onSaveUser(updatedUser);
      setIsModalOpen(false);
    } catch (err) {
      setFormError('Erreur lors du hachage cryptographique du mot de passe.');
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'administrateur_principal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 border border-amber-300">
            <Crown className="w-3 h-3" />
            <span>Administrateur Principal</span>
          </span>
        );
      case 'editeur':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Edit3 className="w-3 h-3" />
            <span>Éditeur Officiel</span>
          </span>
        );
      case 'gestionnaire_contenu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <FolderHeart className="w-3 h-3" />
            <span>Gestionnaire de Contenu</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner explaining role permissions & security */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-lg font-bold text-white">
              Gestion Sécurisée des Accès & Rôles
            </h3>
          </div>
          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            Contrôle d'accès basé sur les rôles (RBAC). Tous les mots de passe sont hachés de manière irréversible via <span className="text-amber-400 font-mono">SHA-256</span> combiné à un sel cryptographique.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Créer un compte administrateur</span>
        </button>
      </div>

      {/* Users table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Utilisateur & Identité</th>
                <th className="py-3 px-4">Rôle & Prérogatives</th>
                <th className="py-3 px-4">Chiffrement Mot de passe</th>
                <th className="py-3 px-4">Dernière Connexion</th>
                <th className="py-3 px-4 text-center">État</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {users.map((u) => {
                const isSelf = u.id === currentUserId;
                return (
                  <tr key={u.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-stone-800 text-amber-400 font-bold flex items-center justify-center">
                          {u.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-200 flex items-center gap-2">
                            <span>{u.fullName}</span>
                            {isSelf && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                                (Vous)
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {getRoleBadge(u.role)}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-stone-400 bg-stone-950 px-2 py-1 rounded-md border border-stone-800">
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                        <span>SHA-256 (64 hex)</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-stone-400 text-[11px] whitespace-nowrap">
                      {u.lastLogin || 'Jamais connecté'}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {u.active ? 'Actif' : 'Désactivé'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                          title="Modifier les permissions ou réinitialiser le mot de passe"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {!isSelf && (
                          <button
                            onClick={() => setDeleteConfirmId(u.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-red-200"
                            title="Supprimer le compte"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">Supprimer ce compte ?</h3>
            <p className="text-xs text-stone-300">
              L'utilisateur n'aura plus aucun accès à l'administration du portail.
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
                  const target = users.find((u) => u.id === deleteConfirmId);
                  onDeleteUser(deleteConfirmId, target?.fullName || 'Utilisateur');
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

      {/* Edit / Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                {editingUser ? 'Modifier le compte' : 'Créer un compte administrateur'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Nom complet & Titre</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: M. Pierre Mbappe, Secrétaire"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Adresse e-mail officielle</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="secretaire@ntolo.cm"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Rôle & Droits d'accès</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                >
                  <option value="administrateur_principal">Administrateur Principal (Tous les droits)</option>
                  <option value="editeur">Éditeur (Créer, modifier, publier, supprimer du contenu)</option>
                  <option value="gestionnaire_contenu">Gestionnaire de contenu (Créer et modifier des brouillons)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-bold text-stone-300">
                    {editingUser ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe initial'}
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">Haché SHA-256</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingUser ? '••••••••' : 'Entrez un mot de passe fort'}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded bg-stone-950 border-stone-800 text-amber-500"
                  />
                  <span>Compte actif et autorisé à se connecter</span>
                </label>
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
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold disabled:opacity-50"
                >
                  {saving ? 'Hachage en cours...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
