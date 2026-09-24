import { PublicationItem, ArticleCategory } from '../types';

const STORAGE_KEY = 'ntolo_official_publications_v1';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'Vie du village',
  'Développement',
  'Culture',
  'Éducation',
  'Santé',
  'Agriculture',
  'Jeunesse',
  'Diaspora',
  'Événements',
  'Annonces',
];

export const INITIAL_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'actu-eau-potable',
    title: 'Lancement officiel des travaux d’adduction d’eau potable par gravité',
    slug: 'lancement-travaux-eau-potable',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80',
    date: '23 Septembre 2026',
    author: 'Comité de Développement de Ntolo (CODEV)',
    authorRole: 'Commission Infrastructures & Hydraulique',
    category: 'Développement',
    summary: 'Le terrassement du bassin de captage sur les pentes orientales du Mont Nlonako a débuté sous la supervision des ingénieurs communaux et des notables.',
    content: [
      'Ce mercredi 23 septembre 2026 marque un tournant historique pour les populations de Ntolo. Réunis au lieu-dit Carrefour Chefferie, les membres du bureau exécutif du CODEV, accompagnés des représentants de la mairie de Nlonako et d’une délégation du Génie Rural, ont procédé au coup d’envoi officiel des travaux d’adduction d’eau potable par gravité.',
      'Le projet, estimé à 18 500 000 FCFA dans sa première phase, consiste en la capture sécurisée d’une source pérenne de haute montagne protégée de toute pollution agricole, la construction d’une chambre de décantation, l’acheminement par canalisation PEHD sur 3,2 kilomètres et l’érection d’un réservoir de stockage de 10 000 litres surplombant le village.',
      'Quatre bornes-fontaines publiques seront installées dans les quartiers les plus denses (Quartier Chefferie, Quartier École, Quartier Bas-Village et Carrefour Mission). La main-d’œuvre non qualifiée est assurée par les jeunes volontaires du village dans le cadre des journées communautaires de salongo.',
      'Le président du CODEV a tenu à saluer la contribution financière décisive des antennes de la diaspora de Douala et Yaoundé, dont les premiers virements ont permis l’acquisition immédiate de la tuyauterie et des sacs de ciment étanche.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [
      {
        id: 'doc-eau-devis',
        title: 'Bordereau des prix unitaires et devis descriptif - Projet Eau Ntolo',
        fileSize: '1.4 Mo',
        fileType: 'PDF',
      },
      {
        id: 'doc-eau-plan',
        title: 'Plan technique d’implantation du réservoir et tracé du réseau',
        fileSize: '3.8 Mo',
        fileType: 'PDF',
      },
    ],
    isUrgent: true,
    published: true,
    viewsCount: 342,
    readTimeMinutes: 4,
  },
  {
    id: 'actu-rentree-scolaire',
    title: 'Campagne d’excellence scolaire et don de tables-bancs à l’École Publique',
    slug: 'campagne-excellence-scolaire-don-mobilier',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    date: '18 Septembre 2026',
    author: 'Association des Femmes Dynamiques & Diaspora',
    authorRole: 'Commission Éducation & Solidarité',
    category: 'Éducation',
    summary: 'Remise solennelle de 45 tables-bancs neufs et kits de fournitures didactiques aux écoliers les plus méritants pour la rentrée 2026-2027.',
    content: [
      'La cour de l’École Publique de Ntolo a vibré d’enthousiasme ce samedi lors de la cérémonie de remise des dons scolaires organisée conjointement par l’Association des Femmes de Ntolo et l’antenne diaspora.',
      'Face au déficit chronique de places assises relevé lors du dernier conseil d’école, 45 tables-bancs à trois places fabriqués par les artisans menuisiers locaux ont été officiellement réceptionnés par le Directeur de l’établissement en présence des parents d’élèves.',
      'Par ailleurs, 120 kits composés de cahiers, stylos, règles, boîtes de mathématiques et cartables ont été distribués aux élèves orphelins et aux lauréats des examens officiels (CEP et Concours d’entrée en 6e).',
      'Sa Majesté le Chef Traditionnel a rappelé que l’instruction de la jeunesse constitue le premier bouclier contre la précarité et a exhorté les parents à maintenir une assiduité exemplaire tout au long de l’année scolaire.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [
      {
        id: 'doc-palmares-ecole',
        title: 'Tableau d’honneur et palmarès des examens officiels 2025-2026',
        fileSize: '820 Ko',
        fileType: 'PDF',
      },
    ],
    published: true,
    viewsCount: 215,
    readTimeMinutes: 3,
  },
  {
    id: 'actu-recolte-cacao',
    title: 'Ouverture de la grande campagne cacaoyère et marché périodique groupé',
    slug: 'ouverture-campagne-cacaoyere-marche-groupe',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    date: '12 Septembre 2026',
    author: 'Coopérative des Planteurs du Mont Nlonako (GIC Agro-Ntolo)',
    authorRole: 'Secrétariat Commercial',
    category: 'Agriculture',
    summary: 'Mise en place d’un séchage communautaire certifié et organisation de ventes groupées pour obtenir les meilleurs cours du marché international.',
    content: [
      'Avec le retour des éclaircies sur les versants de Ntolo, les planteurs s’activent dans les cacaoyères pour la récolte des cabosses de saison principale.',
      'Afin d’éviter les braderies individuelles aux acheteurs ambulants bord-champ, le GIC des Planteurs de Ntolo a inauguré une aire de séchage solaire sur claies surélevées et un magasin de stockage ventilé.',
      'Grâce à la standardisation de la fermentation en caisses de bois de cinq jours, le cacao de Ntolo bénéficie d’une note aromatique supérieure recherchée par les exportateurs de Nkongsamba et Douala.',
      'La première session d’enchères groupées sous la supervision de la délégation départementale du Commerce se tiendra sur l’esplanade de la Chefferie le 5 octobre prochain.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [
      {
        id: 'doc-grille-prix-cacao',
        title: 'Grille indicative des prix du cacao et barème qualité MINCOMMERCE',
        fileSize: '650 Ko',
        fileType: 'PDF',
      },
    ],
    published: true,
    viewsCount: 189,
    readTimeMinutes: 3,
  },
  {
    id: 'actu-sante-campagne',
    title: 'Campagne de dépistage et de vaccination infantile au Poste de Santé',
    slug: 'campagne-depistage-vaccination-sante',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    date: '05 Septembre 2026',
    author: 'Équipe Mobile du District de Santé de Nlonako',
    authorRole: 'Surveillance Épidémiologique',
    category: 'Santé',
    summary: 'Journées gratuites de vaccination infantile (PEV), déparasitage systématique et consultation prénatale pour les femmes du terroir.',
    content: [
      'Le Poste de Santé de Ntolo accueillera du 28 au 30 septembre 2026 une mission médicale avancée du District Sanitaire de Nlonako.',
      'Au programme de cette intervention soutenue par le Ministère de la Santé Publique : administration des doses de rappel du Programme Élargi de Vaccination (rougeole, poliomyélite, fièvre jaune), distribution gratuite de moustiquaires imprégnées à longue durée d’action et séances de sensibilisation à l’hygiène de l’eau.',
      'Les mères de famille sont priées de se munir impérativement du carnet de santé de chaque enfant. Une permanence spéciale de consultations prénatales sera assurée par une sage-femme diplômée.',
    ],
    gallery: [],
    attachedDocuments: [
      {
        id: 'doc-calendrier-vaccinal',
        title: 'Calendrier officiel des vaccinations infantiles 0-5 ans - MINSANTE',
        fileSize: '410 Ko',
        fileType: 'PDF',
      },
    ],
    isUrgent: true,
    published: true,
    viewsCount: 278,
    readTimeMinutes: 3,
  },
  {
    id: 'actu-ag-diaspora',
    title: 'Assemblée Générale Annuelle et Convention des Ressortissants de Ntolo',
    slug: 'assemblee-generale-annuelle-convention-ressortissants',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    date: '28 Août 2026',
    author: 'Bureau de Coordination de la Diaspora',
    authorRole: 'Antennes Douala & Yaoundé',
    category: 'Diaspora',
    summary: 'Rassemblement solennel au Palais de la Chefferie pour valider le plan de développement triennal 2027-2029 et renouveler les cotisations statutaires.',
    content: [
      'La Chefferie royale de Ntolo invite solennellement l’ensemble des élites, cadres d’entreprises, étudiants et travailleurs originaires du village résidant au Cameroun ou à l’étranger à prendre part à la grande Convention Annuelle.',
      'Les assises débuteront par un culte œcuménique pour la paix, suivi de la présentation du rapport moral et financier du CODEV par les commissaires aux comptes.',
      'Une table ronde sur l’autonomisation économique des femmes et la réhabilitation de la case de passage communautaire sera animée par les doyens de la diaspora.',
      'Un banquet traditionnel aux mets du terroir (koki, mets de pistache, plantain mûr et vin de palme doux) clôturera les travaux au coucher du soleil.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [
      {
        id: 'doc-ordre-du-jour-ag',
        title: 'Ordre du jour officiel et convocation à l’Assemblée Générale',
        fileSize: '320 Ko',
        fileType: 'PDF',
      },
    ],
    published: true,
    viewsCount: 412,
    readTimeMinutes: 4,
  },
  {
    id: 'actu-communique-salongo',
    title: 'Avis officiel : Journée citoyenne de salongo et curage des buses sur l’axe Nlonako-Ntolo',
    slug: 'avis-journee-citoyenne-salongo-curage-buses',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    date: '20 Septembre 2026',
    author: 'Secrétariat Général de la Chefferie de Ntolo',
    authorRole: 'Cabinet du Chef Supérieur',
    category: 'Annonces',
    summary: 'Mobilisation générale de tous les bras valides ce samedi dès 06h30 pour sécuriser la piste rurale avant les fortes pluies d’octobre.',
    content: [
      'Il est porté à la connaissance de l’ensemble des chefs de concession, des jeunes et des transporteurs par moto-taxi que la journée communautaire obligatoire de salongo est fixée au samedi 26 septembre 2026.',
      'Les équipes se scinderont en trois pelotons de travail : le premier au carrefour d’accès pour le désherbage des talus, le second à la descente du ruisseau pour le débouchage des buses métalliques, et le troisième pour l’empierrement des ornières critiques.',
      'Chaque participant est invité à se munir de ses outils aratoires (machettes, pelles, pioches, brouettes). La présence des notables responsables de quartiers sera contrôlée.',
      'La circulation motorisée sera interrompue entre 07h00 et 11h30 pour permettre le travail en toute sécurité.',
    ],
    gallery: [],
    attachedDocuments: [
      {
        id: 'doc-arrete-salongo',
        title: 'Communiqué royal n° 04/CRN/2026 relatif aux travaux communautaires',
        fileSize: '290 Ko',
        fileType: 'PDF',
      },
    ],
    isUrgent: true,
    published: true,
    viewsCount: 512,
    readTimeMinutes: 2,
  },
  {
    id: 'actu-tournoi-jeunesse',
    title: 'Clôture du Tournoi Inter-Quartiers de Football et danses folkloriques',
    slug: 'cloture-tournoi-inter-quartiers-football-danses',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    date: '10 Août 2026',
    author: 'Comité d’Animation Sportive & Culturelle de la Jeunesse',
    authorRole: 'Présidence du Comité des Fêtes',
    category: 'Jeunesse',
    summary: 'Victoire de l’équipe de la Chefferie en finale devant plus de 600 spectateurs réunis sur le stade scolaire de Ntolo.',
    content: [
      'Dans une ferveur populaire inoubliable, la 14e édition de la Coupe de la Fraternité de Ntolo s’est achevée ce dimanche.',
      'La finale a opposé les Éléphants du Haut-Village aux Panthères de la Chefferie, qui se sont imposées sur le score serré de 2 buts à 1. Les trophées, maillots et ballons ont été offerts par le parrain de l’édition, fils du terroir résidant en Europe.',
      'À la mi-temps, les spectateurs ont admiré la démonstration rythmée du groupe des danseuses traditionnelles arborant les pagnes coutumiers aux couleurs de la terre volcanique.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [],
    published: true,
    viewsCount: 388,
    readTimeMinutes: 3,
  },
  {
    id: 'actu-festival-coutumier',
    title: 'Célébration des prémices agricoles et rites de bénédiction des semences',
    slug: 'celebration-premices-agricoles-rites-benediction',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    date: '15 Juillet 2026',
    author: 'Conseil des Notables de Ntolo',
    authorRole: 'Collège des Sages Coutumiers',
    category: 'Culture',
    summary: 'Rituels ancestraux sous l’Arbre Sacré de la Chefferie pour remercier les ancêtres et consacrer l’abondance des récoltes.',
    content: [
      'Aux premières lueurs de l’aube, les patriarches détenteurs des secrets ancestraux se sont réunis dans le sanctuaire royal de Ntolo pour perpétuer le rite millénaire des semences.',
      'Des gerbes de caféiers en fleur, des épis de maïs nouveau et des calebasses d’eau pure prélevée à la tête de source du Mont Nlonako ont été présentés aux Notables pour recevoir les paroles de protection coutumière.',
      'Ce moment sacré symbolise le pacte d’alliance indestructible entre les habitants de Ntolo, leur sol nourricier et la mémoire vénérée des ancêtres fondateurs.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [],
    published: true,
    viewsCount: 304,
    readTimeMinutes: 3,
  },
  {
    id: 'actu-necrologie-doyen',
    title: 'Avis de décès et programme des obsèques de Papa Jean-Baptiste Ndong',
    slug: 'avis-deces-obseques-jean-baptiste-ndong',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    date: '21 Septembre 2026',
    author: 'La Grande Famille Ndong & La Chefferie',
    authorRole: 'Avis Nécrologique Officiel',
    category: 'Annonces',
    summary: 'Rappel à Dieu du doyen des planteurs de café et ancien conseiller coutumier dans sa 89e année.',
    content: [
      'Sa Majesté le Chef Traditionnel de Ntolo, le Conseil des Notables et la grande famille Ndong ont la profonde douleur d’annoncer à la communauté villageoise et aux amis du terroir le décès de Papa Jean-Baptiste Ndong, survenu le 19 septembre 2026 des suites d’une courte maladie.',
      'Le programme des obsèques prévoit la veillée de prières le jeudi 1er octobre au domicile familial à Ntolo, la levée de corps à la morgue de l’Hôpital de Nkongsamba le vendredi matin, suivie de la veillée traditionnelle avec veilleurs coutumiers.',
      'L’inhumation aura lieu le samedi 3 octobre 2026 à 14h00 dans le caveau familial à Ntolo, dans la stricte dignité de nos traditions.',
    ],
    gallery: [],
    attachedDocuments: [
      {
        id: 'doc-faire-part-deces',
        title: 'Faire-part officiel et programme détaillé des obsèques',
        fileSize: '350 Ko',
        fileType: 'PDF',
      },
    ],
    isUrgent: true,
    published: true,
    viewsCount: 620,
    readTimeMinutes: 2,
  },
  {
    id: 'actu-foire-nlonako',
    title: 'Ntolo représenté avec brio à la Foire Agropastorale de Nlonako',
    slug: 'ntolo-represente-foire-agropastorale-nlonako',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    date: '14 Août 2026',
    author: 'Délégation des Éleveurs & Artisans de Ntolo',
    authorRole: 'Représentation Communale',
    category: 'Vie du village',
    summary: 'Le stand de Ntolo a remporté le premier prix départemental pour son miel de forêt pure et ses régimes géants de plantain bâtard.',
    content: [
      'Pendant trois jours au chef-lieu d’arrondissement de Nlonako, la foire agropastorale a mis en compétition les richesses des différents terroirs du Moungo.',
      'Le stand de Ntolo, aménagé avec soin par les jeunes et les mamans du village, a suscité l’admiration générale des visiteurs et des autorités préfectorales.',
      'Le miel sauvage récolté en lisière de forêt du Mont Nlonako a reçu la médaille d’or de la qualité naturelle, tandis que deux porcs reproducteurs élevés à Ntolo ont été primés par le jury du MINEPIA.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    ],
    attachedDocuments: [],
    published: true,
    viewsCount: 245,
    readTimeMinutes: 3,
  },
];

// Helper functions for localStorage persistence
export function getStoredPublications(): PublicationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PUBLICATIONS));
      return INITIAL_PUBLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PUBLICATIONS));
      return INITIAL_PUBLICATIONS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading publications from localStorage:', err);
    return INITIAL_PUBLICATIONS;
  }
}

