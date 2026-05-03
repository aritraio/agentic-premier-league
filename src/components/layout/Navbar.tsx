import { useState } from "react";
import { Menu, Radio, X } from "lucide-react";
import { ROUTE_PATHS, type RouteKey } from "../../lib/router";

interface NavLink {
  key: RouteKey;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { key: "report", label: "Report" },
  { key: "map", label: "Map" },
  { key: "landing", label: "Demo" },
];

interface NavbarProps {
  current: RouteKey;
}

/**
 * Top navigation with the ParaPulse wordmark, primary nav links, and a
 * mobile drawer. Uses hash anchors so it cooperates with `useHashRoute`.
 */
export function Navbar({ current }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href={ROUTE_PATHS.landing}
          className="flex items-center gap-2 text-slate-900"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Radio className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            ParaPulse
          </span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={ROUTE_PATHS[link.key]}
              className={
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                (current === link.key
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href={ROUTE_PATHS.report}
            className="ml-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Report an Issue
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 sm:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={ROUTE_PATHS[link.key]}
                  onClick={() => setOpen(false)}
                  className={
                    "block rounded-md px-3 py-2 text-sm font-medium " +
                    (current === link.key
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-100")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={ROUTE_PATHS.report}
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Report an Issue
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
