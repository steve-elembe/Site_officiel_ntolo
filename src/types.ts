export type PageId =
  | 'accueil'
  | 'presentation'
  | 'histoire'
  | 'geographie'
  | 'population'
  | 'organisation-traditionnelle'
  | 'organisation-administrative'
  | 'chefferie' // Alias rétrocompatible
  | 'culture'
  | 'langues-patrimoine'
  | 'education'
  | 'sante'
  | 'agriculture'
  | 'elevage'
  | 'economie-commerce'
  | 'infrastructures'
  | 'environnement'
  | 'tourisme'
  | 'projets'
  | 'projets-participatifs'
  | 'actualites'
  | 'article-detail'
  | 'annonces'
  | 'evenements'
  | 'galerie'
  | 'documents'
  | 'diaspora'
  | 'contact'
  | 'partenaires'
  | 'devenir-partenaire'
  | 'mentions-legales'
  | 'admin';

export interface PageMeta {
  id: PageId;
  title: string;
  navLabel: string;
  category: 'village' | 'gouvernance' | 'vie-sociale' | 'economie' | 'medias' | 'action';
  description: string;
  iconName: string;
}

export type ArticleCategory =
  | 'Vie du village'
  | 'Développement'
  | 'Culture'
  | 'Éducation'
  | 'Santé'
  | 'Agriculture'
  | 'Jeunesse'
  | 'Diaspora'
  | 'Événements'
  | 'Annonces';

export interface AttachedDocument {
  id: string;
  title: string;
  fileSize?: string;
  fileType: 'PDF' | 'DOCX' | 'JPG' | 'ZIP';
  downloadUrl?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  slug?: string;
  imageUrl: string;
  date: string;
  author: string;
  authorRole?: string;
  category: ArticleCategory;
  summary: string;
  content: string[];
  gallery?: string[];
  attachedDocuments?: AttachedDocument[];
  isUrgent?: boolean;
  published: boolean;
  viewsCount?: number;
  readTimeMinutes?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Communiqué' | 'Développement' | 'Culture' | 'Santé' | 'Avis Officiel';
  summary: string;
  content: string[];
  author: string;
  isUrgent?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  sector: 'Eau & Assainissement' | 'Éducation' | 'Santé' | 'Énergie & Routes' | 'Jeunesse & Culture';
  status: 'En cours' | 'Planifié' | 'En recherche de financement' | 'Achevé';
  progressPercentage: number;
  budgetEstimated: string;
  fundsRaised: string;
  description: string;
  goals: string[];
  beneficiaries: string;
  contactPerson: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Réunion' | 'Culture' | 'Travaux Communautaires' | 'Sport & Jeunesse';
  description: string;
  organizer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Paysages & Nature' | 'Vie Quotidienne' | 'Cérémonies & Coutumes' | 'Développement';
  imageUrl: string;
  caption: string;
  date: string;
}

export type GalleryAlbum =
  | 'Ntolo aujourd’hui'
  | 'Paysages'
  | 'Culture et traditions'
  | 'Cérémonies'
  | 'Jeunesse'
  | 'Éducation'
  | 'Agriculture'
  | 'Infrastructures'
  | 'Projets'
  | 'Personnalités'
  | 'Diaspora';

export interface MultimediaItem {
  id: string;
  title: string;
  album: GalleryAlbum;
  type: 'photo' | 'video';
  mediaUrl: string; // image poster or photo URL
  videoUrl?: string; // YouTube or direct video URL if video
  duration?: string; // e.g. "03:45"
  caption: string; // légende
  date: string; // date de prise de vue
  location: string; // lieu
  author?: string; // auteur de la photo si disponible
  viewsCount?: number;
}

export interface PatrimoineItem {
  id: string;
  title: string;
  category: 'Lieu' | 'Objet' | 'Tradition' | 'Événement';
  description: string;
  location: string;
  custodian: string; // Gardien coutumier ou institutionnel
  status: string; // ex: "Répertoire officiel" | "Inventaire en cours"
  imageUrl?: string;
  significance?: string; // Portée symbolique ou culturelle
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Administration' | 'Statuts' | 'Fiches Projets' | 'Formulaires';
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  datePublished: string;
  description: string;
  referenceCode: string;
  published?: boolean;
  downloadUrl?: string;
}

