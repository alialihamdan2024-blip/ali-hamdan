
import React, { useState, useEffect, useMemo } from 'react';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import { Question } from '../types';
import { 
  Plus, Save, X, Image as ImageIcon, Sparkles, Loader2, 
  Wand2, Globe, CheckCircle2, Layout, Edit3, Eye, 
  RotateCcw, Send, ShieldCheck, Zap, Server, Cpu, Database,
  FileCode, Beaker, Layers, ChevronRight, Binary, Info, Link as LinkIcon,
  ExternalLink, AlertCircle, Terminal, RefreshCw, Activity, Play, Settings,
  Stethoscope, FileText, Microscope, Clipboard
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { cleanImageUrl, sanitizeHtml } from '../utils';

interface QuestionBuilderProps {
  allQuestions: Question[];
  editingId: string | null;
  onSave: (q: Question) => void;
  onCancel: () => void;
  existingCategories: string[];
}

interface GroundingSource {
  title: string;
  uri: string;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ allQuestions, editingId, onSave, onCancel, existingCategories }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'create' | 'repair'>('create');
  
  // Repair State
  const [isBatchRepairing, setIsBatchRepairing] = useState(false);
  const [batchStatus, setBatchStatus] = useState({ current: 0, total: 0 });

  const [formData, setFormData] = useState<Omit<Question, 'id'>>({
    category: '',
    questionText: '',
    answerText: '',
    explanation: '',
    questionImage: '',
    answerImage: '',
    options: []
  });

  const missingOptionsCount = useMemo(() => {
    return allQuestions.filter(q => !q.options || q.options.length < 4).length;
  }, [allQuestions]);

  const questionsToRepair = useMemo(() => {
    return allQuestions.filter(q => !q.options || q.options.length < 4);
  }, [allQuestions]);

  useEffect(() => {
    if (editingId) {
      const q = allQuestions.find(item => item.id === editingId);
      if (q) {
        setFormData({
          category: q.category,
          questionText: q.questionText,
          answerText: q.answerText,
          explanation: q.explanation || '',
          questionImage: q.questionImage || '',
          answerImage: q.answerImage || '',
          options: q.options || []
        });
        setShowPreview(true);
        setActiveTab('create');
      }
    }
  }, [editingId, allQuestions]);

  const handleApiKeyCheck = async () => {
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  };

  const processEverythingWithAI = async () => {
    if (!rawInput.trim()) return;

    setIsAiLoading(true);
    setSources([]);
    setLoadingStep('Initializing Clinical Analysis...');
    
    try {
      const isUrl = /^(https?:\/\/[^\s]+)$/.test(rawInput.trim());
      
      if (isUrl) {
        setLoadingStep('Accessing External Medical Database...');
        await handleApiKeyCheck();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = isUrl ? "gemini-3-pro-preview" : "gemini-3-flash-preview";
      
      setLoadingStep(isUrl ? 'Extracting Anatomical Data...' : 'Synthesizing Clinical Vignette...');

      const prompt = isUrl 
        ? `TASK: Occupational Therapy & Anatomy Education.
           URL: "${rawInput.trim()}"
           INSTRUCTION: Use Google Search to access this page. Extract or generate ONE high-quality, board-level anatomy/physiology question relevant to Occupational Therapy.
           
           REQUIRED OUTPUT FORMAT (JSON):
           {
             "questionText": "Clinical vignette or direct anatomical question",
             "answerText": "Precise correct answer",
             "explanation": "Detailed physiological/anatomical explanation with clinical relevance to OT",
             "options": ["Correct Answer", "Distractor 1", "Distractor 2", "Distractor 3"],
             "category": "System or Region (e.g., Upper Extremity, Nervous System)",
             "questionImage": "URL if available"
           }`
        : `TASK: Anatomical Question Synthesis for OT Students.
           INPUT: """${rawInput}"""
           INSTRUCTION: Create a professional anatomy/physiology question from this text. Focus on functional anatomy if possible. Include 3 plausible clinical distractors.
           
           RETURN JSON:
           {
             "questionText": "...",
             "answerText": "...",
             "explanation": "...",
             "options": ["...", "...", "...", "..."],
             "category": "...",
             "questionImage": "..."
           }`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: isUrl ? undefined : "application/json",
          tools: isUrl ? [{ googleSearch: {} }] : undefined,
          responseSchema: isUrl ? undefined : {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              answerText: { type: Type.STRING },
              explanation: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              category: { type: Type.STRING },
              questionImage: { type: Type.STRING }
            },
            required: ["questionText", "answerText", "explanation", "options", "category"]
          }
        }
      });

      setLoadingStep('Formatting Clinical Record...');

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        const extractedSources: GroundingSource[] = groundingChunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title || 'Verified Medical Source',
            uri: chunk.web.uri
          }));
        setSources(extractedSources);
      }

      const rawText = response.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error("No valid JSON found.");
      }

      const result = JSON.parse(jsonMatch[0]);
      
      setFormData({
        ...result,
        questionImage: result.questionImage || formData.questionImage || '',
        answerImage: formData.answerImage || '',
        options: Array.isArray(result.options) ? [...result.options].sort(() => Math.random() - 0.5) : []
      });
      
      setLoadingStep('Finalizing Entry...');
      setTimeout(() => {
        setShowPreview(true);
        setRawInput('');
        setIsAiLoading(false);
      }, 800);

    } catch (error: any) {
      console.error("Error:", error);
      setIsAiLoading(false);
      alert("Analysis interrupted. Please verify the source content.");
    }
  };

  const repairQuestion = async (q: Question) => {
    setIsAiLoading(true);
    setLoadingStep(`Optimizing Record: ${q.id}...`);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `TASK: Generate Medical Distractors.
      QUESTION: "${q.questionText}"
      ANSWER: "${q.answerText}"
      INSTRUCTION: Provide 3 distinct, plausible, but incorrect anatomical/physiological options relevant to OT/Medical boards.
      
      RETURN JSON: { "options": ["Correct Answer", "Distractor 1", "Distractor 2", "Distractor 3"] }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              options: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["options"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      const repairedQ = { ...q, options: result.options.sort(() => Math.random() - 0.5) };
      onSave(repairedQ);
      setIsAiLoading(false);
      setLoadingStep('');
    } catch (e) {
      setIsAiLoading(false);
      alert("Repair failed.");
    }
  };

  const startBatchRepair = async () => {
    if (questionsToRepair.length === 0) return;
    if (!confirm(`Initialize batch repair for ${questionsToRepair.length} records?`)) return;

    setIsBatchRepairing(true);
    const totalCount = questionsToRepair.length;
    setBatchStatus({ current: 0, total: totalCount });

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let count = 0;
    for (const q of questionsToRepair) {
        count++;
        setBatchStatus({ current: count, total: totalCount });
        setLoadingStep(`Processing: ${count}/${totalCount}`);
        
        try {
            const prompt = `TASK: Generate Medical Distractors.
            QUESTION: "${q.questionText}"
            ANSWER: "${q.answerText}"
            RETURN JSON: { "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"] }`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            options: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["options"]
                    }
                }
            });

            const result = JSON.parse(response.text || "{}");
            const repairedQ = { ...q, options: result.options.sort(() => Math.random() - 0.5) };
            onSave(repairedQ);
            
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            console.error("Batch failure", e);
        }
    }

    setIsBatchRepairing(false);
  };

  const handleGlobalPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.questionText || !formData.answerText) return;
    
    const finalQuestion: Question = {
      id: editingId || `global-q-${Date.now()}`,
      ...formData
    };
    onSave(finalQuestion);
    resetSystem();
  };

  const resetSystem = () => {
    setShowPreview(false);
    setIsManualEdit(false);
    setSources([]);
    setLoadingStep('');
    setFormData({
      category: '',
      questionText: '',
      answerText: '',
      explanation: '',
      questionImage: '',
      answerImage: '',
      options: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32 animate-in fade-in duration-700">
      
      {!showPreview && (
        <div className="flex justify-center mb-6">
          <div className="glass-card p-1.5 rounded-2xl flex gap-1 shadow-sm border border-slate-200/60">
             <button 
              onClick={() => setActiveTab('create')}
              className={`px-4 md:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'create' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
             >
               <Plus size={16} /> Add Clinical Entry
             </button>
             <button 
              onClick={() => setActiveTab('repair')}
              className={`px-4 md:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'repair' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
             >
               <RefreshCw size={16} /> Database Repair 
               {missingOptionsCount > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white text-rose-600 text-[9px] rounded-md font-black">{missingOptionsCount}</span>}
             </button>
          </div>
        </div>
      )}

      {/* REPAIR MODE */}
      {activeTab === 'repair' && !showPreview && (
        <div className="max-w-4xl mx-auto space-y-6">
           <div className="glass-card rounded-[2.5rem] p-6 md:p-12 space-y-8 relative overflow-hidden border border-white">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">
                    Vault <span className="text-rose-500">Diagnostics</span>
                  </h2>
                  <p className="clinical-label text-slate-400">
                    Content Integrity System
                  </p>
                </div>
                
                {missingOptionsCount > 0 && (
                  <button 
                    onClick={startBatchRepair}
                    disabled={isBatchRepairing}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-200 transition-all hover:-translate-y-1 disabled:opacity-50"
                  >
                    {isBatchRepairing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    Auto-Repair All
                  </button>
                )}
              </div>

              {missingOptionsCount === 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center space-y-3">
                   <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 size={24} />
                   </div>
                   <h3 className="text-emerald-900 font-bold text-lg">System Optimal</h3>
                   <p className="text-emerald-700/70 text-sm">All questions meet clinical format standards.</p>
                </div>
              ) : (
                <div className="space-y-4">
                   {isBatchRepairing && (
                      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 space-y-3 animate-pulse">
                         <div className="flex justify-between items-center text-rose-700 font-black text-xs uppercase tracking-widest">
                            <span>Processing Records</span>
                            <span>{batchStatus.current} / {batchStatus.total}</span>
                         </div>
                         <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-rose-500 transition-all duration-500" 
                                style={{ width: `${(batchStatus.current / batchStatus.total) * 100}%` }}
                            ></div>
                         </div>
                      </div>
                   )}

                   <div className="grid gap-3">
                      {questionsToRepair.slice(0, 8).map((q) => (
                        <div key={q.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-rose-200 transition-all">
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <AlertCircle size={12} className="text-rose-500" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{q.category}</span>
                              </div>
                              <h4 className="text-slate-800 font-bold text-sm truncate" dangerouslySetInnerHTML={{ __html: sanitizeHtml(q.questionText) }}></h4>
                           </div>
                           <button 
                             onClick={() => repairQuestion(q)}
                             disabled={isAiLoading || isBatchRepairing}
                             className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all"
                           >
                             <Wand2 size={14} /> Fix
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

      {/* CREATE MODE */}
      {activeTab === 'create' && !showPreview && (
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[3rem] p-6 md:p-16 border border-white/50 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6 md:space-y-10">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg border border-slate-700">
                  <Clipboard size={24} className="text-rose-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display tracking-tight">Clinical <span className="text-rose-600">Architect</span></h2>
                  <p className="clinical-label text-slate-400">AI-Assisted Content Generation</p>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  className="w-full h-40 md:h-64 p-4 md:p-8 bg-slate-50 text-slate-700 rounded-[2rem] border-2 border-slate-100 focus:border-rose-400 focus:bg-white outline-none font-medium text-base md:text-lg placeholder:text-slate-400 transition-all shadow-inner resize-none custom-scrollbar"
                  placeholder="Paste clinical notes, lecture text, or a URL to a medical article..."
                />
                <div className="absolute bottom-6 right-8 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest pointer-events-none hidden md:flex">
                  <FileText size={14} /> Input Source
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={processEverythingWithAI}
                  disabled={isAiLoading || !rawInput.trim()}
                  className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl hover:shadow-rose-200 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                >
                  {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Stethoscope size={20} />}
                  <span>Generate Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODE */}
      {showPreview && (
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="glass-card p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 shadow-md border border-white">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={resetSystem} 
                className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center border border-slate-100"
              >
                <X size={20} />
              </button>
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">Draft Review</h3>
                <p className="clinical-label text-slate-400">Verify medical accuracy before saving</p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsManualEdit(!isManualEdit)} 
                className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2 ${isManualEdit ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
              >
                {isManualEdit ? 'View' : 'Edit'}
              </button>
              
              <button 
                onClick={handleGlobalPublish}
                className="flex-1 md:flex-none px-8 py-3 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {isManualEdit ? (
                <div className="glass-card rounded-[2.5rem] p-6 md:p-10 border border-slate-200 space-y-8">
                    <div className="space-y-2">
                      <label className="clinical-label text-slate-400 px-1">Classification</label>
                      <input 
                        type="text" 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-800 outline-none focus:border-rose-400 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="clinical-label text-slate-400 px-1">Question Stem</label>
                      <textarea 
                        value={formData.questionText} 
                        onChange={e => setFormData({...formData, questionText: e.target.value})}
                        className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-700 outline-none focus:border-rose-400 custom-scrollbar transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="clinical-label text-slate-400 px-1">Options (Green = Correct)</label>
                      <div className="grid gap-3">
                        {formData.options.map((opt, i) => (
                          <div key={i} className="relative">
                            <div className={`absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center rounded-l-xl border-y-2 border-l-2 ${opt === formData.answerText ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                <span className="font-black text-xs">{String.fromCharCode(65 + i)}</span>
                            </div>
                            <input 
                              type="text" 
                              value={opt} 
                              onChange={e => {
                                const newOpts = [...formData.options];
                                newOpts[i] = e.target.value;
                                setFormData({...formData, options: newOpts});
                              }}
                              className={`w-full py-3 pl-12 pr-4 rounded-xl font-medium text-sm outline-none border-2 transition-all ${opt === formData.answerText ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-600 focus:border-rose-300'}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="clinical-label text-slate-400 px-1">Explanation</label>
                      <textarea 
                        value={formData.explanation} 
                        onChange={e => setFormData({...formData, explanation: e.target.value})}
                        className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-slate-700 outline-none focus:border-rose-400 custom-scrollbar transition-all"
                      />
                    </div>
                </div>
              ) : (
                <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
                  <div className="bg-slate-50/80 p-6 md:p-8 border-b border-slate-100">
                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {formData.category}
                     </span>
                     <h3 className="mt-4 text-xl md:text-2xl font-black text-slate-900 leading-snug font-display" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formData.questionText) }} />
                  </div>
                  
                  <div className="p-6 md:p-8 space-y-6 bg-white">
                    <div className="grid gap-3">
                      {formData.options.map((opt, i) => (
                        <div key={i} className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${opt === formData.answerText ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-100 text-slate-500'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${opt === formData.answerText ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="font-bold text-sm" dangerouslySetInnerHTML={{ __html: sanitizeHtml(opt) }} />
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                       <div className="flex items-center gap-2 mb-3">
                          <Zap size={16} className="text-rose-500" />
                          <span className="clinical-label text-slate-400">Clinical Rationale</span>
                       </div>
                       <p className="text-sm font-medium text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formData.explanation) }} />
                       
                       {sources.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe size={12} className="text-slate-400" />
                                <span className="clinical-label text-slate-400">References</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {sources.map((src, i) => (
                                <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:border-blue-300 transition-all">
                                  {src.title} <ExternalLink size={10} />
                                </a>
                              ))}
                            </div>
                          </div>
                       )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-[2.5rem] p-8 border border-slate-200 sticky top-24">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <ImageIcon size={18} className="text-rose-500" />
                    <h4 className="clinical-label text-slate-900">Media Attachments</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="clinical-label text-slate-400 block">Image URL</label>
                    <input 
                      type="url" 
                      value={formData.questionImage}
                      onChange={e => setFormData({...formData, questionImage: e.target.value})}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 outline-none focus:border-rose-400 transition-all" 
                      placeholder="https://..."
                    />
                    {formData.questionImage && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={cleanImageUrl(formData.questionImage)} alt="Preview" className="w-full h-auto object-cover" />
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {(isAiLoading || isBatchRepairing) && (
        <div className="fixed inset-0 z-[150] bg-white/95 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
            <div className="glass-card p-8 rounded-[2rem] flex flex-col items-center shadow-2xl border border-white">
                <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="text-rose-500 animate-pulse" size={24} />
                    </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight font-display text-center">{loadingStep}</h3>
                <p className="clinical-label text-slate-400 mt-2">Consulting Knowledge Base...</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBuilder;
