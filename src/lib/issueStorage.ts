import { DEMO_ISSUES } from "../data/demoIssues";
import type { CivicIssue } from "../types/issue";
import { withCoordinates } from "./locations";

const STORAGE_KEY = "parapulse.issues.v1";

function normalizeIssues(issues: CivicIssue[]): CivicIssue[] {
  return issues.map((issue) => ({
    ...issue,
    location: withCoordinates(issue.location),
  }));
}

function isCivicIssueArray(value: unknown): value is CivicIssue[] {
  return Array.isArray(value);
}

export function loadIssues(): CivicIssue[] {
  if (typeof window === "undefined") return normalizeIssues(DEMO_ISSUES);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeIssues(DEMO_ISSUES);
    const parsed: unknown = JSON.parse(raw);
    if (!isCivicIssueArray(parsed) || parsed.length === 0) {
      return normalizeIssues(DEMO_ISSUES);
    }
    return normalizeIssues(parsed);
  } catch (error) {
    console.warn("Could not load saved issues; using demo issues.", error);
    return normalizeIssues(DEMO_ISSUES);
  }
}

export function saveIssues(issues: CivicIssue[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeIssues(issues)));
  } catch (error) {
    console.warn("Could not save issues to local storage.", error);
  }
}

export function prepareIssueForStorage(issue: CivicIssue): CivicIssue {
  return {
    ...issue,
    location: withCoordinates(issue.location),
  };
}
