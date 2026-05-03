import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCategoryMeta } from "../../data/categories";

interface CategoryBadgeProps {
  category: string;
  /** Hide the icon on tight surfaces such as map popups. */
  iconless?: boolean;
}

/**
 * Display a category as a colored chip with the matching lucide icon.
 *
 * Looks up icon components from `lucide-react` by name so the categories
 * data file can stay icon-component-free.
 */
export function CategoryBadge({ category, iconless }: CategoryBadgeProps) {
  const meta = getCategoryMeta(category);
  const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[
    meta.icon
  ];

  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
        meta.badgeClass
      }
    >
      {!iconless && IconComponent ? (
        <IconComponent className="h-3.5 w-3.5" aria-hidden />
      ) : null}
      {meta.label}
    </span>
  );
}
