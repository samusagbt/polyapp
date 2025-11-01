import { Market } from '../types';

export const getOutcomeColor = (price: number): string => {
  if (price > 0.7) return 'text-green-600 bg-green-100';
  if (price > 0.5) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const parseOutcomes = (outcomes: string): string[] => {
  try {
    return JSON.parse(outcomes);
  } catch {
    return [];
  }
};

export const parseOutcomePrices = (prices: string): number[] => {
  try {
    const parsed = JSON.parse(prices);
    return parsed.map((p: string | number) => 
      typeof p === 'string' ? parseFloat(p) : p
    );
  } catch {
    return [];
  }
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'politics': 'bg-blue-100 text-blue-800',
    'sports': 'bg-green-100 text-green-800',
    'crypto': 'bg-purple-100 text-purple-800',
    'pop-culture': 'bg-pink-100 text-pink-800',
    'science': 'bg-indigo-100 text-indigo-800',
    'business': 'bg-yellow-100 text-yellow-800',
  };
  
  const key = category.toLowerCase().replace(/[^a-z]/g, '');
  return colors[key] || 'bg-gray-100 text-gray-800';
};

export const sortMarkets = (
  markets: Market[],
  sortBy: string
): Market[] => {
  const sorted = [...markets];
  
  switch (sortBy) {
    case 'volume':
      return sorted.sort((a, b) => b.volumeNum - a.volumeNum);
    case 'volume24hr':
      return sorted.sort((a, b) => b.volume24hr - a.volume24hr);
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.endDateIso).getTime() - new Date(a.endDateIso).getTime()
      );
    case 'ending-soon':
      return sorted.sort((a, b) => 
        new Date(a.endDateIso).getTime() - new Date(b.endDateIso).getTime()
      );
    default:
      return sorted;
  }
};

export const filterMarkets = (
  markets: Market[],
  category?: string,
  minVolume?: number
): Market[] => {
  let filtered = markets;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(m => 
      m.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (minVolume) {
    filtered = filtered.filter(m => m.volumeNum >= minVolume);
  }
  
  return filtered;
};

export const calculateMarketStats = (markets: Market[]) => {
  const totalVolume = markets.reduce((sum, m) => sum + m.volumeNum, 0);
  const activeMarkets = markets.filter(m => m.active && !m.closed).length;
  
  const categoryCounts: Record<string, { count: number; volume: number }> = {};
  
  markets.forEach(market => {
    if (!categoryCounts[market.category]) {
      categoryCounts[market.category] = { count: 0, volume: 0 };
    }
    categoryCounts[market.category].count++;
    categoryCounts[market.category].volume += market.volumeNum;
  });
  
  const topCategories = Object.entries(categoryCounts)
    .map(([category, data]) => ({
      category,
      count: data.count,
      volume: data.volume,
    }))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5);
  
  return {
    totalVolume,
    totalMarkets: markets.length,
    activeMarkets,
    topCategories,
  };
};
