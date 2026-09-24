import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Printer, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { CommunitySubmission } from '../../types';

interface ConfirmationReceiptCardProps {
  submission: CommunitySubmission;
  onClose: () => void;
  onNavigateToParticipatory?: () => void;
}

export const ConfirmationReceiptCard: React.FC<ConfirmationReceiptCardProps> = ({
  submission,
  onClose,
  onNavigateToParticipatory,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(submission.trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getFormLabel = (type: string) => {
    switch (type) {
      case 'actualite': return 'Proposition d’actualité citoyenne';
      case 'besoin': return 'Signalement de besoin / Alerte citoyenne';
      case 'projet': return 'Proposition de projet de développement';
      case 'contact': return 'Message au Secrétariat & Chefferie';
      case 'partenaire': return 'Candidature de partenariat';
      case 'contribution': return 'Promesse de contribution au développement';
      case 'media': return 'Dépôt de document photo / vidéo';
      default: return 'Soumission citoyenne';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6 text-slate-800 animate-in zoom-in-95 duration-200">
      {/* Success header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
          Transmission Sécurisée Réussie
        </div>
        <h3 className="font-serif-royal text-2xl font-bold text-slate-900">
          Votre démarche a été enregistrée avec succès
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Le secrétariat de la Chefferie Traditionnelle et le bureau du CODEV ont reçu une notification directe pour instruction.
        </p>
      </div>

      {/* Official Receipt Box */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-2xl p-5 border border-slate-200 space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Numéro de suivi officiel
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xl sm:text-2xl font-black text-emerald-900 tracking-wider">
                {submission.trackingCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                title="Copier le code de suivi"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Statut du traitement
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Reçu (En cours d'enregistrement)
            </span>
          </div>
        </div>

        {/* Details list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Type de démarche :</span>
            <span className="font-semibold text-slate-800">{getFormLabel(submission.type)}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Date & Heure d'enregistrement :</span>
            <span className="font-mono font-medium text-slate-800">{submission.submittedAt}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Déclarant / Porteur :</span>
            <span className="font-semibold text-slate-800">{submission.senderName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Contact référencé :</span>
            <span className="font-mono text-slate-800">{submission.senderPhone}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-500 block">Objet / Titre transmis :</span>
            <span className="font-medium text-slate-900 italic">« {submission.title} »</span>
          </div>
        </div>

        {/* Notice for Future Payment if it's a pledge */}
        {submission.type === 'contribution' && submission.payload.paymentArchitecture && (
          <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Architecture de Paiement Solidaire (Mode Préparation) :</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Votre promesse de contribution ({submission.payload.pledgedAmount?.toLocaleString('fr-FR')} {submission.payload.currency || 'FCFA'}) a été répertoriée dans le registre du CODEV.
              Aucun prélèvement bancaire ou Mobile Money n'est débité à ce stade (Phase 1). Vous serez contacté par le secrétariat pour la validation formelle.
            </p>
          </div>
        )}
      </div>

      {/* Prochaines étapes */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <span className="font-bold text-slate-800 block">Que se passe-t-il ensuite ?</span>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>Le secrétariat de la Chefferie ou le responsable du CODEV examine la recevabilité de votre demande.</li>
          <li>Le statut passera à <strong className="text-slate-800">« En cours »</strong> dès la prise en charge par un notable ou un technicien.</li>
          <li>Vous recevrez un appel ou un message WhatsApp de confirmation si un complément d’information est nécessaire.</li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimer cet accusé</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {submission.type === 'projet' && onNavigateToParticipatory && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToParticipatory();
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 text-xs font-bold transition-colors"
            >
              <span>Voir les projets participatifs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold shadow transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
