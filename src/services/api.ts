import axios from 'axios';
import { Market, CLOBMarket } from '../types';

// Use proxy in development to avoid CORS issues
const isDevelopment = import.meta.env.DEV;
const GAMMA_API = isDevelopment ? '/api/gamma' : 'https://gamma-api.polymarket.com';
const CLOB_API = isDevelopment ? '/api/clob' : 'https://clob.polymarket.com';

// Create axios instances with proper configuration
const gammaClient = axios.create({
  baseURL: GAMMA_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const clobClient = axios.create({
  baseURL: CLOB_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const polymarketAPI = {
  // Gamma API - Market Data
  async getMarkets(limit = 100, offset = 0): Promise<Market[]> {
    try {
      const response = await gammaClient.get('/markets', {
        params: { limit, offset },
      });
      // Return all markets, filter on client side if needed
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching markets from Gamma API:', error);
      return [];
    }
  },

  async getMarket(id: string): Promise<Market | null> {
    try {
      const response = await gammaClient.get(`/markets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching market ${id}:`, error);
      return null;
    }
  },

  async searchMarkets(query: string): Promise<Market[]> {
    try {
      const response = await gammaClient.get('/markets', {
        params: { search: query },
      });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error searching markets:', error);
      return [];
    }
  },

  // CLOB API - Order Book and Trading Data
  async getCLOBMarkets(limit = 100): Promise<CLOBMarket[]> {
    try {
      const response = await clobClient.get('/markets', {
        params: { limit },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching CLOB markets:', error);
      return [];
    }
  },

  async getTrendingMarkets(): Promise<Market[]> {
    try {
      const markets = await this.getMarkets(50);
      // Sort by 24hr volume
      return markets
        .filter(m => m.volume24hr > 0)
        .sort((a, b) => b.volume24hr - a.volume24hr)
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching trending markets:', error);
      return [];
    }
  },

  async getMarketsByCategory(category: string): Promise<Market[]> {
    try {
      const markets = await this.getMarkets(200);
      return markets.filter(m => 
        m.category.toLowerCase().includes(category.toLowerCase())
      );
    } catch (error) {
      console.error(`Error fetching markets for category ${category}:`, error);
      return [];
    }
  },

  async getActiveMarkets(): Promise<Market[]> {
    try {
      const markets = await this.getMarkets(200);
      // Filter for truly active markets
      return markets.filter(m => {
        // Include if active OR has recent volume
        return (m.active && !m.archived) || m.volume24hr > 0;
      });
    } catch (error) {
      console.error('Error fetching active markets:', error);
      return [];
    }
  },
};

// Helper functions
export const formatVolume = (volume: number): string => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  }
  return `$${volume.toFixed(0)}`;
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const getTimeUntilEnd = (endDate: string): string => {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};
