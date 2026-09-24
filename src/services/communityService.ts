import {
  CommunitySubmission,
  CommunityFormType,
  CommunityStatus,
  ParticipatoryProject,
  PaymentProviderType,
  PaymentGatewayArchitecture,
} from '../types';
import { logAdminActivity } from './adminService';

const KEY_COMMUNITY_SUBMISSIONS = 'ntolo_community_submissions_v1';
const KEY_PARTICIPATORY_PROJECTS = 'ntolo_participatory_projects_v1';
export const EVENT_COMMUNITY_DATA_CHANGED = 'ntolo_community_data_changed';

// =========================================================================
// 1. PROJETS PARTICIPATIFS INITIAUX
// =========================================================================

export const INITIAL_PARTICIPATORY_PROJECTS: ParticipatoryProject[] = [
  {
    id: 'part-proj-1',
    title: 'Électrification Solaire des 4 Carrefours Stratégiques & du Marché',
    sector: 'Énergie & Routes',
    proposerName: 'Association des Jeunes Actifs de Ntolo (AJAN)',
    proposerRole: 'Collectif villageois de jeunesse',
    location: 'Ntolo Centre, Carrefour Chefferie, Entrée Église, Marché',
    summary: 'Installation de 12 lampadaires solaires autonomes LED 100W avec batteries lithium pour sécuriser les déplacements nocturnes et prolonger les étals du marché du soir.',
    objectives: [
      'Sécurisation des axes de circulation des écoliers et commerçantes à la tombée de la nuit',
      'Réduction des risques d’accidents et lutte contre les intrusions nocturnes',
      'Création d’un point de rassemblement éclairé pour les jeunes le soir',
    ],
    estimatedBudget: 4200000, // 4 200 000 FCFA
    pledgedAmount: 2850000,
    status: 'Approuvé par le CODEV',
    votesCount: 148,
    featuredImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-08-15',
    targetDate: 'Novembre 2026',
    beneficiariesSummary: 'L’ensemble de la population de Ntolo (1 850 résidents) et commerçants des villages voisins.',
  },
  {
    id: 'part-proj-2',
    title: 'Modernisation du Plateau Sportif & Club de Loisirs des Jeunes',
    sector: 'Jeunesse & Culture',
    proposerName: 'M. Fabrice Ekane & Collectif Diaspora Europe',
    proposerRole: 'Ressortissant Ntolo (France) & Ancien du village',
    location: 'Espace communal adjacent à l’École Publique',
    summary: 'Aménagement d’un terrain multisports (football cadet, handball, volleyball) avec clôture végétale, vestiaires écologiques et dotation de matériels d’entraînement.',
    objectives: [
      'Encadrer la jeunesse pendant les vacances et les week-ends pour prévenir l’oisiveté',
      'Organiser le grand Tournoi Inter-Quartiers de Ntolo pendant la saison sèche',
      'Promouvoir les valeurs de cohésion, de respect des aînés et de discipline',
    ],
    estimatedBudget: 3500000,
    pledgedAmount: 1900000,
    status: 'En mobilisation',
    votesCount: 215,
    featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-08-28',
    targetDate: 'Décembre 2026',
    beneficiariesSummary: 'Plus de 350 jeunes filles et garçons de Ntolo et environs.',
  },
  {
    id: 'part-proj-3',
    title: 'Unité Villageoise de Séchage et Broyage Artisanal du Manioc & Cacao',
    sector: 'Agriculture & Économie',
    proposerName: 'Coopérative Féminine "Mwang Epse" de Ntolo',
    proposerRole: 'Groupement d’initiative commune de 42 agricultrices',
    location: 'Ntolo Bas-Village (Quartier Agricole)',
    summary: 'Acquisition d’un séchoir solaire couvert et de deux moulins semi-motorisés pour transformer localement le manioc en cossettes/bâtons de qualité et sécher le cacao sans fumée noire.',
    objectives: [
      'Augmenter les revenus nets des agricultrices de plus de 35% en vendant des produits finis',
      'Réduire la pénibilité du travail manuel d’écrasement et de pressage',
      'Améliorer la qualité marchande du cacao de Ntolo primé par les acheteurs',
    ],
    estimatedBudget: 5800000,
    pledgedAmount: 3200000,
    status: 'En consultation citoyenne',
    votesCount: 182,
    featuredImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-09-02',
    targetDate: 'Janvier 2027',
    beneficiariesSummary: '42 familles membres directes et 120 producteurs de tubercules et fèves.',
  },
  {
    id: 'part-proj-4',
    title: 'Équipement d’Urgence pour la Maternité du Centre de Santé de Ntolo',
    sector: 'Santé',
    proposerName: 'Dr. Cécile Ngolle & Mutuelle de Santé Villageoise',
    proposerRole: 'Médecin généraliste originaire de Ntolo',
    location: 'Centre de Santé Intégré de Ntolo',
    summary: 'Dotation d’une table d’accouchement moderne, d’un kit de réanimation néonatale, de 2 berceaux sécurisés et d’une réserve de kits d’accouchement stérile pour les mamans modestes.',
    objectives: [
      'Zéro décès maternel et néonatal évitable lors des accouchements au village',
      'Assurer des accouchements dignes et hygiéniques sans transfert risqué vers Nkongsamba',
      'Constitution d’une pharmacie solidaire d’urgence',
    ],
    estimatedBudget: 2900000,
    pledgedAmount: 2450000,
    status: 'Approuvé par le CODEV',
    votesCount: 304,
    featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-09-10',
    targetDate: 'Octobre 2026',
    beneficiariesSummary: 'Toutes les femmes enceintes et nouveau-nés du bassin sanitaire de Ntolo.',
  },
];

