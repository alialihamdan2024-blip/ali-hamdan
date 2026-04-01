import React, { useState, useEffect, useMemo } from 'react';
import { Question } from '../types';
import { 
  ArrowLeft, ArrowRight, Volume2, 
  Shuffle, ImageIcon, Filter, Layers, 
  ArrowLeftRight, AlertTriangle, CheckCircle2, Trophy,
  RotateCcw, Search, Sparkles
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import FilterModal, { FilterOption } from './FilterModal';
import { cleanImageUrl } from '../utils';

interface FlashcardsProps {
  data: Question[];
  onImageClick?: (url: string) => void;
  mistakes?: string[]; 
  onToggleMistake?: (id: string, shouldAdd: boolean) => void; 
  onClearMistakes?: () => void;
  isActive?: boolean;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ 
    data, 
    onImageClick, 
    mistakes = [], 
    onToggleMistake, 
    onClearMistakes,
    isActive = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('ot_flashcard_index');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [isShuffled, setIsShuffled] = useState(() => {
    return localStorage.getItem('ot_flashcard_shuffle') === 'true';
  });

  const [isReversed, setIsReversed] = useState(() => {
    return localStorage.getItem('ot_flashcard_reversed') === 'true';
  });

  const [isFlipped, setIsFlipped] = useState(false);
  
  const [showImagesOnly, setShowImagesOnly] = useState(() => localStorage.getItem('ot_filter_images') === 'true');
  const [showMistakesOnly, setShowMistakesOnly] = useState(() => localStorage.getItem('ot_filter_mistakes') === 'true');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ot_filter_categories') || '[]');
    } catch { return []; }
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { speak, cancel, isSpeaking, speakingId } = useSpeech();

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const minSwipeDistance = 50;

  const categories = useMemo(() => {
    const cats = new Set(data.map(q => q.category));
    return Array.from(cats).sort((a: string, b: string) => 
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [data]);

  const activeData = useMemo(() => {
    let filtered = data;
    if (showMistakesOnly) filtered = filtered.filter(q => mistakes.includes(q.id));
    if (showImagesOnly) filtered = filtered.filter(q => q.questionImage || q.answerImage);
    if (selectedCategories.length > 0) filtered = filtered.filter(q => selectedCategories.includes(q.category));
    
    if (isShuffled) {
        return [...filtered].sort((a, b) => a.id.localeCompare(b.id)); // Consistent sort for now
    }
    return filtered;
  }, [data, showImagesOnly, selectedCategories, showMistakesOnly, mistakes, isShuffled]);

  useEffect(() => localStorage.setItem('ot_flashcard_index', currentIndex.toString()), [currentIndex]);
  useEffect(() => localStorage.setItem('ot_flashcard_shuffle', String(isShuffled)), [isShuffled]);
  useEffect(() => localStorage.setItem('ot_flashcard_reversed', String(isReversed)), [isReversed]);
  useEffect(() => localStorage.setItem('ot_filter_images', String(showImagesOnly)), [showImagesOnly]);
  useEffect(() => localStorage.setItem('ot_filter_mistakes', String(showMistakesOnly)), [showMistakesOnly]);
  useEffect(() => localStorage.setItem('ot_filter_categories', JSON.stringify(selectedCategories)), [selectedCategories]);

  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFilterOpen) return;
      if (e.key === 'ArrowRight') {
        if (currentIndex < activeData.length - 1) {
          setIsFlipped(false);
          cancel();
          setTimeout(() => setCurrentIndex(c => c + 1), 150);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setIsFlipped(false);
          cancel();
          setTimeout(() => setCurrentIndex(c => c - 1), 150);
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeData.length, isFilterOpen, cancel, isActive]); 

  const handleResolveMistake = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMistake?.(id, false);
  };

  const handleWipeVault = () => {
    if (confirm("Permanently delete all recorded mistakes?")) {
        onClearMistakes?.();
        setShowMistakesOnly(false);
    }
  };

  useEffect(() => {
    if (activeData.length > 0 && currentIndex >= activeData.length) {
      setCurrentIndex(0);
    }
  }, [activeData.length]);

  const currentCard = activeData[currentIndex];

  const frontContent = isReversed ? {
    label: 'Answer', text: currentCard?.answerText, image: currentCard?.answerImage, isQuestion: false
  } : {
    label: 'Question', text: currentCard?.questionText, image: currentCard?.questionImage, isQuestion: true
  };

  const backContent = isReversed ? {
    label: 'Question', text: currentCard?.questionText, image: currentCard?.questionImage, isQuestion: true
  } : {
    label: 'Answer', text: currentCard?.answerText, image: currentCard?.answerImage, isQuestion: false
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < activeData.length - 1) {
      setIsFlipped(false);
      cancel();
      setTimeout(() => setCurrentIndex(c => c + 1), 150);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setIsFlipped(false);
      cancel();
      setTimeout(() => setCurrentIndex(c => c - 1), 150);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX > minSwipeDistance) handleNext();
      else if (distanceX < -minSwipeDistance) handlePrev();
    }
  };

  const handleSpeak = (e: React.MouseEvent, text: string, suffix: string) => {
    e.stopPropagation();
    if (isSpeaking) cancel(); else speak(text, currentCard.id + suffix);
  };

  const getTextSizeClass = (text: string = '') => {
    const len = text.length;
    if (len < 20) return 'text-3xl md:text-5xl';
    if (len < 60) return 'text-2xl md:text-4xl';
    if (len < 120) return 'text-xl md:text-3xl';
    if (len < 250) return 'text-lg md:text-2xl';
    if (len < 400) return 'text-base md:text-xl';
    return 'text-sm md:text-lg'; 
  };

  const formatCardText = (text: string = '') => {
    if (!text) return '';
    return text
      .replace(/^Define the term:\s*/i, '')
      .replace(/^Anatomical term for:\s*/i, '')
      .replace(/^Define:\s*/i, '')
      .replace(/^Identify the\s+/i, '')
      .trim();
  };

  const filterOptions: FilterOption[] = [
    {
        label: 'Diagrams Only',
        subLabel: 'Visual Study',
        icon: ImageIcon,
        isActive: showImagesOnly,
        onClick: () => { setShowImagesOnly(!showImagesOnly); setShowMistakesOnly(false); },
        colorTheme: 'indigo'
    }
  ];

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 ${showMistakesOnly ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-white text-slate-400 border-slate-100'}`}>
           {showMistakesOnly ? <Trophy size={48} /> : <Layers size={48} />}
        </div>
        <div className="space-y-3 max-w-xs mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
                {showMistakesOnly ? "Review Complete" : "No Cards Found"}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
                {showMistakesOnly ? "Excellent work! You've resolved all items in your Smart Review list." : "Try adjusting your filters to see more cards."}
            </p>
        </div>
        <button 
          onClick={() => { setSelectedCategories([]); setShowImagesOnly(false); setShowMistakesOnly(false); }}
          className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  const frontDisplayText = formatCardText(frontContent.text);
  const backDisplayText = formatCardText(backContent.text);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative">
      {/* Top Controls */}
      <div className="flex justify-between items-center px-4 md:px-6 py-2 md:py-6 shrink-0 gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsFilterOpen(true)}
             className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${selectedCategories.length > 0 || showImagesOnly ? 'border-rose-200 bg-rose-50 text-rose-700' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
           >
             <Filter className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
           </button>
        </div>

        <div className="flex items-center gap-2">
           <span className="text-base md:text-lg font-black text-slate-900 font-display flex items-baseline gap-1 mr-2 hidden sm:flex">
                 {currentIndex + 1} 
                 <span className="text-xs md:text-sm font-bold text-slate-300">/ {activeData.length}</span>
           </span>

           <button 
             onClick={() => { setIsReversed(!isReversed); setIsFlipped(false); }}
             className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border transition-all flex items-center justify-center hover:bg-slate-50 shrink-0 ${isReversed ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'bg-white border-slate-200 text-slate-400'}`}
             title="Reverse Sides"
           >
             <ArrowLeftRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
           </button>
           <button 
             onClick={() => { setIsShuffled(!isShuffled); setCurrentIndex(0); }}
             className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border transition-all flex items-center justify-center hover:bg-slate-50 shrink-0 ${isShuffled ? 'border-purple-500 text-purple-600 bg-purple-50' : 'bg-white border-slate-200 text-slate-400'}`}
             title="Shuffle Deck"
           >
             <Shuffle className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
           </button>
        </div>
      </div>

      {/* Card Container */}
      <div className="flex-1 px-4 md:px-8 pb-2 flex flex-col justify-center min-h-0 relative perspective-1000">
        <div 
          className="relative w-full h-full cursor-pointer select-none"
          onClick={() => setIsFlipped(!isFlipped)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* FRONT FACE */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-card hover:shadow-card-hover border border-slate-100 p-5 md:p-12 flex flex-col group overflow-hidden">
               <div className="w-full flex justify-between items-start mb-2 shrink-0">
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                     {frontContent.label}
                   </span>
               </div>
               
               <div className="flex-1 w-full overflow-y-auto custom-scrollbar relative">
                 <div className="min-h-full flex flex-col items-center justify-center py-2 space-y-4 md:space-y-6">
                    {frontContent.image && (
                      <div 
                        className="w-full flex items-center justify-center rounded-xl md:rounded-2xl p-2 md:p-4 bg-slate-50/50 border border-slate-100 relative group/img cursor-zoom-in shrink-0"
                        onClick={(e) => { e.stopPropagation(); onImageClick?.(frontContent.image!); }}
                      >
                        <img 
                          src={cleanImageUrl(frontContent.image)} 
                          className="max-h-[30vh] md:max-h-[40vh] max-w-full object-contain rounded-lg" 
                          alt="Content" 
                        />
                        <div className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Search size={14} />
                        </div>
                      </div>
                    )}
                    
                    <h2 
                        className={`font-bold leading-tight text-slate-800 break-words w-full text-center font-display ${getTextSizeClass(frontDisplayText)}`} 
                        dangerouslySetInnerHTML={{ __html: frontDisplayText }} 
                    />
                 </div>
               </div>
               
                <button 
                    onClick={(e) => handleSpeak(e, frontDisplayText, '-front')}
                    className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-rose-600 shadow-xl shadow-slate-200 hover:shadow-rose-200 transition-all z-20 hover:scale-110 active:scale-95"
                >
                    {isSpeaking && speakingId?.endsWith('-front') ? (
                        <div className="flex gap-0.5 items-center justify-center h-3">
                            <div className="w-0.5 h-full bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></div>
                            <div className="w-0.5 h-3/4 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></div>
                            <div className="w-0.5 h-1/2 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite]"></div>
                        </div>
                    ) : (
                        <Volume2 className="w-[18px] h-[18px] md:w-5 md:h-5" />
                    )}
                </button>
            </div>

            {/* BACK FACE - Revised for Better Explanation Layout */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-premium border border-slate-800 p-5 md:p-12 flex flex-col group overflow-hidden">
               <div className="w-full flex justify-between items-start mb-2 shrink-0">
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                     {backContent.label}
                   </span>
               </div>
               
               <div className="flex-1 w-full overflow-y-auto custom-scrollbar relative flex flex-col">
                 <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-6">
                    {backContent.image && (
                      <div 
                        className="w-full flex items-center justify-center rounded-xl md:rounded-2xl p-2 md:p-4 bg-white/5 border border-white/10 relative group/img cursor-zoom-in shrink-0"
                        onClick={(e) => { e.stopPropagation(); onImageClick?.(backContent.image!); }}
                      >
                        <img 
                          src={cleanImageUrl(backContent.image)} 
                          className="max-h-[25vh] md:max-h-[35vh] max-w-full object-contain rounded-lg" 
                          alt="Content" 
                        />
                        <div className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Search size={14} />
                        </div>
                      </div>
                    )}
                    
                    <p 
                        className={`font-bold leading-relaxed text-emerald-400 break-words w-full text-center font-display ${getTextSizeClass(backDisplayText)}`} 
                        dangerouslySetInnerHTML={{ __html: backDisplayText }} 
                    />
                 </div>

                 {/* Improved Explanation Section - Legendary Style - REMOVED */}
                 {/* 
                 {!backContent.isQuestion && currentCard.explanation && (
                    <div className="mt-6 shrink-0 animate-in slide-in-from-bottom-4 duration-500 border-t border-slate-800 pt-4">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 shadow-inner">
                            <p 
                                className="text-base md:text-lg font-medium text-slate-200 leading-relaxed font-sans" 
                                dangerouslySetInnerHTML={{ __html: currentCard.explanation }} 
                            />
                        </div>
                    </div>
                 )}
                 */}
               </div>

                <button 
                    onClick={(e) => handleSpeak(e, backDisplayText, '-back')}
                    className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-slate-900 rounded-full hover:bg-emerald-400 hover:text-white shadow-xl shadow-black/20 transition-all z-20 hover:scale-110 active:scale-95"
                >
                    {isSpeaking && speakingId?.endsWith('-back') ? (
                        <div className="flex gap-0.5 items-center justify-center h-3">
                            <div className="w-0.5 h-full bg-current rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></div>
                            <div className="w-0.5 h-3/4 bg-current rounded-full animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></div>
                            <div className="w-0.5 h-1/2 bg-current rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite]"></div>
                        </div>
                    ) : (
                        <Volume2 className="w-[18px] h-[18px] md:w-5 md:h-5" />
                    )}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Bottom */}
      <div className="px-6 pb-6 pt-2 flex justify-center gap-4 md:gap-6 items-center shrink-0">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-40 shadow-sm active:translate-y-0.5">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button onClick={() => setIsFlipped(!isFlipped)} className="h-12 md:h-14 px-8 md:px-12 rounded-2xl bg-rose-600 flex items-center gap-3 text-white transition-all shadow-lg font-black uppercase text-[10px] md:text-xs tracking-[0.2em] group">
            <RotateCcw className={`w-4 h-4 md:w-[18px] md:h-[18px] transition-transform duration-500 ${isFlipped ? '-rotate-180' : 'rotate-0'}`} />
            Flip Card
        </button>

        <button onClick={handleNext} disabled={currentIndex === activeData.length - 1} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-40 shadow-sm active:translate-y-0.5">
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
        onClearAll={() => { setSelectedCategories([]); setShowImagesOnly(false); setShowMistakesOnly(false); }}
        onWipeVault={mistakes.length > 0 ? handleWipeVault : undefined}
        mainOptions={filterOptions}
        title="Deck Filters"
      />
    </div>
  );
};