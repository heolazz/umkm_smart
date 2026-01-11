export type Segment = {
  id: number;
  name: string;
  icon: string;
};

export type QuestionOption = {
  label: string;
  value: string | number | boolean;
};

export type Question = {
  id: number;
  segmentId: number;
  text: string;
  type: 'single' | 'multiple'; 
  options: QuestionOption[];
};

export type UMKMLevel = 
  | 'Tradisional' 
  | 'Tradisional Utama' 
  | 'Tradisional Teladan' 
  | 'Berkembang' 
  | 'Berkembang Utama' 
  | 'Berkembang Teladan' 
  | 'Modern' 
  | 'Modern Utama' 
  | 'Modern Teladan';

export type ScoringResult = {
  date: string;
  score: number;
  level: UMKMLevel;
  details: { segment: string; score: number; prevScore?: number }[];
};

export type ModuleStatus = 'locked' | 'unlocked' | 'completed';
export type ModuleType = 'lesson' | 'post-test';

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  date: string;
  text: string;
  rating: number;
}

// Update Interface RegularModule
export interface RegularModule {
  id: string;
  title: string;
  category: 'Kepemimpinan' | 'Budaya Inovasi' | 'Manajemen Keuangan' | 'Manajemen Pemasaran' | 'Manajemen Operasional' | 'Evaluasi' | string;
  level: string;
  status: ModuleStatus;
  type?: ModuleType;
  videoUrl?: string;
  pdfUrl?: string; // Optional jika ada
  summary?: string;
  progress?: number; // Optional untuk tracking
  
  // Field Baru untuk Katalog
  date: string;       
  rating: number;     
  reviewsCount: number; 
  comments: Comment[];
}

export type ThematicModule = {
  id: string;
  title: string;
  category: string;
  date: string;
  rating: number;
  reviews: number;
  imageUrl?: string;
  summary: string;
  comments: Comment[];
};