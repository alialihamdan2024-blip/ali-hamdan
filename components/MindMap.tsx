
import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, LocateFixed, ChevronRight, 
  BookOpen, X, FileText, Activity, Stethoscope,
  Search, Maximize2, Minimize2, Network
} from 'lucide-react';
import { FULL_CURRICULUM, TreeNode } from '../hooks/mindmap_data';

interface MindMapProps {
  onChapterSelect?: (category: string) => void;
}

interface LayoutNode extends TreeNode {
  x: number;
  y: number;
  totalHeight: number;
  computedColor: string;
  visibleChildren: LayoutNode[];
  depth: number;
}

const COLORS: Record<string, { main: string, light: string, dark: string, border: string, text: string }> = {
  root:   { main: '#0f172a', light: '#f8fafc', dark: '#020617', border: '#1e293b', text: '#ffffff' }, 
  level1: { main: '#e11d48', light: '#fff1f2', dark: '#9f1239', border: '#fda4af', text: '#881337' }, 
  level2: { main: '#0284c7', light: '#f0f9ff', dark: '#075985', border: '#7dd3fc', text: '#0c4a6e' }, 
  level3: { main: '#059669', light: '#ecfdf5', dark: '#065f46', border: '#6ee7b7', text: '#064e3b' }, 
  level4: { main: '#7c3aed', light: '#f5f3ff', dark: '#5b21b6', border: '#c4b5fd', text: '#4c1d95' }, 
  level5: { main: '#ea580c', light: '#fff7ed', dark: '#9a3412', border: '#fdba74', text: '#c2410c' }, 
  level6: { main: '#db2777', light: '#fdf2f8', dark: '#831843', border: '#f9a8d4', text: '#be185d' }, 
  slate:  { main: '#64748b', light: '#f8fafc', dark: '#334155', border: '#cbd5e1', text: '#1e293b' },
};

