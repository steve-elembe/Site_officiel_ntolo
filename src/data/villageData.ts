import { PageMeta, NewsItem, ProjectItem, EventItem, GalleryItem, DocumentItem } from '../types';

/**
 * =======================================================================
 * CONFIGURATION DE L'IDENTITÉ VISUELLE ET DES EMPLACEMENTS MODIFIABLES
 * Modifiez facilement les constantes ci-dessous pour personnaliser le site
 * =======================================================================
 */

// 1. LOGO TEMPORAIRE "NTOLO" - FACILEMENT REMPLAÇABLE
export const LOGO_CONFIG = {
  title: 'NTOLO',
  subtitle: 'Portail Numérique Officiel',
  tagline: 'Chefferie Traditionnelle de 3e Degré',
  location: 'Nlonako • Département du Moungo • Région du Littoral (Cameroun)',
  // Pour utiliser votre propre image de logo, indiquez simplement son URL ou chemin ci-dessous (ex: '/assets/mon-logo.png')
  customLogoUrl: null as string | null,
};

// 2. SLOGAN PROVISOIRE - FACILEMENT MODIFIABLE
export const SLOGAN_CONFIG = {
  slogan: 'Union - Travail - Solidarité pour l’Émergence de Ntolo',
  shortSlogan: 'Fidélité aux Racines, Regard vers l’Avenir',
  note: 'Slogan provisoire issu des concertations du village [Modifiable]',
};

// 3. HERO BANNER - IMAGE ET TEXTES PRINCIPAUX
export const HERO_CONFIG = {
  title: 'NTOLO',
  subtitle: 'Terre d’histoire, de fertilité et d’avenir au pied du Mont Nlonako',
  shortSummary: 'Bienvenue sur le portail institutionnel officiel de la communauté de Ntolo (Arrondissement de Nlonako, Département du Moungo, Cameroun). Une plateforme au service de l’unité, du patrimoine et du développement durable.',
  // Emplacement de l'image Hero (remplaçable facilement)
  heroImageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
  heroImageAlt: 'Paysage verdoyant des contreforts du Mont Nlonako et du terroir de Ntolo dans le Moungo',
};

// 4. CHIFFRES CLÉS - DONNÉES POUVANT ÊTRE MODIFIÉES FACILEMENT
export interface KeyFigure {
  id: string;
  label: string;
  value: string;
  subtext: string;
  badgeStatus: string;
  iconName: 'Crown' | 'MapPin' | 'Mountain' | 'Wheat' | 'Target' | 'Users';
}

export const KEY_FIGURES: KeyFigure[] = [
  {
    id: 'statut',
    label: 'Statut Coutumier & Administratif',
    value: 'Chefferie 3e degré',
    subtext: 'Décret N° 77/245 réglementant les chefferies traditionnelles',
    badgeStatus: 'Statut légal républicain',
    iconName: 'Crown',
  },
  {
    id: 'territoire',
    label: 'Rattachement Territorial',
    value: 'Nlonako / Moungo',
    subtext: 'Région du Littoral, République du Cameroun',
    badgeStatus: 'Arrondissement de Nlonako',
    iconName: 'MapPin',
  },
  {
    id: 'environnement',
    label: 'Massif & Biodiversité',
    value: 'Mont Nlonako',
    subtext: 'Sanctuaire d’altitude et haut-lieu écologique mondial',
    badgeStatus: 'Patrimoine naturel',
    iconName: 'Mountain',
  },
  {
    id: 'vocation',
    label: 'Économie du Terroir',
    value: 'Café, Cacao & Vivres',
    subtext: 'Sols volcaniques d’une fertilité exceptionnelle',
    badgeStatus: 'Production agricole',
    iconName: 'Wheat',
  },
  {
    id: 'projets',
    label: 'Chantiers Prioritaires',
    value: '4 Projets en Cours',
    subtext: 'Eau potable, rénovation école, santé et foyer polyvalent',
    badgeStatus: 'Souscription active',
    iconName: 'Target',
  },
  {
    id: 'solidarite',
    label: 'Force Communautaire',
    value: 'Village & Diaspora',
    subtext: 'Réseaux fraternels à Douala, Yaoundé, Nkongsamba et au-delà',
    badgeStatus: 'Fédération active',
    iconName: 'Users',
  },
];

