export const CATEGORIES = ["음식", "자연", "동물", "도시", "사람", "기타"] as const;

export type PhotoCategory = (typeof CATEGORIES)[number];

export type Country = {
  id: string;
  code: string;
  iso2: string;
  nameKo: string;
  nameEn: string;
  summary: string;
};

export type Memory = {
  id: string;
  countryId: string;
  title?: string;
  description?: string;
  date?: string;
  note?: string;
  tags?: string;
  category: PhotoCategory;
  imageUrl: string;
  imageKey?: string;
  source: "seed" | "local";
  isRepresentative?: boolean;
  createdAt: number;
};

export type MemoryDraft = {
  title: string;
  description: string;
  date: string;
  note: string;
  tags: string;
  category: PhotoCategory;
};