const getLevelColor = (depth: number) => {
  const levels = ['root', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6'];
  return levels[Math.min(depth, levels.length - 1)];
};

const deepClone = (node: TreeNode | undefined): TreeNode | undefined => {
  if (!node) return undefined;
  return {
    ...node,
    children: node.children ? node.children.map(c => deepClone(c)).filter(Boolean) as TreeNode[] : undefined
  };
};

const calculateLayout = (root: TreeNode): { nodes: LayoutNode[], links: any[], width: number, height: number } => {
  const nodes: LayoutNode[] = [];
  const links: any[] = [];
  const NODE_W = 340; 
  const NODE_H = 110;
  const GAP_X = 280; 
  const GAP_Y = 45;

  const build = (node: TreeNode, depth: number): LayoutNode => {
    const layoutNode: LayoutNode = {
      ...node,
      x: 0, y: 0, totalHeight: 0,
      computedColor: getLevelColor(depth),
      visibleChildren: [],
      depth
    };

    if (!node.collapsed && node.children && node.children.length > 0) {
      layoutNode.visibleChildren = node.children.map(c => build(c, depth + 1));
      layoutNode.totalHeight = layoutNode.visibleChildren.reduce((sum, c) => sum + c.totalHeight, 0);
    } else {
      layoutNode.totalHeight = NODE_H + GAP_Y;
    }
    return layoutNode;
  };

  const layoutRoot = build(root, 0);
  let maxD = 0;
  let maxY = 0;

  const assign = (node: LayoutNode, x: number, startY: number) => {
    node.x = x;
    maxD = Math.max(maxD, node.depth);
    if (node.visibleChildren.length === 0) {
      node.y = startY + (node.totalHeight - NODE_H) / 2;
    } else {
      let curY = startY;
      node.visibleChildren.forEach(c => {
        assign(c, x + NODE_W + GAP_X, curY);
        curY += c.totalHeight;
      });
      const firstY = node.visibleChildren[0].y;
      const lastY = node.visibleChildren[node.visibleChildren.length - 1].y;
      node.y = (firstY + lastY) / 2;
    }
    nodes.push(node);
    maxY = Math.max(maxY, node.y + NODE_H);
    node.visibleChildren.forEach(c => {
      links.push({
        source: { x: node.x + NODE_W, y: node.y + NODE_H / 2 },
        target: { x: c.x, y: c.y + NODE_H / 2 },
        color: c.computedColor
      });
    });
  };

  assign(layoutRoot, 200, 200);
  return { nodes, links, width: (maxD + 1) * (NODE_W + GAP_X) + 1200, height: maxY + 1200 };
};

const MindMapNode = React.memo(({ node, onToggle, onInspect }: any) => {
  const isRoot = node.depth === 0;
  const isLeaf = !node.children || node.children.length === 0;
  const theme = COLORS[node.computedColor] || COLORS.slate;
  const Icon = node.icon || (isLeaf ? FileText : Network);
  const isMatch = node.isMatch;

  return (
    <div
      className="absolute transition-all duration-300 ease-out group"
      style={{ left: node.x, top: node.y, width: 340, height: 110, zIndex: 100 - node.depth }}
    >
      <div 
        onClick={(e) => { e.stopPropagation(); onInspect(node); }}
        className={`
          w-full h-full rounded-[2.2rem] flex items-center px-7 gap-6 relative cursor-pointer select-none transition-all
          ${isRoot ? 'shadow-2xl scale-105 ring-[10px] ring-slate-100' : 'shadow-lg border-[3px] hover:shadow-2xl hover:-translate-y-1.5'}
          ${isMatch ? 'ring-[6px] ring-amber-400 scale-105 z-50' : ''}
        `}
        style={{
          backgroundColor: isMatch ? '#fffbeb' : (isRoot ? theme.main : '#ffffff'),
          borderColor: isMatch ? '#fbbf24' : (isRoot ? 'transparent' : theme.border),
          color: isRoot ? '#ffffff' : theme.dark,
        }}
      >
        {!isRoot && (
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-[5px] border-white shadow-md z-10" style={{ backgroundColor: theme.main }}></div>
        )}
        
        <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-inner ${isRoot ? 'bg-white/20 text-white' : ''}`} style={{ backgroundColor: isRoot ? undefined : (isMatch ? '#fcd34d' : theme.light), color: isRoot ? undefined : theme.main }}>
          <Icon size={36} strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-2">
          <p className={`text-lg font-black leading-tight truncate ${isRoot ? 'text-white' : 'text-slate-950'}`}>{node.label}</p>
          {node.description && !isRoot && (
             <p className="text-xs font-bold opacity-60 truncate mt-1.5">{node.description}</p>
          )}
        </div>

        {!isLeaf && (
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 hover:bg-black/10 ${node.collapsed ? '' : 'rotate-90'}`}
            style={{ color: isRoot ? 'white' : theme.main }}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        )}

        {!isLeaf && !node.collapsed && (
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-[5px] border-white shadow-md z-10" style={{ backgroundColor: theme.main }}></div>
        )}
      </div>
    </div>
  );
});

