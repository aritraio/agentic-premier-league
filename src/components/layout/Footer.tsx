import { Heart } from "lucide-react";
import { ROUTE_PATHS } from "../../lib/router";

/** Slim footer with the project tagline used across every page. */
export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p className="flex items-center gap-1.5">
          Built for community action
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" aria-hidden />
        </p>
        <nav className="flex flex-wrap items-center gap-3 text-xs">
          <a
            href={ROUTE_PATHS.dashboard}
            className="hover:text-emerald-700"
          >
            Dashboard
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={ROUTE_PATHS.directory}
            className="hover:text-emerald-700"
          >
            Authority Directory
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={ROUTE_PATHS.map}
            className="hover:text-emerald-700"
          >
            Community Map
          </a>
        </nav>
        <p className="text-xs text-slate-400">
          ParaPulse · AI Civic Reporter
        </p>
      </div>
    </footer>
  );
}
