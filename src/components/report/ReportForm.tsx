import { useRef, useState } from "react";
import {
  AlertCircle,
  Eraser,
  FileText,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import type { IssueDraft, ReportLanguage } from "../../types/issue";
import { LANGUAGES } from "../../lib/multilingual";
import { VoiceInput } from "./VoiceInput";
import { extractTextFromImage } from "../../lib/ocrFromImage";

interface ReportFormProps {
  /** Called when the user clicks Generate. */
  onGenerate: (draft: IssueDraft, language: ReportLanguage) => void;
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

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function fileToBase64Data(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Invalid image data"));
        return;
      }
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

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
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [imageMimeType, setImageMimeType] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState<string | undefined>(undefined);
  const [imageReading, setImageReading] = useState(false);
  const [language, setLanguage] = useState<ReportLanguage>("en");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrMessage, setOcrMessage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canSubmit =
    description.trim().length > 0 &&
    location.trim().length > 0 &&
    !loading &&
    !imageReading &&
    !imageError &&
    !ocrLoading;

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError(undefined);
    setImageData(undefined);
    setImageMimeType(undefined);
    setOcrMessage(undefined);
    if (file.size > MAX_IMAGE_BYTES) {
      clearImage();
      setImageError("Please choose an image smaller than 4 MB.");
      return;
    }
    const nextImageUrl = URL.createObjectURL(file);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(nextImageUrl);
    setImageReading(true);
    try {
      const data = await fileToBase64Data(file);
      setImageData(data);
      setImageMimeType(file.type || "image/jpeg");
    } catch {
      URL.revokeObjectURL(nextImageUrl);
      setImageUrl(undefined);
      setImageError("Could not prepare this image for AI analysis.");
    } finally {
      setImageReading(false);
    }
  }

  function clearImage() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(undefined);
    setImageData(undefined);
    setImageMimeType(undefined);
    setImageError(undefined);
    setImageReading(false);
    setOcrMessage(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleOcr() {
    if (!imageData || !imageMimeType) return;
    setOcrLoading(true);
    setOcrMessage(undefined);
    try {
      const result = await extractTextFromImage(imageData, imageMimeType);
      if (result.text) {
        setDescription((prev) =>
          prev ? `${prev}\n\n${result.text}` : result.text,
        );
        setOcrMessage("Text extracted and added to description.");
      } else {
        setOcrMessage(result.error || "No text found in the image.");
      }
    } catch {
      setOcrMessage("Could not extract text from the image.");
    } finally {
      setOcrLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const persistedImageUrl =
      imageData && imageMimeType ? `data:${imageMimeType};base64,${imageData}` : imageUrl;
    onGenerate(
      {
        description: description.trim(),
        location: location.trim(),
        imageUrl: persistedImageUrl,
        imageData,
        imageMimeType,
      },
      language,
    );
  }

  function fillDemo() {
    setDescription(DEMO_DRAFT.description);
    setLocation(DEMO_DRAFT.location);
  }

  function clearForm() {
    setDescription("");
    setLocation("");
    clearImage();
    setOcrMessage(undefined);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={loading}
      className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-6"
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
          className="mt-2 block min-h-36 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
        <div className="mt-2">
          <VoiceInput
            onTranscript={(text) =>
              setDescription((prev) => (prev ? `${prev} ${text}` : text))
            }
          />
        </div>
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
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 sm:w-fit"
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

        {/* OCR extract button */}
        {imageData && imageMimeType && (
          <button
            type="button"
            onClick={handleOcr}
            disabled={ocrLoading || loading}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            {ocrLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                Extracting text…
              </>
            ) : (
              <>
                <FileText className="h-3.5 w-3.5" aria-hidden />
                Extract text from image
              </>
            )}
          </button>
        )}
        {ocrMessage && (
          <p className="mt-1.5 text-xs text-slate-600">{ocrMessage}</p>
        )}

        {imageReading && (
          <p className="mt-2 text-xs text-slate-500">
            Preparing photo for AI analysis…
          </p>
        )}
        {imageError && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
            {imageError}
          </p>
        )}
      </div>

      {/* Language selector */}
      <div>
        <label
          htmlFor="report-language"
          className="block text-sm font-semibold text-slate-800"
        >
          Report language
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          Choose the language for the generated report. Bengali and Hindi
          require the AI API.
        </p>
        <select
          id="report-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as ReportLanguage)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-auto"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeLabel} ({lang.label})
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="parapulse-fade-up flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ParaPulse is classifying, estimating severity, and drafting your complaint.
        </div>
      )}

      <div className="flex flex-col items-stretch justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={fillDemo}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50 sm:py-1.5"
          >
            <Wand2 className="h-3.5 w-3.5" aria-hidden />
            Use demo example
          </button>
          <button
            type="button"
            onClick={clearForm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50 sm:py-1.5"
          >
            <Eraser className="h-3.5 w-3.5" aria-hidden />
            Clear form
          </button>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300 sm:w-auto"
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
