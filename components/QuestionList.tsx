
import React, { useState, useMemo, useEffect } from 'react';
import { Question } from '../types';
import { 
  Search, BookText, 
  Filter, ArrowUpDown, AlertTriangle, Trash2, FileText, Check, Volume2, VolumeX
} from 'lucide-react';
import FilterModal, { FilterOption } from './FilterModal';
import { useSpeech } from '../hooks/useSpeech';
import { cleanImageUrl } from '../utils';

// Text Cleaning Helper
const formatQuestionText = (text: string) => {
  if (!text) return '';
  return text
    .replace(/^Define the term:\s*/i, '')
    .replace(/^Anatomical term for:\s*/i, '')
    .replace(/^Define:\s*/i, '')
    .replace(/^Identify the\s+/i, '')
    .replace(/^In the diagram,?\s*/i, '')
    .trim();
};

interface QuestionListProps {
  data: Question[];
  onImageClick?: (url: string) => void;
  mistakes?: string[]; // Prop from App
  onToggleMistake?: (id: string, shouldAdd: boolean) => void; // Prop from App
  onClearMistakes?: () => void;
}

const ITEMS_PER_PAGE = 25;

const QuestionList: React.FC<QuestionListProps> = ({ 
    data, 
    onImageClick, 
    mistakes = [], 
    onToggleMistake, 
    onClearMistakes 
}) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  
  // Unified Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMistakesOnly, setShowMistakesOnly] = useState(false);
  const [showWrittenOnly, setShowWrittenOnly] = useState(false);

  const { speak, cancel, isSpeaking, speakingId } = useSpeech();

  // PERFORMANCE: Debounce Search Input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Wait 300ms after typing stops

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const removeMistake = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    if (confirm("Resolve this record from the Smart Review list?")) {
      onToggleMistake?.(id, false);
    }
  };

  const clearAllMistakes = () => {
    if (confirm("WARNING: This will wipe your entire Smart Review history. Are you sure?")) {
        onClearMistakes?.();
        setShowMistakesOnly(false); // Reset view if we were looking at them
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    let highlightedText = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![^<]*>)`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-rose-100 text-rose-700 rounded-sm px-0.5 font-bold">$1</mark>');
    });
    return highlightedText;
  };

  const handleSpeak = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    if (isSpeaking && speakingId === id) {
        cancel();
    } else {
        speak(text, id);
    }
  };

  const categories = useMemo(() => {
    const cats = new Set(data.map(q => q.category || 'General'));
    return Array.from(cats).sort((a: string, b: string) => 
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [data]);

  const processedData = useMemo(() => {
    let result = data;
    
    if (showMistakesOnly) {
        result = result.filter(q => mistakes.includes(q.id));
    }
    
    if (showWrittenOnly) {
        result = result.filter(q => {
            const isEssay = q.questionText.startsWith('Define') || 
                            q.questionText.startsWith('List') || 
                            q.questionText.startsWith('Describe') ||
                            q.answerText.length > 80;
            const hasFewOptions = !q.options || q.options.length < 4 || q.options.some(o => o.includes('Option'));
            return isEssay || hasFewOptions;
        });
    }

    if (selectedCategories.length > 0) {
        result = result.filter(q => selectedCategories.includes(q.category || 'General'));
    }
    
    // Use DEBOUNCED search term for filtering
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(q => 
        q.questionText.toLowerCase().includes(term) || 
        q.answerText.toLowerCase().includes(term) ||
        (q.explanation || '').toLowerCase().includes(term)
      );
    }
    
    if (sortOrder === 'asc') result = [...result].sort((a, b) => a.questionText.localeCompare(b.questionText));
    else if (sortOrder === 'desc') result = [...result].sort((a, b) => b.questionText.localeCompare(a.questionText));
    
    return result;
  }, [data, selectedCategories, debouncedSearch, sortOrder, showMistakesOnly, showWrittenOnly, mistakes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategories, showMistakesOnly, showWrittenOnly]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const currentData = processedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Filter Configuration
  const filterOptions: FilterOption[] = [
    {
        label: 'Concepts Only',
        subLabel: 'Written',
        icon: FileText,
        isActive: showWrittenOnly,
        onClick: () => { setShowWrittenOnly(!showWrittenOnly); setShowMistakesOnly(false); },
        colorTheme: 'indigo'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 pb-safe pt-4 md:pt-6">
      {/* Search Header */}
      <div className={`rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-12 mb-6 md:mb-8 text-white relative overflow-hidden shadow-2xl transition-all duration-500 ${showMistakesOnly ? 'bg-rose-700' : showWrittenOnly ? 'bg-indigo-600' : 'bg-rose-600'}`}>
        <BookText size={180} className="absolute -right-10 -top-10 opacity-10" />
        <div className="relative z-10 space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                {showMistakesOnly ? "Review" : showWrittenOnly ? "Concept" : "Global"}<br/><span className="text-white/80 not-italic">{showMistakesOnly ? "Focus List" : showWrittenOnly ? "Library" : "Index"}</span>
            </h2>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-70">
                {showMistakesOnly ? "Diagnostic Repair Mode" : "Integrated Registry v.7.0"}
            </p>
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder={showMistakesOnly ? "Search review items..." : "Search anatomy terms, chapters or definitions..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100/50 border border-slate-200 text-slate-700 font-medium text-sm focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-slate-500 transition-colors" size={20} />
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            {/* Filter Trigger Button */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg hover:bg-slate-100 transition-all"
            >
              <Filter size={14} /> Filters
              {(selectedCategories.length > 0 || showMistakesOnly || showWrittenOnly) && (
                 <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md">Active</span>
              )}
            </button>

            <div className="flex-1"></div>
            <button 
                onClick={() => setSortOrder(prev => prev === 'default' ? 'asc' : prev === 'asc' ? 'desc' : 'default')}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors text-white"
                title="Sort A-Z"
            >
                <ArrowUpDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid - content-visibility: auto speeds up rendering */}
      <div className="space-y-3 md:space-y-4 content-visibility-auto">
        {currentData.length > 0 ? (
          currentData.map((q) => (
            <div key={q.id} className={`bg-white rounded-3xl md:rounded-[2rem] border shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all overflow-hidden flex flex-col relative group ${mistakes.includes(q.id) ? 'border-rose-200 ring-2 ring-rose-50' : 'border-slate-100'}`}>
              {q.questionImage && (
                <div className="w-full h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 shrink-0 overflow-hidden" onClick={() => onImageClick?.(q.questionImage!)}>
                   <img src={cleanImageUrl(q.questionImage)} alt="Diagram" className="max-w-full max-h-full object-contain rounded-lg cursor-zoom-in" loading="lazy" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="p-5 md:p-8 flex-1">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 max-w-[70%] truncate">{q.category}</span>
                  <div className="flex items-center gap-2">
                    {/* Audio Button */}
                    <button 
                        onClick={(e) => handleSpeak(e, `${formatQuestionText(q.questionText)} ... Answer: ${q.answerText}`, q.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isSpeaking && speakingId === q.id ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                        title="Listen"
                    >
                        {isSpeaking && speakingId === q.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight mb-3" dangerouslySetInnerHTML={{ __html: highlightText(formatQuestionText(q.questionText), debouncedSearch) }} />
                <div className="relative pl-4 md:pl-6 border-l-4 border-slate-200">
                  <p className="text-sm md:text-base font-bold text-slate-500 leading-relaxed italic" dangerouslySetInnerHTML={{ __html: highlightText(q.answerText, debouncedSearch) }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
            <Search size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">
                {showMistakesOnly ? "Review list is empty. Great job!" : showWrittenOnly ? "No written/concept questions found." : "No matching medical records found"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12 mb-32 pb-safe">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white border border-slate-200 text-slate-400 font-black uppercase text-[10px] disabled:opacity-20 transition-all shadow-md">Prev</button>
          <div className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-slate-900 text-white flex items-center font-black text-[10px] tracking-widest shadow-xl">{currentPage} / {totalPages}</div>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white border border-slate-200 text-slate-400 font-black uppercase text-[10px] disabled:opacity-20 transition-all shadow-md">Next</button>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
        onClearAll={() => { setSelectedCategories([]); setShowWrittenOnly(false); setShowMistakesOnly(false); }}
        onWipeVault={mistakes.length > 0 ? clearAllMistakes : undefined}
        mainOptions={filterOptions}
        title="Library Filters"
      />
    </div>
  );
};

export default QuestionList;
