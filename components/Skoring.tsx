import React, { useState, useRef } from 'react';
import { MOCK_QUESTIONS, SEGMENTS } from '../constants';
import { Button } from './Button';
import { Check, ArrowLeft, ArrowRight, AlertCircle, ListChecks } from 'lucide-react';
import { useNavigate } from '../App';

interface SkoringProps {
  onComplete: () => void;
}

// --- KOMPONEN ILUSTRASI DENGAN VECTOR (PUBLIC FOLDER) ---
const SegmentIllustration = ({ segmentId, mobile = false }: { segmentId: number, mobile?: boolean }) => {
  
  // --- PERBAIKAN DI SINI ---
  // Mapping disesuaikan dengan file yang ada di gambar kamu
  const ICON_MAPPING: Record<number, string> = {
    1: "vector_skala_usaha.png",        // ID 1: Skala Usaha
    2: "vector_kepemimpinan.png",       // ID 2: Kepemimpinan
    3: "vector_budaya.png",             // ID 3: Budaya Inovasi
    4: "vector_m_pemasaran.png",        // ID 4: Manajemen Pemasaran
    5: "vector_m_operasional.png",      // ID 5: Manajemen Operasional
    6: "vector_m_keuangan.png",         // ID 6: Manajemen Keuangan
    7: "vector_m_sdm.png",              // ID 7: Manajemen SDM
    8: "vector_legalitas.png",          // ID 8: Legalitas & Kepatuhan
    9: "vector_kepedulian.png",         // ID 9: Kepedulian Sosial
    10: "vector_pemahaman_industri.png",// ID 10: Pemahaman Industri
    11: "vector_m_rantai_pasok.png",    // ID 11: Manajemen Rantai Pasok
  };

  // Fallback jika file belum diset
  const fileName = ICON_MAPPING[segmentId] || "default_vector.png";
  
  // Pastikan path folder di public adalah /vector/
  const iconSrc = `/vector/${fileName}`;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (mobile) {
      return (
        <div className="flex items-center justify-center w-14 h-14 overflow-hidden">
          {children}
        </div>
      );
    }
    return (
      <div className="relative w-48 h-48 flex items-center justify-center mx-auto mb-6">
        {children}
      </div>
    );
  };

  return (
    <Wrapper>
      <img 
        src={iconSrc} 
        alt={`Ilustrasi Segmen ${segmentId}`}
        className={`object-contain transition-all duration-300 hover:scale-105 
          ${mobile ? 'w-full h-full' : 'w-48 h-48'} 
        `}
        onError={(e) => {
          // Sembunyikan gambar jika file tidak ditemukan agar tidak terlihat icon 'broken image'
          console.error(`Gagal memuat gambar: ${iconSrc}`);
          e.currentTarget.style.display = 'none'; 
        }}
      />
    </Wrapper>
  );
};

export const Skoring: React.FC<SkoringProps> = ({ onComplete }) => {
  const { navigate } = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- STATE MANAGEMENT ---
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({}); 

  // Get Data Current Segment
  const currentSegment = SEGMENTS[activeSegmentIndex] || SEGMENTS[0];
  
  // Filter pertanyaan HANYA untuk segmen ini
  const questionsInSegment = MOCK_QUESTIONS.filter(q => q.segmentId === currentSegment.id);

  // Hitung Progress Global
  const progress = Math.round(((activeSegmentIndex) / SEGMENTS.length) * 100);

  // --- LOGIC VALIDASI ---
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
        <div className="hidden md:flex w-[400px] lg:w-[450px] bg-gradient-to-b from-[#DEF1FE] to-white flex-col relative shrink-0 border-r border-[#E0F2FE]">
            <div className="p-8 flex flex-col h-full relative z-10">
                
                {/* --- HEADER BARU: BACK BUTTON & SEGMEN BADGE SEJAJAR --- */}
                <div className="flex items-center justify-between mb-8">
                    {/* 1. Tombol Back */}
                    <button onClick={() => navigate('modul-reguler')} className="flex items-center gap-2 text-[#0857C3] font-bold text-sm hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                    </button>

                    {/* 2. Badge Segmen */}
                    <span className="bg-white px-4 py-1.5 rounded-full text-[#307FE2] text-xs font-bold uppercase tracking-widest shadow-sm border border-blue-100">
                        SEGMEN {currentSegment.id} / {SEGMENTS.length}
                    </span>
                </div>

                {/* --- CONTENT UTAMA (Tengah) --- */}
                <div className="flex-1 flex flex-col justify-end text-center mb-4">
                    
                    {/* Ilustrasi Dinamis dari Vector */}
                    <SegmentIllustration segmentId={currentSegment.id} />

                    <h2 className="text-3xl font-bold text-[#0857C3] tracking-tight mb-4">
                        {currentSegment.name}
                    </h2>
                    
                    {/* --- WARNING BOX DESKTOP --- */}
                    <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 flex items-start gap-3 text-left w-full shadow-sm max-w-sm mx-auto">
                        <AlertCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                        <p className="text-[13px] font-bold leading-relaxed text-[#3F5775]">
                            Jawablah sesuai kondisi <span className="font-bold text-[#F97316]">realita usaha Anda saat ini.</span>
                        </p>
                    </div>
                </div>

                {/* --- PROGRESS BAR (Bawah) --- */}
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
                
                {/* --- MOBILE INTRO & STICKY PROGRESS --- */}
                
                {/* 1. BAGIAN INFO (Akan ikut ter-scroll ke atas) */}
                <div className="md:hidden bg-gradient-to-b from-[#DEF1FE] to-white px-5 pt-6 pb-2">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex-1 pr-4">
                             <div className="inline-block px-2.5 py-1 bg-white text-[#307FE2] border border-blue-100 rounded-xl text-[10px] font-bold uppercase tracking-widest mb-2 shadow-sm">
                                SEGMEN {currentSegment.id}/{SEGMENTS.length}
                             </div>
                             <h2 className="text-xl font-bold text-[#0857C3] leading-tight">
                                {currentSegment.name}
                             </h2>
                        </div>
                        {/* Ilustrasi Mobile */}
                        <div className="shrink-0 p-2">
                             <SegmentIllustration segmentId={currentSegment.id} mobile />
                        </div>
                    </div>
                    
                    {/* Warning Box Mobile */}
                    <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-lg p-3 flex gap-2.5 mb-2">
                        <AlertCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                        <p className="text-xs font-bold leading-relaxed text-[#3F5775]">
                            Jawablah sesuai kondisi <span className="font-bold text-[#F97316]">realita usaha Anda saat ini.</span>
                        </p>
                    </div>
                </div>

                {/* 2. BAGIAN PROGRESS BAR (Sticky & Background White) */}
                <div className="md:hidden sticky top-0 z-30 bg-white px-5 py-6">
                     <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-[#307FE2] uppercase">PROGRES ASESMEN</span>
                        <span className="text-xs font-extrabold text-[#307FE2]">{progress}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0857C3] rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
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
                                <h3 className="text-xl md:text-3xl font-semibold text-slate-900 leading-snug">
                                    {q.text}
                                </h3>
                                {q.type === 'multiple' && (
                                <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-[#F97316] bg-[#FFF7ED] px-2.5 py-1 rounded-md border border-[#FFEDD5]">
                                    {/* Ikon Lucide (warnanya akan otomatis mengikuti text-color parent-nya) */}
                                    <ListChecks className="w-3.5 h-3.5" />
                                    
                                    {/* Teks Label */}
                                    <span>Pilih satu atau lebih jawaban</span>
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
                    <span>Sebelumnya</span>
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