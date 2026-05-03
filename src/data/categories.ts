import type { IssueCategory } from "../types/issue";

/**
 * Display metadata for an issue category.
 *
 * `icon` is the name of a `lucide-react` icon and is resolved at render time
 * so this module stays pure data and can be safely imported anywhere.
 */
export interface CategoryMeta {
  value: IssueCategory;
  label: string;
  description: string;
  /** Name of the lucide-react icon used for this category. */
  icon: string;
  /** Tailwind classes for the category badge (background + text). */
  badgeClass: string;
}

/**
 * Ordered list of categories supported in the MVP.
 *
 * Order matters: it controls the order in dropdowns and filter chips.
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    value: "Waterlogging",
    label: "Waterlogging",
    description: "Flooded roads, stagnant rainwater, blocked underpasses.",
    icon: "Droplets",
    badgeClass: "bg-sky-100 text-sky-800",
  },
  {
    value: "Garbage",
    label: "Garbage",
    description: "Uncollected trash, overflowing bins, illegal dumping.",
    icon: "Trash2",
    badgeClass: "bg-amber-100 text-amber-800",
  },
  {
    value: "Streetlight",
    label: "Streetlight",
    description: "Broken or non-working streetlights creating dark spots.",
    icon: "Lightbulb",
    badgeClass: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "Road Damage",
    label: "Road Damage",
    description: "Potholes, cracked roads, broken footpaths.",
    icon: "Construction",
    badgeClass: "bg-orange-100 text-orange-800",
  },
  {
    value: "Drainage",
    label: "Drainage",
    description: "Open drains, blocked sewers, sewage overflow.",
    icon: "Waves",
    badgeClass: "bg-teal-100 text-teal-800",
  },
  {
    value: "Public Safety",
    label: "Public Safety",
    description: "Hazards that put pedestrians or commuters at risk.",
    icon: "ShieldAlert",
    badgeClass: "bg-rose-100 text-rose-800",
  },
  {
    value: "Accessibility",
    label: "Accessibility",
    description: "Barriers for people with disabilities or limited mobility.",
    icon: "Accessibility",
    badgeClass: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "Other",
    label: "Other",
    description: "Civic issues that do not fit the categories above.",
    icon: "CircleHelp",
    badgeClass: "bg-slate-100 text-slate-700",
  },
];

/** Quick lookup table by category value. */
export const CATEGORY_BY_VALUE: Record<IssueCategory, CategoryMeta> =
  CATEGORIES.reduce((acc, meta) => {
    acc[meta.value] = meta;
    return acc;
  }, {} as Record<IssueCategory, CategoryMeta>);

/**
 * Look up category metadata, falling back to the `Other` bucket so the UI
 * never crashes on an unexpected value coming from the AI.
 */
export function getCategoryMeta(value: string): CategoryMeta {
  return (
    CATEGORY_BY_VALUE[value as IssueCategory] ?? CATEGORY_BY_VALUE.Other
  );
}
