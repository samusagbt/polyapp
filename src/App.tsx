import React, { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { FilterBar } from './components/FilterBar';
import { MarketGrid } from './components/MarketGrid';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { InfoModal } from './components/InfoModal';
import { WelcomeBanner } from './components/WelcomeBanner';
import { useMarkets } from './hooks/useMarkets';
import { sortMarkets, filterMarkets, calculateMarketStats } from './utils/helpers';
import { SortOption, ViewMode } from './types';
import { TrendingUp, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { formatVolume } from './services/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function Dashboard() {
  const [sortBy, setSortBy] = useState<SortOption>('volume24hr');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { data: markets = [], isLoading, error, refetch } = useMarkets(200);

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let filtered = filterMarkets(markets, category === 'all' ? undefined : category);
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.question.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
      );
    }
    
    return sortMarkets(filtered, sortBy);
  }, [markets, category, sortBy, searchQuery]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (markets.length === 0) return null;
    return calculateMarketStats(markets);
  }, [markets]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} onOpenInfo={() => setIsInfoModalOpen(true)} />
        <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage 
            message="Failed to load markets. Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} onOpenInfo={() => setIsInfoModalOpen(true)} />
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <WelcomeBanner onOpenInfo={() => setIsInfoModalOpen(true)} />
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Volume"
              description="Cumulative trading volume"
              value={formatVolume(stats.totalVolume)}
              icon={DollarSign}
              trend="up"
            />
            <StatsCard
              title="Active Markets"
              description="Markets open for trading"
              value={stats.activeMarkets}
              icon={TrendingUp}
              trend="up"
            />
            <StatsCard
              title="Total Markets"
              description="All markets in system"
              value={stats.totalMarkets}
              icon={Activity}
            />
            <StatsCard
              title="Top Category"
              description="Most active by volume"
              value={stats.topCategories[0]?.category || 'N/A'}
              icon={BarChart3}
            />
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          category={category}
          onCategoryChange={setCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-primary-800">
              Found <span className="font-semibold">{filteredMarkets.length}</span> markets matching "{searchQuery}"
              {filteredMarkets.length > 0 && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-primary-600 hover:text-primary-700 underline"
                >
                  Clear search
                </button>
              )}
            </p>
          </div>
        )}

        {/* Markets Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredMarkets.length} markets
            </div>
            <MarketGrid 
              markets={filteredMarkets} 
              loading={isLoading}
              viewMode={viewMode}
              searchQuery={searchQuery}
              onClearFilters={() => {
                setSearchQuery('');
                setCategory('all');
              }}
            />
          </>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600 text-sm space-y-3">
            <p className="font-semibold text-gray-900">
              Built with Polymarket API
            </p>
            <p>
              Data updates automatically every minute ? Real-time prediction markets
            </p>
            <div className="flex justify-center items-center space-x-4 flex-wrap">
              <a 
                href="https://polymarket.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:underline"
              >
                Visit Polymarket
              </a>
              <span className="text-gray-400">?</span>
              <a 
                href="https://docs.polymarket.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:underline"
              >
                API Documentation
              </a>
              <span className="text-gray-400">?</span>
              <button 
                onClick={() => setIsInfoModalOpen(true)}
                className="text-primary-600 hover:underline"
              >
                Help & Info
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              This dashboard is for informational purposes only and is not affiliated with Polymarket.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
