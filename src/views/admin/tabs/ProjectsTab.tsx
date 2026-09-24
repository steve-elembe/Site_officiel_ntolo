import React, { useState } from 'react';
import {
  Target, Plus, Search, Edit2, Trash2, CheckCircle2,
  AlertCircle, X, AlertTriangle, Coins, TrendingUp
} from 'lucide-react';
import { ProjectItem, UserRole } from '../../../types';

interface ProjectsTabProps {
  projects: (ProjectItem & { published?: boolean })[];
  onSave: (project: ProjectItem & { published?: boolean }) => void;
  onDelete: (id: string, title: string) => void;
  onTogglePublish: (id: string) => void;
  userRole: UserRole;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  onSave,
  onDelete,
  onTogglePublish,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<(ProjectItem & { published?: boolean }) | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState<ProjectItem['sector']>('Eau & Assainissement');
  const [status, setStatus] = useState<ProjectItem['status']>('En cours');
  const [progress, setProgress] = useState(45);
  const [budgetEstimated, setBudgetEstimated] = useState('15 000 000 FCFA');
  const [fundsRaised, setFundsRaised] = useState('6 000 000 FCFA');
  const [description, setDescription] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('Toute la population');
  const [contactPerson, setContactPerson] = useState('Commission CODEV');
  const [goalsRaw, setGoalsRaw] = useState('');
  const [published, setPublished] = useState(true);

  const canPublish = userRole === 'administrateur_principal' || userRole === 'editeur';
  const canDelete = userRole === 'administrateur_principal' || userRole === 'editeur';

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingProj(null);
    setTitle('');
    setSector('Eau & Assainissement');
    setStatus('En cours');
    setProgress(30);
    setBudgetEstimated('10 000 000 FCFA');
    setFundsRaised('3 000 000 FCFA');
    setDescription('');
    setBeneficiaries('L’ensemble des familles et quartiers de Ntolo');
    setContactPerson('Bureau Exécutif du CODEV');
    setGoalsRaw('Objectif 1\nObjectif 2\nObjectif 3');
    setPublished(canPublish);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem & { published?: boolean }) => {
    setEditingProj(p);
    setTitle(p.title);
    setSector(p.sector);
    setStatus(p.status);
    setProgress(p.progressPercentage);
    setBudgetEstimated(p.budgetEstimated);
    setFundsRaised(p.fundsRaised);
    setDescription(p.description);
    setBeneficiaries(p.beneficiaries);
    setContactPerson(p.contactPerson);
    setGoalsRaw(p.goals.join('\n'));
    setPublished(p.published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const goals = goalsRaw
      .split('\n')
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    onSave({
      id: editingProj ? editingProj.id : `proj-${Date.now()}`,
      title: title.trim(),
      sector,
      status,
      progressPercentage: Number(progress),
      budgetEstimated: budgetEstimated.trim(),
      fundsRaised: fundsRaised.trim(),
      description: description.trim(),
      goals: goals.length > 0 ? goals : ['Réalisation des travaux'],
      beneficiaries: beneficiaries.trim(),
      contactPerson: contactPerson.trim(),
      published: canPublish ? published : false,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un projet (eau, école, santé, route...)"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau projet de développement</span>
        </button>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Projet & Secteur</th>
                <th className="py-3 px-4">Avancement</th>
                <th className="py-3 px-4">Budget / Fonds</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-center">Visibilité</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-stone-100 block">{p.title}</span>
                    <span className="text-[11px] text-stone-400 block mt-0.5">{p.sector}</span>
                  </td>
                  <td className="py-3 px-4 min-w-[140px]">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-stone-300 mb-1">
                      <span>{p.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all"
                        style={{ width: `${p.progressPercentage}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="text-stone-300 font-semibold">{p.fundsRaised}</div>
                    <div className="text-[10px] text-stone-400">sur {p.budgetEstimated}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'En cours' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      p.status === 'Achevé' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {canPublish ? (
                      <button
                        onClick={() => onTogglePublish(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          p.published !== false
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {p.published !== false ? 'Publié' : 'Brouillon'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-bold">
                        {p.published !== false ? 'Publié' : 'Brouillon'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-red-200"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">Supprimer ce projet ?</h3>
            <p className="text-xs text-stone-300">
              Le projet ne figurera plus sur le portail des chantiers prioritaires du village.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  const target = projects.find((p) => p.id === deleteConfirmId);
                  onDelete(deleteConfirmId, target?.title || 'Projet');
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl my-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-royal text-lg font-bold text-white">
                {editingProj ? 'Modifier le projet' : 'Nouveau projet de développement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Nom du projet</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Adduction d’eau potable par gravité"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Secteur</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as ProjectItem['sector'])}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Eau & Assainissement">Eau & Assainissement</option>
                    <option value="Éducation">Éducation</option>
                    <option value="Santé">Santé</option>
                    <option value="Énergie & Routes">Énergie & Routes</option>
                    <option value="Jeunesse & Culture">Jeunesse & Culture</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Statut d'avancement</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="En cours">En cours</option>
                    <option value="En recherche de financement">En recherche de financement</option>
                    <option value="Planifié">Planifié</option>
                    <option value="Achevé">Achevé</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Avancement (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Budget prévisionnel</label>
                  <input
                    type="text"
                    value={budgetEstimated}
                    onChange={(e) => setBudgetEstimated(e.target.value)}
                    placeholder="ex: 15 000 000 FCFA"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Fonds collectés</label>
                  <input
                    type="text"
                    value={fundsRaised}
                    onChange={(e) => setFundsRaised(e.target.value)}
                    placeholder="ex: 6 500 000 FCFA"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Description générale</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Objectif du chantier pour le village..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Objectifs détaillés (1 par ligne)</label>
                <textarea
                  rows={3}
                  value={goalsRaw}
                  onChange={(e) => setGoalsRaw(e.target.value)}
                  placeholder="Objectif 1&#10;Objectif 2"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                {canPublish && (
                  <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-800 text-emerald-500"
                    />
                    <span>Publier sur la page Projets</span>
                  </label>
                )}
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
