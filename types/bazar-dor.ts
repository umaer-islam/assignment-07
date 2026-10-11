export type PriceChangeDirection = "up" | "down" | "flat";

export interface PriceChange {
  dir: PriceChangeDirection;
  pct: number;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn?: string;
  name?: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  emoji?: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: PriceChange;
  markets: MarketPrice[];

  description?: string;
}

export interface Category {
  id: string;
  slug: string;
  nameBn?: string;
  name?: string;
  icon?: string;
  description?: string;
}
