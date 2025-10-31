import type {
  CategoryInsight,
  DashboardInsights,
  MarketHighlight,
  MarketOutcome,
  PolymarketMarket,
  RawPolymarketMarket,
} from "@/lib/polymarket/types";

function pickYesOutcome(outcomes: string[], prices: number[]): {
  yesProbability: number;
  yesOutcome: MarketOutcome | null;
} {
  if (!Array.isArray(outcomes) || outcomes.length === 0) {
    return { yesProbability: 0, yesOutcome: null };
  }

  const yesIndex = outcomes.findIndex((label) =>
    label.toLowerCase().includes("yes"),
  );

  const index = yesIndex >= 0 ? yesIndex : 0;
  const price = prices[index] ?? 0;

  return {
    yesProbability: price,
    yesOutcome: {
      label: outcomes[index] ?? "",
      price,
    },
  };
}

function deriveTopOutcome(outcomes: string[], prices: number[]): MarketOutcome | null {
  if (!Array.isArray(outcomes) || outcomes.length === 0) return null;

  const entries = outcomes.map((label, index) => ({
    label,
    price: prices[index] ?? 0,
  }));

  return entries.reduce<MarketOutcome | null>((current, entry) => {
    if (!current || entry.price > current.price) return entry;
    return current;
  }, null);
}

function encodePathSegment(segment: string | undefined | null): string | undefined {
  if (!segment) return undefined;
  return segment
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
}

function toMarket(raw: RawPolymarketMarket): PolymarketMarket {
  const toDate = (value?: string | null) =>
    value ? new Date(value) : undefined;
  const outcomes = raw.outcomes ?? [];
  const prices = raw.outcomePrices ?? [];
  const { yesOutcome, yesProbability } = pickYesOutcome(outcomes, prices);
  const eventRestricted = Array.isArray(raw.events)
    ? raw.events.every((event) => Boolean(event?.restricted))
    : false;
  const primaryAvailableEvent = Array.isArray(raw.events)
    ? raw.events.find((event) => !event?.restricted) ?? raw.events[0]
    : undefined;
  const primaryEvent = primaryAvailableEvent ?? null;
  const eventSlug = primaryEvent?.slug ?? undefined;
  const category = raw.category ?? primaryEvent?.category ?? "Uncategorized";
  const restricted = Boolean(raw.restricted) || eventRestricted;
  const encodedEventSlug = encodePathSegment(eventSlug);
  const encodedMarketSlug = encodePathSegment(raw.slug) ?? "";
  const url = encodedEventSlug
    ? `https://polymarket.com/event/${encodedEventSlug}`
    : `https://polymarket.com/market/${encodedMarketSlug}`;

  return {
    id: raw.id,
    question: raw.question,
    slug: raw.slug,
    description: raw.description ?? "",
    category,
    eventSlug,
    eventTitle: primaryEvent?.title ?? undefined,
    url,
    restricted,
    startDate: toDate(raw.startDate ?? undefined),
    endDate: toDate(raw.endDate ?? undefined),
    liquidity: Number(raw.liquidityNum ?? raw.liquidity ?? 0),
    volume24h: Number(raw.volume24hr ?? 0),
    volumeTotal: Number(raw.volume ?? 0),
    lastTradePrice:
      raw.lastTradePrice !== undefined ? Number(raw.lastTradePrice) : undefined,
    bestBid: raw.bestBid !== undefined ? Number(raw.bestBid) : undefined,
    bestAsk: raw.bestAsk !== undefined ? Number(raw.bestAsk) : undefined,
    outcomes: outcomes.map((label, index) => ({
      label,
      price: prices[index] ?? 0,
    })),
    yesProbability,
    yesOutcome,
    topOutcome: deriveTopOutcome(outcomes, prices),
    change1h: Number(raw.oneHourPriceChange ?? 0),
    change24h: Number(raw.oneDayPriceChange ?? 0),
    change7d: Number(raw.oneWeekPriceChange ?? 0),
    createdAt: toDate(raw.createdAt ?? undefined),
    updatedAt: toDate(raw.updatedAt ?? undefined),
  };
}

function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function formatHighlight(
  market: PolymarketMarket,
  context: "confidence" | "momentum" | "builder",
): MarketHighlight {
  const probability = Math.round(market.yesProbability * 1000) / 10;

  switch (context) {
    case "confidence":
      return {
        market,
        headline: `${probability}% confidence in "${market.question}"`,
        description:
          "Participants are strongly aligned on this outcome today, signalling a reassuring consensus.",
      };
    case "momentum":
      return {
        market,
        headline: `Positive shift: ${market.change24h.toFixed(2)} change over 24h`,
        description:
          "Fresh optimism is flowing into this market with recent momentum supporting a positive narrative.",
      };
    case "builder":
      return {
        market,
        headline: `Steady interest with ${(market.volume24h / 1000).toFixed(1)}k 24h volume`,
        description:
          "A resilient community continues to add liquidity, pointing toward durable confidence.",
      };
  }
}

