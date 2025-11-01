# Polymarket Dashboard ??

A modern, real-time analytics dashboard for Polymarket prediction markets built with React, TypeScript, and TailwindCSS.

![Polymarket Dashboard](https://img.shields.io/badge/Polymarket-Dashboard-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue)

## ?? Features

- **Real-time Market Data**: Live market prices and updates from Polymarket
- **Advanced Filtering**: Filter by category, sort by volume, date, and more
- **Search Functionality**: Find markets instantly with full-text search
- **Market Analytics**: View statistics including total volume, active markets, and trending categories
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Multiple View Modes**: Switch between grid and list views
- **Auto-refresh**: Data automatically refreshes every minute
- **Direct Links**: Click any market to view it on Polymarket

## ?? Screenshots

The dashboard displays:
- Market statistics and analytics
- Filterable market cards with live prices
- Category-based navigation
- Search functionality
- Multiple sort options

## ??? Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Recharts** - Charts (ready for future features)

### APIs Used
- **Polymarket Gamma API**: `https://gamma-api.polymarket.com`
- **Polymarket CLOB API**: `https://clob.polymarket.com`

## ?? Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Steps

1. **Clone or navigate to the repository**:
```bash
cd /workspace
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:3000`

## ??? Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## ?? Usage

### Basic Navigation
1. **Browse Markets**: Scroll through the market grid
2. **Filter by Category**: Click category buttons to filter
3. **Sort Markets**: Use the dropdown to sort by volume, date, etc.
4. **Search**: Type in the search bar to find specific markets
5. **View Details**: Click any market card to open it on Polymarket

### Understanding Market Cards
Each market card shows:
- **Category Badge**: Type of market (Politics, Sports, etc.)
- **Time Remaining**: Countdown to market close
- **Question**: The market's main question
- **Outcomes**: All possible outcomes with current probabilities
- **Volume**: Total and 24-hour trading volume

### Statistics Dashboard
The top section displays:
- **Total Volume**: Aggregate trading volume across all markets
- **Active Markets**: Number of currently active markets
- **Total Markets**: Total number of markets tracked
- **Top Category**: Most active category by volume

## ?? Project Structure

```
/workspace/
??? src/
?   ??? components/          # React components
?   ?   ??? Header.tsx       # Header with search
?   ?   ??? StatsCard.tsx    # Statistics display cards
?   ?   ??? MarketCard.tsx   # Individual market card
?   ?   ??? FilterBar.tsx    # Filtering and sorting controls
?   ?   ??? MarketGrid.tsx   # Market grid/list view
?   ?   ??? LoadingSpinner.tsx
?   ?   ??? ErrorMessage.tsx
?   ??? hooks/               # Custom React hooks
?   ?   ??? useMarkets.ts    # Market data fetching hooks
?   ??? services/            # API services
?   ?   ??? api.ts           # Polymarket API integration
?   ??? types/               # TypeScript types
?   ?   ??? index.ts         # Type definitions
?   ??? utils/               # Utility functions
?   ?   ??? helpers.ts       # Helper functions
?   ??? App.tsx              # Main app component
?   ??? main.tsx             # App entry point
?   ??? index.css            # Global styles
??? public/                  # Static assets
??? index.html               # HTML template
??? package.json             # Dependencies
??? tsconfig.json            # TypeScript config
??? vite.config.ts           # Vite config
??? tailwind.config.js       # TailwindCSS config
??? README.md                # This file
```

## ?? API Integration

### Gamma API Endpoints Used
```typescript
GET /markets              // Get all markets
GET /markets/{id}         // Get specific market
```

### Example API Call
```typescript
import { polymarketAPI } from './services/api';

// Fetch markets
const markets = await polymarketAPI.getMarkets(100);

// Get trending markets
const trending = await polymarketAPI.getTrendingMarkets();

// Search markets
const results = await polymarketAPI.searchMarkets('election');
```

## ?? Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color scheme
      },
    },
  },
}
```

### Adjusting Refresh Rate
Edit `src/hooks/useMarkets.ts`:
```typescript
refetchInterval: 60000, // Change to your preferred interval (ms)
```

### Adding New Filters
1. Add filter option to `FilterBar.tsx`
2. Implement filter logic in `src/utils/helpers.ts`
3. Update `App.tsx` to use the new filter

## ?? Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Static Hosting
Build the project and upload the `dist/` folder to any static host:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## ?? Additional Resources

- [Polymarket API Documentation](https://docs.polymarket.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## ?? 10 Great App Ideas

See `POLYMARKET_APP_IDEAS.md` for 10 detailed app ideas you can build with the Polymarket API, including:

1. Real-Time Market Dashboard & Alert System (this app!)
2. AI-Powered Market Analysis & Prediction Tool
3. Portfolio Tracker & Performance Analytics
4. Market Discovery & Research Platform
5. Social Trading Platform
6. Event-Based Notification System
7. Market Maker & Liquidity Provider Tool
8. Historical Data Analytics & Research Tool
9. Mobile-First Trading App
10. Educational Platform & Market Analysis Hub

## ?? Contributing

Contributions are welcome! Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Enhance documentation

## ?? License

MIT License - feel free to use this project for learning or commercial purposes.

## ?? Acknowledgments

- Built with [Polymarket API](https://polymarket.com)
- Icons by [Lucide](https://lucide.dev)
- Styled with [TailwindCSS](https://tailwindcss.com)

## ?? Support

For issues or questions:
- Check the [Polymarket API Documentation](https://docs.polymarket.com)
- Review the code comments
- Open an issue on GitHub

---

**Happy Trading! ??**