// =========================================================================
// 2. SOUMISSIONS COMMUNAUTAIRES INITIALES
// =========================================================================

export const INITIAL_COMMUNITY_SUBMISSIONS: CommunitySubmission[] = [
  {
    id: 'sub-actu-1',
    trackingCode: 'NTL-ACTU-8194',
    type: 'actualite',
    title: 'Succès éclatant des élèves de Ntolo au Concours d’Entrée en 6e et CEP',
    senderName: 'M. Léonard Mboum',
    senderEmail: 'leonard.mboum@gmail.com',
    senderPhone: '+237 670 12 34 56',
    senderLocation: 'Ntolo Centre (Directeur d’école)',
    submittedAt: '2026-09-21 16:45',
    status: 'traite',
    adminNotes: 'Article revu et intégré dans le fil d’actualités officiel de la rentrée scolaire.',
    reviewedBy: 'Secrétariat CODEV',
    reviewedAt: '2026-09-22 10:00',
    payload: {
      actuCategory: 'Éducation',
      actuDate: '2026-09-20',
      actuLocation: 'École Publique de Ntolo',
      actuContent: 'L’école publique de Ntolo a enregistré cette année un taux de réussite de 94% au CEP. Félicitations aux instituteurs et aux parents d’élèves mobilisés !',
      actuAuthorRelation: 'Enseignant résidant',
    },
  },
  {
    id: 'sub-besoin-1',
    trackingCode: 'NTL-BESOIN-3420',
    type: 'besoin',
    title: 'Éboulement partiel sur la piste menant à la Source de Bakassa',
    senderName: 'M. Étienne Ndoko',
    senderEmail: 'etienne.ndoko@yahoo.com',
    senderPhone: '+237 699 44 22 11',
    senderLocation: 'Quartier Bakassa - Ntolo',
    submittedAt: '2026-09-22 08:30',
    status: 'en_cours',
    adminNotes: 'Signalement transmis à la commission voirie du CODEV. Salongo d’urgence programmé pour samedi matin.',
    reviewedBy: 'Responsable Travaux',
    reviewedAt: '2026-09-22 11:15',
    payload: {
      needType: 'Infrastructures & Piste',
      specificLocation: 'Virage de la Source Bakassa, à 300m après le pont de bois',
      affectedPeopleCount: 'Environ 80 familles et exploitants agricoles',
      needDescription: 'À la suite des fortes pluies de la nuit de dimanche, un talus de terre et deux troncs d’arbres bloquent le passage des motos et brouettes transportant les régimes de plantain.',
      urgencyLevel: 'urgent',
    },
  },
  {
    id: 'sub-projet-1',
    trackingCode: 'NTL-PROJ-9041',
    type: 'projet',
    title: 'Création d’un Verger Communautaire d’Avocatiers Greffés et Safoutiers',
    senderName: 'Dr. Joseph Ewané',
    senderEmail: 'joseph.ewane@agri-ntolo.cm',
    senderPhone: '+237 655 77 88 99',
    senderLocation: 'Yaoundé & Ntolo',
    submittedAt: '2026-09-19 14:20',
    status: 'recu',
    adminNotes: 'Dossier complet. À soumettre à l’ordre du jour de la prochaine commission de développement rural.',
    payload: {
      projectSector: 'Agriculture & Économie',
      projectEstimatedBudget: 3800000,
      projectEstimatedDuration: '6 mois pour la pépinière et plantation',
      projectObjectives: 'Fournir 1 500 plants greffés à haut rendement aux jeunes agriculteurs de Ntolo pour diversifier les revenus hors-cacao.',
      projectBeneficiaries: '50 jeunes ménages du village',
      projectCoFinancingOffer: 'La diaspora fournit les semences améliorées et le suivi agronomique.',
    },
  },
  {
    id: 'sub-partenaire-1',
    trackingCode: 'NTL-PART-5512',
    type: 'partenaire',
    title: 'Proposition d’appui technique : Forages & Assainissement par l’ONG Éco-Cameroun',
    senderName: 'Mme Sandrine Bell',
    senderEmail: 'sandrine.bell@ong-eco-cameroun.org',
    senderPhone: '+237 690 11 22 33',
    senderLocation: 'Douala - Siège Régional',
    submittedAt: '2026-09-18 10:05',
    status: 'en_cours',
    adminNotes: 'Premier échange téléphonique positif avec le chef du projet eau. Visite exploratoire demandée le mois prochain.',
    reviewedBy: 'Secrétaire Général CODEV',
    payload: {
      partnerOrgName: 'ONG Éco-Cameroun Développement Durable',
      partnerOrgType: 'ONG',
      partnerDomain: 'Eau & Énergie Propre',
      partnerProposalText: 'Nous proposons une mission de géophysique gratuite pour cartographier les nappes phréatiques de Ntolo et un cofinancement à 40% pour 2 forages équipés de pompes solaires.',
      partnerWebsite: 'https://ong-eco-cameroun.org',
    },
  },
  {
    id: 'sub-contrib-1',
    trackingCode: 'NTL-PLEDGE-7789',
    type: 'contribution',
    title: 'Souscription solidaire de la Diaspora de Douala pour la Maternité',
    senderName: 'M. Pierre-Alain Njoh',
    senderEmail: 'pa.njoh@societe-logistique.cm',
    senderPhone: '+237 671 22 33 44',
    senderLocation: 'Antenne Diaspora de Douala (Bonanjo)',
    submittedAt: '2026-09-22 19:10',
    status: 'recu',
    adminNotes: 'Promesse de versement enregistrée dans le registre de mobilisation financière du CODEV.',
    payload: {
      contributionType: 'financier',
      pledgedAmount: 250000,
      currency: 'FCFA',
      targetedProjectTitle: 'Équipement d’Urgence pour la Maternité du Centre de Santé',
      paymentArchitecture: {
        intentStatus: 'pledge_recorded',
        preferredProvider: 'orange_money',
        gatewayHookAvailable: true,
        notes: 'Promesse de don enregistrée. Passerelle de paiement en mode préparation (Phase 2). Contact direct transmis au trésorier.',
      },
    },
  },
  {
    id: 'sub-media-1',
    trackingCode: 'NTL-MEDIA-1104',
    type: 'media',
    title: 'Photographies de la cascade sacrée et des danses traditionnelles lors de la fête du Ngondo',
    senderName: 'M. Marc Epée',
    senderEmail: 'marc.epee.photo@gmail.com',
    senderPhone: '+237 694 55 66 77',
    senderLocation: 'Ntolo & Yaoundé',
    submittedAt: '2026-09-17 15:40',
    status: 'traite',
    adminNotes: 'Images haute définition intégrées dans la galerie officielle, album "Culture & Patrimoine".',
    reviewedBy: 'Éditeur Médiathèque',
    payload: {
      mediaType: 'photo',
      mediaAlbumTarget: 'Culture, Traditions & Danses',
      mediaDateTaken: '2026-08-20',
      mediaLocation: 'Chutes d’eau de Ntolo & Cour du Palais Royal',
      mediaDescription: 'Série de 4 clichés capturant les dignitaires en apparats coutumiers et le reflet du soleil sur la grande cascade.',
      mediaRightsReleaseApproved: true,
    },
  },
];

