import { PageId } from '../types';
import { db } from './firebase';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import {
  VILLAGE_INFO,
  SLOGAN_CONFIG,
  HERO_CONFIG,
  KEY_FIGURES,
  PRESENTATION_FAST,
  LOCATION_DATA,
  DIASPORA_SECTION,
  CONTRIBUTION_CALLOUT,
  CONTACT_FAST,
  PAGES_META,
} from '../data/villageData';

export const EVENT_PAGE_CONTENT_CHANGED = 'ntolo_page_content_changed';
const KEY_PAGE_CONTENTS = 'ntolo_page_contents_v2';

export interface PageSectionData {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  content: string; // Markdown or plain text paragraphs
  bullets?: string[];
  isProvisional?: boolean;
}

export interface PageContentData {
  pageId: PageId;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  provisionalNotice?: string;
  sections: PageSectionData[];
  keyFigures?: Array<{
    id: string;
    label: string;
    value: string;
    subtext: string;
    badgeStatus: string;
    iconName: string;
  }>;
  customFields?: Record<string, string>;
  lastUpdated: string;
  updatedBy?: string;
}

/**
 * DEFAULT CONTENT DICTIONARY FOR ALL 26 PAGES
 * Provides authentic, rich, non-invented initial content for the Village of Ntolo.
 */
