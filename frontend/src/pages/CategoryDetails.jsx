import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug } from "../data/categories";
import { useMemo, useState } from "react";

const WATCHLIST_KEY = "watchlist_categories";
const COMPARE_KEY = "compare_categories";

function getStoredList(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Pill({ children }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border border-white/15 bg-white/5 text-gray-200">
      {children}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div className="glass border border-white/10">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function CategoryDetails() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const [watchlist, setWatchlist] = useState(() => getStoredList(WATCHLIST_KEY));
  const [compareList, setCompareList] = useState(() => getStoredList(COMPARE_KEY));
  const isSaved = useMemo(() => watchlist.includes(slug), [watchlist, slug]);
  const isComparing = useMemo(() => compareList.includes(slug), [compareList, slug]);

  const toggleWatchlist = () => {
    const next = isSaved ? watchlist.filter((s) => s !== slug) : [...watchlist, slug];
    setWatchlist(next);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
  };

  const toggleCompare = () => {
    let next = isComparing ? compareList.filter((s) => s !== slug) : [...compareList, slug];
    if (next.length > 2) next = next.slice(next.length - 2);
    setCompareList(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white p-6">
        <div className="max-w-3xl mx-auto py-10">
          <div className="glass">
            <h1 className="text-2xl font-bold mb-2">Category not found</h1>
            <p className="text-gray-400 mb-6">This category link is invalid or missing.</p>
            <Link to="/explore" className="text-[#00d9f5] hover:text-[#00f5a0]">
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white p-6">
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <Link to="/explore" className="text-sm text-gray-400 hover:text-white">
              ← Back to Explore
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent mt-2">
              {category.title}
            </h1>
            <p className="text-gray-400 mt-2">{category.tagline}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={toggleWatchlist} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10">
                {isSaved ? "★ In Watchlist" : "☆ Add to Watchlist"}
              </button>
              <button onClick={toggleCompare} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10">
                {isComparing ? "✓ Added to Compare" : "+ Add to Compare"}
              </button>
              <Link to="/explore/compare" className="text-xs px-2 py-1 rounded-full border border-[#00d9f5]/40 bg-[#00d9f5]/10 hover:bg-[#00d9f5]/20">
                Open Compare
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Pill>Risk: {category.riskLevel}</Pill>
            <Pill>Risk Score: {category.riskScore}/10</Pill>
            <Pill>Liquidity: {category.liquidity}</Pill>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Section title="At a glance">
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="text-gray-400">Time horizon:</span> {category.timeHorizon}
              </p>
              <div>
                <p className="text-gray-400 mb-2">Best for:</p>
                <div className="flex flex-wrap gap-2">
                  {category.bestFor.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Common examples">
            <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
              {category.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Section title="Advantages">
            <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
              {category.advantages.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Section>
          <Section title="Disadvantages">
            <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
              {category.disadvantages.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Section>
        </div>

        <Section title="Risk factors to understand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.riskFactors.map((risk) => (
              <div key={risk} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-200">{risk}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="mt-4 glass border border-white/10">
          <h2 className="text-lg font-semibold mb-3">Where to execute</h2>
          <p className="text-sm text-gray-400 mb-3">
            Examples of reputable platforms (availability depends on country/region).
          </p>
          <div className="flex flex-wrap gap-2">
            {category.executionPlatforms.map((p) => (
              <Pill key={p}>{p}</Pill>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-[#0b0f1a] font-semibold px-5 py-3 rounded-xl"
            >
              Get Personalized Plan
            </Link>
            <Link
              to="/recommendations"
              className="glass border border-white/15 px-5 py-3 rounded-xl text-gray-200 hover:text-white"
            >
              View AI Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;

