import React from 'react';
import {
  LayoutDashboard, Newspaper, Megaphone, Calendar, FileCode,
  Image, Video, FileText, Target, Mail, Users, Settings,
  LogOut, ExternalLink, ShieldCheck, ChevronRight, HeartHandshake
} from 'lucide-react';
import { UserRole } from '../../types';

export type AdminTab =
  | 'dashboard'
  | 'actualites'
  | 'annonces'
  | 'evenements'
  | 'pages'
  | 'photos'
  | 'videos'
  | 'documents'
  | 'projets'
  | 'contacts'
  | 'communautaire'
  | 'utilisateurs'
  | 'parametres';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  userRole: UserRole;
  unreadContactsCount: number;
  pendingSubmissionsCount?: number;
  onNavigateToPublic: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  unreadContactsCount,
  pendingSubmissionsCount,
  onNavigateToPublic,
  onLogout,
}) => {
  const isSuperAdmin = userRole === 'administrateur_principal';
  const isEditor = userRole === 'editeur';

  const menuItems: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    locked?: boolean;
    category: string;
  }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, category: 'Général' },
    { id: 'actualites', label: 'Actualités', icon: Newspaper, category: 'Publications' },
    { id: 'annonces', label: 'Annonces & Avis', icon: Megaphone, category: 'Publications' },
    { id: 'evenements', label: 'Événements & Agenda', icon: Calendar, category: 'Publications' },
    { id: 'pages', label: 'Pages du site', icon: FileCode, category: 'Structure' },
    { id: 'photos', label: 'Galerie photos', icon: Image, category: 'Médiathèque' },
    { id: 'videos', label: 'Vidéos & Reportages', icon: Video, category: 'Médiathèque' },
    { id: 'documents', label: 'Documents officiels', icon: FileText, category: 'Ressources' },
    { id: 'projets', label: 'Projets de développement', icon: Target, category: 'Ressources' },
    { id: 'communautaire', label: 'Contributions Citoyennes', icon: HeartHandshake, badge: pendingSubmissionsCount, category: 'Interaction' },
    { id: 'contacts', label: 'Contacts reçus', icon: Mail, badge: unreadContactsCount, category: 'Interaction' },
    { id: 'utilisateurs', label: 'Utilisateurs & Rôles', icon: Users, locked: !isSuperAdmin, category: 'Administration' },
    { id: 'parametres', label: 'Paramètres du site', icon: Settings, locked: !isSuperAdmin && !isEditor, category: 'Administration' },
  ];

  return (
    <aside className="w-64 bg-stone-900 border-r border-stone-800 text-stone-200 flex flex-col justify-between flex-shrink-0 min-h-screen">
      <div>
        {/* Village Brand in Admin */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center font-bold text-lg shadow-md">
              N
            </div>
            <div>
              <span className="font-serif-royal text-base font-bold text-white block tracking-wide">
                NTOLO ADMIN
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-semibold">
                Portail Officiel
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                disabled={item.locked}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : item.locked
                    ? 'opacity-40 cursor-not-allowed text-stone-500'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-stone-950 text-amber-300' : 'bg-amber-500 text-stone-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.locked && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-500 font-mono">
                      Admin
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls: Back to public & Logout */}
      <div className="p-3 border-t border-stone-800 space-y-1.5 bg-stone-950/60">
        <button
          onClick={onNavigateToPublic}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300 border border-emerald-900/40 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 border border-red-950 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Déconnexion sécurisée</span>
        </button>
      </div>
    </aside>
  );
};
