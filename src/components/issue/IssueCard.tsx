import { useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Download,
  ExternalLink,
  HelpCircle,
  Mail,
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
import { getSeverityMeta } from "../../data/severity";
import { VerificationPanel } from "./VerificationPanel";
import { EscalationTimeline } from "./EscalationTimeline";
import { generateMailtoLink } from "../../lib/emailGenerator";
import { findAuthoritiesForIssue } from "../../data/authorities";

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
 * Renders every AI-enrichment field plus copy/save/share affordances,
 * email authority, portal links, verification, and escalation timeline.
 */
export function IssueCard({
  issue,
  onSave,
  saved,
  showShare,
}: IssueCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const severityMeta = getSeverityMeta(issue.severity);

  const whatsappText = buildWhatsappMessage(issue);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  // Find matching authorities for this issue
  const authorities = findAuthoritiesForIssue(issue.category, issue.ward);
  const primaryAuthority = authorities[0];
  const mailtoLink = primaryAuthority
    ? generateMailtoLink(issue, { to: primaryAuthority.contactEmail })
    : generateMailtoLink(issue);

  async function handleCopy() {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(issue.complaintMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2500);
    }
  }

  function handleDownloadMarkdown() {
    const markdown = buildMarkdownReport(issue);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(issue.title)}-civic-report.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const escalationEvents = issue.escalationHistory ?? [];

  return (
    <article className="parapulse-fade-up relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: severityMeta.markerColor }}
      />
      <header className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-white px-5 py-5">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          AI-generated civic report
          {issue.language && issue.language !== "en" && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              {issue.language === "bn" ? "বাংলা" : "हिन्दी"}
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {issue.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={issue.category} />
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={issue.status} />
          {issue.ward && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              {issue.ward}
            </span>
          )}
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
          {/* Portal links for matching authorities */}
          {authorities.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {authorities.slice(0, 3).map((auth) => (
                <a
                  key={auth.id}
                  href={auth.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden />
                  {auth.department.length > 30
                    ? auth.department.slice(0, 30) + "…"
                    : auth.department}
                </a>
              ))}
            </div>
          )}
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
          <blockquote className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 leading-relaxed text-slate-700">
            {issue.complaintMessage}
          </blockquote>
          <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={handleCopy}
              className={
                "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold shadow-sm transition-colors sm:py-1.5 " +
                (copied
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50")
              }
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
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-emerald-900/20 transition-colors hover:bg-emerald-700 sm:py-1.5"
              >
                <Share2 className="h-4 w-4" aria-hidden />
                Share on WhatsApp
              </a>
            )}
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-sky-700 shadow-sm transition-colors hover:bg-sky-50 sm:py-1.5"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email authority
            </a>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:py-1.5"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Markdown
            </button>
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

        {/* ── Verification ── */}
        <div className="border-t border-slate-100 pt-4">
          <VerificationPanel
            issueId={issue.id}
            count={issue.verificationCount}
          />
        </div>

        {/* ── Escalation Timeline ── */}
        {escalationEvents.length > 0 && (
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowTimeline((v) => !v)}
              className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700"
            >
              {showTimeline ? (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              )}
              Escalation history ({escalationEvents.length})
            </button>
            {showTimeline && (
              <EscalationTimeline events={escalationEvents} />
            )}
          </div>
        )}
      </div>

      {onSave && (
        <footer className="flex flex-wrap items-center justify-stretch gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 sm:justify-end">
          <button
            type="button"
            disabled={saved}
            onClick={() => onSave(issue)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300 sm:w-auto sm:py-1.5"
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
      {(copied || copyFailed) && (
        <div
          role="status"
          className="parapulse-fade-up pointer-events-none fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl shadow-slate-900/15 sm:left-auto sm:right-4 sm:max-w-xs"
        >
          {copied
            ? "Complaint copied to clipboard."
            : "Clipboard access failed. Copy the message manually."}
        </div>
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

function buildWhatsappMessage(issue: CivicIssue) {
  return [
    `*${issue.title}*`,
    "",
    `Location: ${issue.location.text}`,
    `Severity: ${issue.severity}`,
    "",
    issue.complaintMessage,
  ].join("\n");
}

function buildMarkdownReport(issue: CivicIssue) {
  const missingInfo =
    issue.missingInfo.length > 0
      ? issue.missingInfo.map((item) => `- ${item}`).join("\n")
      : "- No additional information needed";

  return [
    `# ${issue.title}`,
    "",
    `- **Category:** ${issue.category}`,
    `- **Severity:** ${issue.severity}`,
    `- **Status:** ${issue.status}`,
    `- **Location:** ${issue.location.text}`,
    `- **Suggested authority:** ${issue.suggestedAuthority}`,
    `- **Created:** ${new Date(issue.createdAt).toLocaleString()}`,
    ...(issue.ward ? [`- **Ward:** ${issue.ward}`] : []),
    ...(issue.language ? [`- **Language:** ${issue.language}`] : []),
    "",
    "## Summary",
    "",
    issue.summary,
    "",
    "## Complaint Message",
    "",
    issue.complaintMessage,
    "",
    "## Missing Information",
    "",
    missingInfo,
    "",
    "## Volunteer Next Steps",
    "",
    issue.volunteerAction,
    "",
  ].join("\n");
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "parapulse";
}