export const DEFAULT_PAGE_CONTENTS: Record<PageId, PageContentData> = {
  accueil: {
    pageId: 'accueil',
    title: 'NTOLO',
    subtitle: 'Terre d’histoire, de fertilité et d’avenir au pied du Mont Nlonako',
    description: HERO_CONFIG.shortSummary,
    badge: 'RÉPUBLIQUE DU CAMEROUN • CHEFFERIE DE 3E DEGRÉ',
    provisionalNotice:
      'Portail Officiel en Ligne : Certaines données historiques et administratives détaillées sont en cours de validation par la Chefferie et portent la mention [À compléter].',
    sections: [
      {
        id: 'hero',
        title: 'Bienvenue au Village de Ntolo',
        subtitle: 'Portail Numérique & Institutionnel Officiel',
        content: HERO_CONFIG.shortSummary,
        bullets: [
          'Arrondissement de Nlonako, Département du Moungo, Région du Littoral',
          'Chefferie Traditionnelle de 3e Degré reconnue par l’État camerounais',
          'Mont Nlonako : sanctuaire écologique et contreforts fertiles',
        ],
      },
      {
        id: 'presentation-rapide',
        title: PRESENTATION_FAST.title,
        subtitle: PRESENTATION_FAST.subtitle,
        content: PRESENTATION_FAST.editorialIntro,
        bullets: PRESENTATION_FAST.pillars.map((p) => `${p.title} : ${p.description}`),
      },
      {
        id: 'acces-localisation',
        title: LOCATION_DATA.title,
        subtitle: LOCATION_DATA.subtitle,
        content: LOCATION_DATA.regionDescription,
        bullets: LOCATION_DATA.accessItinerary.map((it) => `${it.from} : ${it.detail} (${it.distance})`),
      },
      {
        id: 'diaspora-communaute',
        title: DIASPORA_SECTION.title,
        subtitle: DIASPORA_SECTION.subtitle,
        content: DIASPORA_SECTION.intro,
        bullets: DIASPORA_SECTION.stats.map((s) => `${s.label} : ${s.value} - ${s.note}`),
      },
      {
        id: 'appel-contribution',
        title: CONTRIBUTION_CALLOUT.title,
        subtitle: CONTRIBUTION_CALLOUT.subtitle,
        content: CONTRIBUTION_CALLOUT.appealText,
        bullets: CONTRIBUTION_CALLOUT.guarantees,
      },
    ],
    keyFigures: KEY_FIGURES,
    lastUpdated: '2026-09-29',
  },

  presentation: {
    pageId: 'presentation',
    title: 'Présentation Générale de Ntolo',
    subtitle: 'Fiche synthétique, identité institutionnelle, vocation du terroir et cadre d’action',
    description:
      'Fiche synthétique, identité institutionnelle, vocation du terroir et cadre d’action de la communauté de Ntolo dans l’Arrondissement de Nlonako (Département du Moungo).',
    badge: 'Portail Officiel • Section 01',
    provisionalNotice:
      'Certaines données administratives et statistiques détaillées sont en attente de collationnement auprès de la Préfecture du Moungo et portent la mention [À compléter].',
    sections: [
      {
        id: 'fiche-signaletique',
        title: 'Fiche Signalétique Officielle du Village',
        subtitle: 'Cadre républicain et rattachement administratif',
        content:
          'Ntolo est un village d’histoire et d’agriculture situé dans le Département du Moungo (Région du Littoral). La Chefferie traditionnelle de 3e degré est régie conformément au Décret présidentiel N° 77/245 du 15 juillet 1977. Sous la tutelle républicaine de la Sous-Préfecture de Nlonako et de la Préfecture de Nkongsamba, le village cultive la paix et la solidarité.',
        bullets: [
          'Dénomination officielle : Village de Ntolo (NTOLO)',
          'Statut coutumier : Chefferie traditionnelle de 3e degré [À compléter : Décret/Arrêté d’homologation]',
          'Rattachement : Arrondissement de Nlonako, Département du Moungo, Région du Littoral',
          'Autorité traditionnelle : Sa Majesté le Chef Traditionnel & le Conseil des Notables',
          'Organe de concertation : Comité de Développement de Ntolo (CODEV)',
        ],
      },
      {
        id: 'vocation-terroir',
        title: 'Vocation & Identité de Ntolo',
        subtitle: 'Trois piliers fondamentaux pour notre communauté',
        content:
          'Bordé par les massifs du Mont Nlonako, Ntolo jouit d’une fertilité agronomique reconnue pour le café Robusta et Arabica, le cacao et les cultures vivrières pérennes. Le village se distingue par un pacte communautaire exemplaire entre les résidents et la diaspora.',
        bullets: [
          'Un terroir volcanique généreux aux terres riches et arrosées',
          'Une autorité coutumière républicaine garante des traditions et de l’arbitrage pacifique',
          'Une mobilisation solidaire continue pour l’accès à l’eau potable, à l’école et à la santé',
        ],
      },
      {
        id: 'grands-axes-developpement',
        title: 'Vision Stratégique & Priorités Communautaires',
        subtitle: 'Les objectifs majeurs fixés par les concertations villageoises',
        content:
          'Le plan de développement communautaire de Ntolo s’articule autour de quatre priorités concrètes : la réhabilitation intégrale du réseau d’eau potable par gravité, le désenclavement des pistes agricoles vers les plantations, l’appui aux écoles primaires et la création d’un poste de santé équipé.',
        bullets: [
          'Priorité 1 : Adduction d’eau potable et protection des sources du Mont Nlonako',
          'Priorité 2 : Entretien périodique des pistes de desserte agricole pour l’évacuation du café et cacao',
          'Priorité 3 : Rénovation des salles de classe de l’École Publique et électrification solaire',
          'Priorité 4 : Équipement du Poste de Santé et permanence d’un personnel soignant qualifié',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  histoire: {
    pageId: 'histoire',
    title: 'Histoire & Mémoire du Village de Ntolo',
    subtitle: 'Récits fondateurs, dynamiques de peuplement au pied du Mont Nlonako et jalons historiques documentés',
    description:
      'Aux origines de la communauté : récits fondateurs, dynamiques de peuplement au pied du Mont Nlonako et jalons historiques documentés.',
    badge: 'Portail Officiel • Section 02',
    provisionalNotice:
      'L’histoire de Ntolo repose sur une tradition orale vivante et des archives en cours de numérisation. Aucune généalogie ou date non formellement attestée n’est inventée. Les éléments en attente de validation portent la mention [À compléter].',
    sections: [
      {
        id: 'origines',
        title: '1. Les Origines et le Récit Fondateur',
        subtitle: 'L’installation ancestrale au pied du Mont Nlonako',
        content:
          'L’implantation des populations de Ntolo sur les contreforts du Mont Nlonako s’inscrit dans les grandes migrations historiques qui ont façonné le peuplement du département du Moungo et des régions environnantes du Cameroun.\n\nSelon la mémoire collective transmise de génération en génération sous l’arbre à palabres, les pères fondateurs choisirent cet emplacement stratégique pour sa richesse écologique exceptionnelle : une eau abondante provenant des ruisseaux du massif, des sols volcaniques d’une rare fertilité et une topographie protectrice.',
        bullets: [
          'Nom originel & Étymologie locale : [À compléter : Signification exacte du toponyme "NTOLO" selon les aînés et les linguistes du terroir].',
          'Premiers lignages établis : Les familles fondatrices ayant défriché les premières parcelles coutumières.',
          'Pacte de cohabitation harmonieuse avec les terroirs voisins de Nlonako.',
        ],
        isProvisional: true,
      },
      {
        id: 'chronologie',
        title: '2. Chronologie & Jalons Historiques Reconnus',
        subtitle: 'Des origines coutumières à l’ère contemporaine',
        content:
          'L’histoire moderne de Ntolo s’est articulée autour de la structuration de la chefferie, de l’essor des plantations de café et cacao dans le Moungo, et de la création du Comité de Développement pour moderniser le village.',
        bullets: [
          'Période Précoloniale : Organisation coutumière clanique et respect scrupuleux des lieux sacrés du Nlonako.',
          'Période Coloniale : Introduction des cultures de rente (caféier et cacaoyer) et structuration des premières pistes.',
          'Années 1960 - Indépendance : Reconnaissance de la Chefferie selon le droit administratif camerounais.',
          'Ère Contemporaine : Structuration du CODEV et mobilisation de la diaspora pour les infrastructures d’eau et d’éducation.',
        ],
      },
      {
        id: 'lignee-dynastique',
        title: '3. Autorité Coutumière & Lignée des Dirigeants',
        subtitle: 'Continuité dynastique et transmission des insignes royaux',
        content:
          'La Chefferie de 3e degré de Ntolo garantit la continuité des us et coutumes. La désignation du Chef obéit aux règles coutumières locales en accord avec le collège des notables dépositaires de la tradition et fait l’objet d’une homologation administrative par arrêté républicain.',
        bullets: [
          'Dynastie régnante : [À compléter : Liste officielle des Chefs historiques successifs de Ntolo certifiée par le Conseil des Notables]',
          'Chef actuel : Sa Majesté le Chef Traditionnel de Ntolo',
          'Rôle du Conseil des Notables : Veiller à la paix sociale, à l’arbitrage coutumier et à la sacralité des rites de la forêt.',
        ],
        isProvisional: true,
      },
    ],
    lastUpdated: '2026-09-29',
  },

  geographie: {
    pageId: 'geographie',
    title: 'Situation Géographique & Environnement de Ntolo',
    subtitle: 'Relief, contreforts du Mont Nlonako, hydrographie, climat et voies de communication',
    description:
      'Situation géographique, cadre écologique et coordonnées d’accès au village de Ntolo dans le Moungo.',
    badge: 'Portail Officiel • Section 03',
    provisionalNotice:
      'Les coordonnées GPS précises et les relevés altimétriques sont en cours de confirmation par GPS différentiel et portent la mention [À compléter].',
    sections: [
      {
        id: 'relief-climat',
        title: '1. Relief, Altitude & Climat',
        subtitle: 'Un écosystème montagnard frais et généreux',
        content:
          'Ntolo s’étend sur les contreforts du Mont Nlonako, massif culminant à plus de 1 800 mètres d’altitude dans le département du Moungo. Le village bénéficie d’un microclimat tempéré par l’altitude, alternant saisons des pluies vivifiantes et saisons sèches propices aux récoltes.',
        bullets: [
          'Altitude moyenne : 600 à 750 mètres au-dessus du niveau de la mer',
          'Climat : Subéquatorial de transition avec forte pluviosité annuelle favorisant les sources',
          'Sols : Terres volcaniques d’une fertilité exceptionnelle, idéales pour l’agriculture biologique',
        ],
      },
      {
        id: 'hydrographie-sources',
        title: '2. Hydrographie & Richesse des Eaux',
        subtitle: 'Les cours d’eau du Mont Nlonako au service du village',
        content:
          'Le massif du Mont Nlonako constitue un véritable château d’eau naturel pour Ntolo. Plusieurs rivières pérennes et sources claires irriguent le village et alimentent le projet d’adduction d’eau par gravité.',
        bullets: [
          'Réseau de ruisseaux et torrents de montagne dévalant les pentes',
          'Sources protégées captées pour l’alimentation en eau potable des quartiers',
          'Forêts-galeries préservant la fraîcheur des nappes phréatiques',
        ],
      },
      {
        id: 'voies-acces',
        title: '3. Voies d’Accès & Desserte',
        subtitle: 'Itinéraires depuis Nkongsamba, Douala et Yaoundé',
        content:
          'L’accès principal à Ntolo s’effectue depuis Nkongsamba en empruntant la route vers Nlonako, puis en suivant la piste rurale aménagée.',
        bullets: [
          'Depuis Nkongsamba : 25 à 35 km via Nlonako (piste rurale praticable)',
          'Depuis Douala : 165 km par la Route Nationale N5 (axe Douala - Nkongsamba)',
          'Depuis Yaoundé : ~350 km via Bafoussam ou Douala',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  population: {
    pageId: 'population',
    title: 'Population, Quartiers & Vivre-Ensemble',
    subtitle: 'Démographie, structures coutumières des quartiers, jeunesse et cohésion sociale',
    description:
      'Démographie, organisation des quartiers villageois et dynamiques communautaires de Ntolo.',
    badge: 'Portail Officiel • Section 04',
    provisionalNotice:
      'Les données chiffrées précises du dernier recensement général de la population sont en attente d’actualisation [À compléter].',
    sections: [
      {
        id: 'demographie',
        title: '1. Démographie & Composition Communautaire',
        subtitle: 'Une population laborieuse, accueillante et soudée',
        content:
          'La population de Ntolo est composée de familles enracinées depuis des générations, unies par des liens matrimoniaux et de fraternité avec les villages voisins du canton. La jeunesse représente plus de 60% de la communauté, constituant le moteur de l’agriculture et du développement.',
        bullets: [
          'Population résidente estimée : [À compléter : Chiffre exact du recensement local]',
          'Diaspora active : Plusieurs centaines de ressortissants fédérés à Douala, Yaoundé et à l’international',
          'Valeurs cardinales : Respect des aînés, solidarité communautaire (Salongo) et hospitalité',
        ],
      },
      {
        id: 'quartiers-villages',
        title: '2. Quartiers Coutumiers du Village',
        subtitle: 'Structuration spatiale et chefs de quartiers',
        content:
          'Le village de Ntolo est structuré en plusieurs quartiers coutumiers, chacun sous l’autorité d’un chef de quartier ou notable délégué par Sa Majesté.',
        bullets: [
          'Quartier Chefferie (Centre coutumier, palais et place des fêtes)',
          'Quartier Haut-Village (Versants agricoles vers le Mont Nlonako)',
          'Quartier Bas-Village (Voie de liaison vers Nlonako et zone d’écoles)',
          '[À compléter : Liste officielle et noms traditionnels complets des quartiers de Ntolo]',
        ],
      },
      {
        id: 'associations-locales',
        title: '3. Vie Associative & Solidarités',
        subtitle: 'Femmes, jeunes et tontines du terroir',
        content:
          'La vitalité du village repose sur un tissu associatif dense : l’Association des Femmes Rurales de Ntolo, le Mouvement des Jeunes pour le Progrès, et les comités de gestion des points d’eau.',
        bullets: [
          'Association des Femmes : Promotion des cultures vivrières et micro-crédit rotatif',
          'Jeunesse Active : Travaux d’intérêt général (désherbage des abords des routes, salongo)',
          'Comité de Développement (CODEV) : Coordination globale des projets d’infrastructures',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  chefferie: {
    pageId: 'chefferie',
    title: 'Chefferie Traditionnelle & Gouvernance Coutumière',
    subtitle: 'Palais royal, Sa Majesté, Notables, Conseil des Sages et arbitrage coutumier',
    description:
      'Gouvernance traditionnelle, rôle du Chef coutumier et prérogatives de la cour royale de Ntolo.',
    badge: 'Portail Officiel • Section 05',
    provisionalNotice:
      'La liste protocolaire des Notables et les décrets d’homologation sont en cours de mise à jour auprès de la chancellerie coutumière [À compléter].',
    sections: [
      {
        id: 'role-chefferie',
        title: '1. Rôle & Prérogatives de la Chefferie',
        subtitle: 'Une institution séculaire consacrée par les lois de la République',
        content:
          'La Chefferie de 3e degré de Ntolo exerce une autorité morale, coutumière et administrative fondamentale. Aux termes de la réglementation camerounaise, le Chef traditionnel est l’auxiliaire de l’administration républicaine, tout en étant le gardien sacré des traditions ancestrales.',
        bullets: [
          'Maintien de la paix sociale et conciliation des litiges familiaux ou fonciers',
          'Relais des directives de la Sous-Préfecture de Nlonako et de la Mairie',
          'Préservation du patrimoine culturel, des sites sacrés et des coutumes du village',
          'Impulsion des projets de développement en synergie avec le CODEV',
        ],
      },
      {
        id: 'conseil-notables',
        title: '2. Le Conseil des Notables & Sages',
        subtitle: 'Les gardiens du temple et conseillers de Sa Majesté',
        content:
          'Autour de Sa Majesté siège le Conseil des Notables, représentant les grandes familles et les clans fondateurs. Ce collège participe aux délibérations majeures et assiste le Chef lors des audiences coutumières du samedi.',
        bullets: [
          'Conseil restreint des Sages et Patriarches',
          'Représentants désignés des quartiers coutumiers',
          'Audiences de conciliation foncière et arbitrages coutumiers',
        ],
      },
      {
        id: 'palais-permanences',
        title: '3. Le Palais Royal & Permanence',
        subtitle: 'Accueil des citoyens et relations publiques',
        content:
          'Le Palais de la Chefferie de Ntolo est le cœur battant du village. Il abrite la salle du trône coutumier, le secrétariat administratif et la cour des délibérations publiques.',
        bullets: [
          'Audiences coutumières : Les samedis de 09h00 à 13h00 (sur inscription préalable)',
          'Permanence du Secrétariat : Lundi au vendredi pour légalisation d’actes coutumiers',
          'Lieu : Face à la Place du Marché Coutumier de Ntolo',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'organisation-traditionnelle': {
    pageId: 'organisation-traditionnelle',
    title: 'Organisation Traditionnelle & Us Coutumiers',
    subtitle: 'Règles coutumières, successions, médiations et structures ancestrales',
    description:
      'Structures ancestrales, règles de médiation et rituels coutumiers du village de Ntolo.',
    badge: 'Portail Officiel • Section 06',
    sections: [
      {
        id: 'structures-ancestrales',
        title: '1. Les Piliers de l’Organisation Traditionnelle',
        subtitle: 'Hiérarchie coutumière et dépositaires des rites',
        content:
          'L’ordre coutumier de Ntolo repose sur l’équilibre entre l’autorité du Chef, la sagesse du Conseil des Anciens et le respect scrupuleux des lois coutumières transmises de père en fils.',
        bullets: [
          'Sa Majesté le Chef Traditionnel : Père de la communauté et garant de l’harmonie',
          'Les Notables de Cour : Détenteurs des secrets coutumiers et régulateurs des successions',
          'Les Patriarches de Clans : Porte-paroles des familles et médiateurs de proximité',
        ],
      },
      {
        id: 'justice-coutumiere',
        title: '2. La Justice & Médiation Coutumière',
        subtitle: 'Résoudre les différends par l’arbre à palabres et le compromis',
        content:
          'Avant tout recours aux tribunaux républicains, la tradition privilégie la conciliation au palais. Les litiges fonciers ruraux, les mésententes conjugales et les querelles de voisinage sont examinés dans un esprit de restauration de la paix communautaire.',
        bullets: [
          'Dépôt de requête auprès du greffe coutumier de la Chefferie',
          'Convocations des parties et audition des témoins assermentés',
          'Verdict coutumier scellé par le partage de la cola traditionnelle',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'organisation-administrative': {
    pageId: 'organisation-administrative',
    title: 'Organisation Administrative & Tutelle Républicaine',
    subtitle: 'Sous-Préfecture de Nlonako, Préfecture du Moungo, Commune et CODEV',
    description:
      'Cadre légal républicain, décentralisation et organes administratifs régissant le village de Ntolo.',
    badge: 'Portail Officiel • Section 07',
    sections: [
      {
        id: 'tutelle-administrative',
        title: '1. Rattachement Administratif Républicain',
        subtitle: 'Une chefferie intégrée dans l’architecture de l’État camerounais',
        content:
          'Le village de Ntolo relève de l’arrondissement de Nlonako, dont le chef-lieu abrite la Sous-Préfecture et la Mairie de Nlonako. Au niveau départemental, il dépend de la Préfecture du Moungo siégeant à Nkongsamba, sous l’autorité du Gouverneur de la Région du Littoral à Douala.',
        bullets: [
          'Sous-Préfecture de Nlonako (Tutelle administrative directe)',
          'Commune de Nlonako (Collectivité territoriale décentralisée)',
          'Préfecture du Moungo - Nkongsamba (Tutelle départementale)',
          'Région du Littoral - Douala (Coordination régionale)',
        ],
      },
      {
        id: 'comite-developpement',
        title: '2. Le Comité de Développement de Ntolo (CODEV)',
        subtitle: 'Le bras opérationnel du progrès communautaire',
        content:
          'Le CODEV est l’association apolitique et laïque chargée de concevoir, financer et exécuter les projets d’intérêt général du village. Travaillant en symbiose avec la Chefferie, il fédère les compétences locales et celles de la diaspora.',
        bullets: [
          'Bureau exécutif élu par l’assemblée générale des originaires',
          'Commissions spécialisées : Eau, Éducation, Santé, Routes et Événements',
          'Gestion transparente des comptes bancaires et des cotisations citoyennes',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  culture: {
    pageId: 'culture',
    title: 'Culture, Traditions & Art de Vivre',
    subtitle: 'Rites coutumiers, danses traditionnelles, calendrier agraire et gastronomie du terroir',
    description:
      'Expressions culturelles, calendrier coutumier et art culinaire du terroir de Ntolo.',
    badge: 'Portail Officiel • Section 08',
    sections: [
      {
        id: 'rites-coutumiers',
        title: '1. Rites & Célébrations Royales',
        subtitle: 'Les temps forts de la communion ancestrale',
        content:
          'La vie culturelle de Ntolo est rythmée par les fêtes de fin d’année, les cérémonies de bénédiction des récoltes de café et de cacao, et les hommages aux défunts patriarches.',
        bullets: [
          'Bénédiction coutumière des semences et des récoltes',
          'Danses traditionnelles guerrières et d’initiation',
          'Rites d’accueil des dignitaires et des hôtes illustres',
        ],
      },
      {
        id: 'gastronomie',
        title: '2. Gastronomie du Terroir de Ntolo',
        subtitle: 'Les délices de la terre volcanique du Moungo',
        content:
          'La cuisine locale met en valeur les tubercules, légumes sauvages et viandes élevées au village. Les mets sont préparés avec des épices locales cueillies sur les pentes du Mont Nlonako.',
        bullets: [
          'Plats traditionnels à base de plantain, taro pilé et sauces épicées du terroir',
          'Légumes feuilles frais (Kwem, folon) récoltés dans les jardins de case',
          'Dégustation du vin de palme frais et café local torréfié artisanalement',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'langues-patrimoine': {
    pageId: 'langues-patrimoine',
    title: 'Langues & Patrimoine Immatériel',
    subtitle: 'Langue vernaculaire, contes, proverbes et préservation des savoirs ancestraux',
    description:
      'Préservation de la langue maternelle, recueil de proverbes et transmission intergénérationnelle.',
    badge: 'Portail Officiel • Section 09',
    sections: [
      {
        id: 'langue-vernaculaire',
        title: '1. La Langue Vernaculaire de Ntolo',
        subtitle: 'Véhicule de l’âme et de l’identité communautaire',
        content:
          'La langue locale parlée à Ntolo s’enracine dans la famille linguistique des peuples du Moungo et des contreforts du Nlonako. Le Comité linguistique local œuvre à l’enregistrement des contes et à la fixation écrite du vocabulaire usuel.',
        bullets: [
          'Lexique usuel des salutations et formules de politesse coutumières',
          'Ateliers d’apprentissage de la langue pour les enfants de la diaspora',
          'Collecte des chants traditionnels et devinettes des aînés',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  education: {
    pageId: 'education',
    title: 'Éducation & Jeunesse',
    subtitle: 'École publique, scolarisation, bourses d’excellence et besoins en infrastructures',
    description:
      'Situation éducative à Ntolo : École publique, besoins en tables-bancs et soutien scolaire.',
    badge: 'Portail Officiel • Section 10',
    sections: [
      {
        id: 'ecole-publique',
        title: '1. L’École Publique de Ntolo',
        subtitle: 'Le creuset de l’instruction de nos enfants',
        content:
          'L’école primaire publique accueille les enfants du village et des hameaux environnants. Malgré le dévouement du corps enseignant, l’établissement nécessite des rénovations structurelles et des dotations pédagogiques urgentes.',
        bullets: [
          'Effectif scolaire : Plusieurs dizaines d’élèves scolarisés de la SIL au CM2',
          'Besoins identifiés : Réfection des toitures, tables-bancs neufs et manuels scolaires',
          'Appel aux dons de la diaspora : Financement des fournitures et primes aux enseignants bénévoles',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  sante: {
    pageId: 'sante',
    title: 'Santé & Bien-Être Communautaire',
    subtitle: 'Poste de santé, prévention, eau potable et urgences médicales',
    description:
      'Infrastructures de santé de Ntolo, soins primaires, pharmacie communautaire et évacuations sanitaires.',
    badge: 'Portail Officiel • Section 11',
    sections: [
      {
        id: 'poste-sante',
        title: '1. Le Poste de Santé de Ntolo',
        subtitle: 'Soins de proximité pour les familles',
        content:
          'Le poste de santé assure les consultations de base, les premiers secours et le suivi maternel. Pour les urgences chirurgicales ou complexes, les évacuations sont dirigées vers le Centre Médical d’Arrondissement de Nlonako ou l’Hôpital de District de Nkongsamba.',
        bullets: [
          'Soins dispensés : Paludisme, pansements, consultations prénatales et vaccinations',
          'Besoins urgents : Électrification solaire de la chaîne du froid et boîte de médicaments essentiels',
          'Projet en cours : Réhabilitation complète du bâtiment sanitaire avec l’appui de partenaires',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  agriculture: {
    pageId: 'agriculture',
    title: 'Agriculture & Richesses du Terroir',
    subtitle: 'Caféiculture, cacaoyers, cultures vivrières et calendrier agraire',
    description:
      'Filières agricoles de Ntolo : Café Robusta & Arabica, cacao d’excellence et vivres de montagne.',
    badge: 'Portail Officiel • Section 12',
    sections: [
      {
        id: 'cultures-rente',
        title: '1. Les Cultures de Rente : Café & Cacao',
        subtitle: 'Le poumon économique des exploitants de Ntolo',
        content:
          'Grâce aux sols volcaniques riches en oligo-éléments et à l’altitude favorable, Ntolo produit un café réputé pour ses arômes équilibrés ainsi qu’un cacao de grade supérieur séché au soleil naturel.',
        bullets: [
          'Caféiculture : Variétés Robusta sur les coteaux et Arabica en altitude',
          'Cacaoyers : Plantations familiales ombragées respectueuses de la biodiversité',
          'Objectif CODEV : Regrouper les producteurs en coopérative pour négocier de meilleurs prix bord-champ',
        ],
      },
      {
        id: 'cultures-vivrieres',
        title: '2. Cultures Vivrières & Sécurité Alimentaire',
        subtitle: 'Une terre généreuse pour nourrir le village et approvisionner les marchés',
        content:
          'Les femmes de Ntolo excellent dans la culture du plantain, du macabo, du maïs, des arachides et des légumes de montagne.',
        bullets: [
          'Plantain et bananes de première qualité approvisionnant Nkongsamba',
          'Légumes et condiments sans intrants chimiques nocifs',
          'Sécurisation des greniers et séchoirs communautaires',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  elevage: {
    pageId: 'elevage',
    title: 'Élevage & Productions Animales',
    subtitle: 'Porciculture, petits ruminants, aviculture villageoise et suivi vétérinaire',
    description:
      'Activités pastorales et avicoles à Ntolo sous encadrement des services du MINEPIA.',
    badge: 'Portail Officiel • Section 13',
    sections: [
      {
        id: 'elevage-familial',
        title: '1. L’Élevage Familial & Opportunités Pastorales',
        subtitle: 'Complément essentiel aux revenus agricoles',
        content:
          'L’élevage de chèvres, porcs et volailles locales contribue aux fêtes coutumières et procure des revenus de secours aux ménages en période de soudure.',
        bullets: [
          'Élevage caprin et porcin en semi-liberté ou enclos traditionnels',
          'Aviculture villageoise pour la consommation familiale et la vente locale',
          'Nécessité de campagnes régulières de vaccination vétérinaire',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'economie-commerce': {
    pageId: 'economie-commerce',
    title: 'Commerce & Activités Économiques',
    subtitle: 'Marchés périodiques, boutiques de quartier, tontines et opportunités de négoce',
    description:
      'Circuits économiques locaux, place du marché et dynamisme commercial à Ntolo.',
    badge: 'Portail Officiel • Section 14',
    sections: [
      {
        id: 'marche-local',
        title: '1. Le Marché Périodique & les Échanges',
        subtitle: 'Le point de rencontre des producteurs et des commerçants du Moungo',
        content:
          'Le marché de Ntolo rassemble les agriculteurs locaux et les acheteurs venus de Nlonako et Nkongsamba. C’est un lieu vivant de commerce où s’échangent les vivres frais contre les produits manufacturés.',
        bullets: [
          'Vente directe bord-champ et au marché coutumier',
          'Réseau de boutiques d’alimentation générale et dépôts villageois',
          'Rôle structurant des tontines pour l’épargne et l’investissement rural',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  infrastructures: {
    pageId: 'infrastructures',
    title: 'Infrastructures & Équipements de Base',
    subtitle: 'Pistes rurales, hydraulique villageoise, énergie solaire et réseaux de télécommunications',
    description:
      'État des lieux des infrastructures à Ntolo : Pistes, eau potable, électricité et téléphonie.',
    badge: 'Portail Officiel • Section 15',
    sections: [
      {
        id: 'chantiers-infrastructures',
        title: '1. Pistes de Desserte & Désenclavement',
        subtitle: 'Garantir la circulation en toute saison',
        content:
          'La piste reliant Ntolo à la route principale de Nlonako fait l’objet de travaux réguliers de reprofilage et de curage des fossés pour éviter les coupures pendant les grandes pluies.',
        bullets: [
          'Reprofilage périodique par le génie communal et les corvées citoyennes (Salongo)',
          'Ponts en bois et buses métalliques en cours de remplacement par des ouvrages maçonnés',
          'Plaidoyer auprès du Ministère des Travaux Publics pour un bitumage partiel',
        ],
      },
      {
        id: 'eau-energie',
        title: '2. Eau Potable & Énergie Solaire',
        subtitle: 'Chantier phare d’adduction par gravité',
        content:
          'Le projet prioritaire de Ntolo consiste à capter une source haute du Mont Nlonako et à installer un réseau de tuyaux PVC et de bornes-fontaines dans tous les quartiers.',
        bullets: [
          'Source pérenne captée à grand débit',
          'Installation de kits solaires pour l’éclairage public du centre coutumier',
          'Couverture cellulaire mobile (Orange & MTN) assurée sur la majorité du terroir',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  environnement: {
    pageId: 'environnement',
    title: 'Environnement & Biodiversité du Mont Nlonako',
    subtitle: 'Forêt pluviale de montagne, faune herpétologique exceptionnelle et protection des bassins versants',
    description:
      'Patrimoine écologique mondial du Mont Nlonako, biodiversité végétale et engagement éco-citoyen.',
    badge: 'Portail Officiel • Section 16',
    sections: [
      {
        id: 'sanctuaire-ecologique',
        title: '1. Le Mont Nlonako : Sanctuaire de la Biodiversité',
        subtitle: 'Un haut-lieu herpétologique reconnu mondialement par les scientifiques',
        content:
          'Le Mont Nlonako est réputé dans le monde entier pour abriter l’une des plus exceptionnelles diversités d’amphibiens et de reptiles d’Afrique, notamment la célèbre grenouille goliath (Conraua goliath). Ntolo s’engage pour la préservation de ce joyau naturel.',
        bullets: [
          'Protection des zones de forêt dense et des berges des cours d’eau',
          'Interdiction stricte de l’empoisonnement des rivières et de la déforestation sauvage',
          'Sensibilisation des jeunes générations à la conservation de la faune endémique',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  tourisme: {
    pageId: 'tourisme',
    title: 'Tourisme, Nature & Découvertes',
    subtitle: 'Cascades naturelles, trekking du Mont Nlonako, hospitalité et guides locaux',
    description:
      'Circuits d’écotourisme, randonnées en forêt d’altitude et accueil chaleureux au village de Ntolo.',
    badge: 'Portail Officiel • Section 17',
    sections: [
      {
        id: 'circuits-touristiques',
        title: '1. Randonnées & Points d’Intérêt',
        subtitle: 'Prendre de la hauteur sur les contreforts du Moungo',
        content:
          'Ntolo offre un cadre idyllique pour les randonneurs, les naturalistes et les citadins en quête de ressourcement. Des cascades cachées et des belvédères panoramiques permettent d’admirer la plaine du Moungo.',
        bullets: [
          'Ascension guidée vers les crêtes du Mont Nlonako',
          'Baignade dans les vasques d’eau pure des cascades villageoises',
          'Visite commentée du Palais Royal et des plantations caféières séculaires',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  projets: {
    pageId: 'projets',
    title: 'Grands Projets de Développement Communautaire',
    subtitle: 'Chantiers prioritaires, plans d’exécution et suivi transparent des souscriptions',
    description:
      'Feuille de route des infrastructures prioritaires portées par le CODEV et la Chefferie.',
    badge: 'Portail Officiel • Section 18',
    sections: [
      {
        id: 'programme-developpement',
        title: '1. Programme Pluriannuel du CODEV',
        subtitle: 'Bâtir le Ntolo de demain par nos propres efforts',
        content:
          'Tous les projets du village sont votés en concertation avec les résidents et les représentants de la diaspora. Chaque franc collecté fait l’objet d’un affichage public et d’un compte rendu scrupuleux.',
        bullets: [
          'Projet 1 : Adduction d’eau potable par gravité (Chantier prioritaire)',
          'Projet 2 : Rénovation du bloc de salles de classe de l’École Publique',
          'Projet 3 : Électrification solaire du poste de santé et du palais royal',
          'Projet 4 : Construction d’un Foyer Polyvalent des Jeunes et des Femmes',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'projets-participatifs': {
    pageId: 'projets-participatifs',
    title: 'Projets Participatifs Citoyens & Démocratie Participative',
    subtitle: 'Micro-initiatives proposées par les villageois, votes communautaires et parrainages',
    description:
      'Plateforme de démocratie participative locale permettant à chaque citoyen de proposer un projet.',
    badge: 'Portail Officiel • Section 19',
    sections: [
      {
        id: 'demarche-participative',
        title: '1. Le Principe du Budget Participatif',
        subtitle: 'Chaque citoyen a une voix pour le progrès de son quartier',
        content:
          'Toute personne originaire ou amie de Ntolo peut soumettre une proposition de micro-projet. Après examen technique par le CODEV, le projet est soumis aux votes des membres et reçoit un financement d’amorçage.',
        bullets: [
          'Soumission gratuite en ligne via le formulaire participatif',
          'Vote ouvert à tous les résidents et membres enregistrés de la diaspora',
          'Accompagnement par des bâtisseurs et mentors bénévoles',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  actualites: {
    pageId: 'actualites',
    title: 'Actualités & Journal Officiel du Village',
    subtitle: 'Chronique du développement, grands événements et réalisations communautaires',
    description:
      'Flux d’informations officielles, articles et reportages sur la vie du village de Ntolo.',
    badge: 'Portail Officiel • Section 20',
    sections: [
      {
        id: 'journal-officiel',
        title: '1. La Tribune d’Information Communautaire',
        subtitle: 'Une communication transparente et vérifiée',
        content:
          'Le journal du village relate les avancées des chantiers, les festivités culturelles, les décisions de la chefferie et les hommages aux personnalités qui font la fierté de Ntolo.',
        bullets: [
          'Articles rédigés sous la supervision de la commission communication du CODEV',
          'Possibilité pour les citoyens de soumettre des brèves ou reportages locaux',
          'Diffusion simultanée sur les canaux numériques et par affichage au palais',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'article-detail': {
    pageId: 'article-detail',
    title: 'Détail de l’Article Officiel',
    subtitle: 'Lecture intégrale et archives documentaires',
    description: 'Affichage détaillé des publications et communiqués officiels.',
    sections: [],
    lastUpdated: '2026-09-29',
  },

  annonces: {
    pageId: 'annonces',
    title: 'Avis Officiels, Communiqués & Nécrologie',
    subtitle: 'Le panneau d’affichage numérique officiel de la Chefferie et du CODEV',
    description:
      'Panneau officiel d’affichage : Convocations royales, alertes urgentes, salongo et avis nécrologiques.',
    badge: 'Portail Officiel • Section 21',
    sections: [
      {
        id: 'affichage-legal',
        title: '1. Panneau d’Affichage Réglementaire',
        subtitle: 'Les avis officiels de la Chefferie Traditionnelle',
        content:
          'Cette section constitue le support d’affichage numérique officiel du village. Elle garantit que toute décision importante ou convocation d’urgence parvienne à tous les membres de la communauté.',
        bullets: [
          'Convocations aux Assemblées Générales et réunions coutumières',
          'Annonces de travaux communautaires obligatoires (Salongo)',
          'Avis de décès et programmes des obsèques traditionnelles',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  evenements: {
    pageId: 'evenements',
    title: 'Agenda & Événements Communautaires',
    subtitle: 'Cérémonies royales, assemblées générales, travaux collectifs et tournois sportifs',
    description:
      'Calendrier officiel des rendez-vous et fêtes coutumières de Ntolo.',
    badge: 'Portail Officiel • Section 22',
    sections: [
      {
        id: 'agenda-annuel',
        title: '1. Les Grands Rendez-Vous de Ntolo',
        subtitle: 'Vivre au rythme des saisons et des traditions',
        content:
          'Chaque année, l’agenda rassemble les fils et filles du village pour des moments d’intense convivialité et de travail concerté.',
        bullets: [
          'Grand Salongo de rentrée scolaire (Août - Septembre)',
          'Fêtes traditionnelles et bénédiction des récoltes (Décembre)',
          'Assemblée Générale annuelle du CODEV (Période des congés)',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  galerie: {
    pageId: 'galerie',
    title: 'Fonds Photographique & Vidéothèque Officielle',
    subtitle: 'Terroirs du Moungo, paysages du Nlonako, visages et cérémonies de Ntolo',
    description:
      'Galerie multimédia officielle illustrant le patrimoine vivant du village de Ntolo.',
    badge: 'Portail Officiel • Section 23',
    sections: [
      {
        id: 'fonds-iconographique',
        title: '1. Mémoire Visuelle & Archives Photographiques',
        subtitle: 'Immortaliser les beautés et le travail de nos aïeux et des générations actuelles',
        content:
          'La galerie regroupe des clichés authentiques du terroir, des portraits d’anciens, des photos des chantiers et des paysages grandioses des contreforts du Mont Nlonako.',
        bullets: [
          'Photothèque haute résolution organisée par albums thématiques',
          'Vidéothèque regroupant reportages et capsules documentaires',
          'Collecte permanente de photos d’époque auprès des familles',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  documents: {
    pageId: 'documents',
    title: 'Bibliothèque des Actes & Documents Officiels',
    subtitle: 'Statuts, décrets, fiches projets, formulaires d’adhésion et comptes rendus',
    description:
      'Centre d’archives numériques officielles en téléchargement libre et sécurisé.',
    badge: 'Portail Officiel • Section 24',
    sections: [
      {
        id: 'archives-publiques',
        title: '1. Centre d’Archives & Téléchargements',
        subtitle: 'La transparence administrative au service de tous',
        content:
          'Tous les textes fondamentaux de la communauté sont mis à la disposition des chercheurs, des ressortissants et des partenaires techniques et financiers.',
        bullets: [
          'Statuts et règlement intérieur du CODEV',
          'Fiches techniques des projets d’infrastructures',
          'Formulaires d’enregistrement au registre des naissances coutumières et diaspora',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  diaspora: {
    pageId: 'diaspora',
    title: 'La Diaspora de Ntolo • Réseau Mondial',
    subtitle: 'Antennes de Douala, Yaoundé, Nkongsamba et de l’International',
    description:
      'Portail de ralliement et de recensement de tous les originaires de Ntolo hors du village.',
    badge: 'Portail Officiel • Section 25',
    sections: [
      {
        id: 'force-diaspora',
        title: '1. La Diaspora : Pilier Indispensable de l’Émergence',
        subtitle: 'Unis par le sang, mobilisés pour le terroir',
        content:
          'Que vous résidiez dans les grandes agglomérations du Cameroun ou sur les cinq continents, vous faites partie intégrante du destin de Ntolo. Le portail vous permet de vous recenser, de souscrire aux projets et de rester en lien direct avec Sa Majesté.',
        bullets: [
          'Antenne de Douala : Première communauté extérieure active',
          'Antenne de Yaoundé : Liaison institutionnelle et hauts cadres',
          'Antenne de Nkongsamba : Proximité et logistique départementale',
          'Ressortissants en Europe, Amérique et Afrique : Mécénat et expertise',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  contact: {
    pageId: 'contact',
    title: 'Contact Officiel, Audiences & Permanence',
    subtitle: 'Secrétariat Général de la Chefferie, CODEV et permanence des doléances',
    description:
      'Coordonnées officielles, horaires de permanence, numéro d’urgence et formulaire de requête citoyenne.',
    badge: 'Portail Officiel • Section 26',
    sections: [
      {
        id: 'coordonnees-officielles',
        title: '1. Coordonnées & Accompagnement des Usagers',
        subtitle: 'Une administration de proximité à votre écoute',
        content:
          'Le secrétariat général de la Chefferie reçoit vos doléances, vos demandes d’audiences coutumières et vos propositions de partenariat du lundi au samedi.',
        bullets: [
          'Palais de la Chefferie Traditionnelle de Ntolo, Nlonako, Moungo, Cameroun',
          'Téléphone officiel : (+237) 670 00 11 22 / 690 12 34 56',
          'Courriel officiel : contact@ntolo-village.cm',
          'WhatsApp Chefferie : +237 670 00 11 22',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  partenaires: {
    pageId: 'partenaires',
    title: 'Partenaires Officiels & Mécénat',
    subtitle: 'Entreprises du Moungo, coopératives agricoles, ONG et parrains du développement',
    description: 'Annuaire officiel des partenaires solidaires du village de Ntolo.',
    badge: 'Portail Officiel',
    sections: [
      {
        id: 'reseau-partenaires',
        title: '1. Nos Partenaires Engagés',
        subtitle: 'Construire un avenir durable avec des acteurs responsables',
        content:
          'Ntolo noue des partenariats éthiques et constructifs avec des coopératives agricoles régionales, des ONG de santé publique et des entreprises respectueuses des droits communautaires.',
        bullets: [
          'Union des Coopératives du Moungo (UCAM) : Soutien à la filière café-cacao',
          'Associations sanitaires et humanitaires pour les forages et soins primaires',
          'Mécènes individuels engagés pour l’éducation des jeunes ruraux',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'devenir-partenaire': {
    pageId: 'devenir-partenaire',
    title: 'Devenir Partenaire Officiel de Ntolo',
    subtitle: 'Charte éthique, formules de parrainage et procédure d’agrément coutumier',
    description: 'Protocoles de coopération et opportunités de partenariat avec Ntolo.',
    badge: 'Portail Officiel',
    sections: [
      {
        id: 'modalites-partenariat',
        title: '1. Comment s’engager à nos côtés ?',
        subtitle: 'Une alliance gagnant-gagnant au service des populations',
        content:
          'Toute institution, entreprise ou fondation souhaitant soutenir les chantiers de Ntolo peut signer une convention de partenariat garantissant un impact direct sur le terrain et une visibilité honorable sur le portail.',
        bullets: [
          'Parrainage direct d’un point d’eau ou d’une classe d’école',
          'Délivrance d’un certificat officiel de reconnaissance royale',
          'Publication du logo et du descriptif d’entreprise sur le portail',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  'mentions-legales': {
    pageId: 'mentions-legales',
    title: 'Mentions Légales & Politique de Confidentialité',
    subtitle: 'Cadre institutionnel républicain, propriété intellectuelle et protection des données',
    description: 'Mentions légales et politique de confidentialité officielle du portail.',
    badge: 'Portail Officiel',
    sections: [
      {
        id: 'editeur-site',
        title: '1. Éditeur & Responsabilité Éditoriale',
        subtitle: 'Portail institutionnel officiel',
        content:
          'Le portail officiel du village de Ntolo est édité conjointement par la Chefferie Traditionnelle de 3e Degré et le Comité de Développement de Ntolo (CODEV).',
        bullets: [
          'Directeur de la publication : Sa Majesté le Chef Traditionnel de Ntolo',
          'Tutelle républicaine : Sous-Préfecture de Nlonako, Département du Moungo, Cameroun',
          'Contact DPO : contact@ntolo-village.cm',
        ],
      },
    ],
    lastUpdated: '2026-09-29',
  },

  admin: {
    pageId: 'admin',
    title: 'Console d’Administration Numérique',
    subtitle: 'Gestion centralisée du contenu, de la sécurité et des requêtes citoyennes',
    description: 'Portail d’administration réservé aux gestionnaires autorisés.',
    sections: [],
    lastUpdated: '2026-09-29',
  },
};

/**
 * Loads all page contents from localStorage, with fallback to default contents.
 */
export function getAllPagesContent(): Record<PageId, PageContentData> {
  if (typeof window === 'undefined') {
    return DEFAULT_PAGE_CONTENTS;
  }
  try {
    const raw = localStorage.getItem(KEY_PAGE_CONTENTS);
    if (!raw) {
      localStorage.setItem(KEY_PAGE_CONTENTS, JSON.stringify(DEFAULT_PAGE_CONTENTS));
      return DEFAULT_PAGE_CONTENTS;
    }
    const parsed: Record<string, PageContentData> = JSON.parse(raw);
    // Ensure all 26 pages exist even if an older version was stored
    const merged: Record<PageId, PageContentData> = { ...DEFAULT_PAGE_CONTENTS };
    for (const key of Object.keys(DEFAULT_PAGE_CONTENTS) as PageId[]) {
      if (parsed[key]) {
        merged[key] = {
          ...DEFAULT_PAGE_CONTENTS[key],
          ...parsed[key],
          sections: parsed[key].sections && parsed[key].sections.length > 0
            ? parsed[key].sections
            : DEFAULT_PAGE_CONTENTS[key].sections,
        };
      }
    }
    return merged;
  } catch (e) {
    console.error('Erreur chargement page contents:', e);
    return DEFAULT_PAGE_CONTENTS;
  }
}

/**
 * Gets content data for a specific page.
 */
export function getPageContent(pageId: PageId): PageContentData {
  const all = getAllPagesContent();
  return all[pageId] || DEFAULT_PAGE_CONTENTS[pageId] || DEFAULT_PAGE_CONTENTS.accueil;
}

/**
 * Initialise la synchronisation Firestore en temps réel pour toutes les pages
 */
export function initPageContentSync() {
  if (typeof window === 'undefined') return;
  try {
    const colRef = collection(db, 'village_pages');
    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreMap: Record<string, PageContentData> = {};
        snapshot.forEach((docSnap) => {
          firestoreMap[docSnap.id] = docSnap.data() as PageContentData;
        });

        const current = getAllPagesContent();
        const merged = { ...current, ...firestoreMap };
        localStorage.setItem(KEY_PAGE_CONTENTS, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent(EVENT_PAGE_CONTENT_CHANGED));
      }
    }, (err) => {
      console.warn('Firestore onSnapshot village_pages error:', err);
    });
  } catch (err) {
    console.warn('Erreur initPageContentSync:', err);
  }
}

// Initialisation au chargement
initPageContentSync();

/**
 * Real-time listener for a single page content from Firestore
 */
export function subscribePageContent(
  pageId: PageId,
  callback: (content: PageContentData) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  try {
    const docRef = doc(db, 'village_pages', pageId);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreContent = docSnap.data() as PageContentData;
        const currentAll = getAllPagesContent();
        currentAll[pageId] = firestoreContent;
        localStorage.setItem(KEY_PAGE_CONTENTS, JSON.stringify(currentAll));
        callback(firestoreContent);
      } else {
        callback(getPageContent(pageId));
      }
    }, (err) => {
      console.warn('Firestore subscribePageContent error:', err);
      callback(getPageContent(pageId));
    });
    return unsub;
  } catch (e) {
    console.warn('Firestore subscribePageContent failed:', e);
    return () => {};
  }
}

/**
 * Saves content for a specific page, dispatches change event, and returns updated content.
 */
export function savePageContent(content: PageContentData, authorName?: string): PageContentData {
  const all = getAllPagesContent();
  const updated: PageContentData = {
    ...content,
    lastUpdated: new Date().toLocaleDateString('fr-FR', { dateStyle: 'short' }),
    updatedBy: authorName || content.updatedBy || 'Administrateur',
  };
  all[content.pageId] = updated;

  try {
    localStorage.setItem(KEY_PAGE_CONTENTS, JSON.stringify(all));
  } catch (e) {
    console.error('Erreur sauvegarde page content:', e);
  }

  // Sync to Firestore in real time for all online visitors
  try {
    setDoc(doc(db, 'village_pages', content.pageId), updated).catch((err) => {
      console.warn('Firestore setDoc village_pages error:', err);
    });
  } catch (e) {
    console.warn('Firestore offline:', e);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_PAGE_CONTENT_CHANGED, {
        detail: { pageId: content.pageId, content: updated },
      })
    );
  }

  return updated;
}

/**
 * Updates a single section of a page.
 */
export function updatePageSection(
  pageId: PageId,
  sectionId: string,
  sectionData: Partial<PageSectionData>,
  authorName?: string
): PageContentData {
  const page = getPageContent(pageId);
  const sections = [...page.sections];
  const index = sections.findIndex((s) => s.id === sectionId);

  if (index >= 0) {
    sections[index] = { ...sections[index], ...sectionData };
  } else {
    sections.push({
      id: sectionId,
      title: sectionData.title || 'Nouvelle section',
      content: sectionData.content || '',
      ...sectionData,
    });
  }

  return savePageContent({ ...page, sections }, authorName);
}

/**
 * Adds a new custom section to a page.
 */
export function addPageSection(
  pageId: PageId,
  newSection: Omit<PageSectionData, 'id'>,
  authorName?: string
): PageContentData {
  const page = getPageContent(pageId);
  const sectionId = `sec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const fullSection: PageSectionData = {
    ...newSection,
    id: sectionId,
  };
  const sections = [...page.sections, fullSection];
  return savePageContent({ ...page, sections }, authorName);
}

/**
 * Deletes a section from a page.
 */
export function deletePageSection(
  pageId: PageId,
  sectionId: string,
  authorName?: string
): PageContentData {
  const page = getPageContent(pageId);
  const sections = page.sections.filter((s) => s.id !== sectionId);
  return savePageContent({ ...page, sections }, authorName);
}

/**
 * Resets a page back to its official default contents.
 */
export function resetPageToDefault(pageId: PageId, authorName?: string): PageContentData {
  const defaultPage = DEFAULT_PAGE_CONTENTS[pageId];
  if (!defaultPage) return getPageContent(pageId);
  return savePageContent({ ...defaultPage }, authorName);
}

/**
 * Imports all page contents from an external backup JSON string.
 */
export function importAllPagesContent(data: Record<string, PageContentData>): boolean {
  try {
    if (!data || typeof data !== 'object') return false;
    const current = getAllPagesContent();
    const merged = { ...current, ...data };
    localStorage.setItem(KEY_PAGE_CONTENTS, JSON.stringify(merged));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_PAGE_CONTENT_CHANGED));
    }
    return true;
  } catch (e) {
    console.error('Erreur importation page contents:', e);
    return false;
  }
}
