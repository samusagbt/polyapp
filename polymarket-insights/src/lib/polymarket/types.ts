export interface RawPolymarketMarket {
  id: string;
  question: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  outcomes?: string[] | string | null;
  outcomePrices?: number[] | string | null;
  lastTradePrice?: number | string | null;
  bestBid?: number | string | null;
  bestAsk?: number | string | null;
  volume?: number | string | null;
  volume24hr?: number | string | null;
  volume1wk?: number | string | null;
  volume1mo?: number | string | null;
  liquidity?: number | string | null;
  liquidityNum?: number | string | null;
  startDate?: string | null;
  endDate?: string | null;
  oneDayPriceChange?: number | string | null;
  oneHourPriceChange?: number | string | null;
  oneWeekPriceChange?: number | string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: unknown;
}

export interface MarketOutcome {
  label: string;
  price: number;
}

export interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  description: string;
  category: string;
  startDate?: Date;
  endDate?: Date;
  liquidity: number;
  volume24h: number;
  volumeTotal: number;
  lastTradePrice?: number;
  bestBid?: number;
  bestAsk?: number;
  outcomes: MarketOutcome[];
  yesProbability: number;
  yesOutcome: MarketOutcome | null;
  topOutcome: MarketOutcome | null;
  change1h: number;
  change24h: number;
  change7d: number;
  updatedAt?: Date;
}

export interface CategoryInsight {
  category: string;
  totalMarkets: number;
  avgYesProbability: number;
  totalVolume24h: number;
  positivityRatio: number;
}

export interface MarketHighlight {
  market: PolymarketMarket;
  headline: string;
  description: string;
}

export interface DashboardInsights {
  fetchedAt: Date;
  totalMarkets: number;
  positiveMarketShare: number;
  averageYesProbability: number;
  totalVolume24h: number;
  medianLiquidity: number;
  highlights: {
    highConfidence: MarketHighlight[];
    gainingMomentum: MarketHighlight[];
    steadyBuilders: MarketHighlight[];
  };
  categoryInsights: CategoryInsight[];
  encouragingSignals: string[];
}
