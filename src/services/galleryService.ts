import { GalleryAlbum, MultimediaItem, PatrimoineItem } from '../types';

export const ALBUMS_LIST: { id: GalleryAlbum; title: string; description: string; icon: string }[] = [
  {
    id: 'Ntolo aujourd’hui',
    title: 'Ntolo aujourd’hui',
    description: 'Instantanés de la vie quotidienne, des quartiers et du dynamisme du village',
    icon: 'Compass',
  },
  {
    id: 'Paysages',
    title: 'Paysages',
    description: 'Massif du Mont Nlonako, cascades, vallées volcaniques et forêts humides',
    icon: 'Mountain',
  },
  {
    id: 'Culture et traditions',
    title: 'Culture et traditions',
    description: 'Us coutumiers, danses patrimoniales, savoirs ancestraux et identité locale',
    icon: 'Sparkles',
  },
  {
    id: 'Cérémonies',
    title: 'Cérémonies',
    description: 'Couronnement, sorties royales des notables, intronisations et fêtes solennelles',
    icon: 'Crown',
  },
  {
    id: 'Jeunesse',
    title: 'Jeunesse',
    description: 'Activités sportives, tournois de football, loisirs et talents émergents',
    icon: 'Users',
  },
  {
    id: 'Éducation',
    title: 'Éducation',
    description: 'École publique de Ntolo, scolarité, remise de prix et projets pédagogiques',
    icon: 'GraduationCap',
  },
  {
    id: 'Agriculture',
    title: 'Agriculture',
    description: 'Plantations de café, cacaoyères, vivriers, récoltes et travaux champêtres',
    icon: 'Wheat',
  },
  {
    id: 'Infrastructures',
    title: 'Infrastructures',
    description: 'Points d’eau, pistes de desserte rurale, constructions et équipements collectifs',
    icon: 'Hammer',
  },
  {
    id: 'Projets',
    title: 'Projets',
    description: 'Chantiers du CODEV, adduction d’eau, forages et réalisations citoyennes',
    icon: 'Target',
  },
  {
    id: 'Personnalités',
    title: 'Personnalités',
    description: 'Patriarches, chefs de famille, personnalités marquantes et bâtisseurs de Ntolo',
    icon: 'Award',
  },
  {
    id: 'Diaspora',
    title: 'Diaspora',
    description: 'Ressortissants de Douala, Yaoundé et de l’international unis pour le terroir',
    icon: 'Globe',
  },
];

