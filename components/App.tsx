import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import { Flashcards } from './Flashcards';
import Quiz from './Quiz';
import QuestionList from './QuestionList';
import InteractiveAtlas from './InteractiveAtlas';
import MobileNavigation from './MobileNavigation';
import ImageZoomModal from './ImageZoomModal';
import { AppMode, Question } from '../types';

// Import all available chapters
import { questions as ch1 } from '../hooks/data_ch1';
import { questions as ch2 } from '../hooks/data_ch2';
import { questions as ch3 } from '../hooks/data_ch3';
import { questions as ch4 } from '../hooks/data_ch4';
import { questions as ch5 } from '../hooks/data_ch5';
import { questions as ch6 } from '../hooks/data_ch6';
import { questions as ch7 } from '../hooks/data_ch7';
import { questions as ch8 } from '../hooks/data_ch8';
import { questions as ch9 } from '../hooks/data_ch9';
import { questions as ch10 } from '../hooks/data_ch10';
import { questions as ch11 } from '../hooks/data_ch11';
import { questions as ch12 } from '../hooks/data_ch12';
import { questions as ch13 } from '../hooks/data_ch13';
import { questions as ch14 } from '../hooks/data_ch14';
import { questions as ch14_ss } from '../hooks/data_ch14_special_senses';
import { questions as ch16 } from '../hooks/data_ch16';
import { questions as ch17 } from '../hooks/data_ch17';
import { questions as boostQuestions } from '../hooks/data_utilization_boost';

