/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Service de Gestion des Partenaires & Sponsoring Institutionnel
 * Village de Ntolo (Arrondissement de Nlonako, Moungo, Cameroun)
 */

import { PartnerItem, ProjectSponsorshipTier } from '../types';

const STORAGE_KEY_PARTNERS = 'ntolo_partners_v1';
export const EVENT_PARTNERS_CHANGED = 'ntolo_partners_changed';

/**
 * Paliers officiels de Sponsoring & Mécénat Citoyen
 */
export const SPONSORSHIP_TIERS: ProjectSponsorshipTier[] = [
  {
    id: 'platine',
    label: 'Grand Bâtisseur / Mécène d’Honneur',
    minAmountFCFA: 5000000, // 5 000 000 FCFA
    badgeColor: 'bg-indigo-900 text-indigo-100 border-indigo-700',
    benefits: [
      'Plaque commémorative officielle gravée sur l’ouvrage réalisé',
      'Mention d’honneur solennelle lors du Congrès et des cérémonies coutumières',
      'Visibilité permanente dans l’Espace Partenaires et sur les dossiers de presse du CODEV',
      'Attestation royale de reconnaissance signée par Sa Majesté le Chef de 3e Degré',
      'Droit d’audition privilégié sur les orientations de développement du village',
    ],
  },
  {
    id: 'or',
    label: 'Parrain Or / Bâtisseur Actif',
    minAmountFCFA: 2500000, // 2 500 000 FCFA
    badgeColor: 'bg-amber-800 text-amber-100 border-amber-600',
    benefits: [
      'Logo ou nom figurant sur le panneau de chantier du projet parrainé',
      'Publication dédiée dans le Journal & Actualités officielles du village',
      'Présence sur la page officielle des Partenaires avec lien vers votre organisation',
      'Certificat officiel de contribution citoyenne au développement de Ntolo',
    ],
  },
  {
    id: 'argent',
    label: 'Partenaire Solidaire',
    minAmountFCFA: 1000000, // 1 000 000 FCFA
    badgeColor: 'bg-slate-700 text-slate-100 border-slate-500',
    benefits: [
      'Citation officielle dans les rapports d’activité semestriels du CODEV',
      'Visibilité dans l’annuaire des partenaires et donateurs du portail',
      'Invitations officielles aux inaugurations et journées communautaires',
    ],
  },
  {
    id: 'bronze',
    label: 'Bienfaiteur Communautaire',
    minAmountFCFA: 500000, // 500 000 FCFA
    badgeColor: 'bg-amber-950 text-amber-200 border-amber-800',
    benefits: [
      'Inscription sur le registre d’honneur des donateurs de la Chefferie',
      'Badge de contributeur bienfaiteur sur le portail numérique',
    ],
  },
];

/**
 * Partenaires institutionnels et associatifs initiaux de Ntolo
 */
