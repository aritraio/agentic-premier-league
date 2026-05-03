import { MapPin } from "lucide-react";
import type { CivicIssue } from "../../types/issue";
import { CategoryBadge } from "../badges/CategoryBadge";
import { SeverityBadge } from "../badges/SeverityBadge";
import { StatusBadge } from "../badges/StatusBadge";

interface IssueListItemProps {
  issue: CivicIssue;
  active?: boolean;
  onSelect?: (issue: CivicIssue) => void;
}

/**
 * Compact issue summary used by the map sidebar and the landing-page demo
 * grid. Designed to be clickable so it can drive the map selection.
 */
export function IssueListItem({ issue, active, onSelect }: IssueListItemProps) {
  const Wrapper = onSelect ? "button" : "div";

  return (
    <Wrapper
      type={onSelect ? "button" : undefined}
      onClick={onSelect ? () => onSelect(issue) : undefined}
      className={
        "flex w-full flex-col gap-2 rounded-xl border bg-white p-4 text-left shadow-sm transition-colors " +
        (active
          ? "border-emerald-400 ring-2 ring-emerald-200"
          : "border-slate-200 " + (onSelect ? "hover:border-emerald-200 hover:bg-emerald-50/40" : ""))
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={issue.category} />
        <SeverityBadge severity={issue.severity} compact />
        <StatusBadge status={issue.status} />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{issue.title}</h3>
      <p className="line-clamp-2 text-xs text-slate-600">{issue.summary}</p>
      <p className="flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden />
        {issue.location.text}
      </p>
    </Wrapper>
  );
}
