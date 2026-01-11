import { Question, Segment, RegularModule, ThematicModule, ScoringResult } from './types';

export const SEGMENTS: Segment[] = [
  { id: 1, name: 'Skala Usaha', icon: 'scale' },
  { id: 2, name: 'Kepemimpinan', icon: 'users' },
  { id: 3, name: 'Budaya Inovasi', icon: 'lightbulb' },
  { id: 4, name: 'Manajemen Pemasaran', icon: 'megaphone' },
  { id: 5, name: 'Manajemen Operasional', icon: 'settings' },
  { id: 6, name: 'Manajemen Keuangan', icon: 'dollar-sign' },
  { id: 7, name: 'Manajemen SDM', icon: 'user-check' },
  { id: 8, name: 'Legalitas dan Kepatuhan', icon: 'file-text' },
  { id: 9, name: 'Kepedulian sosial & lingkungan', icon: 'heart' },
  { id: 10, name: 'Pemahaman Industri & Pasar', icon: 'globe' },
  { id: 11, name: 'Manajemen Rantai Pasok', icon: 'truck' },
];

export const MOCK_QUESTIONS: Question[] = [
  // I. Skala Usaha
  { 
    id: 101, 
    segmentId: 1, 
    text: 'Berapakah penjualan atau omzet usaha saudara saat ini?',
    type: 'single',
    options: [
      { label: 'Kurang dari Rp100 juta/tahun (setara < Rp300 ribu/hari atau < Rp8,3 juta/bulan)', value: 1 },
      { label: 'Antara Rp100 juta s.d Rp300 juta/tahun (setara Rp8,3 juta s.d Rp25 juta/bulan)', value: 2 },
      { label: 'Antara Rp300 juta s.d Rp1 Milyar/tahun (setara Rp25 juta s.d Rp83,3 juta/bulan)', value: 3 },
      { label: 'Antara Rp1 s.d. 2,5 Milyar/tahun', value: 4 },
      { label: 'Antara Rp2,5 s.d 4,8 Milyar/tahun', value: 5 },
      { label: 'Antara Rp4,8 Milyar s.d Rp50 Milyar/tahun', value: 6 },
      { label: 'Lebih dari Rp50 Milyar/tahun', value: 7 },
    ]
  },
  { 
    id: 102, 
    segmentId: 1, 
    text: 'Di luar tanah dan bangunan, berapakah nilai aset atau harta usaha saudara?',
    type: 'single',
    options: [
      { label: 'Di bawah atau sama dengan Rp10 juta', value: 1 },
      { label: 'Di atas Rp10 juta s.d Rp50 juta', value: 2 },
      { label: 'Di atas Rp50 juta s.d Rp500 juta', value: 3 },
      { label: 'Di atas Rp500 juta s.d Rp10 Milyar', value: 4 },
      { label: 'Lebih dari Rp50 Milyar', value: 5 },
    ]
  },
  { 
    id: 103, 
    segmentId: 1, 
    text: 'Jika termasuk diri saudara sendiri, berapa banyak tenaga kerja tetap di usaha saudara?',
    type: 'single',
    options: [
      { label: '1 Orang', value: 1 },
      { label: '2-4 orang', value: 2 },
      { label: '5-10 orang', value: 3 },
      { label: '11-19 orang', value: 4 },
      { label: '20-49 orang', value: 5 },
      { label: '50–99 orang', value: 6 },
      { label: '100 orang ke atas', value: 7 },
    ]
  },

  // II. Segmen Kepemimpinan
  { 
    id: 201, 
    segmentId: 2, 
    text: 'Saya menyiapkan dokumen rencana usaha tertulis dan sesi rapat khusus, untuk menyampaikan visi, arah, dan target yang ingin dicapai kepada seluruh karyawan.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 202, 
    segmentId: 2, 
    text: 'Saya sudah memiliki tim atau karyawan manajerial yang membantu saya menyusun target, strategi untuk mencapainya, dan membantu saya memastikan seluruh karyawan memahami target-target tersebut.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 203, 
    segmentId: 2, 
    text: 'Saya menyediakan kesempatan bagi karyawan untuk memberikan masukan terhadap rencana atau target usaha, baik secara tertulis maupun sesi diskusi yang diagendakan secara khusus dimana karyawan bebas menyampaikan masukannya.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },

  // III. Segmen Budaya Inovasi
  { 
    id: 301, 
    segmentId: 3, 
    text: 'Kepuasan konsumen dan pelanggan sangat penting untuk kelanggengan usaha saya, sehingga minimal 1 kali per tahun, saya mengadakan kegiatan khusus untuk mengumpulkan masukan konsumen (review produk, wawancara, atau survei).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 302, 
    segmentId: 3, 
    text: 'Untuk membantu mengambil keputusan strategis, minimal setahun sekali saya memonitor data tren pasar terbaru dan evaluasi perubahan selera konsumen (memantau tren e-commerce, laporan tren, atau bertanya langsung).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Tidak', value: 1 },
    ]
  },

  // IV. Manajemen Pemasaran
  { 
    id: 401, 
    segmentId: 4, 
    text: 'Saat ini bisnis saya sudah menjangkau konsumen dari berbagai provinsi di Indonesia, bahkan sudah juga menjangkau konsumen luar negeri.',
    type: 'single',
    options: [
      { label: 'Tidak, masih di satu provinsi yang sama', value: 1 },
      { label: 'Ya, lintas provinsi tapi masih nasional', value: 2 },
      { label: 'Ya, lintas provinsi dan pasar global', value: 3 },
    ]
  },
  { 
    id: 402, 
    segmentId: 4, 
    text: 'Di era digital ini, saya melakukan pemasaran online untuk memperluas pasar dan memudahkan transaksi: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Menggunakan media sosial (Facebook, Twitter, Instagram, dll)', value: 'medsos' },
      { label: 'Menggunakan platform e-commerce (Bukalapak, Tokopedia, Go-food, website sendiri, dll)', value: 'ecommerce' },
      { label: 'Menggunakan pembayaran elektronik/digital selain transfer ATM (Mobile banking, GoPAY, OVO, LinkAja, DANA, dll)', value: 'payment' },
      { label: 'Belum melakukan upaya khusus apa pun', value: 'none' },
    ]
  },
  { 
    id: 403, 
    segmentId: 4, 
    text: 'Untuk memperkuat pemasaran, saya menyiapkan ragam perlengkapan pemasaran (kop surat, kartu nama, brosur, katalog produk, company profile).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Belum menyiapkan sama sekali', value: 1 },
    ]
  },
  { 
    id: 404, 
    segmentId: 4, 
    text: 'Untuk memperluas jaringan usaha, saya aktif merancang paket harga khusus/komisi untuk kemitraan (reseller, distributor, dropshipper, agen, afiliator, atau waralaba).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 405, 
    segmentId: 4, 
    text: 'Saya selalu menetapkan target penjualan yang meningkat setiap tahun dan mengalokasikan anggaran untuk promosi (iklan, cetak brosur, komisi, hadiah).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Tidak', value: 1 },
    ]
  },

  // V. Manajemen Operasional
  { 
    id: 501, 
    segmentId: 5, 
    text: 'Untuk memastikan proses produksi/pelayanan berjalan baik dan sesuai standar kualitas, saya melakukan hal berikut: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Membuat prosedur tertulis untuk proses produksi dan kegiatan langsung dengan konsumen', value: 'sop' },
      { label: 'Melakukan pemeriksaan rutin mengenai prosedur yang dilaksanakan', value: 'audit' },
      { label: 'Adanya sertifikasi mutu seperti SNI, Halal, dll', value: 'sertifikasi' },
      { label: 'Belum melakukan apapun', value: 'none' },
    ]
  },

  // VI. Manajemen Keuangan
  { 
    id: 601, 
    segmentId: 6, 
    text: 'Saya sudah memiliki rekening untuk transaksi usaha yang terpisah dengan rekening untuk keperluan pribadi (rumah tangga).',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 602, 
    segmentId: 6, 
    text: 'Usaha saya telah memiliki Laporan Keuangan lengkap (Laba Rugi, Neraca, Arus Kas) yang disusun minimal 1 kali per tahun sebagai dasar evaluasi.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, Sebagian', value: 2 },
      { label: 'Tidak', value: 1 },
    ]
  },

  // VII. Manajemen SDM
  { 
    id: 701, 
    segmentId: 7, 
    text: 'Bisnis saya sudah memiliki tim dengan peran dan pembagian tugas yang jelas, tertulis, dan dituangkan dalam dokumen struktur organisasi.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 702, 
    segmentId: 7, 
    text: 'Setiap tahun saya pro-aktif menyusun rencana dan melakukan pelatihan bagi diri saya, karyawan, dan mitra bisnis.',
    type: 'single',
    options: [
      { label: 'Ya, pelatihan tahunan untuk saya, tim, dan mitra', value: 3 },
      { label: 'Ya, tapi baru sebagian (misalnya untuk diri saya sendiri dulu)', value: 2 },
      { label: 'Tidak, belum secara khusus merencanakan pelatihan setiap tahunnya', value: 1 },
    ]
  },
  { 
    id: 703, 
    segmentId: 7, 
    text: 'Perusahaan sudah memiliki skema bonus untuk tim atau karyawan, yang berbasis capaian kinerja dengan indikator yang jelas.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },
  { 
    id: 704, 
    segmentId: 7, 
    text: 'Usaha saya sudah memiliki program orientasi, pelatihan, atau sistem pembinaan karyawan baru.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Tidak', value: 1 },
    ]
  },

  // VIII. Legalitas dan Kepatuhan
  { 
    id: 801, 
    segmentId: 8, 
    text: 'Usaha saya sudah memiliki legalitas berikut: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Nomor Induk Berusaha (NIB) dari OSS Republik Indonesia', value: 'nib' },
      { label: 'Badan Usaha formal seperti CV, PT, atau Koperasi', value: 'badan_usaha' },
      { label: 'Izin operasional atau Sertifikasi resmi yang sesuai (Halal, BPOM, Organik, SNI, dll)', value: 'izin' },
      { label: 'Belum memiliki dokumen legalitas apa pun', value: 'none' },
    ]
  },
  { 
    id: 802, 
    segmentId: 8, 
    text: 'Saya telah melakukan upaya pemenuhan kewajiban berikut: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'NPWP atas nama badan usaha', value: 'npwp' },
      { label: 'BPJS Kesehatan untuk karyawan', value: 'bpjs_kes' },
      { label: 'BPJS Ketenagakerjaan untuk karyawan', value: 'bpjs_tk' },
      { label: 'Memiliki Prosedur Keselamatan Kerja tertulis dan menjalankannya', value: 'k3' },
      { label: 'Belum menjalankan apapun', value: 'none' },
    ]
  },

  // IX. Kepedulian Sosial dan Lingkungan
  { 
    id: 901, 
    segmentId: 9, 
    text: 'Usaha saya telah melakukan langkah tanggung jawab dan peduli lingkungan/sosial, diantaranya: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Memastikan agar karyawan tetap digaji sesuai peraturan Upah Minimum setempat', value: 'umr' },
      { label: 'Memiliki prosedur khusus untuk menghemat penggunaan air dan listrik', value: 'hemat' },
      { label: 'Memiliki target pengurangan limbah (plastik, organik, kertas, dll)', value: 'limbah' },
      { label: 'Memiliki program pengolahan kembali limbah bisnis (sendiri atau bermitra)', value: 'recycle' },
      { label: 'Memberi program bantuan sosial tahunan untuk kelompok masyarakat tertentu', value: 'bansos' },
      { label: 'Memiliki program pelatihan untuk meningkatkan keterampilan masyarakat sekitar', value: 'csr' },
      { label: 'Belum melakukan upaya tertentu', value: 'none' },
    ]
  },

  // X. Pemahaman Industri & Pasar
  { 
    id: 1001, 
    segmentId: 10, 
    text: 'Saya selalu memantau perkembangan kompetitor (produk/layanan mereka dan diferensiasi produk saya).',
    type: 'single',
    options: [
      { label: 'Ya, saya lakukan semuanya', value: 3 },
      { label: 'Ya, tapi baru sebagian', value: 2 },
      { label: 'Belum melakukan pemetaan persaingan sama sekali', value: 1 },
    ]
  },
  { 
    id: 1002, 
    segmentId: 10, 
    text: 'Saya memantau keunggulan dan kelemahan produk sejenis di pasaran, dengan cara: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Tahu nama-nama atau merek produk sejenis yang ada di pasaran', value: 'know_brand' },
      { label: 'Melakukan perbandingan (harga, kualitas, distribusi, kemasan, dll)', value: 'compare' },
      { label: 'Tahu persis lokasi atau segmen pasar yang masih bisa saya masuki (Blue Ocean)', value: 'blue_ocean' },
      { label: 'Belum melakukan upaya khusus apa pun', value: 'none' },
    ]
  },

  // XI. Manajemen Rantai Pasok
  { 
    id: 1101, 
    segmentId: 11, 
    text: 'Usaha saya memiliki prosedur pencatatan persediaan bahan baku/alat secara berkala, memiliki lebih dari satu supplier, dan kontrak pengadaan.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, tapi baru sebagian', value: 2 },
      { label: 'Belum ada prosedur khusus sama sekali', value: 1 },
    ]
  },
  { 
    id: 1102, 
    segmentId: 11, 
    text: 'Usaha saya memiliki prosedur inventarisasi aset dan tim khusus yang memonitor perawatan, perbaikan, atau pembelian alat baru.',
    type: 'single',
    options: [
      { label: 'Ya', value: 3 },
      { label: 'Ya, tapi baru sebagian', value: 2 },
      { label: 'Belum ada prosedur atau tim khusus sama sekali', value: 1 },
    ]
  },
  { 
    id: 1103, 
    segmentId: 11, 
    text: 'Saya sudah membangun pondasi cadangan kas dan relasi pendanaan: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Saldo cadangan kas usaha saat ini > total biaya operasional untuk 6 bulan', value: 'cash' },
      { label: 'Ada teman/saudara yang bersedia mendukung dana talangan', value: 'family' },
      { label: 'Sudah ada rekam jejak positif/relasi baik di Bank', value: 'bank' },
      { label: 'Sudah ada rekam jejak positif/relasi baik di Lembaga Keuangan Non-Bank', value: 'non_bank' },
      { label: 'Tabungan pribadi siaga mendukung dana talangan/pengembangan', value: 'savings' },
      { label: 'Belum memiliki pondasi atau relasi apapun', value: 'none' },
    ]
  },
  { 
    id: 1104, 
    segmentId: 11, 
    text: 'Usaha saya didukung dengan fasilitas atau peralatan IT berikut: (Anda bisa memilih lebih dari 1 jawaban)',
    type: 'multiple',
    options: [
      { label: 'Akses internet yang handal (24 jam)', value: 'internet' },
      { label: 'HP pintar khusus untuk bisnis', value: 'smartphone' },
      { label: 'Laptop/Komputer kerja', value: 'pc' },
      { label: 'Tablet kerja', value: 'tablet' },
      { label: 'Belum memiliki semua hal di atas', value: 'none' },
    ]
  },
];

