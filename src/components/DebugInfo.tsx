import React from 'react';

interface DebugInfoProps {
  markets: any[];
  filteredMarkets: any[];
  category: string;
  isLoading: boolean;
  error: any;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ 
  markets, 
  filteredMarkets, 
  category,
  isLoading,
  error 
}) => {
  // Only show in development
  if (import.meta.env.MODE !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">?? Debug Info</div>
      <div className="space-y-1">
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
        <div>Error: {error ? 'Yes' : 'No'}</div>
        <div>Total Markets: {markets.length}</div>
        <div>Filtered Markets: {filteredMarkets.length}</div>
        <div>Category Filter: {category}</div>
        {markets.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div>First Market:</div>
            <div className="pl-2">
              <div>Question: {markets[0]?.question?.substring(0, 30)}...</div>
              <div>Category: {markets[0]?.category}</div>
              <div>Active: {markets[0]?.active ? 'Yes' : 'No'}</div>
              <div>Closed: {markets[0]?.closed ? 'Yes' : 'No'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
