import Link from "next/link";

import { fetchMarkets } from "@/lib/polymarket/client";
import { buildDashboardInsights } from "@/lib/polymarket/analytics";
import type { DashboardInsights, MarketHighlight } from "@/lib/polymarket/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const probabilityFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function MetricCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5 shadow-lg shadow-sky-950/30 backdrop-blur">
      <p className="text-sm uppercase tracking-wide text-sky-200/70">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-sky-100">{value}</p>
      <p className="mt-2 text-sm text-slate-300/80">{caption}</p>
    </div>
  );
}

function InsightHighlight({ highlight }: { highlight: MarketHighlight }) {
  const { market, headline, description } = highlight;
  const probability = probabilityFormatter.format(market.yesProbability || 0);
  const change = market.change24h;
  const changeLabel = change > 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-700/30 bg-slate-900/70 p-5 shadow-lg shadow-emerald-950/30">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
          {headline}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-slate-100">{market.question}</h3>
        <p className="mt-2 text-sm text-slate-300/80">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-200">
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">
          {probability} yes confidence
        </span>
        <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-200">
          24h change {changeLabel}
        </span>
      </div>
      <Link
        href={`https://polymarket.com/event/${market.slug}`}
        className="mt-4 inline-flex items-center text-sm font-semibold text-sky-200 transition hover:text-sky-100"
        target="_blank"
      >
        View on Polymarket ?
      </Link>
    </div>
  );
}

function EncouragingSignals({ signals }: { signals: string[] }) {
  if (signals.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-700/30 bg-slate-900/60 p-6 shadow-xl shadow-sky-950/40">
      <h2 className="text-lg font-semibold text-sky-100">Bright Spots We&apos;re Seeing</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-200">
        {signals.map((signal) => (
          <li key={signal} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
            <span>{signal}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CategoryGrid({ insights }: { insights: DashboardInsights["categoryInsights"] }) {
  if (insights.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-700/30 bg-slate-900/70 p-6 shadow-xl shadow-emerald-950/30">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Category Scoreboard</h2>
          <p className="mt-1 text-sm text-slate-300/80">
            Where Polymarket forecasters are leaning optimistic right now.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {insights.slice(0, 6).map((category) => (
          <div
            key={category.category}
            className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-4"
          >
            <p className="text-sm font-semibold text-sky-200">{category.category}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {percentFormatter.format(category.positivityRatio)} supportive
            </p>
            <div className="mt-3 space-y-1 text-xs text-slate-300/70">
              <p>
                {category.totalMarkets} active markets ?
                {" "}
                {currencyFormatter.format(category.totalVolume24h)} 24h flow
              </p>
              <p>
                Avg confidence {probabilityFormatter.format(category.avgYesProbability)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HighlightsSection({
  title,
  subtitle,
  highlights,
}: {
  title: string;
  subtitle: string;
  highlights: MarketHighlight[];
}) {
  if (highlights.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        <p className="text-sm text-slate-300/80">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {highlights.slice(0, 3).map((highlight) => (
          <InsightHighlight key={highlight.market.id} highlight={highlight} />
        ))}
      </div>
    </section>
  );
}

function formatNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toFixed(0);
}

export default async function Home() {
  let insights: DashboardInsights | null = null;

  try {
    const markets = await fetchMarkets({ limit: 300, active: true, closed: false });
    insights = buildDashboardInsights(markets);
  } catch (error) {
    console.error("Failed to load Polymarket data", error);
  }

  if (!insights) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-12 text-center text-slate-200">
        <div className="rounded-3xl border border-red-500/30 bg-red-950/30 p-8 shadow-2xl shadow-red-900/20">
          <h1 className="text-3xl font-semibold text-slate-50">We couldn&apos;t reach Polymarket just now</h1>
          <p className="mt-3 text-base text-slate-300/90">
            Please refresh in a moment. The dashboard will automatically light up once the API responds
            again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
      <header className="rounded-3xl border border-sky-500/30 bg-sky-950/30 p-8 shadow-2xl shadow-sky-500/10 backdrop-blur">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-200">
              Polymarket Pulse
            </span>
            <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
              Encouraging signals from today&apos;s prediction markets
            </h1>
            <p className="text-base text-slate-200/80">
              A friendly dashboard spotlighting the markets where optimism, conviction, and
              community energy are shining across Polymarket.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            Updated {new Intl.DateTimeFormat("en", {
              hour: "numeric",
              minute: "2-digit",
              month: "short",
              day: "numeric",
            }).format(insights.fetchedAt)}
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Active markets"
            value={formatNumber(insights.totalMarkets)}
            caption="Inspiring questions currently attracting attention"
          />
          <MetricCard
            label="Positive consensus"
            value={percentFormatter.format(insights.positiveMarketShare)}
            caption="Share of markets leaning toward a confident yes"
          />
          <MetricCard
            label="Average conviction"
            value={probabilityFormatter.format(insights.averageYesProbability)}
            caption="Mean implied probability across all highlighted markets"
          />
          <MetricCard
            label="24h trading energy"
            value={currencyFormatter.format(insights.totalVolume24h)}
            caption="Fresh capital fuelling the conversation in the past day"
          />
        </div>
      </header>

      <EncouragingSignals signals={insights.encouragingSignals} />

      <HighlightsSection
        title="High-confidence outlooks"
        subtitle="Clear agreement from forecasters delivering uplifting clarity."
        highlights={insights.highlights.highConfidence}
      />

      <HighlightsSection
        title="Momentum building"
        subtitle="Markets experiencing encouraging positive shifts in the last 24 hours."
        highlights={insights.highlights.gainingMomentum}
      />

      <HighlightsSection
        title="Steady community builders"
        subtitle="Healthy liquidity and constructive sentiment showing sustained interest."
        highlights={insights.highlights.steadyBuilders}
      />

      <CategoryGrid insights={insights.categoryInsights} />

      <footer className="my-8 rounded-3xl border border-slate-700/30 bg-slate-900/70 p-6 text-sm text-slate-300/80">
        <p>
          Built for insight seekers exploring the Polymarket API. Provide your own analytics or
          extend this experience by wiring in additional endpoints like quotes, historical candles, or
          alerts. Need help evolving this tool? Let me know!
        </p>
      </footer>
    </main>
  );
}
