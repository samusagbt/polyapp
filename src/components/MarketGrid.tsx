import React from 'react';
import { Market } from '../types';
import { MarketCard } from './MarketCard';
import { LoadingCard } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

interface MarketGridProps {
  markets: Market[];
  loading?: boolean;
  viewMode?: 'grid' | 'list';
  searchQuery?: string;
  onClearFilters?: () => void;
}

export const MarketGrid: React.FC<MarketGridProps> = ({ 
  markets, 
  loading = false,
  viewMode = 'grid',
  searchQuery,
  onClearFilters,
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
    return <EmptyState type="no-results" searchQuery={searchQuery} onClearFilters={onClearFilters} />;
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
