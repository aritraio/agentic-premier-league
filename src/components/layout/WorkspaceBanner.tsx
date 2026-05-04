import { useState } from "react";
import { Building2, Settings, X } from "lucide-react";
import type { WorkspaceConfig } from "../../lib/workspaceMode";
import { CATEGORIES } from "../../data/categories";

interface WorkspaceBannerProps {
  config: WorkspaceConfig;
  onUpdate: (config: WorkspaceConfig) => void;
}

/**
 * Compact banner displayed below the navbar when workspace mode is active.
 * Shows the organisation name and active filter summary.
 */
export function WorkspaceBanner({ config, onUpdate }: WorkspaceBannerProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [orgName, setOrgName] = useState(config.organizationName);
  const [focusWards, setFocusWards] = useState(config.focusWards.join(", "));
  const [focusCategories, setFocusCategories] = useState<string[]>(
    config.focusCategories,
  );

  if (!config.isActive && !showSettings) return null;

  function handleSave() {
    onUpdate({
      isActive: true,
      organizationName: orgName.trim() || "My Organization",
      focusWards: focusWards
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean),
      focusCategories: focusCategories as WorkspaceConfig["focusCategories"],
    });
    setShowSettings(false);
  }

  function handleExit() {
    onUpdate({
      isActive: false,
      organizationName: "",
      focusWards: [],
      focusCategories: [],
    });
    setShowSettings(false);
  }

  if (showSettings) {
    return (
      <div className="border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Workspace Settings
            </h3>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="rounded-md p-1 text-slate-500 hover:bg-white/60 hover:text-slate-700"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="ws-org"
                className="block text-xs font-medium text-slate-600"
              >
                Organisation name
              </label>
              <input
                id="ws-org"
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Salt Lake RWA"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div>
              <label
                htmlFor="ws-wards"
                className="block text-xs font-medium text-slate-600"
              >
                Focus wards (comma-separated)
              </label>
              <input
                id="ws-wards"
                type="text"
                value={focusWards}
                onChange={(e) => setFocusWards(e.target.value)}
                placeholder="e.g. Salt Lake, Gariahat"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-600">
                Focus categories
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setFocusCategories((prev) =>
                        prev.includes(cat.value)
                          ? prev.filter((c) => c !== cat.value)
                          : [...prev, cat.value],
                      );
                    }}
                    className={
                      "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors " +
                      (focusCategories.includes(cat.value)
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-emerald-100")
                    }
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Activate workspace
            </button>
            {config.isActive && (
              <button
                type="button"
                onClick={handleExit}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Exit workspace mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-emerald-800">
          <Building2 className="h-3.5 w-3.5" aria-hidden />
          <span className="font-semibold">{config.organizationName}</span>
          {config.focusWards.length > 0 && (
            <span className="text-emerald-600">
              · {config.focusWards.join(", ")}
            </span>
          )}
          {config.focusCategories.length > 0 && (
            <span className="text-emerald-600">
              · {config.focusCategories.length} categories
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="rounded-md p-1 text-emerald-700 hover:bg-emerald-100"
            aria-label="Workspace settings"
          >
            <Settings className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="rounded-md p-1 text-emerald-700 hover:bg-emerald-100"
            aria-label="Exit workspace mode"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