const INITIAL_MEDIA_ITEMS: MultimediaItem[] = [
  {
    id: 'med-1',
    title: 'Panorama majestueux des contreforts du Mont Nlonako',
    album: 'Paysages',
    type: 'photo',
    mediaUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Vue aérienne sur les versants verdoyants du Mont Nlonako enveloppant les vallées fertiles du village de Ntolo.',
    date: '2026-08-12',
    location: 'Massif du Mont Nlonako (Arrondissement de Nlonako)',
    author: 'Archives Chefferie de Ntolo',
    viewsCount: 342,
  },
  {
    id: 'med-2',
    title: 'Chutes d’eau et résurgences naturelles de Ntolo',
    album: 'Paysages',
    type: 'photo',
    mediaUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    caption: 'Cascade naturelle traversant les roches basaltiques, source d’eau pure et sanctuaire de biodiversité.',
    date: '2026-07-20',
    location: 'Zone forestière de Ntolo',
    author: 'Direction Technique CODEV',
    viewsCount: 285,
  },
  {
    id: 'med-3',
    title: 'Mobilier coutumier sculpté et symboles de l’autorité traditionnelle',
    album: 'Culture et traditions',
    type: 'photo',
    mediaUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Tabouret royal et sculptures patrimoniales reflétant la dignité séculaire et l’art des ancêtres du Moungo.',
    date: '2026-06-15',
    location: 'Palais de la Chefferie de Ntolo',
    author: 'Secrétariat Général de la Chefferie',
    viewsCount: 410,
  },
  {
    id: 'med-4',
    title: 'La vie paisible au cœur du village au lever du jour',
    album: 'Ntolo aujourd’hui',
    type: 'photo',
    mediaUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Les toitures du village s’éveillant dans la brume matinale, prémices d’une journée de labeur et de fraternité.',
    date: '2026-09-02',
    location: 'Place centrale du village',
    author: '[À renseigner : Photographe local]',
    viewsCount: 198,
  },
  {
    id: 'med-5',
    title: 'Capsule Vidéo : « Paroles des Patriarches & Mémoire de Ntolo »',
    album: 'Culture et traditions',
    type: 'video',
    mediaUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '06:45',
    caption: 'Témoignage oral des anciens sur la fondation coutumière, les pactes d’alliance et la protection des terres.',
    date: '2026-05-18',
    location: 'Esplanade de la Chefferie',
    author: 'Commission Communication & Archives',
    viewsCount: 520,
  },
  {
    id: 'med-6',
    title: 'Journée citoyenne de Salongo : Désherbage des pistes rurales',
    album: 'Infrastructures',
    type: 'photo',
    mediaUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    caption: 'Mobilisation communautaire pour préserver la praticabilité de l’axe d’évacuation agricole avant les grandes pluies.',
    date: '2026-09-12',
    location: 'Piste principale d’accès Ntolo',
    author: 'Comité de Développement (CODEV)',
    viewsCount: 260,
  },
  {
    id: 'med-7',
    title: 'Vidéo Reportage : « L’Eau, source de vie pour Ntolo »',
    album: 'Projets',
    type: 'video',
    mediaUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '04:12',
    caption: 'Présentation des études hydrogéologiques et du futur réseau d’adduction d’eau potable soutenu par la diaspora.',
    date: '2026-08-30',
    location: 'Point de captage de source',
    author: 'Comité Technique Eau & Assainissement',
    viewsCount: 390,
  },
  {
    id: 'med-8',
    title: 'Travaux de récolte et séchage du café arabica et robusta',
    album: 'Agriculture',
    type: 'photo',
    mediaUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Les planteurs de Ntolo trient minutieusement les cerises de café mûres récoltées sur les flancs du volcan éteint.',
    date: '2026-02-14',
    location: 'Plantations du haut versant',
    author: 'Coopérative Agricole Locale [À renseigner]',
    viewsCount: 215,
  },
  {
    id: 'med-9',
    title: 'Élèves de l’École Publique de Ntolo lors de la levée des couleurs',
    album: 'Éducation',
    type: 'photo',
    mediaUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Rassemblement civique du lundi matin dans la cour d’école : fierté républicaine et soif d’apprentissage des enfants.',
    date: '2026-09-08',
    location: 'Cour de l’École Publique de Ntolo',
    author: 'Direction de l’École Publique',
    viewsCount: 310,
  },
  {
    id: 'med-10',
    title: 'Tournoi Fraternité Inter-Quartiers de Football',
    album: 'Jeunesse',
    type: 'photo',
    mediaUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Moment de communion sportive et d’amitié unissant la jeunesse résidente et les jeunes vacanciers.',
    date: '2026-08-25',
    location: 'Terrain de sport de Ntolo',
    author: 'Collectif Jeunesse de Ntolo',
    viewsCount: 280,
  },
  {
    id: 'med-11',
    title: 'Sortie solennelle de Sa Majesté et du Conseil des Notables',
    album: 'Cérémonies',
    type: 'photo',
    mediaUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Rite traditionnel de bénédiction de la communauté lors de la fête coutumière annuelle de Ntolo.',
    date: '2025-12-18',
    location: 'Cour d’honneur du Palais Royal',
    author: 'Chancellerie Royale de Ntolo',
    viewsCount: 460,
  },
  {
    id: 'med-12',
    title: 'Assemblée Générale des Ressortissants de Ntolo à Douala',
    album: 'Diaspora',
    type: 'photo',
    mediaUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    caption: 'Réunion de restitution et collecte de fonds de solidarité pour le forage d’eau potable du village.',
    date: '2026-07-05',
    location: 'Foyer communautaire de Douala',
    author: 'Bureau de l’Antenne Diaspora Douala',
    viewsCount: 305,
  },
  {
    id: 'med-13',
    title: 'Hommage aux Patriarches et figures fondatrices du terroir',
    album: 'Personnalités',
    type: 'photo',
    mediaUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    caption: 'Portrait d’honneur des doyens qui ont façonné l’histoire et sauvegardé l’intégrité du village.',
    date: '2026-01-10',
    location: 'Salle d’honneur du Palais',
    author: 'Archives dynastiques [À renseigner]',
    viewsCount: 240,
  }
];

