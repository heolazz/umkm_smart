import React, { useState, useRef, useEffect } from 'react';
import { MOCK_QUESTIONS, SEGMENTS } from '../constants';
import { Button } from './Button';
import { Check, ArrowLeft, ArrowRight, AlertCircle, TrendingUp, PieChart, Users, Target, Cog, Wallet, Package } from 'lucide-react';
import { useNavigate } from '../App';

interface SkoringProps {
  onComplete: () => void;
}

// --- KOMPONEN ILUSTRASI DINAMIS PER SEGMEN ---
const SegmentIllustration = ({ segmentId, mobile = false }: { segmentId: number, mobile?: boolean }) => {
  
  // Helper untuk wrapper agar rapi
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (mobile) return <div className="flex items-center justify-center w-16 h-16">{children}</div>;
    return (
      <div className="relative w-48 h-48 flex items-center justify-center mx-auto mb-6 bg-white/50 rounded-full shadow-inner border border-white/60 backdrop-blur-sm">
        {children}
      </div>
    );
  };

  // Render konten berdasarkan ID Segmen
  const renderContent = () => {
    switch (segmentId) {
      case 1: // Skala Usaha (Bar Chart)
        return (
          <div className={`flex items-end gap-1.5 ${mobile ? 'h-10' : 'h-24'}`}>
            <div className={`${mobile ? 'w-2 h-6' : 'w-6 h-12'} bg-blue-300 rounded-t-sm`}></div>
            <div className={`${mobile ? 'w-2 h-8' : 'w-6 h-20'} bg-blue-500 rounded-t-sm`}></div>
            <div className={`${mobile ? 'w-2 h-10' : 'w-6 h-28'} bg-orange-500 rounded-t-sm flex items-start justify-center pt-1`}>
               {!mobile && <TrendingUp className="w-4 h-4 text-white" />}
            </div>
          </div>
        );
      case 2: // Keuangan (Pie/Wallet)
        return mobile ? <Wallet className="text-orange-500 w-8 h-8" /> : (
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-[12px] border-blue-100 border-t-orange-500 border-r-orange-500 transform rotate-45 shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <PieChart className="w-10 h-10 text-blue-600" />
                </div>
            </div>
        );
      case 3: // Pemasaran (Target)
        return mobile ? <Target className="text-red-500 w-8 h-8" /> : (
            <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-red-500">
                        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    </div>
                </div>
                <Target className="absolute -right-4 -top-4 w-10 h-10 text-blue-600 drop-shadow-md" />
            </div>
        );
      case 4: // Operasional (Gear)
        return mobile ? <Cog className="text-slate-600 w-8 h-8" /> : (
            <div className="relative">
               <Cog className="w-28 h-28 text-slate-200 animate-spin-slow" style={{animationDuration: '10s'}} />
               <Cog className="w-16 h-16 text-blue-500 absolute -bottom-2 -right-2 animate-spin-slow" style={{animationDirection: 'reverse'}} />
            </div>
        );
      default: // Default (Package/General)
        return mobile ? <Package className="text-blue-500 w-8 h-8" /> : (
           <div className="bg-blue-50 p-6 rounded-3xl">
              <Package className="w-20 h-20 text-blue-500" />
           </div>
        );
    }
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

export const Skoring: React.FC<SkoringProps> = ({ onComplete }) => {
  const { navigate } = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- STATE MANAGEMENT ---
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({}); 

  // Get Data Current Segment
  const currentSegment = SEGMENTS[activeSegmentIndex];
  
  // Filter pertanyaan HANYA untuk segmen ini
  const questionsInSegment = MOCK_QUESTIONS.filter(q => q.segmentId === currentSegment.id);

  // Hitung Progress Global (Berdasarkan jumlah segmen yang selesai)
  const progress = Math.round(((activeSegmentIndex) / SEGMENTS.length) * 100);

  // --- LOGIC VALIDASI ---
  // Cek apakah semua pertanyaan di segmen ini sudah dijawab
  const isSegmentComplete = () => {
    return questionsInSegment.every(q => {
        const ans = answers[q.id];
        if (q.type === 'multiple') return Array.isArray(ans) && ans.length > 0;
        return ans !== undefined && ans !== null;
    });
  };

  // --- HANDLERS ---
  const handleAnswer = (questionId: number, val: any, type: 'single' | 'multiple') => {
    setAnswers(prev => {
        if (type === 'single') {
            return { ...prev, [questionId]: val };
        } else {
            const currentAns = (prev[questionId] as any[]) || [];
            if (currentAns.includes(val)) {
                return { ...prev, [questionId]: currentAns.filter(item => item !== val) };
            } else {
                return { ...prev, [questionId]: [...currentAns, val] };
            }
        }
    });
  };

  const handleNextSegment = () => {
    if (activeSegmentIndex < SEGMENTS.length - 1) {
        setActiveSegmentIndex(prev => prev + 1);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        onComplete();
    }
  };
  
  const handlePrevSegment = () => {
      if (activeSegmentIndex > 0) {
          setActiveSegmentIndex(prev => prev - 1);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
  };

  const isSelected = (questionId: number, val: any) => {
    const ans = answers[questionId];
    if (Array.isArray(ans)) return ans.includes(val);
    return ans === val;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans h-[100dvh]">
      
      {/* --- HEADER MOBILE --- */}
      <div className="md:hidden flex items-center px-4 h-14 border-b border-slate-100 bg-white shrink-0 z-40 shadow-sm">
         <button onClick={() => navigate('modul-reguler')} className="p-2 -ml-2 text-slate-700">
            <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="flex-1 text-center font-bold text-slate-800">Asesmen UMKM</div>
         <div className="w-9"></div> 
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
      
        {/* --- PANEL KIRI (DESKTOP SIDEBAR) --- */}
        <div className="hidden md:flex w-[400px] lg:w-[450px] bg-[#F0F9FF] flex-col relative shrink-0 border-r border-[#E0F2FE]">
            <div className="p-8 flex flex-col h-full relative z-10">
                <button onClick={() => navigate('modul-reguler')} className="w-fit flex items-center gap-2 text-[#0857C3] font-bold text-sm mb-8 hover:opacity-80">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Kembali
                </button>

                <div className="flex-1 flex flex-col justify-center text-center -mt-10">
                    <div className="mx-auto mb-6">
                        <span className="bg-white px-4 py-1.5 rounded-full text-[#307FE2] text-xs font-bold uppercase tracking-widest shadow-sm border border-blue-100">
                            SEGMEN {currentSegment.id} / {SEGMENTS.length}
                        </span>
                    </div>

                    {/* Ilustrasi Dinamis sesuai Segmen ID */}
                    <SegmentIllustration segmentId={currentSegment.id} />

                    <h2 className="text-3xl font-black text-[#0857C3] tracking-tight mb-4">
                        {currentSegment.name}
                    </h2>
                    
                    {/* --- WARNING BOX DESKTOP --- */}
                    <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 flex items-start gap-3 text-left w-full shadow-sm max-w-sm mx-auto">
                        <AlertCircle className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                        <p className="text-sm font-medium leading-relaxed text-[#3F5775]">
                            Jawablah sesuai kondisi <span className="font-bold text-[#F97316]">realita usaha Anda saat ini.</span>
                        </p>
                    </div>
                </div>

                <div className="w-full pt-6">
                    <div className="flex justify-between text-xs font-bold text-[#307FE2] mb-2 uppercase tracking-wide">
                        <span>Total Progres</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#DBEAFE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0857C3] rounded-full transition-all duration-700 ease-out" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- PANEL KANAN (CONTENT SCROLLABLE) --- */}
        <div className="flex-1 bg-white flex flex-col h-full relative overflow-hidden">
            
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar pb-32 md:pb-24 scroll-smooth">
                
                {/* --- MOBILE INTRO (Sticky Header like) --- */}
                <div className="md:hidden bg-[#F5FAFF] px-5 py-6 border-b border-[#E0F2FE]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex-1 pr-4">
                             <div className="inline-block px-2.5 py-1 bg-white text-[#307FE2] border border-blue-100 rounded-md text-[10px] font-bold uppercase tracking-widest mb-2 shadow-sm">
                                SEGMEN {currentSegment.id}/{SEGMENTS.length}
                             </div>
                             <h2 className="text-xl font-black text-[#0857C3] leading-tight">
                                {currentSegment.name}
                             </h2>
                        </div>
                        {/* Ilustrasi Mobile */}
                        <div className="shrink-0 bg-white p-2 rounded-xl shadow-sm border border-blue-50">
                             <SegmentIllustration segmentId={currentSegment.id} mobile />
                        </div>
                    </div>
                    
                    {/* --- WARNING BOX MOBILE --- */}
                    <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-lg p-3 flex gap-2.5 mb-4">
                        <AlertCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                        <p className="text-xs font-medium leading-relaxed text-[#3F5775]">
                            Jawablah sesuai kondisi <span className="font-bold text-[#F97316]">realita usaha Anda saat ini.</span>
                        </p>
                    </div>

                    <div className="mb-2">
                         <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-[#307FE2] uppercase">PROGRES ASESMEN</span>
                            <span className="text-xs font-extrabold text-[#307FE2]">{progress}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0857C3] rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
                         </div>
                    </div>
                </div>

                {/* --- LOOP PERTANYAAN (MAPPING) --- */}
                <div className="px-5 py-4 md:p-12 md:pt-10 max-w-3xl mx-auto space-y-12">
                    
                    {questionsInSegment.map((q, index) => (
                        <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{animationDelay: `${index * 100}ms`}}>
                            
                            {/* Nomer & Pertanyaan */}
                            <div className="mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                    Pertanyaan {index + 1} dari {questionsInSegment.length}
                                </span>
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                                    {q.text}
                                </h3>
                                {q.type === 'multiple' && (
                                    <span className="inline-block mt-2 text-xs font-medium text-[#F97316] bg-[#FFF7ED] px-2 py-1 rounded">
                                        Pilih boleh lebih dari satu
                                    </span>
                                )}
                            </div>

                            {/* Opsi Jawaban */}
                            <div className="space-y-3">
                                {q.options.map((opt, idx) => {
                                    const active = isSelected(q.id, opt.value);
                                    
                                    return (
                                        <div 
                                            key={idx}
                                            onClick={() => handleAnswer(q.id, opt.value, q.type)}
                                            className={`
                                                relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 group select-none
                                                ${active 
                                                    ? 'bg-[#F0F9FF] border-[#307FE2] shadow-[0_0_0_1px_#307FE2]' 
                                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                                            `}
                                        >
                                            {/* Custom Radio/Check Circle */}
                                            <div className={`
                                                w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200
                                                ${active 
                                                    ? 'bg-[#F97316] border-[#F97316]' 
                                                    : 'bg-white border-slate-300 group-hover:border-slate-400'}
                                            `}>
                                                {active && <Check className="w-4 h-4 text-white stroke-[3]" />}
                                            </div>
                                            
                                            <div className="flex-1">
                                                <span className={`text-sm md:text-base font-medium leading-relaxed block ${active ? 'text-[#0857C3]' : 'text-slate-600'}`}>
                                                    {opt.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Divider antar pertanyaan (kecuali yang terakhir) */}
                            {index < questionsInSegment.length - 1 && (
                                <div className="h-px bg-slate-100 w-full mt-12"></div>
                            )}
                        </div>
                    ))}

                </div>
            </div>

            {/* --- FOOTER ACTIONS (FIXED/STICKY) --- */}
            <div className="fixed bottom-0 left-0 right-0 md:absolute md:w-full bg-white border-t border-slate-100 p-4 md:px-12 md:py-6 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button 
                    onClick={handlePrevSegment} 
                    disabled={activeSegmentIndex === 0}
                    className={`
                        flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg
                        ${activeSegmentIndex === 0 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#0857C3]'}
                    `}
                >
                    <ArrowLeft className="w-5 h-5"/> 
                    <span>Kembali</span>
                </button>

                <Button 
                    onClick={handleNextSegment} 
                    disabled={!isSegmentComplete()}
                    className={`
                        min-w-[140px] px-6 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2
                        ${!isSegmentComplete() 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                            : 'bg-[#F97316] hover:bg-[#EA580C] shadow-orange-200 hover:-translate-y-0.5'}
                    `}
                >
                    {activeSegmentIndex === SEGMENTS.length - 1 ? 'Selesai & Lihat Hasil' : 'Segmen Berikutnya'}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};