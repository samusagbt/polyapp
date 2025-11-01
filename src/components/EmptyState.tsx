import React from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-results' | 'no-markets' | 'error';
  searchQuery?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  searchQuery, 
  onClearFilters 
}) => {
  if (type === 'no-results') {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No markets found
        </h3>
        {searchQuery ? (
          <p className="text-gray-600 mb-6">
            No results for "<span className="font-semibold">{searchQuery}</span>"
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            No markets match your current filters
          </p>
        )}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Clear Filters
          </button>
        )}
        <div className="mt-8 text-sm text-gray-500">
          <p>Try:</p>
          <ul className="mt-2 space-y-1">
            <li>? Using different keywords</li>
            <li>? Selecting "All" categories</li>
            <li>? Checking your spelling</li>
          </ul>
        </div>
      </div>
    );
  }

  if (type === 'no-markets') {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
        <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No markets available
        </h3>
        <p className="text-gray-600 mb-6">
          There are currently no active markets. Check back later!
        </p>
        <a
          href="https://polymarket.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          Visit Polymarket.com
        </a>
      </div>
    );
  }

  return (
    <div className="text-center py-16 bg-red-50 rounded-lg border border-red-200">
      <Filter className="h-16 w-16 text-red-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-900 mb-2">
        Unable to load markets
      </h3>
      <p className="text-red-700 mb-6">
        Please check your connection and try again
      </p>
    </div>
  );
};
