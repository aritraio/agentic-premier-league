/**
 * Client-side trend summaries computed from the local issue list.
 *
 * No API calls — works entirely from the in-memory data.
 */

import type { CivicIssue } from "../types/issue";
import { computeCategoryBreakdown, computeWardStats } from "./analytics";

export interface TrendSummary {
  totalIssues: number;
  issuesThisWeek: number;
  topCategory: string;
  topCategoryCount: number;
  mostUrgentArea: string;
  mostUrgentAreaCount: number;
  resolutionRate: number;
  highSeverityCount: number;
  averageVerifications: number;
}

function isWithinLastWeek(dateString: string): boolean {
  const date = new Date(dateString);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return date >= weekAgo;
}

export function computeTrendSummary(issues: CivicIssue[]): TrendSummary {
  const categories = computeCategoryBreakdown(issues);
  const wards = computeWardStats(issues);

  const thisWeek = issues.filter((i) => isWithinLastWeek(i.createdAt));
  const resolved = issues.filter((i) => i.status === "Resolved");
  const highSeverity = issues.filter(
    (i) => i.severity === "High" || i.severity === "Urgent",
  );

  // Find the ward with the most urgent/high severity issues
  const urgentByWard = wards.map((w) => ({
    ward: w.ward,
    urgentCount: (w.bySeverity.High || 0) + (w.bySeverity.Urgent || 0),
  }));
  urgentByWard.sort((a, b) => b.urgentCount - a.urgentCount);

  const totalVerifications = issues.reduce(
    (sum, i) => sum + (i.verificationCount ?? 0),
    0,
  );

  return {
    totalIssues: issues.length,
    issuesThisWeek: thisWeek.length,
    topCategory: categories[0]?.category ?? "N/A",
    topCategoryCount: categories[0]?.count ?? 0,
    mostUrgentArea: urgentByWard[0]?.ward ?? "N/A",
    mostUrgentAreaCount: urgentByWard[0]?.urgentCount ?? 0,
    resolutionRate:
      issues.length > 0 ? Math.round((resolved.length / issues.length) * 100) : 0,
    highSeverityCount: highSeverity.length,
    averageVerifications:
      issues.length > 0
        ? Math.round((totalVerifications / issues.length) * 10) / 10
        : 0,
  };
}
