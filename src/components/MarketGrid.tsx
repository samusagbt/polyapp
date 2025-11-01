import React from 'react';
import { Market } from '../types';
import { MarketCard } from './MarketCard';
import { LoadingCard } from './LoadingSpinner';

interface MarketGridProps {
  markets: Market[];
  loading?: boolean;
  viewMode?: 'grid' | 'list';
}

export const MarketGrid: React.FC<MarketGridProps> = ({ 
  markets, 
  loading = false,
  viewMode = 'grid'
}) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (markets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No markets found</p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {markets.map((market) => (
        <MarketCard 
          key={market.id} 
          market={market}
          onClick={() => {
            window.open(`https://polymarket.com/event/${market.slug}`, '_blank');
          }}
        />
      ))}
    </div>
  );
};
