import type { IssueStatus } from "../types/issue";

/** Display metadata for an issue lifecycle status. */
export interface StatusMeta {
  value: IssueStatus;
  label: string;
  description: string;
  /** Tailwind classes for the status badge (background + text). */
  badgeClass: string;
  /** Sort order in the lifecycle (lowest = newest). */
  rank: number;
}

/**
 * Ordered list of statuses used in dropdowns, filters, and badges.
 *
 * Order reflects the natural lifecycle of a report and is used to render
 * the status timeline in the issue detail view.
 */
export const STATUSES: StatusMeta[] = [
  {
    value: "New",
    label: "New",
    description: "Just generated. Not yet shared with any authority.",
    badgeClass: "bg-slate-100 text-slate-700",
    rank: 1,
  },
  {
    value: "Reported",
    label: "Reported",
    description: "Sent to the suggested authority or shared with the community.",
    badgeClass: "bg-blue-100 text-blue-800",
    rank: 2,
  },
  {
    value: "In progress",
    label: "In progress",
    description: "Authority has acknowledged the issue and work has started.",
    badgeClass: "bg-amber-100 text-amber-800",
    rank: 3,
  },
  {
    value: "Resolved",
    label: "Resolved",
    description: "Issue is fixed. Volunteers can verify on the ground.",
    badgeClass: "bg-emerald-100 text-emerald-800",
    rank: 4,
  },
];

/** Quick lookup table by status value. */
export const STATUS_BY_VALUE: Record<IssueStatus, StatusMeta> = STATUSES.reduce(
  (acc, meta) => {
    acc[meta.value] = meta;
    return acc;
  },
  {} as Record<IssueStatus, StatusMeta>,
);

/** Look up status metadata, falling back to `New`. */
export function getStatusMeta(value: string): StatusMeta {
  return STATUS_BY_VALUE[value as IssueStatus] ?? STATUS_BY_VALUE.New;
}
