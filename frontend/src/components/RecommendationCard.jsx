function RecommendationCard({ title, symbol, confidence, type }) {
  const typeColors = {
    growth: "text-green-400 border-green-400/30",
    sustainable: "text-emerald-400 border-emerald-400/30",
    stable: "text-blue-400 border-blue-400/30",
    volatile: "text-orange-400 border-orange-400/30",
  };

  const typeLabels = {
    growth: "Growth",
    sustainable: "Green",
    stable: "Stable",
    volatile: "High Risk",
  };

  return (
    <div className={`glass ${typeColors[type]} border hover:scale-[1.03] transition-all duration-300 cursor-pointer group`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-sm group-hover:text-white">{title}</p>
          <p className="text-xs text-gray-400">{symbol}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border ${typeColors[type]}`}>
          {typeLabels[type]}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">AI Confidence</span>
          <span className="text-sm font-semibold">{confidence}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] rounded-full shadow-[0_0_12px_rgba(0,245,160,0.45)]"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;