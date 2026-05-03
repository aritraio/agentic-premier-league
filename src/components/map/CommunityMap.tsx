import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
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
  const placedIssues = issues.filter(
    (issue) =>
      typeof issue.location.latitude === "number" &&
      typeof issue.location.longitude === "number",
  );

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={KOLKATA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
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
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
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