// =========================================================================
// 3. ARCHITECTURE DE PAIEMENT SÉCURISÉE (PRÉPARATION SANS ENCAISSEMENT RÉEL)
// =========================================================================

export const PAYMENT_PROVIDERS: {
  id: PaymentProviderType;
  name: string;
  tagline: string;
  category: 'mobile_money' | 'card' | 'bank' | 'desk';
  badge: string;
  instructions: string;
}[] = [
  {
    id: 'orange_money',
    name: 'Orange Money Cameroun',
    tagline: 'Code marchand & transfert sécurisé direct',
    category: 'mobile_money',
    badge: 'OM Cameroun',
    instructions: 'Architecture prête pour webhook #150*... (activation Phase 2). Promesse enregistrée.',
  },
  {
    id: 'mtn_momo',
    name: 'MTN Mobile Money',
    tagline: 'Paiement instantané par téléphone portable',
    category: 'mobile_money',
    badge: 'MTN MoMo',
    instructions: 'Architecture prête pour passerelle MTN MoMo API v2 (activation Phase 2). Promesse enregistrée.',
  },
  {
    id: 'stripe_card',
    name: 'Carte Bancaire / Diaspora Internationale',
    tagline: 'Visa, Mastercard & Cartes internationales pour la diaspora',
    category: 'card',
    badge: 'Stripe Global',
    instructions: 'Architecture prête pour formulaire sécurisé Stripe Elements tokenisé (activation Phase 2).',
  },
  {
    id: 'bank_transfer',
    name: 'Virement Bancaire (RIB CODEV Ntolo)',
    tagline: 'Compte bancaire institutionnel du Comité de Développement',
    category: 'bank',
    badge: 'RIB Officiel',
    instructions: 'Les coordonnées IBAN / SWIFT de la banque partenaire seront transmises avec accusé de réception.',
  },
  {
    id: 'chefferie_desk',
    name: 'Guichet du Secrétariat au Palais Royal',
    tagline: 'Reçu manuscrit officiel scellé par la Chefferie',
    category: 'desk',
    badge: 'Au Palais',
    instructions: 'Dépôt physique contre décharge officielle signée du trésorier et visée par Sa Majesté.',
  },
];

