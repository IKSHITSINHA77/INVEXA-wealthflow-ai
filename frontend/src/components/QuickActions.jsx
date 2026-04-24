import { useEffect } from "react";

function QuickActions({ open, onClose, actions }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="max-w-xl mx-auto mt-20 glass border border-white/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Quick Actions</h3>
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-white">
            Esc
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-4">Use this command palette to move quickly across the app.</p>
        <div className="space-y-2">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                action.onSelect();
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <p className="font-medium text-sm">{action.label}</p>
              {action.hint && <p className="text-xs text-gray-400 mt-1">{action.hint}</p>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActions;
