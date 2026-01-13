import React, { useState } from 'react';
import { MOCK_THEMATIC_MODULES } from '../constants';
import { ThematicModule, Comment } from '../types';
import { Button } from './Button';
import { Search, Filter, Star, Clock, FileText, X, BookOpen, Sparkles, Send } from 'lucide-react';

export const ThematicModules: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedModule, setSelectedModule] = useState<ThematicModule | null>(null);
  
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const filters = ['Semua', 'Pertanian', 'Inkubasi Bisnis', 'Desa', 'Umum', 'Ultra Mikro', 'Export', 'BUMDesa'];

  const filteredModules = activeFilter === 'Semua' 
    ? MOCK_THEMATIC_MODULES 
    : MOCK_THEMATIC_MODULES.filter(m => m.category === activeFilter);

  const handleOpenModule = (module: ThematicModule) => {
    setSelectedModule(module);
    setNewComment('');
    setUserRating(0);
  };

  const handlePostComment = () => {
    if (!newComment.trim() || !selectedModule) return;
    const comment: Comment = { 
        id: Date.now().toString(), 
        user: 'Anda', 
        avatar: 'U', 
        date: 'Baru saja', 
        text: newComment, 
        rating: userRating 
    };
    selectedModule.comments.unshift(comment);
    selectedModule.reviews += 1; 
    setNewComment('');
    setUserRating(0);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700 pb-20">
      
      {/* Header Info: BG #DBEBF6 (Light) */}
      <div className="bg-[#DBEBF6] rounded-[2rem] p-10 mb-10 text-[#8FC8F5] relative overflow-hidden shadow-xl shadow-[#8FC8F5]/5 border border-white">
         <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-40 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
         
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                    {/* Icon #8FC8F5 */}
                    <Sparkles className="w-5 h-5 text-[#8FC8F5]" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Modul Tematik</h2>
            </div>
            {/* Text #8FC8F5/80 */}
            <p className="text-[#8FC8F5]/80 max-w-2xl mb-6 text-lg font-medium leading-relaxed">
            Materi pembelajaran spesifik untuk kebutuhan saat ini. Pelajari metode pemasaran kekinian, teknik produksi, hingga manajemen risiko agribisnis.
            </p>
            <div className="flex flex-wrap gap-3">
                <span className="bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-white text-[#8FC8F5]">Insight Praktis</span>
                <span className="bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-white text-[#8FC8F5]">Studi Kasus</span>
                <span className="bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-white text-[#8FC8F5]">Webinar Recording</span>
            </div>
         </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
         <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar mask-gradient-right">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                /* Filter Active #8FC8F5, Inactive border #C6E2F7 */
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors border shadow-sm
                  ${activeFilter === f 
                    ? 'bg-[#8FC8F5] text-white border-[#8FC8F5] shadow-[#8FC8F5]/20' 
                    : 'bg-white text-[#8FC8F5]/60 border-[#C6E2F7]/40 hover:bg-[#DBEBF6] hover:border-[#C6E2F7]'}
                `}
              >
                {f}
              </button>
            ))}
         </div>
         
         <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FC8F5]/40" />
              <input 
                type="text" 
                placeholder="Cari modul..." 
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#C6E2F7]/40 bg-white text-sm font-medium focus:ring-2 focus:ring-[#8FC8F5] focus:outline-none transition-shadow focus:shadow-sm"
              />
           </div>
           <Button variant="outline" className="px-3 rounded-xl bg-white border-[#C6E2F7]/40">
             <Filter className="w-4 h-4 text-[#8FC8F5]" />
           </Button>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleOpenModule(item)}
            className="bg-white rounded-2xl border border-[#C6E2F7]/30 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
          >
            <div className="h-52 bg-[#DBEBF6] relative overflow-hidden shrink-0">
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#8FC8F5] text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm tracking-wide uppercase border border-[#C6E2F7]/20">
                 {item.category}
               </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-[#8FC8F5] line-clamp-2 mb-3 h-14 leading-tight text-lg group-hover:text-[#C6E2F7] transition-colors">
                {item.title}
              </h3>
              
              <div className="flex flex-wrap items-center text-xs text-[#8FC8F5]/60 mb-8 gap-x-5 gap-y-2 font-medium">
                 <span className="flex items-center gap-1.5">
                   <Clock className="w-3.5 h-3.5" /> {item.date.split('|')[0]}
                 </span>
                 <div className="flex items-center gap-1.5">
                   <div className="flex items-center">
                     <Star className={`w-3.5 h-3.5 ${item.rating > 0 ? 'fill-[#FDBA74] text-[#FDBA74]' : 'text-slate-300'}`} />
                     <span className="ml-1 font-bold text-[#8FC8F5]">
                        {item.rating > 0 ? item.rating : 'Baru'}
                     </span>
                   </div>
                   {item.reviews > 0 && (
                       <span className="text-[#8FC8F5]/40">({item.reviews} ulasan)</span>
                   )}
                 </div>
              </div>
              
              <div className="mt-auto flex gap-3">
                  <button className="flex-1 px-4 py-2.5 text-xs font-bold text-[#8FC8F5]/70 bg-[#DBEBF6] group-hover:bg-[#C6E2F7]/30 group-hover:text-[#8FC8F5] rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#DBEBF6]">
                    <FileText className="w-3.5 h-3.5" /> Ringkasan
                  </button>
                  <Button variant="outline" className="flex-1 border-[#C6E2F7]/30 group-hover:border-[#8FC8F5] group-hover:text-[#8FC8F5] text-xs py-2.5 h-auto rounded-xl">
                    Lihat Detail
                  </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary & Rating Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#8FC8F5]/40 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-white/50">
              
              <div className="flex justify-between items-start p-8 border-b border-[#F5FAFF] shrink-0 bg-white">
                 <div>
                    <span className="inline-block px-3 py-1 bg-[#DBEBF6] text-[#8FC8F5] text-[10px] font-extrabold uppercase tracking-widest rounded-lg mb-3">
                        {selectedModule.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#8FC8F5] leading-tight pr-4">
                        {selectedModule.title}
                    </h3>
                 </div>
                 <button onClick={() => setSelectedModule(null)} className="p-2 rounded-full hover:bg-[#DBEBF6] text-[#8FC8F5]/50 hover:text-[#8FC8F5] transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar">
                 <div className="flex items-start gap-5 mb-10">
                    <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-[#DBEBF6] text-[#8FC8F5] shrink-0">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#8FC8F5] mb-2 uppercase tracking-wide">Ringkasan Materi</h4>
                        <p className="text-[#8FC8F5]/70 text-sm leading-relaxed font-medium">
                            {selectedModule.summary || "Ringkasan materi belum tersedia untuk modul ini."}
                        </p>
                    </div>
                 </div>

                 <div className="h-px bg-[#E2E8F0] w-full mb-8"></div>

                 <div>
                    <h4 className="font-bold text-[#8FC8F5] mb-6 flex items-center gap-2">
                        Ulasan & Diskusi 
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {selectedModule.comments.length}
                        </span>
                    </h4>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
                        <p className="text-xs font-bold text-[#8FC8F5] uppercase tracking-wide mb-3">Berikan Penilaian</p>
                        <div className="flex gap-2 mb-4">
                            {[1,2,3,4,5].map(star => (
                                <button 
                                    key={star} 
                                    onClick={() => setUserRating(star)} 
                                    className="focus:outline-none transition-transform active:scale-95 group"
                                >
                                    <Star className={`w-6 h-6 transition-colors ${userRating >= star ? 'text-[#FDBA74] fill-[#FDBA74]' : 'text-slate-300 group-hover:text-[#FDBA74]'}`} />
                                </button>
                            ))}
                        </div>
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Bagikan pendapat Anda tentang modul ini..."
                            className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#8FC8F5]/10 focus:border-[#8FC8F5] outline-none bg-slate-50 min-h-[80px] text-[#8FC8F5] mb-3"
                        />
                        <div className="flex justify-end">
                            <Button variant="primary" size="sm" onClick={handlePostComment} disabled={!newComment || userRating === 0} className="rounded-lg h-9 text-xs">
                                <Send className="w-3.5 h-3.5 mr-2" /> Kirim
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {selectedModule.comments && selectedModule.comments.length > 0 ? (
                            selectedModule.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="w-8 h-8 rounded-full bg-[#DBEBF6] text-[#8FC8F5] border border-[#C6E2F7] flex items-center justify-center text-[10px] font-bold shrink-0">
                                        {comment.avatar}
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-xl rounded-tl-none border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-[#8FC8F5]">{comment.user}</span>
                                            <span className="text-[10px] text-slate-400">{comment.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                           {[...Array(5)].map((_, i) => (
                                              <Star key={i} className={`w-3 h-3 ${i < comment.rating ? 'text-[#FDBA74] fill-[#FDBA74]' : 'text-slate-200'}`} />
                                           ))}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-sm italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                Belum ada ulasan. Jadilah yang pertama memberikan review!
                            </div>
                        )}
                    </div>
                 </div>
              </div>
              
              <div className="p-6 border-t border-[#F5FAFF] bg-white flex justify-end shrink-0">
                  <Button onClick={() => setSelectedModule(null)} variant="primary" className="bg-[#8FC8F5] text-white hover:bg-[#7AB3E0] rounded-xl px-8 shadow-lg shadow-[#8FC8F5]/10">
                      Tutup
                  </Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};