// 5. PRÉSENTATION RAPIDE DU VILLAGE
export const PRESENTATION_FAST = {
  title: 'Présentation Rapide de Ntolo',
  subtitle: 'Un terroir hospitalier et dynamique au cœur du Moungo',
  editorialIntro: 'Situé sur les pentes bienfaisantes du Mont Nlonako, dans l’arrondissement de Nlonako (Département du Moungo, Région du Littoral), le village de Ntolo est une communauté attachée à la dignité de ses traditions et fermement résolue à moderniser ses infrastructures de base.',
  pillars: [
    {
      title: 'Un Terroir Volcanique Généreux',
      description: 'Bénéficiant d’un climat subéquatorial frais et de terres issues du volcanisme de la ligne du Cameroun, Ntolo est une terre de prédilection pour le café Robusta et Arabica, le cacao et les vivres frais.',
    },
    {
      title: 'Une Autorité Coutumière Républicaine',
      description: 'La Chefferie traditionnelle de 3e degré incarne la continuité des us et coutumes, la conciliation des différends et le lien institutionnel avec l’administration camerounaise.',
    },
    {
      title: 'Une Mobilisation Solidaire',
      description: 'Le Comité de Développement (CODEV), les associations de femmes et la dynamique jeunesse unissent leurs forces pour relever les défis de l’eau, de l’éducation et de la santé.',
    },
  ],
};

// 6. DONNÉES DE GÉOLOCALISATION ET ACCÈS
export const LOCATION_DATA = {
  title: 'Localisation & Accès à Ntolo',
  subtitle: 'Comment rejoindre le village de Ntolo dans le Moungo',
  regionDescription: 'Arrondissement de Nlonako, Département du Moungo, Région du Littoral, Cameroun.',
  coordinates: 'Bassin du Mont Nlonako [Coordonnées GPS certifiées : À compléter]',
  accessItinerary: [
    {
      from: 'Depuis Nkongsamba (Chef-lieu du Moungo)',
      detail: 'Prendre l’axe goudronné vers Nlonako, puis bifurquer vers la voie de desserte villageoise de Ntolo.',
      distance: 'Environ 25 à 35 km selon la piste rurale',
    },
    {
      from: 'Depuis Douala (Métropole économique)',
      detail: 'Emprunter la Route Nationale N5 (Douala - Mbanga - Loum - Nkongsamba), puis rejoindre Nlonako.',
      distance: 'Environ 165 km (environ 3h30 de trajet)',
    },
    {
      from: 'Depuis Yaoundé (Capitale politique)',
      detail: 'Axe Yaoundé - Douala - Nkongsamba ou route de l’Ouest via Bafoussam.',
      distance: 'Environ 350 km',
    },
  ],
  landmarks: [
    'Mont Nlonako (massif culminant)',
    'Zones de plantation caféière & cacaoyère',
    'Palais royal de la Chefferie de 3e degré',
    'École Publique et Poste de Santé de Ntolo',
  ],
};

// 7. SECTION DIASPORA & SOLIDARITÉ
export const DIASPORA_SECTION = {
  title: 'La Diaspora de Ntolo',
  subtitle: 'Une force motrice pour le rayonnement de notre terroir',
  intro: 'Les filles et fils de Ntolo résidant à Douala, Yaoundé, Nkongsamba, dans les autres villes du Cameroun ou à travers le monde jouent un rôle central dans chaque avancée du village.',
  stats: [
    { label: 'Antennes actives', value: '4 délégations', note: 'Douala, Yaoundé, Nkongsamba, Extérieur' },
    { label: 'Projets soutenus', value: '100% participatif', note: 'Financement citoyen direct' },
    { label: 'Recensement', value: 'En cours', note: 'Matricule d’adhérent délivré en ligne' },
  ],
};

// 8. APPEL À CONTRIBUER AU DÉVELOPPEMENT
export const CONTRIBUTION_CALLOUT = {
  title: 'Contribuer au Développement de Ntolo',
  subtitle: 'Chaque geste consolide l’avenir de nos enfants',
  appealText: 'Le progrès de notre village dépend de notre solidarité collective. Vous pouvez contribuer financièrement à un projet précis, offrir du matériel (tables-bancs, trousses médicales, tuyaux pour forages) ou partager votre expertise technique.',
  guarantees: [
    'Transparence financière intégrale garantie par le CODEV',
    'Compte-rendu public lors de l’Assemblée Générale annuelle',
    'Délivrance immédiate d’un récépissé d’engagement citoyen',
  ],
};

