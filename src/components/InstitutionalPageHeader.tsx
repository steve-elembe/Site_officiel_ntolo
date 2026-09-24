import React from 'react';
import { ArrowLeft, AlertCircle, ShieldCheck, LucideIcon } from 'lucide-react';
import { PageId } from '../types';

interface InstitutionalPageHeaderProps {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  onNavigateBack?: () => void;
  showProvisionalNotice?: boolean;
  provisionalNoticeText?: string;
}

export const InstitutionalPageHeader: React.FC<InstitutionalPageHeaderProps> = ({
  badge,
  title,
  description,
  icon: Icon,
  onNavigateBack,
  showProvisionalNotice = true,
  provisionalNoticeText = "Certaines données historiques, administratives ou statistiques précises sont en cours de certification officielle par la Chefferie et les services compétents. Elles sont identifiées par la mention [À compléter].",
}) => {
  return (
    <div className="space-y-4 border-b border-stone-200 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200/70">
          <Icon className="w-3.5 h-3.5 text-emerald-800" />
          <span>{badge}</span>
        </div>

        {onNavigateBack && (
          <button
            onClick={onNavigateBack}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au portail</span>
          </button>
        )}
      </div>

      <div>
        <h1 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      {showProvisionalNotice && (
        <div className="bg-amber-50/90 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs sm:text-sm text-amber-950 flex items-start space-x-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold text-amber-900">Rigueur institutionnelle & Mention des données :</strong>{' '}
            {provisionalNoticeText}
          </div>
        </div>
      )}
    </div>
  );
};