export const MOCK_REGULAR_MODULES: RegularModule[] = [
  // Level: Tradisional
  { 
    id: '1', 
    title: 'Kepemimpinan Dasar', 
    level: 'Tradisional', 
    category: 'Kepemimpinan', 
    status: 'completed', 
    progress: 100, 
    type: 'lesson',
    summary: 'Modul ini membahas dasar-dasar kepemimpinan bagi pemilik UMKM, termasuk cara menyusun visi misi dan mendelegasikan tugas sederhana.',
    pdfUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4', // Dummy
    rating: 4.8,
    reviewsCount: 124,
    comments: [
      { id: 'c1', user: 'Budi Santoso', avatar: 'BS', date: '2 hari lalu', text: 'Sangat membantu untuk pemula seperti saya. Videonya jelas!', rating: 5 },
      { id: 'c2', user: 'Siti Aminah', avatar: 'SA', date: '1 minggu lalu', text: 'Penjelasannya runut, tapi audionya agak kecil.', rating: 4 }
    ]
  },
  { 
    id: '2', 
    title: 'Pencatatan Keuangan Sederhana', 
    level: 'Tradisional', 
    category: 'Manajemen Keuangan', 
    status: 'unlocked', // CHANGED TO UNLOCKED AS REQUESTED
    progress: 0, 
    type: 'lesson',
    summary: 'Pelajari cara memisahkan uang pribadi dan usaha, serta teknik mencatat pemasukan dan pengeluaran harian di buku kas.',
    pdfUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8',
    rating: 4.9,
    reviewsCount: 89,
    comments: [
        { id: 'c3', user: 'Rahmat Hidayat', avatar: 'RH', date: '3 hari lalu', text: 'Akhirnya paham bedanya omzet dan profit bersih.', rating: 5 }
    ]
  },
  {
    id: 'pt-1',
    title: 'Post Test: Level Tradisional',
    level: 'Tradisional',
    category: 'Evaluasi',
    status: 'locked', // Keep locked until module 2 is done (in logic)
    progress: 0,
    type: 'post-test',
    rating: 0, reviewsCount: 0, comments: []
  },
  
  // Level: Tradisional Utama
  { 
    id: '3', 
    title: 'Pemasaran Digital Dasar', 
    level: 'Tradisional Utama', 
    category: 'Manajemen Pemasaran', 
    status: 'locked', 
    progress: 0, 
    type: 'lesson',
    summary: 'Pengenalan media sosial untuk bisnis. Cara membuat akun bisnis di Instagram dan Facebook serta teknik fotografi produk sederhana.',
    pdfUrl: '#',
    rating: 0, reviewsCount: 0, comments: []
  },
  { 
    id: '4', 
    title: 'Manajemen Operasional Efektif', 
    level: 'Tradisional Utama', 
    category: 'Manajemen Operasional', 
    status: 'locked', 
    progress: 0, 
    type: 'lesson',
    summary: 'Pentingnya Standar Operasional Prosedur (SOP) untuk menjaga kualitas produk tetap konsisten.',
    pdfUrl: '#',
    rating: 0, reviewsCount: 0, comments: []
  },
  {
    id: 'pt-2',
    title: 'Post Test: Level Tradisional Utama',
    level: 'Tradisional Utama',
    category: 'Evaluasi',
    status: 'locked',
    progress: 0,
    type: 'post-test',
    rating: 0, reviewsCount: 0, comments: []
  },

  // Level: Tradisional Teladan
  { 
    id: '5', 
    title: 'Strategi Branding', 
    level: 'Tradisional Teladan', 
    category: 'Manajemen Pemasaran', 
    status: 'locked', 
    progress: 0, 
    type: 'lesson',
    summary: 'Membangun identitas merek yang kuat melalui logo, warna, dan gaya komunikasi yang konsisten.',
    pdfUrl: '#',
    rating: 0, reviewsCount: 0, comments: []
  },
  {
    id: 'pt-3',
    title: 'Post Test: Level Tradisional Teladan',
    level: 'Tradisional Teladan',
    category: 'Evaluasi',
    status: 'locked',
    progress: 0,
    type: 'post-test',
    rating: 0, reviewsCount: 0, comments: []
  },
  
  // Level: Berkembang
  { 
    id: '6', 
    title: 'Analisis Laporan Keuangan', 
    level: 'Berkembang', 
    category: 'Manajemen Keuangan', 
    status: 'locked', 
    progress: 0, 
    type: 'lesson',
    summary: 'Cara membaca neraca dan laporan laba rugi untuk mengambil keputusan strategis bisnis.',
    pdfUrl: '#',
    rating: 0, reviewsCount: 0, comments: []
  },
];

