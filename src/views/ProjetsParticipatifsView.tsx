import React, { useState, useEffect } from 'react';
import {
  Users, Target, HeartHandshake, ThumbsUp, PlusCircle, CheckCircle2,
  Calendar, MapPin, Sparkles, Filter, ChevronRight, ShieldCheck, Wallet, ArrowRight
} from 'lucide-react';
import { PageId, ParticipatoryProject } from '../types';
import {
  getStoredParticipatoryProjects,
  voteForParticipatoryProject,
  EVENT_COMMUNITY_DATA_CHANGED,
} from '../services/communityService';
import { OfficialSourcesSection, OfficialSourceItem } from '../components/OfficialSourcesSection';
import { CommunityActionHubModal } from '../components/community/CommunityActionHubModal';

const SOURCES_PARTICIPATIFS: OfficialSourceItem[] = [
  {
    title: 'Charte de la Démocratie Participative et de l’Initiative Citoyenne de Ntolo',
    reference: 'Assemblée Générale du CODEV & Chefferie Traditionnelle (Session 2026)',
    type: 'Cadre Réglementaire',
    status: 'Homologué',
    locationOrAccess: 'Secrétariat du CODEV & Affichage Public',
  },
  {
    title: 'Registre des Projets Soumis par les Résidents et la Diaspora',
    reference: 'Commission Technique de Planification et Arbitrage',
    type: 'Registre Communal',
    status: 'Disponible',
    locationOrAccess: 'Palais Royal de Ntolo',
  },
];

interface ProjetsParticipatifsViewProps {
  onNavigate: (page: PageId) => void;
}

