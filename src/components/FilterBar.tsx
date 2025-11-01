import React from 'react';
import { Filter, SortDesc, Grid, List } from 'lucide-react';
import { SortOption, ViewMode } from '../types';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const categories = [
  'All',
  'Politics',
  'Sports',
  'Crypto',
  'Pop Culture',
  'Business',
  'Science',
];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'volume24hr', label: '24h Volume' },
  { value: 'volume', label: 'Total Volume' },
  { value: 'newest', label: 'Newest' },
  { value: 'ending-soon', label: 'Ending Soon' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Info bar */}
      <div className="mb-3 pb-3 border-b border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Tip:</span> Click any category to filter markets, or use the search bar to find specific events
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category Filter */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <Filter className="h-5 w-5 text-gray-500 hidden md:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat.toLowerCase())}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === cat.toLowerCase()
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort and View Options */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <SortDesc className="h-5 w-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
