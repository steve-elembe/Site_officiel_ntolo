/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mentions Légales & Politique de Confidentialité
 * Portail Numérique Officiel du Village de Ntolo (Arrondissement de Nlonako, Moungo, Cameroun)
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Landmark, Scale, Lock, FileText, Server,
  Cookie, UserCheck, AlertTriangle, Mail, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { PageId, SiteSettings } from '../types';
import { VILLAGE_INFO } from '../data/villageData';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from '../services/adminService';
import { SocialShareBar } from '../components/common/SocialShareBar';

interface MentionsLegalesViewProps {
  onNavigate: (page: PageId) => void;
}

export const MentionsLegalesView: React.FC<MentionsLegalesViewProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
    return () => window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleUpdate);
  }, []);

  const publisher = settings.legalPublisherName || 'Chefferie Traditionnelle de Ntolo (3e Degré) & Comité de Développement de Ntolo (CODEV)';
  const director = settings.legalDirectorPublication || `${settings.chiefTitle} (${settings.chiefName}) & le Secrétaire Général de la Chefferie`;
  const editorial = settings.legalEditorialResponsibility || 'Commission Information, Communication & Archives Communautaires du CODEV';
  const host = settings.legalHostName || 'Infrastructure Cloud Sécurisée Haute Disponibilité (Datacenter certifié ISO/IEC 27001)';
  const hostAddr = settings.legalHostAddress || 'Plateforme Cloud supervisée 24/7, chiffrement HTTPS/TLS 1.3';
  const dpoEmail = settings.legalDpoContact || settings.contactEmail || 'contact@ntolo.cm';
  const decree = settings.legalCustomaryDecree || 'Décret présidentiel N° 77/245 du 15 juillet 1977 portant organisation des chefferies traditionnelles au Cameroun et Arrêté préfectoral d’homologation (Département du Moungo, Nkongsamba)';
  const dataRetention = settings.legalDataRetentionPolicy || 'Les données nominatives recueillies lors des recensements de la diaspora, dépôts de projets ou doléances sont conservées pour une durée strictement limitée à l’utilité administrative et coutumière. Droit d’accès, de rectification et d’effacement garanti sous 30 jours sur simple demande écrite.';
  const cookiePolicy = settings.legalCookiePolicyText || 'Ce portail officiel pratique une politique de sobriété numérique : aucun cookie publicitaire ou traceur commercial tiers n’est déposé sur votre terminal. Seules les données locales de session strictement nécessaires à la navigation et à la sécurité de l’administration sont utilisées.';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Bouton retour */}
      <button
        onClick={() => onNavigate('accueil')}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au portail d'accueil</span>
      </button>

      {/* Header Institutionnel */}
      <div className="border-b border-stone-200 pb-6 space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
          <span>Cadre Institutionnel • République du Cameroun</span>
        </div>
        <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mentions Légales & Politique de Confidentialité
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Dispositions légales régissant le portail numérique officiel du village de Ntolo, conformité avec les décrets régissant les chefferies traditionnelles et protection des données citoyennes (Loi N° 2010/012 relative à la cybersécurité et la cybercriminalité).
        </p>
      </div>

      {/* Liste des Articles & Règlements */}
      <div className="space-y-6">
        {/* Article 1: Éditeur officiel & Gouvernance */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                1. Éditeur & Responsabilité Institutionnelle
              </h2>
              <p className="text-xs text-slate-500">Autorité de tutelle coutumière et comités délégataires</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Le présent portail internet est le canal numérique officiel d’information et de participation citoyenne du <strong>Village de NTOLO</strong>, relevant administrativement de l’Arrondissement de Nlonako, Département du Moungo, Région du Littoral, République du Cameroun.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-slate-500 block mb-1">Éditeur officiel du portail :</span>
              <span className="font-semibold text-slate-900">{publisher}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-slate-500 block mb-1">Direction de la publication :</span>
              <span className="font-semibold text-slate-900">{director}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-slate-500 block mb-1">Responsabilité éditoriale :</span>
              <span className="font-semibold text-slate-900">{editorial}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-slate-500 block mb-1">Secrétariat Général & Permanence :</span>
              <span className="font-semibold text-slate-900">{settings.contactEmail} • {settings.contactPhone}</span>
            </div>
          </div>
        </section>

        {/* Article 2: Cadre Juridique Républicain & Chefferies */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                2. Cadre Juridique des Chefferies Traditionnelles
              </h2>
              <p className="text-xs text-slate-500">Conformité républicaine et textes organiques camerounais</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            L'organisation coutumière et administrative du village s’exerce en stricte conformité avec le <strong>Décret présidentiel N° 77/245 du 15 juillet 1977</strong> portant organisation des chefferies traditionnelles en République du Cameroun, sous l'autorité de tutelle de la Sous-Préfecture de l'Arrondissement de Nlonako et de la Préfecture du Département du Moungo (Nkongsamba).
          </p>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium leading-relaxed">
            <strong>Homologation réglementaire :</strong> {decree}
          </div>
        </section>

        {/* Article 3: Politique de Confidentialité & Cybersécurité */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                3. Politique de Confidentialité & Données Citoyennes
              </h2>
              <p className="text-xs text-slate-500">Loi N° 2010/012 du 21 décembre 2010 relative à la cybersécurité</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Le village de Ntolo attache une importance fondamentale à la souveraineté, à la vie privée et à la sécurité numérique de ses administrés, ressortissants et partenaires.
            </p>
            <p>
              Les formulaires de recensement de la diaspora, les dépôts d'annonces, les propositions citoyennes et les candidatures de partenariat sont collectés avec votre consentement explicite et traités de manière sécurisée.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-950">
            <span className="font-bold block">Durée de conservation et usage :</span>
            <p className="leading-relaxed">{dataRetention}</p>
          </div>
        </section>

        {/* Article 4: Droits des Usagers (Accès, Rectification, Retrait) */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                4. Exercice de Vos Droits Citoyens
              </h2>
              <p className="text-xs text-slate-500">Droit d'accès, de modification, d'anonymisation et de suppression</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Tout citoyen, membre de la diaspora ou partenaire enregistré dans les bases communautaires dispose d'un droit permanent d’accès, de rectification et d’effacement de ses informations nominatives.
          </p>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 block">Délégué aux Données / Secrétariat Général :</span>
              <span className="text-slate-600 font-mono">{dpoEmail}</span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold transition-colors self-start sm:self-auto"
            >
              Formuler une demande de rectification
            </button>
          </div>
        </section>

        {/* Article 5: Politique de Cookies & Stockage Local */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                5. Gestion des Cookies & Témoins de Session
              </h2>
              <p className="text-xs text-slate-500">Sobriété numérique et absence de profilage commercial</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {cookiePolicy}
          </p>

          <ul className="text-xs space-y-1.5 text-slate-600 list-disc pl-5">
            <li><strong>Stockage local de préférences :</strong> Sauvegarde de la taille de texte choisie et des filtres de consultation.</li>
            <li><strong>Sécurité d'administration :</strong> Jeton de session authentifiée avec expiration programmée sous 12h.</li>
            <li><strong>Absence de traceurs publicitaires :</strong> Aucun réseau tiers n'a accès à vos données de consultation.</li>
          </ul>
        </section>

        {/* Article 6: Neutralité Factuelle & Données Provisoires [À compléter] */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-amber-800">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                6. Statut des Contenus Provisoires [À compléter]
              </h2>
              <p className="text-xs text-slate-500">Règle de rigueur historique, généalogique et cadastrale</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans un engagement strict de probité, <strong>aucun fait historique, généalogique ou topographique n’est inventé ou extrapolé</strong> sur ce portail. Toutes les sections dont les pièces justificatives ou décrets sont en cours d'homologation par la Chefferie ou les autorités préfectorales portent la mention explicite <strong>« [À compléter] »</strong>. Les citoyens et aînés détenant des archives fiables sont invités à les transmettre au CODEV.
          </p>
        </section>

        {/* Article 7: Hébergement Sécurisé & Intégrité */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                7. Hébergement & Sécurité des Données
              </h2>
              <p className="text-xs text-slate-500">Infrastructures d'exécution et protocole TLS</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 space-y-2">
            <p><strong>Hébergeur :</strong> {host}</p>
            <p><strong>Spécifications techniques :</strong> {hostAddr}</p>
            <p className="text-xs text-slate-500">
              Le protocole HTTPS avec certificat TLS 1.3 garantit le chiffrement continu des échanges entre votre navigateur et nos serveurs.
            </p>
          </div>
        </section>
      </div>

      {/* Partage & Liens */}
      <div className="pt-6 border-t border-stone-200">
        <SocialShareBar />
      </div>
    </div>
  );
};
