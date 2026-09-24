import {
  EventItem,
  DocumentItem,
  ProjectItem,
  SiteSettings,
  ContactMessage,
  ManagedPage,
  AdminActivityLog,
  UserRole,
  MultimediaItem,
  PublicationItem,
} from '../types';
import { SAMPLE_EVENTS, SAMPLE_PROJECTS, SAMPLE_DOCUMENTS, PAGES_META } from '../data/villageData';
import {
  getStoredPublications,
  saveStoredPublications,
  savePublication,
  deletePublication,
  togglePublicationPublished,
} from './publicationService';
import {
  getStoredMedia,
  saveMediaItem,
  deleteMediaItem,
} from './galleryService';

// Storage keys
const KEY_EVENTS = 'ntolo_admin_events_v1';
const KEY_PAGES = 'ntolo_admin_pages_v1';
const KEY_DOCUMENTS = 'ntolo_admin_documents_v1';
const KEY_PROJECTS = 'ntolo_admin_projects_v1';
const KEY_CONTACTS = 'ntolo_admin_contacts_v1';
const KEY_SETTINGS = 'ntolo_admin_settings_v1';
const KEY_LOGS = 'ntolo_admin_logs_v1';

export const EVENT_ADMIN_DATA_CHANGED = 'ntolo_admin_data_changed';

// =========================================================================
// 1. PARAMÈTRES DU SITE
// =========================================================================

export const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: 'NTOLO',
  subtitle: 'Portail Institutionnel & Numérique Officiel',
  slogan: 'Union - Travail - Solidarité pour l’Émergence de Ntolo',
  chiefTitle: 'Chef Traditionnel de 3e Degré',
  chiefName: 'Sa Majesté le Chef de Ntolo & le Conseil des Sages',
  contactEmail: 'contact@ntolo-village.cm',
  contactPhone: '(+237) 670 00 11 22 / 690 12 34 56',
  whatsappNumber: '+237670001122',
  whatsappMessagePreset: 'Bonjour le Secrétariat du Village de Ntolo, je vous contacte via le portail numérique officiel pour :',
  secretariatHours: 'Lundi au Vendredi : 08h00 - 15h30 | Samedi : 09h00 - 12h00',
  locationSummary: 'Arrondissement de Nlonako, Département du Moungo, Région du Littoral, Cameroun',
  address: 'Chefferie Traditionnelle de Ntolo, Face Place du Marché Coutumier, Nlonako, Moungo',
  socialFacebookUrl: 'https://facebook.com/village.ntolo.officiel',
  socialWhatsappGroupUrl: 'https://chat.whatsapp.com/invite/ntolo-communaute',
  socialYoutubeUrl: 'https://youtube.com/@ntolo-patrimoine',
  socialTwitterUrl: 'https://twitter.com/NtoloOfficiel',
  socialLinkedinUrl: 'https://linkedin.com/company/codev-ntolo',
  gpsLatitude: 4.9167,
  gpsLongitude: 9.9667,
  gpsAltitude: '640 m (Contreforts du Mont Nlonako)',
  emergencyBannerActive: true,
  emergencyBannerText: 'COMMUNIQUÉ OFFICIEL : Lancement du projet d’adduction d’eau potable par gravité sous le Mont Nlonako.',
  allowCitizenContributions: true,
  maintenanceMode: false,
  lastUpdated: new Date().toLocaleDateString('fr-FR'),

  // Monétisation éthique & Partenariats
  partnerAdBannerActive: true,
  partnerAdBannerTitle: 'Partenaire Officiel du Terroir',
  partnerAdBannerSponsor: 'Union des Coopératives du Moungo (UCAM)',
  partnerAdBannerText: 'Soutien aux caféiculteurs et cacaoyers biologiques de Ntolo. Valorisation de notre terroir agricole.',
  partnerAdBannerLink: 'https://nlonako.cm',
  partnerAdBannerCta: 'Découvrir la filière',

  // Passerelle de paiement futur
  onlinePaymentEnabled: true,
  onlinePaymentSandboxMode: true,
  onlinePaymentOrangeMoneyNumber: '+237 690 12 34 56',
  onlinePaymentMtnMoMoNumber: '+237 670 00 11 22',
  onlinePaymentCampayAppKey: 'campay_sandbox_ntolo_key_mock_2026',
  onlinePaymentFlutterwavePublicKey: 'FLWPUBK_TEST_ntolo_mock_2026',

  // Mentions Légales & Politique de Confidentialité Configurables
  legalPublisherName: 'Chefferie Traditionnelle de Ntolo (3e Degré) & Comité de Développement de Ntolo (CODEV)',
  legalDirectorPublication: 'Sa Majesté le Chef Traditionnel de Ntolo & le Secrétariat Général de la Chefferie',
  legalEditorialResponsibility: 'Commission Information, Communication & Archives Communautaires du CODEV',
  legalHostName: 'Infrastructure Cloud Sécurisée Haute Disponibilité (Datacenter certifié ISO/IEC 27001)',
  legalHostAddress: 'Supervision technique continue 24/7, chiffrement HTTPS/TLS 1.3 de bout en bout',
  legalDpoContact: 'contact@ntolo.cm / secretariat@ntolo-village.cm',
  legalCustomaryDecree: 'Décret présidentiel N° 77/245 du 15 juillet 1977 portant organisation des chefferies traditionnelles au Cameroun et Arrêté préfectoral d’homologation (Département du Moungo, Nkongsamba)',
  legalDataRetentionPolicy: 'Les données nominatives recueillies lors des recensements de la diaspora, dépôts de projets ou doléances sont conservées pour une durée strictement limitée à l’utilité administrative et coutumière. Droit d’accès, de rectification et d’effacement garanti sous 30 jours sur simple demande écrite.',
  legalCookiePolicyText: 'Ce portail officiel pratique une politique de sobriété numérique : aucun cookie publicitaire ou traceur commercial tiers n’est déposé sur votre terminal. Seules les données locales de session strictement nécessaires à la navigation et à la sécurité de l’administration sont utilisées.',
};

