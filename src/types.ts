export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: 'portrait' | 'gym' | 'cat' | 'runner' | 'finisher';
  rotation: number;
}

export interface CafeItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  icon: string;
  recommendedReason: string;
  color: string;
}

export interface ChapterNav {
  id: string;
  time: string;
  title: string;
}
