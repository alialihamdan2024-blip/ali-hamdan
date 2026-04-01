import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import { Flashcards } from './components/Flashcards';
import Quiz from './components/Quiz';
import QuestionList from './components/QuestionList';
import InteractiveAtlas from './components/InteractiveAtlas';
import MobileNavigation from './components/MobileNavigation';
import ImageZoomModal from './components/ImageZoomModal';
import { AppMode, Question } from './types';

// Import all available chapters
// Data is now fetched from the server API

import { Trash2, BookOpen, Stethoscope, HeartPulse, ChevronRight, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem('ot_has_started') === 'true';
  });

  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem('ot_current_mode');
    if (!Object.values(AppMode).includes(savedMode as AppMode)) {
        return AppMode.FLASHCARDS;
    }
    return (savedMode as AppMode) || AppMode.FLASHCARDS;
  });

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [serverQuestions, setServerQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [userVault, setUserVault] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('anatomy_ultimate_vault_v5');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [mistakesVault, setMistakesVault] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('anatomy_mistakes_v5');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('ot_current_mode', currentMode);
  }, [currentMode]);

  useEffect(() => {
    localStorage.setItem('ot_has_started', String(hasStarted));
  }, [hasStarted]);

  useEffect(() => {
    localStorage.setItem('anatomy_ultimate_vault_v5', JSON.stringify(userVault));
  }, [userVault]);

  useEffect(() => {
    localStorage.setItem('anatomy_mistakes_v5', JSON.stringify(mistakesVault));
  }, [mistakesVault]);

  useEffect(() => {
    setIsHeaderVisible(true);
  }, [currentMode]);

  // Fetch Data from Server
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch('/api/questions');
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setServerQuestions(data);
        } catch (error) {
            console.error("Error loading curriculum:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, []);

  const handleToggleMistake = React.useCallback((id: string, shouldAdd: boolean) => {
    setMistakesVault(prev => {
        if (shouldAdd) {
            return prev.includes(id) ? prev : [...prev, id];
        } else {
            return prev.filter(m => m !== id);
        }
    });
  }, []);

  const handleClearMistakes = React.useCallback(() => {
      setMistakesVault([]);
  }, []);

  // --- ULTIMATE 2.0 DATA ENGINE ---
  const allQuestions = useMemo(() => {
    return [...serverQuestions, ...userVault];
  }, [serverQuestions, userVault]);

  if (!hasStarted) {
    return (
      <div className="h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-white selection:bg-rose-500/30">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b,transparent_70%)] opacity-50"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#881337,transparent_50%)] opacity-20"></div>
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
         
         <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-12 md:space-y-16 animate-in fade-in duration-1000 slide-in-from-bottom-8">
            
            <div className="relative group cursor-pointer" onClick={() => !isLoading && setHasStarted(true)}>
                <div className="absolute inset-0 bg-rose-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="w-28 h-28 md:w-32 md:h-32 bg-slate-900/90 border border-white/10 rounded-[2.5rem] flex items-center justify-center relative shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                    {isLoading ? (
                        <Loader2 size={48} className="text-rose-500 animate-spin" />
                    ) : (
                        <HeartPulse size={56} className="text-rose-500 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" strokeWidth={1.5} />
                    )}
                </div>
            </div>
            
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] md:text-xs font-medium text-slate-300 uppercase tracking-[0.2em]">Medical Education Platform</span>
               </div>
               
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9] font-display">
                  Anatomy <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Physiology</span> OT
               </h1>
               
               <p className="text-slate-400 text-sm md:text-base max-w-xs mx-auto leading-relaxed font-medium">
                   Comprehensive preparation for occupational therapy board certification and clinical practice.
               </p>
            </div>
  
            <div className="w-full space-y-8">
                <button 
                  onClick={() => setHasStarted(true)}
                  disabled={isLoading}
                  className={`group w-full py-5 md:py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-rose-500 hover:text-white hover:shadow-[0_20px_40px_-10px_rgba(244,63,94,0.5)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-4 relative overflow-hidden ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                     <span className="relative z-10">{isLoading ? 'Loading Curriculum...' : 'Enter Application'}</span>
                     {!isLoading && <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                </button>
                
                <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/5 pt-8">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xl md:text-2xl font-black text-white">{isLoading ? '...' : allQuestions.length}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Questions</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 border-x border-white/5">
                        <span className="text-xl md:text-2xl font-black text-white">17+</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Chapters</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xl md:text-2xl font-black text-white">v7.0</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Version</span>
                    </div>
                </div>
            </div>
         </div>
         
         <div className="absolute bottom-6 text-[10px] font-medium text-slate-600 uppercase tracking-widest">
            Official Study Tool
         </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col font-sans text-slate-900 overflow-hidden bg-slate-50/50">
      {isHeaderVisible && (
        <Header 
            currentMode={currentMode} 
            onModeChange={(m) => setCurrentMode(m)} 
            mistakesCount={mistakesVault.length}
        />
      )}
      
      <main className={`flex-1 relative overflow-hidden flex flex-col w-full mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHeaderVisible ? 'pt-0 md:pt-4 md:pb-6 max-w-[1400px] px-0 md:px-6' : 'max-w-full'}`}>
        <div className={`w-full h-full md:rounded-[2.5rem] overflow-hidden shadow-none md:shadow-2xl md:border border-white/80 bg-white md:bg-white/80 relative z-10 transition-all duration-700 flex flex-col ${!isHeaderVisible ? 'rounded-none border-none bg-white' : ''}`}>
            
            {/* FLASHCARDS */}
            <div className={`w-full h-full pb-20 md:pb-0 flex-1 flex-col animate-fade-in ${currentMode === AppMode.FLASHCARDS ? 'flex' : 'hidden'}`}>
                <Flashcards 
                    data={allQuestions} 
                    onImageClick={setZoomedImage} 
                    mistakes={mistakesVault}
                    onToggleMistake={handleToggleMistake}
                    onClearMistakes={handleClearMistakes}
                    isActive={currentMode === AppMode.FLASHCARDS}
                />
            </div>
            
            {/* ATLAS */}
            <div className={`w-full h-full pb-20 md:pb-0 flex-1 flex-col animate-fade-in ${currentMode === AppMode.ATLAS ? 'flex' : 'hidden'}`}>
                <InteractiveAtlas 
                    data={allQuestions} 
                    onImageClick={setZoomedImage} 
                    mistakes={mistakesVault}
                    isActive={currentMode === AppMode.ATLAS}
                />
            </div>

            {/* QUIZ */}
            <div className={`w-full h-full ${isHeaderVisible ? 'pb-20 md:pb-0' : 'pb-0'} flex-1 flex-col animate-scale-in ${currentMode === AppMode.QUIZ ? 'flex' : 'hidden'}`}>
                <Quiz 
                  data={allQuestions} 
                  toggleHeader={setIsHeaderVisible} 
                  onImageClick={setZoomedImage}
                  mistakes={mistakesVault}
                  onAddMistake={(id) => handleToggleMistake(id, true)}
                  onRemoveMistake={(id) => handleToggleMistake(id, false)}
                />
            </div>

            {/* LIST */}
            <div className={`w-full h-full overflow-y-auto px-0 md:px-4 py-0 md:py-6 custom-scrollbar pb-32 md:pb-6 flex-1 animate-fade-in ${currentMode === AppMode.LIST ? 'block' : 'hidden'}`}>
                <QuestionList 
                  data={allQuestions}
                  onImageClick={setZoomedImage}
                  mistakes={mistakesVault}
                  onToggleMistake={handleToggleMistake}
                  onClearMistakes={handleClearMistakes}
                />
                {userVault.length > 0 && (
                    <div className="flex justify-center p-8 md:p-12 pb-32">
                    <button onClick={() => confirm("Reset user data?") && setUserVault([])} className="text-[10px] font-black text-rose-300 uppercase tracking-widest hover:text-rose-500 transition-colors flex items-center gap-2">
                        <Trash2 size={12} /> Factory Reset User Data
                    </button>
                    </div>
                )}
            </div>
        </div>
      </main>

      <MobileNavigation 
        currentMode={currentMode} 
        onModeChange={(m) => setCurrentMode(m)}
        isVisible={isHeaderVisible}
      />

      <ImageZoomModal 
        isOpen={!!zoomedImage} 
        imageUrl={zoomedImage || ''} 
        onClose={() => setZoomedImage(null)} 
      />
    </div>
  );
};

export default App;