import { Trash2, BookOpen, Stethoscope, HeartPulse, ChevronRight } from 'lucide-react';

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

  const handleToggleMistake = (id: string, shouldAdd: boolean) => {
    setMistakesVault(prev => {
        if (shouldAdd) {
            return prev.includes(id) ? prev : [...prev, id];
        } else {
            return prev.filter(m => m !== id);
        }
    });
  };

  const handleClearMistakes = () => {
      setMistakesVault([]);
  };

  // --- ULTIMATE 2.0 DATA ENGINE (High Utilization & Smart Rationale) ---
  const allQuestions = useMemo(() => {
    const uniqueQuestions: Question[] = [];
    const seenIds = new Set<string>();

    const rawSources = [
        ...ch1, ...ch2, ...ch3, ...ch4, ...ch5, ...ch6, 
        ...ch7, ...ch8, ...ch9, ...ch10, ...ch11, ...ch12, ...ch13, ...ch14, ...ch14_ss, ...ch16, ...ch17,
        ...boostQuestions, ...userVault
    ];

    const clean = (str: string | undefined) => str ? str.trim().replace(/\s+/g, ' ') : '';
    const categoryAnswerPools: Record<string, string[]> = {};

    // First pass: Build highly specific pools for distractors
    rawSources.forEach(q => {
        const cat = q.category || 'General';
        if (!categoryAnswerPools[cat]) categoryAnswerPools[cat] = [];
        const ans = clean(q.answerText);
        if (ans && ans.length < 80) categoryAnswerPools[cat].push(ans);
    });

    // Second pass: Process questions and generate SMART options & RATIONALES
    rawSources.forEach(q => {
        if (!seenIds.has(q.id)) {
            let explanation = clean(q.explanation);
            const answer = clean(q.answerText);
            const question = clean(q.questionText);

            // --- SMART RATIONALE GENERATOR ---
            // If explanation is missing, generate a structured clinical rationale
            if (!explanation) {
                if (question.includes("Identify") || question.includes("diagram")) {
                    explanation = `<strong>Correct Identification:</strong> ${answer}.<br/>This structure is a key component of the ${q.category.split(':')[0]} region. Proper identification relies on recognizing its anatomical location relative to surrounding landmarks.`;
                } else if (question.includes("function") || question.includes("action")) {
                    explanation = `<strong>Functional Analysis:</strong> ${answer}.<br/>The primary physiological role described is specific to this structure/molecule. Other options represent different functional pathways.`;
                } else {
                    explanation = `<strong>Clinical Rationale:</strong> The correct answer is <strong>${answer}</strong>.<br/>This concept is fundamental to ${q.category}. Understanding the distinction between this and the distractors is critical for board exams.`;
                }
            }

            const cleanQ: Question = {
                ...q,
                questionText: question,
                answerText: answer,
                explanation: explanation, // Enriched Explanation
                options: (q.options || []).map(clean).filter(Boolean)
            };

            // DATA INTEGRITY CHECK: Ensure Answer is in Options
            if (cleanQ.options.length > 0) {
               // Case-insensitive check
               const matchIndex = cleanQ.options.findIndex(o => o.toLowerCase() === cleanQ.answerText.toLowerCase());
               
               if (matchIndex === -1) {
                   // Answer is missing from options. Add it.
                   if (cleanQ.options.length >= 4) {
                       const replaceIdx = Math.floor(Math.random() * cleanQ.options.length);
                       cleanQ.options[replaceIdx] = cleanQ.answerText;
                   } else {
                       cleanQ.options.push(cleanQ.answerText);
                   }
                   // Re-shuffle to hide the insertion
                   cleanQ.options.sort(() => 0.5 - Math.random());
               } else {
                   // Ensure exact string match for strict equality checks
                   cleanQ.options[matchIndex] = cleanQ.answerText;
               }
            }

            const cat = q.category || 'General';
            const pool = categoryAnswerPools[cat] || [];
            
            // If the question lacks options, generate 3 extremely relevant distractors
            if (cleanQ.options.length < 2) {
                const sameCatDistractors = pool
                    .filter(a => a.toLowerCase() !== cleanQ.answerText.toLowerCase())
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                
                cleanQ.options = [cleanQ.answerText, ...sameCatDistractors].sort(() => 0.5 - Math.random());
            }

            uniqueQuestions.push(cleanQ);
            seenIds.add(cleanQ.id);
        }
    });

    return uniqueQuestions;
  }, [userVault]);

  if (!hasStarted) {
    return (
      <div className="h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-white">
         <div className="absolute inset-0 bg-slate-900"></div>
         <div className="absolute top-0 left-0 right-0 h-[40vh] bg-rose-600 rounded-b-[3rem] md:rounded-b-[4rem] z-0 blur-3xl opacity-20"></div>
         
         <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-10 md:space-y-12 animate-fade-in">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center relative cursor-pointer hover:scale-110 transition-transform duration-500" onClick={() => setHasStarted(true)}>
                <HeartPulse size={48} className="text-rose-600 md:w-14 md:h-14" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-4">
               <span className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-rose-500/10 text-rose-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border border-rose-500/20 shadow-glow">
                  Advanced OT Registry
               </span>
               <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight font-display">
                  Anatomy and <br/><span className="text-rose-600">Physiology</span> OT
               </h1>
            </div>
  
            <div className="w-full space-y-6">
                <button 
                  onClick={() => setHasStarted(true)}
                  className="w-full py-5 md:py-6 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:bg-rose-600 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-4"
                >
                     <span>Access Curriculum</span>
                     <ChevronRight size={20} />
                </button>
                
                <div className="flex justify-center items-center gap-8 md:gap-10 text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                        <BookOpen size={20} className="text-rose-600/50 md:w-6 md:h-6" />
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-300">{allQuestions.length} Questions</span>
                    </div>
                    <div className="w-px h-8 md:h-10 bg-slate-800"></div>
                    <div className="flex flex-col items-center gap-2">
                        <Stethoscope size={20} className="text-rose-600/50 md:w-6 md:h-6" />
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-300">Boards v7.0</span>
                    </div>
                </div>
            </div>
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
        <div className={`w-full h-full md:rounded-[2.5rem] overflow-hidden shadow-none md:shadow-2xl md:border border-white/80 bg-white md:bg-white/80 backdrop-blur-3xl relative z-10 transition-all duration-700 flex flex-col ${!isHeaderVisible ? 'rounded-none border-none bg-white' : ''}`}>
            
            {currentMode === AppMode.FLASHCARDS && (
              <div className="w-full h-full animate-fade-in pb-20 md:pb-0 flex-1 flex flex-col">
                <Flashcards 
                    data={allQuestions} 
                    onImageClick={setZoomedImage} 
                    mistakes={mistakesVault}
                    onToggleMistake={handleToggleMistake}
                    onClearMistakes={handleClearMistakes}
                />
              </div>
            )}
            
            {currentMode === AppMode.ATLAS && (
              <div className="w-full h-full animate-fade-in pb-20 md:pb-0 flex-1 flex flex-col">
                <InteractiveAtlas 
                    data={allQuestions} 
                    onImageClick={setZoomedImage} 
                    mistakes={mistakesVault}
                />
              </div>
            )}

            {currentMode === AppMode.QUIZ && (
              <div className="w-full h-full animate-scale-in pb-20 md:pb-0 flex-1 flex flex-col">
                <Quiz 
                  data={allQuestions} 
                  toggleHeader={setIsHeaderVisible} 
                  onImageClick={setZoomedImage}
                  mistakes={mistakesVault}
                  onAddMistake={(id) => handleToggleMistake(id, true)}
                  onRemoveMistake={(id) => handleToggleMistake(id, false)}
                />
              </div>
            )}

            {currentMode === AppMode.LIST && (
              <div className="w-full h-full overflow-y-auto px-0 md:px-4 py-0 md:py-6 custom-scrollbar pb-32 md:pb-6 animate-fade-in flex-1">
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
            )}
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