// 9. CONTACT ET PERMANENCE OFFICIELLE
export const CONTACT_FAST = {
  title: 'Contactez la Chefferie & le Comité de Développement',
  reception: 'Permanences au Palais Royal : Week-ends et jours de concertation',
  officialPhone: '+237 6XX XX XX XX [À compléter : Numéro Chefferie]',
  officialEmail: 'contact.ntolo.nlonako@gmail.com [À compléter]',
  address: 'Palais de la Chefferie de Ntolo, Arrondissement de Nlonako, Cameroun',
};

export const VILLAGE_INFO = {
  name: 'NTOLO',
  fullName: 'Village de Ntolo',
  slogan: SLOGAN_CONFIG.slogan,
  arrondissement: 'Nlonako',
  departement: 'Moungo',
  region: 'Littoral',
  country: 'République du Cameroun',
  administrativeStatus: 'Chefferie traditionnelle de 3e degré [À compléter : Homologation officielle]',
  chiefTitle: 'Sa Majesté le Chef Traditionnel de Ntolo [À compléter : Nom du Chef]',
  developmentCommittee: 'Comité de Développement du Village de Ntolo (CODEV Ntolo / [À compléter])',
  locationDetails: 'Bassin du Mont Nlonako, Département du Moungo, Région du Littoral, Cameroun',
  coordinatesApprox: 'Zone de Nlonako (Moungo) [À compléter : Coordonnées GPS exactes du village]',
  emergencyPhone: '+237 6XX XX XX XX [À compléter : Numéro d’urgence Chefferie]',
  healthPostPhone: '+237 6XX XX XX XX [À compléter : Poste de Santé / CSI]',
  officialEmail: 'contact.ntolo.nlonako@gmail.com [À compléter : Adresse officielle]',
};

