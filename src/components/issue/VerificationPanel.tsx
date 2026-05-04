import { useState } from "react";
import { CheckCircle2, ThumbsUp } from "lucide-react";

interface VerificationPanelProps {
  issueId: string;
  /** Current count from the issue object (may be undefined for old issues). */
  count?: number;
}

const STORAGE_KEY = "parapulse.verifications.v1";

function loadVerifications(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveVerification(issueId: string): void {
  try {
    const data = loadVerifications();
    data[issueId] = true;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

/**
 * Anonymous "I've seen this too" verification button.
 *
 * Stores whether the current browser has already verified each issue in
 * LocalStorage to prevent double-counting. The actual count is managed
 * by the parent via state updates.
 */
export function VerificationPanel({
  issueId,
  count = 0,
}: VerificationPanelProps) {
  const [verified, setVerified] = useState(() => {
    const data = loadVerifications();
    return data[issueId] === true;
  });
  const [localCount, setLocalCount] = useState(count);

  function handleVerify() {
    if (verified) return;
    saveVerification(issueId);
    setVerified(true);
    setLocalCount((prev) => prev + 1);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={verified}
        onClick={handleVerify}
        className={
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all " +
          (verified
            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700")
        }
      >
        {verified ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            Confirmed
          </>
        ) : (
          <>
            <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
            I've seen this too
          </>
        )}
      </button>
      {localCount > 0 && (
        <span className="text-xs text-slate-500">
          ✓ {localCount} {localCount === 1 ? "person" : "people"} confirmed
        </span>
      )}
    </div>
  );
}
