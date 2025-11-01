// Polymarket API Types

export interface Market {
  id: string;
  question: string;
  slug: string;
  description: string;
  category: string;
  endDate: string;
  endDateIso: string;
  outcomes: string;
  outcomePrices: string;
  volume: string;
  volumeNum: number;
  liquidity: string;
  liquidityNum: number;
  active: boolean;
  closed: boolean;
  archived: boolean;
  image?: string;
  icon?: string;
  volume24hr: number;
  volume1wk: number;
  volume1mo: number;
  spread?: number;
  lastTradePrice?: number;
  oneDayPriceChange?: number;
  oneHourPriceChange?: number;
  oneWeekPriceChange?: number;
}

export interface Token {
  token_id: string;
  outcome: string;
  price: number;
  winner?: boolean;
}

export interface CLOBMarket {
  condition_id: string;
  question_id: string;
  question: string;
  description: string;
  market_slug: string;
  end_date_iso: string;
  game_start_time?: string;
  tokens: Token[];
  image?: string;
  icon?: string;
  active: boolean;
  closed: boolean;
  archived: boolean;
  tags?: string[];
  volume?: string;
  liquidity?: string;
}

export interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

export interface MarketStats {
  totalVolume: number;
  totalMarkets: number;
  activeMarkets: number;
  topCategories: Array<{
    category: string;
    count: number;
    volume: number;
  }>;
}

export type SortOption = 'volume' | 'volume24hr' | 'newest' | 'ending-soon';
export type ViewMode = 'grid' | 'list';
