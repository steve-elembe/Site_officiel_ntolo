import React, { useState, useEffect } from 'react';
import {
  Inbox, Filter, Search, CheckCircle2, Clock, AlertTriangle, Newspaper,
  Lightbulb, Mail, Handshake, HeartHandshake, Image, Trash2, ArrowUpRight,
  ShieldCheck, Eye, Phone, MapPin, User, FileText, Send, Sparkles
} from 'lucide-react';
import { CommunitySubmission, CommunityFormType, CommunityStatus, UserRole } from '../../../types';
import {
  getStoredCommunitySubmissions,
  updateCommunitySubmissionStatus,
  deleteCommunitySubmission,
  convertSubmissionToParticipatoryProject,
  EVENT_COMMUNITY_DATA_CHANGED,
} from '../../../services/communityService';
import { savePublication } from '../../../services/publicationService';
import { saveMediaItem } from '../../../services/galleryService';

interface CommunitySubmissionsTabProps {
  userRole: UserRole;
  currentUserName: string;
}

export const CommunitySubmissionsTab: React.FC<CommunitySubmissionsTabProps> = ({
  userRole,
  currentUserName,
}) => {
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<CommunitySubmission | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  const loadData = () => {
    setSubmissions(getStoredCommunitySubmissions());
  };

  useEffect(() => {
    loadData();
    window.addEventListener(EVENT_COMMUNITY_DATA_CHANGED, loadData);
    return () => {
      window.removeEventListener(EVENT_COMMUNITY_DATA_CHANGED, loadData);
    };
  }, []);

  const handleStatusChange = (id: string, newStatus: CommunityStatus) => {
    updateCommunitySubmissionStatus(id, newStatus, editingNotes || undefined, currentUserName);
    loadData();
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus, adminNotes: editingNotes || prev.adminNotes } : null);
    }
    showToast(`Statut mis à jour : ${newStatus.toUpperCase()}`);
  };

  const handleSaveNotes = (id: string) => {
    if (!selectedSubmission) return;
    updateCommunitySubmissionStatus(id, selectedSubmission.status, editingNotes, currentUserName);
    loadData();
    setSelectedSubmission((prev) => prev ? { ...prev, adminNotes: editingNotes } : null);
    showToast('Notes administratives enregistrées.');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Confirmez-vous la suppression de cette soumission ?')) {
      deleteCommunitySubmission(id);
      setSelectedSubmission(null);
      loadData();
      showToast('Soumission supprimée.');
    }
  };

  const handleConvertToProject = (sub: CommunitySubmission) => {
    const proj = convertSubmissionToParticipatoryProject(sub);
    loadData();
    setSelectedSubmission(null);
    showToast(`Projet citoyen converti et publié avec succès sur la page "Projets participatifs" ! (ID: ${proj.id})`);
  };

  const handleConvertToPublication = (sub: CommunitySubmission) => {
    const newArticle = {
      id: `actu-${Date.now()}`,
      title: sub.title,
      slug: sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      summary: sub.payload.actuContent ? sub.payload.actuContent.slice(0, 150) + '...' : sub.title,
      content: sub.payload.actuContent ? [sub.payload.actuContent] : [sub.title],
      category: (sub.payload.actuCategory as any) || 'Vie du village',
      author: `${sub.senderName} (Correspondant Citoyen)`,
      authorRole: 'Contribution Citoyenne Vérifiée',
      date: sub.payload.actuDate || new Date().toISOString().split('T')[0],
      imageUrl: sub.payload.actuAttachedMediaUrl || '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
      published: true,
      readTimeMinutes: 3,
      viewsCount: 1,
    };
    savePublication(newArticle);
    updateCommunitySubmissionStatus(sub.id, 'traite', 'Validé et publié dans le fil d’actualités officiel.', currentUserName);
    loadData();
    setSelectedSubmission(null);
    showToast('Actualité citoyenne validée et insérée dans les publications officielles !');
  };

  const handleConvertToGalleryPhoto = (sub: CommunitySubmission) => {
    const newItem = {
      id: `med-${Date.now()}`,
      title: sub.title,
      caption: sub.payload.mediaDescription || `Prise de vue à ${sub.payload.mediaLocation || 'Ntolo'} par ${sub.senderName}`,
      mediaUrl: sub.payload.mediaFileUrl || '/src/assets/images/hero_ntolo_moungo_1790154817063.jpg',
      album: (sub.payload.mediaAlbumTarget as any) || 'Ntolo aujourd’hui',
      date: sub.payload.mediaDateTaken || new Date().toISOString().split('T')[0],
      location: sub.payload.mediaLocation || 'Ntolo',
      author: sub.senderName,
      type: (sub.payload.mediaType as any) || 'photo',
      viewsCount: 1,
    };
    saveMediaItem(newItem);
    updateCommunitySubmissionStatus(sub.id, 'traite', 'Photo ajoutée à la galerie officielle du village.', currentUserName);
    loadData();
    setSelectedSubmission(null);
    showToast('Document photo ajouté avec succès à la Galerie du village !');
  };

  const showToast = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(''), 4000);
  };

  // Filtered list
  const filtered = submissions.filter((s) => {
    if (selectedType !== 'all' && s.type !== selectedType) return false;
    if (selectedStatus !== 'all' && s.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTrack = s.trackingCode.toLowerCase().includes(q);
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchSender = s.senderName.toLowerCase().includes(q);
      const matchPhone = s.senderPhone.toLowerCase().includes(q);
      if (!matchTrack && !matchTitle && !matchSender && !matchPhone) return false;
    }
    return true;
  });

  const countRecu = submissions.filter((s) => s.status === 'recu').length;
  const countEnCours = submissions.filter((s) => s.status === 'en_cours').length;
  const countTraite = submissions.filter((s) => s.status === 'traite').length;

  const getTypeIcon = (type: CommunityFormType) => {
    switch (type) {
      case 'actualite': return Newspaper;
      case 'besoin': return AlertTriangle;
      case 'projet': return Lightbulb;
      case 'contact': return Mail;
      case 'partenaire': return Handshake;
      case 'contribution': return HeartHandshake;
      case 'media': return Image;
      default: return Inbox;
    }
  };

  const getTypeBadge = (type: CommunityFormType) => {
    switch (type) {
      case 'actualite': return { label: 'Actualité', bg: 'bg-blue-100 text-blue-900 border-blue-200' };
      case 'besoin': return { label: 'Besoin / Alerte', bg: 'bg-red-100 text-red-900 border-red-200' };
      case 'projet': return { label: 'Projet Citoyen', bg: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      case 'contact': return { label: 'Contact & Requête', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
      case 'partenaire': return { label: 'Partenariat', bg: 'bg-indigo-100 text-indigo-900 border-indigo-200' };
      case 'contribution': return { label: 'Contribution', bg: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'media': return { label: 'Photo / Vidéo', bg: 'bg-purple-100 text-purple-900 border-purple-200' };
      default: return { label: 'Soumission', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionSuccessMessage && (
        <div className="p-3 bg-emerald-900 text-emerald-100 rounded-2xl border border-emerald-700 text-xs font-bold shadow-lg flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif-royal font-bold text-slate-900">
              Contributions Citoyennes & Requêtes des 7 Formulaires
            </h2>
            {countRecu > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 animate-pulse">
                {countRecu} Reçu{countRecu > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Traitement, instruction et suivi des démarches citoyennes enregistrées depuis les formulaires publics.
          </p>
        </div>

        {/* Status Pill Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedStatus('recu')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              selectedStatus === 'recu' ? 'bg-amber-500 text-stone-950 shadow' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Reçus ({countRecu})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('en_cours')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              selectedStatus === 'en_cours' ? 'bg-blue-600 text-white shadow' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>En cours ({countEnCours})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('traite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              selectedStatus === 'traite' ? 'bg-emerald-700 text-white shadow' : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Traités ({countTraite})</span>
          </button>
        </div>
      </div>

      {/* Toolbar filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher code, nom, objet..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        {/* Filter type */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800"
          >
            <option value="all">Tous les types ({submissions.length})</option>
            <option value="actualite">1. Actualités proposées</option>
            <option value="besoin">2. Besoins & Alertes signalés</option>
            <option value="projet">3. Projets proposés</option>
            <option value="contact">4. Messages & Requêtes</option>
            <option value="partenaire">5. Candidatures Partenaires</option>
            <option value="contribution">6. Contributions & Promesses</option>
            <option value="media">7. Photos & Vidéos reçues</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800"
          >
            <option value="all">Tous les statuts</option>
            <option value="recu">Statut : Reçu</option>
            <option value="en_cours">Statut : En cours</option>
            <option value="traite">Statut : Traité</option>
          </select>

          {(selectedType !== 'all' || selectedStatus !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedType('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline whitespace-nowrap ml-1"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-sm">Aucune requête trouvée</h4>
            <p className="text-xs text-slate-400">Aucune soumission ne correspond aux filtres actuels.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((sub) => {
              const Icon = getTypeIcon(sub.type);
              const badge = getTypeBadge(sub.type);

              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubmission(sub);
                    setEditingNotes(sub.adminNotes || '');
                  }}
                  className={`p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    sub.status === 'recu' ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-emerald-800" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {sub.trackingCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {sub.submittedAt}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                        {sub.title}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{sub.senderName}</span>
                        <span>•</span>
                        <span className="font-mono">{sub.senderPhone}</span>
                        {sub.senderLocation && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[150px]">{sub.senderLocation}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Quick actions */}
                  <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      sub.status === 'recu' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                      sub.status === 'en_cours' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                      'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        sub.status === 'recu' ? 'bg-amber-500' :
                        sub.status === 'en_cours' ? 'bg-blue-500' : 'bg-emerald-600'
                      }`} />
                      <span>
                        {sub.status === 'recu' ? 'Reçu' : sub.status === 'en_cours' ? 'En cours' : 'Traité'}
                      </span>
                    </span>

                    <button
                      type="button"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Consulter le dossier"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {selectedSubmission.trackingCode}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Enregistré le {selectedSubmission.submittedAt}
                  </span>
                </div>
                <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedSubmission.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Declarant coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Expéditeur / Déclarant :</span>
                <strong className="text-slate-900 text-sm">{selectedSubmission.senderName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Téléphone / WhatsApp :</span>
                <strong className="text-slate-900 font-mono text-sm">{selectedSubmission.senderPhone}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Courriel :</span>
                <span className="text-slate-700 font-mono">{selectedSubmission.senderEmail || 'Non communiqué'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Résidence / Lien avec Ntolo :</span>
                <span className="text-slate-800 font-medium">{selectedSubmission.senderLocation || 'Non précisé'}</span>
              </div>
            </div>

            {/* Payload details based on form type */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-900">
                Contenu du Dossier Transmis
              </h4>

              {/* 1. Actualité */}
              {selectedSubmission.type === 'actualite' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Catégorie :</strong> {selectedSubmission.payload.actuCategory}</span>
                    <span><strong>Date :</strong> {selectedSubmission.payload.actuDate}</span>
                    <span><strong>Lieu :</strong> {selectedSubmission.payload.actuLocation}</span>
                  </div>
                  <div>
                    <strong>Texte de l'actualité :</strong>
                    <p className="mt-1 text-slate-700 whitespace-pre-line leading-relaxed">{selectedSubmission.payload.actuContent}</p>
                  </div>
                </div>
              )}

              {/* 2. Besoin */}
              {selectedSubmission.type === 'besoin' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Domaine :</strong> {selectedSubmission.payload.needType}</span>
                    <span><strong>Urgence :</strong> <span className="font-bold text-red-700">{selectedSubmission.payload.urgencyLevel?.toUpperCase()}</span></span>
                    <span><strong>Lieu précis :</strong> {selectedSubmission.payload.specificLocation}</span>
                  </div>
                  <div>
                    <strong>Description de l'incident / besoin :</strong>
                    <p className="mt-1 text-slate-700 whitespace-pre-line leading-relaxed">{selectedSubmission.payload.needDescription}</p>
                  </div>
                </div>
              )}

              {/* 3. Projet */}
              {selectedSubmission.type === 'projet' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Secteur :</strong> {selectedSubmission.payload.projectSector}</span>
                    <span><strong>Budget estimé :</strong> {Number(selectedSubmission.payload.projectEstimatedBudget)?.toLocaleString('fr-FR')} FCFA</span>
                    <span><strong>Durée :</strong> {selectedSubmission.payload.projectEstimatedDuration}</span>
                  </div>
                  <div>
                    <strong>Objectifs :</strong>
                    <p className="mt-1 text-slate-700">{selectedSubmission.payload.projectObjectives}</p>
                  </div>
                  <div>
                    <strong>Bénéficiaires & Apport :</strong>
                    <p className="mt-1 text-slate-700">{selectedSubmission.payload.projectBeneficiaries} | {selectedSubmission.payload.projectCoFinancingOffer}</p>
                  </div>
                </div>
              )}

              {/* 4. Contact */}
              {selectedSubmission.type === 'contact' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div>
                    <span><strong>Canal souhaité :</strong> {selectedSubmission.payload.contactPreferredChannel}</span>
                  </div>
                  <div>
                    <strong>Message :</strong>
                    <p className="mt-1 text-slate-700 whitespace-pre-line leading-relaxed">{selectedSubmission.payload.contactMessage}</p>
                  </div>
                </div>
              )}

              {/* 5. Partenaire */}
              {selectedSubmission.type === 'partenaire' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Structure :</strong> {selectedSubmission.payload.partnerOrgName} ({selectedSubmission.payload.partnerOrgType})</span>
                    <span><strong>Domaine :</strong> {selectedSubmission.payload.partnerDomain}</span>
                  </div>
                  {selectedSubmission.payload.partnerWebsite && (
                    <div>
                      <span><strong>Site :</strong> <a href={selectedSubmission.payload.partnerWebsite} target="_blank" rel="noreferrer" className="text-emerald-700 underline">{selectedSubmission.payload.partnerWebsite}</a></span>
                    </div>
                  )}
                  <div>
                    <strong>Proposition :</strong>
                    <p className="mt-1 text-slate-700 whitespace-pre-line">{selectedSubmission.payload.partnerProposalText}</p>
                  </div>
                </div>
              )}

              {/* 6. Contribution */}
              {selectedSubmission.type === 'contribution' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Type :</strong> {selectedSubmission.payload.contributionType}</span>
                    <span><strong>Projet cible :</strong> {selectedSubmission.payload.targetedProjectTitle}</span>
                  </div>
                  {selectedSubmission.payload.pledgedAmount && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-bold text-amber-900">
                      Montant souscrit : {selectedSubmission.payload.pledgedAmount.toLocaleString('fr-FR')} {selectedSubmission.payload.currency || 'FCFA'}
                    </div>
                  )}
                  {selectedSubmission.payload.paymentArchitecture && (
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600">
                      <strong>Architecture passerelle :</strong> Mode simulation / Enregistrement officiel. Prestataire pressenti : {selectedSubmission.payload.paymentArchitecture.preferredProvider}.
                    </div>
                  )}
                </div>
              )}

              {/* 7. Media */}
              {selectedSubmission.type === 'media' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex gap-4">
                    <span><strong>Type :</strong> {selectedSubmission.payload.mediaType}</span>
                    <span><strong>Album :</strong> {selectedSubmission.payload.mediaAlbumTarget}</span>
                    <span><strong>Lieu/Date :</strong> {selectedSubmission.payload.mediaLocation} ({selectedSubmission.payload.mediaDateTaken})</span>
                  </div>
                  {selectedSubmission.payload.mediaFileUrl && (
                    <div className="pt-2">
                      <img
                        src={selectedSubmission.payload.mediaFileUrl}
                        alt="Aperçu média"
                        className="max-h-48 rounded-xl object-cover border border-slate-200"
                      />
                    </div>
                  )}
                  <p className="text-slate-700">{selectedSubmission.payload.mediaDescription}</p>
                </div>
              )}
            </div>

            {/* Anti-spam validation pass report */}
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>Contrôle anti-spam validé : Pas de robot détecté, question de sécurité réussie.</span>
            </div>

            {/* Processing status management buttons */}
            <div className="p-4 bg-slate-100 rounded-2xl space-y-3">
              <span className="font-bold text-xs text-slate-800 block">
                Statut du traitement administratif (Reçu → En cours → Traité) :
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'recu')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedSubmission.status === 'recu' ? 'bg-amber-500 text-stone-950 font-black shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  1. Marquer Reçu
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'en_cours')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedSubmission.status === 'en_cours' ? 'bg-blue-600 text-white font-black shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  2. Marquer En cours d'instruction
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'traite')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedSubmission.status === 'traite' ? 'bg-emerald-700 text-white font-black shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  3. Marquer Traité / Clôturé
                </button>
              </div>

              {/* Admin notes input */}
              <div className="pt-2">
                <label className="font-bold text-xs text-slate-700 block mb-1">
                  Notes internes du Secrétariat / Décision CODEV :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Ex: Dossier validé par Sa Majesté, transmis à la commission voirie..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNotes(selectedSubmission.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
                  >
                    Enregistrer la note
                  </button>
                </div>
              </div>
            </div>

            {/* Direct conversion actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
              {selectedSubmission.type === 'projet' && (
                <button
                  type="button"
                  onClick={() => handleConvertToProject(selectedSubmission)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 shadow transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Publier sur la page "Projets participatifs"</span>
                </button>
              )}

              {selectedSubmission.type === 'actualite' && (
                <button
                  type="button"
                  onClick={() => handleConvertToPublication(selectedSubmission)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 text-white font-bold text-xs hover:bg-blue-900 shadow transition-colors"
                >
                  <Newspaper className="w-3.5 h-3.5 text-blue-200" />
                  <span>Insérer dans les actualités officielles</span>
                </button>
              )}

              {selectedSubmission.type === 'media' && (
                <button
                  type="button"
                  onClick={() => handleConvertToGalleryPhoto(selectedSubmission)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-800 text-white font-bold text-xs hover:bg-purple-900 shadow transition-colors"
                >
                  <Image className="w-3.5 h-3.5 text-purple-200" />
                  <span>Ajouter à la Galerie photos du village</span>
                </button>
              )}

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  title="Supprimer la soumission"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