export const PAGES_META: PageMeta[] = [
  { id: 'accueil', title: 'Accueil', navLabel: 'Accueil', category: 'village', description: 'Portail d’accueil officiel de la communauté de Ntolo', iconName: 'Home' },
  { id: 'presentation', title: 'Présentation générale', navLabel: 'Présentation', category: 'village', description: 'Fiche d’identité, statut administratif et vocation du terroir', iconName: 'Compass' },
  { id: 'histoire', title: 'Histoire du village', navLabel: 'Histoire', category: 'village', description: 'Origines fondatrices, lignée dynastique et mémoire ancestrale', iconName: 'BookOpen' },
  { id: 'geographie', title: 'Situation géographique', navLabel: 'Géographie', category: 'village', description: 'Relief, Mont Nlonako, hydrographie, limites et voies d’accès', iconName: 'MapPin' },
  { id: 'population', title: 'Population & Quartiers', navLabel: 'Population', category: 'vie-sociale', description: 'Démographie, quartiers coutumiers, cohésion et jeunesse', iconName: 'Users' },
  { id: 'organisation-traditionnelle', title: 'Organisation traditionnelle', navLabel: 'Organisation Traditionnelle', category: 'gouvernance', description: 'Chefferie de 3e degré, Sa Majesté, Notables et justice coutumière', iconName: 'Crown' },
  { id: 'organisation-administrative', title: 'Organisation administrative', navLabel: 'Organisation Administrative', category: 'gouvernance', description: 'Tutelle républicaine, Sous-Préfecture, Commune et CODEV', iconName: 'Building2' },
  { id: 'chefferie', title: 'Chefferie et gouvernance locale', navLabel: 'Chefferie & Notables', category: 'gouvernance', description: 'Portail de l’autorité coutumière et de la cour royale', iconName: 'Crown' },
  { id: 'culture', title: 'Culture et traditions', navLabel: 'Culture & Traditions', category: 'vie-sociale', description: 'Rites coutumiers, calendrier agraire, danses et mets du terroir', iconName: 'Sparkles' },
  { id: 'langues-patrimoine', title: 'Langues et patrimoine', navLabel: 'Langues & Patrimoine', category: 'vie-sociale', description: 'Langue vernaculaire, lexique usuel, proverbes et lieux sacrés', iconName: 'BookMarked' },
  { id: 'education', title: 'Éducation', navLabel: 'Éducation', category: 'vie-sociale', description: 'École publique de Ntolo, besoins en mobilier et bourses d’excellence', iconName: 'GraduationCap' },
  { id: 'sante', title: 'Santé', navLabel: 'Santé', category: 'vie-sociale', description: 'Soins primaires, poste de santé, urgences et médecine préventive', iconName: 'HeartPulse' },
  { id: 'agriculture', title: 'Agriculture', navLabel: 'Agriculture', category: 'economie', description: 'Filières café-cacao, cultures vivrières volcaniques et calendrier', iconName: 'Wheat' },
  { id: 'elevage', title: 'Élevage', navLabel: 'Élevage', category: 'economie', description: 'Porciculture, petits ruminants, aviculture et suivi MINEPIA', iconName: 'Egg' },
  { id: 'economie-commerce', title: 'Commerce & Activités Économiques', navLabel: 'Commerce & Économie', category: 'economie', description: 'Boutiques, marchés périodiques, artisanat et tontines solidaires', iconName: 'ShoppingBag' },
  { id: 'infrastructures', title: 'Infrastructures', navLabel: 'Infrastructures', category: 'economie', description: 'Pistes rurales, hydraulique villageoise, énergie solaire et télécoms', iconName: 'Hammer' },
  { id: 'environnement', title: 'Environnement & Biodiversité', navLabel: 'Environnement', category: 'village', description: 'Forêt pluviale du Mont Nlonako, sanctuaires d’amphibiens et sources', iconName: 'Trees' },
  { id: 'tourisme', title: 'Tourisme & Lieux d’intérêt', navLabel: 'Tourisme', category: 'village', description: 'Écotourisme, cascades, trekking du Mont Nlonako et guidage', iconName: 'Mountain' },
  { id: 'projets', title: 'Projets de développement', navLabel: 'Grands Projets', category: 'action', description: 'Chantiers prioritaires du CODEV et souscriptions citoyennes', iconName: 'Target' },
  { id: 'projets-participatifs', title: 'Projets Participatifs Citoyens', navLabel: 'Projets Participatifs', category: 'action', description: 'Micro-initiatives communautaires, votes et promesses de contributions citoyennes', iconName: 'Sparkles' },
  { id: 'actualites', title: 'Actualités & Journal', navLabel: 'Actualités', category: 'medias', description: 'Communiqués officiels, articles d’actualité et flux d’informations', iconName: 'Newspaper' },
  { id: 'annonces', title: 'Annonces & Avis Officiels', navLabel: 'Annonces', category: 'medias', description: 'Panneau d’affichage officiel, convocations, salongo et nécrologie', iconName: 'Megaphone' },
  { id: 'evenements', title: 'Événements & Agenda', navLabel: 'Événements', category: 'medias', description: 'Agenda des cérémonies royales, Salongo et assemblées', iconName: 'Calendar' },
  { id: 'galerie', title: 'Galerie photos & vidéos', navLabel: 'Galerie', category: 'medias', description: 'Reportages visuels, terroirs du Moungo et vie villageoise', iconName: 'Image' },
  { id: 'documents', title: 'Documents & Archives', navLabel: 'Documents', category: 'medias', description: 'Textes officiels, statuts, décrets et fiches de renseignement', iconName: 'FileText' },
  { id: 'diaspora', title: 'Diaspora', navLabel: 'Diaspora', category: 'action', description: 'Ressortissants de Ntolo à Douala, Yaoundé et à l’international', iconName: 'Globe' },
  { id: 'contact', title: 'Contact & Permanence', navLabel: 'Contact', category: 'action', description: 'Secrétariat général de la Chefferie, audiences et permanence', iconName: 'Mail' },
  { id: 'partenaires', title: 'Partenaires & Sponsoring', navLabel: 'Partenaires', category: 'action', description: 'Annuaire des partenaires officiels, mécénat et parrainage de projets', iconName: 'Handshake' },
  { id: 'devenir-partenaire', title: 'Devenir Partenaire', navLabel: 'Devenir Partenaire', category: 'action', description: 'Charte éthique, formules de parrainage et soumission de protocole', iconName: 'Award' },
  { id: 'mentions-legales', title: 'Mentions Légales & Politique de Confidentialité', navLabel: 'Mentions Légales & Confidentialité', category: 'gouvernance', description: 'Cadre institutionnel, respect des données personnelles et textes officiels', iconName: 'ShieldCheck' },
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: 'actu-1',
    title: 'Lancement du Portail Numérique Officiel de Ntolo',
    date: '2026-09-20',
    category: 'Communiqué',
    summary: 'Mise en ligne de la plateforme officielle destinée à renforcer la communication entre le village, la diaspora et les partenaires.',
    content: [
      'Le Conseil de la Chefferie et le Comité de Développement ont le plaisir d’annoncer l’ouverture du portail officiel du village de Ntolo (Arrondissement de Nlonako, Département du Moungo).',
      'Cet outil a pour vocation d’informer l’ensemble des filles et fils du village, qu’ils résident sur place, dans les grandes métropoles camerounaises (Douala, Nkongsamba, Yaoundé) ou à l’étranger.',
      'Les sections d’information sont progressivement alimentées. Certaines données historiques et administratives détaillées sont actuellement soumises au travail de collecte et portent la mention [À compléter].'
    ],
    author: 'Secrétariat Général de la Chefferie',
    isUrgent: true,
  },
  {
    id: 'actu-2',
    title: 'Campagne d’entretien des pistes agricoles avant la grande saison',
    date: '2026-09-12',
    category: 'Développement',
    summary: 'Mobilisation communautaire pour le curage des caniveaux et le désherbage des abords des pistes de desserte agricole.',
    content: [
      'Dans le cadre des travaux d’intérêt communautaire, une journée de salongo est organisée pour faciliter l’évacuation des récoltes de cacao, café et banane-plantain vers les marchés.',
      'Tous les exploitants agricoles et chefs de foyers sont conviés à se munir de leurs outils habituels. Point de rassemblement à l’entrée principale du village dès 07h00.',
      'Le bureau du Comité de Développement salue d’avance l’esprit patriotique et la solidarité de chacun.'
    ],
    author: 'Comité de Développement de Ntolo'
  },
  {
    id: 'actu-3',
    title: 'Sensibilisation sanitaire : Campagne de prévention contre le paludisme',
    date: '2026-08-28',
    category: 'Santé',
    summary: 'Rappel des consignes d’assainissement et d’utilisation des moustiquaires imprégnées pour les femmes enceintes et nourrissons.',
    content: [
      'L’équipe soignante de proximité rappelle l’impérieuse nécessité de dormir sous moustiquaire imprégnée à longue durée d’action (MILDA), particulièrement en cette période pluvieuse du Moungo.',
      'Les familles sont instamment invitées à éliminer les eaux stagnantes autour des habitations.',
      'En cas de fièvre, présentez-vous immédiatement à la formation sanitaire la plus proche avant toute automédication.'
    ],
    author: 'Relais Communautaire de Santé'
  },
  {
    id: 'actu-4',
    title: 'Préparation de la rentrée scolaire : Appel aux bourses et dons de manuels',
    date: '2026-08-15',
    category: 'Communiqué',
    summary: 'La commission éducation invite la diaspora et les personnes de bonne volonté à soutenir la scolarisation des enfants de Ntolo.',
    content: [
      'L’éducation reste la clé du développement durable de notre terroir. À l’approche de la rentrée des classes, un fonds de soutien aux élèves méritants et vulnérables est ouvert.',
      'Les contributions en fournitures, cahiers, stylos ou aides financières peuvent être adressées à la commission dédiée [À compléter : Coordonnées des responsables scolaires].',
      'Un bilan public des réceptions et distributions sera dressé à l’issue de la campagne.'
    ],
    author: 'Commission Éducation & Jeunesse'
  }
];

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Adduction d’Eau Potable & Réhabilitation des Points d’Eau',
    sector: 'Eau & Assainissement',
    status: 'En cours',
    progressPercentage: 45,
    budgetEstimated: '12 500 000 FCFA [À compléter / estimation indicative]',
    fundsRaised: '5 600 000 FCFA',
    description: 'Projet prioritaire visant à garantir l’accès continu à une eau saine pour tous les ménages de Ntolo afin d’éradiquer les maladies d’origine hydrique.',
    goals: [
      'Captage et aménagement d’une source pérenne protégée',
      'Installation de 2 forages avec pompes manuelles et solaires',
      'Création d’un comité villageois de gestion et de maintenance des bornes-fontaines',
      'Sensibilisation des familles aux règles élémentaires d’hygiène'
    ],
    beneficiaries: 'L’ensemble de la population résidente et l’école primaire',
    contactPerson: 'Commission Eau & Hygiène [À compléter]'
  },
  {
    id: 'proj-2',
    title: 'Rénovation et Équipement de l’École Primaire de Ntolo',
    sector: 'Éducation',
    status: 'En cours',
    progressPercentage: 60,
    budgetEstimated: '8 000 000 FCFA [À compléter / estimation indicative]',
    fundsRaised: '4 800 000 FCFA',
    description: 'Réhabilitation des toitures de salles de classe, fabrication de tables-bancs neufs et mise en place d’un bloc de latrines scolaires salubres.',
    goals: [
      'Réfection de la toiture et peinture de 3 salles de classe',
      'Fabrication de 60 tables-bancs en bois massif local',
      'Création d’un coin bibliothèque de lecture',
      'Construction de latrines ventilées conformes aux normes d’hygiène'
    ],
    beneficiaries: 'Plus de 120 élèves et le corps enseignant [À compléter]',
    contactPerson: 'Association des Parents d’Élèves (APE) [À compléter]'
  },
  {
    id: 'proj-3',
    title: 'Électrification Solaire & Dotation du Poste de Santé',
    sector: 'Santé',
    status: 'En recherche de financement',
    progressPercentage: 20,
    budgetEstimated: '6 500 000 FCFA [À compléter / estimation indicative]',
    fundsRaised: '1 300 000 FCFA',
    description: 'Installation d’un kit solaire autonome pour l’éclairage de nuit lors des accouchements et la conservation réfrigérée des vaccins et sérums antivenimeux.',
    goals: [
      'Acquisition de panneaux solaires, régulateur et batteries de stockage',
      'Installation d’un réfrigérateur solaire médical pour vaccins',
      'Rénovation de la salle de pansements et d’accouchement',
      'Approvisionnement régulier en médicaments de première urgence'
    ],
    beneficiaries: 'Femmes enceintes, enfants et personnes âgées du village et campements voisins',
    contactPerson: 'Comité Sanitaire Local [À compléter]'
  },
  {
    id: 'proj-4',
    title: 'Construction du Foyer Communautaire Polyvalent de Ntolo',
    sector: 'Jeunesse & Culture',
    status: 'Planifié',
    progressPercentage: 10,
    budgetEstimated: '18 000 000 FCFA [À compléter / estimation indicative]',
    fundsRaised: '1 800 000 FCFA',
    description: 'Édification d’une maison commune pour accueillir les assemblées générales, les réunions coutumières, les cours de soutien et les célébrations du village.',
    goals: [
      'Acquisition et délimitation officielle de la parcelle foncière communale',
      'Élévation d’une grande salle de 250 places avec bureau administratif',
      'Espace pour l’apprentissage des métiers artisanaux par les jeunes',
      'Centre d’archives et de mémoire du village de Ntolo'
    ],
    beneficiaries: 'Toute la communauté, associations de femmes et groupements de jeunes',
    contactPerson: 'Bureau du CODEV Ntolo [À compléter]'
  }
];

