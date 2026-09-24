import React, { useState, useEffect } from 'react';
import {
  X, Newspaper, AlertTriangle, Lightbulb, Mail, Handshake, HeartHandshake,
  Image, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Building2, MapPin,
  Calendar, Phone, User, DollarSign, Wallet, FileText, UploadCloud, Info
} from 'lucide-react';
import { CommunityFormType, CommunitySubmission, PaymentProviderType } from '../../types';
import { submitCommunityForm, PAYMENT_PROVIDERS } from '../../services/communityService';
import { ConfirmationReceiptCard } from './ConfirmationReceiptCard';
import { AntiSpamSecurityBlock } from './AntiSpamSecurityBlock';

interface CommunityActionHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormType?: CommunityFormType;
  onNavigateToParticipatory?: () => void;
  preselectedProjectTitle?: string;
}

const MATH_CHALLENGES = [
  { question: '4 + 3', expected: '7' },
  { question: '5 + 4', expected: '9' },
  { question: '6 + 2', expected: '8' },
  { question: '8 - 3', expected: '5' },
  { question: '3 + 6', expected: '9' },
];

export const CommunityActionHubModal: React.FC<CommunityActionHubModalProps> = ({
  isOpen,
  onClose,
  initialFormType = 'contact',
  onNavigateToParticipatory,
  preselectedProjectTitle,
}) => {
  const [activeFormType, setActiveFormType] = useState<CommunityFormType>(initialFormType);
  const [formLoadTimestamp, setFormLoadTimestamp] = useState<number>(Date.now());
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [humanAnswer, setHumanAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState<CommunitySubmission | null>(null);

  // Common contact states
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderLocation, setSenderLocation] = useState('');

  // 1. Actualité
  const [actuTitle, setActuTitle] = useState('');
  const [actuCategory, setActuCategory] = useState('Vie du village');
  const [actuDate, setActuDate] = useState(new Date().toISOString().split('T')[0]);
  const [actuLocation, setActuLocation] = useState('Ntolo Centre');
  const [actuContent, setActuContent] = useState('');
  const [actuMediaUrl, setActuMediaUrl] = useState('');
  const [actuAuthorRelation, setActuAuthorRelation] = useState('Résident de Ntolo');

  // 2. Besoin
  const [needTitle, setNeedTitle] = useState('');
  const [needType, setNeedType] = useState('Eau potable & Assainissement');
  const [specificLocation, setSpecificLocation] = useState('');
  const [affectedPeopleCount, setAffectedPeopleCount] = useState('Plusieurs familles du quartier');
  const [urgencyLevel, setUrgencyLevel] = useState<'normal' | 'important' | 'urgent'>('important');
  const [needDescription, setNeedDescription] = useState('');

  // 3. Projet
  const [projTitle, setProjTitle] = useState('');
  const [projSector, setProjSector] = useState('Eau & Assainissement');
  const [projBudget, setProjBudget] = useState('3500000');
  const [projDuration, setProjDuration] = useState('3 à 6 mois');
  const [projObjectives, setProjObjectives] = useState('');
  const [projBeneficiaries, setProjBeneficiaries] = useState('');
  const [projCoFinancing, setProjCoFinancing] = useState('');

  // 4. Contact
  const [contactSubject, setContactSubject] = useState('Demande d’audience coutumière');
  const [contactPreferredChannel, setContactPreferredChannel] = useState<'telephone' | 'whatsapp' | 'email' | 'palais'>('whatsapp');
  const [contactMessage, setContactMessage] = useState('');

  // 5. Partenaire
  const [partnerOrgName, setPartnerOrgName] = useState('');
  const [partnerOrgType, setPartnerOrgType] = useState<'ONG' | 'Entreprise' | 'Institution' | 'Association Diaspora' | 'Bailleur' | 'Mécène Particulier'>('ONG');
  const [partnerDomain, setPartnerDomain] = useState('Éducation & Enfance');
  const [partnerProposalText, setPartnerProposalText] = useState('');
  const [partnerWebsite, setPartnerWebsite] = useState('');

  // 6. Contribuer au développement (Architecture Paiement Futur)
  const [contribType, setContribType] = useState<'financier' | 'materiel' | 'competence' | 'parrainage'>('financier');
  const [pledgedAmount, setPledgedAmount] = useState('50000');
  const [currency, setCurrency] = useState<'FCFA' | 'EUR' | 'USD'>('FCFA');
  const [targetedProjectTitle, setTargetedProjectTitle] = useState(preselectedProjectTitle || 'Fonds Général de Développement de Ntolo');
  const [preferredProvider, setPreferredProvider] = useState<PaymentProviderType>('orange_money');
  const [materialDescription, setMaterialDescription] = useState('');
  const [skillsExpertise, setSkillsExpertise] = useState('');

  // 7. Média
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [mediaAlbum, setMediaAlbum] = useState('Culture, Traditions & Danses');
  const [mediaDateTaken, setMediaDateTaken] = useState(new Date().toISOString().split('T')[0]);
  const [mediaLocation, setMediaLocation] = useState('Ntolo');
  const [mediaFileUrl, setMediaFileUrl] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [mediaRightsRelease, setMediaRightsRelease] = useState(true);

  // Sync initial type
  useEffect(() => {
    if (initialFormType) {
      setActiveFormType(initialFormType);
    }
    if (preselectedProjectTitle) {
      setTargetedProjectTitle(preselectedProjectTitle);
    }
    setFormLoadTimestamp(Date.now());
    setChallengeIndex(Math.floor(Math.random() * MATH_CHALLENGES.length));
    setHumanAnswer('');
    setHoneypot('');
    setFormError('');
    setCompletedSubmission(null);
  }, [initialFormType, preselectedProjectTitle, isOpen]);

  if (!isOpen) return null;

  const currentChallenge = MATH_CHALLENGES[challengeIndex % MATH_CHALLENGES.length];

  const handleRefreshChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % MATH_CHALLENGES.length);
    setHumanAnswer('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    let formTitle = '';
    const payload: CommunitySubmission['payload'] = {};

    switch (activeFormType) {
      case 'actualite':
        if (!actuTitle.trim() || !actuContent.trim()) {
          setFormError('Veuillez renseigner le titre et le contenu de l’actualité.');
          setIsSubmitting(false);
          return;
        }
        formTitle = actuTitle;
        payload.actuCategory = actuCategory;
        payload.actuDate = actuDate;
        payload.actuLocation = actuLocation;
        payload.actuContent = actuContent;
        payload.actuAttachedMediaUrl = actuMediaUrl;
        payload.actuAuthorRelation = actuAuthorRelation;
        break;

      case 'besoin':
        if (!needTitle.trim() || !needDescription.trim() || !specificLocation.trim()) {
          setFormError('Veuillez préciser le besoin, le lieu précis et une brève description de l’impact.');
          setIsSubmitting(false);
          return;
        }
        formTitle = needTitle;
        payload.needType = needType;
        payload.specificLocation = specificLocation;
        payload.affectedPeopleCount = affectedPeopleCount;
        payload.urgencyLevel = urgencyLevel;
        payload.needDescription = needDescription;
        break;

      case 'projet':
        if (!projTitle.trim() || !projObjectives.trim()) {
          setFormError('Veuillez renseigner le titre du projet et ses principaux objectifs.');
          setIsSubmitting(false);
          return;
        }
        formTitle = projTitle;
        payload.projectSector = projSector;
        payload.projectEstimatedBudget = Number(projBudget) || 2500000;
        payload.projectEstimatedDuration = projDuration;
        payload.projectObjectives = projObjectives;
        payload.projectBeneficiaries = projBeneficiaries;
        payload.projectCoFinancingOffer = projCoFinancing;
        break;

      case 'contact':
        if (!contactSubject.trim() || !contactMessage.trim()) {
          setFormError('Veuillez préciser l’objet et le texte de votre message.');
          setIsSubmitting(false);
          return;
        }
        formTitle = contactSubject;
        payload.contactSubject = contactSubject;
        payload.contactPreferredChannel = contactPreferredChannel;
        payload.contactMessage = contactMessage;
        break;

      case 'partenaire':
        if (!partnerOrgName.trim() || !partnerProposalText.trim()) {
          setFormError('Veuillez renseigner le nom de l’organisation et votre proposition de partenariat.');
          setIsSubmitting(false);
          return;
        }
        formTitle = `Partenariat avec ${partnerOrgName}`;
        payload.partnerOrgName = partnerOrgName;
        payload.partnerOrgType = partnerOrgType;
        payload.partnerDomain = partnerDomain;
        payload.partnerProposalText = partnerProposalText;
        payload.partnerWebsite = partnerWebsite;
        break;

      case 'contribution':
        formTitle = `Contribution solidaire : ${targetedProjectTitle}`;
        payload.contributionType = contribType;
        payload.pledgedAmount = Number(pledgedAmount) || 50000;
        payload.currency = currency;
        payload.targetedProjectTitle = targetedProjectTitle;
        payload.materialDescription = materialDescription;
        payload.skillsExpertise = skillsExpertise;
        payload.paymentArchitecture = {
          intentStatus: 'pledge_recorded',
          preferredProvider,
          gatewayHookAvailable: true,
          notes: `Promesse de contribution enregistrée par ${senderName}. Phase 1 : sans prélèvement immédiat. Architecture de paiement prête pour raccordement direct.`,
        };
        break;

      case 'media':
        if (!mediaTitle.trim()) {
          setFormError('Veuillez fournir un titre ou une légende pour ce média.');
          setIsSubmitting(false);
          return;
        }
        if (!mediaRightsRelease) {
          setFormError('Veuillez cocher la décharge d’autorisation de publication pour le portail de Ntolo.');
          setIsSubmitting(false);
          return;
        }
        formTitle = mediaTitle;
        payload.mediaType = mediaType;
        payload.mediaAlbumTarget = mediaAlbum;
        payload.mediaDateTaken = mediaDateTaken;
        payload.mediaLocation = mediaLocation;
        payload.mediaFileUrl = mediaFileUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
        payload.mediaDescription = mediaDescription;
        payload.mediaRightsReleaseApproved = mediaRightsRelease;
        break;
    }

    const result = submitCommunityForm({
      type: activeFormType,
      title: formTitle,
      senderName,
      senderEmail,
      senderPhone,
      senderLocation,
      payload,
      honeypotTrap: honeypot,
      verificationAnswer: humanAnswer,
      expectedVerificationAnswer: currentChallenge.expected,
      formLoadTimestamp,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.errorMessage || 'Une erreur est survenue lors de la soumission.');
      return;
    }

    if (result.submission) {
      setCompletedSubmission(result.submission);
    }
  };

  const navTabs: { id: CommunityFormType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'actualite', label: 'Proposer une actualité', icon: Newspaper },
    { id: 'besoin', label: 'Signaler un besoin', icon: AlertTriangle },
    { id: 'projet', label: 'Proposer un projet', icon: Lightbulb },
    { id: 'contact', label: 'Nous contacter', icon: Mail },
    { id: 'partenaire', label: 'Devenir partenaire', icon: Handshake },
    { id: 'contribution', label: 'Contribuer au développement', icon: HeartHandshake },
    { id: 'media', label: 'Envoyer une photo / vidéo', icon: Image },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-emerald-950 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-emerald-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                  Participation Citoyenne & Communautaire
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-800 text-emerald-200">
                  Palais Royal & CODEV
                </span>
              </div>
              <h2 className="font-serif-royal text-lg sm:text-xl font-bold tracking-tight">
                Espace d’Action Communautaire de Ntolo
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-emerald-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection menu (7 forms) */}
        {!completedSubmission && (
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            {navTabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeFormType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActiveFormType(t.id);
                    setFormError('');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {completedSubmission ? (
            <ConfirmationReceiptCard
              submission={completedSubmission}
              onClose={onClose}
              onNavigateToParticipatory={onNavigateToParticipatory}
            />
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Form Title & Introduction Description */}
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  {activeFormType === 'actualite' && '1. Proposer une actualité pour le village'}
                  {activeFormType === 'besoin' && '2. Signaler un besoin ou un incident au village'}
                  {activeFormType === 'projet' && '3. Proposer un projet citoyen de développement'}
                  {activeFormType === 'contact' && '4. Nous contacter (Secrétariat & Chefferie)'}
                  {activeFormType === 'partenaire' && '5. Devenir partenaire du village de Ntolo'}
                  {activeFormType === 'contribution' && '6. Contribuer au développement de Ntolo (Souscription & Dons)'}
                  {activeFormType === 'media' && '7. Envoyer une photo ou une vidéo pour les archives du village'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Chaque soumission est enregistrée de façon sécurisée, fait l’objet d’un accusé de réception officiel et est transmise directement aux responsables du CODEV.
                </p>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Common Declarant Identity Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  Vos Coordonnées (Obligatoires pour le suivi du dossier)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nom et Prénom *</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Ex: Jean-Marc Mbassi"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Téléphone joignable / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="Ex: (+237) 699 00 00 00"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Adresse Email (Optionnelle)</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="Ex: contact@email.com"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Résidence / Lien avec Ntolo</label>
                    <input
                      type="text"
                      value={senderLocation}
                      onChange={(e) => setSenderLocation(e.target.value)}
                      placeholder="Ex: Ntolo Centre, Douala, Yaoundé, Paris..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* SPECIFIC FORM 1: ACTUALITÉ */}
              {activeFormType === 'actualite' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Titre de l’actualité / Événement *</label>
                    <input
                      type="text"
                      required
                      value={actuTitle}
                      onChange={(e) => setActuTitle(e.target.value)}
                      placeholder="Ex: Réussite des élèves au concours, Fête traditionnelle, Match amical..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Catégorie</label>
                      <select
                        value={actuCategory}
                        onChange={(e) => setActuCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="Vie du village">Vie du village</option>
                        <option value="Éducation">Éducation</option>
                        <option value="Culture">Culture</option>
                        <option value="Santé">Santé</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Jeunesse">Jeunesse & Sport</option>
                        <option value="Diaspora">Diaspora</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Date de l’événement</label>
                      <input
                        type="date"
                        value={actuDate}
                        onChange={(e) => setActuDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                      </input>
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Lieu précis dans Ntolo</label>
                      <input
                        type="text"
                        value={actuLocation}
                        onChange={(e) => setActuLocation(e.target.value)}
                        placeholder="Ex: École publique, Cour royale..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Texte détaillé de l’article / Témoignage *</label>
                    <textarea
                      rows={4}
                      required
                      value={actuContent}
                      onChange={(e) => setActuContent(e.target.value)}
                      placeholder="Décrivez les faits, les participants, les résultats..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Lien photo d'illustration ou nom du fichier joint (Optionnel)</label>
                    <input
                      type="url"
                      value={actuMediaUrl}
                      onChange={(e) => setActuMediaUrl(e.target.value)}
                      placeholder="https://... ou laissez vide pour une photo fournie au secrétariat"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC FORM 2: SIGNALER UN BESOIN */}
              {activeFormType === 'besoin' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Intitulé du besoin / Incident constaté *</label>
                    <input
                      type="text"
                      required
                      value={needTitle}
                      onChange={(e) => setNeedTitle(e.target.value)}
                      placeholder="Ex: Fuite d’eau à la borne-fontaine, Talus effondré sur la piste..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Domaine concerné</label>
                      <select
                        value={needType}
                        onChange={(e) => setNeedType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="Eau potable & Assainissement">Eau potable & Bornes-fontaines</option>
                        <option value="Infrastructures & Piste">Infrastructures & Voirie</option>
                        <option value="Électrification / Lampadaire">Électrification / Éclairage</option>
                        <option value="Santé / Dispensaire">Santé / Hygiène</option>
                        <option value="École / Bâtiment">Éducation / Écoles</option>
                        <option value="Agriculture & Élevage">Agriculture & Terres</option>
                        <option value="Sécurité / Coutume">Sécurité & Vigilance</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Niveau d'urgence</label>
                      <select
                        value={urgencyLevel}
                        onChange={(e) => setUrgencyLevel(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="normal">Normal (Amélioration générale)</option>
                        <option value="important">Important (Gêne quotidienne)</option>
                        <option value="urgent">Urgent (Risque ou rupture de service)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Lieu précis dans Ntolo *</label>
                      <input
                        type="text"
                        required
                        value={specificLocation}
                        onChange={(e) => setSpecificLocation(e.target.value)}
                        placeholder="Ex: Quartier Bas-Village, à 50m du pont..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Description détaillée du problème & impact sur les riverains *</label>
                    <textarea
                      rows={4}
                      required
                      value={needDescription}
                      onChange={(e) => setNeedDescription(e.target.value)}
                      placeholder="Expliquez ce qui ne va pas, depuis quand, et quelles conséquences cela engendre pour les familles..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC FORM 3: PROPOSER UN PROJET */}
              {activeFormType === 'projet' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Titre de votre projet citoyen *</label>
                    <input
                      type="text"
                      required
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="Ex: Aménagement d’un rucher communautaire, Éclairage solaire du stade..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Secteur d’intervention</label>
                      <select
                        value={projSector}
                        onChange={(e) => setProjSector(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="Eau & Assainissement">Eau & Assainissement</option>
                        <option value="Éducation">Éducation</option>
                        <option value="Santé">Santé</option>
                        <option value="Énergie & Routes">Énergie & Routes</option>
                        <option value="Jeunesse & Culture">Jeunesse & Culture</option>
                        <option value="Agriculture & Économie">Agriculture & Économie</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Budget estimatif (FCFA)</label>
                      <input
                        type="number"
                        value={projBudget}
                        onChange={(e) => setProjBudget(e.target.value)}
                        placeholder="Ex: 2500000"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Durée prévisionnelle</label>
                      <input
                        type="text"
                        value={projDuration}
                        onChange={(e) => setProjDuration(e.target.value)}
                        placeholder="Ex: 3 mois, 6 mois..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Objectifs précis & Description du projet *</label>
                    <textarea
                      rows={3}
                      required
                      value={projObjectives}
                      onChange={(e) => setProjObjectives(e.target.value)}
                      placeholder="Quels sont les résultats attendus ? Pourquoi ce projet est-il prioritaire pour Ntolo ?"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Bénéficiaires ciblés</label>
                      <input
                        type="text"
                        value={projBeneficiaries}
                        onChange={(e) => setProjBeneficiaries(e.target.value)}
                        placeholder="Ex: Élèves de l'école, Jeunes diplômés, Femmes agricultrices..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Apport communautaire ou co-financement proposé</label>
                      <input
                        type="text"
                        value={projCoFinancing}
                        onChange={(e) => setProjCoFinancing(e.target.value)}
                        placeholder="Ex: Main d'œuvre bénévole, don de bois, souscription diaspora..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900">
                    💡 <strong>Publication participative :</strong> Après instruction par la commission technique du CODEV, ce projet pourra être publié sur la page officielle des <strong>« Projets participatifs »</strong> pour consultation et mobilisation citoyenne.
                  </div>
                </div>
              )}

              {/* SPECIFIC FORM 4: NOUS CONTACTER */}
              {activeFormType === 'contact' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Objet de votre démarche *</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                      >
                        <option value="Demande d’audience coutumière avec Sa Majesté">Demande d’audience coutumière avec Sa Majesté</option>
                        <option value="Question administrative au Secrétariat du CODEV">Question administrative au Secrétariat du CODEV</option>
                        <option value="Doléance ou litige foncier / familial">Doléance ou arbitrage coutumier</option>
                        <option value="Prise de contact Diaspora">Prise de contact Diaspora</option>
                        <option value="Renseignement sur les actes d'état civil">Renseignement administratif & état civil</option>
                        <option value="Autre demande">Autre demande</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Canal de réponse préféré</label>
                      <select
                        value={contactPreferredChannel}
                        onChange={(e) => setContactPreferredChannel(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="whatsapp">WhatsApp / Appel direct</option>
                        <option value="telephone">Appel téléphonique traditionnel</option>
                        <option value="email">Courrier électronique (Email)</option>
                        <option value="palais">Rendez-vous physique au Palais Royal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Votre message / exposé des faits *</label>
                    <textarea
                      rows={5}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Rédigez votre demande avec clarté. Mentionnez les dates ou références utiles..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC FORM 5: DEVENIR PARTENAIRE */}
              {activeFormType === 'partenaire' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Nom de l’organisme ou entité *</label>
                      <input
                        type="text"
                        required
                        value={partnerOrgName}
                        onChange={(e) => setPartnerOrgName(e.target.value)}
                        placeholder="Ex: Fondation Solidarité, Entreprise BTP, ONG Éco..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Statut / Type de structure</label>
                      <select
                        value={partnerOrgType}
                        onChange={(e) => setPartnerOrgType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="ONG">ONG / Organisation internationale</option>
                        <option value="Entreprise">Entreprise privée / Mécénat d'entreprise</option>
                        <option value="Institution">Institution publique / Coopération décentralisée</option>
                        <option value="Association Diaspora">Association ou collectif de la Diaspora</option>
                        <option value="Bailleur">Bailleur de fonds / Agence de développement</option>
                        <option value="Mécène Particulier">Particulier mécène / Philanthrope</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Axe de coopération souhaité</label>
                      <select
                        value={partnerDomain}
                        onChange={(e) => setPartnerDomain(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="Adduction d’Eau & Assainissement">Adduction d’Eau & Assainissement</option>
                        <option value="Éducation, Écoles & Bourses">Éducation, Écoles & Bourses</option>
                        <option value="Santé, Maternité & Pharmacie">Santé, Maternité & Pharmacie</option>
                        <option value="Énergie solaire & Pistes rurales">Énergie solaire & Pistes rurales</option>
                        <option value="Agriculture durable & Cacao">Agriculture durable & Cacao</option>
                        <option value="Patrimoine culturel & Tourisme">Patrimoine culturel & Tourisme</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Site internet ou document de présentation</label>
                      <input
                        type="url"
                        value={partnerWebsite}
                        onChange={(e) => setPartnerWebsite(e.target.value)}
                        placeholder="https://votre-organisation.org"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Lettre d’intention ou proposition de partenariat *</label>
                    <textarea
                      rows={4}
                      required
                      value={partnerProposalText}
                      onChange={(e) => setPartnerProposalText(e.target.value)}
                      placeholder="Précisez la nature de votre appui (financement, expertise technique, dons de matériel, jumelage institutionnel)..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC FORM 6: CONTRIBUER AU DÉVELOPPEMENT (ARCHITECTURE PAIEMENT FUTUR) */}
              {activeFormType === 'contribution' && (
                <div className="space-y-4 text-xs">
                  {/* Strategic disclaimer about future payment architecture */}
                  <div className="p-3.5 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl border border-amber-300 text-amber-950 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                      <span>Architecture de Paiement Intégrée (Enregistrement de Souscription & Promesse)</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-700">
                      Conformément à la gouvernance financière du CODEV, aucune collecte d’argent en direct n’est débitée sur cette version.
                      Votre promesse de souscription génère un <strong>bordereau officiel numéroté</strong> répertorié au secrétariat. Les passerelles de paiement automatisées (Orange Money, MTN MoMo, Carte Bancaire) seront activées lors de la phase 2.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Nature de votre contribution *</label>
                      <select
                        value={contribType}
                        onChange={(e) => setContribType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="financier">Promesse financière / Don en numéraire</option>
                        <option value="materiel">Don de matériel (ciment, tôle, médicaments, livres...)</option>
                        <option value="competence">Mise à disposition de compétences / Bénévolat</option>
                        <option value="parrainage">Parrainage d'un élève ou apprenti de Ntolo</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Projet de destination</label>
                      <input
                        type="text"
                        value={targetedProjectTitle}
                        onChange={(e) => setTargetedProjectTitle(e.target.value)}
                        placeholder="Ex: Forage d'eau, Maternité, Fonds général..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                      />
                    </div>
                  </div>

                  {contribType === 'financier' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Montant de la promesse (FCFA ou EUR) *</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              required
                              value={pledgedAmount}
                              onChange={(e) => setPledgedAmount(e.target.value)}
                              placeholder="50000"
                              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-sm focus:ring-1 focus:ring-emerald-700"
                            />
                            <select
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value as any)}
                              className="w-24 px-2 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold"
                            >
                              <option value="FCFA">FCFA</option>
                              <option value="EUR">Euros (€)</option>
                              <option value="USD">USD ($)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Mode de règlement préféré (futur raccordement)</label>
                          <select
                            value={preferredProvider}
                            onChange={(e) => setPreferredProvider(e.target.value as PaymentProviderType)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-medium"
                          >
                            {PAYMENT_PROVIDERS.map((pr) => (
                              <option key={pr.id} value={pr.id}>
                                {pr.name} ({pr.badge})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Provider instruction hint */}
                      <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                        {PAYMENT_PROVIDERS.find((p) => p.id === preferredProvider)?.instructions}
                      </div>
                    </div>
                  )}

                  {contribType === 'materiel' && (
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Détails des matériels ou équipements proposés *</label>
                      <textarea
                        rows={3}
                        required
                        value={materialDescription}
                        onChange={(e) => setMaterialDescription(e.target.value)}
                        placeholder="Ex: 50 sacs de ciment pour le radier, 15 kits de secours pour la maternité, 10 cartons de livres..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  )}

                  {contribType === 'competence' && (
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Compétence métier & disponibilité pour le village *</label>
                      <textarea
                        rows={3}
                        required
                        value={skillsExpertise}
                        onChange={(e) => setSkillsExpertise(e.target.value)}
                        placeholder="Ex: Ingénieur génie civil (suivi de chantier), Médecin (consultations foraines gratuites), Enseignant..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* SPECIFIC FORM 7: ENVOYER UNE PHOTO OU VIDÉO */}
              {activeFormType === 'media' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Titre ou légende descriptive du document *</label>
                    <input
                      type="text"
                      required
                      value={mediaTitle}
                      onChange={(e) => setMediaTitle(e.target.value)}
                      placeholder="Ex: Cérémonie d’intronisation, Cascades de Ntolo après la pluie, Récolte de cacao..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Type de média</label>
                      <select
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700 font-semibold"
                      >
                        <option value="photo">Photographie</option>
                        <option value="video">Vidéo / Reportage</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Album thématique cible</label>
                      <select
                        value={mediaAlbum}
                        onChange={(e) => setMediaAlbum(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="Culture, Traditions & Danses">Culture, Traditions & Danses</option>
                        <option value="Ntolo aujourd'hui">Ntolo aujourd'hui</option>
                        <option value="Paysages & Forêts">Paysages & Forêts</option>
                        <option value="Agriculture & Marché">Agriculture & Marché</option>
                        <option value="Cérémonies & Notables">Cérémonies & Notables</option>
                        <option value="Grands Projets & Chantiers">Grands Projets & Chantiers</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Date approximative de prise de vue</label>
                      <input
                        type="date"
                        value={mediaDateTaken}
                        onChange={(e) => setMediaDateTaken(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Lien direct de l'image / vidéo (ou lien Drive / Cloud)</label>
                    <input
                      type="url"
                      value={mediaFileUrl}
                      onChange={(e) => setMediaFileUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... ou lien Google Drive / WeTransfer"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Vous pouvez également faire parvenir vos fichiers volumineux par WhatsApp au secrétariat après obtention du code de suivi.
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Précisions sur le lieu et les personnes photographiées</label>
                    <textarea
                      rows={3}
                      value={mediaDescription}
                      onChange={(e) => setMediaDescription(e.target.value)}
                      placeholder="Identifiez les anciens, le lieu exact, l'occasion coutumière..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      id="mediaRights"
                      checked={mediaRightsRelease}
                      onChange={(e) => setMediaRightsRelease(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700"
                    />
                    <label htmlFor="mediaRights" className="text-slate-700 text-[11px] leading-tight cursor-pointer">
                      <strong>Cession gracieuse pour le patrimoine de Ntolo :</strong> J'autorise la Chefferie Traditionnelle et le Comité de Développement de Ntolo à reproduire et diffuser ce média sur le portail officiel et ses publications patrimoniales avec mention de mon nom d'auteur.
                    </label>
                  </div>
                </div>
              )}

              {/* Anti-Spam Security Module */}
              <AntiSpamSecurityBlock
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                mathChallenge={currentChallenge}
                humanAnswer={humanAnswer}
                setHumanAnswer={setHumanAnswer}
                onRefreshChallenge={handleRefreshChallenge}
              />

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Traitement sous 48h par le Secrétariat du CODEV.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold shadow-md disabled:opacity-60 transition-colors"
                  >
                    {isSubmitting ? (
                      <span>Vérification & Envoi...</span>
                    ) : (
                      <>
                        <span>Transmettre mon dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