const INITIAL_PATRIMOINE_ITEMS: PatrimoineItem[] = [
  {
    id: 'pat-1',
    title: 'Site Sacré du Mont Nlonako & Forêt Pluviale d’Altitude',
    category: 'Lieu',
    location: 'Massif du Mont Nlonako, au-dessus du village',
    custodian: 'Conseil des Sages & Chefferie de Ntolo',
    status: 'Inventaire officiel coutumier [À renseigner]',
    imageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    description: 'Montagne emblématique qui surplombe Ntolo. Ce sanctuaire naturel abrite des sources pérennes, des plantes médicinales traditionnelles et une biodiversité reconnue à l’international.',
    significance: 'Symbole tutélaire de fertilité, de protection spirituelle et d’identité territoriale pour toute la communauté.',
  },
  {
    id: 'pat-2',
    title: 'Esplanade Royale & Cour d’Honneur de la Chefferie',
    category: 'Lieu',
    location: 'Centre névralgique de Ntolo',
    custodian: 'Sa Majesté le Chef Traditionnel de Ntolo',
    status: 'Répertoire coutumier homologué',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Espace sacré où se tiennent les assemblées plénières, les audiences coutumières, les jugements sous l’autorité des notables et les rites royaux de ralliement.',
    significance: 'Lieu de convergence civique, d’autorité coutumière de 3e degré et de délibération collective.',
  },
  {
    id: 'pat-3',
    title: 'L’Arbre à Palabres Ancestral',
    category: 'Lieu',
    location: 'Entrée historique du village [À renseigner]',
    custodian: 'Assemblée des Notables & Aînés',
    status: 'Arbre protégé par la coutume',
    imageUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    description: 'Arbre centenaire témoin des grands serments de concorde, des arbitrages de voisinage et de l’accueil traditionnel des délégations des villages frères.',
    significance: 'Symbole vivant de la justice participative, de l’écoute mutuelle et de la sagesse des patriarches.',
  },
  {
    id: 'pat-4',
    title: 'Trône Coutumier & Tabouret Royal en Bois Sculpté',
    category: 'Objet',
    location: 'Palais de la Chefferie de Ntolo',
    custodian: 'Dynastie régnante de Ntolo',
    status: 'Insigne royal inaliénable',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Meuble d’apparat façonné à la main par les maîtres sculpteurs du terroir, orné de motifs zoomorphes et géométriques incarnant force, clairvoyance et équité.',
    significance: 'Siège officiel de l’autorité coutumière incarnant la pérennité du pouvoir transmis de génération en génération.',
  },
  {
    id: 'pat-5',
    title: 'Tambour d’Appel Coutumier (Nkul / Tam-tam parlant)',
    category: 'Objet',
    location: 'Chefferie de Ntolo',
    custodian: 'Notables initiés aux codes sonores',
    status: 'Instrument traditionnel protégé [À renseigner]',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Grand tambour en bois évidé capable d’émettre des messages codés perceptibles à plusieurs kilomètres pour convoquer les Salongo, annoncer les deuils ou sonner l’alerte.',
    significance: 'Vecteur historique de télécommunication rurale et moyen ancestral de mobilisation citoyenne.',
  },
  {
    id: 'pat-6',
    title: 'Parures, Coiffes et Étoffes Cérémonielles des Dignitaires',
    category: 'Objet',
    location: 'Trésor de la Chefferie',
    custodian: 'Gardiens des ornements royaux',
    status: 'En cours de catalogage [À renseigner]',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Ensemble de tissus traditionnels, cannes ouvragées et colliers de perles réservés aux cérémonies solennelles et aux intronisations royales.',
    significance: 'Témoignage du raffinement vestimentaire et des hiérarchies statutaires de la tradition locale.',
  },
  {
    id: 'pat-7',
    title: 'Rites Agraires de Bénédiction des Terres & des Semences',
    category: 'Tradition',
    location: 'Parcelles agricoles et cours villageoises',
    custodian: 'Collège des Doyens & Planteurs expérimentés',
    status: 'Tradition orale vivante [À renseigner]',
    imageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    description: 'Prières coutumières adressées aux ancêtres et à la terre avant les grands défrichements et les semailles, appelant à l’abondance des récoltes de cacao, de café et de vivriers.',
    significance: 'Lien spirituel indéfectible entre l’agriculteur de Ntolo et sa terre nourricière volcanique.',
  },
  {
    id: 'pat-8',
    title: 'Danses Rituelles & Chants Polyphoniques du Moungo',
    category: 'Tradition',
    location: 'Village de Ntolo',
    custodian: 'Troupe culturelle villageoise',
    status: 'Répertoire immatériel communautaire',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Chants d’encouragement aux travaux communautaires, rythmes cadencés exécutés lors des sorties de deuil et réjouissances populaires célébrant la vie.',
    significance: 'Transmission vivante de la mémoire orale, de la cohésion sociale et de l’allégresse communautaire.',
  },
  {
    id: 'pat-9',
    title: 'Savoir-Faire Artisanal de Vannerie & de Travail du Bois',
    category: 'Tradition',
    location: 'Quartiers du village',
    custodian: 'Maîtres artisans de Ntolo [À renseigner]',
    status: 'Savoir-faire à revitaliser',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Techniques de tressage des fibres végétales locales pour confectionner paniers de récolte, hottes d’évacuation et mortiers en bois dur pour piler le plantain et le manioc.',
    significance: 'Autosuffisance matérielle et ingéniosité technique propre aux familles de Ntolo.',
  },
  {
    id: 'pat-10',
    title: 'Le Salongo : Journée de Solidarité & de Travaux Communautaires',
    category: 'Événement',
    location: 'Axes et édifices d’intérêt collectif',
    custodian: 'Chefferie & Comité de Développement (CODEV)',
    status: 'Institution citoyenne coutumière',
    imageUrl: '/src/assets/images/gallery_nature_moungo_1790154831461.jpg',
    description: 'Mobilisation mensuelle ou périodique où tous les bras valides s’unissent pour désherber les pistes, entretenir les points d’eau et assainir les espaces partagés.',
    significance: 'Incarnation vivante de l’éthique de responsabilité solidaire : « Le village se construit par ses propres enfants ».',
  },
  {
    id: 'pat-11',
    title: 'Grande Fête Coutumière Annuelle & Célébration Fraternelle',
    category: 'Événement',
    location: 'Palais Royal et place du village',
    custodian: 'Sa Majesté et le Comité d’Organisation',
    status: 'Événement phare périodique [À renseigner]',
    imageUrl: '/src/assets/images/village_tradition_craft_1790154848784.jpg',
    description: 'Retrouvailles solennelles réunissant les populations locales, les autorités administratives, les dignitaires voisins et la diaspora pour dresser le bilan et célébrer l’unité.',
    significance: 'Moment suprême de communion, de réconciliation et d’affirmation de la fierté identitaire de Ntolo.',
  },
  {
    id: 'pat-12',
    title: 'Rassemblement Annuel de la Diaspora & Congrès du Terroir',
    category: 'Événement',
    location: 'Ntolo / Villes relais (Douala, Yaoundé)',
    custodian: 'Fédération des Associations de Ressortissants',
    status: 'Cadre officiel de concertation',
    imageUrl: '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
    description: 'Session annuelle d’orientation stratégique pour évaluer les chantiers d’intérêt public (eau potable, école, santé) et mutualiser les apports financiers et techniques.',
    significance: 'Passerelle indispensable entre l’attachement au terroir natal et les capacités d’investissement de l’extérieur.',
  }
];

