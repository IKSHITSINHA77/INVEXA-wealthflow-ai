import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ai");
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [projectionYears, setProjectionYears] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/recommendations", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
        setUserProfile(data.profile);
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low": return "text-green-400 border-green-400/30 bg-green-400/10";
      case "medium": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "high": return "text-orange-400 border-orange-400/30 bg-orange-400/10";
      case "very-high": return "text-red-400 border-red-400/30 bg-red-400/10";
      default: return "text-gray-400 border-gray-400/30";
    }
  };

  const getAllocationColor = (percentage) => {
    if (percentage >= 40) return "bg-[#00f5a0]";
    if (percentage >= 20) return "bg-[#00d9f5]";
    if (percentage >= 10) return "bg-purple-400";
    return "bg-gray-400";
  };

  const averageExpectedReturn = useMemo(() => {
    if (!recommendations.length) return 8;
    let weightedReturn = 0;
    let totalWeight = 0;

    recommendations.forEach((rec) => {
      const match = String(rec.expectedReturn || "").match(/-?\d+(\.\d+)?/);
      const annualReturn = match ? Number(match[0]) : 8;
      const allocation = Number(rec.allocation || 0);
      weightedReturn += annualReturn * allocation;
      totalWeight += allocation;
    });

    if (!totalWeight) return 8;
    return weightedReturn / totalWeight;
  }, [recommendations]);

  const projectionValue = useMemo(() => {
    const monthlyRate = (averageExpectedReturn / 100) / 12;
    const months = projectionYears * 12;
    let future = 0;
    for (let i = 0; i < months; i += 1) {
      future = (future + monthlyContribution) * (1 + monthlyRate);
    }
    return future;
  }, [averageExpectedReturn, monthlyContribution, projectionYears]);

  const rebalanceAlert = useMemo(() => {
    if (!userProfile) return "";
    if (userProfile.riskScore >= 8 && userProfile.age >= 45) {
      return "Your profile is high-risk for your age bracket. Consider shifting 10-15% into bonds/cash.";
    }
    if (userProfile.riskScore <= 3 && userProfile.salary > 90000) {
      return "Your profile is conservative for your income. You may explore a small growth allocation.";
    }
    return "Your current risk posture appears balanced for your profile.";
  }, [userProfile]);

  const exportPdfReport = () => {
    const today = new Date().toLocaleDateString();
    const profile = userProfile || {};
    const rows = recommendations
      .map(
        (rec) =>
          `<tr>
            <td>${rec.name}</td>
            <td>${rec.category}</td>
            <td>${rec.allocation}%</td>
            <td>${rec.risk}</td>
            <td>${rec.expectedReturn}%</td>
            <td>${rec.confidence}%</td>
          </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>WealthFlow AI Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
    h1 { margin: 0 0 8px; }
    .muted { color: #6b7280; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 12px 0 20px; }
    .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 12px; }
    th { background: #f9fafb; }
  </style>
</head>
<body>
  <h1>WealthFlow AI - Personalized Investment Report</h1>
  <p class="muted">Generated on ${today}</p>
  <div class="grid">
    <div class="card"><strong>Age</strong><br/>${profile.age ?? "-"}</div>
    <div class="card"><strong>Annual Salary</strong><br/>$${profile.salary?.toLocaleString?.() ?? "-"}</div>
    <div class="card"><strong>Risk Profile</strong><br/>${profile.riskTolerance ?? "-"} (${profile.riskScore ?? "-"}/10)</div>
  </div>
  <p><strong>Projection:</strong> Monthly contribution $${monthlyContribution}, horizon ${projectionYears} years, estimated value $${Math.round(
      projectionValue
    ).toLocaleString()}.</p>
  <h3>Recommendations</h3>
  <table>
    <thead>
      <tr><th>Name</th><th>Category</th><th>Allocation</th><th>Risk</th><th>Expected Return</th><th>Confidence</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="muted" style="margin-top:16px;">Educational use only. Not financial advice.</p>
</body>
</html>`;

    const reportWindow = window.open("", "_blank", "width=980,height=720");
    if (!reportWindow) return;
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] flex items-center justify-center">
        <div className="w-full max-w-4xl px-6 animate-pulse">
          <div className="glass mb-4 h-24" />
          <div className="glass mb-4 h-36" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass h-32" />
            <div className="glass h-32" />
          </div>
          <p className="text-gray-400 text-sm mt-4 text-center">AI is analyzing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] text-white pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent">
              AI Recommendations
            </h1>
            <p className="text-gray-400 text-sm mt-1">Personalized for your profile</p>
          </div>
          <div className="glass rounded-full p-2">
            <svg className="w-6 h-6 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <button
            onClick={exportPdfReport}
            className="glass !px-4 !py-2 text-sm border border-white/20 hover:border-[#00f5a0]/40"
          >
            Export Personalized PDF Report
          </button>
        </div>
      </header>

      {/* User Profile Summary */}
      {userProfile && (
        <section className="px-6 mb-6 animate-slide-up">
          <div className="glass card-gradient">
            <h3 className="text-sm font-semibold text-[#00f5a0] mb-3">Your Investment Profile</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{userProfile.age}</p>
                <p className="text-xs text-gray-400">Years Old</p>
              </div>
              <div>
                <p className="text-2xl font-bold">${(userProfile.salary / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-400">Annual Income</p>
              </div>
              <div>
                <p className="text-xl font-bold capitalize">{userProfile.riskTolerance}</p>
                <p className="text-xs text-gray-400">Risk Profile</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Allocation */}
      <section className="px-6 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-semibold mb-4">Recommended Portfolio Allocation</h2>
        <div className="glass">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-right">
                  <span className="text-lg font-bold">{rec.allocation}%</span>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getAllocationColor(rec.allocation)}`}
                      style={{ width: `${rec.allocation}%` }}
                    />
                  </div>
                </div>
                <div className="w-32">
                  <p className="font-medium text-sm">{rec.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="px-6 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Investment Breakdown</h2>
          <button className="text-[#00f5a0] text-sm hover:underline">Refresh AI</button>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="glass p-4 hover:scale-[1.02] transition-transform">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRiskColor(rec.risk)}`}>
                    <span className="text-lg">{rec.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{rec.name}</p>
                    <p className="text-xs text-gray-400">{rec.category}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(rec.risk)}`}>
                  {rec.risk} risk
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <div>
                  <p className="text-xs text-gray-500">Expected Return</p>
                  <p className="text-[#00f5a0] font-semibold">{rec.expectedReturn}%/year</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">AI Confidence</p>
                  <p className="font-semibold">{rec.confidence}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Insights */}
      <section className="px-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="glass border-l-4 border-[#00f5a0]">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI Investment Insight
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Based on your age of {userProfile?.age} and {userProfile?.riskTolerance} risk tolerance, 
            our AI recommends a {userProfile?.riskTolerance === 'conservative' ? 'capital preservation' : 'growth'} 
            focused portfolio. {userProfile?.salary > 80000 ? 
              "With your income level, consider maximizing tax-advantaged accounts first." : 
              "Focus on building an emergency fund before aggressive investing."}
          </p>
        </div>
      </section>

      {/* Smart Projection Simulator */}
      <section className="px-6 mt-6 animate-slide-up" style={{ animationDelay: "0.35s" }}>
        <div className="glass border-l-4 border-[#00d9f5]">
          <h3 className="font-semibold mb-3">Scenario Simulator (What-if Engine)</h3>
          <p className="text-sm text-gray-400 mb-4">
            Projects future value using your recommendation mix and contribution plan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Monthly Contribution: ${monthlyContribution}</label>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Time Horizon: {projectionYears} years</label>
              <input
                type="range"
                min="1"
                max="30"
                value={projectionYears}
                onChange={(e) => setProjectionYears(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="bg-[#0b0f1a] border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Projected Portfolio Value</p>
            <p className="text-2xl font-bold text-[#00f5a0]">${Math.round(projectionValue).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">
              Based on weighted expected return of ~{averageExpectedReturn.toFixed(1)}% annually.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Radar + Rebalance Nudge */}
      {userProfile && (
        <section className="px-6 mt-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass border-l-4 border-purple-400">
            <h3 className="font-semibold mb-3">Risk Radar</h3>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">Risk Score</p>
              <p className="text-lg font-bold">{userProfile.riskScore}/10</p>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                style={{ width: `${(userProfile.riskScore || 1) * 10}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">
              Band: <span className="capitalize">{userProfile.riskBand}</span>
            </p>
            <p className="text-sm text-gray-300 mt-3">{rebalanceAlert}</p>
          </div>
        </section>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Recommendations;
