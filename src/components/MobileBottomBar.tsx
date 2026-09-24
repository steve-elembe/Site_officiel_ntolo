import React from 'react';
import { Home, Target, HeartPulse, Newspaper, Compass } from 'lucide-react';
import { PageId } from '../types';
import { PAGES_META } from '../data/villageData';

interface MobileBottomBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDirectory: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  onOpenDirectory,
}) => {
  const items = [
    { id: 'accueil' as PageId, label: 'Accueil', icon: Home },
    { id: 'projets' as PageId, label: 'Projets', icon: Target },
    { id: 'sante' as PageId, label: 'Santé/Urg.', icon: HeartPulse },
    { id: 'actualites' as PageId, label: 'Actualités', icon: Newspaper },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg lg:hidden pb-safe">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
                isActive ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100/80 text-emerald-800' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Directory / All Pages Explorer */}
        <button
          onClick={onOpenDirectory}
          className="flex flex-col items-center justify-center space-y-0.5 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="p-1 rounded-lg">
            <Compass className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[10px] tracking-tight">Portail ({PAGES_META.length})</span>
        </button>
      </div>
    </div>
  );
};
