import React from 'react';
import {
  Newspaper, Megaphone, Calendar, FileCode, Image, Video,
  FileText, Target, Mail, Users, ArrowUpRight, CheckCircle2,
  Clock, AlertCircle, Eye, ShieldCheck, Plus, Sparkles
} from 'lucide-react';
import { AdminTab } from '../AdminSidebar';
import { UserRole, AdminActivityLog } from '../../../types';

interface OverviewTabProps {
  stats: {
    newsCount: number;
    announcementsCount: number;
    eventsCount: number;
    pagesCount: number;
    photosCount: number;
    videosCount: number;
    documentsCount: number;
    projectsCount: number;
    contactsCount: number;
    unreadContactsCount: number;
    usersCount: number;
  };
  activityLogs: AdminActivityLog[];
  onSelectTab: (tab: AdminTab) => void;
  userRole: UserRole;
  emergencyBannerText?: string;
  emergencyBannerActive?: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  activityLogs,
  onSelectTab,
  userRole,
  emergencyBannerText,
  emergencyBannerActive,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Alert banner status indicator */}
      {emergencyBannerActive && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-3 text-amber-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Megaphone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                Bannière d'alerte officielle active sur le site public
              </span>
              <p className="mt-0.5 text-stone-300">{emergencyBannerText}</p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('parametres')}
            className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold text-[10px] hover:bg-amber-400 flex-shrink-0"
          >
            Modifier
          </button>
        </div>
      )}

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { id: 'actualites' as AdminTab, label: 'Actualités', count: stats.newsCount, icon: Newspaper, color: 'text-emerald-400', bg: 'bg-emerald-950/40' },
          { id: 'annonces' as AdminTab, label: 'Annonces & Avis', count: stats.announcementsCount, icon: Megaphone, color: 'text-amber-400', bg: 'bg-amber-950/40' },
          { id: 'evenements' as AdminTab, label: 'Événements', count: stats.eventsCount, icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-950/40' },
          { id: 'pages' as AdminTab, label: 'Pages du site', count: stats.pagesCount, icon: FileCode, color: 'text-purple-400', bg: 'bg-purple-950/40' },
          { id: 'photos' as AdminTab, label: 'Photos médiathèque', count: stats.photosCount, icon: Image, color: 'text-rose-400', bg: 'bg-rose-950/40' },
          { id: 'videos' as AdminTab, label: 'Vidéos & capsules', count: stats.videosCount, icon: Video, color: 'text-red-400', bg: 'bg-red-950/40' },
          { id: 'documents' as AdminTab, label: 'Documents officiels', count: stats.documentsCount, icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-950/40' },
          { id: 'projets' as AdminTab, label: 'Projets CODEV', count: stats.projectsCount, icon: Target, color: 'text-teal-400', bg: 'bg-teal-950/40' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectTab(card.id)}
              className="bg-stone-900 border border-stone-800 p-4 rounded-2xl hover:border-stone-700 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-stone-300 transition-colors" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-white block">
                  {card.count}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {card.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Citizen Contacts & Security Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unread Citizen Contacts Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Interactions Citoyennes</span>
              </span>
              {stats.unreadContactsCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-stone-950">
                  {stats.unreadContactsCount} nouveaux
                </span>
              )}
            </div>
            <h3 className="font-bold text-white text-base">
              Doléances & Audiences Reçues
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Consultez les requêtes officielles, les demandes d'audience auprès de Sa Majesté et les propositions de la diaspora.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectTab('contacts')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Traiter les messages reçus ({stats.contactsCount})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Buttons for Publishing */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Actions Rapides</span>
            </span>
            <h3 className="font-bold text-white text-base">
              Créer & Publier Directement
            </h3>
            <p className="text-xs text-stone-400">
              Rédigez un nouveau communiqué ou ajoutez une réalisation au portail.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onSelectTab('actualites')}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left flex items-center gap-2 border border-stone-700"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Article d’actualité</span>
            </button>
            <button
              onClick={() => onSelectTab('annonces')}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left flex items-center gap-2 border border-stone-700"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Avis officiel</span>
            </button>
            <button
              onClick={() => onSelectTab('photos')}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left flex items-center gap-2 border border-stone-700"
            >
              <Plus className="w-3.5 h-3.5 text-rose-400" />
              <span>Photo d’archive</span>
            </button>
            <button
              onClick={() => onSelectTab('documents')}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left flex items-center gap-2 border border-stone-700"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Document officiel</span>
            </button>
          </div>
        </div>

        {/* System Security and Role status */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sécurité & Rôles</span>
            </span>
            <h3 className="font-bold text-white text-base">
              Comptes & Permissions
            </h3>
            <p className="text-xs text-stone-400">
              {stats.usersCount} comptes actifs sous chiffrement SHA-256 avec salage.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-stone-300">
              <span>Votre rôle actif :</span>
              <span className="font-bold text-amber-400 capitalize">{userRole.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>Mots de passe en clair :</span>
              <span className="text-emerald-400 font-bold">Zéro (Hachés)</span>
            </div>
          </div>

          {userRole === 'administrateur_principal' ? (
            <button
              onClick={() => onSelectTab('utilisateurs')}
              className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Gérer les comptes utilisateurs</span>
            </button>
          ) : (
            <span className="text-[11px] text-stone-400 italic text-center block">
              Gestion des comptes réservée à Sa Majesté
            </span>
          )}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-base">
              Journal d’Audit & Dernières Modifications
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            Traçabilité des actions
          </span>
        </div>

        {activityLogs.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-stone-950/40 rounded-2xl border border-stone-800/80">
            Aucune modification récente enregistrée dans la session active.
          </div>
        ) : (
          <div className="divide-y divide-stone-800/80 max-h-72 overflow-y-auto pr-2 scrollbar-thin">
            {activityLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    log.action === 'publish' ? 'bg-emerald-500/20 text-emerald-300' :
                    log.action === 'unpublish' ? 'bg-amber-500/20 text-amber-300' :
                    log.action === 'delete' ? 'bg-red-500/20 text-red-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {log.action}
                  </span>
                  <span className="text-stone-200 font-medium">
                    {log.entityTitle}
                  </span>
                  <span className="text-stone-400 text-[11px] hidden sm:inline">
                    ({log.entityType})
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-stone-400 text-[11px]">
                  <span className="font-semibold text-stone-300">{log.userName}</span>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