export const MOCK_THEMATIC_MODULES: ThematicModule[] = [
  { 
    id: '1', 
    title: 'Best Management Practices pada TBM dan TM Kelapa Sawit', 
    category: 'Pertanian', 
    date: '19 November 2025 | 14:50 WIB', 
    rating: 5.0, 
    reviews: 2, 
    imageUrl: 'https://picsum.photos/400/200?random=1',
    summary: 'Pelajari praktik terbaik pengelolaan perkebunan kelapa sawit mulai dari Tanaman Belum Menghasilkan (TBM) hingga Tanaman Menghasilkan (TM) untuk produktivitas maksimal.',
    comments: [
      { id: 't1', user: 'Pak Tani Maju', avatar: 'TM', date: '3 hari lalu', text: 'Materi sangat daging! Sangat berguna untuk kami petani sawit.', rating: 5 },
      { id: 't2', user: 'Agro Lestari', avatar: 'AL', date: '1 minggu lalu', text: 'Penjelasannya teknis tapi mudah dipahami.', rating: 5 }
    ]
  },
  { 
    id: '2', 
    title: 'Bahan Tanaman Kelapa Sawit Unggul', 
    category: 'Pertanian', 
    date: '19 November 2025 | 14:48 WIB', 
    rating: 0.0, 
    reviews: 0, 
    imageUrl: 'https://picsum.photos/400/200?random=2',
    summary: 'Panduan memilih bibit kelapa sawit unggul bersertifikat untuk menjamin hasil panen jangka panjang dan ketahanan terhadap hama.',
    comments: []
  },
  { 
    id: '3', 
    title: 'Analisa Titik Kritis dan Manajemen Risiko Agribisnis Padi', 
    category: 'Pertanian', 
    date: '19 November 2025 | 14:46 WIB', 
    rating: 0.0, 
    reviews: 0, 
    imageUrl: 'https://picsum.photos/400/200?random=3',
    summary: 'Identifikasi titik kritis dalam budidaya padi dan strategi mitigasi risiko gagal panen akibat cuaca maupun serangan hama.',
    comments: []
  },
  { 
    id: '4', 
    title: 'Analisis Biaya Usahatani', 
    category: 'Pertanian', 
    date: '19 November 2025 | 14:43 WIB', 
    rating: 4.5, 
    reviews: 1, 
    imageUrl: 'https://picsum.photos/400/200?random=4',
    summary: 'Cara menghitung Harga Pokok Produksi (HPP) usahatani agar petani dapat menentukan harga jual yang menguntungkan dan efisien.',
    comments: [
        { id: 't3', user: 'Ibu Sri Rejeki', avatar: 'SR', date: 'Kemarin', text: 'Sangat membantu menghitung HPP yang benar.', rating: 5 }
    ]
  },
  { 
    id: '5', 
    title: 'SNI Kopi dan Prosedur Sertifikasi SNI', 
    category: 'Pertanian', 
    date: '19 November 2025 | 11:36 WIB', 
    rating: 5.0, 
    reviews: 4, 
    imageUrl: 'https://picsum.photos/400/200?random=5',
    summary: 'Pahami standar mutu biji kopi Indonesia (SNI) dan langkah-langkah administratif untuk mendapatkan sertifikasi agar produk dapat masuk pasar ekspor.',
    comments: [
        { id: 't4', user: 'Kopi Nusantara', avatar: 'KN', date: '2 minggu lalu', text: 'Terima kasih informasinya, sangat jelas.', rating: 5 }
    ]
  },
];

export const MOCK_LAST_SCORE: ScoringResult = {
  date: '1 Desember 2025',
  score: 2.73,
  level: 'Tradisional Teladan',
  details: [
    { segment: 'Skala Usaha', score: 0.33, prevScore: 0 },
    { segment: 'Pemahaman Industri & Pasar', score: 4.17, prevScore: 2.0 },
    { segment: 'Manajemen Rantai Pasok', score: 1.87, prevScore: 1.0 },
    { segment: 'Kepemimpinan', score: 6.67, prevScore: 4.0 },
    { segment: 'Budaya Inovasi', score: 2.5, prevScore: 1.5 },
    { segment: 'Manajemen Pemasaran', score: 3.33, prevScore: 2.0 },
    { segment: 'Manajemen Operasional', score: 0, prevScore: 0 },
    { segment: 'Manajemen Keuangan', score: 7.5, prevScore: 5.0 },
    { segment: 'Manajemen SDM', score: 1.25, prevScore: 0.5 },
    { segment: 'Legalitas dan Kepatuhan', score: 2.5, prevScore: 1.0 },
    { segment: 'Kepedulian sosial dan lingkungan', score: 0, prevScore: 0 },
  ]
};