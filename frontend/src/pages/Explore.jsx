import { Link } from "react-router-dom";
import { categories } from "../data/categories";
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

function Explore() {
  const [watchlist, setWatchlist] = useState(() => getStoredList(WATCHLIST_KEY));
  const [compareList, setCompareList] = useState(() => getStoredList(COMPARE_KEY));

  const watchlistTitles = useMemo(
    () => categories.filter((c) => watchlist.includes(c.slug)).map((c) => c.title),
    [watchlist]
  );

  const toggleWatchlist = (slug) => {
    const next = watchlist.includes(slug)
      ? watchlist.filter((s) => s !== slug)
      : [...watchlist, slug];
    setWatchlist(next);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
  };

  const toggleCompare = (slug) => {
    let next = compareList.includes(slug)
      ? compareList.filter((s) => s !== slug)
      : [...compareList, slug];
    if (next.length > 2) next = next.slice(next.length - 2);
    setCompareList(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white p-6">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent mb-3">
          Explore Investments
        </h1>
        <p className="text-gray-400 mb-8">
          Browse categories before generating personalized recommendations.
        </p>

        <div className="glass mb-4 border border-white/10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="font-semibold">Watchlist & Compare</h2>
            <Link to="/explore/compare" className="text-sm text-[#00d9f5] hover:text-[#00f5a0]">
              Open Compare
            </Link>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            Watchlist: {watchlistTitles.length ? watchlistTitles.join(", ") : "No saved categories yet"}
          </p>
          <p className="text-xs text-gray-400">
            Compare queue: {compareList.length}/2 selected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((item) => (
            <div key={item.slug} className="glass p-5 rounded-xl border border-gray-800 hover:border-[#00f5a0]/25">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link to={`/explore/${item.slug}`} className="text-lg font-semibold mb-1 block hover:text-[#00f5a0]">
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-400">{item.tagline}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full border border-white/15 bg-white/5 text-gray-200">
                  {item.riskLevel}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-3 mb-3">Open details →</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWatchlist(item.slug)}
                  className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                >
                  {watchlist.includes(item.slug) ? "★ Saved" : "☆ Save"}
                </button>
                <button
                  onClick={() => toggleCompare(item.slug)}
                  className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                >
                  {compareList.includes(item.slug) ? "✓ Comparing" : "+ Compare"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/onboarding"
            className="bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-[#0b0f1a] font-semibold px-5 py-3 rounded-xl"
          >
            Continue to Investment Profile
          </Link>
          <Link
            to="/recommendations"
            className="glass border border-gray-700 px-5 py-3 rounded-xl text-gray-200 hover:text-white"
          >
            View AI Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Explore;
