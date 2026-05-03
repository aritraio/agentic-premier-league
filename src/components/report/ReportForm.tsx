import { useRef, useState } from "react";
import {
  AlertCircle,
  Eraser,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import type { IssueDraft } from "../../types/issue";

interface ReportFormProps {
  /** Called when the user clicks Generate. */
  onGenerate: (draft: IssueDraft) => void;
  /** Loading state while AI is running. */
  loading: boolean;
  /** Optional error string surfaced from the AI call. */
  error?: string;
}

/**
 * Sample input that pre-fills the form for the demo scenario. Mirrors the
 * waterlogging story documented in the project plan.
 */
const DEMO_DRAFT: IssueDraft = {
  description:
    "After heavy rain, the road near the Salt Lake Sector V bus stop is badly waterlogged. Pedestrians cannot cross safely, buses are stopping in the flooded area, and vehicles are splashing dirty water on people waiting nearby.",
  location: "Near Salt Lake Sector V bus stop, Kolkata",
};

/**
 * Form used to capture a civic issue from the reporter, including a free
 * text description, location, and an optional image.
 *
 * The form keeps its own local state and only calls `onGenerate` when the
 * user explicitly submits, so the parent page can stay focused on
 * orchestrating the AI call and saving the result.
 */
export function ReportForm({ onGenerate, loading, error }: ReportFormProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canSubmit =
    description.trim().length > 0 && location.trim().length > 0 && !loading;

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
  }

  function clearImage() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    onGenerate({
      description: description.trim(),
      location: location.trim(),
      imageUrl,
    });
  }

  function fillDemo() {
    setDescription(DEMO_DRAFT.description);
    setLocation(DEMO_DRAFT.location);
  }

  function clearForm() {
    setDescription("");
    setLocation("");
    clearImage();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <label
          htmlFor="issue-description"
          className="block text-sm font-semibold text-slate-800"
        >
          What is happening?
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          Describe the issue in your own words. Mention what you saw, when you
          saw it, and who is being affected.
        </p>
        <textarea
          id="issue-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          placeholder="e.g. After heavy rain the road near the bus stop is flooded and pedestrians cannot cross."
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <div>
        <label
          htmlFor="issue-location"
          className="block text-sm font-semibold text-slate-800"
        >
          Location
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          A landmark, street, or area name is enough.
        </p>
        <div className="relative mt-2">
          <MapPin
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id="issue-location"
            name="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Near Salt Lake Sector V bus stop, Kolkata"
            className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      <div>
        <span className="block text-sm font-semibold text-slate-800">
          Photo evidence
          <span className="ml-1 text-xs font-normal text-slate-500">(optional)</span>
        </span>
        <p className="mt-0.5 text-xs text-slate-500">
          A clear photo helps authorities and volunteers respond faster.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
          <label
            htmlFor="issue-image"
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:border-emerald-400 hover:text-emerald-700"
          >
            <ImageIcon className="h-4 w-4" aria-hidden />
            {imageUrl ? "Replace photo" : "Upload a photo"}
            <input
              id="issue-image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>

          {imageUrl && (
            <div className="relative inline-block">
              <img
                src={imageUrl}
                alt="Selected evidence preview"
                className="h-28 w-40 rounded-lg border border-slate-200 object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove photo"
                className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-3 w-3" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fillDemo}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <Wand2 className="h-3.5 w-3.5" aria-hidden />
            Use demo example
          </button>
          <button
            type="button"
            onClick={clearForm}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <Eraser className="h-3.5 w-3.5" aria-hidden />
            Clear form
          </button>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Analyzing report…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Generate report
            </>
          )}
        </button>
      </div>
    </form>
  );
}
