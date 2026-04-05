
import React, { useState, useMemo, useEffect } from 'react';
import { Question } from '../types';
import { 
  Search, Maximize2, X, Filter, AlertTriangle, 
  BrainCircuit, Scan, ChevronLeft
} from 'lucide-react';
import FilterModal, { FilterOption } from './FilterModal';
import Quiz from './Quiz';
import { cleanImageUrl } from '../utils';

interface InteractiveAtlasProps {
  data: Question[];
  onImageClick?: (url: string) => void;
  mistakes?: string[]; 
  isActive?: boolean;
}

const InteractiveAtlas: React.FC<InteractiveAtlasProps> = ({ 
    data, 
    onImageClick, 
    mistakes = [],
    isActive = true
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(() => localStorage.getItem('ot_atlas_selected_image') || null);
  const [isImageExpanded, setIsImageExpanded] = useState(() => localStorage.getItem('ot_atlas_image_expanded') === 'true');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [search, setSearch] = useState(() => localStorage.getItem('ot_atlas_search') || '');
  const [visibleLimit, setVisibleLimit] = useState(24);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMistakesOnly, setShowMistakesOnly] = useState(() => localStorage.getItem('ot_atlas_filter_mistakes') === 'true');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('ot_atlas_filter_categories') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (selectedImage && isActive) {
        localStorage.setItem('ot_atlas_selected_image', selectedImage);
        document.body.style.overflow = 'hidden';
    } else {
        if (!selectedImage) {
            localStorage.removeItem('ot_atlas_selected_image');
            setIsQuizActive(false); 
        }
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage, isActive]);

  const categories = useMemo(() => {
    const cats = new Set(data.map(q => q.category));
    return Array.from(cats).sort((a: string, b: string) => 
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [data]);

  const filterOptions: FilterOption[] = [];

  const atlasItems = useMemo(() => {
    const imagesMap = new Map<string, Question[]>();
    data.forEach(q => {
      const url = q.questionImage || q.answerImage;
      if (url) {
        if (!imagesMap.has(url)) imagesMap.set(url, []);
        imagesMap.get(url)?.push(q);
      }
    });

    let items = Array.from(imagesMap.entries()).map(([url, questions]) => ({
      url,
      category: questions[0].category,
      related: questions,
      title: questions[0].questionText.replace(/^In the diagram,?\s*/i, '').replace(/^Identify the\s+/i, '').replace(/\??$/i, '').trim(),
      hasMistake: questions.some(q => mistakes.includes(q.id))
    }));

    if (showMistakesOnly) items = items.filter(item => item.hasMistake);
    if (selectedCategories.length > 0) items = items.filter(item => selectedCategories.includes(item.category));
    if (search.trim()) {
        const term = search.toLowerCase();
        items = items.filter(item => item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term));
    }
    return items;
  }, [data, search, showMistakesOnly, selectedCategories, mistakes]);

  const activeEntry = useMemo(() => atlasItems.find(i => i.url === selectedImage), [atlasItems, selectedImage]);

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      
      {/* FULL SCREEN QUIZ MODE OVERLAY */}
      {isQuizActive && activeEntry && (
        <div className="fixed inset-0 z-[500] bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
                onClick={() => setIsQuizActive(false)}
                className="absolute top-4 right-4 z-[600] p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 active:scale-90 transition-all shadow-xl border border-slate-200"
            >
                <X size={24} />
            </button>
            <Quiz 
                data={activeEntry.related} 
                isEmbedded={true} // Triggers auto-start
                enableConfiguration={false} 
                onExit={() => setIsQuizActive(false)} 
                onImageClick={onImageClick} 
                toggleHeader={() => {}} 
                mistakes={mistakes}
            />
        </div>
      )}

      {/* Top Bar */}
      <div className="px-4 py-4 md:px-8 md:py-6 sticky top-0 z-40 bg-white/95 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex gap-3 items-center">
            <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search diagram titles..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100/50 border border-slate-200 text-sm focus:bg-white outline-none transition-all"
                />
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="h-[46px] px-6 rounded-xl border border-slate-200 bg-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm active:scale-95"><Filter size={16} /> Filters</button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar bg-slate-50/50">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 pb-32">
            {atlasItems.slice(0, visibleLimit).map((item, idx) => (
                <div key={idx} onClick={() => setSelectedImage(item.url)} className="group cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col overflow-hidden active:scale-[0.99]">
                    <div className="aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src={cleanImageUrl(item.url)} className="max-w-full max-h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">{item.category.split(':')[0]}</span>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">{item.title}</h3>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <Scan size={12} /> {item.related.length} Points
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {visibleLimit < atlasItems.length && (
            <div className="text-center pb-20 pt-4">
                <button 
                    onClick={() => setVisibleLimit(l => l + 24)} 
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 active:scale-95"
                >
                    Load More
                </button>
            </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeEntry && !isQuizActive && (
        <div className="fixed inset-0 z-[300] bg-slate-950/95 animate-in fade-in duration-300 flex flex-col">
          
          <button 
            onClick={() => setSelectedImage(null)} 
            className="absolute top-4 right-4 z-[350] p-3 bg-white/10 text-white rounded-full hover:bg-white/20 active:scale-90 transition-all border border-white/10 shadow-lg"
          >
            <X size={24} />
          </button>

          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Image Section */}
            <div className={`
                relative transition-all duration-500 bg-black/40 flex items-center justify-center p-4 overflow-hidden 
                h-[45vh] w-full shrink-0
            `}>
                <img 
                    src={cleanImageUrl(activeEntry.url, 1200)} 
                    className="max-w-full max-h-full object-contain shadow-2xl cursor-zoom-in"
                    alt="Detail" 
                    onClick={() => onImageClick?.(activeEntry.url)}
                    referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 w-max max-w-[90%] overflow-x-auto p-1">
                    <button 
                        onClick={() => onImageClick?.(activeEntry.url)} 
                        className="bg-white/10 text-white px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg border border-white/20 active:scale-95 whitespace-nowrap"
                    >
                        <Maximize2 size={14} /> Zoom
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white flex flex-col relative z-10 transition-all duration-500 flex-1 h-[55vh] rounded-t-[2rem] -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col h-full overflow-hidden p-6 md:p-10">
                    <div className="shrink-0 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">
                                    {activeEntry.category.split(':')[0]}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
                                    {activeEntry.title}
                                </h2>
                            </div>
                            
                            {/* ACTION BUTTON - Starts Full Quiz System */}
                            <button 
                                onClick={() => setIsQuizActive(true)} 
                                className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-300 hover:bg-rose-600 hover:shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                <BrainCircuit size={20} />
                                <span>Launch Exam Mode</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1 pb-safe">
                        <div className="px-1 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Available Data Points ({activeEntry.related.length})
                        </div>
                        {activeEntry.related.map((point, pIdx) => (
                            <div key={pIdx} className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-slate-200 transition-all">
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 shadow-sm">
                                        {pIdx + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 leading-snug">
                                            {point.questionText.replace(/^In the diagram,?\s*/i, '').replace(/^Identify the\s+/i, '').replace(/\??$/i, '')}
                                        </p>
                                        <p className="text-sm font-medium text-slate-500 mt-1">
                                            {point.answerText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        categories={categories} 
        selectedCategories={selectedCategories} 
        onToggleCategory={cat => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} 
        onClearAll={() => { setSelectedCategories([]); setShowMistakesOnly(false); }} 
        mainOptions={filterOptions}
        title="Atlas Filters" 
      />
    </div>
  );
};

export default InteractiveAtlas;
