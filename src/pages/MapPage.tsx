import { useMemo, useState } from "react";
import { Filter, Inbox } from "lucide-react";
import type { CivicIssue, IssueStatus } from "../types/issue";
import { CATEGORIES } from "../data/categories";
import { SEVERITY_LEVELS } from "../data/severity";
import { STATUSES } from "../data/status";
import { CommunityMap } from "../components/map/CommunityMap";
import { IssueListItem } from "../components/issue/IssueListItem";

interface MapPageProps {
  issues: CivicIssue[];
  onUpdateStatus: (id: string, status: IssueStatus) => void;
}

const ALL = "all" as const;

type CategoryFilter = "all" | (typeof CATEGORIES)[number]["value"];
type SeverityFilter = "all" | (typeof SEVERITY_LEVELS)[number]["value"];
type StatusFilter = "all" | (typeof STATUSES)[number]["value"];

/**
 * Community map page combining the Leaflet map with a filterable list of
 * issues. The list and map share `selectedId` so clicking either one
 * highlights the same issue on the other side.
 */
export function MapPage({ issues, onUpdateStatus }: MapPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(ALL);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>(ALL);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL);
  const [selectedId, setSelectedId] = useState<string | undefined>(issues[0]?.id);

  const filtered = useMemo(() => {
    return issues.filter((issue) => {
      if (categoryFilter !== ALL && issue.category !== categoryFilter) return false;
      if (severityFilter !== ALL && issue.severity !== severityFilter) return false;
      if (statusFilter !== ALL && issue.status !== statusFilter) return false;
      return true;
    });
  }, [issues, categoryFilter, severityFilter, statusFilter]);

  const unmappedCount = issues.length - issues.filter(
    (issue) =>
      typeof issue.location.latitude === "number" &&
      typeof issue.location.longitude === "number",
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Community map
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Explore civic issues reported across the city. Click a marker or list
          item to focus on a specific report.
        </p>
      </header>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Filter className="h-4 w-4" aria-hidden />
          Filters
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <FilterSelect
            label="Category"
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value as CategoryFilter)}
            options={[
              { value: ALL, label: "All categories" },
              ...CATEGORIES.map((meta) => ({ value: meta.value, label: meta.label })),
            ]}
          />
          <FilterSelect
            label="Severity"
            value={severityFilter}
            onChange={(value) => setSeverityFilter(value as SeverityFilter)}
            options={[
              { value: ALL, label: "All severities" },
              ...SEVERITY_LEVELS.map((meta) => ({ value: meta.value, label: meta.label })),
            ]}
          />
          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as StatusFilter)}
            options={[
              { value: ALL, label: "All statuses" },
              ...STATUSES.map((meta) => ({ value: meta.value, label: meta.label })),
            ]}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              {filtered.length} issue{filtered.length === 1 ? "" : "s"}
            </h2>
            {unmappedCount > 0 && (
              <span className="text-xs text-slate-500">
                {unmappedCount} without coordinates
              </span>
            )}
          </div>
          <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <Inbox className="h-6 w-6 text-slate-400" aria-hidden />
                <p className="text-sm font-semibold text-slate-700">
                  No issues match your filters
                </p>
                <p className="text-xs text-slate-500">
                  Try clearing one of the filters above.
                </p>
              </div>
            ) : (
              filtered.map((issue) => (
                <div key={issue.id} className="space-y-2">
                  <IssueListItem
                    issue={issue}
                    active={issue.id === selectedId}
                    onSelect={() => setSelectedId(issue.id)}
                  />
                  <label
                    htmlFor={`status-${issue.id}`}
                    className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 shadow-sm"
                  >
                    Update status
                    <select
                      id={`status-${issue.id}`}
                      value={issue.status}
                      onChange={(event) =>
                        onUpdateStatus(issue.id, event.target.value as IssueStatus)
                      }
                      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      {STATUSES.map((meta) => (
                        <option key={meta.value} value={meta.value}>
                          {meta.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="order-1 h-[420px] lg:order-2 lg:col-span-3 lg:h-[620px]">
          <CommunityMap
            issues={filtered}
            selectedId={selectedId}
            onSelect={(issue) => setSelectedId(issue.id)}
          />
        </div>
      </div>
    </div>
  );
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <label htmlFor={id} className="block text-xs font-medium text-slate-600">
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
