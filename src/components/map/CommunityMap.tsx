import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { Loader2 } from "lucide-react";
import type { CivicIssue } from "../../types/issue";
import {
  buildSeverityMarkerIcon,
  ensureLeafletDefaults,
} from "../../lib/leaflet";
import { CategoryBadge } from "../badges/CategoryBadge";
import { SeverityBadge } from "../badges/SeverityBadge";
import { StatusBadge } from "../badges/StatusBadge";

const KOLKATA_CENTER: LatLngExpression = [22.5726, 88.3639];
const DEFAULT_ZOOM = 12;

interface CommunityMapProps {
  issues: CivicIssue[];
  selectedId?: string;
  onSelect?: (issue: CivicIssue) => void;
}

ensureLeafletDefaults();

/**
 * Renders the community Leaflet map with severity-coloured markers.
 *
 * Only issues with coordinates are placed on the map; the others stay in
 * the sidebar list and surface a small notice from the parent page.
 */
export function CommunityMap({ issues, selectedId, onSelect }: CommunityMapProps) {
  const [ready, setReady] = useState(false);
  const placedIssues = issues.filter(
    (issue) =>
      typeof issue.location.latitude === "number" &&
      typeof issue.location.longitude === "number",
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10">
      {!ready && (
        <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center gap-2 bg-white/90 text-sm text-slate-600 backdrop-blur-sm">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" aria-hidden />
          Loading community map…
        </div>
      )}
      <MapContainer
        center={KOLKATA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        <MapReadyNotifier onReady={() => setReady(true)} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SelectedIssueFlyTo
          issue={placedIssues.find((value) => value.id === selectedId)}
        />
        {placedIssues.map((issue) => (
          <Marker
            key={issue.id}
            position={[
              issue.location.latitude as number,
              issue.location.longitude as number,
            ]}
            icon={buildSeverityMarkerIcon(issue.severity)}
            eventHandlers={{
              click: () => onSelect?.(issue),
            }}
          >
            <Popup>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1">
                  <CategoryBadge category={issue.category} iconless />
                  <SeverityBadge severity={issue.severity} compact />
                  <StatusBadge status={issue.status} />
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {issue.title}
                </div>
                <div className="text-xs text-slate-600">
                  {issue.location.text}
                </div>
                <button
                  type="button"
                  onClick={() => onSelect?.(issue)}
                  className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Open details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

interface MapReadyNotifierProps {
  onReady: () => void;
}

function MapReadyNotifier({ onReady }: MapReadyNotifierProps) {
  const map = useMap();
  useEffect(() => {
    map.whenReady(onReady);
  }, [map, onReady]);
  return null;
}

interface SelectedIssueFlyToProps {
  issue: CivicIssue | undefined;
}

/** Pans the map to the selected issue without changing zoom abruptly. */
function SelectedIssueFlyTo({ issue }: SelectedIssueFlyToProps) {
  const map = useMap();
  useEffect(() => {
    if (!issue) return;
    const lat = issue.location.latitude;
    const lng = issue.location.longitude;
    if (typeof lat !== "number" || typeof lng !== "number") return;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 14), { duration: 0.6 });
  }, [issue, map]);
  return null;
}