const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: 'part-1',
    name: 'Commune d’Arrondissement de Nlonako',
    category: 'institutionnel',
    level: 'platine',
    logoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80',
    description: 'Institution municipale de tutelle locale, co-financière des pistes rurales, de l’hydraulique villageoise et des dotations scolaires du canton.',
    websiteUrl: 'https://nlonako.cm',
    sponsoredProjects: ['Adduction d’Eau Potable', 'Piste Rurale Ntolo-Nlonako'],
    contactPerson: 'Cabinet de Monsieur le Maire',
    contactEmail: 'contact@mairie-nlonako.cm',
    contactPhone: '+237 233 49 10 20',
    featured: true,
    active: true,
    partnershipSince: '2018',
    contributionType: 'mixte',
  },
  {
    id: 'part-2',
    name: 'Union des Coopératives Agricoles du Moungo (UCAM)',
    category: 'cooperative_agricole',
    level: 'or',
    logoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80',
    description: 'Fédération des planteurs de café robusta et cacao de la vallée du Moungo, soutenant l’accès aux engrais biologiques et la commercialisation directe.',
    websiteUrl: 'https://coop-moungo.cm',
    sponsoredProjects: ['Unité de Séchage Artisanal du Cacao'],
    contactPerson: 'Secrétariat Général UCAM',
    contactEmail: 'direction@coop-moungo.cm',
    contactPhone: '+237 699 12 34 56',
    featured: true,
    active: true,
    partnershipSince: '2021',
    contributionType: 'technique',
  },
  {
    id: 'part-3',
    name: 'Association des Ressortissants de Ntolo en Europe (ARNE)',
    category: 'diaspora_ong',
    level: 'platine',
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80',
    description: 'Réseau fraternel de la diaspora basé à Paris, Bruxelles et Genève, finançant les lampadaires solaires du village et les bourses scolaires d’excellence.',
    sponsoredProjects: ['Électrification Solaire du Carrefour Chefferie', 'Bourses Scolaires de l’École Publique'],
    contactPerson: 'M. Jean-Paul Mbassi (Président ARNE)',
    contactEmail: 'diaspora.europe@ntolo.cm',
    contactPhone: '+33 6 12 34 56 78',
    featured: true,
    active: true,
    partnershipSince: '2020',
    contributionType: 'financier',
  },
  {
    id: 'part-4',
    name: 'Fondation Éco-Nlonako pour la Biodiversité',
    category: 'institutionnel',
    level: 'argent',
    logoUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=300&q=80',
    description: 'ONG environnementale dédiée à la protection de la canopée du Mont Nlonako et au balisage responsable des sentiers d’écotourisme du terroir.',
    sponsoredProjects: ['Sentier Écotouristique du Pic Nlonako'],
    contactPerson: 'Dr. Alain Fogang (Directeur de Programme)',
    contactEmail: 'contact@eco-nlonako.org',
    featured: false,
    active: true,
    partnershipSince: '2023',
    contributionType: 'technique',
  },
  {
    id: 'part-5',
    name: 'ECBHR Nkongsamba (Hydraulique & BTP Rurale)',
    category: 'entreprise_moungo',
    level: 'argent',
    logoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=300&q=80',
    description: 'Société régionale spécialisée dans le forage géologique et l’équipement de pompage solaire, mécène pour la maintenance des bornes-fontaines.',
    sponsoredProjects: ['Maintenance du Forage Solaire du Centre'],
    contactPerson: 'Ingénieur Chef d’Agence',
    contactPhone: '+237 677 88 99 00',
    featured: false,
    active: true,
    partnershipSince: '2022',
    contributionType: 'materiel',
  },
];

/**
 * Récupère la liste des partenaires
 */
export function getStoredPartners(): PartnerItem[] {
  if (typeof window === 'undefined') return INITIAL_PARTNERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARTNERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    return parsed;
  } catch {
    return INITIAL_PARTNERS;
  }
}

/**
 * Enregistre ou met à jour un partenaire
 */
export function savePartner(partner: PartnerItem): PartnerItem[] {
  const partners = getStoredPartners();
  const index = partners.findIndex((p) => p.id === partner.id);
  let updated: PartnerItem[];
  if (index >= 0) {
    updated = [...partners];
    updated[index] = partner;
  } else {
    updated = [partner, ...partners];
  }
  localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_PARTNERS_CHANGED));
  return updated;
}

/**
 * Supprime un partenaire
 */
export function deletePartner(id: string): PartnerItem[] {
  const partners = getStoredPartners();
  const updated = partners.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_PARTNERS_CHANGED));
  return updated;
}

/**
 * Charte éthique des partenariats de Ntolo
 */
export const PARTNERSHIP_CHARTER = {
  title: 'Charte Éthique & Souveraineté Communautaire de Ntolo',
  preamble: 'Le village de Ntolo accueille tout partenariat respectueux de l’intérêt supérieur des résidents, du patrimoine coutumier et de l’environnement du Mont Nlonako.',
  principles: [
    {
      title: 'Transparence & Traçabilité Intégrale',
      description: 'Chaque franc CFA, don matériel ou appui technique fait l’objet d’un enregistrement public au CODEV et d’un rapport d’affectation certifié.',
    },
    {
      title: 'Préservation des Forêts & Biodiversité',
      description: 'Les projets financés doivent proscrire toute déforestation sauvage et promouvoir une agriculture paysanne durable.',
    },
    {
      title: 'Respect de l’Autorité Coutumière & des Usages',
      description: 'Les partenaires s’engagent à respecter l’autorité de la Chefferie Traditionnelle de 3e Degré et les décisions de l’Assemblée des Notables.',
    },
    {
      title: 'Priorité à la Main-d’Œuvre Villageoise',
      description: 'Pour tout chantier ou réalisation, la priorité d’embauche est accordée aux jeunes et femmes résidant à Ntolo.',
    },
  ],
};
