import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Recommendations from "./pages/Recommendations";
import Explore from "./pages/Explore";
import QuickActions from "./components/QuickActions";
import CategoryDetails from "./pages/CategoryDetails";
import CompareCategories from "./pages/CompareCategories";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // No keyboard shortcut here anymore; palette is opened via "Name Navigator" button.
    return undefined;
  }, []);

  const actions = useMemo(() => {
    const baseActions = [
      {
        label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        hint: "Theme preference is saved automatically.",
        onSelect: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      },
    ];

    if (!isAuthenticated) {
      return [
        ...baseActions,
        { label: "Go to Login", hint: "/login", onSelect: () => navigate("/login") },
        { label: "Go to Register", hint: "/register", onSelect: () => navigate("/register") },
      ];
    }

    return [
      ...baseActions,
      { label: "Open Explore", hint: "/explore", onSelect: () => navigate("/explore") },
      { label: "Open Onboarding", hint: "/onboarding", onSelect: () => navigate("/onboarding") },
      { label: "Open Recommendations", hint: "/recommendations", onSelect: () => navigate("/recommendations") },
      { label: "Open Dashboard", hint: "/dashboard", onSelect: () => navigate("/dashboard") },
      {
        label: "Logout",
        hint: "Clear session and return to login.",
        onSelect: () => {
          localStorage.removeItem("token");
          navigate("/login");
        },
      },
    ];
  }, [isAuthenticated, navigate, theme]);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className="glass !px-4 !py-2 text-sm font-medium"
          title="Toggle dark/light mode"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          onClick={() => setPaletteOpen(true)}
          className="glass !px-4 !py-2 text-sm font-medium"
          title="navigator"
        >
          navigator
        </button>
      </div>

      <div key={location.pathname} className="animate-fade-in">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/explore"
            element={isAuthenticated ? <Explore /> : <Navigate to="/login" />}
          />
          <Route
            path="/explore/compare"
            element={isAuthenticated ? <CompareCategories /> : <Navigate to="/login" />}
          />
          <Route
            path="/explore/:slug"
            element={isAuthenticated ? <CategoryDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/onboarding"
            element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" />}
          />
          <Route
            path="/recommendations"
            element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/explore" : "/login"} />}
          />
        </Routes>
      </div>

      <QuickActions open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;