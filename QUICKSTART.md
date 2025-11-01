# Quick Start Guide ?

Get up and running with Polymarket Dashboard in 5 minutes!

## Prerequisites

- **Node.js 16+** installed ([Download](https://nodejs.org))
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, TailwindCSS, and more.

### Step 2: Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:3000` and automatically open in your browser.

### Step 3: Explore!

You should now see:
- **Statistics Dashboard** - Shows total volume, active markets, etc.
- **Filter Bar** - Filter by category and sort options
- **Market Grid** - Beautiful cards showing all active markets
- **Search Bar** - Search for specific markets

## What You Can Do

### 1. Browse Markets
Scroll through the market grid to see all available prediction markets.

### 2. Filter by Category
Click category buttons:
- All
- Politics
- Sports  
- Crypto
- Pop Culture
- Business
- Science

### 3. Sort Markets
Use the dropdown to sort by:
- 24h Volume (highest trading activity)
- Total Volume
- Newest
- Ending Soon

### 4. Search
Type in the search bar to find specific markets by keyword.

### 5. View Market Details
Click any market card to open it on Polymarket.com

### 6. Switch View Modes
Toggle between grid and list views using the icons in the filter bar.

## Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Change Refresh Rate

Edit `src/hooks/useMarkets.ts`:

```typescript
refetchInterval: 60000, // Change to your preferred interval in milliseconds
```

### Modify Categories

Edit `src/components/FilterBar.tsx`:

```typescript
const categories = [
  'All',
  'Politics',
  'Your Custom Category',
  // Add more...
];
```

### Adjust Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
  },
}
```

## Project Structure

```
polymarket-dashboard/
??? src/
?   ??? components/       # UI components
?   ??? hooks/           # React hooks for data fetching
?   ??? services/        # API integration
?   ??? types/           # TypeScript types
?   ??? utils/           # Helper functions
?   ??? App.tsx          # Main app
??? public/              # Static files
??? package.json         # Dependencies
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features Overview

? **Real-time data** - Markets update every minute  
? **Responsive design** - Works on all devices  
? **Fast search** - Find markets instantly  
? **Multiple filters** - Category, sort, search  
? **Beautiful UI** - Modern, clean design  
? **Type-safe** - Built with TypeScript  
? **Production-ready** - Optimized builds  

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# The app will automatically try port 3001, 3002, etc.
# Or specify a different port in vite.config.ts
```

### Dependencies Won't Install

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Make sure you're using Node.js 16 or higher
node --version

# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## Next Steps

1. **Explore the Code**
   - Check out `src/App.tsx` for the main logic
   - Look at `src/services/api.ts` for API integration
   - Review `src/components/` for UI components

2. **Customize**
   - Change colors in `tailwind.config.js`
   - Add new features to `src/components/`
   - Modify API calls in `src/services/api.ts`

3. **Deploy**
   - See `DEPLOYMENT.md` for deployment options
   - Recommended: Vercel or Cloudflare Pages

4. **Learn More**
   - Read `README.md` for full documentation
   - Check `POLYMARKET_APP_IDEAS.md` for inspiration
   - Visit [Polymarket API docs](https://docs.polymarket.com)

## Need Help?

- ?? Read the full [README.md](README.md)
- ?? Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- ?? See [POLYMARKET_APP_IDEAS.md](POLYMARKET_APP_IDEAS.md) for ideas
- ?? Read [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Quick Links

- [Polymarket Website](https://polymarket.com)
- [Polymarket API Docs](https://docs.polymarket.com)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [TailwindCSS Docs](https://tailwindcss.com)

---

**You're all set! Happy coding! ??**