function aggregateCategories(markets: PolymarketMarket[]): CategoryInsight[] {
  const stats = new Map<string, { total: number; yesWeight: number; volume: number }>();

  for (const market of markets) {
    const key = market.category || "Uncategorized";
    const current = stats.get(key) ?? { total: 0, yesWeight: 0, volume: 0 };

    current.total += 1;
    current.volume += market.volume24h;
    current.yesWeight += market.yesProbability >= 0.5 ? 1 : 0;

    stats.set(key, current);
  }

  return Array.from(stats.entries())
    .map<CategoryInsight>(([category, data]) => ({
      category,
      totalMarkets: data.total,
      avgYesProbability:
        markets
          .filter((market) => market.category === category)
          .reduce((sum, item) => sum + item.yesProbability, 0) / data.total,
      totalVolume24h: data.volume,
      positivityRatio: data.total > 0 ? data.yesWeight / data.total : 0,
    }))
    .sort((a, b) => b.totalVolume24h - a.totalVolume24h);
}

function buildEncouragingSignals(markets: PolymarketMarket[]): string[] {
  const total = markets.length || 1;
  const confident = markets.filter((m) => m.yesProbability >= 0.6);
  const trending = markets
    .filter((m) => m.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h);
  const liquid = markets.filter((m) => m.liquidity >= 5000);

  const signals: string[] = [];

  signals.push(
    `${Math.round((confident.length / total) * 100)}% of tracked markets show a clear positive consensus today.`,
  );

  if (trending.length > 0) {
    signals.push(
      `Fresh positive momentum detected in "${trending[0].question}" with a ${trending[0].change24h.toFixed(2)} probability lift over the last 24h.`,
    );
  }

  if (liquid.length > 0) {
    signals.push(
      `${liquid.length} markets have more than $5k in active liquidity, highlighting durable community engagement.`,
    );
  }

  return signals.slice(0, 3);
}

export function buildDashboardInsights(rawMarkets: RawPolymarketMarket[]): DashboardInsights {
  const normalizedMarkets = rawMarkets
    .map(toMarket)
    .filter((market) => market.outcomes.length >= 1);

  const accessibleMarkets = normalizedMarkets.filter((market) => !market.restricted);
  const dataset = accessibleMarkets.length > 0 ? accessibleMarkets : normalizedMarkets;
  const totalMarkets = dataset.length;
  const totalFetched = normalizedMarkets.length;
  const accessibleMarketCount = accessibleMarkets.length;
  const restrictedMarketCount = totalFetched - accessibleMarketCount;
  const positiveMarkets = dataset.filter((market) => market.yesProbability >= 0.5);
  const averageYesProbability =
    dataset.reduce((sum, market) => sum + market.yesProbability, 0) /
    (totalMarkets || 1);

  const totalVolume24h = dataset.reduce((sum, market) => sum + market.volume24h, 0);
  const medianLiquidity = computeMedian(dataset.map((market) => market.liquidity));

  const highConfidence = positiveMarkets
    .filter((market) => market.yesProbability >= 0.65)
    .sort((a, b) => b.yesProbability - a.yesProbability)
    .slice(0, 6)
    .map((market) => formatHighlight(market, "confidence"));

  const gainingMomentum = dataset
    .filter((market) => market.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 6)
    .map((market) => formatHighlight(market, "momentum"));

  const steadyBuilders = dataset
    .filter((market) => market.volume24h > 0 && market.yesProbability >= 0.45)
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 6)
    .map((market) => formatHighlight(market, "builder"));

  const liquidityLeaders = dataset
    .filter((market) => market.liquidity > 0)
    .sort((a, b) => b.liquidity - a.liquidity)
    .slice(0, 6);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const freshOpportunities = dataset
    .filter((market) => market.createdAt && market.createdAt > twoWeeksAgo)
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
    .slice(0, 6);

  const upwardWatchlist = dataset
    .filter((market) => market.change24h > 0 || market.change7d > 0)
    .sort((a, b) => b.change7d - a.change7d)
    .slice(0, 6);

  return {
    fetchedAt: new Date(),
    totalMarkets,
    totalFetched,
    accessibleMarketCount,
    restrictedMarketCount,
    usedRestrictedFallback: accessibleMarketCount === 0 && restrictedMarketCount > 0,
    positiveMarketShare: totalMarkets ? positiveMarkets.length / totalMarkets : 0,
    averageYesProbability,
    totalVolume24h,
    medianLiquidity,
    highlights: {
      highConfidence,
      gainingMomentum,
      steadyBuilders,
    },
    categoryInsights: aggregateCategories(dataset),
    encouragingSignals: buildEncouragingSignals(dataset),
    curated: {
      liquidityLeaders,
      freshOpportunities,
      upwardWatchlist,
    },
  };
}
