
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Question, QuizQuestion } from '../types';
import { 
  X, Clock, ChevronLeft, ChevronRight, 
  LayoutGrid, Zap, CheckCircle2, AlertTriangle, Check, 
  RotateCcw, Trophy, Volume2, Info, BookOpen, AlertCircle, 
  BarChart3, ArrowLeft, Flag, ListChecks, Activity,
  ImageIcon, Filter, Save, Stethoscope, Sparkles, Search
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import FilterModal, { FilterOption } from './FilterModal';
import { cleanImageUrl } from '../utils';

// --- OPTIMIZED SUB-COMPONENTS ---

interface QuizQuestionBodyProps {
    currentQ: QuizQuestion;
    isExam: boolean;
    showFeedback: boolean;
    onOptionSelect: (option: string) => void;
    onImageClick?: (url: string) => void;
}

const QuizQuestionBody = React.memo(({ 
    currentQ, 
    isExam, 
    showFeedback, 
    onOptionSelect, 
    onImageClick 
}: QuizQuestionBodyProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to top when question changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [currentQ.id]);

    return (
        <div className="flex-1 bg-slate-50/50 flex flex-col relative" ref={scrollRef}>
            <div className="max-w-3xl mx-auto w-full p-4 md:p-6 lg:p-8 pb-32 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-8">
                    
                    {/* TOP SECTION: Question & Image */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="px-2.5 py-1 bg-slate-900 text-[10px] font-black uppercase text-white rounded shadow-sm tracking-wider">
                                    {currentQ.data.category.split(':')[0]}
                                </span>
                                {currentQ.isFlagged && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100 uppercase tracking-wider">
                                        <Flag size={10} fill="currentColor"/> Flagged
                                    </div>
                                )}
                            </div>
                            
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight font-display" dangerouslySetInnerHTML={{ __html: currentQ.data.questionText }} />
                        </div>

                        {currentQ.data.questionImage && (
                            <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-sm overflow-hidden group cursor-zoom-in relative shrink-0" onClick={() => onImageClick?.(currentQ.data.questionImage!)}>
                                <img 
                                    src={cleanImageUrl(currentQ.data.questionImage)} 
                                    className="w-full h-auto max-h-[500px] lg:max-h-[50vh] object-contain rounded-xl mx-auto" 
                                    alt="Clinical Diagram" 
                                />
                                <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    <Search size={14} /> Zoom Image
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BOTTOM SECTION: Options */}
                    <div className="flex flex-col pb-4">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6 lg:p-8 flex-1 flex flex-col justify-center min-h-min">
                            <div className="grid gap-3 md:gap-4">
                                {currentQ.options.map((opt, i) => {
                                    const isSelected = currentQ.userAnswer === opt;
                                    
                                    let containerClass = "border-slate-200 hover:border-rose-300 hover:bg-rose-50";
                                    let iconClass = "bg-slate-100 text-slate-500 border border-slate-200";
                                    let iconContent = <span className="text-sm font-black">{String.fromCharCode(65 + i)}</span>;
                                    let textColor = "text-slate-800";

                                    if (isExam) {
                                        if (isSelected) {
                                            // Exam Mode: Selected is a distinct color (Indigo)
                                            containerClass = "border-indigo-600 bg-indigo-600 text-white shadow-lg transform scale-[1.02]";
                                            iconClass = "bg-white/20 text-white border-transparent";
                                            textColor = "text-white";
                                        }
                                    } else {
                                        if (showFeedback) {
                                            const isCorrect = opt === currentQ.correctOption;
                                            const isWrong = isSelected && !isCorrect;
                                            
                                            if (isCorrect) {
                                                // Correct Answer: Green
                                                containerClass = "border-emerald-500 bg-emerald-500 text-white ring-1 ring-emerald-500 shadow-lg transform scale-[1.02]";
                                                iconClass = "bg-white/20 text-white border-transparent";
                                                iconContent = <Check size={16} strokeWidth={3} />;
                                                textColor = "text-white";
                                            } else if (isWrong) {
                                                // Wrong Answer (Selected): Red
                                                containerClass = "border-rose-500 bg-rose-500 text-white ring-1 ring-rose-500 shadow-lg";
                                                iconClass = "bg-white/20 text-white border-transparent";
                                                iconContent = <X size={16} strokeWidth={3} />;
                                                textColor = "text-white";
                                            } else {
                                                // Unselected options
                                                containerClass = "opacity-40 border-slate-100 grayscale";
                                                textColor = "text-slate-800";
                                            }
                                        } else if (isSelected) {
                                            // Selected (Before Feedback): Distinct color (Indigo)
                                            containerClass = "border-indigo-600 bg-indigo-600 text-white shadow-lg transform scale-[1.02]";
                                            iconClass = "bg-white/20 text-white border-transparent";
                                            textColor = "text-white";
                                        }
                                    }

                                    return (
                                        <button 
                                            key={i} 
                                            onClick={() => onOptionSelect(opt)} 
                                            className={`w-full p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 text-left group min-h-[72px] ${containerClass}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconClass}`}>
                                                {iconContent}
                                            </div>
                                            <span className={`font-bold text-sm md:text-base leading-snug ${textColor}`} dangerouslySetInnerHTML={{ __html: opt }} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface QuizProps {
  data: Question[];
  toggleHeader?: (visible: boolean) => void;
  isEmbedded?: boolean;
  enableConfiguration?: boolean;
  onExit?: () => void;
  onImageClick?: (url: string) => void;
  mistakes?: string[]; 
  onAddMistake?: (id: string) => void; 
  onRemoveMistake?: (id: string) => void; 
}

const Quiz: React.FC<QuizProps> = ({ 
    data, 
    toggleHeader, 
    onExit, 
    onImageClick,
    mistakes = [], 
    onAddMistake, 
    onRemoveMistake,
    isEmbedded = false,
    enableConfiguration = true
}) => {
  const [view, setView] = useState<'config' | 'playing' | 'summary' | 'results' | 'review'>('config');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [mode, setMode] = useState<'exam' | 'study' | 'vault'>('exam');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [questionLimit, setQuestionLimit] = useState(25);
  
  // Professional Notification State
  const [notification, setNotification] = useState<{show: boolean, type: 'add' | 'remove'}>({ show: false, type: 'add' });
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyDiagrams, setOnlyDiagrams] = useState(false);

  const { speak, isSpeaking, cancel, speakingId } = useSpeech();
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- PERSISTENCE LOGIC ---
  useEffect(() => {
    if (isEmbedded) return;
    const savedState = localStorage.getItem('ot_quiz_active_session');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            // Only resume if we have valid data and we are in config mode
            if (view === 'config' && parsed.questions && parsed.questions.length > 0) {
                // Check if user wants to resume (simple logic: just resume)
                setQuestions(parsed.questions);
                setCurrentQIndex(parsed.currentQIndex);
                setTimeLeft(parsed.timeLeft);
                setMode(parsed.mode);
                setView(parsed.view);
                if (toggleHeader) toggleHeader(false);
            }
        } catch (e) {
            console.error("Failed to restore quiz session", e);
            localStorage.removeItem('ot_quiz_active_session');
        }
    }
  }, [isEmbedded]);

  // Save state on every change
  useEffect(() => {
    if (view === 'playing' || view === 'summary') {
        const stateToSave = {
            questions,
            currentQIndex,
            timeLeft,
            mode,
            view
        };
        localStorage.setItem('ot_quiz_active_session', JSON.stringify(stateToSave));
    } else if (view === 'results' || view === 'config') {
        localStorage.removeItem('ot_quiz_active_session');
    }
  }, [questions, currentQIndex, timeLeft, mode, view]);

  const categories = useMemo(() => {
    const cats = new Set(data.map(q => q.category));
    return Array.from(cats).sort((a: string, b: string) => 
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [data]);

  const currentPool = useMemo(() => {
      let pool = data;
      
      if (mode === 'vault') {
          pool = pool.filter(q => mistakes.includes(q.id));
      }
      
      if (selectedCategories.length > 0) {
          pool = pool.filter(q => selectedCategories.includes(q.category));
      }

      if (onlyDiagrams) {
          pool = pool.filter(q => q.questionImage || q.answerImage);
      }
      
      return pool;
  }, [mode, mistakes, selectedCategories, data, onlyDiagrams]);

  const currentPoolSize = currentPool.length;

  useEffect(() => {
      if (currentPoolSize === 0) {
          setQuestionLimit(0);
      } else if (questionLimit > currentPoolSize) {
          setQuestionLimit(currentPoolSize);
      } else if (questionLimit === 0 && currentPoolSize > 0) {
          setQuestionLimit(Math.min(25, currentPoolSize));
      }
  }, [currentPoolSize, questionLimit]);

  useEffect(() => {
      if (isEmbedded && !enableConfiguration && view === 'config' && currentPoolSize > 0) {
          startSession();
      }
  }, [isEmbedded, enableConfiguration, view, currentPoolSize]);

  const startSession = () => {
    if (currentPoolSize === 0) {
        if (mode === 'vault') {
             alert("Your Smart Review is empty! Great job mastering the content.");
        } else {
             alert("No questions available with the current filters.");
        }
        return;
    }

    const limit = Math.min(questionLimit, currentPoolSize);
    const prepared = [...currentPool]
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
        .map(q => ({
            id: q.id, 
            data: q,
            options: (q.options || [q.answerText]).sort(() => Math.random() - 0.5),
            correctOption: q.answerText, 
            userAnswer: null, 
            isFlagged: false
        } as QuizQuestion));

    setQuestions(prepared);
    setCurrentQIndex(0);
    setTimeLeft(prepared.length * 60); 
    setView('playing');
    if (toggleHeader) toggleHeader(false);
  };

  const restartQuiz = () => {
    localStorage.removeItem('ot_quiz_active_session');
    setView('config');
    setQuestions([]);
    if (toggleHeader) toggleHeader(true);
  };

  const toggleFlag = (index: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setQuestions(prev => {
          const newQ = [...prev];
          newQ[index] = { ...newQ[index], isFlagged: !newQ[index].isFlagged };
          return newQ;
      });
  };

  const goToSummary = () => {
      setView('summary');
  };

  // --- IMMEDIATE MISTAKE SYSTEM LOGIC ---
  const handleOptionSelect = React.useCallback((option: string) => {
      // Use functional update to access latest state without dependency
      setQuestions(prev => { 
          const c = [...prev]; 
          
          // Safety check
          if (!c[currentQIndex]) return c;

          // If already answered in Study/Vault mode, ignore click
          if ((mode === 'study' || mode === 'vault') && c[currentQIndex].userAnswer) return c;

          // Clone the object to avoid mutating state directly and ensure React.memo detects the change
          c[currentQIndex] = { ...c[currentQIndex], userAnswer: option };
          
          const currentQ = c[currentQIndex];
          const isCorrect = option === currentQ.correctOption;

          // Immediate Smart Review Update
          if (!isCorrect) {
              onAddMistake?.(currentQ.id);
              setNotification({ show: true, type: 'add' });
              setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 2000);
          } 
          else if (isCorrect && mode === 'vault') {
              onRemoveMistake?.(currentQ.id);
              setNotification({ show: true, type: 'remove' });
              setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 2000);
          }

          return c; 
      });
  }, [currentQIndex, mode, onAddMistake, onRemoveMistake]);

  // Preload next image
  useEffect(() => {
      const nextQ = questions[currentQIndex + 1];
      if (nextQ?.data.questionImage) {
          const img = new Image();
          img.src = cleanImageUrl(nextQ.data.questionImage);
      }
  }, [currentQIndex, questions]);

  const handleFinish = () => {
    cancel();
    localStorage.removeItem('ot_quiz_active_session');
    
    // AUTOMATICALLY ADD UNANSWERED OR WRONG QUESTIONS TO MISTAKES
    questions.forEach(q => {
        const isWrongOrSkipped = q.userAnswer !== q.correctOption;
        if (isWrongOrSkipped) {
            onAddMistake?.(q.id);
        }
    });

    setView('results');
  };

  useEffect(() => {
    let timer: any;
    if ((view === 'playing' || view === 'summary') && mode === 'exam') {
      timer = setInterval(() => {
          setTimeLeft(prev => {
              if (prev <= 1) {
                  clearInterval(timer);
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);
    }
    return () => {
        if (timer) clearInterval(timer);
    };
  }, [view, mode]); 

  useEffect(() => {
      if (timeLeft === 0 && (view === 'playing' || view === 'summary') && mode === 'exam') {
          handleFinish();
      }
  }, [timeLeft, view, mode]);

  // --- FILTER OPTIONS FOR MODAL ---
  const quizFilterOptions: FilterOption[] = [
    {
        label: 'Diagrams Only',
        subLabel: 'Visual Questions',
        icon: ImageIcon,
        isActive: onlyDiagrams,
        onClick: () => setOnlyDiagrams(!onlyDiagrams),
        colorTheme: 'rose'
    }
  ];

  // --- VIEW: CONFIGURATION ---
  if (view === 'config') {
    const filtersActive = selectedCategories.length > 0 || onlyDiagrams;

    return (
      <div className="h-full w-full flex items-center justify-center p-4 bg-slate-50/50 pb-32 md:pb-4">
          <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-scale-in flex flex-col max-h-[65vh] md:max-h-[90vh]">
            <div className="bg-slate-900 p-6 md:p-8 relative overflow-hidden shrink-0">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">Exam Configuration</h2>
                    <p className="text-rose-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Anatomy and Physiology OT</p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            </div>

            <div className="flex-1 p-6 md:p-8 space-y-4 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button 
                        onClick={() => setMode('exam')} 
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${mode === 'exam' ? 'border-rose-200 bg-rose-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${mode === 'exam' ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                            <Clock size={18} />
                        </div>
                        <h3 className={`font-bold text-sm ${mode === 'exam' ? 'text-rose-900' : 'text-slate-900'}`}>Exam</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Strict Timing</p>
                    </button>

                    <button 
                        onClick={() => setMode('study')} 
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${mode === 'study' ? 'border-indigo-200 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${mode === 'study' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                            <Zap size={18} />
                        </div>
                        <h3 className={`font-bold text-sm ${mode === 'study' ? 'text-indigo-900' : 'text-slate-900'}`}>Study</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Instant Feedback</p>
                    </button>

                    <button 
                        onClick={() => setMode('vault')} 
                        disabled={mistakes.length === 0}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${mode === 'vault' ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${mode === 'vault' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                            <RotateCcw size={18} />
                        </div>
                        <h3 className={`font-bold text-sm ${mode === 'vault' ? 'text-emerald-900' : 'text-slate-900'}`}>Smart Review</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{mistakes.length} Mistakes</p>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${filtersActive ? 'border-rose-200 bg-rose-50' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200'}`}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`p-2 rounded-lg ${filtersActive ? 'bg-rose-100 text-rose-600' : 'bg-white border border-slate-200 text-slate-400 group-hover:text-rose-500'}`}>
                                <Filter size={16}/>
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <span className={`text-[10px] font-black uppercase tracking-wider ${filtersActive ? 'text-rose-400' : 'text-slate-400'}`}>Filters</span>
                                <span className={`font-bold text-xs truncate ${filtersActive ? 'text-rose-900' : 'text-slate-700'}`}>
                                    {selectedCategories.length > 0 ? `${selectedCategories.length} Chapters` : onlyDiagrams ? 'Diagrams Only' : 'Default Pool'}
                                </span>
                            </div>
                        </div>
                        <ChevronRight size={16} className={`${filtersActive ? 'text-rose-400' : 'text-slate-400'} group-hover:translate-x-1 transition-transform shrink-0`} />
                    </button>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-center gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Question Limit</span>
                            <span className="font-bold text-xs text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">{questionLimit}</span>
                        </div>
                        <input 
                            type="range" 
                            min={Math.min(1, currentPoolSize)}
                            max={currentPoolSize} 
                            step="1" 
                            value={questionLimit || 0}
                            onChange={(e) => setQuestionLimit(parseInt(e.target.value))}
                            disabled={currentPoolSize === 0}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 hover:accent-rose-600 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 border-t border-slate-100 bg-white shrink-0">
                <button 
                    onClick={startSession}
                    disabled={currentPoolSize === 0}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-600 transition-all shadow-xl hover:shadow-rose-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Start Exam <ChevronRight size={16} />
                </button>
            </div>
          </div>

          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
            onClearAll={() => { setSelectedCategories([]); setOnlyDiagrams(false); }}
            mainOptions={quizFilterOptions}
            title="Exam Settings"
          />
      </div>
    );
  }

  // --- VIEW: PLAYING ---
  const currentQ = questions[currentQIndex];
  if (view === 'playing' && currentQ) {
    const isExam = mode === 'exam';
    const isStudy = mode === 'study' || mode === 'vault'; 
    const showFeedback = isStudy && currentQ.userAnswer; 

    return (
      <div className="h-full flex flex-col bg-white relative">
        
        <header className="h-14 md:h-16 glass border-b border-slate-100 flex items-center justify-between px-4 md:px-6 shrink-0 z-30">
            <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-white rounded-lg md:rounded-xl flex items-center justify-center font-black text-xs">
                    {currentQIndex + 1}
                </div>
                <div>
                    <h1 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none hidden md:block">
                        {isExam ? 'Assessment' : 'Study'}
                    </h1>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[120px] md:max-w-none">Anatomy and Physiology OT</p>
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                
                <button 
                    onClick={goToSummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                    title="Finish Exam Immediately"
                >
                    <ListChecks size={16} className="text-emerald-500" />
                    <span className="hidden sm:inline">Submit</span>
                </button>

                {isExam && (
                    <div className="px-3 py-1.5 md:px-4 md:py-2 bg-rose-50 text-rose-600 rounded-lg md:rounded-xl font-mono font-bold text-xs md:text-sm border border-rose-100 flex items-center gap-2">
                        <Clock size={14} />
                        {formatTime(timeLeft)}
                    </div>
                )}
                
                <button 
                    onClick={(e) => toggleFlag(currentQIndex, e)}
                    className={`p-2 rounded-lg md:rounded-xl border transition-all ${currentQ.isFlagged ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-400'}`}
                >
                    <Flag size={16} fill={currentQ.isFlagged ? "currentColor" : "none"} />
                </button>

                <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-50 rounded-lg md:rounded-xl text-slate-400 border border-slate-100"><LayoutGrid size={16} /></button>
            </div>
        </header>

        <QuizQuestionBody 
            currentQ={currentQ}
            isExam={isExam}
            showFeedback={showFeedback || false}
            onOptionSelect={handleOptionSelect}
            onImageClick={onImageClick}
        />

        <footer className="h-20 border-t border-slate-100 flex items-center justify-between px-4 md:px-6 shrink-0 bg-white/95 z-30 fixed bottom-0 left-0 right-0 md:relative">
            <button onClick={() => setCurrentQIndex(c => Math.max(0, c - 1))} disabled={currentQIndex === 0} className="px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest text-slate-400 disabled:opacity-20 flex items-center gap-2 transition-all hover:text-slate-900"><ChevronLeft size={16}/> Back</button>
            
            {currentQIndex === questions.length - 1 ? (
                <button 
                    onClick={goToSummary} 
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                    Submit Exam <ListChecks size={16} />
                </button>
            ) : (
                <button 
                    onClick={() => setCurrentQIndex(c => c + 1)} 
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                    Next <ChevronRight size={16} />
                </button>
            )}
        </footer>

        {/* Notification Toast */}
        {notification.show && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
                <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${
                    notification.type === 'add' 
                        ? 'bg-slate-900 text-white border-slate-800' 
                        : 'bg-emerald-500 text-white border-emerald-400'
                }`}>
                    {notification.type === 'add' ? (
                        <>
                            <div className="p-1 bg-white/20 rounded-full"><Save size={14} /></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Added to Smart Review</span>
                        </>
                    ) : (
                        <>
                            <div className="p-1 bg-white/20 rounded-full"><Check size={14} /></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Mastered & Removed</span>
                        </>
                    )}
                </div>
            </div>
        )}

        {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
                <div className="w-80 h-full bg-white shadow-2xl relative z-10 p-6 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Question Map</h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900"><X size={16} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-2 content-start custom-scrollbar p-1">
                        {questions.map((q, i) => (
                            <button 
                                key={i} 
                                onClick={() => { setCurrentQIndex(i); setIsSidebarOpen(false); }} 
                                className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-black transition-all relative ${
                                    currentQIndex === i 
                                        ? 'bg-slate-900 border-slate-900 text-white' 
                                        : q.userAnswer 
                                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                                            : 'bg-slate-50 border-slate-100 text-slate-300'
                                }`}
                            >
                                {i + 1}
                                {q.isFlagged && (
                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- VIEW: SUMMARY ---
  if (view === 'summary') {
      const answeredCount = questions.filter(q => q.userAnswer).length;
      const flaggedCount = questions.filter(q => q.isFlagged).length;
      const unansweredCount = questions.length - answeredCount;

      return (
          <div className="h-full w-full bg-slate-50 flex flex-col">
              <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                  <div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">Summary</h2>
                  </div>
                  {mode === 'exam' && (
                        <div className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-mono font-bold text-xs border border-rose-100 flex items-center gap-2">
                            <Clock size={14} />
                            {formatTime(timeLeft)}
                        </div>
                  )}
              </header>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12">
                  <div className="max-w-4xl mx-auto space-y-6">
                      <div className="grid grid-cols-3 gap-3 md:gap-4">
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                              <span className="text-2xl font-black text-blue-600 mb-1">{answeredCount}</span>
                              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Answered</span>
                          </div>
                          <div className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center ${unansweredCount > 0 ? 'border-rose-100 bg-rose-50' : 'border-slate-100'}`}>
                              <span className={`text-2xl font-black mb-1 ${unansweredCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>{unansweredCount}</span>
                              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Unanswered</span>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                              <span className="text-2xl font-black text-rose-500 mb-1">{flaggedCount}</span>
                              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Flagged</span>
                          </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                              {questions.map((q, i) => (
                                  <button 
                                    key={i}
                                    onClick={() => { setCurrentQIndex(i); setView('playing'); }}
                                    className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-black transition-all relative ${
                                        q.userAnswer 
                                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                                            : 'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}
                                  >
                                      {i + 1}
                                      {q.isFlagged && <Flag size={10} className="text-rose-500 absolute top-1 right-1" fill="currentColor" />}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>

              <footer className="p-4 md:p-6 bg-white border-t border-slate-200 shrink-0 flex justify-between items-center">
                  <button onClick={() => setView('playing')} className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:border-slate-300">
                      Return
                  </button>
                  <button 
                    onClick={handleFinish} 
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2"
                  >
                      Finish <CheckCircle2 size={16} />
                  </button>
              </footer>
          </div>
      );
  }

  // --- VIEW: RESULTS ---
  if (view === 'results') {
    const score = questions.filter(q => q.userAnswer === q.correctOption).length;
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const mistakesCount = questions.length - score;
    const isPass = pct >= 60;

    return (
        <div className="h-full w-full bg-slate-50 overflow-y-auto custom-scrollbar p-4 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden animate-scale-in flex flex-col my-auto shrink-0">
                <div className={`p-8 text-center relative overflow-hidden bg-slate-900`}>
                    <div className="relative z-10">
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-xl ${isPass ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                            {isPass ? <Trophy size={32} fill="currentColor" /> : <RotateCcw size={32} />}
                        </div>
                        <h2 className="text-4xl font-black text-white font-display tracking-tight mb-1">{pct}%</h2>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">{isPass ? 'Passed' : 'Review Needed'}</p>
                    </div>
                    <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 pointer-events-none ${isPass ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                </div>

                <div className="p-6 md:p-8 space-y-6 bg-white">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                            <span className="block text-xl font-black text-slate-900">{score}</span>
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Correct</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                            <span className="block text-xl font-black text-slate-900">{questions.length}</span>
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Total</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => setView('review')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-[0.15em] shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            <BarChart3 size={16} /> Review Answers
                        </button>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={restartQuiz} className="py-4 bg-white border-2 border-slate-100 rounded-xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:border-slate-300 hover:text-slate-900 transition-all">
                                Retake
                            </button>
                            <button onClick={() => { if(onExit) onExit(); restartQuiz(); }} className="py-4 bg-white border-2 border-rose-100 rounded-xl font-black uppercase text-[10px] tracking-widest text-rose-500 hover:bg-rose-50 transition-all">
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // --- VIEW: REVIEW ---
  if (view === 'review') {
      return (
          <div className="h-full flex flex-col bg-slate-50">
              <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 sticky top-0 z-30">
                  <div className="flex items-center gap-3">
                      <button onClick={() => setView('results')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ArrowLeft size={18}/></button>
                      <h3 className="font-black text-xs uppercase tracking-widest">Review</h3>
                  </div>
              </header>
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
                  <div className="max-w-3xl mx-auto space-y-6">
                      {questions.map((q, idx) => {
                          const isCorrect = q.userAnswer === q.correctOption;
                          return (
                              <div key={idx} className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm ${isCorrect ? 'border-emerald-100' : 'border-rose-100'}`}>
                                  <div className="p-5 md:p-6 space-y-4">
                                      <div className="flex justify-between items-start">
                                          <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded">{q.data.category.split(':')[0]}</span>
                                          {isCorrect ? <CheckCircle2 className="text-emerald-500" size={18} /> : <AlertTriangle className="text-rose-500" size={18} />}
                                      </div>
                                      
                                      {q.data.questionImage && (
                                          <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-2 cursor-zoom-in" onClick={() => onImageClick?.(q.data.questionImage!)}>
                                              <img src={cleanImageUrl(q.data.questionImage)} className="max-h-48 object-contain rounded-lg" alt="Review Diagram" />
                                          </div>
                                      )}

                                      <h4 className="text-base font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: q.data.questionText }} />
                                      
                                      <div className="space-y-2">
                                          <div className={`p-3 rounded-lg text-xs font-bold flex items-center justify-between ${isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
                                              <span>Selected: {q.userAnswer || 'None'}</span>
                                              {!isCorrect && <X size={14} />}
                                          </div>
                                          {!isCorrect && (
                                              <div className="p-3 rounded-lg bg-slate-50 text-slate-900 text-xs font-bold flex items-center justify-between border border-slate-100">
                                                  <span>Correct: {q.correctOption}</span>
                                                  <Check size={14} className="text-emerald-500" />
                                              </div>
                                          )}
                                      </div>

                                      {/* Rationale in Review Mode - REMOVED */}
                                      {/*
                                      <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 mt-2">
                                          <p className="text-xs text-slate-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: q.data.explanation || "Standard identification." }} />
                                      </div>
                                      */}
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
              <footer className="p-4 bg-white border-t border-slate-100">
                  <button onClick={() => { if (isEmbedded && onExit) { onExit(); restartQuiz(); } else { restartQuiz(); } }} className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl">{isEmbedded ? 'Exit' : 'Back to Setup'}</button>
              </footer>
          </div>
      );
  }

  return null;
};

export default Quiz;
