import "server-only";

import { RawPolymarketMarket } from "@/lib/polymarket/types";

const DEFAULT_API_BASE = "https://gamma-api.polymarket.com";

const NUMBER_KEYS = new Set([
  "lastTradePrice",
  "bestBid",
  "bestAsk",
  "volume",
  "volume24hr",
  "volume1wk",
  "volume1mo",
  "liquidity",
  "liquidityNum",
  "oneDayPriceChange",
  "oneHourPriceChange",
  "oneWeekPriceChange",
]);

const ARRAY_KEYS = new Set(["outcomes", "outcomePrices"]);

export interface MarketQueryOptions {
  limit?: number;
  offset?: number;
  active?: boolean;
  closed?: boolean;
  ascending?: boolean;
  binaryOnly?: boolean;
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim().length > 0)
    return Number(value);
  return 0;
}

function parseArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry));
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map((entry) => String(entry)) : [];
    } catch (error) {
      console.warn("Failed to parse array value from Polymarket API", error);
      return [];
    }
  }

  return [];
}

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Polymarket API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}

function normalizeMarket(raw: RawPolymarketMarket) {
  const base: Record<string, unknown> = { ...raw };

  for (const key of Object.keys(base)) {
    if (NUMBER_KEYS.has(key)) {
      base[key] = toNumber(base[key]);
      continue;
    }

    if (ARRAY_KEYS.has(key)) {
      base[key] = parseArray(base[key]);
      continue;
    }
  }

  const outcomes = (base.outcomes as string[]) ?? [];
  const outcomePrices = ((base.outcomePrices as string[]) ?? []).map((value) =>
    toNumber(value),
  );

  return {
    ...base,
    outcomes,
    outcomePrices,
    startDate:
      typeof base.startDate === "string" ? (base.startDate as string) : undefined,
    endDate:
      typeof base.endDate === "string" ? (base.endDate as string) : undefined,
    createdAt:
      typeof base.createdAt === "string" ? (base.createdAt as string) : undefined,
    updatedAt:
      typeof base.updatedAt === "string" ? (base.updatedAt as string) : undefined,
  } as RawPolymarketMarket & {
    outcomes: string[];
    outcomePrices: number[];
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export async function fetchMarkets(
  options: MarketQueryOptions = {},
  init?: RequestInit,
) {
  const {
    limit = 200,
    offset = 0,
    active = true,
    closed = false,
    ascending = false,
    binaryOnly = true,
  } = options;

  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  params.set("active", String(active));
  params.set("closed", String(closed));
  params.set("ascending", String(ascending));
  if (binaryOnly) {
    params.set("binary", "true");
  }

  const baseUrl = process.env.POLYMARKET_API_BASE ?? DEFAULT_API_BASE;
  const url = `${baseUrl.replace(/\/$/, "")}/markets?${params.toString()}`;

  const response = await fetchJson<RawPolymarketMarket[]>(url, {
    ...init,
    // Cache on the server for 2 minutes to keep data fresh but avoid hammering the API.
    next: { revalidate: 120, ...(init?.next ?? {}) },
  });

  return response.map(normalizeMarket);
}
