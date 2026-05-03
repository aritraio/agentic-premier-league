import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { ReportPage } from "./pages/ReportPage";
import { MapPage } from "./pages/MapPage";
import { useHashRoute } from "./lib/router";
import {
  loadIssues,
  prepareIssueForStorage,
  saveIssues,
} from "./lib/issueStorage";
import type { CivicIssue, IssueStatus } from "./types/issue";

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
  const [issues, setIssues] = useState<CivicIssue[]>(loadIssues);

  useEffect(() => {
    saveIssues(issues);
  }, [issues]);

  const handleSaveIssue = useCallback((issue: CivicIssue) => {
    setIssues((existing) => {
      // Avoid duplicates if the same generated issue is saved twice.
      if (existing.some((value) => value.id === issue.id)) return existing;
      return [prepareIssueForStorage(issue), ...existing];
    });
  }, []);

  const handleUpdateIssueStatus = useCallback(
    (id: string, status: IssueStatus) => {
      setIssues((existing) =>
        existing.map((issue) =>
          issue.id === id ? { ...issue, status } : issue,
        ),
      );
    },
    [],
  );

  return (
    <div className="flex min-h-full flex-col bg-transparent">
      <Navbar current={route} />
      <main className="flex-1">
        {route === "landing" && <LandingPage />}
        {route === "report" && <ReportPage onSaveIssue={handleSaveIssue} />}
        {route === "map" && (
          <MapPage issues={issues} onUpdateStatus={handleUpdateIssueStatus} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
