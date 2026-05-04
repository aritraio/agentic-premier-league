import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WorkspaceBanner } from "./components/layout/WorkspaceBanner";
import { LandingPage } from "./pages/LandingPage";
import { ReportPage } from "./pages/ReportPage";
import { MapPage } from "./pages/MapPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AuthorityDirectoryPage } from "./pages/AuthorityDirectoryPage";
import { useHashRoute } from "./lib/router";
import {
  loadIssues,
  prepareIssueForStorage,
  saveIssues,
} from "./lib/issueStorage";
import {
  loadWorkspaceConfig,
  saveWorkspaceConfig,
  filterByWorkspace,
  type WorkspaceConfig,
} from "./lib/workspaceMode";
import { deriveWard } from "./lib/analytics";
import type { CivicIssue, IssueStatus } from "./types/issue";

/**
 * Top-level shell that owns:
 *   - the active route (hash-based)
 *   - the in-memory issue list (seeded from demo data)
 *   - workspace mode configuration
 */
function App() {
  const route = useHashRoute();
  const [issues, setIssues] = useState<CivicIssue[]>(loadIssues);
  const [workspace, setWorkspace] = useState<WorkspaceConfig>(loadWorkspaceConfig);

  useEffect(() => {
    saveIssues(issues);
  }, [issues]);

  useEffect(() => {
    saveWorkspaceConfig(workspace);
  }, [workspace]);

  const handleSaveIssue = useCallback((issue: CivicIssue) => {
    setIssues((existing) => {
      // Avoid duplicates if the same generated issue is saved twice.
      if (existing.some((value) => value.id === issue.id)) return existing;
      // Enrich with ward if not already set
      const enriched: CivicIssue = {
        ...prepareIssueForStorage(issue),
        ward: issue.ward || deriveWard(issue.location.text),
      };
      return [enriched, ...existing];
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

  // Apply workspace filter for map and dashboard views
  const filteredIssues = filterByWorkspace(issues, workspace);

  return (
    <div className="flex min-h-full flex-col bg-transparent">
      <Navbar current={route} />
      <WorkspaceBanner config={workspace} onUpdate={setWorkspace} />
      <main className="flex-1">
        {route === "landing" && <LandingPage />}
        {route === "report" && <ReportPage onSaveIssue={handleSaveIssue} />}
        {route === "map" && (
          <MapPage issues={filteredIssues} onUpdateStatus={handleUpdateIssueStatus} />
        )}
        {route === "dashboard" && <DashboardPage issues={filteredIssues} />}
        {route === "directory" && <AuthorityDirectoryPage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
