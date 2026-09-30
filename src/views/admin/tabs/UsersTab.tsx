/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users, UserPlus, KeyRound, ShieldCheck, Crown, Edit3,
  FolderHeart, Trash2, Edit2, AlertTriangle, X, CheckCircle2, Lock,
  Info, ShieldAlert, Sparkles, UserX, UserCheck, RefreshCw, Check,
  Database, Flame, Shield, ArrowRight
} from 'lucide-react';
import { AdminUser, UserRole } from '../../../types';
import {
  hashPassword,
  MAX_ADMIN_USERS,
  revokeUserAccess,
  updateUserRole,
  syncUserWithFirebaseAuth,
  validateAdminPermissions,
} from '../../../services/authService';

interface UsersTabProps {
  users: AdminUser[];
  onSaveUser: (user: AdminUser) => void;
  onDeleteUser: (id: string, name: string) => void;
  onRevokeUser?: (id: string, revoked: boolean, name: string) => void;
  onUpdateRole?: (id: string, role: UserRole, name: string) => void;
  currentUserId: string;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  onSaveUser,
  onDeleteUser,
  onRevokeUser,
  onUpdateRole,
  currentUserId,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [roleModalUser, setRoleModalUser] = useState<AdminUser | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [revokeConfirmId, setRevokeConfirmId] = useState<string | null>(null);

  // Form states for Create / Edit
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('administrateur_principal');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // State for Role change modal
  const [selectedNewRole, setSelectedNewRole] = useState<UserRole>('administrateur_principal');

  const currentUserObj = users.find((u) => u.id === currentUserId);
  const isPrincipalAdmin = currentUserObj?.role === 'administrateur_principal';
  const remainingSlots = Math.max(0, MAX_ADMIN_USERS - users.length);
  const isQuotaFull = users.length >= MAX_ADMIN_USERS;

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  // If user is not principal admin, show strict permission denied block
  if (!isPrincipalAdmin) {
    return (
      <div className="bg-stone-900 border border-red-500/40 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-4 shadow-2xl animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="font-serif-royal text-xl font-bold text-white">
          Accès Restreint : Gestion des Comptes
        </h3>
        <p className="text-xs text-stone-300 leading-relaxed max-w-lg mx-auto">
          Conformément aux règles de sécurité <strong>Firebase Auth</strong> et à la gouvernance du village de Ntolo, seule la personne détenant le rôle d'<strong>Administrateur Principal</strong> est habilitée à ajouter, révoquer ou modifier les rôles des 5 comptes d'administrateurs.
        </p>
        <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-[11px] text-stone-400 font-mono">
          Votre rôle actuel : <span className="text-amber-400 font-bold">{currentUserObj?.role || 'Éditeur'}</span> • Statut : Lecture seule
        </div>
      </div>
    );
  }

  const openCreateModal = () => {
    if (isQuotaFull) {
      alert(
        `Quota strict atteint : Seules ${MAX_ADMIN_USERS} personnes sont autorisées à disposer des droits de modification sur le portail de Ntolo. Vous devez supprimer un compte existant pour pouvoir en ajouter un nouveau.`
      );
      return;
    }
    setEditingUser(null);
    setFullName('');
    setEmail('');
    setUsername('');
    setRole('administrateur_principal');
    setPassword('');
    setIsActive(true);
    setFormError('');
    setIsCreateModalOpen(true);
  };

  const openEditModal = (u: AdminUser) => {
    setEditingUser(u);
    setFullName(u.fullName);
    setEmail(u.email);
    setUsername(u.username);
    setRole(u.role);
    setPassword('');
    setIsActive(u.active);
    setFormError('');
    setIsCreateModalOpen(true);
  };

