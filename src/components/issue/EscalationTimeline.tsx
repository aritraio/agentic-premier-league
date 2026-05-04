import {
  CheckCircle2,
  Circle,
  Mail,
  ExternalLink,
  Flag,
  Clock,
} from "lucide-react";
import type { EscalationEvent } from "../../types/issue";

interface EscalationTimelineProps {
  events: EscalationEvent[];
}

const EVENT_ICONS: Record<string, typeof Circle> = {
  Created: Circle,
  Verified: CheckCircle2,
  Emailed: Mail,
  "Reported to portal": ExternalLink,
  "In progress": Clock,
  Resolved: Flag,
};

/**
 * Vertical timeline showing the escalation history of a civic issue.
 *
 * Events are rendered in chronological order with icons and timestamps.
 */
export function EscalationTimeline({ events }: EscalationTimelineProps) {
  if (events.length === 0) return null;

  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const Icon = EVENT_ICONS[event.event] ?? Circle;
        const isLast = index === events.length - 1;
        const date = new Date(event.timestamp);

        return (
          <div key={`${event.event}-${event.timestamp}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50">
                <Icon className="h-3 w-3 text-emerald-600" aria-hidden />
              </div>
              {!isLast && (
                <div className="h-6 w-0.5 bg-emerald-200" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-xs font-semibold text-slate-800">
                {event.event}
              </p>
              <p className="text-[10px] text-slate-500">
                {date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                at{" "}
                {date.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
