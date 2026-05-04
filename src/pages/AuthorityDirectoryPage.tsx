import { useState, useMemo } from "react";
import {
  Building2,
  ExternalLink,
  Mail,
  Phone,
  Search,
  Shield,
} from "lucide-react";
import { AUTHORITIES, type AuthorityEntry } from "../data/authorities";
import { CATEGORIES } from "../data/categories";
import type { IssueCategory } from "../types/issue";

/**
 * Searchable directory of Kolkata civic authorities.
 *
 * Displays department cards with contact info, portal links, and
 * category-based filtering.
 */
export function AuthorityDirectoryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | "all">(
    "all",
  );

  const filtered = useMemo(() => {
    return AUTHORITIES.filter((auth) => {
      if (
        categoryFilter !== "all" &&
        !auth.categories.includes(categoryFilter)
      ) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          auth.department.toLowerCase().includes(q) ||
          auth.jurisdiction.toLowerCase().includes(q) ||
          auth.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, categoryFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 mb-1">
          <Shield className="h-3.5 w-3.5" aria-hidden />
          Civic Integration
        </div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Authority Directory
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Find the right department to escalate civic issues. Includes contact
          details and links to official complaint portals.
        </p>
      </header>

      {/* ── Filters ── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments…"
            className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as IssueCategory | "all")
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Results ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((auth) => (
          <AuthorityCard key={auth.id} authority={auth} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <Building2 className="h-8 w-8 text-slate-300" aria-hidden />
          <p className="text-sm font-semibold text-slate-700">
            No authorities match your search
          </p>
          <p className="text-xs text-slate-500">
            Try a different keyword or clear the category filter.
          </p>
        </div>
      )}

      {/* ── Quick Portal Links ── */}
      <div className="mt-10 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">
          Official Complaint Portals
        </h2>
        <div className="flex flex-wrap gap-2">
          {getUniquePortals().map((portal) => (
            <a
              key={portal.url}
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              {portal.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthorityCard({ authority }: { authority: AuthorityEntry }) {
  return (
    <article className="parapulse-hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <Building2 className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {authority.department}
          </h3>
          <p className="text-xs text-slate-500">{authority.jurisdiction}</p>
        </div>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-slate-600">
        {authority.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-1">
        {authority.categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
        {authority.phone && (
          <a
            href={`tel:${authority.phone}`}
            className="flex items-center gap-1.5 hover:text-emerald-700"
          >
            <Phone className="h-3 w-3" aria-hidden />
            {authority.phone}
          </a>
        )}
        {authority.contactEmail && (
          <a
            href={`mailto:${authority.contactEmail}`}
            className="flex items-center gap-1.5 hover:text-emerald-700"
          >
            <Mail className="h-3 w-3" aria-hidden />
            {authority.contactEmail}
          </a>
        )}
        {authority.portalUrl && (
          <a
            href={authority.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-700"
          >
            <ExternalLink className="h-3 w-3" aria-hidden />
            Official portal
          </a>
        )}
      </div>
    </article>
  );
}

function getUniquePortals(): Array<{ label: string; url: string }> {
  const seen = new Set<string>();
  const portals: Array<{ label: string; url: string }> = [];
  for (const auth of AUTHORITIES) {
    if (auth.portalUrl && !seen.has(auth.portalUrl)) {
      seen.add(auth.portalUrl);
      portals.push({ label: auth.jurisdiction, url: auth.portalUrl });
    }
  }
  return portals;
}