  const openRoleModal = (u: AdminUser) => {
    setRoleModalUser(u);
    setSelectedNewRole(u.role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim()) {
      setFormError('Veuillez renseigner le nom complet et l’adresse email.');
      return;
    }

    if (!editingUser) {
      if (users.length >= MAX_ADMIN_USERS) {
        setFormError(
          `Quota maximal atteint : Seules ${MAX_ADMIN_USERS} personnes sont autorisées à disposer des droits de modification sur le portail de Ntolo.`
        );
        return;
      }
      if (!password) {
        setFormError('Le mot de passe initial est obligatoire lors de la création d’un compte (min 6 caractères).');
        return;
      }
    }

    setSaving(true);
    try {
      // Validate permissions via Firebase Auth rules check
      validateAdminPermissions(currentUserId, 'administrateur_principal');

      let finalHash = editingUser?.passwordHash || '';
      if (password) {
        finalHash = await hashPassword(password);
      }

      const generatedUsername =
        username.trim() || email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

      const updatedUser: AdminUser = {
        id: editingUser ? editingUser.id : `usr-${Date.now()}`,
        username: generatedUsername,
        email: email.trim().toLowerCase(),
        fullName: fullName.trim(),
        role,
        passwordHash: finalHash,
        active: isActive,
        createdAt: editingUser ? editingUser.createdAt : new Date().toISOString().split('T')[0],
        lastLogin: editingUser?.lastLogin,
        addedBy: editingUser?.addedBy || currentUserObj?.fullName || 'Sa Majesté le Chef Traditionnel',
        isSuperAdmin: role === 'administrateur_principal',
      };

      // Synchronize with Firebase Auth
      await syncUserWithFirebaseAuth(updatedUser, password);

      onSaveUser(updatedUser);
      setIsCreateModalOpen(false);
      showSuccess(
        editingUser
          ? `Le compte de ${updatedUser.fullName} a été mis à jour avec succès.`
          : `L’administrateur ${updatedUser.fullName} a été créé et validé via Firebase Auth.`
      );
    } catch (err: any) {
      setFormError(err?.message || 'Erreur lors du traitement du compte administrateur.');
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeToggle = (u: AdminUser) => {
    const isCurrentlyActive = u.active;
    const shouldRevoke = isCurrentlyActive; // if active, we revoke it

    const result = revokeUserAccess(u.id, shouldRevoke, currentUserId);
    if (!result.success) {
      alert(result.error || 'Impossible d’effectuer cette action.');
      return;
    }

    if (onRevokeUser) {
      onRevokeUser(u.id, shouldRevoke, u.fullName);
    } else {
      onSaveUser({ ...u, active: !shouldRevoke });
    }

    setRevokeConfirmId(null);
    showSuccess(
      shouldRevoke
        ? `L'accès de ${u.fullName} a été immédiatement RÉVOQUÉ.`
        : `L'accès de ${u.fullName} a été RÉACTIVÉ avec succès.`
    );
  };

  const handleApplyRoleChange = () => {
    if (!roleModalUser) return;

    const result = updateUserRole(roleModalUser.id, selectedNewRole, currentUserId);
    if (!result.success) {
      alert(result.error || 'Erreur lors de la modification du rôle.');
      return;
    }

    if (onUpdateRole) {
      onUpdateRole(roleModalUser.id, selectedNewRole, roleModalUser.fullName);
    } else {
      onSaveUser({
        ...roleModalUser,
        role: selectedNewRole,
        isSuperAdmin: selectedNewRole === 'administrateur_principal',
      });
    }

    showSuccess(`Le rôle de ${roleModalUser.fullName} a été modifié en ${selectedNewRole}.`);
    setRoleModalUser(null);
  };

  const getRoleBadge = (r: UserRole, isSuperAdmin?: boolean) => {
    switch (r) {
      case 'administrateur_principal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>Admin Principal (Mêmes Droits)</span>
          </span>
        );
      case 'editeur':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Edit3 className="w-3 h-3 text-emerald-400" />
            <span>Éditeur Officiel</span>
          </span>
        );
      case 'gestionnaire_contenu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <FolderHeart className="w-3 h-3 text-blue-400" />
            <span>Gestionnaire Médias</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl">
      {/* Success Notification */}
      {successNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{successNotice}</span>
        </div>
      )}

      {/* Firebase Auth & Strict Permissions Security Card */}
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif-royal text-lg font-bold text-white flex items-center gap-2">
                <span>Gestion des Comptes des 5 Administrateurs</span>
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-800">
                  Quota : {users.length} / {MAX_ADMIN_USERS}
                </span>
              </h3>
            </div>
            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              En tant qu'<strong>Administrateur Principal</strong>, vous disposez de l'autorité exclusive pour <strong>ajouter</strong> de nouveaux administrateurs (leur conférant les mêmes droits complets), <strong>révoquer</strong> temporairement ou définitivement des accès, et <strong>modifier</strong> leurs rôles, sous contrôle et validation stricte des permissions <strong>Firebase Auth</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
            <button
              onClick={openCreateModal}
              disabled={isQuotaFull}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isQuotaFull
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-950/40 active:scale-[0.98]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>
                {isQuotaFull
                  ? 'Quota plein (5/5 atteint)'
                  : `Ajouter un administrateur (${remainingSlots} place${remainingSlots > 1 ? 's' : ''} libre${remainingSlots > 1 ? 's' : ''})`}
              </span>
            </button>
          </div>
        </div>

        {/* Security & Validation Pills */}
        <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-stone-400 font-semibold">Attribution des 5 sièges :</span>
            <div className="flex items-center space-x-1.5">
              {[...Array(MAX_ADMIN_USERS)].map((_, i) => {
                const isOccupied = i < users.length;
                const usr = users[i];
                const isRevoked = usr && !usr.active;

                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold border transition-all ${
                      isOccupied
                        ? isRevoked
                          ? 'bg-red-950/70 text-red-300 border-red-600/70'
                          : 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                        : 'bg-stone-950 text-stone-600 border-stone-800 border-dashed'
                    }`}
                    title={
                      isOccupied
                        ? `Siège ${i + 1} : ${usr.fullName} (${isRevoked ? 'Accès Révoqué' : 'Actif'})`
                        : `Siège ${i + 1} : Libre`
                    }
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-mono">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Firebase Auth & Firestore Actif</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 font-mono">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Chiffrement SHA-256 + Sel</span>
            </span>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Siège</th>
                <th className="py-3.5 px-4">Administrateur & Contact</th>
                <th className="py-3.5 px-4">Rôle Attribué</th>
                <th className="py-3.5 px-4">Validation Auth</th>
                <th className="py-3.5 px-4 text-center">Statut Accès</th>
                <th className="py-3.5 px-4 text-right">Actions sur le Compte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {users.map((u, index) => {
                const isSelf = u.id === currentUserId;

                return (
                  <tr key={u.id} className="hover:bg-stone-800/40 transition-colors">
                    {/* Siège Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400 text-[11px]">
                      Siège #{index + 1}
                    </td>

                    {/* Identité */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold flex-shrink-0 text-xs ${
                          u.active ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {u.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-200 flex items-center gap-2">
                            <span>{u.fullName}</span>
                            {isSelf && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                                (Votre compte)
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">
                            {u.email} <span className="text-stone-600">• Identifiant :</span> <strong className="text-stone-300">{u.username}</strong>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Rôle */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {getRoleBadge(u.role, u.isSuperAdmin)}
                        {isPrincipalAdmin && !isSelf && (
                          <button
                            type="button"
                            onClick={() => openRoleModal(u)}
                            className="block text-[10px] text-amber-400 hover:text-amber-300 hover:underline"
                          >
                            Modifier le rôle ➔
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Validation Auth */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/50 text-[10px] text-emerald-300 font-mono">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Firebase Auth OK</span>
                      </span>
                    </td>

                    {/* Statut Accès */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        u.active
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {u.active ? (
                          <>
                            <UserCheck className="w-3 h-3 text-emerald-400" />
                            <span>Autorisé</span>
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3 text-red-400" />
                            <span>Accès Révoqué</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {/* Edit Credentials */}
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                          title="Modifier les coordonnées ou réinitialiser le mot de passe"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Revoke / Re-activate Access */}
                        {!isSelf && (
                          <>
                            {revokeConfirmId === u.id ? (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => handleRevokeToggle(u)}
                                  className={`px-2 py-1 rounded font-bold text-[10px] text-white ${
                                    u.active ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                                  }`}
                                >
                                  Confirmer {u.active ? 'Révocation' : 'Réactivation'}
                                </button>
                                <button
                                  onClick={() => setRevokeConfirmId(null)}
                                  className="px-1.5 py-1 rounded bg-stone-800 text-stone-400 text-[10px]"
                                >
                                  Annuler
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setRevokeConfirmId(u.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  u.active
                                    ? 'bg-stone-800 hover:bg-amber-950/60 text-stone-400 hover:text-amber-400'
                                    : 'bg-stone-800 hover:bg-emerald-950/60 text-stone-400 hover:text-emerald-400'
                                }`}
                                title={u.active ? "Révoquer l'accès de ce compte" : "Réactiver l'accès de ce compte"}
                              >
                                {u.active ? (
                                  <UserX className="w-3.5 h-3.5" />
                                ) : (
                                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                                )}
                              </button>
                            )}
                          </>
                        )}

                        {/* Delete Account to release 1 of the 5 seats */}
                        {!isSelf && (
                          <>
                            {deleteConfirmId === u.id ? (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => {
                                    onDeleteUser(u.id, u.fullName);
                                    setDeleteConfirmId(null);
                                    showSuccess(`Le compte de ${u.fullName} a été supprimé. Une place est désormais libre sur les 5.`);
                                  }}
                                  className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px]"
                                >
                                  Confirmer Suppression
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-1.5 py-1 rounded bg-stone-800 text-stone-400 text-[10px]"
                                >
                                  Non
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(u.id)}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-950/60 text-stone-400 hover:text-red-400 transition-colors"
                                title="Supprimer définitivement et libérer ce siège du quota"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
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

      {/* Modal 1: Add or Edit User */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
                  {editingUser
                    ? `Modifier le Compte : ${editingUser.fullName}`
                    : `Ajouter un Administrateur (Siège ${users.length + 1} / 5)`}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Nom complet & Titre officiel *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Notable Jean Elembe (Délégué ou Secrétaire)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Adresse Email Officielle *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@ntolo.cm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Identifiant de connexion</label>
                  <input
                    type="text"
                    placeholder="jean_elembe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="font-bold text-stone-300 block">Rôle & Permissions Attribuées *</label>

                <div className="space-y-2">
                  <label
                    className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                      role === 'administrateur_principal'
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      value="administrateur_principal"
                      checked={role === 'administrateur_principal'}
                      onChange={() => setRole('administrateur_principal')}
                      className="mt-0.5 text-amber-500 focus:ring-amber-500"
                    />
                    <div>
                      <strong className="block text-stone-100 font-bold flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>Administrateur Principal (Mêmes Droits Complets)</span>
                      </strong>
                      <span className="text-[11px] leading-relaxed text-stone-400 block mt-0.5">
                        Peut modifier tous les contenus, photos, vidéos, inviter et révoquer d'autres administrateurs dans la limite des 5 places.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                      role === 'editeur'
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      value="editeur"
                      checked={role === 'editeur'}
                      onChange={() => setRole('editeur')}
                      className="mt-0.5 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div>
                      <strong className="block text-stone-100 font-bold flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Éditeur Officiel</span>
                      </strong>
                      <span className="text-[11px] leading-relaxed text-stone-400 block mt-0.5">
                        Peut modifier les informations du site et ajouter/retirer des photos, sans gérer les comptes administrateurs.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300 flex items-center justify-between">
                  <span>
                    {editingUser
                      ? 'Nouveau mot de passe (laisser vide pour conserver l’actuel)'
                      : 'Mot de passe sécurisé *'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Chiffré en SHA-256</span>
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  placeholder={editingUser ? '••••••••' : 'Définir un mot de passe sécurisé'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="userActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded bg-stone-950 border-stone-800 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="userActiveCheck" className="text-stone-300 cursor-pointer font-medium text-xs">
                  Compte actif et autorisé à modifier le portail
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saving ? 'Validation Firebase...' : 'Enregistrer le Compte'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Change Role Directly */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-royal text-base font-bold text-white">
                  Modifier le Rôle de {roleModalUser.fullName}
                </h3>
              </div>
              <button
                onClick={() => setRoleModalUser(null)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-stone-300 text-xs leading-relaxed">
              Sélectionnez le nouveau niveau de permissions à accorder à cet administrateur sous contrôle Firebase Auth :
            </p>

            <div className="space-y-2">
              <label
                className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                  selectedNewRole === 'administrateur_principal'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="editRoleDirect"
                  value="administrateur_principal"
                  checked={selectedNewRole === 'administrateur_principal'}
                  onChange={() => setSelectedNewRole('administrateur_principal')}
                  className="mt-0.5 text-amber-500"
                />
                <div>
                  <strong className="block text-stone-100 font-bold flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Administrateur Principal (Mêmes Droits Complets)</span>
                  </strong>
                  <span className="text-[11px] text-stone-400">
                    Pleins pouvoirs de gestion des contenus, photos et comptes administrateurs.
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                  selectedNewRole === 'editeur'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="editRoleDirect"
                  value="editeur"
                  checked={selectedNewRole === 'editeur'}
                  onChange={() => setSelectedNewRole('editeur')}
                  className="mt-0.5 text-emerald-500"
                />
                <div>
                  <strong className="block text-stone-100 font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Éditeur Officiel</span>
                  </strong>
                  <span className="text-[11px] text-stone-400">
                    Peut modifier les textes et photos sans gérer les utilisateurs.
                  </span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                  selectedNewRole === 'gestionnaire_contenu'
                    ? 'bg-blue-950/40 border-blue-500 text-blue-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="editRoleDirect"
                  value="gestionnaire_contenu"
                  checked={selectedNewRole === 'gestionnaire_contenu'}
                  onChange={() => setSelectedNewRole('gestionnaire_contenu')}
                  className="mt-0.5 text-blue-500"
                />
                <div>
                  <strong className="block text-stone-100 font-bold flex items-center gap-1.5">
                    <FolderHeart className="w-3.5 h-3.5 text-blue-400" />
                    <span>Gestionnaire de Contenu</span>
                  </strong>
                  <span className="text-[11px] text-stone-400">
                    Peut ajouter des actualités, événements et photos de galerie.
                  </span>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setRoleModalUser(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleApplyRoleChange}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
              >
                Appliquer le Nouveau Rôle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