export const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Assemblée Générale Annuelle du Comité de Développement',
    date: '2026-12-26',
    time: '09h30',
    location: 'Place publique de la Chefferie, Ntolo',
    category: 'Réunion',
    description: 'Bilan moral et financier des actions de l’année, restitution des contributions de la diaspora et adoption du programme des chantiers 2027.',
    organizer: 'Bureau Exécutif du CODEV & Chefferie'
  },
  {
    id: 'evt-2',
    title: 'Journée Citoyenne de Salongo (Travaux d’intérêt général)',
    date: '2026-10-03',
    time: '07h00 - 11h30',
    location: 'Axes routiers et abords des points d’eau, Ntolo',
    category: 'Travaux Communautaires',
    description: 'Grand nettoyage mensuel du village, curage des rigoles et élagage des pistes de circulation.',
    organizer: 'Commission Hygiène & Salubrité'
  },
  {
    id: 'evt-3',
    title: 'Célébration Coutumière & Hommage aux Ancêtres',
    date: '2026-11-14',
    time: '14h00',
    location: 'Esplanade sacrée de la Chefferie [À compléter]',
    category: 'Culture',
    description: 'Rencontre traditionnelle rassemblant les patriarches, danses patrimoniales, bénédictions rituelles et communion fraternelle.',
    organizer: 'Conseil des Sages et Notables de Ntolo'
  },
  {
    id: 'evt-4',
    title: 'Tournoi Fraternité Inter-Quartiers de Football',
    date: '2026-12-20',
    time: '15h00',
    location: 'Terrain de football de l’École de Ntolo [À compléter]',
    category: 'Sport & Jeunesse',
    description: 'Compétition sportive de fin d’année rassemblant la jeunesse locale et les vacanciers de la diaspora dans un esprit de saine émulation.',
    organizer: 'Collectif de la Jeunesse de Ntolo'
  }
];

