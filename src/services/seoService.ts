/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';

interface PageSeoData {
  title: string;
  description: string;
  path: string;
  category: string;
  image?: string;
  schemaType?: string;
}

const BASE_URL = 'https://ntolo-village.cm';
const DEFAULT_IMAGE = `${BASE_URL}/src/assets/images/hero_ntolo_moungo_1790154817063.jpg`;

export const SEO_DATA_BY_PAGE: Record<PageId, PageSeoData> = {
  accueil: {
    title: 'Village de NTOLO | Portail Numérique Officiel (Moungo, Cameroun)',
    description: 'Portail officiel du village de Ntolo (Nlonako, Moungo, Littoral). Gouvernance coutumière, projets participatifs, actualités et services citoyens.',
    path: '/',
    category: 'Portail Officiel',
    schemaType: 'GovernmentOrganization',
  },
  presentation: {
    title: 'Présentation de Ntolo | Identité & Terroir du Moungo',
    description: 'Fiche d’identité complète du village de Ntolo au pied du Mont Nlonako : cadre territorial, statut administratif coutumier et vocation économique.',
    path: '/presentation',
    category: 'Terroir & Identité',
  },
  histoire: {
    title: 'Histoire de Ntolo | Origines, Dynastie & Mémoire Ancestrale',
    description: 'Récit des origines du village de Ntolo, généalogie des chefs traditionnels de 3e degré, pactes ancestraux et hauts faits historiques du Moungo.',
    path: '/histoire',
    category: 'Patrimoine Historique',
  },
  geographie: {
    title: 'Géographie & Situation de Ntolo | Bassin du Mont Nlonako',
    description: 'Situation géographique de Ntolo dans l’Arrondissement de Nlonako (Moungo) : relief, climat montagnard tropical, hydrographie et cartes.',
    path: '/geographie',
    category: 'Géographie & Climat',
  },
  chefferie: {
    title: 'Chefferie Traditionnelle de Ntolo | Notables & Cour Royale',
    description: 'Organisation coutumière de la Chefferie de 3e degré de Ntolo : Sa Majesté le Chef, Conseil des Notables, justice traditionnelle et audiences.',
    path: '/chefferie',
    category: 'Gouvernance Coutumière',
  },
  'organisation-traditionnelle': {
    title: 'Organisation Coutumière de Ntolo | Rites & Dignitaires',
    description: 'Structure des lignées familiales, rôles des sociétés secrètes coutumières, transmission des valeurs et cohésion sociale au village de Ntolo.',
    path: '/organisation-traditionnelle',
    category: 'Gouvernance Coutumière',
  },
  'organisation-administrative': {
    title: 'Administration Républicaine & CODEV | Ntolo, Nlonako',
    description: 'Tutelle de la Sous-Préfecture de Nlonako, Mairie, services déconcentrés de l’État et Comité de Développement du Village de Ntolo (CODEV).',
    path: '/organisation-administrative',
    category: 'Administration',
  },
  population: {
    title: 'Population & Quartiers de Ntolo | Démographie & Vivre-Ensemble',
    description: 'Répartition démographique, quartiers historiques de Ntolo, jeunesse dynamique, rôle des femmes et intégration harmonieuse des communautés.',
    path: '/population',
    category: 'Démographie & Société',
  },
  culture: {
    title: 'Culture & Traditions de Ntolo | Danses, Rites & Gastronomie',
    description: 'Patrimoine culturel vivant de Ntolo : danses initiatiques, musique traditionnelle du Moungo, gastronomie locale et festivités annuelles.',
    path: '/culture',
    category: 'Culture & Arts',
  },
  'langues-patrimoine': {
    title: 'Langues & Trésors Patrimoniaux | Ntolo, Nlonako',
    description: 'Lexique vernaculaire usuel, proverbes des sages, sanctuaires sacrés et préservation du patrimoine linguistique ancestral de Ntolo.',
    path: '/langues-patrimoine',
    category: 'Linguistique & Patrimoine',
  },
  education: {
    title: 'Éducation & Écoles à Ntolo | Avenir de la Jeunesse',
    description: 'École Publique de Ntolo, encadrement scolaire des enfants, bourses d’excellence de la diaspora et équipements pédagogiques.',
    path: '/education',
    category: 'Éducation & Jeunesse',
  },
  sante: {
    title: 'Santé & Soins à Ntolo | Poste de Santé & Urgences',
    description: 'Dispositif sanitaire de Ntolo : Poste de Santé / CSI, campagnes de vaccination, évacuations sanitaires vers Nkongsamba et pharmacie.',
    path: '/sante',
    category: 'Santé Publique',
  },
  agriculture: {
    title: 'Agriculture à Ntolo | Café, Cacao & Vivres du Moungo',
    description: 'Terres volcaniques fertiles de Ntolo : culture du cacao, café robusta et arabica, bananeraies, manioc et calendrier agraire saisonnier.',
    path: '/agriculture',
    category: 'Agriculture & Économie',
  },
  elevage: {
    title: 'Élevage & Productions Pastorales à Ntolo | Moungo',
    description: 'Filières d’élevage à Ntolo : porciculture, petits ruminants, aviculture villageoise et assistance technique vétérinaire.',
    path: '/elevage',
    category: 'Élevage & Pastoralisme',
  },
  'economie-commerce': {
    title: 'Économie & Marchés à Ntolo | Commerce & Entrepreneuriat',
    description: 'Activités économiques locales de Ntolo : marché périodique, artisanat, tontines solidaires et opportunités d’investissement rural.',
    path: '/economie-commerce',
    category: 'Économie Locale',
  },
  infrastructures: {
    title: 'Infrastructures à Ntolo | Eau Potable, Énergie & Pistes',
    description: 'État des équipements publics de Ntolo : réseau d’eau par gravité, forage solaire, électrification rurale et désenclavement des pistes.',
    path: '/infrastructures',
    category: 'Infrastructures & Équipements',
  },
  environnement: {
    title: 'Environnement & Réserve du Mont Nlonako | Ntolo',
    description: 'Écosystème forestier exceptionnel de Ntolo : faune amphibienne endémique du Mont Nlonako, protection des bassins versants et reboisement.',
    path: '/environnement',
    category: 'Environnement & Forêt',
  },
  tourisme: {
    title: 'Tourisme & Randonnées au Mont Nlonako | Ntolo',
    description: 'Circuits d’écotourisme au départ de Ntolo : ascension guidée du Mont Nlonako, cascades mystiques, hébergement rural et agrotourisme.',
    path: '/tourisme',
    category: 'Tourisme & Loisirs',
  },
  projets: {
    title: 'Grands Projets de Développement | CODEV & Village de Ntolo',
    description: 'Chantiers structurants prioritaires à Ntolo : adduction d’eau, extension du centre de santé, réhabilitation des pistes et partenariats.',
    path: '/projets',
    category: 'Développement Communal',
  },
  'projets-participatifs': {
    title: 'Projets Participatifs Citoyens | Vote & Financement Ntolo',
    description: 'Plateforme démocratique citoyenne : proposez des micro-projets pour Ntolo, votez pour les priorités du village et engagez vos contributions.',
    path: '/projets-participatifs',
    category: 'Démocratie Participative',
    schemaType: 'GovernmentService',
  },
  actualites: {
    title: 'Actualités & Journal Officiel | Village de Ntolo',
    description: 'Dernières nouvelles, communiqués de la Chefferie, comptes-rendus du CODEV et faits marquants de la vie communautaire de Ntolo.',
    path: '/actualites',
    category: 'Presse & Actualités',
  },
  annonces: {
    title: 'Annonces & Avis Officiels | Chefferie de Ntolo',
    description: 'Panneau officiel d’affichage public : avis de réunion, journées de salongo communautaire, nécrologie et décisions coutumières à Ntolo.',
    path: '/annonces',
    category: 'Affichage Public',
  },
  'article-detail': {
    title: 'Détail de l’Article | Journal Officiel de Ntolo',
    description: 'Lecture intégrale de la publication officielle du village de Ntolo (Nlonako, Moungo, Cameroun).',
    path: '/actualites/detail',
    category: 'Presse & Actualités',
  },
  evenements: {
    title: 'Agenda & Événements Officiels | Village de Ntolo',
    description: 'Calendrier des cérémonies royales, assemblées générales du CODEV, tournois sportifs et rassemblements coutumiers à Ntolo.',
    path: '/evenements',
    category: 'Agenda & Événements',
  },
  galerie: {
    title: 'Galerie Photos & Vidéos Officielles | Village de Ntolo',
    description: 'Photothèque et reportages vidéo du terroir de Ntolo : cérémonies traditionnelles, paysages du Mont Nlonako et grands chantiers.',
    path: '/galerie',
    category: 'Photothèque & Vidéothèque',
  },
  documents: {
    title: 'Documents & Textes Officiels en Téléchargement | Ntolo',
    description: 'Consultez et téléchargez les chartes coutumières, statuts du CODEV, formulaires administratifs et rapports d’activité du village de Ntolo.',
    path: '/documents',
    category: 'Archives & Documentation',
  },
  diaspora: {
    title: 'Espace Diaspora de Ntolo | Solidarité & Recensement',
    description: 'Plateforme dédiée aux ressortissants de Ntolo à Douala, Yaoundé et dans le monde : recensement en ligne, projets et investissements.',
    path: '/diaspora',
    category: 'Diaspora & Réseau',
  },
  contact: {
    title: 'Contact, Plan d’Accès & Itinéraire | Secrétariat de Ntolo',
    description: 'Contacter la Chefferie Traditionnelle de Ntolo : coordonnées téléphoniques, WhatsApp officiel, formulaire sécurisé, carte interactive et itinéraires.',
    path: '/contact',
    category: 'Contact & Itinéraire',
    schemaType: 'ContactPoint',
  },
  partenaires: {
    title: 'Espace Partenaires & Mécénat | Village de Ntolo (Moungo)',
    description: 'Partenaires officiels, coopératives agricoles, associations diaspora et entreprises soutenant les projets de développement de Ntolo.',
    path: '/partenaires',
    category: 'Partenaires & Sponsoring',
    schemaType: 'Organization',
  },
  'devenir-partenaire': {
    title: 'Devenir Partenaire Officiel | Charte & Sponsoring de Projets',
    description: 'Déposez votre candidature partenariale auprès de la Chefferie de Ntolo et du CODEV. Découvrez les paliers de mécénat et la charte éthique.',
    path: '/devenir-partenaire',
    category: 'Partenaires & Sponsoring',
  },
  'mentions-legales': {
    title: 'Mentions Légales & Confidentialité | Portail de Ntolo',
    description: 'Cadre légal, politique de protection des données citoyennes, droits coutumiers et crédits éditoriaux du portail officiel de Ntolo.',
    path: '/mentions-legales',
    category: 'Mentions Légales',
  },
  admin: {
    title: 'Portail d’Administration Institutionnelle | Village de Ntolo',
    description: 'Espace sécurisé de gestion administrative, validation des requêtes citoyennes et configuration du portail officiel de Ntolo.',
    path: '/admin',
    category: 'Administration',
  },
};