export const ProjetsParticipatifsView: React.FC<ProjetsParticipatifsViewProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<ParticipatoryProject[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('Tous');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');
  const [votedProjects, setVotedProjects] = useState<Record<string, boolean>>({});

  // Modal triggers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'projet' | 'contribution'>('projet');
  const [targetProjectForPledge, setTargetProjectForPledge] = useState<string | undefined>(undefined);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<ParticipatoryProject | null>(null);

  const loadProjects = () => {
    setProjects(getStoredParticipatoryProjects());
  };

  useEffect(() => {
    loadProjects();
    const handleUpdate = () => {
      loadProjects();
    };
    window.addEventListener(EVENT_COMMUNITY_DATA_CHANGED, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_COMMUNITY_DATA_CHANGED, handleUpdate);
    };
  }, []);

  const handleVote = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (votedProjects[projectId]) return;
    voteForParticipatoryProject(projectId);
    setVotedProjects((prev) => ({ ...prev, [projectId]: true }));
  };

  const handleOpenPledge = (e: React.MouseEvent, project: ParticipatoryProject) => {
    e.stopPropagation();
    setTargetProjectForPledge(project.title);
    setModalType('contribution');
    setIsModalOpen(true);
  };

  const handleOpenSubmitProject = () => {
    setTargetProjectForPledge(undefined);
    setModalType('projet');
    setIsModalOpen(true);
  };

  const filtered = projects.filter((p) => {
    if (selectedSector !== 'Tous' && p.sector !== selectedSector) return false;
    if (selectedStatus !== 'Tous' && p.status !== selectedStatus) return false;
    return true;
  });

  const totalVotes = projects.reduce((acc, p) => acc + (p.votesCount || 0), 0);
  const totalPledged = projects.reduce((acc, p) => acc + (p.pledgedAmount || 0), 0);
  const totalEstimated = projects.reduce((acc, p) => acc + (p.estimatedBudget || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">
          <Users className="w-3.5 h-3.5 text-amber-700" />
          <span>Section 16-B • Budget & Projets Participatifs</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Projets Participatifs de Ntolo
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
              Initiatives nées du terrain, proposées par les villageois, les jeunes, les femmes et la diaspora.
              Soutenez, votez et contribuez pour faire aboutir les projets qui transforment notre cadre de vie.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenSubmitProject}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-800 text-white font-bold text-xs sm:text-sm hover:bg-emerald-900 shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Proposer un projet citoyen</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Projets Enregistrés</span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900">{projects.length}</span>
          <span className="text-[10px] text-emerald-700 font-semibold block">Approuvés ou en étude</span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Votes & Soutiens Citoyens</span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-800">{totalVotes}</span>
          <span className="text-[10px] text-slate-500 block">Engagements villageois</span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Promesses de Financement</span>
          <span className="font-mono text-xl sm:text-2xl font-black text-amber-800">
            {(totalPledged / 1000000).toFixed(1)} M FCFA
          </span>
          <span className="text-[10px] text-amber-700 font-semibold block">Souscriptions enregistrées</span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Budget Global Estimatif</span>
          <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
            {(totalEstimated / 1000000).toFixed(1)} M FCFA
          </span>
          <span className="text-[10px] text-slate-500 block">Besoins d'investissement</span>
        </div>
      </div>

      {/* Strategic Explanation Card & Payment Architecture Note */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMENT FONCTIONNE LE BUDGET PARTICIPATIF DE NTOLO ?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-royal font-bold">
              De l'idée citoyenne à l'inauguration collective
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 backdrop-blur-xs">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">1</span>
            <h4 className="font-bold text-amber-200 text-sm">Proposition & Examen</h4>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Tout habitant ou collectif de la diaspora dépose un projet chiffré via notre formulaire officiel. La commission technique du CODEV vérifie la faisabilité.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 backdrop-blur-xs">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">2</span>
            <h4 className="font-bold text-amber-200 text-sm">Adhésion & Mobilisation</h4>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              La communauté vote en ligne et lors des palabres coutumières. Les souscriptions citoyennes et promesses de parrainage sont répertoriées avec transparence.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 backdrop-blur-xs">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">3</span>
            <h4 className="font-bold text-amber-200 text-sm">Réalisation & Chantier</h4>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Une fois le seuil financier et l'accord des notables obtenus, le chantier démarre avec l'appui des artisans locaux et de la main d’œuvre bénévole (Salongo).
            </p>
          </div>
        </div>

        {/* Security & Payment architecture note */}
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 text-xs text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <p className="text-[11px] leading-snug">
            <strong>Architecture sécurisée de pré-lancement :</strong> Les promesses de dons et souscriptions sont enregistrées de manière vérifiable sans transaction bancaire immédiate. L'intégration technique des passerelles de paiement (Orange Money, MTN MoMo, Carte Bancaire) sera déployée lors de la Phase 2.
          </p>
        </div>
      </div>

      {/* Filters toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Filtres :</span>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="flex-1 md:flex-none px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-emerald-700"
          >
            <option value="Tous">Tous les secteurs ({projects.length})</option>
            <option value="Énergie & Routes">Énergie & Routes</option>
            <option value="Santé">Santé & Maternité</option>
            <option value="Agriculture & Économie">Agriculture & Économie</option>
            <option value="Jeunesse & Culture">Jeunesse & Culture</option>
            <option value="Eau & Assainissement">Eau & Assainissement</option>
            <option value="Éducation">Éducation</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Tous', 'Approuvé par le CODEV', 'En consultation citoyenne', 'En mobilisation'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => {
          const progressPercent = Math.min(100, Math.round((project.pledgedAmount / project.estimatedBudget) * 100));
          const hasVoted = !!votedProjects[project.id];

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProjectDetail(project)}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
                <img
                  src={project.featuredImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow ${
                    project.status === 'Approuvé par le CODEV' ? 'bg-emerald-700/90 text-white' :
                    project.status === 'En mobilisation' ? 'bg-amber-600/90 text-white' :
                    'bg-blue-600/90 text-white'
                  }`}>
                    {project.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-amber-300 backdrop-blur-md">
                    {project.sector}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 font-medium truncate drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded-full font-mono">
                    Échéance : {project.targetDate}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Porteur :</span>
                    <span className="text-emerald-800 font-semibold truncate">{project.proposerName}</span>
                    <span className="text-[10px] text-slate-400">({project.proposerRole})</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Financial Progress Bar */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Mobilisation citoyenne :</span>
                    <span className="font-mono text-emerald-800 text-sm font-black">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">
                      Promis : <strong className="text-slate-800">{project.pledgedAmount.toLocaleString('fr-FR')} FCFA</strong>
                    </span>
                    <span className="text-slate-500">
                      Objectif : <strong className="text-slate-800">{project.estimatedBudget.toLocaleString('fr-FR')} FCFA</strong>
                    </span>
                  </div>
                </div>

                {/* Action footer */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => handleVote(e, project.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      hasVoted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'text-emerald-700 fill-emerald-600' : 'text-slate-500'}`} />
                    <span>{project.votesCount} {hasVoted ? 'Soutenu !' : 'Soutenir'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleOpenPledge(e, project)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors"
                    >
                      <Wallet className="w-3.5 h-3.5 text-stone-950" />
                      <span>Contribuer</span>
                    </button>

                    <span className="p-2 rounded-xl text-slate-400 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProjectDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {selectedProjectDetail.sector} • {selectedProjectDetail.status}
                </span>
                <h3 className="font-serif-royal text-2xl font-bold text-slate-900 mt-2">
                  {selectedProjectDetail.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Porté par <strong className="text-slate-800">{selectedProjectDetail.proposerName}</strong> ({selectedProjectDetail.proposerRole})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProjectDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Résumé de l'initiative</h4>
                <p className="text-slate-600 leading-relaxed">{selectedProjectDetail.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Objectifs prioritaires</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                  {selectedProjectDetail.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-500 text-xs block">Localisation d'intervention :</span>
                  <strong className="text-slate-900">{selectedProjectDetail.location}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Bénéficiaires directs :</span>
                  <strong className="text-slate-900">{selectedProjectDetail.beneficiariesSummary || 'Communauté de Ntolo'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Budget total prévisionnel :</span>
                  <strong className="text-emerald-900 font-mono font-bold text-sm">
                    {selectedProjectDetail.estimatedBudget.toLocaleString('fr-FR')} FCFA
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Promesses de souscription :</span>
                  <strong className="text-amber-800 font-mono font-bold text-sm">
                    {selectedProjectDetail.pledgedAmount.toLocaleString('fr-FR')} FCFA
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedProjectDetail(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold"
              >
                Retour
              </button>

              <button
                type="button"
                onClick={(e) => {
                  setSelectedProjectDetail(null);
                  handleOpenPledge(e, selectedProjectDetail);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 font-bold text-xs shadow-md transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Souscrire / S'engager pour ce projet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Sources */}
      <OfficialSourcesSection sources={SOURCES_PARTICIPATIFS} />

      {/* Community Action Hub Modal (for proposing or contributing) */}
      <CommunityActionHubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialFormType={modalType}
        preselectedProjectTitle={targetProjectForPledge}
        onNavigateToParticipatory={() => loadProjects()}
      />
    </div>
  );
};
