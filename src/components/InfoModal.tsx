import React from 'react';
import { X, HelpCircle, TrendingUp, Filter, Search, DollarSign } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-8 w-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">How to Use This Dashboard</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* About Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? About This Dashboard</h3>
            <p className="text-gray-700 leading-relaxed">
              This dashboard displays real-time prediction markets from <strong>Polymarket</strong>, where users can trade on the outcomes of real-world events. 
              Markets cover politics, sports, crypto, business, and more. The data updates automatically every minute to keep you informed.
            </p>
          </section>

          {/* Features Section */}
          <section className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">? Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Search className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Search Markets</h4>
                  <p className="text-sm text-gray-600">Find specific markets by typing keywords in the search bar</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Filter className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Filter by Category</h4>
                  <p className="text-sm text-gray-600">Click category buttons to show only specific types of markets</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sort Options</h4>
                  <p className="text-sm text-gray-600">Sort by volume, date, or ending soon using the dropdown</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Live Prices</h4>
                  <p className="text-sm text-gray-600">See real-time probabilities and trading volumes for each market</p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Market Cards */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? Understanding Market Cards</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Category Badge</h4>
                  <p className="text-sm text-gray-600">Shows the market category (Politics, Sports, Crypto, etc.)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Question</h4>
                  <p className="text-sm text-gray-600">The main prediction question or event being traded</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Outcome Probabilities</h4>
                  <p className="text-sm text-gray-600">Current market probabilities for each outcome (e.g., Yes: 60%, No: 40%)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Volume & Time</h4>
                  <p className="text-sm text-gray-600">Total trading volume and time remaining until market closes</p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Dashboard */}
          <section className="bg-primary-50 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? Statistics Dashboard</h3>
            <p className="text-gray-700 mb-4">The top section shows key metrics across all markets:</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-gray-900">Total Volume:</span>
                <span className="text-gray-600 ml-2">Total money traded across all markets</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Active Markets:</span>
                <span className="text-gray-600 ml-2">Number of markets currently open for trading</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Total Markets:</span>
                <span className="text-gray-600 ml-2">Total number of markets in the system</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Top Category:</span>
                <span className="text-gray-600 ml-2">Most active category by trading volume</span>
              </div>
            </div>
          </section>

          {/* How to Trade */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? How to Trade</h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                Click on any market card to open it on Polymarket.com
              </p>
              <p className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                Connect your wallet (MetaMask, WalletConnect, etc.)
              </p>
              <p className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                Buy shares of the outcome you think will occur
              </p>
              <p className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                If you're correct, your shares are worth $1.00 each
              </p>
              <p className="text-sm text-gray-600 mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <strong>Note:</strong> This dashboard is read-only. To trade, you need to visit Polymarket.com and create an account.
              </p>
            </div>
          </section>

          {/* Understanding Probabilities */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? Understanding Probabilities</h3>
            <p className="text-gray-700 mb-3">
              The percentages you see represent the market's collective probability for each outcome:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '70%'}}></div>
                </div>
                <span className="text-gray-700"><strong>70%</strong> = Market thinks this outcome is very likely</span>
              </div>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-yellow-600 h-3 rounded-full" style={{width: '50%'}}></div>
                </div>
                <span className="text-gray-700"><strong>50%</strong> = Market is uncertain, 50-50 chance</span>
              </div>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-3 mr-3">
                  <div className="bg-red-600 h-3 rounded-full" style={{width: '20%'}}></div>
                </div>
                <span className="text-gray-700"><strong>20%</strong> = Market thinks this outcome is unlikely</span>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? Pro Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">?</span>
                <span>Markets with higher volume are more liquid and have tighter spreads</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">?</span>
                <span>Check "24h Volume" to see which markets are trending</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">?</span>
                <span>Markets close when the event occurs or the deadline passes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">?</span>
                <span>Use search to quickly find markets on specific topics</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">?</span>
                <span>Data refreshes automatically every minute</span>
              </li>
            </ul>
          </section>

          {/* About Polymarket */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">?? About Polymarket</h3>
            <p className="text-gray-700 leading-relaxed">
              Polymarket is a decentralized prediction market platform that allows users to trade on the outcomes of real-world events. 
              It uses blockchain technology and smart contracts to ensure transparent, fair resolution of markets. 
              Polymarket has become one of the largest prediction markets globally, with millions of dollars in daily trading volume.
            </p>
            <div className="mt-3">
              <a 
                href="https://polymarket.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Visit Polymarket.com ?
              </a>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">?? Disclaimer</h4>
            <p className="text-sm text-red-700">
              This dashboard is for informational purposes only. It is not affiliated with Polymarket. 
              Trading involves risk. Always do your own research before trading. Past performance does not guarantee future results.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 text-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Got it, let's explore!
          </button>
        </div>
      </div>
    </div>
  );
};
