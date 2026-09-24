import React from 'react';
import { ShieldAlert, RefreshCw, Lock } from 'lucide-react';

interface AntiSpamSecurityBlockProps {
  honeypot: string;
  setHoneypot: (val: string) => void;
  mathChallenge: {
    question: string;
    expected: string;
  };
  humanAnswer: string;
  setHumanAnswer: (val: string) => void;
  onRefreshChallenge: () => void;
  error?: string;
}

export const AntiSpamSecurityBlock: React.FC<AntiSpamSecurityBlockProps> = ({
  honeypot,
  setHoneypot,
  mathChallenge,
  humanAnswer,
  setHumanAnswer,
  onRefreshChallenge,
  error,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
      {/* Hidden honeypot field - invisible to genuine human users */}
      <div className="hidden opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="_website_field_verify">Ne pas remplir ce champ de sécurité (robot trap) :</label>
        <input
          id="_website_field_verify"
          type="text"
          name="_website_field_verify"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Protection anti-spam & vérification humaine</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Protocole Sécurisé Ntolo</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
            Sécurité : {mathChallenge.question} =
          </span>
          <input
            type="text"
            value={humanAnswer}
            onChange={(e) => setHumanAnswer(e.target.value)}
            placeholder="Réponse"
            required
            className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded text-center text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="button"
            onClick={onRefreshChallenge}
            title="Changer la question"
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-slate-500 leading-snug">
          Cette vérification protège les services de la Chefferie contre les envois malveillants automatisés.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 pt-1">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
