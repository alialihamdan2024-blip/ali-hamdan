
import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize, Move } from 'lucide-react';
import { cleanImageUrl } from '../utils';

interface ImageZoomModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ isOpen, imageUrl, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || scale === 1) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-slate-950/95 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 md:p-6 text-white shrink-0 z-10">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                <Maximize size={18} className="text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Image Inspector</span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2.5 bg-white/10 hover:bg-rose-600 rounded-full transition-all border border-white/10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Image Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden flex items-center justify-center cursor-move touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div 
          className="transition-transform duration-200 ease-out select-none pointer-events-none"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img 
            src={cleanImageUrl(imageUrl, 1600)} 
            alt="Zoomed Detail" 
            className="max-w-[95vw] max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
        
        {scale > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest flex items-center gap-2 animate-bounce">
                <Move size={12} /> Drag to Pan
            </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="p-6 md:p-8 flex justify-center shrink-0">
        <div className="flex items-center gap-2 p-2 bg-white/10 rounded-3xl border border-white/10 shadow-2xl">
          <button 
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-2xl transition-all disabled:opacity-30 text-white"
          >
            <ZoomOut size={22} />
          </button>
          
          <div className="px-4 text-white font-black text-sm w-16 text-center">
            {Math.round(scale * 100)}%
          </div>

          <button 
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-2xl transition-all disabled:opacity-30 text-white"
          >
            <ZoomIn size={22} />
          </button>

          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <button 
            onClick={handleReset}
            className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-rose-600 rounded-2xl transition-all text-white"
            title="Reset"
          >
            <RotateCcw size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageZoomModal;