const MindMap: React.FC<MindMapProps> = ({ onChapterSelect }) => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [activeKey, setActiveKey] = useState("Ch 1: Introduction");
  const [menuOpen, setMenuOpen] = useState(false);
  const [inspected, setInspected] = useState<TreeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transform = useRef({ x: 100, y: 150, scale: 0.5 }); 
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const update = useCallback(() => {
    if (canvasRef.current) {
      const { x, y, scale } = transform.current;
      canvasRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
  }, []);

  const handleToggle = useCallback((id: string) => {
    setTree(prev => {
      if(!prev) return null;
      const clone = deepClone(prev);
      if(!clone) return null;
      const find = (node: any) => {
          if(node.id === id) { node.collapsed = !node.collapsed; return true; }
          return node.children?.some(find);
      };
      find(clone);
      return clone;
    });
  }, []);

  const load = useCallback((key: string) => {
    const data = FULL_CURRICULUM[key];
    if (!data) return;

    setActiveKey(key);
    setSearchTerm('');
    
    const process = (n: TreeNode, d: number): TreeNode => ({
      ...n,
      collapsed: d > 1, 
      children: n.children?.map(c => process(c, d + 1))
    });

    setTree(process(data, 0));
    transform.current = { x: 200, y: 350, scale: 0.5 };
    requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    load("Ch 1: Introduction");
  }, [load]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!tree || !term.trim()) {
        if(tree) {
             const clear = (n: TreeNode): TreeNode => ({ ...n, isMatch: false, children: n.children?.map(clear) });
             setTree(clear(tree));
        }
        return;
    }

    const lowerTerm = term.toLowerCase();
    const searchAndExpand = (node: TreeNode): { node: TreeNode; found: boolean } => {
        const isMatch = node.label.toLowerCase().includes(lowerTerm) || (node.description?.toLowerCase().includes(lowerTerm) ?? false);
        let childrenUpdated = false;
        let children: TreeNode[] = [];
        if (node.children) {
            children = node.children.map(child => {
                const result = searchAndExpand(child);
                if (result.found) childrenUpdated = true;
                return result.node;
            });
        }
        const shouldExpand = isMatch || childrenUpdated;
        return {
            node: { ...node, isMatch, collapsed: shouldExpand ? false : node.collapsed, children: children.length > 0 ? children : undefined },
            found: shouldExpand
        };
    };
    const result = searchAndExpand(tree);
    if (result.found) setTree(result.node);
  };

  const layout = useMemo(() => tree ? calculateLayout(tree) : { nodes: [], links: [], width: 0, height: 0 }, [tree]);

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      transform.current.scale = Math.min(Math.max(0.05, transform.current.scale - e.deltaY * 0.001), 3.0);
    } else {
      transform.current.x -= e.deltaX;
      transform.current.y -= e.deltaY;
    }
    update();
  };

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('button') || (e.target as Element).closest('input')) return;
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) containerRef.current.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    transform.current.x += e.clientX - lastPos.current.x;
    transform.current.y += e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    update();
  };

  return (
    <div className="w-full h-full bg-slate-50 relative flex flex-col overflow-hidden select-none font-sans">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grid-pattern"></div>

      <div className="absolute top-6 left-6 right-6 z-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[2.5rem] p-6 shadow-2xl pointer-events-auto flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-rose-500 shadow-2xl">
                 <Network size={32} />
             </div>
             <div>
                <h1 className="text-base font-black uppercase tracking-widest text-slate-950">Neural Map v8.0</h1>
                <p className="text-[12px] text-slate-500 font-black">2500+ Board Ready Data Points</p>
             </div>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto bg-white/95 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-slate-200 shadow-2xl w-full md:w-auto">
              <div className="relative group flex-1 md:w-80">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={24} />
                  <input 
                    type="text" 
                    placeholder="Search curriculum..." 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-[1.5rem] py-4 pl-14 pr-6 text-base font-black text-slate-800 outline-none focus:ring-[6px] focus:ring-rose-100 transition-all placeholder:text-slate-400"
                  />
              </div>
              <div className="w-[3px] h-12 bg-slate-200 mx-1"></div>
              <button onClick={() => { transform.current = { x: 200, y: 350, scale: 0.5 }; update(); }} className="p-4 hover:bg-slate-100 text-slate-600 rounded-[1.5rem] transition-all active:scale-90" title="Reset View"><LocateFixed size={28}/></button>
          </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 relative cursor-grab active:cursor-grabbing touch-none overflow-hidden"
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => dragging.current = false}
      >
        <div 
          ref={canvasRef}
          className="absolute origin-top-left will-change-transform"
          style={{ width: layout.width, height: layout.height, transform: `translate3d(${transform.current.x}px, ${transform.current.y}px, 0) scale(${transform.current.scale})` }}
        >
          <svg className="absolute inset-0 pointer-events-none overflow-visible">
            {layout.links.map((l, i) => {
              const theme = COLORS[l.color] || COLORS.slate;
              const d = `M ${l.source.x},${l.source.y} C ${l.source.x + 250},${l.source.y} ${l.target.x - 250},${l.target.y} ${l.target.x},${l.target.y}`;
              return (
                <path 
                  key={i} d={d} fill="none" stroke={theme.border} strokeWidth="8" 
                  className="transition-all duration-300 opacity-25" strokeLinecap="round" 
                />
              );
            })}
          </svg>

          {layout.nodes.map(n => (
            <MindMapNode key={n.id} node={n} onToggle={handleToggle} onInspect={setInspected} />
          ))}
        </div>
      </div>

      {inspected && (
        <div className="absolute top-28 right-6 bottom-36 w-80 md:w-[440px] bg-white/95 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl border border-white p-10 flex flex-col animate-in slide-in-from-right-10 duration-300 z-[200]">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-slate-950 to-slate-800 text-rose-500 flex items-center justify-center shadow-2xl">
                <Stethoscope size={40} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-2">Diagnostic Hub</span>
                <h3 className="text-2xl font-black text-slate-950 leading-tight truncate">{inspected.label}</h3>
              </div>
            </div>
            <button onClick={() => setInspected(null)} className="p-4 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-950"><X size={32}/></button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-10">
            <div className="p-8 bg-slate-50/80 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <h4 className="text-[11px] font-black uppercase text-slate-400 mb-4 tracking-[0.3em] flex items-center gap-3 italic">Clinical Commentary</h4>
              <p className="text-base font-bold text-slate-800 leading-relaxed">
                {inspected.description || "Synthesizing deep anatomical insights for clinical board review and occupational therapy application."}
              </p>
            </div>

            {inspected.children && inspected.children.length > 0 && (
                <div>
                    <h4 className="text-[11px] font-black uppercase text-slate-400 mb-5 ml-3 tracking-[0.3em]">Module Hierarchy ({inspected.children.length})</h4>
                    <div className="grid gap-4">
                        {inspected.children.slice(0, 20).map((child: TreeNode) => (
                            <div key={child.id} className="p-5 bg-white border border-slate-100 rounded-[1.8rem] shadow-sm flex items-center gap-5 hover:border-rose-300 hover:shadow-md transition-all active:scale-[0.98]">
                                <div className="w-3 h-3 rounded-full bg-rose-600 shadow-xl shadow-rose-200"></div>
                                <span className="text-[13px] font-black text-slate-900 uppercase tracking-widest truncate">{child.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 shrink-0">
             <button 
              onClick={() => onChapterSelect?.(activeKey)}
              className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-rose-600 transition-all flex items-center justify-center gap-4 active:scale-95 group"
            >
              Master This Unit
              <ChevronRight size={24} className="group-hover:translate-x-3 transition-transform"/>
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 p-4 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-12 duration-500">
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-5 px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-slate-900 transition-all min-w-[280px] group"
          >
            <BookOpen size={24} className="text-rose-500 group-hover:scale-125 transition-transform"/>
            <span className="flex-1 text-left truncate">{activeKey}</span>
            <ChevronRight size={20} className={`transition-transform duration-300 ${menuOpen ? '-rotate-90' : ''}`} />
          </button>
          
          {menuOpen && (
            <div className="absolute bottom-full left-0 mb-8 w-96 max-h-[65vh] overflow-y-auto bg-white/95 backdrop-blur-3xl rounded-[3.5rem] border border-slate-200 shadow-[0_-30px_80px_rgba(0,0,0,0.25)] p-5 z-[300] animate-in slide-in-from-bottom-6 duration-400 custom-scrollbar origin-bottom-left">
              <div className="px-5 py-4 mb-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100 italic">Curriculum Vault</div>
              {Object.keys(FULL_CURRICULUM).sort((a,b) => {
                const numA = parseInt(a.match(/\d+/)?.[0] || '0');
                const numB = parseInt(b.match(/\d+/)?.[0] || '0');
                return numA - numB;
              }).map(k => (
                <button
                  key={k}
                  onClick={() => { load(k); setMenuOpen(false); }}
                  className={`w-full text-left px-6 py-5 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest transition-all mb-2 flex items-center justify-between group ${activeKey === k ? 'bg-rose-50 text-rose-700 border border-rose-100 ring-2 ring-rose-50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-950'}`}
                >
                  <span className="truncate">{k}</span>
                  {activeKey === k && <Activity size={18} className="text-rose-600 animate-pulse"/>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-[3px] h-12 bg-slate-100 mx-2"></div>

        <div className="flex gap-2 pr-3">
            <button onClick={() => { transform.current.scale = Math.min(3.0, transform.current.scale + 0.2); update(); }} className="p-5 rounded-full text-slate-400 hover:bg-slate-50 hover:text-rose-600 transition-all active:scale-90 shadow-inner border border-slate-100"><ZoomIn size={28}/></button>
            <button onClick={() => { transform.current.scale = Math.max(0.05, transform.current.scale - 0.2); update(); }} className="p-5 rounded-full text-slate-400 hover:bg-slate-50 hover:text-rose-600 transition-all active:scale-90 shadow-inner border border-slate-100"><ZoomOut size={28}/></button>
        </div>
      </div>
    </div>
  );
};

export default MindMap;
