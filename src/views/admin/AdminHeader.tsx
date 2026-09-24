import React from 'react';
import {
  ShieldCheck, Crown, Edit3, FolderHeart, ExternalLink,
  LogOut, Bell, Search, Sparkles
} from 'lucide-react';
import { AdminUser, UserRole } from '../../types';

interface AdminHeaderProps {
  currentUser: Omit<AdminUser, 'passwordHash'>;
  title: string;
  subtitle: string;
  onNavigateToPublic: () => void;
  onLogout: () => void;
  unreadCount?: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentUser,
  title,
  subtitle,
  onNavigateToPublic,
  onLogout,
  unreadCount = 0,
}) => {
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'administrateur_principal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-stone-950 border border-amber-300">
            <Crown className="w-3 h-3" />
            <span>Admin Principal</span>
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
            <span>Gestionnaire Contenu</span>
          </span>
        );
    }
  };

  return (
    <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30">
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="font-serif-royal text-xl sm:text-2xl font-extrabold text-white">
            {title}
          </h1>
        </div>
        <p className="text-xs text-stone-400 mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Card */}
        <div className="flex items-center space-x-3 bg-stone-950/80 px-3.5 py-2 rounded-2xl border border-stone-800">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
            {currentUser.fullName.charAt(0)}
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-200 truncate max-w-[150px] sm:max-w-[200px]">
                {currentUser.fullName}
              </span>
              {getRoleBadge(currentUser.role)}
            </div>
            <span className="text-[10px] text-stone-400 font-mono">
              {currentUser.email}
            </span>
          </div>
        </div>

        {/* Public site switch */}
        <button
          onClick={onNavigateToPublic}
          title="Consulter le site public"
          className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          title="Se déconnecter"
          className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