// =========================================================================
// TYPES DU PORTAIL D'ADMINISTRATION
// =========================================================================

export type UserRole = 'administrateur_principal' | 'editeur' | 'gestionnaire_contenu';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: UserRole;
  passwordHash: string; // Mot de passe haché SHA-256 avec sel, JAMAIS en clair
  active: boolean;
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
}

export interface SiteSettings {
  siteTitle: string;
  subtitle: string;
  slogan: string;
  chiefTitle: string;
  chiefName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  whatsappMessagePreset: string;
  secretariatHours: string;
  locationSummary: string;
  address: string;
  socialFacebookUrl?: string;
  socialWhatsappGroupUrl?: string;
  socialYoutubeUrl?: string;
  socialTwitterUrl?: string;
  socialLinkedinUrl?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAltitude?: string;
  emergencyBannerActive: boolean;
  emergencyBannerText: string;
  allowCitizenContributions: boolean;
  maintenanceMode: boolean;
  lastUpdated: string;

  // Monétisation éthique & Partenariats
  partnerAdBannerActive?: boolean;
  partnerAdBannerTitle?: string;
  partnerAdBannerText?: string;
  partnerAdBannerLink?: string;
  partnerAdBannerCta?: string;
  partnerAdBannerSponsor?: string;

  // Passerelle de paiement futur
  onlinePaymentEnabled?: boolean;
  onlinePaymentSandboxMode?: boolean;
  onlinePaymentOrangeMoneyNumber?: string;
  onlinePaymentMtnMoMoNumber?: string;
  onlinePaymentCampayAppKey?: string;
  onlinePaymentFlutterwavePublicKey?: string;

  // Mentions Légales & Politique de Confidentialité Configurables
  legalPublisherName?: string;
  legalDirectorPublication?: string;
  legalEditorialResponsibility?: string;
  legalHostName?: string;
  legalHostAddress?: string;
  legalDpoContact?: string;
  legalCustomaryDecree?: string;
  legalDataRetentionPolicy?: string;
  legalCookiePolicyText?: string;
}

export type PartnerCategory =
  | 'institutionnel'
  | 'cooperative_agricole'
  | 'entreprise_moungo'
  | 'diaspora_ong'
  | 'mecenat_sante_education';

export type SponsorshipLevel =
  | 'platine' // Grand Bâtisseur
  | 'or'      // Parrain Or
  | 'argent'  // Partenaire Solidaire
  | 'bronze'; // Bienfaiteur Communautaire

export interface PartnerItem {
  id: string;
  name: string;
  category: PartnerCategory;
  level: SponsorshipLevel;
  logoUrl?: string;
  description: string;
  websiteUrl?: string;
  sponsoredProjects?: string[];
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  featured?: boolean;
  active: boolean;
  partnershipSince: string;
  contributionType?: 'financier' | 'materiel' | 'technique' | 'mixte';
}

export interface ProjectSponsorshipTier {
  id: SponsorshipLevel;
  label: string;
  minAmountFCFA: number;
  benefits: string[];
  badgeColor: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  subject: string;
  category: 'Doléance' | 'Audiences Coutumières' | 'Contribution Projet' | 'Renseignement' | 'Autre';
  message: string;
  receivedAt: string;
  status: 'nouveau' | 'lu' | 'en_cours' | 'traite' | 'archive';
  adminNotes?: string;
}

export interface ManagedPage {
  pageId: PageId;
  title: string;
  navLabel: string;
  subtitle: string;
  metaDescription: string;
  category: 'village' | 'gouvernance' | 'vie-sociale' | 'economie' | 'medias' | 'action';
  lastUpdated: string;
  published: boolean;
  featuredImage?: string;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole | 'citoyen' | 'systeme' | 'contributeur';
  action: 'create' | 'edit' | 'publish' | 'unpublish' | 'delete' | 'login' | 'settings';
  entityType: 'actualite' | 'annonce' | 'evenement' | 'page' | 'galerie' | 'document' | 'projet' | 'contact' | 'utilisateur' | 'parametre' | 'soumission';
  entityTitle: string;
  details?: string;
}

// =========================================================================
// TYPES COMMUNAUTAIRES & PARTICIPATIFS
// =========================================================================

