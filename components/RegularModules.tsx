import React, { useState, useMemo } from 'react';
import { MOCK_REGULAR_MODULES } from '../constants';
import { BookCard } from './BookCard';
import { 
  Lock, Check, ChevronRight,
  Star, FileText, X, ArrowLeft, 
  Search, BookOpen, Layers, Trophy, User, Send
} from 'lucide-react';
import { RegularModule } from '../types';
import { Button } from './Button';

// 1. HERO SECTION (MONOCHROMATIC BLUE GRADIENT)
const HeroSection: React.FC<{ completed: number; total: number; level: string }> = ({ completed, total, level }) => {
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="mb-12 relative">
             {/* BG: Solid White */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-xl shadow-slate-200 border border-slate-100 relative">
                
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F0F9FF] rounded-full blur-[100px] opacity-60 -mt-20 -mr-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    
                    {/* LEFT SIDE */}
                    <div className="max-w-2xl flex-1 space-y-6">
                        {/* Badge Level */}
                        <div className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-bold shadow-sm cursor-default">
                            {/* Icon diubah ke Biru agar konsisten 1 warna */}
                            <div className="p-1.5 bg-[#F97316] rounded-full text-white shadow-sm">
                                <Trophy className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span>Level Saat Ini: <span className="text-[#0857C3] font-black tracking-wide ml-1">{level}</span></span>
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-tight tracking-tight mb-4">
                                Bangun Fondasi <br className="hidden md:block"/>
                                <span className="text-[#0857C3]">Bisnis yang Kuat.</span>
                            </h1>
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg font-medium">
                                Selesaikan modul pembelajaran terstruktur untuk meningkatkan kompetensi usaha Anda.
                            </p>
                        </div>
                        
                        {/* Call to Action: Blue Button */}
                        <Button className="bg-[#F97316] hover:bg-[#0645A0] text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-200 font-bold text-sm transition-transform active:scale-95">
                            Lanjutkan Belajar
                        </Button>
                    </div>

                    {/* RIGHT SIDE: Progress Card */}
                    <div className="w-full lg:w-auto flex-shrink-0 z-20">
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 w-full lg:min-w-[340px] shadow-2xl shadow-slate-200/50">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="text-slate-800 font-bold text-base mb-0.5 flex items-center gap-2">
                                         Progress Belajar
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">Penyelesaian</p>
                                </div>
                                <span className="text-4xl font-black text-[#0857C3]">
                                    {progressPercentage}%
                                </span>
                            </div>

                            {/* Progress Bar Gradient 1 Warna (Biru Tua ke Biru Terang) */}
                            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-4 p-1">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#0857C3] to-[#307FE2] rounded-full transition-all duration-1000 ease-out relative shadow-sm" 
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Stats Icon & Text jadi Biru (1 Warna) */}
                            <div className="flex items-center justify-between text-sm font-medium text-slate-600 bg-[#F8FAFC] py-3 px-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#0857C3] stroke-[3]" />
                                    <span><span className="font-black text-[#0857C3] text-lg">{completed}</span> Selesai</span>
                                </div>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <div className="flex items-center gap-2">
                                    <span><span className="font-black text-slate-800 text-lg">{total}</span> Modul</span>
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
    
    // Semua status menggunakan warna Biru #307FE2
    const unifiedBlueConfig = {
        chipBg: 'bg-[#F0F9FF]', 
        chipText: 'text-[#307FE2]', 
        scoreBg: 'bg-[#F0F9FF]', 
        scoreText: 'text-[#307FE2]',
        bar: 'bg-[#307FE2]', 
        btn: 'bg-[#307FE2] hover:bg-[#1E40AF] text-white shadow-blue-100',
        border: 'border-blue-100'
    };

    const statusConfig = {
        'PRIORITAS': unifiedBlueConfig,
        'PENTING': unifiedBlueConfig,
        'AMAN': unifiedBlueConfig,
    };

    const config = statusConfig[status];

    return (
        <div className={`bg-white rounded-2xl p-5 border shadow-sm mb-4 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 ${config.border}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 leading-tight">{title}</h4>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${config.chipBg} ${config.chipText}`}>
                        {status}
                    </span>
                </div>
                <div className={`px-2.5 py-1 rounded-md flex items-center justify-center text-[10px] font-extrabold shadow-sm ${config.scoreBg} ${config.scoreText}`}>
                    {score}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Saat ini</span>
                    <span>Target : 5.0</span>
                </div>
                
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${config.bar}`} style={{width: `${(score/5)*100}%`}}></div>
                </div>
                
                <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all mt-2 shadow-sm ${config.btn}`}>
                    Pelajari Sekarang
                </button>
            </div>
        </div>
    );
};

