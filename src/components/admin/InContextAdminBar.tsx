import React from 'react';
import { ShieldCheck, Edit3, Settings, LogOut, ExternalLink, Sparkles } from 'lucide-react';
import { AdminUser, PageId } from '../../types';

interface InContextAdminBarProps {
  currentUser: Omit<AdminUser, 'passwordHash'>;
  currentPage: PageId;
  onOpenPageEditor: () => void;
  onNavigateToAdmin: () => void;
  onLogout: () => void;
}

export const InContextAdminBar: React.FC<InContextAdminBarProps> = ({
  currentUser,
  currentPage,
  onOpenPageEditor,
  onNavigateToAdmin,
  onLogout,
}) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'administrateur_principal':
        return 'Admin Principal';
      case 'editeur':
        return 'Éditeur Officiel';
      case 'gestionnaire_contenu':
        return 'Gestionnaire';
      default:
        return 'Administrateur';
    }
  };

  return (
    <aside
      aria-label="Barre d'administration et d'édition en direct"
      className="bg-stone-950 text-stone-100 border-b border-amber-500/40 px-3 sm:px-6 py-2 shadow-xl sticky top-0 z-40 transition-all backdrop-blur-md bg-stone-950/95"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Left: User identity & role badge */}
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-200 hidden sm:inline">
              Mode Édition :
            </span>
            <span className="font-medium text-amber-300">
              {currentUser.fullName}
            </span>
            <span className="text-[10px] font-mono uppercase bg-amber-950/80 border border-amber-700/60 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              {getRoleLabel(currentUser.role)}
            </span>
          </div>
        </div>

        {/* Center / Right: Quick Actions */}
        <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
          {/* Main Action: Edit This Page Now */}
          <button
            onClick={onOpenPageEditor}
            title="Modifier en direct les informations et rubriques de la page actuelle"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold flex items-center space-x-1.5 shadow-md shadow-amber-950/50 transition-all active:scale-[0.98] text-[11px]"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-950" />
            <span>Modifier cette page (/{currentPage})</span>
          </button>

          {/* Console Admin button */}
          <button
            onClick={onNavigateToAdmin}
            title="Accéder au portail d'administration complet"
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center space-x-1.5 transition-colors text-[11px]"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Console Admin</span>
          </button>

          {/* Logout button */}
          <button
            onClick={onLogout}
            title="Se déconnecter de la session d'administration"
            className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
