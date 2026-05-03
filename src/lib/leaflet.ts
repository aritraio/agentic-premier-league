import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getSeverityMeta } from "../data/severity";

/**
 * Vite/Webpack break Leaflet's default marker icon URLs because they are
 * resolved relative to the bundled CSS file. Re-pointing them to the
 * imported asset URLs is the standard workaround.
 */
let defaultsApplied = false;
export function ensureLeafletDefaults(): void {
  if (defaultsApplied) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- patching Leaflet internals.
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  defaultsApplied = true;
}

/**
 * Build a colored DivIcon whose color reflects the issue severity.
 *
 * Using DivIcons keeps the bundle small (no extra image assets) and lets
 * the marker color stay in sync with `severity.ts`.
 */
export function buildSeverityMarkerIcon(severity: string): L.DivIcon {
  const meta = getSeverityMeta(severity);
  const html = `
    <span class="parapulse-marker" style="--marker-color:${meta.markerColor}">
      <span class="parapulse-marker__pulse"></span>
      <span class="parapulse-marker__dot"></span>
    </span>
  `;
  return L.divIcon({
    html,
    className: "parapulse-marker-wrapper",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -10],
  });
}
