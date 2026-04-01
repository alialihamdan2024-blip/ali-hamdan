
import React from 'react';
import { HeartPulse, Layers, Brain, BookText, Map as MapIcon } from 'lucide-react';
import { AppMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  mistakesCount?: number;
}

const Header: React.FC<HeaderProps> = ({ currentMode, onModeChange, mistakesCount = 0 }) => {
  const navItems = [
    { mode: AppMode.FLASHCARDS, label: 'Flashcards', icon: Layers },
    { mode: AppMode.ATLAS, label: 'Atlas', icon: MapIcon },
    { mode: AppMode.QUIZ, label: 'Exam', icon: Brain },
    { mode: AppMode.LIST, label: 'Index', icon: BookText },
  ];

  return (
    <header className="sticky top-0 z-[100] px-4 py-2 md:py-3 md:pt-6 md:pb-4 pointer-events-none bg-white/95 md:bg-transparent border-b border-slate-100 md:border-none transition-all duration-300">
      <div className="max-w-[1400px] mx-auto pointer-events-auto flex items-center justify-between">
          
          <div 
            className="flex items-center gap-3 md:gap-4 cursor-pointer group select-none py-1"
            onClick={() => onModeChange(AppMode.FLASHCARDS)}
          >
            <div className="w-9 h-9 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm md:shadow-xl md:shadow-rose-200/50 border border-rose-100 text-rose-600 transition-transform group-hover:scale-105">
              <HeartPulse size={20} className="md:w-6 md:h-6 text-rose-600" strokeWidth={2.5} />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                 <span className="px-1.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-[8px] md:text-[9px] font-black text-zinc-500 uppercase tracking-[0.1em]">Medical Education</span>
              </div>
              <h1 className="text-lg md:text-2xl font-black text-slate-900 leading-none tracking-tight font-display">
                Anatomy <span className="hidden sm:inline">and Physiology</span> <span className="text-rose-500 mx-0.5">OT</span>
              </h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/80 border border-white/50 shadow-sm rounded-2xl ring-1 ring-slate-100">
            {navItems.map((item) => {
              const isActive = currentMode === item.mode;
              const Icon = item.icon;
              const showDot = (item.mode === AppMode.FLASHCARDS || item.mode === AppMode.QUIZ) && mistakesCount > 0;

              return (
                <button
                  key={item.mode}
                  onClick={() => onModeChange(item.mode)}
                  className={`
                    relative px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 overflow-hidden group
                    ${isActive 
                      ? "bg-slate-900 text-white shadow-md transform scale-100" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }
                  `}
                >
                  <div className="relative">
                    <Icon 
                      size={16} 
                      className={`transition-transform duration-300 ${isActive ? 'text-rose-400' : 'text-slate-400 group-hover:text-rose-500'}`} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                    {showDot && (
                      <span className="absolute -top-2 -right-2 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white"></span>
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
      </div>
    </header>
  );
};

export default Header;