/**
 * Met à jour dynamiquement toutes les balises SEO (titre, meta, OG, Twitter, canonical, JSON-LD)
 */
export function updatePageSeo(pageId: PageId, customTitle?: string, customDescription?: string) {
  if (typeof document === 'undefined') return;

  const data = SEO_DATA_BY_PAGE[pageId] || SEO_DATA_BY_PAGE.accueil;
  const pageTitle = customTitle || data.title;
  const pageDesc = customDescription || data.description;
  const pageUrl = `${BASE_URL}${data.path}`;

  // 1. Document title
  document.title = pageTitle;

  // 2. Meta description
  updateOrCreateMeta('name', 'description', pageDesc);

  // 3. OpenGraph Tags
  updateOrCreateMeta('property', 'og:title', pageTitle);
  updateOrCreateMeta('property', 'og:description', pageDesc);
  updateOrCreateMeta('property', 'og:url', pageUrl);
  updateOrCreateMeta('property', 'og:type', pageId === 'actualites' || pageId === 'article-detail' ? 'article' : 'website');
  updateOrCreateMeta('property', 'og:image', data.image || DEFAULT_IMAGE);
  updateOrCreateMeta('property', 'og:site_name', 'Portail Officiel du Village de Ntolo');
  updateOrCreateMeta('property', 'og:locale', 'fr_FR');

  // 4. Twitter Cards
  updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
  updateOrCreateMeta('name', 'twitter:title', pageTitle);
  updateOrCreateMeta('name', 'twitter:description', pageDesc);
  updateOrCreateMeta('name', 'twitter:image', data.image || DEFAULT_IMAGE);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', pageUrl);

  // 6. Schema.org JSON-LD Breadcrumbs & Contextual Structured Data
  updatePageJsonLd(pageId, pageTitle, pageDesc, pageUrl);
}

