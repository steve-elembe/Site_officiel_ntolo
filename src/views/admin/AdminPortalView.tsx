import React, { useState, useEffect } from 'react';
import { AdminUser, PageId, PublicationItem, EventItem, DocumentItem, ProjectItem, ContactMessage, ManagedPage, MultimediaItem, SiteSettings, AdminActivityLog } from '../../types';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { OverviewTab } from './tabs/OverviewTab';
import { PublicationsTab } from './tabs/PublicationsTab';
import { EventsTab } from './tabs/EventsTab';
import { PagesTab } from './tabs/PagesTab';
import { MediaTab } from './tabs/MediaTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ContactsTab } from './tabs/ContactsTab';
import { CommunitySubmissionsTab } from './tabs/CommunitySubmissionsTab';
import { UsersTab } from './tabs/UsersTab';
import { SettingsTab } from './tabs/SettingsTab';
import {
  getStoredEvents, saveEvent, deleteEvent, toggleEventPublished,
  getStoredPages, saveManagedPage, togglePageVisibility,
  getStoredDocuments, saveDocument, deleteDocument, toggleDocumentPublished,
  getStoredProjects, saveProject, deleteProject, toggleProjectPublished,
  getStoredContactMessages, updateContactStatus, deleteContactMessage,
  getSiteSettings, saveSiteSettings,
  getAdminActivityLogs, logAdminActivity,
  EVENT_ADMIN_DATA_CHANGED,
} from '../../services/adminService';
import {
  getStoredPublications, savePublication, deletePublication, togglePublicationPublished,
} from '../../services/publicationService';
import {
  getStoredMedia, saveMediaItem, deleteMediaItem,
} from '../../services/galleryService';
import {
  getStoredUsers, saveUser, deleteUser, logoutAdmin,
} from '../../services/authService';
import {
  getStoredCommunitySubmissions,
  EVENT_COMMUNITY_DATA_CHANGED,
} from '../../services/communityService';

