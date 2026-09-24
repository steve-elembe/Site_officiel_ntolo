/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Espace Partenaires & Sponsoring de Projets du Village de Ntolo
 */

import React, { useState, useEffect } from 'react';
import {
  Handshake, Award, ShieldCheck, HeartHandshake, Building2,
  ExternalLink, ArrowRight, CheckCircle2, Globe, Phone, Mail,
  Users, Sparkles, Filter, Info
} from 'lucide-react';
import { PageId, PartnerItem, PartnerCategory, SponsorshipLevel } from '../types';
import { getStoredPartners, SPONSORSHIP_TIERS, EVENT_PARTNERS_CHANGED } from '../services/partnerService';
import { INITIAL_PARTICIPATORY_PROJECTS } from '../services/communityService';
import { SocialShareBar } from '../components/common/SocialShareBar';

interface PartenairesViewProps {
  onNavigate: (page: PageId) => void;
}

export const PartenairesView: React.FC<PartenairesViewProps> = ({ onNavigate }) => {
  const [partners, setPartners] = useState<PartnerItem[]>(getStoredPartners());
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'tous'>('tous');
  const [selectedTier, setSelectedTier] = useState<SponsorshipLevel | null>(null);

  useEffect(() => {
    const handleUpdate = () => setPartners(getStoredPartners());
    window.addEventListener(EVENT_PARTNERS_CHANGED, handleUpdate);
    return () => window.removeEventListener(EVENT_PARTNERS_CHANGED, handleUpdate);
  }, []);

  const filteredPartners = partners.filter((p) => {
    if (selectedCategory === 'tous') return true;
    return p.category === selectedCategory;
  });

  const getTierBadge = (level: SponsorshipLevel) => {
    switch (level) {
      case 'platine':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-950 text-indigo-200 border border-indigo-700">Mécène Platine</span>;
      case 'or':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-950 text-amber-200 border border-amber-600">Parrain Or</span>;
      case 'argent':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-800 text-slate-200 border border-slate-600">Partenaire Argent</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-stone-800 text-stone-300 border border-stone-600">Bienfaiteur Bronze</span>;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="relative mx-3 sm:mx-6 lg:mx-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 border border-emerald-800 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Handshake className="w-3.5 h-3.5 text-amber-400" />
            <span>ALLIANCES STRATÉGIQUES & DÉVELOPPEMENT DURABLE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-royal font-bold text-white tracking-tight">
            Espace Partenaires & Mécénat
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
            La Chefferie Traditionnelle de Ntolo et le Comité de Développement (CODEV) saluent les institutions, entreprises, coopératives agricoles et associations de la diaspora qui investissent concrètement pour l’essor économique, scolaire et sanitaire de notre terroir.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('devenir-partenaire')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Rejoindre nos partenaires officiels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('sponsoring-tiers');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
            >
              Consulter la grille des parrainages
            </button>
          </div>
        </div>
      </section>

      {/* Partenaires Actuels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-2xl font-serif-royal font-bold text-slate-900">
              Nos Partenaires Engagés
            </h2>
            <p className="text-xs text-slate-500">
              Des collaborations durables, certifiées conformes à la charte éthique de Ntolo.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'tous', label: 'Tous' },
              { id: 'institutionnel', label: 'Institutions' },
              { id: 'cooperative_agricole', label: 'Coopératives' },
              { id: 'diaspora_ong', label: 'Diaspora & ONG' },
              { id: 'entreprise_moungo', label: 'Entreprises' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des partenaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0">
                    <img
                      src={p.logoUrl}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {getTierBadge(p.level)}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {p.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    Partenaire depuis {p.partnershipSince}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>

                {p.sponsoredProjects && p.sponsoredProjects.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Projets soutenus :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.sponsoredProjects.map((proj, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md font-medium"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                <span>{p.contactPerson || 'Point focal Chefferie'}</span>
                {p.websiteUrl && (
                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grille des Paliers de Sponsoring & Parrainage */}
      <section id="sponsoring-tiers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>FORMULES OFFICIELLES DE PARRAINAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-royal font-bold text-slate-900">
            Paliers de Sponsoring & Engagements du CODEV
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Chaque contribution est affectée selon un contrat de parrainage transparent assorti de contreparties honorifiques et d’un droit de suivi des réalisations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPONSORSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-600 transition-colors space-y-6"
            >
              <div className="space-y-4">
                <div className={`px-3 py-1 rounded-xl text-xs font-bold border inline-block ${tier.badgeColor}`}>
                  {tier.label}
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {tier.minAmountFCFA.toLocaleString('fr-FR')} <span className="text-xs text-slate-500 font-normal">FCFA min.</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    (Env. {Math.round(tier.minAmountFCFA / 655).toLocaleString('fr-FR')} €)
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Avantages & Reconnaissance :
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tier.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onNavigate('devenir-partenaire')}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors text-center"
              >
                Postuler pour ce palier
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsoring ciblé de chantiers en cours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif-royal font-bold text-slate-900">
                Chantiers prioritaires ouverts au mécénat direct
              </h3>
              <p className="text-xs text-slate-600">
                Vous pouvez lier votre don ou sponsoring d’entreprise à un projet d’intérêt général précis.
              </p>
            </div>
            <button
              onClick={() => onNavigate('projets-participatifs')}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-bold text-slate-800 transition-colors self-start sm:self-auto"
            >
              Voir les 4 projets citoyens
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_PARTICIPATORY_PROJECTS.slice(0, 2).map((proj) => (
              <div
                key={proj.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="w-full sm:w-28 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {proj.sector}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {proj.summary}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">
                      Budget : {proj.estimatedBudget.toLocaleString('fr-FR')} FCFA
                    </span>
                    <button
                      onClick={() => onNavigate('devenir-partenaire')}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                    >
                      Parrainer ce chantier →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partage Social */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SocialShareBar />
      </div>
    </div>
  );
};
