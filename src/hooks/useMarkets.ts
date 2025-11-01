import { useQuery } from 'react-query';
import { polymarketAPI } from '../services/api';
import { Market } from '../types';

export const useMarkets = (limit = 100) => {
  return useQuery<Market[], Error>(
    ['markets', limit],
    () => polymarketAPI.getMarkets(limit),
    {
      staleTime: 30000, // 30 seconds
      cacheTime: 300000, // 5 minutes
      refetchInterval: 60000, // Refetch every minute
    }
  );
};

export const useMarket = (id: string) => {
  return useQuery<Market | null, Error>(
    ['market', id],
    () => polymarketAPI.getMarket(id),
    {
      enabled: !!id,
      staleTime: 30000,
    }
  );
};

export const useTrendingMarkets = () => {
  return useQuery<Market[], Error>(
    'trendingMarkets',
    () => polymarketAPI.getTrendingMarkets(),
    {
      staleTime: 60000, // 1 minute
      refetchInterval: 120000, // Refetch every 2 minutes
    }
  );
};

export const useSearchMarkets = (query: string) => {
  return useQuery<Market[], Error>(
    ['searchMarkets', query],
    () => polymarketAPI.searchMarkets(query),
    {
      enabled: query.length > 2,
      staleTime: 30000,
    }
  );
};

export const useMarketsByCategory = (category: string) => {
  return useQuery<Market[], Error>(
    ['marketsByCategory', category],
    () => polymarketAPI.getMarketsByCategory(category),
    {
      enabled: !!category,
      staleTime: 60000,
    }
  );
};
