function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home" },
    { id: "portfolio", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Portfolio" },
    { id: "ai", icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "AI" },
    { id: "profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0b0f1a]/80 backdrop-blur-xl border-t border-gray-800/80 px-4 py-3">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeTab === tab.id
                ? "text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/25"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <svg className={`w-6 h-6 ${activeTab === tab.id ? "drop-shadow-[0_0_8px_rgba(0,245,160,0.55)]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;