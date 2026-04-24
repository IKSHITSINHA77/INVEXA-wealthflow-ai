import { Link } from "react-router-dom";
import { categories, getCategoryBySlug } from "../data/categories";

const COMPARE_KEY = "compare_categories";

function getCompareList() {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 2) : [];
  } catch {
    return [];
  }
}

function clearCompareList() {
  localStorage.removeItem(COMPARE_KEY);
}

function CompareCategories() {
  const selected = getCompareList()
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean);

  if (selected.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white p-6">
        <div className="max-w-4xl mx-auto py-8">
          <div className="glass">
            <h1 className="text-2xl font-bold mb-2">Compare Categories</h1>
            <p className="text-gray-400 mb-4">
              Pick two categories from Explore to enable side-by-side comparison.
            </p>
            <Link to="/explore" className="text-[#00d9f5] hover:text-[#00f5a0]">
              Go to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white p-6">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/explore" className="text-sm text-gray-400 hover:text-white">
              ← Back to Explore
            </Link>
            <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent">
              Side-by-Side Comparison
            </h1>
          </div>
          <button
            onClick={() => {
              clearCompareList();
              window.location.reload();
            }}
            className="glass !px-4 !py-2 text-sm"
          >
            Clear Compare
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {selected.map((cat) => (
            <div key={cat.slug} className="glass border border-white/10">
              <h2 className="text-xl font-semibold mb-1">{cat.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{cat.tagline}</p>
              <div className="space-y-2 text-sm mb-4">
                <p><span className="text-gray-400">Risk:</span> {cat.riskLevel} ({cat.riskScore}/10)</p>
                <p><span className="text-gray-400">Liquidity:</span> {cat.liquidity}</p>
                <p><span className="text-gray-400">Time horizon:</span> {cat.timeHorizon}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Advantages</p>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {cat.advantages.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Disadvantages</p>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {cat.disadvantages.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <Link to={`/explore/${cat.slug}`} className="text-[#00d9f5] hover:text-[#00f5a0] text-sm">
                View full details →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 glass border border-white/10">
          <h3 className="font-semibold mb-3">Need another comparison?</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/explore/${cat.slug}`}
                className="text-xs px-2 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareCategories;