// =========================================================================
// 4. FONCTIONS DE STOCKAGE & GESTION DES SOUMISSIONS
// =========================================================================

export function getStoredCommunitySubmissions(): CommunitySubmission[] {
  if (typeof window === 'undefined') return INITIAL_COMMUNITY_SUBMISSIONS;
  try {
    const raw = localStorage.getItem(KEY_COMMUNITY_SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(KEY_COMMUNITY_SUBMISSIONS, JSON.stringify(INITIAL_COMMUNITY_SUBMISSIONS));
      return INITIAL_COMMUNITY_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_COMMUNITY_SUBMISSIONS;
  }
}

export function saveCommunitySubmission(submission: CommunitySubmission): CommunitySubmission[] {
  const current = getStoredCommunitySubmissions();
  const index = current.findIndex((s) => s.id === submission.id);
  let updated: CommunitySubmission[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = submission;
  } else {
    updated = [submission, ...current];
  }
  localStorage.setItem(KEY_COMMUNITY_SUBMISSIONS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
  return updated;
}

export function updateCommunitySubmissionStatus(
  id: string,
  status: CommunityStatus,
  adminNotes?: string,
  reviewedBy?: string
): CommunitySubmission[] {
  const current = getStoredCommunitySubmissions();
  const sub = current.find((s) => s.id === id);
  if (sub) {
    sub.status = status;
    if (adminNotes !== undefined) sub.adminNotes = adminNotes;
    if (reviewedBy) {
      sub.reviewedBy = reviewedBy;
      sub.reviewedAt = new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
    }
    localStorage.setItem(KEY_COMMUNITY_SUBMISSIONS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
  }
  return current;
}

export function deleteCommunitySubmission(id: string): CommunitySubmission[] {
  const current = getStoredCommunitySubmissions();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(KEY_COMMUNITY_SUBMISSIONS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
  return updated;
}

// =========================================================================
// 5. HELPER CRÉATION DE SOUMISSION AVEC ANTI-SPAM ET SUIVI
// =========================================================================

export function generateTrackingCode(type: CommunityFormType): string {
  const prefixMap: Record<CommunityFormType, string> = {
    actualite: 'ACTU',
    besoin: 'BESOIN',
    projet: 'PROJ',
    contact: 'CONT',
    partenaire: 'PART',
    contribution: 'PLEDGE',
    media: 'MEDIA',
  };
  const prefix = prefixMap[type] || 'COM';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `NTL-${prefix}-${randomNum}`;
}

export function submitCommunityForm(params: {
  type: CommunityFormType;
  title: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderLocation?: string;
  payload: CommunitySubmission['payload'];
  honeypotTrap?: string;
  verificationAnswer?: string;
  expectedVerificationAnswer?: string;
  formLoadTimestamp?: number;
}): { success: boolean; submission?: CommunitySubmission; errorMessage?: string } {
  // 1. Anti-spam honeypot verification
  if (params.honeypotTrap && params.honeypotTrap.trim() !== '') {
    return {
      success: false,
      errorMessage: 'Activité automatisée suspecte détectée (champ piège déclenché). Votre soumission a été bloquée par sécurité.',
    };
  }

  // 2. Anti-spam timing test (bots submit in < 1.5s)
  if (params.formLoadTimestamp) {
    const elapsedMs = Date.now() - params.formLoadTimestamp;
    if (elapsedMs < 1200) {
      return {
        success: false,
        errorMessage: 'Envoi trop rapide. Veuillez prendre le temps de vérifier vos informations avant de soumettre.',
      };
    }
  }

  // 3. Human verification answer test
  if (
    params.expectedVerificationAnswer !== undefined &&
    params.verificationAnswer !== undefined
  ) {
    if (
      params.verificationAnswer.trim().toLowerCase() !==
      params.expectedVerificationAnswer.trim().toLowerCase()
    ) {
      return {
        success: false,
        errorMessage: 'La réponse à la question de sécurité humaine est incorrecte. Veuillez réessayer.',
      };
    }
  }

  // 4. Data validation
  if (!params.senderName || params.senderName.trim().length < 2) {
    return { success: false, errorMessage: 'Veuillez saisir votre nom complet (au moins 2 caractères).' };
  }

  if (!params.senderPhone || params.senderPhone.trim().length < 6) {
    return { success: false, errorMessage: 'Veuillez fournir un numéro de téléphone joignable valide.' };
  }

  if (params.senderEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.senderEmail.trim())) {
    return { success: false, errorMessage: 'L’adresse email fournie ne respecte pas un format valide.' };
  }

  const trackingCode = generateTrackingCode(params.type);
  const newSubmission: CommunitySubmission = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    trackingCode,
    type: params.type,
    title: params.title.trim(),
    senderName: params.senderName.trim(),
    senderEmail: (params.senderEmail || '').trim() || `${params.senderName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'citoyen'}@ntolo.cm`,
    senderPhone: params.senderPhone.trim(),
    senderLocation: params.senderLocation?.trim() || 'Ntolo',
    submittedAt: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
    status: 'recu', // Toujours initialisé à 'recu'
    payload: {
      ...params.payload,
      spamProtectionAudit: {
        honeypotTriggered: false,
        verificationAnswerValid: true,
        submissionDurationMs: params.formLoadTimestamp ? Date.now() - params.formLoadTimestamp : 3000,
        clientIpToken: `TOKEN-${Date.now().toString(16)}`,
      },
    },
  };

  // Enregistrement sécurisé
  saveCommunitySubmission(newSubmission);

  // Journalisation administrative & notification
  logAdminActivity(
    'Citoyen / Visiteur',
    'contributeur',
    'create',
    'soumission',
    `Nouvelle requête [${trackingCode}] : ${params.title}`,
    `Type: ${params.type} | Expéditeur: ${params.senderName} (${params.senderPhone})`
  );

  return { success: true, submission: newSubmission };
}

// =========================================================================
// 6. GESTION DES PROJETS PARTICIPATIFS
// =========================================================================

export function getStoredParticipatoryProjects(): ParticipatoryProject[] {
  if (typeof window === 'undefined') return INITIAL_PARTICIPATORY_PROJECTS;
  try {
    const raw = localStorage.getItem(KEY_PARTICIPATORY_PROJECTS);
    if (!raw) {
      localStorage.setItem(KEY_PARTICIPATORY_PROJECTS, JSON.stringify(INITIAL_PARTICIPATORY_PROJECTS));
      return INITIAL_PARTICIPATORY_PROJECTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PARTICIPATORY_PROJECTS;
  }
}

export function saveParticipatoryProject(project: ParticipatoryProject): ParticipatoryProject[] {
  const current = getStoredParticipatoryProjects();
  const index = current.findIndex((p) => p.id === project.id);
  let updated: ParticipatoryProject[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    updated = [project, ...current];
  }
  localStorage.setItem(KEY_PARTICIPATORY_PROJECTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
  return updated;
}

export function voteForParticipatoryProject(projectId: string): number {
  const current = getStoredParticipatoryProjects();
  const proj = current.find((p) => p.id === projectId);
  if (proj) {
    proj.votesCount = (proj.votesCount || 0) + 1;
    localStorage.setItem(KEY_PARTICIPATORY_PROJECTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
    return proj.votesCount;
  }
  return 0;
}

export function addPledgeToParticipatoryProject(projectId: string, amount: number): number {
  const current = getStoredParticipatoryProjects();
  const proj = current.find((p) => p.id === projectId);
  if (proj) {
    proj.pledgedAmount = (proj.pledgedAmount || 0) + amount;
    localStorage.setItem(KEY_PARTICIPATORY_PROJECTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_COMMUNITY_DATA_CHANGED));
    return proj.pledgedAmount;
  }
  return 0;
}

export function convertSubmissionToParticipatoryProject(submission: CommunitySubmission): ParticipatoryProject {
  const newProject: ParticipatoryProject = {
    id: `part-proj-${Date.now()}`,
    submissionId: submission.id,
    title: submission.title,
    sector: (submission.payload.projectSector as any) || 'Jeunesse & Culture',
    proposerName: submission.senderName,
    proposerRole: submission.senderLocation || 'Membre de la communauté',
    location: submission.senderLocation || 'Ntolo',
    summary: submission.payload.projectObjectives || submission.title,
    objectives: [
      submission.payload.projectObjectives || 'Objectif formulé par le porteur de projet.',
      `Bénéficiaires identifiés : ${submission.payload.projectBeneficiaries || 'Communauté de Ntolo'}`,
      `Durée estimée : ${submission.payload.projectEstimatedDuration || '3 à 6 mois'}`,
    ],
    estimatedBudget: Number(submission.payload.projectEstimatedBudget) || 2500000,
    pledgedAmount: 0,
    status: 'En consultation citoyenne',
    votesCount: 1,
    featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date().toISOString().split('T')[0],
    targetDate: '2027',
    beneficiariesSummary: submission.payload.projectBeneficiaries || 'Habitants de Ntolo',
  };

  saveParticipatoryProject(newProject);
  updateCommunitySubmissionStatus(
    submission.id,
    'en_cours',
    `Converti en Projet Participatif n° ${newProject.id}. Publié pour consultation citoyenne.`,
    'Admin Principal'
  );

  return newProject;
}