export const SAMPLE_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Massif du Mont Nlonako et Terres Fertiles',
    category: 'Paysages & Nature',
    imageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Panorama majestueux des contreforts verdoyants du Mont Nlonako surplombant les caféières et le terroir de Ntolo.',
    date: '2026'
  },
  {
    id: 'gal-2',
    title: 'Cascades et Rivières Volcaniques de Nlonako',
    category: 'Paysages & Nature',
    imageUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    caption: 'Chute d’eau naturelle serpentant à travers les orgues basaltiques et la forêt humide de Ntolo.',
    date: '2026'
  },
  {
    id: 'gal-3',
    title: 'Artisanat & Symboles Coutumiers du Moungo',
    category: 'Cérémonies & Coutumes',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Tissages patrimoniaux et mobilier coutumier en bois sculpté, symboles de l’autorité traditionnelle et de la dignité culturelle.',
    date: '2026'
  },
  {
    id: 'gal-4',
    title: 'Mobilisation communautaire pour les pistes',
    category: 'Développement',
    imageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Élan de solidarité villageoise pour l’entretien des axes d’évacuation des récoltes de cacao et café.',
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'Écotourisme et Faune du Massif',
    category: 'Paysages & Nature',
    imageUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    caption: 'Sanctuaire naturel d’altitude abritant des espèces végétales et fauniques endémiques exceptionnelles.',
    date: '2026'
  },
  {
    id: 'gal-6',
    title: 'Héritage Culturel & Transmission',
    category: 'Cérémonies & Coutumes',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Préservation des us ancestraux et bénédiction des aînés pour la prospérité des générations futures de Ntolo.',
    date: '2026'
  }
];

