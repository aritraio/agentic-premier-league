import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Target,
  Copy,
  Activity,
} from "lucide-react";
import type { CivicIssue } from "../types/issue";
import { computeWardStats, computeCategoryBreakdown, findDuplicateClusters } from "../lib/analytics";
import { computeTrendSummary } from "../lib/trendSummary";
import { getCategoryMeta } from "../data/categories";
import { CategoryBadge } from "../components/badges/CategoryBadge";
import { SeverityBadge } from "../components/badges/SeverityBadge";

interface DashboardPageProps {
  issues: CivicIssue[];
}

/**
 * Volunteer dashboard with ward-level analytics, trend summaries,
 * category breakdowns, and duplicate issue detection.
 */
export function DashboardPage({ issues }: DashboardPageProps) {
  const trends = computeTrendSummary(issues);
  const wardStats = computeWardStats(issues);
  const categoryBreakdown = computeCategoryBreakdown(issues);
  const duplicates = findDuplicateClusters(issues);

  const statusCounts = {
    New: issues.filter((i) => i.status === "New").length,
    Reported: issues.filter((i) => i.status === "Reported").length,
    "In progress": issues.filter((i) => i.status === "In progress").length,
    Resolved: issues.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 mb-1">
          <Activity className="h-3.5 w-3.5" aria-hidden />
          Community Intelligence
        </div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Volunteer Dashboard
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Real-time analytics from community-reported issues. All data is
          computed locally from your saved reports.
        </p>
      </header>

      {/* ── Trend Cards ── */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TrendCard
          icon={<Layers className="h-5 w-5 text-emerald-600" />}
          label="Total issues"
          value={trends.totalIssues.toString()}
          detail={`${trends.issuesThisWeek} this week`}
        />
        <TrendCard
          icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
          label="High / Urgent"
          value={trends.highSeverityCount.toString()}
          detail={`Most urgent: ${trends.mostUrgentArea}`}
        />
        <TrendCard
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          label="Resolution rate"
          value={`${trends.resolutionRate}%`}
          detail={`${statusCounts.Resolved} resolved`}
        />
        <TrendCard
          icon={<TrendingUp className="h-5 w-5 text-sky-500" />}
          label="Top category"
          value={trends.topCategory}
          detail={`${trends.topCategoryCount} reports`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Status Breakdown ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Clock className="h-4 w-4 text-slate-400" aria-hidden />
            Issue Status
          </h2>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = issues.length > 0 ? (count / issues.length) * 100 : 0;
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{status}</span>
                    <span className="text-slate-500">
                      {count} ({Math.round(pct)}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Category Breakdown ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <BarChart3 className="h-4 w-4 text-slate-400" aria-hidden />
            Categories
          </h2>
          <div className="space-y-3">
            {categoryBreakdown.map((item) => {
              const meta = getCategoryMeta(item.category);
              return (
                <div key={item.category}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <CategoryBadge category={item.category} />
                    </span>
                    <span className="text-slate-500">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${meta.badgeClass.includes("sky") ? "bg-sky-400" : meta.badgeClass.includes("amber") ? "bg-amber-400" : meta.badgeClass.includes("yellow") ? "bg-yellow-400" : meta.badgeClass.includes("orange") ? "bg-orange-400" : meta.badgeClass.includes("teal") ? "bg-teal-400" : meta.badgeClass.includes("rose") ? "bg-rose-400" : meta.badgeClass.includes("indigo") ? "bg-indigo-400" : "bg-slate-400"}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {categoryBreakdown.length === 0 && (
              <p className="text-xs text-slate-500">No issues reported yet.</p>
            )}
          </div>
        </div>

        {/* ── Ward-Level Analytics ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <MapPin className="h-4 w-4 text-slate-400" aria-hidden />
            Ward-Level Breakdown
          </h2>
          {wardStats.length === 0 ? (
            <p className="text-xs text-slate-500">No ward data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-500">
                    <th className="pb-2 pr-4 font-medium">Ward</th>
                    <th className="pb-2 pr-4 font-medium">Total</th>
                    <th className="pb-2 pr-4 font-medium">Low</th>
                    <th className="pb-2 pr-4 font-medium">Medium</th>
                    <th className="pb-2 pr-4 font-medium">High</th>
                    <th className="pb-2 pr-4 font-medium">Urgent</th>
                    <th className="pb-2 font-medium">Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {wardStats.map((ward) => {
                    const maxTotal = wardStats[0]?.total ?? 1;
                    const pct = (ward.total / maxTotal) * 100;
                    return (
                      <tr
                        key={ward.ward}
                        className="border-b border-slate-50 text-slate-700"
                      >
                        <td className="py-2 pr-4 font-medium">{ward.ward}</td>
                        <td className="py-2 pr-4">{ward.total}</td>
                        <td className="py-2 pr-4">{ward.bySeverity.Low}</td>
                        <td className="py-2 pr-4">{ward.bySeverity.Medium}</td>
                        <td className="py-2 pr-4">{ward.bySeverity.High}</td>
                        <td className="py-2 pr-4">{ward.bySeverity.Urgent}</td>
                        <td className="py-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="flex h-full rounded-full"
                              style={{ width: `${pct}%` }}
                            >
                              {ward.bySeverity.Low > 0 && (
                                <div
                                  className="h-full bg-emerald-400"
                                  style={{
                                    width: `${(ward.bySeverity.Low / ward.total) * 100}%`,
                                  }}
                                />
                              )}
                              {ward.bySeverity.Medium > 0 && (
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{
                                    width: `${(ward.bySeverity.Medium / ward.total) * 100}%`,
                                  }}
                                />
                              )}
                              {ward.bySeverity.High > 0 && (
                                <div
                                  className="h-full bg-orange-400"
                                  style={{
                                    width: `${(ward.bySeverity.High / ward.total) * 100}%`,
                                  }}
                                />
                              )}
                              {ward.bySeverity.Urgent > 0 && (
                                <div
                                  className="h-full bg-red-400"
                                  style={{
                                    width: `${(ward.bySeverity.Urgent / ward.total) * 100}%`,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Duplicate Clusters ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Copy className="h-4 w-4 text-slate-400" aria-hidden />
            Potential Duplicate Issues
          </h2>
          {duplicates.length === 0 ? (
            <p className="text-xs text-slate-500">
              No duplicate clusters detected. Issues will be grouped here when
              similar reports are found.
            </p>
          ) : (
            <div className="space-y-4">
              {duplicates.map((cluster) => (
                <div
                  key={cluster.primary.id}
                  className="rounded-xl border border-amber-100 bg-amber-50/50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-amber-600" aria-hidden />
                    <span className="text-xs font-semibold text-amber-800">
                      {cluster.duplicates.length + 1} similar reports ·{" "}
                      {Math.round(cluster.similarity * 100)}% match
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <SeverityBadge severity={cluster.primary.severity} compact />
                      <span className="font-medium text-slate-800">
                        {cluster.primary.title}
                      </span>
                    </div>
                    {cluster.duplicates.map((dup) => (
                      <div
                        key={dup.id}
                        className="flex items-center gap-2 pl-4 text-xs text-slate-600"
                      >
                        <span className="text-slate-400">↳</span>
                        <SeverityBadge severity={dup.severity} compact />
                        {dup.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TrendCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}

function TrendCard({ icon, label, value, detail }: TrendCardProps) {
  return (
    <div className="parapulse-hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
