import React from 'react';
import { Market } from '../types';
import { 
  parseOutcomes, 
  parseOutcomePrices, 
  truncateText,
  getCategoryColor 
} from '../utils/helpers';
import { 
  formatVolume, 
  formatPercentage, 
  getTimeUntilEnd 
} from '../services/api';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onClick?: () => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const outcomes = parseOutcomes(market.outcomes);
  const prices = parseOutcomePrices(market.outcomePrices);
  const timeUntil = getTimeUntilEnd(market.endDateIso);

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
      onClick={onClick}
      title="Click to view this market on Polymarket"
    >
      {market.image && (
        <div className="h-40 overflow-hidden bg-gray-100">
          <img 
            src={market.image} 
            alt={market.question}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-5">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(market.category)}`}>
            {market.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {timeUntil}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {truncateText(market.question, 100)}
        </h3>

        {/* Outcomes */}
        <div className="space-y-2 mb-4">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 flex-1">
                {truncateText(outcome, 30)}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(prices[idx] || 0) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                  {formatPercentage(prices[idx] || 0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1 text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium" title="Total trading volume">
              {formatVolume(market.volumeNum)}
            </span>
          </div>
          {market.volume24hr > 0 && (
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium" title="24-hour trading volume">
                {formatVolume(market.volume24hr)} 24h
              </span>
            </div>
          )}
        </div>

        {/* Hover instruction */}
        <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-primary-600 text-center font-medium">
            Click to trade on Polymarket ?
          </p>
        </div>
      </div>
    </div>
  );
};
