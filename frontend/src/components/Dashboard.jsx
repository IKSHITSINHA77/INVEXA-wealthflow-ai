import { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import Graph from "./Graph";
import RecommendationCard from "./RecommendationCard";

function Dashboard() {
  const [portfolioValue, setPortfolioValue] = useState(125430);
  const [growth, setGrowth] = useState(12.5);
  const [activeTab, setActiveTab] = useState("home");
  
  // User Profile State
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const staticRecommendations = [
    { title: "Tech Stocks", confidence: 85, type: "growth", symbol: "AAPL" },
    { title: "Green Energy", confidence: 78, type: "sustainable", symbol: "TSLA" },
    { title: "Blue Chip", confidence: 92, type: "stable", symbol: "MSFT" },
    { title: "Crypto", confidence: 65, type: "volatile", symbol: "BTC" },
  ];

  const generateAIRecommendations = () => {
    if (!age || !salary) return;
    
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const ageNum = parseInt(age);
      const salaryNum = parseInt(salary);
      
      // AI Logic for recommendations
      const recommendations = [];
      
      // Age-based allocation
      if (ageNum < 35) {
        recommendations.push({
          category: "Growth Stocks",
          name: "Aggressive Growth Fund",
          allocation: 40,
          risk: "high",
          expectedReturn: "12-18%",
          confidence: 85,
          description: "High-growth companies suitable for young investors with long time horizon.",
          icon: "📈"
        });
      } else if (ageNum < 50) {
        recommendations.push({
          category: "Balanced Portfolio",
          name: "Moderate Growth Fund",
          allocation: 35,
          risk: "medium",
          expectedReturn: "8-12%",
          confidence: 90,
          description: "Balanced mix of stocks and bonds for steady growth.",
          icon: "⚖️"
        });
      } else {
        recommendations.push({
          category: "Income Focus",
          name: "Dividend Aristocrats",
          allocation: 30,
          risk: "low",
          expectedReturn: "5-8%",
          confidence: 92,
          description: "Stable dividend-paying stocks for income generation.",
          icon: "💰"
        });
      }
      
      // Salary-based recommendations
      if (salaryNum > 100000) {
        recommendations.push({
          category: "Real Estate",
          name: "REIT Index",
          allocation: 20,
          risk: "medium",
          expectedReturn: "7-10%",
          confidence: 78,
          description: "Real estate exposure without direct property ownership.",
          icon: "🏢"
        });
      }
      
      if (salaryNum > 80000 && ageNum < 40) {
        recommendations.push({
          category: "International",
          name: "Emerging Markets",
          allocation: 15,
          risk: "high",
          expectedReturn: "10-15%",
          confidence: 72,
          description: "Exposure to growing economies for diversification.",
          icon: "🌍"
        });
      }
      
      // Risk-based adjustments
      if (riskTolerance === "conservative") {
        recommendations.push({
          category: "Bonds",
          name: "Government Bonds",
          allocation: 30,
          risk: "low",
          expectedReturn: "3-5%",
          confidence: 95,
          description: "Safe, stable returns from government securities.",
          icon: "📋"
        });
      } else if (riskTolerance === "aggressive") {
        recommendations.push({
          category: "Tech",
          name: "Nasdaq 100",
          allocation: 25,
          risk: "very-high",
          expectedReturn: "15-25%",
          confidence: 68,
          description: "High-growth tech companies with higher volatility.",
          icon: "💻"
        });
      }
      
      // Always add emergency fund recommendation
      recommendations.push({
        category: "Emergency Fund",
        name: "High-Yield Savings",
        allocation: 10,
        risk: "none",
        expectedReturn: "4-5%",
        confidence: 99,
        description: "Keep 3-6 months expenses in liquid savings.",
        icon: "🛡️"
      });
      
      setAiRecommendations(recommendations);
      setShowProfileForm(false);
      setLoading(false);
    }, 1500);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "none": return "text-gray-400 border-gray-400/30 bg-gray-400/10";
      case "low": return "text-green-400 border-green-400/30 bg-green-400/10";
      case "medium": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "high": return "text-orange-400 border-orange-400/30 bg-orange-400/10";
      case "very-high": return "text-red-400 border-red-400/30 bg-red-400/10";
      default: return "text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent">
              Invexa
            </h1>
            <p className="text-gray-400 text-sm mt-1">AI-Powered Investment</p>
          </div>
          <div className="glass rounded-full p-2">
            <svg className="w-6 h-6 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </header>

      {/* Greeting & Portfolio Summary */}
      <section className="px-6 mb-6 animate-slide-up">
        <div className="glass card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Welcome back</p>
              <h2 className="text-xl font-semibold">Alex 👋</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Portfolio Value</p>
              <p className="text-2xl font-bold text-[#00f5a0]">
                ${portfolioValue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-sm font-medium">+{growth}%</span>
            <span className="text-gray-500 text-xs">this month</span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass text-center p-4">
            <p className="text-2xl font-bold text-[#00d9f5]">8</p>
            <p className="text-gray-400 text-xs">Assets</p>
          </div>
          <div className="glass text-center p-4">
            <p className="text-2xl font-bold text-[#00f5a0]">24</p>
            <p className="text-gray-400 text-xs">Alerts</p>
          </div>
          <div className="glass text-center p-4">
            <p className="text-2xl font-bold text-purple-400">92%</p>
            <p className="text-gray-400 text-xs">AI Score</p>
          </div>
        </div>
      </section>

      {/* Graph Section */}
      <section className="px-6 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="glass">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Portfolio Growth</h3>
            <select className="bg-transparent text-gray-400 text-sm border border-gray-700 rounded-lg px-3 py-1">
              <option>1M</option>
              <option>3M</option>
              <option>6M</option>
              <option>1Y</option>
            </select>
          </div>
          <div className="h-48">
            <Graph />
          </div>
        </div>
      </section>

      {/* AI Profile Setup Form */}
      {showProfileForm && (
        <section className="px-6 mb-6 animate-slide-up">
          <div className="glass border-l-4 border-[#00f5a0]">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Get AI Investment Advice
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00f5a0]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Annual Salary ($)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 85000"
                  className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00f5a0]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">Risk Tolerance</label>
              <select
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00f5a0]"
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
            <button
              onClick={generateAIRecommendations}
              disabled={loading || !age || !salary}
              className="w-full bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-black font-semibold py-2.5 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing profile..." : "Generate Recommendations"}
            </button>
          </div>
        </section>
      )}

      {/* AI Recommendations */}
      {!showProfileForm && (
        <section className="px-6 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your AI Recommendations</h3>
            <button
              onClick={() => setShowProfileForm(true)}
              className="text-sm text-[#00d9f5] hover:text-[#00f5a0]"
            >
              Update Profile
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="glass p-4 rounded-xl">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm text-gray-400">{rec.category}</p>
                    <h4 className="font-semibold">{rec.name}</h4>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(rec.risk)}`}>
                    {rec.risk}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#00f5a0] font-medium">Allocation: {rec.allocation}%</span>
                  <span className="text-gray-400">Return: {rec.expectedReturn}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {staticRecommendations.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                symbol={rec.symbol}
                confidence={rec.confidence}
                type={rec.type}
              />
            ))}
          </div>
        </section>
      )}

      {/* Market Overview */}
      <section className="px-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
        <div className="glass">
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-bold">S&P</span>
              </div>
              <div>
                <p className="font-medium">S&P 500</p>
                <p className="text-gray-500 text-xs">US Market</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">4,783.45</p>
              <p className="text-green-400 text-xs">+1.2%</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 text-xs font-bold">NAS</span>
              </div>
              <div>
                <p className="font-medium">NASDAQ</p>
                <p className="text-gray-500 text-xs">Tech Index</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">15,234.67</p>
              <p className="text-green-400 text-xs">+0.8%</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400 text-xs font-bold">BTC</span>
              </div>
              <div>
                <p className="font-medium">Bitcoin</p>
                <p className="text-gray-500 text-xs">Crypto</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$43,210</p>
              <p className="text-red-400 text-xs">-2.1%</p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Dashboard;