function updateOrCreateMeta(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function updatePageJsonLd(pageId: PageId, title: string, description: string, url: string) {
  const SCRIPT_ID = 'ntolo-dynamic-schema-ld';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title.split('|')[0].trim(),
        item: url,
      },
    ],
  };

  let specificSchema: any = null;

  if (pageId === 'contact') {
    specificSchema = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: 'Chefferie Traditionnelle de Ntolo',
      description: 'Siège coutumier et secrétariat administratif du village de Ntolo, Arrondissement de Nlonako.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nlonako',
        addressRegion: 'Moungo, Littoral',
        addressCountry: 'Cameroun',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 4.9167,
        longitude: 9.9667,
        elevation: '640 m',
      },
      telephone: '+237 670 00 11 22',
    };
  } else if (pageId === 'projets-participatifs' || pageId === 'projets') {
    specificSchema = {
      '@context': 'https://schema.org',
      '@type': 'GovernmentService',
      name: 'Projets Participatifs et de Développement Communautaire de Ntolo',
      provider: {
        '@type': 'GovernmentOrganization',
        name: 'Comité de Développement du Village de Ntolo (CODEV)',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Village de Ntolo, Nlonako, Moungo',
      },
      description,
    };
  }

  const combined = specificSchema ? [breadcrumbs, specificSchema] : breadcrumbs;
  scriptEl.textContent = JSON.stringify(combined);
}

/**
 * Synchronise l'URL du navigateur avec la page affichée sans rechargement
 */
export function syncCleanUrl(pageId: PageId) {
  if (typeof window === 'undefined' || !window.history) return;
  const data = SEO_DATA_BY_PAGE[pageId];
  if (!data) return;

  const targetPath = data.path;
  if (window.location.pathname !== targetPath) {
    window.history.pushState({ pageId }, '', targetPath);
  }
}

/**
 * Résout le PageId initial depuis le pathname actuel (Support du rafraîchissement et des liens directs)
 */
export function getPageIdFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/$/, '') || '/';
  for (const [key, val] of Object.entries(SEO_DATA_BY_PAGE)) {
    if (val.path === clean) {
      return key as PageId;
    }
  }
  return 'accueil';
}
