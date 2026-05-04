/**
 * Ward-level analytics and duplicate issue clustering.
 *
 * All computation is client-side from the in-memory issue list.
 * No API calls are made.
 */

import type { CivicIssue, IssueCategory, IssueSeverity } from "../types/issue";

/* ────────────────────── Ward Analytics ────────────────────── */

export interface WardStats {
  ward: string;
  total: number;
  bySeverity: Record<IssueSeverity, number>;
  byCategory: Partial<Record<IssueCategory, number>>;
  byStatus: Record<string, number>;
}

/**
 * Derive the ward name from a location text using keyword matching.
 * Falls back to "Unknown" if no known ward is detected.
 */
const WARD_MAP: Array<{ keywords: string[]; ward: string }> = [
  { keywords: ["sector v", "sector 5", "salt lake", "bidhannagar"], ward: "Ward 108 (Salt Lake)" },
  { keywords: ["gariahat"], ward: "Ward 68 (Gariahat)" },
  { keywords: ["jadavpur", "8b"], ward: "Ward 93 (Jadavpur)" },
  { keywords: ["park circus"], ward: "Ward 64 (Park Circus)" },
  { keywords: ["dhakuria"], ward: "Ward 92 (Dhakuria)" },
  { keywords: ["esplanade", "dharmatala"], ward: "Ward 44 (Esplanade)" },
  { keywords: ["howrah"], ward: "Howrah" },
  { keywords: ["new town", "rajarhat"], ward: "New Town" },
  { keywords: ["kalighat"], ward: "Ward 82 (Kalighat)" },
  { keywords: ["shyambazar"], ward: "Ward 6 (Shyambazar)" },
  { keywords: ["tollygunge", "tollygunj"], ward: "Ward 96 (Tollygunge)" },
  { keywords: ["behala"], ward: "Ward 120 (Behala)" },
  { keywords: ["ballygunge"], ward: "Ward 66 (Ballygunge)" },
];

export function deriveWard(locationText: string): string {
  const normalized = locationText.toLowerCase();
  const match = WARD_MAP.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw)),
  );
  return match?.ward ?? "Other";
}

export function computeWardStats(issues: CivicIssue[]): WardStats[] {
  const map = new Map<string, WardStats>();

  for (const issue of issues) {
    const ward = issue.ward || deriveWard(issue.location.text);
    let stats = map.get(ward);
    if (!stats) {
      stats = {
        ward,
        total: 0,
        bySeverity: { Low: 0, Medium: 0, High: 0, Urgent: 0 },
        byCategory: {},
        byStatus: {},
      };
      map.set(ward, stats);
    }
    stats.total += 1;
    stats.bySeverity[issue.severity] += 1;
    stats.byCategory[issue.category] = (stats.byCategory[issue.category] ?? 0) + 1;
    stats.byStatus[issue.status] = (stats.byStatus[issue.status] ?? 0) + 1;
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

/* ────────────────────── Category Breakdown ────────────────────── */

export interface CategoryBreakdown {
  category: IssueCategory;
  count: number;
  percentage: number;
}

export function computeCategoryBreakdown(issues: CivicIssue[]): CategoryBreakdown[] {
  const counts: Partial<Record<IssueCategory, number>> = {};
  for (const issue of issues) {
    counts[issue.category] = (counts[issue.category] ?? 0) + 1;
  }
  const total = issues.length || 1;
  return Object.entries(counts)
    .map(([category, count]) => ({
      category: category as IssueCategory,
      count: count ?? 0,
      percentage: Math.round(((count ?? 0) / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/* ────────────────────── Duplicate Clustering ────────────────────── */

export interface DuplicateCluster {
  /** The "canonical" issue (first encountered). */
  primary: CivicIssue;
  /** Other issues considered duplicates. */
  duplicates: CivicIssue[];
  /** Jaccard similarity score (0–1) of the best match. */
  similarity: number;
}

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((t) => t.length > 2),
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Find groups of issues that appear to describe the same problem.
 * Uses Jaccard similarity on the tokenized title + location text.
 */
export function findDuplicateClusters(
  issues: CivicIssue[],
  threshold = 0.45,
): DuplicateCluster[] {
  const tokenCache = new Map<string, Set<string>>();
  const getTokens = (issue: CivicIssue) => {
    let cached = tokenCache.get(issue.id);
    if (!cached) {
      cached = tokenize(`${issue.title} ${issue.location.text} ${issue.summary}`);
      tokenCache.set(issue.id, cached);
    }
    return cached;
  };

  const clustered = new Set<string>();
  const clusters: DuplicateCluster[] = [];

  for (let i = 0; i < issues.length; i++) {
    if (clustered.has(issues[i].id)) continue;
    const duplicates: CivicIssue[] = [];
    let bestSim = 0;

    for (let j = i + 1; j < issues.length; j++) {
      if (clustered.has(issues[j].id)) continue;
      // Only compare same-category issues
      if (issues[i].category !== issues[j].category) continue;
      const sim = jaccardSimilarity(getTokens(issues[i]), getTokens(issues[j]));
      if (sim >= threshold) {
        duplicates.push(issues[j]);
        clustered.add(issues[j].id);
        bestSim = Math.max(bestSim, sim);
      }
    }

    if (duplicates.length > 0) {
      clustered.add(issues[i].id);
      clusters.push({
        primary: issues[i],
        duplicates,
        similarity: bestSim,
      });
    }
  }

  return clusters;
}
