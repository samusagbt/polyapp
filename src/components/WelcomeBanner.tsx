import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

interface WelcomeBannerProps {
  onOpenInfo: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onOpenInfo }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg shadow-lg p-6 mb-6 relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="pr-8">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to Polymarket Dashboard! ??
        </h2>
        <p className="text-primary-50 mb-4 max-w-3xl">
          Explore real-time prediction markets from Polymarket. Search, filter, and discover markets on politics, sports, crypto, and more. 
          Click any market to trade on Polymarket.com.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={onOpenInfo}
            className="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
          >
            <Info className="h-4 w-4" />
            <span>Learn How to Use</span>
          </button>
          
          <a 
            href="https://polymarket.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors font-semibold"
          >
            <span>Visit Polymarket.com</span>
            <span>?</span>
          </a>
        </div>
      </div>
    </div>
  );
};
