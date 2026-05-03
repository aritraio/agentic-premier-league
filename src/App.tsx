import { useCallback, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { ReportPage } from "./pages/ReportPage";
import { MapPage } from "./pages/MapPage";
import { useHashRoute } from "./lib/router";
import { DEMO_ISSUES } from "./data/demoIssues";
import type { CivicIssue } from "./types/issue";

/**
 * Top-level shell that owns:
 *   - the active route (hash-based)
 *   - the in-memory issue list (seeded from demo data)
 *
 * Phase 6 will replace the issue list with LocalStorage / Supabase
 * persistence; the prop signatures are already shaped for that.
 */
function App() {
  const route = useHashRoute();
  const [issues, setIssues] = useState<CivicIssue[]>(() => DEMO_ISSUES);

  const handleSaveIssue = useCallback((issue: CivicIssue) => {
    setIssues((existing) => {
      // Avoid duplicates if the same generated issue is saved twice.
      if (existing.some((value) => value.id === issue.id)) return existing;
      return [issue, ...existing];
    });
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <Navbar current={route} />
      <main className="flex-1">
        {route === "landing" && <LandingPage />}
        {route === "report" && <ReportPage onSaveIssue={handleSaveIssue} />}
        {route === "map" && <MapPage issues={issues} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
