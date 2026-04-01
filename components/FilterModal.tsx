
import React from 'react';
import { X, Check, Filter, Trash2, AlertTriangle } from 'lucide-react';

export interface FilterOption {
  label: string;
  subLabel?: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  colorTheme: 'amber' | 'indigo' | 'rose' | 'emerald';
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearAll: () => void;
  mainOptions: FilterOption[];
  onWipeVault?: () => void; // Added prop for deleting mistakes
  title?: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onToggleCategory,
  onClearAll,
  mainOptions,
  onWipeVault,
  title = "System Filters"
}) => {
  if (!isOpen) return null;

  // Helper for dynamic colors
  const getThemeClasses = (theme: string, active: boolean) => {
    const base = "border-2 transition-all shadow-sm";
    if (!active) return `${base} bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200`;
    
    switch (theme) {
      case 'amber': return `${base} bg-amber-50 border-amber-500 text-amber-700 shadow-amber-100`;
      case 'indigo': return `${base} bg-indigo-50 border-indigo-500 text-indigo-700 shadow-indigo-100`;
      case 'emerald': return `${base} bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-100`;
      case 'rose': default: return `${base} bg-rose-50 border-rose-500 text-rose-700 shadow-rose-100`;
    }
  };

  const getIconBg = (theme: string, active: boolean) => {
    if (!active) return "bg-white text-slate-300";
    switch (theme) {
      case 'amber': return "bg-amber-100 text-amber-600";
      case 'indigo': return "bg-indigo-100 text-indigo-600";
      case 'emerald': return "bg-emerald-100 text-emerald-600";
      case 'rose': default: return "bg-rose-100 text-rose-600";
    }
  };

  return (
    <div className="fixed inset-0 z-[400] animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/90" onClick={onClose}></div>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom duration-500 shadow-3xl border-t border-rose-100 pb-safe">
         
         {/* Header */}
         <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100 sticky top-0 bg-white z-10">
            <h3 className="font-black uppercase text-sm text-slate-800 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div> {title}
            </h3>
            <button onClick={onClose} className="p-3 bg-rose-50 rounded-2xl text-rose-600 transition-colors hover:bg-rose-100 hover:scale-105 active:scale-95">
                <X size={20} />
            </button>
         </div>
         
         {/* Added pb-32 to prevent sticky footer from covering content */}
         <div className="space-y-8 pb-32">
            {/* Main Options Grid */}
            {mainOptions.length > 0 && (
                <div className={`grid ${mainOptions.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    {mainOptions.map((opt, idx) => {
                        const Icon = opt.icon;
                        return (
                            <button 
                                key={idx}
                                onClick={opt.onClick}
                                className={`p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 ${getThemeClasses(opt.colorTheme, opt.isActive)}`}
                            >
                                <div className={`p-3 rounded-full ${getIconBg(opt.colorTheme, opt.isActive)}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="text-center">
                                    <span className="block font-black uppercase text-xs tracking-widest">{opt.label}</span>
                                    {opt.subLabel && <span className="text-[10px] font-bold opacity-60">{opt.subLabel}</span>}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
            
            {/* Category List */}
            <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                       <Filter size={12} /> Content Selection
                   </h4>
                   <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded">
                       {selectedCategories.length > 0 ? selectedCategories.length : 'All'} Active
                   </span>
               </div>
               
               <div className="grid gap-3">
                  {categories.map(cat => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                        <button 
                            key={cat} 
                            onClick={() => onToggleCategory(cat)}
                            className={`w-full text-left p-5 rounded-2xl text-[11px] font-bold uppercase transition-all flex items-center justify-between border-2 group active:scale-[0.98] ${isSelected ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                        >
                          <span className="truncate pr-4">{cat}</span> 
                          
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'border-rose-500 bg-rose-500 scale-110' : 'border-slate-200 group-hover:border-slate-300'}`}>
                             {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                          </div>
                        </button>
                    );
                  })}
               </div>
            </div>
         </div>
            
         {/* Footer - Sticky */}
         <div className="pt-4 sticky bottom-0 bg-white pb-safe space-y-3 shadow-[0_-10px_40px_rgba(255,255,255,0.9)]">
            <button 
                onClick={() => { onClearAll(); onClose(); }} 
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
                <span>Reset & Show All</span>
            </button>

            {onWipeVault && (
                <button 
                onClick={onWipeVault}
                className="w-full py-4 bg-rose-50 text-rose-700 border-2 border-rose-100 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-100 hover:border-rose-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                <Trash2 size={16} /> Delete Mistakes History
                </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default FilterModal;
