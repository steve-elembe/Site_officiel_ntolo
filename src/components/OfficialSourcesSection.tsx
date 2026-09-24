import React from 'react';
import { FileText, ShieldCheck, Upload, ExternalLink, Info } from 'lucide-react';

export interface OfficialSourceItem {
  title: string;
  reference: string;
  type: string;
  status: 'Disponible' | 'Homologué' | 'En cours de collationnement' | 'À compléter';
  locationOrAccess?: string;
}

interface OfficialSourcesSectionProps {
  sources: OfficialSourceItem[];
  themeTitle?: string;
  onNavigateToDocuments?: () => void;
  onNavigateToContact?: () => void;
}

export const OfficialSourcesSection: React.FC<OfficialSourcesSectionProps> = ({
  sources,
  themeTitle = 'cette section',
  onNavigateToDocuments,
  onNavigateToContact,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Sources & Documents Officiels
            </h3>
            <p className="text-xs text-slate-500">
              Fonds documentaire, textes réglementaires et archives relatifs à {themeTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            Référence Institutionnelle
          </span>
        </div>
      </div>

      {/* Sources Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
            <tr>
              <th className="px-4 py-3">Document / Source</th>
              <th className="px-4 py-3">Référence & Organisme</th>
              <th className="px-4 py-3">Nature</th>
              <th className="px-4 py-3">Statut & Disponibilité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sources.map((src, idx) => (
              <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {src.title}
                </td>
                <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">
                  {src.reference}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {src.type}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      src.status === 'Homologué' || src.status === 'Disponible'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : src.status === 'En cours de collationnement'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-stone-100 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {src.status}
                  </span>
                  {src.locationOrAccess && (
                    <span className="block text-[10px] text-slate-500 mt-0.5">
                      {src.locationOrAccess}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submission Callout for Elders, Diaspora, Researchers */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
          <p className="text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Appel aux contributeurs certifiés :</strong> Si vous disposez d'un décret, d'un arrêté, d'une étude universitaire ou d'un acte officiel concernant Ntolo pour enrichir cette section, veuillez le transmettre au Secrétariat Général.
          </p>
        </div>
        {onNavigateToContact && (
          <button
            onClick={onNavigateToContact}
            className="flex-shrink-0 px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>Transmettre un document</span>
          </button>
        )}
      </div>
    </section>
  );
};
