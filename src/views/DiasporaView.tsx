import React, { useState } from 'react';
import {
  Globe, Users, HeartHandshake, CheckCircle2, ShieldCheck, MapPin,
  Briefcase, Mail, Phone, PlusCircle, Wallet, ArrowRight, Sparkles, Building2
} from 'lucide-react';
import { PageId, CommunitySubmission } from '../types';
import { submitCommunityForm } from '../services/communityService';
import { ConfirmationReceiptCard } from '../components/community/ConfirmationReceiptCard';
import { AntiSpamSecurityBlock } from '../components/community/AntiSpamSecurityBlock';
import { CommunityActionHubModal } from '../components/community/CommunityActionHubModal';

const MATH_CHALLENGES = [
  { question: '3 + 5', expected: '8' },
  { question: '7 + 2', expected: '9' },
  { question: '9 - 4', expected: '5' },
  { question: '6 + 3', expected: '9' },
];

interface DiasporaViewProps {
  onNavigate: (page: PageId) => void;
}

export const DiasporaView: React.FC<DiasporaViewProps> = ({ onNavigate }) => {
  // Census Form states
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Cameroun');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [contributionField, setContributionField] = useState('Financement de projets');

  // Anti-spam states
  const [honeypot, setHoneypot] = useState('');
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [humanAnswer, setHumanAnswer] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoadTimestamp] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState<CommunitySubmission | null>(null);

  // Modal triggers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'contribution' | 'projet' | 'partenaire'>('contribution');

  const currentChallenge = MATH_CHALLENGES[challengeIndex % MATH_CHALLENGES.length];

  const handleRefreshChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % MATH_CHALLENGES.length);
    setHumanAnswer('');
  };

  const handleCensusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    if (!name.trim() || !family.trim() || !city.trim() || !phone.trim()) {
      setFormError('Veuillez remplir tous les champs obligatoires (*).');
      setIsSubmitting(false);
      return;
    }

    const result = submitCommunityForm({
      type: 'contact',
      title: `Recensement Diaspora : ${name.trim()} (${city}, ${country})`,
      senderName: name.trim(),
      senderEmail: email.trim(),
      senderPhone: phone.trim(),
      senderLocation: `${city.trim()} (${country.trim()})`,
      payload: {
        contactSubject: `Recensement officiel Diaspora - Famille ${family.trim()}`,
        contactPreferredChannel: 'whatsapp',
        contactMessage: `Fiche de recensement officiel de la Diaspora de Ntolo :
- Nom : ${name.trim()}
- Lignage / Famille : ${family.trim()}
- Résidence : ${city.trim()}, ${country.trim()}
- Téléphone : ${phone.trim()}
- Email : ${email.trim()}
- Profession : ${profession.trim()}
- Domaine d'appui souhaité : ${contributionField}`,
      },
      honeypotTrap: honeypot,
      verificationAnswer: humanAnswer,
      expectedVerificationAnswer: currentChallenge.expected,
      formLoadTimestamp,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.errorMessage || 'Une erreur est survenue lors de l’enregistrement.');
      return;
    }

    if (result.submission) {
      setCompletedSubmission(result.submission);
    }
  };

  const handleOpenActionModal = (type: 'contribution' | 'projet' | 'partenaire') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span>Section 17 • Solidarité & Réseau Global de Ntolo</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Espace Diaspora de Ntolo
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Ressortissants de Ntolo à Douala, Yaoundé, Nkongsamba et à l’international : restez unis, connectés et acteurs de la transformation de notre terroir natal.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('projets-participatifs')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 text-xs font-bold transition-colors"
            >
              <span>Projets participatifs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleOpenActionModal('contribution')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-stone-950" />
              <span>Contribuer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Role Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-700 space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/40">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>UNION FRATERNELLE DES FILLES & FILS DE NTOLO</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif-royal font-bold">
          « Où que tu sois, n’oublie jamais la terre de tes ancêtres »
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
          La diaspora de Ntolo constitue le premier levier d’impulsion pour les infrastructures, l'éducation des enfants et la valorisation de notre patrimoine.
          Ce portail vous permet d’être recensé officiellement, de proposer des projets citoyens, d’accéder aux comptes-rendus financiers et de vous engager dans les commissions techniques du CODEV.
        </p>

        {/* Quick diaspora action chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => handleOpenActionModal('contribution')}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Souscription solidaire (Pledge)</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenActionModal('projet')}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white/20 text-white font-bold text-xs hover:bg-white/30 backdrop-blur-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Proposer un projet de la diaspora</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenActionModal('partenaire')}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white/20 text-white font-bold text-xs hover:bg-white/30 backdrop-blur-xs transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Proposer un partenariat / ONG</span>
          </button>
        </div>
      </div>

      {/* Antennes Régionales & Internationales */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Antennes de Liaison & Correspondants de la Diaspora
          </h2>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Réseau Actif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-800 block">Antenne de Douala</span>
            <p className="text-xs text-slate-600">Rassemblement des ressortissants de la métropole économique et industrielle.</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 space-y-0.5">
              <div>Délégué : M. Jean-Claude E.</div>
              <div className="text-emerald-800 font-bold">Réunion : 1er dimanche du mois</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-800 block">Antenne de Yaoundé</span>
            <p className="text-xs text-slate-600">Coordination des cadres et élites résidant dans la capitale politique.</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 space-y-0.5">
              <div>Délégué : Dr. Samuel N.</div>
              <div className="text-emerald-800 font-bold">Réunion : 2e samedi du mois</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-800 block">Antenne de Nkongsamba</span>
            <p className="text-xs text-slate-600">Liaison de proximité avec le chef-lieu du département du Moungo.</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 space-y-0.5">
              <div>Délégué : M. Thomas B.</div>
              <div className="text-emerald-800 font-bold">Permanence marché hebdomadaire</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-amber-800 block">Cellule Internationale</span>
            <p className="text-xs text-slate-600">Ressortissants en France, Europe, Amérique du Nord et reste du monde.</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 space-y-0.5">
              <div>Coordination : Mme Viviane M.</div>
              <div className="text-amber-800 font-bold">Visioconférence trimestrielle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire Officiel de Recensement avec Sécurité, Anti-Spam et Accusé */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Formulaire Officiel de Recensement des Ressortissants
            </h2>
            <p className="text-xs text-slate-500">
              Registre confidentiel tenu par le Secrétariat du CODEV et la Chefferie Traditionnelle de Ntolo.
            </p>
          </div>
        </div>

        {completedSubmission ? (
          <ConfirmationReceiptCard
            submission={completedSubmission}
            onClose={() => setCompletedSubmission(null)}
            onNavigateToParticipatory={() => onNavigate('projets-participatifs')}
          />
        ) : (
          <form onSubmit={handleCensusSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom & Prénom(s) complets *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Steve Elembe"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Famille / Lignage d'origine à Ntolo *
                </label>
                <input
                  type="text"
                  required
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                  placeholder="Ex: Famille Elembe / Quartier Chefferie"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ville de Résidence actuelle *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Douala, Yaoundé, Paris, Montréal..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pays de Résidence *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Cameroun, France, Belgique, USA..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +237 6XX XX XX XX"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adresse Courriel (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Profession / Domaine d'expertise
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Ex: Enseignant, Ingénieur, Médecin, Commerçant..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Domaine d'appui souhaité au village
                </label>
                <select
                  value={contributionField}
                  onChange={(e) => setContributionField(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Financement de projets">Contributions financières aux projets</option>
                  <option value="Santé & Soins">Missions médicales & don de médicaments</option>
                  <option value="Éducation & Bourses">Parrainage d'élèves & livres</option>
                  <option value="Ingénierie & Travaux">Expertise technique & pistes</option>
                  <option value="Autre">Autre contribution</option>
                </select>
              </div>
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

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center space-x-2 disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Enregistrement...' : 'Enregistrer mon Recensement Officiel'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('projets-participatifs')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Projets participatifs
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
        >
          18. Contact & Requêtes →
        </button>
      </div>

      {/* Action modal */}
      <CommunityActionHubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialFormType={modalType}
        onNavigateToParticipatory={() => onNavigate('projets-participatifs')}
      />
    </div>
  );
};
