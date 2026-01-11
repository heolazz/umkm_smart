import { RegularModule } from './types';

export const MOCK_REGULAR_MODULES: RegularModule[] = [
  // --- KEPEMIMPINAN ---
  {
    id: '1',
    title: 'Membangun Kepercayaan dalam Pengembangan Usaha 02',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:27 WIB',
    rating: 4.9,
    reviewsCount: 17,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Dummy URL
    summary: 'Lanjutan strategi membangun integritas bisnis untuk hubungan jangka panjang dengan mitra dan pelanggan.',
    comments: []
  },
  {
    id: '2',
    title: 'Membangun Tim Kerja yang Solid dan Efektif',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'completed', // "Sudah dibaca"
    date: '09 Juli 2025 | 18:26 WIB',
    rating: 4.7,
    reviewsCount: 9,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: 'Teknik merekrut, melatih, dan mempertahankan talenta terbaik untuk operasional usaha yang efisien.',
    comments: []
  },
  {
    id: '3',
    title: 'Menyusun Rencana Usaha 03',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'locked', // Sequential logic (misal belum sampai sini)
    date: '09 Juli 2025 | 18:20 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '4',
    title: 'Menyusun Rencana Usaha 02',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'completed', // "Sudah dibaca"
    date: '09 Juli 2025 | 18:04 WIB',
    rating: 5.0,
    reviewsCount: 1,
    videoUrl: '',
    comments: []
  },
  {
    id: '5',
    title: 'Membangun Kepercayaan atau Trust dalam Pengembangan Usaha 01',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:04 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '6',
    title: 'Menyusun Rencana Usaha 01',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:02 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '7',
    title: 'Peta Persaingan dan keunikan 01',
    category: 'Kepemimpinan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 17:55 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },

  // --- BUDAYA INOVASI ---
  {
    id: '8',
    title: 'Menciptakan Produk Unggul 02',
    category: 'Budaya Inovasi',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:28 WIB',
    rating: 5.0,
    reviewsCount: 7,
    videoUrl: '',
    comments: []
  },
  {
    id: '9',
    title: 'Membangun Jaringan Untuk Inovasi',
    category: 'Budaya Inovasi',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 17:54 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '10',
    title: 'Menciptakan Produk Unggul 01',
    category: 'Budaya Inovasi',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 17:51 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },

  // --- MANAJEMEN KEUANGAN ---
  {
    id: '11',
    title: 'Dari Chat Jadi Cuan Optimalkan WhatsApp untuk Tingkatkan Penjualan UMKM',
    category: 'Manajemen Keuangan', // Sesuai data input, meski judulnya marketing
    level: 'Tradisional Utama',
    status: 'completed', // "Sudah dibaca"
    date: '26 November 2025 | 17:09 WIB',
    rating: 4.9,
    reviewsCount: 103,
    videoUrl: '',
    summary: 'Panduan teknis mengubah percakapan WhatsApp menjadi konversi penjualan real.',
    comments: []
  },
  {
    id: '12',
    title: 'Bangun Profil Usaha dan Reputasi Kredit Sebelum Ajukan Pembiayaan',
    category: 'Manajemen Keuangan',
    level: 'Tradisional Utama',
    status: 'unlocked',
    date: '20 November 2025 | 11:33 WIB',
    rating: 5.0,
    reviewsCount: 13,
    videoUrl: '',
    comments: []
  },
  {
    id: '13',
    title: 'Analisis Laporan Keuangan dan Pengambilan Keputusan',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'completed', // "Sudah dibaca"
    date: '09 Juli 2025 | 18:31 WIB',
    rating: 5.0,
    reviewsCount: 72,
    videoUrl: '',
    comments: []
  },
  {
    id: '14',
    title: 'Laporan Keuangan Lanjutan 02',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:30 WIB',
    rating: 4.9,
    reviewsCount: 40,
    videoUrl: '',
    comments: []
  },
  {
    id: '15',
    title: 'Laporan Keuangan Lanjutan 01',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:29 WIB',
    rating: 4.9,
    reviewsCount: 14,
    videoUrl: '',
    comments: []
  },
  {
    id: '16',
    title: 'Melakukan Pencatatan Keuangan 02',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:24 WIB',
    rating: 5.0,
    reviewsCount: 1,
    videoUrl: '',
    comments: []
  },
  {
    id: '17',
    title: 'Melakukan Pencatatan Keuangan 01',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:23 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '18',
    title: 'Laporan Keuangan Sederhana 02',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:17 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '19',
    title: 'Laporan Keuangan Sederhana 01',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 18:09 WIB',
    rating: 0.0,
    reviewsCount: 0,
    videoUrl: '',
    comments: []
  },
  {
    id: '20',
    title: 'Mengenal Manajemen Keuangan',
    category: 'Manajemen Keuangan',
    level: 'Tradisional',
    status: 'unlocked',
    date: '09 Juli 2025 | 17:55 WIB',
    rating: 5.0,
    reviewsCount: 1,
    videoUrl: '',
    comments: []
  }
];

// --- (Pastikan MOCK_THEMATIC_MODULES, MOCK_QUESTIONS, SEGMENTS dll tetap ada di file ini jika sebelumnya ada) ---
// ... sisa kode constants.ts Anda ...