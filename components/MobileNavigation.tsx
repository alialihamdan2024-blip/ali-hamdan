
import React from 'react';
import { Layers, Brain, BookText, Map as MapIcon } from 'lucide-react';
import { AppMode } from '../types';

interface MobileNavigationProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isVisible: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentMode, onModeChange, isVisible }) => {
  if (!isVisible) return null;

  const navItems = [
    { mode: AppMode.FLASHCARDS, label: 'Cards', icon: Layers },
    { mode: AppMode.ATLAS, label: 'Atlas', icon: MapIcon },
    { mode: AppMode.QUIZ, label: 'Exam', icon: Brain },
    { mode: AppMode.LIST, label: 'Index', icon: BookText },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[200] animate-in slide-in-from-bottom-6 duration-500 pb-safe">
      <nav className="glass-card rounded-[2rem] p-2 shadow-2xl shadow-slate-200/50 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentMode === item.mode;
          const Icon = item.icon;
          return (
            <button
              key={item.mode}
              onClick={() => onModeChange(item.mode)}
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-[1.5rem] transition-all duration-300 relative overflow-hidden ${
                isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-rose-500" : ""} />
                <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${isActive ? 'opacity-100' : 'opacity-0 scale-0 hidden'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;