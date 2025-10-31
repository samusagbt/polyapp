## Polymarket Pulse

Polymarket Pulse is a positive, insight-first dashboard that shines a light on encouraging activity across [Polymarket](https://polymarket.com). It consumes the public REST endpoints described in the [Polymarket developer quickstart](https://docs.polymarket.com/quickstart/introduction/main) to surface:

- High-confidence outlooks where forecasters agree on a constructive "Yes" outcome
- Markets gaining uplifting momentum over the last 24 hours
- Steady community builders with healthy liquidity and supportive sentiment
- Category-level scoreboards summarising positivity and 24h trading energy

No wallet connection or trading capabilities are included?this project is intentionally read-only and purely analytical.

---

## Project structure

```
src/
  app/
    page.tsx            // Dashboard UI and optimistic storytelling layer
    layout.tsx          // Global layout, typography, and theme framing
  lib/
    polymarket/
      client.ts         // Typed fetcher for Polymarket REST endpoints
      analytics.ts      // Data shaping + positivity-focused insight builders
      types.ts          // Shared interfaces for markets and highlights
```

The UI is powered by the App Router, Tailwind CSS (v4 via `@tailwindcss/postcss`), and server-side data fetching for fresh snapshots every two minutes.

---

## Getting started

```bash
# install dependencies
npm install

# run lint checks
npm run lint

# start the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the dashboard. The page updates automatically as you edit the source.

### Environment variables

The app defaults to `https://gamma-api.polymarket.com`. If Polymarket provision a dedicated base URL for you, create a `.env.local` file with:

```
POLYMARKET_API_BASE=https://your-custom-endpoint
```

Because the experience is read-only, no secret keys are required for the happy-path feature set. If you add privileged or authenticated endpoints later, be sure to proxy them through server-side routes.

---

## How the insights are computed

- **fetchMarkets** pulls the latest active, binary markets (up to 300) and normalises numeric fields.
- **buildDashboardInsights** classifies markets into a set of positive stories:
  - markets with ?65% YES conviction ? "High-confidence outlooks"
  - markets with positive 24h probability delta ? "Momentum building"
  - markets with healthy liquidity and ?45% YES probability ? "Steady community builders"
- Category summaries aggregate 24h volume, positivity ratios, and average YES conviction to provide a friendly sector view.

The storytelling copy emphasises constructive signals to keep the tone optimistic and beginner-friendly.

---

## Ideas for the next iteration

- Plug in additional endpoints (order books, fills, history) to chart positive momentum over time
- Allow visitors to filter by category, confidence band, or volume threshold
- Schedule background jobs that pre-compute longer trend lines (e.g., 7 day positive drift)
- Add shareable summary cards or a weekly newsletter generator highlighting upbeat stats
- Wire up alerts/notifications (email, webhook, Telegram) for major probability breakouts

---

## Deployment

Any modern Next.js host (Vercel, Netlify, Cloudflare, Fly.io) works out-of-the-box. Ensure the `POLYMARKET_API_BASE` environment variable is configured in your deployment platform if you override the default gamma endpoint.

---

Need a hand extending the app? Reach out and we can keep the positive momentum going. ??
