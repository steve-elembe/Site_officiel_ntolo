import React, { useState } from 'react';
import { Target, CheckCircle2, Award, HeartHandshake, Filter, Users, ShieldAlert, Sparkles, FileText } from 'lucide-react';
import { PageId, ProjectItem } from '../types';
import { SAMPLE_PROJECTS } from '../data/villageData';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';

const SOURCES_PROJETS: OfficialSourceItem[] = [
  {
    title: 'Plan Communal de Développement (PCD) de Nlonako - Projets Ntolo',
    reference: 'Commune de Nlonako / PNDP (Programme National de Développement Participatif)',
    type: 'Document Cadre de Planification',
    status: 'Disponible',
    locationOrAccess: 'Mairie de Nlonako',
  },
  {
    title: 'Cahier des charges et devis estimatifs des chantiers d’adduction et réhabilitation',
    reference: 'Commission Technique et d’Ingénierie du CODEV Ntolo',
    type: 'Dossier Technique d’Exécution',
    status: 'En cours de collationnement',
    locationOrAccess: 'Secrétariat du CODEV',
  },
  {
    title: 'Règlement de gestion des fonds de solidarité et conventions de partenariat',
    reference: 'Chefferie Traditionnelle et Assemblée Générale du CODEV',
    type: 'Règlement Intérieur et Financier',
    status: 'Homologué',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
];

interface ProjetsViewProps {
  onNavigate: (page: PageId) => void;
}

export const ProjetsView: React.FC<ProjetsViewProps> = ({ onNavigate }) => {
  const [selectedSector, setSelectedSector] = useState<string>('Tous');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [donorName, setDonorName] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('50000');
  const [successReceipt, setSuccessReceipt] = useState<{ code: string; project: string } | null>(null);

  const filteredProjects = selectedSector === 'Tous'
    ? SAMPLE_PROJECTS
    : SAMPLE_PROJECTS.filter((p) => p.sector.includes(selectedSector) || p.sector === selectedSector);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptCode = `NTL-DON-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessReceipt({
      code: receiptCode,
      project: activeModalProject?.title || 'Projet Ntolo',
    });
  };

  const resetModal = () => {
    setActiveModalProject(null);
    setSuccessReceipt(null);
    setDonorName('');
    setDonorCity('');
    setDonorPhone('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-3">
          <Target className="w-3.5 h-3.5 text-emerald-800" />
          <span>Section 11 • Chantiers Prioritaires & Solidarité</span>
        </div>
        <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Projets de Développement de Ntolo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Catalogue officiel des chantiers communautaires, suivi des financements et engagement citoyen.
        </p>
      </div>

      {/* Participatory projects banner bridge */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-emerald-800">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950">
            <Sparkles className="w-3 h-3" />
            <span>Nouveauté Citoyenne</span>
          </div>
          <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-amber-200">
            Projets Participatifs Proposés par la Communauté
          </h3>
          <p className="text-xs text-slate-300">
            Votez pour les micro-initiatives portées par les habitants, suivez les promesses de contributions et proposez de nouveaux projets pour Ntolo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('projets-participatifs')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition-colors text-center"
          >
            Découvrir les Projets Participatifs →
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ntolo_open_community_modal', { detail: { type: 'projet' } }))}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors text-center"
          >
            + Proposer un projet
          </button>
        </div>
      </div>

      {/* Provisional notice */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs sm:text-sm text-amber-900 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Gouvernance financière transparente :</strong> Les devis quantitatifs et estimatifs sont indicatifs et soumis aux actualisations techniques du Comité de Développement. Les mentions <span className="font-mono font-bold bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-900">[À compléter]</span> désignent les comptes bancaires ou numéros de collecte officiels en cours d'attribution.
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-emerald-800" />
          <span>Filtrer par secteur :</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {['Tous', 'Eau & Assainissement', 'Éducation', 'Santé', 'Jeunesse & Culture'].map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedSector === sector
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900">
                    {project.sector}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Réf : {project.id.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {project.title}
                </h2>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                {project.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {project.description}
            </p>

            {/* Goals List */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                Objectifs opérationnels & Réalisations prévues :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {project.goals.map((g, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Status Gauge */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Taux de mobilisation des fonds :</span>
                <span className="text-emerald-800 text-sm">{project.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${project.progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex flex-wrap justify-between text-xs text-slate-600 pt-1 gap-2">
                <span>Fonds déjà mobilisés : <strong className="text-slate-900">{project.fundsRaised}</strong></span>
                <span>Budget prévisionnel : <strong className="text-slate-900">{project.budgetEstimated}</strong></span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                <span>Bénéficiaires : <strong>{project.beneficiaries}</strong></span>
              </div>
              <button
                onClick={() => setActiveModalProject(project)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow transition-all flex items-center justify-center space-x-2"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Souscrire / Contribuer à ce projet</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Contribution Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-emerald-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Engagement Citoyen pour Ntolo
                </h3>
              </div>
              <button
                onClick={resetModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            {successReceipt ? (
              <div className="space-y-4 py-4 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Récépissé d’Engagement N° {successReceipt.code}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Merci <strong>{donorName}</strong> pour votre soutien patriotique au projet :
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                  « {successReceipt.project} » — Montant engagé : <strong>{pledgeAmount} FCFA</strong>
                </div>
                <p className="text-[11px] text-slate-500">
                  Le Secrétariat Financier du Comité de Développement vous adressera un message de confirmation officiel ainsi que les détails de versement certifiés [À compléter].
                </p>
                <button
                  onClick={resetModal}
                  className="px-6 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} className="space-y-4 text-left">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                  <span className="font-semibold text-emerald-900 block">Projet choisi :</span>
                  <span className="text-slate-800 font-bold">{activeModalProject.title}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom & Prénom(s) ou Nom de la Famille
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Ex: Paul Mbarga / Ressortissant Ntolo"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ville ou Pays de résidence
                    </label>
                    <input
                      type="text"
                      required
                      value={donorCity}
                      onChange={(e) => setDonorCity(e.target.value)}
                      placeholder="Ex: Douala / Yaoundé / France..."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="Ex: +237 6XX XX XX XX"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Montant de votre contribution (FCFA)
                  </label>
                  <select
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="15000">15 000 FCFA</option>
                    <option value="25000">25 000 FCFA</option>
                    <option value="50000">50 000 FCFA</option>
                    <option value="100000">100 000 FCFA</option>
                    <option value="250000">250 000 FCFA</option>
                    <option value="500000">500 000 FCFA ou plus</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow"
                  >
                    Générer mon engagement
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sources & Documents Officiels */}
      <OfficialSourcesSection
        sources={SOURCES_PROJETS}
        themeTitle="les projets de développement et financements communautaires de Ntolo"
        onNavigateToContact={() => onNavigate('contact')}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('infrastructures')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Infrastructures
        </button>
        <button
          onClick={() => onNavigate('actualites')}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
        >
          Actualités & Avis →
        </button>
      </div>
    </div>
  );
};
