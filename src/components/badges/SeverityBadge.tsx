import { AlertTriangle } from "lucide-react";
import { getSeverityMeta } from "../../data/severity";

interface SeverityBadgeProps {
  severity: string;
  /** When `true`, show only a colored dot with the label (no icon). */
  compact?: boolean;
}

/** Colored severity chip with an optional alert icon. */
export function SeverityBadge({ severity, compact }: SeverityBadgeProps) {
  const meta = getSeverityMeta(severity);
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold " +
        meta.badgeClass
      }
    >
      {compact ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: meta.markerColor }}
          aria-hidden
        />
      ) : (
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
      )}
      {meta.label}
    </span>
  );
}
