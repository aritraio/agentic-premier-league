import { useState } from "react";
import {
  Building2,
  Check,
  ClipboardCopy,
  HelpCircle,
  MapPin,
  Save,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import type { CivicIssue } from "../../types/issue";
import { CategoryBadge } from "../badges/CategoryBadge";
import { SeverityBadge } from "../badges/SeverityBadge";
import { StatusBadge } from "../badges/StatusBadge";

interface IssueCardProps {
  issue: CivicIssue;
  /** Save handler. When omitted the save button is hidden. */
  onSave?: (issue: CivicIssue) => void;
  /** Whether the issue is already in the saved list. */
  saved?: boolean;
  /** Show the share button (text-only WhatsApp share is Phase 8.2). */
  showShare?: boolean;
}

/**
 * The full generated issue card shown on the report page after AI runs.
 *
 * Renders every AI-enrichment field plus copy/save/share affordances.
 */
export function IssueCard({
  issue,
  onSave,
  saved,
  showShare,
}: IssueCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  async function handleCopy() {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(issue.complaintMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  function handleShare() {
    const text = `*${issue.title}*\n\n${issue.complaintMessage}\n\nLocation: ${issue.location.text}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          AI-generated civic report
        </div>
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {issue.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={issue.category} />
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={issue.status} />
        </div>
        <p className="flex items-start gap-1.5 text-sm text-slate-600">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden />
          {issue.location.text}
        </p>
      </header>

      {issue.imageUrl && (
        <div className="border-b border-slate-100 bg-slate-50">
          <img
            src={issue.imageUrl}
            alt="Reported civic issue evidence"
            className="max-h-72 w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-5 px-5 py-5 text-sm text-slate-700">
        <Section title="Summary">{issue.summary}</Section>

        <Section
          title="Suggested authority"
          icon={<Building2 className="h-4 w-4 text-slate-400" aria-hidden />}
        >
          {issue.suggestedAuthority}
        </Section>

        <Section
          title="Missing information"
          icon={<HelpCircle className="h-4 w-4 text-slate-400" aria-hidden />}
        >
          {issue.missingInfo.length === 0 ? (
            <p className="text-slate-500">
              No additional information needed for this report.
            </p>
          ) : (
            <ul className="list-disc space-y-1 pl-5">
              {issue.missingInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Complaint message">
          <blockquote className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
            {issue.complaintMessage}
          </blockquote>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" aria-hidden />
                  Copy complaint
                </>
              )}
            </button>
            {showShare && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Share2 className="h-4 w-4" aria-hidden />
                Share on WhatsApp
              </button>
            )}
          </div>
          {copyFailed && (
            <p className="mt-2 text-xs text-rose-600">
              Could not access the clipboard. Please copy the message manually.
            </p>
          )}
        </Section>

        <Section
          title="Volunteer next steps"
          icon={<Users className="h-4 w-4 text-slate-400" aria-hidden />}
        >
          {issue.volunteerAction}
        </Section>
      </div>

      {onSave && (
        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
          <button
            type="button"
            disabled={saved}
            onClick={() => onSave(issue)}
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Saved to map
              </>
            ) : (
              <>
                <Save className="h-4 w-4" aria-hidden />
                Save report
              </>
            )}
          </button>
        </footer>
      )}
    </article>
  );
}

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <section>
      <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {icon}
        {title}
      </h3>
      <div className="text-sm text-slate-700">{children}</div>
    </section>
  );
}
