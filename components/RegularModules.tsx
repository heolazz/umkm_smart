import React, { useState, useMemo } from 'react';
import { MOCK_REGULAR_MODULES } from '../constants';
import { BookCard } from './BookCard';
import { 
  Lock, Check, Play, ChevronRight, Video, 
  Star, FileText, X, ArrowLeft, 
  Search, Filter, LayoutGrid, Info, BookOpen, Layers, 
  Trophy, Target, Sparkles, Lightbulb
} from 'lucide-react';
import { RegularModule, UMKMLevel } from '../types';
import { Button } from './Button';

// --- SUB-COMPONENTS (Timeline, Recommendation, & NEW HERO) ---

// 1. NEW HERO SECTION (Banner yang Di-improve)
const HeroSection: React.FC<{ completed: number; total: number; level: string }> = ({ completed, total, level }) => {
    // Hitung persentase progress
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="mb-12 relative">
             {/* Main Container:*/}
            <div className="bg-[#0857C3] rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-xl shadow-blue-900/10 relative">
                
                {/* Subtle Background Decor: 
                    Hanya satu cahaya lembut dari kanan atas untuk memberikan kedalaman tanpa terlihat ramai.
                */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none opacity-60 -mt-32 -mr-32 rounded-full blur-3xl"></div>

                {/* Content Wrapper: Flex column di mobile, row di desktop */}
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    
                    {/* LEFT SIDE: Main Messaging & Level */}
                    <div className="max-w-2xl flex-1 space-y-6">
                        {/* Level Badge - Cleaner Look */}
                        <div className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-blue-100 font-medium transition-transform hover:scale-105 cursor-default">
                            <div className="p-1 bg-[#FFD700] rounded-full shadow-sm">
                            </div>
                            <span>Level Saat Ini: <span className="text-white font-bold tracking-wide ml-1">{level}</span></span>
                        </div>

                        {/* Headline - Besar, Jelas, Minimalis */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                                Bangun Fondasi <br className="hidden md:block"/>
                                Bisnis yang Kuat.
                            </h1>
                            <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-lg opacity-90 font-medium">
                                Selesaikan modul pembelajaran terstruktur untuk meningkatkan kompetensi usaha Anda.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Consolidated Progress Card */}
                    {/* Di mobile dia akan mengambil lebar penuh, di desktop dia punya lebar tetap */}
                    <div className="w-full lg:w-auto flex-shrink-0 z-20">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 w-full lg:min-w-[340px] shadow-lg shadow-blue-900/5">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="text-white font-bold text-base mb-0.5 flex items-center gap-2">
                                         Progress Belajar
                                    </h3>
                                    <p className="text-xs text-blue-200">Penyelesaian</p>
                                </div>
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#56CCF2] to-white">
                                    {progressPercentage}%
                                </span>
                            </div>

                            {/* Cleaner Progress Bar */}
                            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden mb-4 p-0.5">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#56CCF2] via-[#307FE2] to-[#0857C3] rounded-full transition-all duration-1000 ease-out relative" 
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                     {/* Shimmer effect pada bar */}
                                    <div className="absolute inset-0 w-full h-full bg-white/20 animate-shimmer" style={{backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'}}></div>
                                </div>
                            </div>

                            {/* Simple Stats Counter */}
                            <div className="flex items-center justify-between text-sm font-medium text-blue-100 bg-blue-900/20 py-2 px-3 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#56CCF2]"></div>
                                    <span><span className="text-white font-bold text-base">{completed}</span> Selesai</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <span className="text-white/30">dari</span>
                                    <span><span className="text-white font-bold text-base">{total}</span> Modul</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// 2. RECOMMENDATION CARD
const RecommendationCard: React.FC<{ title: string; score: number; status: 'PRIORITAS' | 'PENTING' | 'AMAN' }> = ({ title, score, status }) => {
    
    // Konfigurasi Warna Baru (Blue Palette)
    const statusConfig = {
        'PRIORITAS': { 
            chipBg: 'bg-[#0857C3]/10', 
            chipText: 'text-[#0857C3]', 
            scoreBg: 'bg-[#0857C3]', 
            scoreText: 'text-white',
            bar: 'bg-[#0857C3]', 
            btn: 'bg-[#0857C3] hover:bg-[#0645a0] text-white shadow-[#0857C3]/20',
            border: 'border-[#0857C3]/20'
        },
        'PENTING': { 
            chipBg: 'bg-[#307FE2]/10', 
            chipText: 'text-[#307FE2]', 
            scoreBg: 'bg-[#307FE2]', 
            scoreText: 'text-white',
            bar: 'bg-[#307FE2]', 
            btn: 'bg-[#307FE2] hover:bg-[#2565b8] text-white shadow-[#307FE2]/20',
            border: 'border-[#307FE2]/20'
        },
        'AMAN': { 
            chipBg: 'bg-[#71C5E8]/10', 
            chipText: 'text-[#71C5E8]', 
            scoreBg: 'bg-[#71C5E8]', 
            scoreText: 'text-white',
            bar: 'bg-[#71C5E8]', 
            btn: 'bg-white border border-[#71C5E8] text-[#71C5E8] hover:bg-[#F0F9FF] hover:border-[#307FE2]',
            border: 'border-[#71C5E8]/20'
        },
    };

    const config = statusConfig[status];

    return (
        <div className={`bg-white rounded-2xl p-5 border shadow-sm mb-4 transition-all hover:shadow-md ${config.border}`}>
            {/* Header Card */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 leading-tight">{title}</h4>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${config.chipBg} ${config.chipText}`}>
                        {status}
                    </span>
                </div>
                {/* Score Circle */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${config.scoreBg} ${config.scoreText}`}>
                    {score}
                </div>
            </div>

            {/* Progress Bar & Button */}
            <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Gap Kompetensi</span>
                    <span className={config.chipText}>Target : 5.0</span>
                </div>
                
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${config.bar}`} style={{width: `${(score/5)*100}%`}}></div>
                </div>
                
                <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all mt-2 ${config.btn}`}>
                    {status === 'AMAN' ? 'Lihat Detail' : 'Pelajari Sekarang'}
                </button>
            </div>
        </div>
    );
};

// 3. TIMELINE ITEM (CATEGORY GROUP)
const CategoryTimelineItem: React.FC<{ 
    categoryName: string; 
    modules: RegularModule[]; 
    isLast: boolean; 
    onClick: () => void; 
}> = ({ categoryName, modules, isLast, onClick }) => {
    
    const totalModules = modules.length;
    const completedModules = modules.filter(m => m.status === 'completed').length;
    const isCompleted = totalModules > 0 && totalModules === completedModules;
    // Logic: Unlocked if at least one module is unlocked/completed (Demo logic)
    const isLocked = modules.every(m => m.status === 'locked'); 
    const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    return (
        <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-10 items-center mb-8 group">
            {!isLast && <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-[-40px] w-[2px] bg-slate-100 -z-10"></div>}
            
            <div className="text-right py-2">
                <h4 className={`font-bold text-sm md:text-base leading-tight mb-1 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
                    {categoryName}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {completedModules}/{totalModules} Materi Selesai
                </span>
            </div>

            <div className="flex justify-center relative">
                <div 
                    onClick={!isLocked ? onClick : undefined}
                    className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center border-4 relative z-10 transition-all cursor-pointer shadow-sm transform hover:scale-110
                        ${isCompleted 
                            ? 'bg-[#F97316] border-[#F97316] text-white shadow-orange-200' 
                            : isLocked 
                                ? 'bg-slate-50 border-slate-200 text-slate-300'
                                : 'bg-white border-[#307FE2] text-[#307FE2] ring-4 ring-[#307FE2]/10'}
                    `}
                >
                    {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : isLocked ? <Lock className="w-5 h-5" /> : <Layers className="w-6 h-6" />}
                </div>
            </div>

            <div className="text-left w-full max-w-[140px]">
                {isLocked ? (
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <Lock className="w-3 h-3" /> Terkunci
                    </div>
                ) : (
                    <div className="space-y-2">
                        <button 
                            onClick={onClick}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#307FE2] text-[#307FE2] rounded-xl text-xs font-bold hover:bg-[#307FE2] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                        >
                            Lihat Modul <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#307FE2] transition-all duration-500" style={{width: `${progressPercent}%`}}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const RegularModules: React.FC = () => {
    // State
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<RegularModule | null>(null);
    const [activeTab, setActiveTab] = useState<'summary' | 'pdf'>('summary');
    const [newComment, setNewComment] = useState('');
    const [userRating, setUserRating] = useState(0);

    // Data Processing: Grouping Modules by Level then Category
    const learningPath = useMemo(() => {
        const levels = ['Tradisional', 'Tradisional Utama', 'Tradisional Teladan', 'Berkembang'];
        
        return levels.map(level => {
            const modulesInLevel = MOCK_REGULAR_MODULES.filter(m => m.level === level);
            if (modulesInLevel.length === 0) return null;

            const categories = Array.from(new Set(modulesInLevel.map(m => m.category)));
            
            return {
                levelName: level,
                categories: categories.map(cat => ({
                    name: cat,
                    modules: modulesInLevel.filter(m => m.category === cat)
                }))
            };
        }).filter(Boolean);
    }, []);

    // Stats
    const totalModules = MOCK_REGULAR_MODULES.length;
    const completedCount = MOCK_REGULAR_MODULES.filter(m => m.status === 'completed').length;

    const recommendations = [
        { title: 'Manajemen Operasional', score: 0, status: 'PRIORITAS' as const },
        { title: 'Skala Usaha', score: 2.0, status: 'PRIORITAS' as const },
        { title: 'Manajemen Pemasaran', score: 2.8, status: 'PRIORITAS' as const },
    ];

    const activeCategoryModules = selectedCategory 
        ? MOCK_REGULAR_MODULES.filter(m => m.category === selectedCategory) 
        : [];

    // --- HANDLERS ---
    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedModule(null);
    };

    const handleModuleClick = (module: RegularModule) => {
        setSelectedModule(module);
        setActiveTab('summary');
    };

    const handleBackToGrid = () => setSelectedModule(null);
    const handleCloseModal = () => {
        setSelectedCategory(null);
        setSelectedModule(null);
    };

    const handlePostComment = () => {
        if (!newComment.trim() || !selectedModule) return;
        selectedModule.comments.unshift({ id: Date.now().toString(), user: 'Anda', avatar: 'U', date: 'Baru saja', text: newComment, rating: userRating });
        selectedModule.reviewsCount += 1;
        setNewComment(''); setUserRating(0);
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
            
            {/* --- NEW HERO SECTION --- */}
            {/* Menggantikan Header Lama */}
            <HeroSection 
                completed={completedCount} 
                total={totalModules} 
                level="Tradisional" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* --- TIMELINE (LEARNING PATH) --- */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[600px] relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-slate-50 -z-10"></div>
                    
                    {learningPath.map((lvlGroup, lvlIdx) => {
                        if (!lvlGroup) return null;
                        
                        return (
                            <div key={lvlGroup.levelName} className="mb-16 last:mb-0">
                                {/* Level Label */}
                                <div className="flex justify-center mb-12 relative z-10">
                                    <span className={`px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest border shadow-sm ${lvlIdx === 0 ? 'bg-[#F0F9FF] text-[#0857C3] border-[#BAE6FD]' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                        {lvlGroup.levelName}
                                    </span>
                                </div>

                                {/* Category Items */}
                                <div>
                                    {lvlGroup.categories.map((cat, idx) => (
                                        <CategoryTimelineItem 
                                            key={cat.name} 
                                            categoryName={cat.name} 
                                            modules={cat.modules} 
                                            isLast={idx === lvlGroup.categories.length - 1} 
                                            onClick={() => handleCategoryClick(cat.name)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- SIDEBAR REKOMENDASI --- */}
                <div className="lg:col-span-4 space-y-8 sticky top-24">
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
                        <div className="mb-6"><h3 className="font-bold text-slate-800 text-lg mb-1">Rekomendasi Modul</h3><p className="text-xs text-slate-400 font-medium">Berdasarkan hasil skoring terendah Anda</p></div>
                        {recommendations.map((rec, idx) => <RecommendationCard key={idx} {...rec} />)}
                    </div>
                </div>
            </div>

            {/* --- MODAL POPUP (KATALOG & DETAIL) --- */}
            {(selectedCategory || selectedModule) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#F8FAFC] w-full max-w-6xl h-full md:h-[90vh] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 border border-white/10 ring-1 ring-white/10">
                        
                        {/* 1. VIEW DETAIL MODUL (VIDEO/MATERI) */}
                        {selectedModule ? (
                            <div className="flex flex-col h-full overflow-hidden bg-white">
                                {/* Header Detail */}
                                <div className="p-5 md:p-8 border-b border-slate-100 flex justify-between items-start shrink-0 bg-white/90 backdrop-blur-md z-20 sticky top-0">
                                    <div className="flex gap-4 items-center">
                                        <button onClick={handleBackToGrid} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#0857C3] transition-colors"><ArrowLeft className="w-6 h-6" /></button>
                                        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[#307FE2] uppercase tracking-widest mb-0.5">{selectedModule.category}</div>
                                            <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-1">{selectedModule.title}</h2>
                                        </div>
                                    </div>
                                    <button onClick={handleCloseModal} className="p-2 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors"><X className="w-5 h-5" /></button>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="px-6 md:px-12 pt-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                                        <div className="flex gap-8">
                                            <button onClick={() => setActiveTab('summary')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'summary' ? 'border-[#307FE2] text-[#307FE2]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Ringkasan</button>
                                            <button onClick={() => setActiveTab('pdf')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pdf' ? 'border-[#307FE2] text-[#307FE2]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Materi PDF</button>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-12 max-w-4xl mx-auto">
                                        {activeTab === 'summary' ? (
                                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {selectedModule.videoUrl && (
                                                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white bg-slate-900 aspect-video group">
                                                        <iframe src={selectedModule.videoUrl} title={selectedModule.title} className="w-full h-full" allowFullScreen />
                                                    </div>
                                                )}
                                                <div className="prose prose-lg prose-blue text-slate-600 max-w-none">
                                                    <h3 className="text-2xl font-bold text-[#0857C3] mb-4">Tentang Modul Ini</h3>
                                                    <p className="leading-relaxed">{selectedModule.summary || "Pelajari strategi praktis yang dapat langsung diterapkan pada operasional bisnis Anda."}</p>
                                                </div>
                                                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 md:p-8">
                                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-orange-400 fill-current"/> Beri Penilaian</h4>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex gap-2">
                                                            {[1,2,3,4,5].map(s => <button key={s} onClick={() => setUserRating(s)} className="focus:outline-none hover:scale-110 transition-transform"><Star className={`w-8 h-8 ${userRating >= s ? 'text-orange-400 fill-current' : 'text-slate-300'}`} /></button>)}
                                                        </div>
                                                        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Apa pendapat Anda?" className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#307FE2] outline-none text-sm min-h-[100px]" />
                                                        <div className="flex justify-end"><Button size="sm" onClick={handlePostComment} disabled={!newComment}>Kirim</Button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-[50vh] flex flex-col justify-center items-center text-center p-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                                <FileText className="w-16 h-16 text-[#307FE2] mb-4" />
                                                <h3 className="text-xl font-bold text-slate-700 mb-2">Dokumen Materi Lengkap</h3>
                                                <Button variant="outline" className="bg-white">Buka PDF Viewer</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            
                            /* 2. VIEW CATALOG GRID (Saat Kategori diklik) */
                            <div className="flex flex-col h-full relative overflow-hidden bg-[#F1F5F9]">
                                <div className="relative bg-[#0857C3] p-8 md:p-10 shrink-0 overflow-hidden shadow-md z-10">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#307FE2]/30 rounded-full blur-3xl -ml-20 -mb-20"></div>
                                    <div className="relative z-10 flex justify-between items-start">
                                        <div className="max-w-2xl">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold border border-white/20">KATALOG MODUL</span>
                                                <span className="px-3 py-1 bg-[#F59E0B] rounded-lg text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">{selectedCategory}</span>
                                            </div>
                                            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 tracking-tight">Katalog Modul</h2>
                                            <p className="text-blue-100 text-sm md:text-base font-medium max-w-lg">Pilih modul dibawah ini untuk memulai pembelajaran.</p>
                                        </div>
                                        <button onClick={handleCloseModal} className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"><X className="w-6 h-6" /></button>
                                    </div>
                                </div>

                                <div className="px-6 md:px-10 py-4 bg-white border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 z-20 shadow-sm">
                                     <div className="relative w-full md:w-96 group">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#307FE2] transition-colors" />
                                        <input type="text" placeholder="Cari judul modul..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#307FE2] focus:bg-white transition-all" />
                                     </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                                    {activeCategoryModules.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                                            {activeCategoryModules.map((mod, idx) => (
                                                <BookCard 
                                                    key={mod.id} 
                                                    book={mod} 
                                                    index={idx}
                                                    onClick={handleModuleClick} 
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full">
                                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4"><BookOpen className="w-10 h-10 opacity-20" /></div>
                                            <p className="text-lg font-medium text-slate-600">Belum ada modul di kategori ini.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};