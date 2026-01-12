import React from 'react';
import { Bookmark, BarChart3, Users, Target } from 'lucide-react';
import { RegularModule } from '../types';

interface BookCardProps {
  book: RegularModule;
  onClick: (module: RegularModule) => void;
  index?: number;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick, index = 0 }) => {
  
  // Variasi tema visual berdasarkan index/id
  const isDarkTheme = (index % 2 === 0);

  const styles = isDarkTheme 
    ? {
        container: 'bg-[#0857C3]', // Dark Blue
        pill: 'bg-black/20 text-white border-white/10',
        accentLine: 'bg-[#A3C5E9]',
        iconColor: 'text-white/10'
      }
    : {
        container: 'bg-gradient-to-br from-[#2D9CDB] to-[#56CCF2]', // Light Blue Gradient
        pill: 'bg-white/20 text-white border-white/20',
        accentLine: 'bg-[#FFD600]',
        iconColor: 'text-white/20'
      };

  return (
    <div 
      onClick={() => onClick(book)}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer"
    >
      {/* --- HEADER SECTION (COVER 16:9) --- */}
      <div className={`relative w-full aspect-video p-5 flex flex-col justify-between overflow-hidden shrink-0 ${styles.container}`}>
        
        {/* Top Row: Brand & Category */}
        <div className="flex justify-between items-start relative z-10">
          <div className={`px-2 py-1 rounded-[4px] border ${styles.pill} backdrop-blur-sm`}>
            <span className="text-[9px] font-bold tracking-wide block leading-none font-sans">
              linkumkm
            </span>
          </div>

          <div className="px-2 py-1 rounded-[2px] bg-[#FFC107] shadow-sm">
             <span className="text-[8px] font-extrabold text-slate-900 uppercase tracking-widest block leading-none">
              {book.category}
             </span>
          </div>
        </div>

        {/* Middle Content: Level & Title */}
        <div className="relative z-10 mt-auto pb-1">
           {/* Level Indicator Line */}
           <div className="flex items-center gap-2 mb-2">
              <div className={`h-[3px] w-8 rounded-full ${styles.accentLine}`}></div>
              <span className="text-[8px] font-bold text-white/90 uppercase tracking-[0.2em] shadow-black/10 drop-shadow-sm">
                {book.level}
              </span>
           </div>

           {/* Title (White) */}
           <h2 className="text-white font-bold text-lg leading-tight line-clamp-2 pr-2 drop-shadow-md">
             {book.title}
           </h2>
        </div>

        {/* Background Watermark (Decoration) */}
        <div className={`absolute -right-6 -bottom-8 transform rotate-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ${styles.iconColor}`}>
           <Bookmark size={140} strokeWidth={0} fill="currentColor" />
        </div>
        
        {/* Overlay Gradient untuk keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
      </div>

      {/* --- FOOTER SECTION (Details) --- */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white relative">
        <div className="mb-4">
           {/* Judul ulang di footer untuk kejelasan jika cover text terpotong */}
           <h3 className="text-xs font-bold text-slate-700 leading-snug line-clamp-2 group-hover:text-[#0857C3] transition-colors">
             {book.title}
           </h3>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                14 Juli 2025
            </span>
            <span className="text-[10px] font-bold text-[#307FE2] group-hover:translate-x-1 transition-transform">
                Lihat Modul &rarr;
            </span>
        </div>
      </div>
    </div>
  );
};