const STORAGE_KEY_MEDIA = 'ntolo_gallery_media_v2';
const STORAGE_KEY_PATRIMOINE = 'ntolo_gallery_patrimoine_v2';
const EVENT_GALLERY_UPDATED = 'ntolo_gallery_updated';

export function getStoredMedia(): MultimediaItem[] {
  if (typeof window === 'undefined') return INITIAL_MEDIA_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEDIA);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(INITIAL_MEDIA_ITEMS));
      return INITIAL_MEDIA_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(INITIAL_MEDIA_ITEMS));
      return INITIAL_MEDIA_ITEMS;
    }
    return parsed;
  } catch (e) {
    console.error('Erreur lecture media gallery:', e);
    return INITIAL_MEDIA_ITEMS;
  }
}

export function saveMediaItem(item: MultimediaItem): MultimediaItem[] {
  const current = getStoredMedia();
  const index = current.findIndex((m) => m.id === item.id);
  let updated: MultimediaItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_GALLERY_UPDATED));
  return updated;
}

export function deleteMediaItem(id: string): MultimediaItem[] {
  const current = getStoredMedia();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_GALLERY_UPDATED));
  return updated;
}

export function getStoredPatrimoine(): PatrimoineItem[] {
  if (typeof window === 'undefined') return INITIAL_PATRIMOINE_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PATRIMOINE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PATRIMOINE, JSON.stringify(INITIAL_PATRIMOINE_ITEMS));
      return INITIAL_PATRIMOINE_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_PATRIMOINE, JSON.stringify(INITIAL_PATRIMOINE_ITEMS));
      return INITIAL_PATRIMOINE_ITEMS;
    }
    return parsed;
  } catch (e) {
    console.error('Erreur lecture patrimoine:', e);
    return INITIAL_PATRIMOINE_ITEMS;
  }
}

export function savePatrimoineItem(item: PatrimoineItem): PatrimoineItem[] {
  const current = getStoredPatrimoine();
  const index = current.findIndex((p) => p.id === item.id);
  let updated: PatrimoineItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEY_PATRIMOINE, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_GALLERY_UPDATED));
  return updated;
}

export function deletePatrimoineItem(id: string): PatrimoineItem[] {
  const current = getStoredPatrimoine();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY_PATRIMOINE, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_GALLERY_UPDATED));
  return updated;
}

export function resetGalleryToDefault() {
  localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(INITIAL_MEDIA_ITEMS));
  localStorage.setItem(STORAGE_KEY_PATRIMOINE, JSON.stringify(INITIAL_PATRIMOINE_ITEMS));
  window.dispatchEvent(new CustomEvent(EVENT_GALLERY_UPDATED));
}
