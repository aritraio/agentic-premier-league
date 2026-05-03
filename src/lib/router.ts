import { useEffect, useState } from "react";

/**
 * Minimal hash-based router for ParaPulse.
 *
 * The MVP only has three top-level views (Landing, Report, Map) so a full
 * router dependency would be overkill. Hash routes also let the static
 * deployment work without server-side rewrites.
 */

export type RouteKey = "landing" | "report" | "map";

const HASH_TO_ROUTE: Record<string, RouteKey> = {
  "": "landing",
  "#": "landing",
  "#/": "landing",
  "#/report": "report",
  "#/map": "map",
};

export const ROUTE_PATHS: Record<RouteKey, string> = {
  landing: "#/",
  report: "#/report",
  map: "#/map",
};

/** Resolve the current hash to a known route, defaulting to `landing`. */
export function resolveRoute(hash: string): RouteKey {
  return HASH_TO_ROUTE[hash] ?? "landing";
}

/**
 * Subscribe to `hashchange` and return the current route.
 *
 * Any unknown hash falls back to the landing page so the UI never ends up
 * in a blank state.
 */
export function useHashRoute(): RouteKey {
  const [route, setRoute] = useState<RouteKey>(() =>
    resolveRoute(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setRoute(resolveRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

/** Programmatic navigation that keeps the hash in sync with the URL bar. */
export function navigate(route: RouteKey): void {
  if (typeof window === "undefined") return;
  const target = ROUTE_PATHS[route];
  if (window.location.hash !== target) {
    window.location.hash = target;
  }
  // Always scroll to top on navigation so long pages don't keep their offset.
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}
