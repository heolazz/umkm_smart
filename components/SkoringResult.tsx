import React from 'react';
import { MOCK_LAST_SCORE } from '../constants';
import { Button } from './Button';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { AlertCircle, Download, BookOpen, RotateCcw } from 'lucide-react';
import { useNavigate } from '../App';

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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#71C5E8]/20">
        <h2 className="text-3xl font-bold text-[#0857C3] mb-3 tracking-tight">Hasil Skoring Anda</h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[#0857C3]/70 text-lg font-medium">Skor indeks kesiapan Anda adalah <span className="font-bold text-[#0857C3]">{data.score}</span>, Anda masuk ke level:</p>
          <span className="inline-block px-5 py-2.5 bg-[#F5FAFF] text-[#0857C3] font-extrabold rounded-xl border border-[#71C5E8]/30">
            {data.level}
          </span>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" /> Lihat Sertifikat
          </Button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-[#71C5E8]/20">
          <h3 className="font-bold text-xl mb-6 text-[#0857C3]">Grafik Perbandingan Skill</h3>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#0857C3', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#cbd5e1" />
                <Radar name="Skoring Terbaru" dataKey="A" stroke="#0857C3" fill="#0857C3" fillOpacity={0.4} strokeWidth={2} />
                <Radar name="Skoring Sebelumnya" dataKey="B" stroke="#307FE2" fill="#307FE2" fillOpacity={0.2} strokeWidth={2} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
                <Tooltip contentStyle={{borderRadius: '12px', border:'none', boxShadow:'0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Details */}
        <div className="space-y-6">
           <div className="bg-[#10B981]/5 rounded-2xl p-6 border border-[#10B981]/20">
             <h4 className="font-bold text-[#10B981] mb-4 flex items-center gap-2 text-lg">
               <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div> Kelebihan
             </h4>
             <ul className="space-y-4">
                {strengths.map((s, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[#0857C3]/80 font-medium line-clamp-1">{s.segment}</span>
                    <span className="font-black text-[#10B981]">{s.score}</span>
                  </li>
                ))}
             </ul>
           </div>

           <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
             <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-lg">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Kelemahan
             </h4>
             <ul className="space-y-4">
                {weaknesses.map((s, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[#0857C3]/80 font-medium line-clamp-1">{s.segment}</span>
                    <span className="font-black text-red-600">{s.score}</span>
                  </li>
                ))}
             </ul>
           </div>
        </div>
      </div>

      {/* Action Call */}
      <div className="bg-gradient-to-r from-[#0857C3] to-[#0645a0] rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-[#0857C3]/10">
        <div>
          <h3 className="text-2xl font-black mb-3 tracking-tight">Siap Naik Level?</h3>
          <p className="text-[#F5FAFF] max-w-xl text-lg leading-relaxed font-medium">
            Untuk mencapai level <strong>Berkembang</strong>, Anda membutuhkan skor minimal 3.21. 
            Tingkatkan kompetensi melalui modul pembelajaran kami.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="accent" onClick={() => navigate('modul-reguler')} className="shadow-[#307FE2]/20 px-8 py-4 text-base rounded-2xl bg-[#307FE2]">
             <BookOpen className="w-5 h-5 mr-2" /> Pelajari Modul
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent px-8 py-4 text-base rounded-2xl shadow-none">
             <RotateCcw className="w-5 h-5 mr-2" /> Skoring Ulang
          </Button>
        </div>
      </div>
      
      {/* History Table (Simplified) */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#71C5E8]/20 overflow-hidden">
        <div className="p-8 border-b border-[#F5FAFF]">
          <h3 className="font-bold text-xl text-[#0857C3]">Riwayat Skoring</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#0857C3]/70">
            <thead className="bg-[#F5FAFF]/50 text-[#0857C3] font-bold border-b border-[#71C5E8]/20 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-8 py-5">Tanggal</th>
                <th className="px-8 py-5">Nilai</th>
                <th className="px-8 py-5">Level UMKM</th>
                <th className="px-8 py-5">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F5FAFF] hover:bg-[#F0F9FF] transition-colors">
                <td className="px-8 py-5 font-medium">{data.date}</td>
                <td className="px-8 py-5 font-black text-[#0857C3]">{data.score}</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1.5 bg-[#F5FAFF] text-[#0857C3] rounded-lg text-xs font-bold border border-[#71C5E8]/30">{data.level}</span>
                </td>
                <td className="px-8 py-5 text-[#307FE2] font-bold cursor-pointer hover:underline">
                  Lihat Detail
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};