interface AdminPortalViewProps {
  currentUser: Omit<AdminUser, 'passwordHash'>;
  onLogout: () => void;
  onNavigateToPublic: (pageId?: PageId) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  currentUser,
  onLogout,
  onNavigateToPublic,
}) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  // Data states
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [events, setEvents] = useState<(EventItem & { published: boolean; attendeesCount?: number })[]>([]);
  const [pages, setPages] = useState<ManagedPage[]>([]);
  const [mediaItems, setMediaItems] = useState<MultimediaItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [projects, setProjects] = useState<(ProjectItem & { published?: boolean })[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>([]);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] = useState<number>(0);

  // Load all data
  const loadAll = () => {
    setPublications(getStoredPublications());
    setEvents(getStoredEvents());
    setPages(getStoredPages());
    setMediaItems(getStoredMedia());
    setDocuments(getStoredDocuments());
    setProjects(getStoredProjects());
    setContacts(getStoredContactMessages());
    setUsers(getStoredUsers());
    setSettings(getSiteSettings());
    setActivityLogs(getAdminActivityLogs());
    const communitySubs = getStoredCommunitySubmissions();
    setPendingSubmissionsCount(communitySubs.filter((s) => s.status === 'recu').length);
  };

  useEffect(() => {
    loadAll();
    const handleDataChanged = () => {
      loadAll();
    };
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleDataChanged);
    window.addEventListener(EVENT_COMMUNITY_DATA_CHANGED, handleDataChanged);
    return () => {
      window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleDataChanged);
      window.removeEventListener(EVENT_COMMUNITY_DATA_CHANGED, handleDataChanged);
    };
  }, [refreshKey]);

  // Derived metrics
  const newsCount = publications.filter((p) => p.category !== 'Annonces').length;
  const announcementsCount = publications.filter((p) => p.category === 'Annonces').length;
  const unreadContactsCount = contacts.filter((c) => c.status === 'nouveau').length;

  // Handlers with audit logging
  const handleSavePublication = (item: PublicationItem) => {
    savePublication(item);
    const entityType = item.category === 'Annonces' ? 'annonce' : 'actualite';
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', entityType, item.title);
    setRefreshKey((k) => k + 1);
  };

  const handleDeletePublication = (id: string, title: string) => {
    deletePublication(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'actualite', title);
    setRefreshKey((k) => k + 1);
  };

  const handleTogglePublicationPublish = (id: string, title: string) => {
    const updated = togglePublicationPublished(id);
    const item = updated.find((p) => p.id === id);
    const action = item?.published !== false ? 'publish' : 'unpublish';
    const entityType = item?.category === 'Annonces' ? 'annonce' : 'actualite';
    logAdminActivity(currentUser.fullName, currentUser.role, action, entityType, title);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveEvent = (evt: EventItem & { published: boolean; attendeesCount?: number }) => {
    saveEvent(evt);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'evenement', evt.title);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    deleteEvent(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'evenement', title);
    setRefreshKey((k) => k + 1);
  };

  const handleToggleEventPublish = (id: string) => {
    toggleEventPublished(id);
    const target = events.find((e) => e.id === id);
    const action = target?.published ? 'unpublish' : 'publish';
    logAdminActivity(currentUser.fullName, currentUser.role, action, 'evenement', target?.title || 'Événement');
    setRefreshKey((k) => k + 1);
  };

  const handleSavePage = (page: ManagedPage) => {
    saveManagedPage(page);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'page', page.title);
    setRefreshKey((k) => k + 1);
  };

  const handleTogglePageVisibility = (pageId: PageId) => {
    togglePageVisibility(pageId);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'page', `Visibilité page /${pageId}`);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveMedia = (media: MultimediaItem) => {
    saveMediaItem(media);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'galerie', media.title);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteMedia = (id: string, title: string) => {
    deleteMediaItem(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'galerie', title);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveDocument = (doc: DocumentItem) => {
    saveDocument(doc);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'document', doc.title);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteDocument = (id: string, title: string) => {
    deleteDocument(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'document', title);
    setRefreshKey((k) => k + 1);
  };

  const handleToggleDocumentPublish = (id: string) => {
    toggleDocumentPublished(id);
    const target = documents.find((d) => d.id === id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'document', `Statut publication ${target?.title}`);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveProject = (proj: ProjectItem & { published?: boolean }) => {
    saveProject(proj);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'projet', proj.title);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteProject = (id: string, title: string) => {
    deleteProject(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'projet', title);
    setRefreshKey((k) => k + 1);
  };

  const handleToggleProjectPublish = (id: string) => {
    toggleProjectPublished(id);
    const target = projects.find((p) => p.id === id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'projet', `Publication projet ${target?.title}`);
    setRefreshKey((k) => k + 1);
  };

  const handleUpdateContactStatus = (id: string, status: ContactMessage['status'], notes?: string) => {
    updateContactStatus(id, status, notes);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteContact = (id: string) => {
    deleteContactMessage(id);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveUser = (u: AdminUser) => {
    saveUser(u);
    logAdminActivity(currentUser.fullName, currentUser.role, 'edit', 'utilisateur', u.fullName);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteUser = (id: string, name: string) => {
    deleteUser(id);
    logAdminActivity(currentUser.fullName, currentUser.role, 'delete', 'utilisateur', name);
    setRefreshKey((k) => k + 1);
  };

  const handleSaveSettings = (st: SiteSettings) => {
    saveSiteSettings(st);
    logAdminActivity(currentUser.fullName, currentUser.role, 'settings', 'parametre', 'Paramètres généraux du site');
    setRefreshKey((k) => k + 1);
  };

  const getHeaderMeta = () => {
    switch (currentTab) {
      case 'dashboard':
        return { title: 'Tableau de bord Général', subtitle: 'Aperçu centralisé de l’activité et des interactions citoyennes' };
      case 'actualites':
        return { title: 'Gestion des Actualités', subtitle: 'Articles, reportages de développement et vie communautaire' };
      case 'annonces':
        return { title: 'Avis Officiels & Annonces', subtitle: 'Panneau d’affichage numérique officiel de la Chefferie' };
      case 'evenements':
        return { title: 'Événements & Agenda', subtitle: 'Cérémonies royales, salongo, tournois et assemblées générales' };
      case 'pages':
        return { title: 'Pages du Site', subtitle: 'Structure, intitulés et visibilité des rubriques institutionnelles' };
      case 'photos':
        return { title: 'Galerie Photos', subtitle: 'Fonds photographique, patrimoine et terroir du Moungo' };
      case 'videos':
        return { title: 'Vidéos & Reportages', subtitle: 'Témoignages, capsules vidéo et archives filmées' };
      case 'documents':
        return { title: 'Documents & Actes Officiels', subtitle: 'Statuts, formulaires d’adhésion et fiches de renseignement' };
      case 'projets':
        return { title: 'Projets de Développement', subtitle: 'Chantiers prioritaires, suivi budgétaire et souscriptions' };
      case 'contacts':
        return { title: 'Requêtes & Doléances Reçues', subtitle: 'Messages des citoyens, demandes d’audience et diaspora' };
      case 'communautaire':
        return { title: 'Contributions Citoyennes & 7 Formulaires', subtitle: 'Gestion des propositions d’actualités, alertes besoins, projets participatifs, promesses de dons et partenariats' };
      case 'utilisateurs':
        return { title: 'Utilisateurs & Permissions', subtitle: 'Gestion des comptes sous chiffrement SHA-256 avec salage' };
      case 'parametres':
        return { title: 'Paramètres du Portail', subtitle: 'Identité officielle, bannière d’alerte et sauvegardes' };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userRole={currentUser.role}
        unreadContactsCount={unreadContactsCount}
        pendingSubmissionsCount={pendingSubmissionsCount}
        onNavigateToPublic={() => onNavigateToPublic('accueil')}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          currentUser={currentUser}
          title={headerMeta.title}
          subtitle={headerMeta.subtitle}
          onNavigateToPublic={() => onNavigateToPublic('accueil')}
          onLogout={onLogout}
          unreadCount={unreadContactsCount}
        />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {currentTab === 'dashboard' && (
            <OverviewTab
              stats={{
                newsCount,
                announcementsCount,
                eventsCount: events.length,
                pagesCount: pages.length,
                photosCount: mediaItems.filter((m) => m.type === 'photo').length,
                videosCount: mediaItems.filter((m) => m.type === 'video').length,
                documentsCount: documents.length,
                projectsCount: projects.length,
                contactsCount: contacts.length,
                unreadContactsCount,
                usersCount: users.length,
              }}
              activityLogs={activityLogs}
              onSelectTab={setCurrentTab}
              userRole={currentUser.role}
              emergencyBannerActive={settings.emergencyBannerActive}
              emergencyBannerText={settings.emergencyBannerText}
            />
          )}

          {currentTab === 'actualites' && (
            <PublicationsTab
              type="actualites"
              items={publications}
              onSave={handleSavePublication}
              onDelete={handleDeletePublication}
              onTogglePublish={handleTogglePublicationPublish}
              userRole={currentUser.role}
              currentUserName={currentUser.fullName}
            />
          )}

          {currentTab === 'annonces' && (
            <PublicationsTab
              type="annonces"
              items={publications}
              onSave={handleSavePublication}
              onDelete={handleDeletePublication}
              onTogglePublish={handleTogglePublicationPublish}
              userRole={currentUser.role}
              currentUserName={currentUser.fullName}
            />
          )}

          {currentTab === 'evenements' && (
            <EventsTab
              events={events}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
              onTogglePublish={handleToggleEventPublish}
              userRole={currentUser.role}
            />
          )}

          {currentTab === 'pages' && (
            <PagesTab
              pages={pages}
              onSave={handleSavePage}
              onToggleVisibility={handleTogglePageVisibility}
              onPreviewPage={(pId) => onNavigateToPublic(pId)}
              userRole={currentUser.role}
            />
          )}

          {currentTab === 'photos' && (
            <MediaTab
              initialType="photo"
              mediaItems={mediaItems}
              onSaveMedia={handleSaveMedia}
              onDeleteMedia={handleDeleteMedia}
              userRole={currentUser.role}
              currentUserName={currentUser.fullName}
            />
          )}

          {currentTab === 'videos' && (
            <MediaTab
              initialType="video"
              mediaItems={mediaItems}
              onSaveMedia={handleSaveMedia}
              onDeleteMedia={handleDeleteMedia}
              userRole={currentUser.role}
              currentUserName={currentUser.fullName}
            />
          )}

          {currentTab === 'documents' && (
            <DocumentsTab
              documents={documents}
              onSave={handleSaveDocument}
              onDelete={handleDeleteDocument}
              onTogglePublish={handleToggleDocumentPublish}
              userRole={currentUser.role}
            />
          )}

          {currentTab === 'projets' && (
            <ProjectsTab
              projects={projects}
              onSave={handleSaveProject}
              onDelete={handleDeleteProject}
              onTogglePublish={handleToggleProjectPublish}
              userRole={currentUser.role}
            />
          )}

          {currentTab === 'contacts' && (
            <ContactsTab
              messages={contacts}
              onUpdateStatus={handleUpdateContactStatus}
              onDeleteMessage={handleDeleteContact}
              userRole={currentUser.role}
            />
          )}

          {currentTab === 'communautaire' && (
            <CommunitySubmissionsTab
              userRole={currentUser.role}
              currentUserName={currentUser.fullName}
            />
          )}

          {currentTab === 'utilisateurs' && (
            <UsersTab
              users={users}
              onSaveUser={handleSaveUser}
              onDeleteUser={handleDeleteUser}
              currentUserId={currentUser.id}
            />
          )}

          {currentTab === 'parametres' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={handleSaveSettings}
              userRole={currentUser.role}
            />
          )}
        </main>
      </div>
    </div>
  );
};
