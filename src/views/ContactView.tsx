/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle,
  Landmark, AlertTriangle, Handshake, HeartHandshake, Lightbulb, MessageCircle,
  Facebook, Twitter, Linkedin, Youtube, Copy, Check, ExternalLink, Compass, Navigation
} from 'lucide-react';
import { PageId, CommunitySubmission, SiteSettings } from '../types';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from '../services/adminService';
import { submitCommunityForm } from '../services/communityService';
import { ConfirmationReceiptCard } from '../components/community/ConfirmationReceiptCard';
import { AntiSpamSecurityBlock } from '../components/community/AntiSpamSecurityBlock';
import { CommunityActionHubModal } from '../components/community/CommunityActionHubModal';
import { InteractiveVillageMap } from '../components/contact/InteractiveVillageMap';
import { RouteGuidanceSection } from '../components/contact/RouteGuidanceSection';
import { SocialShareBar } from '../components/common/SocialShareBar';

const MATH_CHALLENGES = [
  { question: '5 + 2', expected: '7' },
  { question: '4 + 4', expected: '8' },
  { question: '9 - 3', expected: '6' },
  { question: '7 + 3', expected: '10' },
];

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderLocation, setSenderLocation] = useState('');
  const [subject, setSubject] = useState('Demande d’audience coutumière avec Sa Majesté');
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'telephone' | 'email' | 'palais'>('whatsapp');
  const [message, setMessage] = useState('');

  // Anti-spam states
  const [honeypot, setHoneypot] = useState('');
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [humanAnswer, setHumanAnswer] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoadTimestamp] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState<CommunitySubmission | null>(null);

  // Modal Hub for other citizen forms
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [hubInitialType, setHubInitialType] = useState<'besoin' | 'partenaire' | 'projet' | 'actualite'>('besoin');

  useEffect(() => {
    const handleSettingsUpdate = () => setSettings(getSiteSettings());
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleSettingsUpdate);
    return () => {
      window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleSettingsUpdate);
    };
  }, []);

  const currentChallenge = MATH_CHALLENGES[challengeIndex % MATH_CHALLENGES.length];

  const handleRefreshChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % MATH_CHALLENGES.length);
    setHumanAnswer('');
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    if (!senderName.trim() || !senderPhone.trim() || !message.trim()) {
      setFormError('Veuillez renseigner votre nom, votre numéro de téléphone et le texte de votre message.');
      setIsSubmitting(false);
      return;
    }

    const result = submitCommunityForm({
      type: 'contact',
      title: subject,
      senderName,
      senderEmail,
      senderPhone,
      senderLocation: senderLocation || 'Ntolo',
      payload: {
        contactSubject: subject,
        contactPreferredChannel: preferredChannel,
        contactMessage: message,
      },
      honeypotTrap: honeypot,
      verificationAnswer: humanAnswer,
      expectedVerificationAnswer: currentChallenge.expected,
      formLoadTimestamp,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.errorMessage || 'Une erreur est survenue lors de l’envoi de votre message.');
      return;
    }

    if (result.submission) {
      setCompletedSubmission(result.submission);
    }
  };

  const openCitizenHub = (type: 'besoin' | 'partenaire' | 'projet' | 'actualite') => {
    setHubInitialType(type);
    setIsHubOpen(true);
  };

  const whatsappRaw = settings.whatsappNumber || '+237670001122';
  const whatsappClean = whatsappRaw.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappClean}&text=${encodeURIComponent(
    settings.whatsappMessagePreset || 'Bonjour le Secrétariat de Ntolo, je vous contacte via le portail officiel...'
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-3">
          <Mail className="w-3.5 h-3.5 text-emerald-800" />
          <span>Section 18 • Communication & Requêtes Officielles</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact, Secrétariat & Plan d'Accès
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Coordonnées officielles de la Chefferie Traditionnelle de Ntolo, permanence du CODEV, formulaires certifiés, carte interactive et itinéraires détaillés.
            </p>
          </div>

          {/* Quick shortcuts to citizen forms */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => openCitizenHub('besoin')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-bold transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Signaler un besoin</span>
            </button>
            <button
              type="button"
              onClick={() => openCitizenHub('partenaire')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-100 text-blue-900 hover:bg-blue-200 text-xs font-bold transition-colors"
            >
              <Handshake className="w-3.5 h-3.5 text-blue-700" />
              <span>Devenir partenaire</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Contact Details & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Official Contact Card & Socials */}
        <div className="space-y-6">
          {/* Official Contacts Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-emerald-800">
                <Landmark className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-base">Secrétariat du Palais Royal</h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Officiel
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">Adresse Physique :</span>
                  <span>{settings.address || 'Chefferie Traditionnelle de Ntolo, Nlonako, Moungo'}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{settings.locationSummary}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 block">Téléphone & Standard :</span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <a
                      href={`tel:${settings.contactPhone?.split('/')[0]?.trim() || '+237670001122'}`}
                      className="font-mono font-bold text-emerald-800 hover:underline"
                    >
                      {settings.contactPhone}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.contactPhone, 'phone')}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                      title="Copier le numéro"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 block">Courrier Électronique (Email) :</span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="font-mono text-emerald-800 hover:underline truncate max-w-[190px]"
                    >
                      {settings.contactEmail}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.contactEmail, 'email')}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                      title="Copier l'email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct button */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Écrire sur WhatsApp ({whatsappRaw})</span>
                </a>
              </div>
            </div>

            {/* Reception Hours */}
            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Horaires & Permanences :
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {settings.secretariatHours || 'Lundi au Vendredi : 08h00 - 15h30 | Samedi : 09h00 - 12h00'}
              </p>
            </div>
          </div>

          {/* Social Media Links Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-900">
              Réseaux Sociaux & Canaux Officiels
            </h3>
            <p className="text-xs text-slate-500">
              Suivez les annonces du village, les reportages culturels et les sessions du CODEV :
            </p>

            <div className="space-y-2 pt-1">
              {settings.socialFacebookUrl && (
                <a
                  href={settings.socialFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Page Facebook Officielle</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {settings.socialWhatsappGroupUrl && (
                <a
                  href={settings.socialWhatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Canal d’Information WhatsApp</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {settings.socialYoutubeUrl && (
                <a
                  href={settings.socialYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 transition-colors text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-rose-600" />
                    <span>Chaîne Vidéo Patrimoine</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {settings.socialTwitterUrl && (
                <a
                  href={settings.socialTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-stone-100 border border-slate-200 transition-colors text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-stone-800" />
                    <span>Fil X / Twitter</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {settings.socialLinkedinUrl && (
                <a
                  href={settings.socialLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span>Réseau Professionnel CODEV</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Formulaire Officiel de Transmission de Message
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Chaque message donne lieu à l’émission d'un code de suivi officiel (ex: <code>NTL-CONT-XXXX</code>) avec accusé de réception certifié.
            </p>
          </div>

          {completedSubmission ? (
            <ConfirmationReceiptCard
              submission={completedSubmission}
              onClose={() => setCompletedSubmission(null)}
              onNavigateToParticipatory={() => onNavigate('projets-participatifs')}
            />
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ex: Paul Ngaleu"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Téléphone joignable / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="Ex: (+237) 6XX XX XX XX"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adresse Courriel (Email)
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="Ex: paul.ngaleu@email.com"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quartier à Ntolo ou Ville de résidence
                  </label>
                  <input
                    type="text"
                    value={senderLocation}
                    onChange={(e) => setSenderLocation(e.target.value)}
                    placeholder="Ex: Ntolo Centre, Douala, Yaoundé, Paris..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Objet de la requête *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
                  >
                    <option value="Demande d’audience coutumière avec Sa Majesté">Demande d’audience coutumière avec Sa Majesté</option>
                    <option value="Question administrative au Secrétariat du CODEV">Question administrative au Secrétariat du CODEV</option>
                    <option value="Doléance ou arbitrage coutumier">Doléance ou arbitrage coutumier</option>
                    <option value="Prise de contact Diaspora">Prise de contact Diaspora</option>
                    <option value="Renseignement sur les actes d'état civil">Renseignement administratif & état civil</option>
                    <option value="Autre demande">Autre démarche</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Canal de réponse privilégié
                  </label>
                  <select
                    value={preferredChannel}
                    onChange={(e) => setPreferredChannel(e.target.value as any)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="whatsapp">WhatsApp / Appel direct</option>
                    <option value="telephone">Appel téléphonique standard</option>
                    <option value="email">Courrier électronique (Email)</option>
                    <option value="palais">Rendez-vous physique au Palais Royal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texte de votre message ou requête *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Détaillez votre demande avec précision..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Anti-spam security block */}
              <AntiSpamSecurityBlock
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                mathChallenge={currentChallenge}
                humanAnswer={humanAnswer}
                setHumanAnswer={setHumanAnswer}
                onRefreshChallenge={handleRefreshChallenge}
              />

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Traitement confidentiel certifié par le Secrétariat communal.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmission en cours...' : 'Transmettre mon Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Interactive Map Section */}
      <InteractiveVillageMap />

      {/* Route Guidance Section */}
      <RouteGuidanceSection />

      {/* Social Sharing Bar for this page */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-800 block">
            Partagez les coordonnées et plans d'accès de Ntolo
          </span>
          <span className="text-[11px] text-slate-500">
            Facilitez l'orientation des visiteurs, des délégations et des membres de la diaspora.
          </span>
        </div>
        <SocialShareBar
          title="Coordonnées, Carte & Accès au Village de Ntolo (Moungo)"
          description="Retrouvez le plan d'accès officiel, les numéros de téléphone et le formulaire de contact du village de Ntolo."
        />
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('diaspora')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← 17. Espace Diaspora
        </button>
        <button
          onClick={() => onNavigate('projets-participatifs')}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
        >
          Projets participatifs →
        </button>
      </div>

      {/* Community Action Hub Modal */}
      <CommunityActionHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        initialFormType={hubInitialType}
        onNavigateToParticipatory={() => onNavigate('projets-participatifs')}
      />
    </div>
  );
};
