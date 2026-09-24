/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Page "Devenir Partenaire" & Formulaire Officiel de Sponsoring
 * Village de Ntolo (Nlonako, Moungo, Cameroun)
 */

import React, { useState } from 'react';
import {
  Handshake, ShieldCheck, FileText, CheckCircle2, Send,
  CreditCard, Smartphone, Building, User, Mail, Phone,
  Globe, AlertCircle, Award, Sparkles, Download, ArrowLeft
} from 'lucide-react';
import { PageId, SponsorshipLevel, PaymentProviderType } from '../types';
import { PARTNERSHIP_CHARTER, SPONSORSHIP_TIERS } from '../services/partnerService';
import { initiatePaymentIntent, PaymentTransaction } from '../services/paymentService';
import { isValidEmail, isValidPhone, sanitizeText } from '../utils/securityUtils';
import { submitCommunityForm } from '../services/communityService';
import { SocialShareBar } from '../components/common/SocialShareBar';

interface DevenirPartenaireViewProps {
  onNavigate: (page: PageId) => void;
}

export const DevenirPartenaireView: React.FC<DevenirPartenaireViewProps> = ({ onNavigate }) => {
  // Formulaire d'engagement
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<'Entreprise' | 'ONG' | 'Institution' | 'Association Diaspora' | 'Mécène Particulier'>('Entreprise');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedTier, setSelectedTier] = useState<SponsorshipLevel>('or');
  const [contributionType, setContributionType] = useState<'financier' | 'materiel' | 'technique' | 'mixte'>('financier');
  const [targetProject, setTargetProject] = useState('Adduction d’Eau Potable & Forage Solaire');
  const [pledgedAmount, setPledgedAmount] = useState('2500000');
  const [proposalDetails, setProposalDetails] = useState('');
  const [charterAccepted, setCharterAccepted] = useState(false);

  // Anti-spam
  const [honeypot, setHoneypot] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Mode paiement en ligne direct (optionnel / simulation bac à sable)
  const [enableInstantPayment, setEnableInstantPayment] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProviderType>('orange_money');

  // Statuts de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    trackingCode: string;
    transaction?: PaymentTransaction;
    ussdPrompt?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Validations de sécurité
    if (honeypot) return; // Silent discard for bot

    if (securityAnswer.trim() !== '7') {
      setErrorMessage('Réponse de sécurité incorrecte (Calcul : 4 + 3 = ?).');
      return;
    }

    if (!orgName.trim() || !contactName.trim()) {
      setErrorMessage('Veuillez renseigner le nom de votre organisation et du responsable.');
      return;
    }

    if (!isValidEmail(contactEmail)) {
      setErrorMessage('Veuillez fournir une adresse e-mail valide pour recevoir l’attestation.');
      return;
    }

    if (!isValidPhone(contactPhone)) {
      setErrorMessage('Veuillez fournir un numéro de téléphone valide.');
      return;
    }

    if (!charterAccepted) {
      setErrorMessage('L’adhésion formelle à la Charte Éthique de Ntolo est requise pour tout partenariat.');
      return;
    }

    setIsSubmitting(true);

    try {
      let tx: PaymentTransaction | undefined;
      let ussdPrompt: string | undefined;

      // Si le partenaire souhaite tester ou exécuter le versement immédiat
      if (enableInstantPayment && contributionType === 'financier') {
        const numAmount = parseInt(pledgedAmount.replace(/[^0-9]/g, ''), 10) || 500000;
        const res = await initiatePaymentIntent({
          provider: paymentProvider,
          amountFCFA: numAmount,
          contributorName: `${orgName} (Réf: ${contactName})`,
          contributorPhone: contactPhone,
          contributorEmail: contactEmail,
          projectTargetTitle: targetProject,
          sandboxMode: true, // Simulation sécurisée
        });
        if (res.success) {
          tx = res.transaction;
          ussdPrompt = res.ussdPromptInstruction;
        }
      }

      // Enregistrement de la soumission dans le registre officiel des requêtes de la Chefferie
      const res = submitCommunityForm({
        type: 'partenaire',
        title: `Candidature Partenariale : ${sanitizeText(orgName)} (${orgType})`,
        senderName: sanitizeText(contactName),
        senderEmail: contactEmail.trim(),
        senderPhone: contactPhone.trim(),
        senderLocation: orgName.trim(),
        honeypotTrap: honeypot,
        verificationAnswer: securityAnswer,
        expectedVerificationAnswer: '7',
        payload: {
          partnerOrgName: sanitizeText(orgName),
          partnerOrgType: orgType,
          partnerDomain: targetProject,
          partnerWebsite: sanitizeText(website),
          partnerProposalText: sanitizeText(proposalDetails),
          pledgedAmount: parseInt(pledgedAmount.replace(/[^0-9]/g, ''), 10) || undefined,
          contributionType: contributionType,
          targetedProjectTitle: targetProject,
        },
      });

      if (!res.success || !res.submission) {
        setErrorMessage(res.errorMessage || 'Erreur lors de l’enregistrement du dossier.');
        setIsSubmitting(false);
        return;
      }

      setSubmissionReceipt({
        trackingCode: res.submission.trackingCode,
        transaction: tx,
        ussdPrompt: ussdPrompt,
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('Une erreur est survenue lors de l’envoi. Veuillez réessayer ou contacter le Secrétariat par WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="relative mx-3 sm:mx-6 lg:mx-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-8 sm:p-14 border border-emerald-800 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <button
            onClick={() => onNavigate('partenaires')}
            className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'annuaire des partenaires</span>
          </button>

          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Handshake className="w-3.5 h-3.5 text-amber-400" />
            <span>CANDIDATURE & PROTOCOLE D'ACCORD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-royal font-bold text-white tracking-tight">
            Devenir Partenaire Officiel de Ntolo
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
            Associez le nom et les valeurs de votre institution ou entreprise au développement d'un terroir authentique du Moungo. Transmettez votre proposition formelle au CODEV et au Cabinet de Sa Majesté.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Colonne Gauche : Charte Éthique & Paliers */}
        <div className="lg:col-span-5 space-y-8">
          {/* Charte */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-royal font-bold text-slate-900 text-lg">
                  {PARTNERSHIP_CHARTER.title}
                </h3>
                <p className="text-xs text-slate-500">Règlement approuvé par l'Assemblée des Notables</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic bg-amber-50/80 p-3 rounded-xl border border-amber-200/70">
              « {PARTNERSHIP_CHARTER.preamble} »
            </p>

            <div className="space-y-3">
              {PARTNERSHIP_CHARTER.principles.map((p, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{p.title}</span>
                  </h4>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rappel des 4 Paliers */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Grille indicative des parrainages
            </h4>
            <div className="space-y-2 text-xs">
              {SPONSORSHIP_TIERS.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between"
                >
                  <span className="font-bold text-slate-800">{t.label}</span>
                  <span className="font-semibold text-emerald-800">
                    dès {t.minAmountFCFA.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Les dons en nature (matériaux BTP, ordinateurs, matériel médical) sont valorisés à leur valeur marchande certifiée.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Formulaire Officiel */}
        <div className="lg:col-span-7">
          {submissionReceipt ? (
            /* Écran de confirmation solennelle avec Récépissé */
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-300 shadow-xl space-y-6 text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Dossier Partenaire Enregistré
                </span>
                <h3 className="text-2xl font-serif-royal font-bold text-slate-900">
                  Récépissé de Candidature Partenariale
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Le Comité de Développement de Ntolo (CODEV) et le Cabinet de la Chefferie accusent réception de votre proposition formelle.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-slate-500">Numéro de suivi officiel :</span>
                  <span className="font-mono font-bold text-emerald-900">{submissionReceipt.trackingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Organisation :</span>
                  <span className="font-semibold text-slate-900">{orgName} ({orgType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Projet ciblé :</span>
                  <span className="font-semibold text-slate-900">{targetProject}</span>
                </div>
                {submissionReceipt.transaction && (
                  <div className="pt-2 border-t border-stone-200 space-y-1">
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Réf. Transaction Paiement :</span>
                      <span className="font-mono">{submissionReceipt.transaction.transactionRef}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Montant versé :</span>
                      <span>{submissionReceipt.transaction.amountFCFA.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    {submissionReceipt.ussdPrompt && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 font-medium">
                        {submissionReceipt.ussdPrompt}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('partenaires')}
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  Voir les partenaires
                </button>
                <button
                  onClick={() => {
                    setSubmissionReceipt(null);
                    setOrgName('');
                    setContactName('');
                    setProposalDetails('');
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs border border-stone-300 transition-colors"
                >
                  Déposer une autre demande
                </button>
              </div>
            </div>
          ) : (
            /* Formulaire d'engagement */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-xl font-serif-royal font-bold text-slate-900">
                  Formulaire d'Intention de Partenariat & Sponsoring
                </h3>
                <p className="text-xs text-slate-500">
                  Les champs marqués d'un astérisque (*) sont obligatoires.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Champ Honeypot invisible pour tromper les robots spammeurs */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="institution_verification_code_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Organisation & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nom de l'Organisation / Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Ex: Brasseries du Cameroun, SARL Ekane BTP..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Statut Juridique *
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="Entreprise">Entreprise Privée (SARL, SA, Ets)</option>
                    <option value="ONG">ONG / Fondation Philanthropique</option>
                    <option value="Institution">Institution Publique / Collectivité</option>
                    <option value="Association Diaspora">Association de la Diaspora</option>
                    <option value="Mécène Particulier">Mécène Particulier / Bienfaiteur</option>
                  </select>
                </div>
              </div>

              {/* Représentant & Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nom & Prénom du Responsable *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex: Mme Marie Ngo..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Adresse e-mail officielle *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="direction@entreprise.cm"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Téléphone direct (avec indicatif) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+237 6xx xx xx xx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Site Web & Palier visé */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Site web ou Page LinkedIn (Optionnel)
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Palier de Sponsoring Visé
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="platine">Palier Platine (5 000 000 FCFA+ - Mécène d'Honneur)</option>
                    <option value="or">Palier Or (2 500 000 FCFA - Parrain Bâtisseur)</option>
                    <option value="argent">Palier Argent (1 000 000 FCFA - Partenaire Solidaire)</option>
                    <option value="bronze">Palier Bronze (500 000 FCFA - Bienfaiteur)</option>
                  </select>
                </div>
              </div>

              {/* Type de contribution & Projet ciblé */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Forme de l'appui
                  </label>
                  <select
                    value={contributionType}
                    onChange={(e) => setContributionType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="financier">Contribution Financière</option>
                    <option value="materiel">Don de Matériel / Équipement</option>
                    <option value="technique">Appui Technique & Ingénierie</option>
                    <option value="mixte">Appui Mixte</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Projet ou Secteur ciblé
                  </label>
                  <select
                    value={targetProject}
                    onChange={(e) => setTargetProject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="Adduction d’Eau Potable & Forage Solaire">Adduction d’Eau Potable & Forage Solaire</option>
                    <option value="Électrification Solaire des Carrefours">Électrification Solaire des Carrefours</option>
                    <option value="Plateau Sportif & Club Jeunesse">Plateau Sportif & Club Jeunesse</option>
                    <option value="Unité de Séchage Artisanal Cacao/Manioc">Unité de Séchage Artisanal Cacao/Manioc</option>
                    <option value="Centre de Santé & Maternité">Centre de Santé & Maternité</option>
                    <option value="Bourses d'Étude & École Publique">Bourses d'Étude & École Publique</option>
                    <option value="Fonds Général de Développement">Fonds Général de Développement (Affectation libre CODEV)</option>
                  </select>
                </div>
              </div>

              {/* Détails de la proposition */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Description succincte de votre engagement & souhaits
                </label>
                <textarea
                  rows={4}
                  value={proposalDetails}
                  onChange={(e) => setProposalDetails(e.target.value)}
                  placeholder="Décrivez les modalités de votre soutien, les attentes en termes de visibilité, les échéances souhaitées..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                ></textarea>
              </div>

              {/* Optionnel : Passerelle de versement direct (Architecture paiement futur / bac à sable) */}
              {contributionType === 'financier' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-950">
                      <input
                        type="checkbox"
                        checked={enableInstantPayment}
                        onChange={(e) => setEnableInstantPayment(e.target.checked)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      <span>Initier un versement immédiat (Mobile Money ou Carte)</span>
                    </label>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Mode Sécurisé
                    </span>
                  </div>

                  {enableInstantPayment && (
                    <div className="space-y-3 pt-2 border-t border-emerald-200 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            Montant en Francs CFA
                          </label>
                          <input
                            type="number"
                            value={pledgedAmount}
                            onChange={(e) => setPledgedAmount(e.target.value)}
                            min="10000"
                            step="50000"
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            Moyen de paiement
                          </label>
                          <select
                            value={paymentProvider}
                            onChange={(e) => setPaymentProvider(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                          >
                            <option value="orange_money">Orange Money Cameroun (USSD #150*50#)</option>
                            <option value="mtn_momo">MTN Mobile Money Cameroun (*126#)</option>
                            <option value="stripe_card">Carte Bancaire Visa / Mastercard</option>
                          </select>
                        </div>
                      </div>
                      <p className="text-[11px] text-emerald-900 italic">
                        Une référence officielle NTL-PAY-XXXX vous sera délivrée avec confirmation immédiate.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Défi de sécurité anti-spam */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-700 font-medium">
                  Vérification de sécurité anti-robot : Combien font <strong>4 + 3</strong> ? *
                </span>
                <input
                  type="text"
                  required
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Réponse"
                  className="w-24 px-3 py-1.5 rounded-xl border border-stone-300 text-center font-bold text-xs"
                />
              </div>

              {/* Acceptation Charte */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={charterAccepted}
                  onChange={(e) => setCharterAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700"
                />
                <span>
                  Je confirme au nom de mon organisation avoir pris connaissance de la <strong>Charte Éthique de Partenariat de Ntolo</strong> et m'engage à respecter les valeurs de transparence et de souveraineté coutumière du village. *
                </span>
              </label>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Enregistrement du protocole en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Soumettre notre dossier de partenariat au CODEV</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SocialShareBar />
      </div>
    </div>
  );
};