export function saveStoredPublications(items: PublicationItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Trigger custom event for reactive updates in other components
    window.dispatchEvent(new Event('ntolo_publications_updated'));
  } catch (err) {
    console.error('Error saving publications to localStorage:', err);
  }
}

export function getPublicationById(id: string): PublicationItem | undefined {
  const all = getStoredPublications();
  return all.find((p) => p.id === id);
}

export function upsertPublication(item: PublicationItem): void {
  const all = getStoredPublications();
  const existingIdx = all.findIndex((p) => p.id === item.id);
  if (existingIdx >= 0) {
    all[existingIdx] = item;
  } else {
    all.unshift(item);
  }
  saveStoredPublications(all);
}

export const savePublication = upsertPublication;

export function deletePublication(id: string): void {
  const all = getStoredPublications();
  const filtered = all.filter((p) => p.id !== id);
  saveStoredPublications(filtered);
}

export function togglePublicationPublished(id: string): PublicationItem[] {
  const all = getStoredPublications();
  const item = all.find((p) => p.id === id);
  if (item) {
    item.published = !item.published;
    saveStoredPublications(all);
  }
  return all;
}

export function incrementPublicationViews(id: string): void {
  const all = getStoredPublications();
  const item = all.find((p) => p.id === id);
  if (item) {
    item.viewsCount = (item.viewsCount || 0) + 1;
    saveStoredPublications(all);
  }
}

export function resetPublicationsToDefault(): void {
  saveStoredPublications(INITIAL_PUBLICATIONS);
}

export function exportPublicationsAsJSON(): string {
  const all = getStoredPublications();
  return JSON.stringify(all, null, 2);
}

export function importPublicationsFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed) && parsed.length > 0) {
      saveStoredPublications(parsed);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to import publications JSON:', err);
    return false;
  }
}