// 3. TIMELINE ITEM
const CategoryTimelineItem: React.FC<{ 
    categoryName: string; 
    modules: RegularModule[]; 
    isLast: boolean; 
    onClick: () => void; 
}> = ({ categoryName, modules, isLast, onClick }) => {
    
    const totalModules = modules.length;
    const completedModules = modules.filter(m => m.status === 'completed').length;
    const isCompleted = totalModules > 0 && totalModules === completedModules;
    const isLocked = modules.every(m => m.status === 'locked'); 
    const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    return (
        <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-10 items-center mb-8 group">
            {!isLast && <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-[-40px] w-[2px] bg-slate-200 -z-10"></div>}
            
            <div className="text-right py-2">
                <h4 className={`font-bold text-sm md:text-base leading-tight mb-1 transition-colors ${isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-[#0857C3]'}`}>
                    {categoryName}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {completedModules}/{totalModules} Materi Selesai
                </span>
            </div>

            {/* CENTER ICON */}
            <div className="flex justify-center relative">
                <div 
                    onClick={!isLocked ? onClick : undefined}
                    className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center border-4 relative z-10 transition-all duration-300 cursor-pointer shadow-sm transform group-hover:scale-110
                        ${isCompleted 
                            ? 'bg-[#F97316] border-[#F97316] text-white shadow-orange-200' 
                            : isLocked 
                                ? 'bg-slate-50 border-slate-200 text-slate-300'
                                : 'bg-white border-[#307FE2] text-[#307FE2] ring-4 ring-[#307FE2]/5 group-hover:ring-[#307FE2]/20'}
                    `}
                >
                    {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : isLocked ? <Lock className="w-5 h-5" /> : <Layers className="w-6 h-6" />}
                </div>
            </div>

            {/* RIGHT SIDE (ACTION & PROGRESS) */}
            <div className="text-left w-full max-w-[140px]">
                {isLocked ? (
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                        <Lock className="w-3 h-3" /> Terkunci
                    </div>
                ) : (
                    <div className="space-y-2">
                        <button 
                            onClick={onClick}
                            className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-xs font-bold transition-all shadow-sm group-hover:shadow-md
                             ${isCompleted 
                                ? 'border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white' 
                                : 'border-[#307FE2] text-[#307FE2] hover:bg-[#307FE2] hover:text-white'}
                            `}
                        >
                            {isCompleted ? 'Ulangi Materi' : 'Lihat Modul'} <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 px-1">
                                <span>Progress</span>
                                <span className={isCompleted ? "text-[#F97316]" : "text-[#307FE2]"}>{Math.round(progressPercent)}%</span>
                            </div>
                            
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-[#F97316]' : 'bg-[#F97316]'}`} 
                                    style={{width: `${progressPercent}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const RegularModules: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<RegularModule | null>(null);
    const [activeTab, setActiveTab] = useState<'summary' | 'pdf'>('summary');
    const [newComment, setNewComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // STATE BARU: Untuk efek hover bintang

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

    const totalModules = MOCK_REGULAR_MODULES.length;
    const completedCount = MOCK_REGULAR_MODULES.filter(m => m.status === 'completed').length;

    // Label Rating
    const ratingLabels = [
        "Pilih Rating", 
        "Sangat Kurang", 
        "Kurang", 
        "Cukup", 
        "Sangat Baik", 
        "Luar Biasa!"
    ];

    const recommendations = [
        { title: 'Manajemen Operasional', score: 0, status: 'PRIORITAS' as const },
        { title: 'Skala Usaha', score: 2.0, status: 'PRIORITAS' as const },
        { title: 'Manajemen Pemasaran', score: 2.8, status: 'PENTING' as const },
    ];

    const activeCategoryModules = selectedCategory 
        ? MOCK_REGULAR_MODULES.filter(m => m.category === selectedCategory) 
        : [];

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedModule(null);
    };

    const handleModuleClick = (module: RegularModule) => {
        setSelectedModule(module);
        setActiveTab('summary');
        setUserRating(0); // Reset rating
        setHoverRating(0);
        setNewComment('');
    };

    const handleBackToGrid = () => setSelectedModule(null);
    const handleCloseModal = () => {
        setSelectedCategory(null);
        setSelectedModule(null);
    };

    const handlePostComment = () => {
        if (!newComment.trim() || !selectedModule) return;
        selectedModule.comments.unshift({ id: Date.now().toString(), user: 'Anda', avatar: 'A', date: 'Baru saja', text: newComment, rating: userRating });
        selectedModule.reviewsCount += 1;
        setNewComment(''); setUserRating(0); setHoverRating(0);
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
            
            <HeroSection 
                completed={completedCount} 
                total={totalModules} 
                level="Tradisional" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[600px] relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-slate-50 -z-10"></div>
                    
                    {learningPath.map((lvlGroup, lvlIdx) => {
                        if (!lvlGroup) return null;
                        
                        return (
                            <div key={lvlGroup.levelName} className="mb-16 last:mb-0">
                                <div className="flex justify-center mb-12 relative z-10">
                                    <span className={`px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest border shadow-sm ${lvlIdx === 0 ? 'bg-white text-[#0857C3] border-slate-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                        {lvlGroup.levelName}
                                    </span>
                                </div>

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

                <div className="lg:col-span-4 space-y-8 sticky top-24">
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-lg shadow-slate-200/50">
                        <div className="mb-6 flex items-center gap-2">
                             <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2 leading-none">Rekomendasi Modul</h3>
                                <p className="text-xs text-slate-400 font-medium">Berdasarkan hasil skoring terendah Anda</p>
                             </div>
                        </div>
                        {recommendations.map((rec, idx) => <RecommendationCard key={idx} {...rec} />)}
                    </div>
                </div>
            </div>

            {(selectedCategory || selectedModule) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#F8FAFC] w-full max-w-6xl h-full md:h-[90vh] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 border border-white/10 ring-1 ring-white/10">
                        
                        {selectedModule ? (
                            <div className="flex flex-col h-full overflow-hidden bg-white">
                                {/* MODAL HEADER */}
                                <div className="p-5 md:p-8 border-b border-slate-100 flex justify-between items-start shrink-0 bg-white/90 backdrop-blur-md z-20 sticky top-0">
                                    <div className="flex gap-4 items-center">
                                        <button onClick={handleBackToGrid} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#0857C3] transition-colors"><ArrowLeft className="w-6 h-6" /></button>
                                        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-[10px] font-bold text-[#307FE2] uppercase tracking-widest mb-0.5">{selectedModule.category}</div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                                    <span className="text-[10px] font-bold text-slate-700">{selectedModule.rating}</span>
                                                    <span className="text-[10px] text-slate-400">({selectedModule.reviewsCount} Ulasan)</span>
                                                </div>
                                            </div>
                                            <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-1">{selectedModule.title}</h2>
                                        </div>
                                    </div>
                                    <button onClick={handleCloseModal} className="p-2 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors"><X className="w-5 h-5" /></button>
                                </div>

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
                                                
                                                {/* UPDATE IMPROVED: INPUT KOMENTAR & RATING */}
                                                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 my-10 shadow-xl shadow-slate-100 relative overflow-hidden">
                                                    {/* Decorative Blob */}
                                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                                                    
                                                    <div className="relative z-9">
                                                        <div className="text-center mb-8">
                                                            <h4 className="font-black text-slate-900 text-2xl mb-2 tracking-tight">Apa pendapat Anda?</h4>
                                                            <p className="text-slate-500 text-sm font-medium">Rating Anda sangat berarti untuk pengembangan modul ini.</p>
                                                        </div>
                                                        
                                                        <div className="flex flex-col gap-8 items-center max-w-xl mx-auto">
                                                            
                                                            {/* Interactive Stars Section */}
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className="flex gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                                    {[1,2,3,4,5].map(s => (
                                                                        <button 
                                                                            key={s} 
                                                                            onClick={() => setUserRating(s)} 
                                                                            onMouseEnter={() => setHoverRating(s)}
                                                                            onMouseLeave={() => setHoverRating(0)}
                                                                            className="focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95 p-1"
                                                                        >
                                                                            <Star 
                                                                                className={`w-10 h-10 transition-colors duration-200 ${
                                                                                    (hoverRating || userRating) >= s 
                                                                                        ? 'text-orange-400 fill-orange-400 drop-shadow-md' 
                                                                                        : 'text-slate-300 fill-slate-100'
                                                                                }`} 
                                                                                strokeWidth={1.5} 
                                                                            />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                {/* Dynamic Label */}
                                                                <span className={`text-sm font-bold transition-all duration-300 ${userRating > 0 ? 'text-orange-500 scale-100 opacity-100' : 'text-slate-300 scale-90 opacity-0 h-0'}`}>
                                                                    {ratingLabels[userRating]}
                                                                </span>
                                                            </div>

                                                            {/* Textarea Improved */}
                                                            <div className="w-full relative group">
                                                                <textarea 
                                                                    value={newComment} 
                                                                    onChange={(e) => setNewComment(e.target.value)} 
                                                                    placeholder="Bagikan pengalaman belajar Anda secara detail..." 
                                                                    className="w-full p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400 leading-relaxed min-h-[160px] resize-none"
                                                                />
                                                                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 bg-white px-2 py-1 rounded-md border border-slate-100">
                                                                    {newComment.length} karakter
                                                                </div>
                                                            </div>

                                                            <div className="w-full">
                                                                <Button 
                                                                    size="lg" 
                                                                    onClick={handlePostComment} 
                                                                    disabled={!newComment || userRating === 0} 
                                                                    className={`w-full py-4 rounded-2xl font-bold text-base shadow-xl transition-all ${
                                                                        !newComment || userRating === 0 
                                                                            ? 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed' 
                                                                            : 'bg-[#307FE2] hover:bg-[#2563EB] text-white shadow-blue-200 hover:-translate-y-1'
                                                                    }`}
                                                                >
                                                                    <span className="flex items-center justify-center gap-2">
                                                                        Kirim Ulasan <Send className="w-4 h-4" />
                                                                    </span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* DAFTAR KOMENTAR */}
                                                {selectedModule.comments && selectedModule.comments.length > 0 && (
                                                    <div className="pt-8 border-t border-slate-100">
                                                        <h4 className="font-bold text-slate-800 mb-8 flex items-center gap-2 text-lg">
                                                            Ulasan Pengguna <span className="text-slate-400 text-sm font-normal">({selectedModule.comments.length})</span>
                                                        </h4>
                                                        
                                                        {/* GRID LAYOUT UNTUK KOMENTAR */}
                                                        <div className="grid gap-5">
                                                            {selectedModule.comments.map((comment, i) => (
                                                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex gap-5 group animate-in fade-in slide-in-from-bottom-2">
                                                                    {/* Avatar Area */}
                                                                    <div className="shrink-0">
                                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-[#307FE2] font-black text-lg shadow-sm">
                                                                            {comment.avatar ? comment.avatar : (comment.user ? comment.user.charAt(0).toUpperCase() : <User className="w-5 h-5" />)}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Content Area */}
                                                                    <div className="flex-1">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <div>
                                                                                <h5 className="font-bold text-slate-900 text-sm leading-tight mb-1">{comment.user}</h5>
                                                                                {/* Stars Row */}
                                                                                <div className="flex items-center gap-0.5">
                                                                                    {[...Array(5)].map((_, starIdx) => (
                                                                                        <Star 
                                                                                            key={starIdx} 
                                                                                            className={`w-3.5 h-3.5 ${starIdx < comment.rating ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'}`} 
                                                                                        />
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            {/* Date Badge */}
                                                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 whitespace-nowrap">
                                                                                {comment.date}
                                                                            </span>
                                                                        </div>
                                                                        
                                                                        <p className="text-slate-600 text-sm leading-relaxed tracking-wide font-medium">{comment.text}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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
                            
                            <div className="flex flex-col h-full relative overflow-hidden bg-[#F1F5F9]">
                                {/* CATALOG HEADER */}
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