export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(KEY_SETTINGS);
    if (!raw) {
      localStorage.setItem(KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSiteSettings(settings: SiteSettings): SiteSettings {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return settings;
}

// =========================================================================
// 2. ÉVÉNEMENTS (AGENDA)
// =========================================================================

export function getStoredEvents(): (EventItem & { published: boolean; attendeesCount?: number })[] {
  if (typeof window === 'undefined') {
    return SAMPLE_EVENTS.map((e) => ({ ...e, published: true, attendeesCount: 45 }));
  }
  try {
    const raw = localStorage.getItem(KEY_EVENTS);
    if (!raw) {
      const initial = SAMPLE_EVENTS.map((e) => ({ ...e, published: true, attendeesCount: 45 }));
      localStorage.setItem(KEY_EVENTS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SAMPLE_EVENTS.map((e) => ({ ...e, published: true, attendeesCount: 45 }));
  }
}

export function saveEvent(event: EventItem & { published: boolean; attendeesCount?: number }) {
  const current = getStoredEvents();
  const index = current.findIndex((e) => e.id === event.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = event;
  } else {
    updated = [event, ...current];
  }
  localStorage.setItem(KEY_EVENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function deleteEvent(id: string) {
  const current = getStoredEvents();
  const updated = current.filter((e) => e.id !== id);
  localStorage.setItem(KEY_EVENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function toggleEventPublished(id: string) {
  const current = getStoredEvents();
  const item = current.find((e) => e.id === id);
  if (item) {
    item.published = !item.published;
    localStorage.setItem(KEY_EVENTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  }
}

// =========================================================================
// 3. GESTION DES PAGES DU SITE
// =========================================================================

export function getStoredPages(): ManagedPage[] {
  const initialPages: ManagedPage[] = PAGES_META.map((p) => ({
    pageId: p.id,
    title: p.title,
    navLabel: p.navLabel,
    subtitle: `Page institutionnelle officielle • ${p.title}`,
    metaDescription: p.description,
    category: p.category,
    lastUpdated: '2026-09-23',
    published: true,
  }));

  if (typeof window === 'undefined') return initialPages;
  try {
    const raw = localStorage.getItem(KEY_PAGES);
    if (!raw) {
      localStorage.setItem(KEY_PAGES, JSON.stringify(initialPages));
      return initialPages;
    }
    const parsed: ManagedPage[] = JSON.parse(raw);
    // Ensure all current pages exist
    if (parsed.length < initialPages.length) {
      const merged = initialPages.map((init) => {
        const found = parsed.find((p) => p.pageId === init.pageId);
        return found || init;
      });
      localStorage.setItem(KEY_PAGES, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch (e) {
    return initialPages;
  }
}

export function saveManagedPage(page: ManagedPage) {
  const current = getStoredPages();
  const index = current.findIndex((p) => p.pageId === page.pageId);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...page, lastUpdated: new Date().toISOString().split('T')[0] };
  } else {
    updated = [...current, { ...page, lastUpdated: new Date().toISOString().split('T')[0] }];
  }
  localStorage.setItem(KEY_PAGES, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function togglePageVisibility(pageId: string) {
  const current = getStoredPages();
  const page = current.find((p) => p.pageId === pageId);
  if (page) {
    page.published = !page.published;
    page.lastUpdated = new Date().toISOString().split('T')[0];
    localStorage.setItem(KEY_PAGES, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  }
}

// =========================================================================
// 4. DOCUMENTS OFFICIELS TÉLÉCHARGEABLES
// =========================================================================

export function getStoredDocuments(): DocumentItem[] {
  if (typeof window === 'undefined') {
    return SAMPLE_DOCUMENTS.map((d) => ({ ...d, published: true, downloadUrl: '#' }));
  }
  try {
    const raw = localStorage.getItem(KEY_DOCUMENTS);
    if (!raw) {
      const initial = SAMPLE_DOCUMENTS.map((d) => ({ ...d, published: true, downloadUrl: '#' }));
      localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SAMPLE_DOCUMENTS.map((d) => ({ ...d, published: true, downloadUrl: '#' }));
  }
}

export function saveDocument(doc: DocumentItem) {
  const current = getStoredDocuments();
  const index = current.findIndex((d) => d.id === doc.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = doc;
  } else {
    updated = [doc, ...current];
  }
  localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function deleteDocument(id: string) {
  const current = getStoredDocuments();
  const updated = current.filter((d) => d.id !== id);
  localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function toggleDocumentPublished(id: string) {
  const current = getStoredDocuments();
  const doc = current.find((d) => d.id === id);
  if (doc) {
    doc.published = doc.published === undefined ? false : !doc.published;
    localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  }
}

// =========================================================================
// 5. PROJETS DE DÉVELOPPEMENT
// =========================================================================

export function getStoredProjects(): (ProjectItem & { published?: boolean })[] {
  if (typeof window === 'undefined') {
    return SAMPLE_PROJECTS.map((p) => ({ ...p, published: true }));
  }
  try {
    const raw = localStorage.getItem(KEY_PROJECTS);
    if (!raw) {
      const initial = SAMPLE_PROJECTS.map((p) => ({ ...p, published: true }));
      localStorage.setItem(KEY_PROJECTS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SAMPLE_PROJECTS.map((p) => ({ ...p, published: true }));
  }
}

export function saveProject(project: ProjectItem & { published?: boolean }) {
  const current = getStoredProjects();
  const index = current.findIndex((p) => p.id === project.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    updated = [project, ...current];
  }
  localStorage.setItem(KEY_PROJECTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function deleteProject(id: string) {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(KEY_PROJECTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function toggleProjectPublished(id: string) {
  const current = getStoredProjects();
  const proj = current.find((p) => p.id === id);
  if (proj) {
    proj.published = proj.published === undefined ? false : !proj.published;
    localStorage.setItem(KEY_PROJECTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  }
}

// =========================================================================
// 6. CONTACTS REÇUS & REQUÊTES DES CITOYENS
// =========================================================================

const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Mme Christine Ebelle',
    senderEmail: 'christine.ebelle@gmail.com',
    senderPhone: '+237 699 12 34 56',
    subject: 'Contribution de l’antenne Diaspora de Douala pour le forage',
    category: 'Contribution Projet',
    message: 'Bonjour Majesté et le bureau du CODEV. Notre réunion mensuelle des originaires de Ntolo à Douala a validé la première tranche de souscription pour le point d’eau du Quartier Bas-Village. Comment effectuer le versement bancaire ?',
    receivedAt: '2026-09-22 14:30',
    status: 'nouveau',
  },
  {
    id: 'msg-2',
    senderName: 'M. Jean-Paul Mbella',
    senderEmail: 'jp.mbella@yahoo.fr',
    senderPhone: '+237 677 88 99 00',
    subject: 'Demande d’audience coutumière pour un différend foncier familial',
    category: 'Audiences Coutumières',
    message: 'Je sollicite respectueusement une audience auprès du Conseil des Notables lors de la prochaine session d’arbitrage coutumier concernant les limites de la parcelle cacaoyère héritée de mon grand-père.',
    receivedAt: '2026-09-20 09:15',
    status: 'en_cours',
    adminNotes: 'Dossier transmis au Secrétaire de la Chefferie pour convocation du 4 octobre.',
  },
  {
    id: 'msg-3',
    senderName: 'Association des Jeunes Volontaires',
    senderEmail: 'jeunes.ntolo@outlook.com',
    senderPhone: '+237 655 44 33 22',
    subject: 'Organisation du Salongo de nettoyage des sources',
    category: 'Doléance',
    message: 'Nous proposons de mobiliser 30 jeunes pour le débroussaillage des abords de la source haute samedi prochain. Nous sollicitons l’appui logistique du CODEV pour les gants et sacs poubelles.',
    receivedAt: '2026-09-18 16:45',
    status: 'traite',
    adminNotes: 'Matériel accordé et remis par le trésorier du CODEV le 19 septembre.',
  },
];

export function getStoredContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return INITIAL_CONTACT_MESSAGES;
  try {
    const raw = localStorage.getItem(KEY_CONTACTS);
    if (!raw) {
      localStorage.setItem(KEY_CONTACTS, JSON.stringify(INITIAL_CONTACT_MESSAGES));
      return INITIAL_CONTACT_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CONTACT_MESSAGES;
  }
}

export function saveContactMessage(msg: ContactMessage) {
  const current = getStoredContactMessages();
  const index = current.findIndex((m) => m.id === msg.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = msg;
  } else {
    updated = [msg, ...current];
  }
  localStorage.setItem(KEY_CONTACTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

export function submitCitizenContact(data: {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  subject: string;
  category: ContactMessage['category'];
  message: string;
}): ContactMessage {
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    senderName: data.senderName.trim(),
    senderEmail: data.senderEmail.trim(),
    senderPhone: data.senderPhone.trim(),
    subject: data.subject.trim(),
    category: data.category,
    message: data.message.trim(),
    receivedAt: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
    status: 'nouveau',
  };
  saveContactMessage(newMsg);
  return newMsg;
}

export function updateContactStatus(id: string, status: ContactMessage['status'], notes?: string) {
  const current = getStoredContactMessages();
  const msg = current.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    if (notes !== undefined) msg.adminNotes = notes;
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  }
}

export function deleteContactMessage(id: string) {
  const current = getStoredContactMessages();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(KEY_CONTACTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
  return updated;
}

// =========================================================================
// 7. JOURNAL D'ACTIVITÉS (LOGS)
// =========================================================================

export function getAdminActivityLogs(): AdminActivityLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function logAdminActivity(
  userName: string,
  userRole: AdminActivityLog['userRole'],
  action: AdminActivityLog['action'],
  entityType: AdminActivityLog['entityType'],
  entityTitle: string,
  details?: string
) {
  const logs = getAdminActivityLogs();
  const newLog: AdminActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'medium' }),
    userName,
    userRole,
    action,
    entityType,
    entityTitle,
    details,
  };
  const updated = [newLog, ...logs].slice(0, 100); // keep 100 latest actions
  localStorage.setItem(KEY_LOGS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
}

// =========================================================================
// 8. SAUVEGARDE ET RESTAURATION COMPLÈTE DU SYSTÈME
// =========================================================================

export function exportFullDatabaseBackup(): string {
  const backup = {
    exportDate: new Date().toISOString(),
    system: 'Portail Institutionnel de Ntolo',
    settings: getSiteSettings(),
    publications: getStoredPublications(),
    events: getStoredEvents(),
    pages: getStoredPages(),
    media: getStoredMedia(),
    documents: getStoredDocuments(),
    projects: getStoredProjects(),
    contacts: getStoredContactMessages(),
    logs: getAdminActivityLogs(),
  };
  return JSON.stringify(backup, null, 2);
}

export function importFullDatabaseBackup(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.settings) localStorage.setItem(KEY_SETTINGS, JSON.stringify(data.settings));
    if (data.publications) saveStoredPublications(data.publications);
    if (data.events) localStorage.setItem(KEY_EVENTS, JSON.stringify(data.events));
    if (data.pages) localStorage.setItem(KEY_PAGES, JSON.stringify(data.pages));
    if (data.documents) localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(data.documents));
    if (data.projects) localStorage.setItem(KEY_PROJECTS, JSON.stringify(data.projects));
    if (data.contacts) localStorage.setItem(KEY_CONTACTS, JSON.stringify(data.contacts));
    window.dispatchEvent(new CustomEvent(EVENT_ADMIN_DATA_CHANGED));
    return true;
  } catch (e) {
    console.error('Erreur restauration sauvegarde:', e);
    return false;
  }
}
