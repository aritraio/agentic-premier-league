import type { IssueSeverity } from "../types/issue";

/**
 * Display + semantic metadata for a severity level.
 *
 * `meaning` is intentionally written in plain English so it can be reused
 * verbatim in the pitch, in tooltips, and in the AI system prompt.
 */
export interface SeverityMeta {
  value: IssueSeverity;
  label: string;
  meaning: string;
  /** Tailwind classes for the severity badge (background + text). */
  badgeClass: string;
  /** Map marker color (used by Leaflet markers and chart accents). */
  markerColor: string;
  /** Sort order, lowest = least urgent. Useful for sorting issue lists. */
  rank: number;
}

/**
 * Ordered list of severity levels used across the app.
 *
 * Order is least urgent -> most urgent. Keep this stable; UI filters
 * and sorting depend on it.
 */
export const SEVERITY_LEVELS: SeverityMeta[] = [
  {
    value: "Low",
    label: "Low",
    meaning:
      "Minor inconvenience. No immediate risk to people or property. Can be fixed during routine maintenance.",
    badgeClass: "bg-emerald-100 text-emerald-800",
    markerColor: "#10b981",
    rank: 1,
  },
  {
    value: "Medium",
    label: "Medium",
    meaning:
      "Disrupts daily life for residents. Should be addressed soon to prevent it from getting worse.",
    badgeClass: "bg-yellow-100 text-yellow-800",
    markerColor: "#eab308",
    rank: 2,
  },
  {
    value: "High",
    label: "High",
    meaning:
      "Creates real safety or health risk for pedestrians, commuters, or nearby residents. Needs prompt action.",
    badgeClass: "bg-orange-100 text-orange-800",
    markerColor: "#f97316",
    rank: 3,
  },
  {
    value: "Urgent",
    label: "Urgent",
    meaning:
      "Immediate danger. People can get hurt right now. Requires same-day intervention by the responsible authority.",
    badgeClass: "bg-red-100 text-red-800",
    markerColor: "#dc2626",
    rank: 4,
  },
];

/** Quick lookup table by severity value. */
export const SEVERITY_BY_VALUE: Record<IssueSeverity, SeverityMeta> =
  SEVERITY_LEVELS.reduce((acc, meta) => {
    acc[meta.value] = meta;
    return acc;
  }, {} as Record<IssueSeverity, SeverityMeta>);

/**
 * Look up severity metadata, falling back to `Medium` when the AI returns
 * an unexpected value.
 */
export function getSeverityMeta(value: string): SeverityMeta {
  return (
    SEVERITY_BY_VALUE[value as IssueSeverity] ?? SEVERITY_BY_VALUE.Medium
  );
}
