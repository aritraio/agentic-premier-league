/**
 * NGO / RWA workspace mode.
 *
 * Allows the app to be configured for a specific organisation that only
 * cares about certain wards or issue categories. When active, the map
 * and dashboard show a filtered view and the UI displays the org name.
 *
 * Configuration is stored in LocalStorage.
 */

import type { IssueCategory, CivicIssue } from "../types/issue";

export interface WorkspaceConfig {
  isActive: boolean;
  organizationName: string;
  focusWards: string[];
  focusCategories: IssueCategory[];
}

const STORAGE_KEY = "parapulse.workspace.v1";

const DEFAULT_CONFIG: WorkspaceConfig = {
  isActive: false,
  organizationName: "",
  focusWards: [],
  focusCategories: [],
};

export function loadWorkspaceConfig(): WorkspaceConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<WorkspaceConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveWorkspaceConfig(config: WorkspaceConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    console.warn("Could not save workspace config.");
  }
}

/**
 * Filter issues based on the active workspace configuration.
 * If the workspace is not active or has no filters, returns all issues.
 */
export function filterByWorkspace(
  issues: CivicIssue[],
  config: WorkspaceConfig,
): CivicIssue[] {
  if (!config.isActive) return issues;

  return issues.filter((issue) => {
    if (
      config.focusWards.length > 0 &&
      issue.ward &&
      !config.focusWards.some((w) =>
        issue.ward!.toLowerCase().includes(w.toLowerCase()),
      )
    ) {
      return false;
    }
    if (
      config.focusCategories.length > 0 &&
      !config.focusCategories.includes(issue.category)
    ) {
      return false;
    }
    return true;
  });
}
