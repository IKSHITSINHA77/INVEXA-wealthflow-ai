import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ age, salary, riskTolerance, investmentGoal }),
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate("/recommendations");
      } else {
        setError(data.msg || "Failed to save profile");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] to-[#1a1f2e] flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step 1 of 2</span>
            <span>Profile Setup</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div className="h-full w-1/2 bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] rounded-full"></div>
          </div>
        </div>

        <div className="glass p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0b0f1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Invexa!</h2>
            <p className="text-gray-400">Let's personalize your AI investment experience</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f5a0] focus:ring-1 focus:ring-[#00f5a0] transition-all"
                  placeholder="25"
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Annual Salary ($)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f5a0] focus:ring-1 focus:ring-[#00f5a0] transition-all"
                  placeholder="75000"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Tolerance</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "conservative", label: "Conservative", desc: "Low risk" },
                  { value: "moderate", label: "Moderate", desc: "Balanced" },
                  { value: "aggressive", label: "Aggressive", desc: "High risk" },
                  { value: "speculative", label: "Speculative", desc: "Very high risk" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRiskTolerance(option.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      riskTolerance === option.value
                        ? "border-[#00f5a0] bg-[#00f5a0]/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Investment Goal</label>
              <select
                value={investmentGoal}
                onChange={(e) => setInvestmentGoal(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f5a0] focus:ring-1 focus:ring-[#00f5a0] transition-all"
                required
              >
                <option value="">Select your primary goal</option>
                <option value="wealth">Long-term Wealth Building</option>
                <option value="retirement">Retirement Planning</option>
                <option value="income">Passive Income</option>
                <option value="savings">Short-term Savings</option>
                <option value="growth">Aggressive Growth</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !riskTolerance}
              className="w-full bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] text-[#0b0f1a] font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing Profile...
                </span>
              ) : (
                "Get AI Recommendations"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