export const SAMPLE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Statuts & Règlement Intérieur du Comité de Développement',
    category: 'Statuts',
    fileType: 'PDF',
    fileSize: '420 Ko',
    datePublished: '2026-01-15',
    description: 'Document cadre régissant les objectifs, la composition du bureau exécutif, les modalités de vote et la gestion transparente des fonds communautaires [À compléter : Version officielle validée].',
    referenceCode: 'STAT-CODEV-NTL-01'
  },
  {
    id: 'doc-2',
    title: 'Guide d’État Civil : Procédure de déclaration des naissances et décès',
    category: 'Administration',
    fileType: 'PDF',
    fileSize: '280 Ko',
    datePublished: '2026-03-10',
    description: 'Guide pratique pour les chefs de familles auprès de la Chefferie de Ntolo et du Centre d’État Civil de la Mairie de Nlonako conformément à la loi camerounaise.',
    referenceCode: 'GUIDE-ETACIV-NTL-02'
  },
  {
    id: 'doc-3',
    title: 'Fiche Synthétique du Projet Forage et Eau Potable',
    category: 'Fiches Projets',
    fileType: 'PDF',
    fileSize: '650 Ko',
    datePublished: '2026-06-05',
    description: 'Descriptif technique préliminaire, plan de masse estimatif, devis quantitatif et modalités de souscription pour la diaspora et les partenaires au développement.',
    referenceCode: 'PRJ-EAU-2026-NTL'
  },
  {
    id: 'doc-4',
    title: 'Fiche d’Adhésion & Fiche de Recensement de la Diaspora',
    category: 'Formulaires',
    fileType: 'PDF',
    fileSize: '190 Ko',
    datePublished: '2026-08-01',
    description: 'Formulaire officiel pour l’enregistrement des originaires de Ntolo résidant hors du village afin de coordonner les actions d’entraide et le réseau de solidarité.',
    referenceCode: 'FORM-DIASP-2026'
  }
];
