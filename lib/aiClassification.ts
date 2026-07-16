import { CATEGORIES, type PhotoCategory } from "@/lib/types";

export type ClassificationResult = {
  category: PhotoCategory;
  tags: string[];
  source: "openai" | "fallback";
};

export function normalizeCategory(input: unknown): PhotoCategory {
  return CATEGORIES.includes(input as PhotoCategory) ? (input as PhotoCategory) : "기타";
}

export function fallbackClassification(): ClassificationResult {
  return { category: "기타", tags: [], source: "fallback" };
}
