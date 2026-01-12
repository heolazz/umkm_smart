import React from 'react';
import { MOCK_LAST_SCORE } from '../constants';
import { Button } from './Button';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { AlertCircle, Download, BookOpen, RotateCcw, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from '../App';

// Helper Component untuk Progress Bar Skill
const SkillBar: React.FC<{ label: string; score: number; type: 'strength' | 'weakness' }> = ({ label, score, type }) => {
  const isStrength = type === 'strength';
  const barColor = isStrength ? 'bg-[#10B981]' : 'bg-red-500';
  const textColor = isStrength ? 'text-[#10B981]' : 'text-red-600';
  const percent = (score / 10) * 100;

  return (
    <div className="mb-4 last:mb-0 group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700 group-hover:text-[#0857C3] transition-colors line-clamp-1">{label}</span>
        <span className={`text-xs font-bold ${textColor} bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100`}>
          {score}/10
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`} 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export const SkoringResult: React.FC = () => {
  const { navigate } = useNavigate();
  const data = MOCK_LAST_SCORE;

  // Transform data for Recharts
  const chartData = data.details.map(d => ({
    subject: d.segment,
    A: d.score,
    B: d.prevScore || 0,
    fullMark: 10,
  }));

  const strengths = data.details.filter(d => d.score >= 4).sort((a, b) => b.score - a.score).slice(0, 3);
  const weaknesses = data.details.filter(d => d.score < 4).sort((a, b) => a.score - b.score).slice(0, 3);

  // Custom Tooltip untuk Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-[#71C5E8]/30 shadow-xl rounded-xl">
          <p className="font-bold text-[#0857C3] mb-2">{label}</p>
          <div className="space-y-1 text-xs font-medium">
            <p className="text-[#307FE2]">Saat Ini: <span className="font-bold">{payload[0].value}</span></p>
            {payload[1] && <p className="text-slate-400">Sebelumnya: {payload[1].value}</p>}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* 1. HERO SECTION: Score & Level */}
      <div className="bg-white rounded-3xl p-1 shadow-sm border border-[#71C5E8]/30">
        <div className="bg-gradient-to-br from-[#F5FAFF] to-white rounded-[22px] p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Score Circle */}
            <div className="flex items-center gap-6 md:gap-8">
              <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-4 border-[#71C5E8]/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-[#307FE2] border-t-transparent animate-[spin_3s_linear_infinite]"></div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-black text-[#0857C3] tracking-tighter">{data.score}</span>
                  <span className="text-xs uppercase font-bold text-[#307FE2] tracking-widest mt-1">Skor Total</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0857C3] mb-2">Hasil Analisa Kompetensi</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-slate-500 font-medium">Level Anda saat ini:</span>
                  <span className="px-4 py-1.5 bg-[#0857C3] text-white text-sm font-bold rounded-full shadow-lg shadow-[#0857C3]/20">
                    {data.level}
                  </span>
                </div>
                <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                  Penilaian ini berdasarkan indikator performa bisnis dan kesiapan digital UMKM Anda per tanggal <strong>{data.date}</strong>.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button variant="outline" className="border-[#71C5E8] text-[#0857C3] hover:bg-[#F5FAFF] rounded-xl h-12">
                <Download className="w-4 h-4 mr-2" /> Unduh Laporan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Chart Area */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-[#71C5E8]/20 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-xl text-[#0857C3] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#307FE2]" />
                Peta Kompetensi
             </h3>
          </div>
          
          <div className="flex-1 w-full min-h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#0857C3', fontSize: 12, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#cbd5e1" tick={false} axisLine={false} />
                <Radar 
                  name="Skoring Terbaru" 
                  dataKey="A" 
                  stroke="#307FE2" 
                  strokeWidth={3}
                  fill="#307FE2" 
                  fillOpacity={0.25} 
                />
                <Radar 
                  name="Skoring Sebelumnya" 
                  dataKey="B" 
                  stroke="#94a3b8" 
                  strokeWidth={1}
                  fill="#94a3b8" 
                  fillOpacity={0.1} 
                  strokeDasharray="4 4"
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Details Area (Strength & Weakness) */}
        <div className="lg:col-span-5 space-y-6">
           {/* Strengths Card */}
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#10B981]/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Award className="w-24 h-24 text-[#10B981]" />
             </div>
             <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981]">
                 <Award className="w-4 h-4" />
               </span>
               Kelebihan Utama
             </h4>
             <div className="space-y-5 relative z-10">
                {strengths.map((s, i) => (
                  <SkillBar key={i} label={s.segment} score={s.score} type="strength" />
                ))}
             </div>
           </div>

           {/* Weaknesses Card */}
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertCircle className="w-24 h-24 text-red-500" />
             </div>
             <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500">
                 <AlertCircle className="w-4 h-4" />
               </span>
               Area Perlu Peningkatan
             </h4>
             <div className="space-y-5 relative z-10">
                {weaknesses.map((s, i) => (
                  <SkillBar key={i} label={s.segment} score={s.score} type="weakness" />
                ))}
             </div>
           </div>
        </div>
      </div>

      {/* 3. CALL TO ACTION BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0857C3] via-[#0645a0] to-[#0857C3] rounded-3xl p-8 md:p-10 text-white shadow-2xl shadow-[#0857C3]/20">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#307FE2] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#71C5E8] rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              Rekomendasi Selanjutnya <ChevronRight className="w-6 h-6 opacity-50"/>
            </h3>
            <p className="text-[#F5FAFF]/90 text-lg leading-relaxed">
              Untuk mencapai level <strong>Berkembang</strong> (Target: 3.21), Anda disarankan mengambil modul pelatihan prioritas berdasarkan kelemahan Anda.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
                onClick={() => navigate('modul-reguler')} 
                className="bg-[#0857C3] text-white hover:bg-slate-50 hover:text-[#0857C3] border-0 px-8 py-6 h-auto text-base font-bold rounded-2xl shadow-xl"
            >
                <BookOpen className="w-5 h-5 mr-2" /> Mulai Belajar
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 h-auto text-base rounded-2xl">
                <RotateCcw className="w-5 h-5 mr-2" /> Skoring Ulang
            </Button>
          </div>
        </div>
      </div>
      
      {/* 4. HISTORY TABLE (Minimalist) */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#71C5E8]/20 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-lg text-[#0857C3]">Riwayat Skoring</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-[#0857C3] font-bold border-b border-[#71C5E8]/10 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Nilai Akhir</th>
                <th className="px-6 py-4">Status Level</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-[#F5FAFF] transition-colors group">
                <td className="px-6 py-4 font-medium">{data.date}</td>
                <td className="px-6 py-4">
                    <span className="font-bold text-[#0857C3] text-lg">{data.score}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#F0F7FF] text-[#307FE2] border border-[#71C5E8]/30">
                    {data.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#307FE2] font-semibold hover:text-[#0857C3] flex items-center justify-end w-full gap-1 text-xs">
                    Detail <ChevronRight className="w-3 h-3"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};