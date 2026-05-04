import { useState } from "react";
import { CheckCircle2, Loader2, Map, Sparkles } from "lucide-react";
import { ReportForm } from "../components/report/ReportForm";
import { IssueCard } from "../components/issue/IssueCard";
import { generateIssueAsync } from "../lib/generateIssue";
import { navigate } from "../lib/router";
import type { CivicIssue, IssueDraft, ReportLanguage } from "../types/issue";

interface ReportPageProps {
  /** Persists a generated issue so it shows up on the map. */
  onSaveIssue: (issue: CivicIssue) => void;
}

/**
 * Report page: hosts the input form on the left and renders the generated
 * civic report card on the right once analysis finishes.
 *
 * The page owns the AI-call lifecycle (loading + error + result) so the
 * form component can stay purely presentational.
 */
export function ReportPage({ onSaveIssue }: ReportPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [issue, setIssue] = useState<CivicIssue | undefined>(undefined);
  const [savedId, setSavedId] = useState<string | undefined>(undefined);
  const [saveToastVisible, setSaveToastVisible] = useState(false);

  async function handleGenerate(draft: IssueDraft, language: ReportLanguage = "en") {
    setLoading(true);
    setError(undefined);
    setIssue(undefined);
    setSavedId(undefined);
    setSaveToastVisible(false);
    try {
      const result = await generateIssueAsync(draft, language);
      setIssue(result);
    } catch (err) {
      console.error(err);
      setError(
        "We could not analyze this report right now. Please try again, or use the demo example.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSave(value: CivicIssue) {
    onSaveIssue(value);
    setSavedId(value.id);
    setSaveToastVisible(true);
    window.setTimeout(() => setSaveToastVisible(false), 2500);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Report a civic issue
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Describe what you see and where. ParaPulse will draft a structured
          civic report you can review, copy, and share with authorities or
          neighbours.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ReportForm
            onGenerate={handleGenerate}
            loading={loading}
            error={error}
          />
        </div>

        <div className="lg:col-span-2">
          {issue ? (
            <div className="space-y-3">
              <IssueCard
                issue={issue}
                onSave={handleSave}
                saved={savedId === issue.id}
                showShare
              />
              {savedId === issue.id && (
                <div className="parapulse-fade-up flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                    Saved to the community map.
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("map")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 underline-offset-2 hover:underline"
                  >
                    <Map className="h-3.5 w-3.5" aria-hidden />
                    View on map
                  </button>
                </div>
              )}
            </div>
          ) : (
            <EmptyPreview loading={loading} hasError={Boolean(error)} />
          )}
        </div>
      </div>
      {saveToastVisible && (
        <div
          role="status"
          className="parapulse-fade-up fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-xl shadow-slate-900/15 sm:left-auto sm:right-4 sm:max-w-xs"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Report saved to the community map.
          </span>
        </div>
      )}
    </div>
  );
}

interface EmptyPreviewProps {
  loading: boolean;
  hasError: boolean;
}

function EmptyPreview({ loading, hasError }: EmptyPreviewProps) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-white/90 p-8 text-center shadow-sm">
      {loading ? (
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" aria-hidden />
      ) : (
        <Sparkles className="h-8 w-8 text-emerald-500" aria-hidden />
      )}
      <h2 className="mt-3 text-base font-semibold text-slate-800">
        {loading
          ? "Analyzing your report…"
          : hasError
          ? "Generation failed"
          : "Your structured report appears here"}
      </h2>
      <p className="mt-1 max-w-xs text-sm text-slate-500">
        {loading
          ? "ParaPulse is classifying the issue, estimating severity, and drafting a complaint message."
          : hasError
          ? "Try again, or click 'Use demo example' to see a sample run."
          : "Fill in the description and location, then click Generate report."}
      </p>
    </div>
  );
}
