import React from 'react';
import { X, ChevronRight, Compass } from 'lucide-react';
import { PageId } from '../types';
import { PAGES_META } from '../data/villageData';

interface DirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const DirectoryDrawer: React.FC<DirectoryDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-xs">
              {PAGES_META.length}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Sommaire Intégral du Portail</h3>
              <p className="text-[11px] text-slate-500">Les {PAGES_META.length} rubriques et pages officielles du village de Ntolo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 text-xs font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of 19 Pages */}
        <div className="overflow-y-auto p-4 space-y-1.5 divide-y divide-slate-100">
          {PAGES_META.map((p, idx) => {
            const isCurrent = currentPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-emerald-800 text-amber-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="text-sm block">{p.title}</span>
                    <span className="text-[11px] text-slate-400 font-normal line-clamp-1">{p.description}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-emerald-800' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
