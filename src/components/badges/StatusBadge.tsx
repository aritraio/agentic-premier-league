import { getStatusMeta } from "../../data/status";

interface StatusBadgeProps {
  status: string;
}

/** Plain status chip used in lists, cards, and the detail view. */
export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = getStatusMeta(status);
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
        meta.badgeClass
      }
    >
      {meta.label}
    </span>
  );
}