export type CommunityFormType =
  | 'actualite'       // 1. Proposer une actualité
  | 'besoin'          // 2. Signaler un besoin
  | 'projet'          // 3. Proposer un projet
  | 'contact'         // 4. Nous contacter
  | 'partenaire'      // 5. Devenir partenaire
  | 'contribution'    // 6. Contribuer au développement de Ntolo
  | 'media';          // 7. Envoyer une photo ou une vidéo

export type CommunityStatus = 'recu' | 'en_cours' | 'traite';

export type PaymentProviderType = 'mtn_momo' | 'orange_money' | 'stripe_card' | 'bank_transfer' | 'chefferie_desk';

export interface PaymentGatewayArchitecture {
  intentStatus: 'pledge_recorded' | 'ready_for_payment_gateway' | 'simulation_mode';
  preferredProvider: PaymentProviderType;
  providerTransactionRef?: string;
  gatewayHookAvailable: boolean;
  notes: string;
  simulatedCallbackUrl?: string;
}

export interface CommunitySubmissionPayload {
  // 1. Proposer une actualité
  actuCategory?: string;
  actuDate?: string;
  actuLocation?: string;
  actuContent?: string;
  actuAttachedMediaUrl?: string;
  actuAttachedMediaName?: string;
  actuAuthorRelation?: string;

  // 2. Signaler un besoin
  needType?: string;
  specificLocation?: string;
  affectedPeopleCount?: string;
  needDescription?: string;
  urgencyLevel?: 'normal' | 'important' | 'urgent';

  // 3. Proposer un projet
  projectSector?: string;
  projectEstimatedBudget?: number;
  projectEstimatedDuration?: string;
  projectObjectives?: string;
  projectBeneficiaries?: string;
  projectCoFinancingOffer?: string;

  // 4. Nous contacter
  contactSubject?: string;
  contactPreferredChannel?: 'telephone' | 'whatsapp' | 'email' | 'palais';
  contactMessage?: string;

  // 5. Devenir partenaire
  partnerOrgName?: string;
  partnerOrgType?: 'ONG' | 'Entreprise' | 'Institution' | 'Association Diaspora' | 'Bailleur' | 'Mécène Particulier';
  partnerDomain?: string;
  partnerProposalText?: string;
  partnerWebsite?: string;

  // 6. Contribuer au développement (architecture paiement futur)
  contributionType?: 'financier' | 'materiel' | 'competence' | 'parrainage' | 'technique' | 'mixte';
  pledgedAmount?: number;
  currency?: 'FCFA' | 'EUR' | 'USD';
  targetedProjectTitle?: string;
  materialDescription?: string;
  skillsExpertise?: string;
  paymentArchitecture?: PaymentGatewayArchitecture;

  // 7. Envoyer photo ou vidéo
  mediaType?: 'photo' | 'video';
  mediaAlbumTarget?: string;
  mediaDateTaken?: string;
  mediaLocation?: string;
  mediaFileUrl?: string;
  mediaDescription?: string;
  mediaRightsReleaseApproved?: boolean;

  // Sécurité anti-spam
  spamProtectionAudit?: {
    honeypotTriggered: boolean;
    verificationAnswerValid: boolean;
    submissionDurationMs: number;
    clientIpToken: string;
  };
}

export interface CommunitySubmission {
  id: string;
  trackingCode: string;
  type: CommunityFormType;
  title: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderLocation?: string; // ex: "Ntolo Haut", "Douala", "Paris", "Bruxelles"
  submittedAt: string;
  status: CommunityStatus;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  payload: CommunitySubmissionPayload;
}

export interface ParticipatoryProject {
  id: string;
  submissionId?: string;
  title: string;
  sector: 'Eau & Assainissement' | 'Éducation' | 'Santé' | 'Énergie & Routes' | 'Jeunesse & Culture' | 'Agriculture & Économie';
  proposerName: string;
  proposerRole: string;
  location: string;
  summary: string;
  objectives: string[];
  estimatedBudget: number; // in FCFA
  pledgedAmount: number; // in FCFA
  status: 'Approuvé par le CODEV' | 'En consultation citoyenne' | 'En mobilisation' | 'En réalisation';
  votesCount: number;
  featuredImage?: string;
  createdAt: string;
  targetDate: string;
  beneficiariesSummary?: string;
}


