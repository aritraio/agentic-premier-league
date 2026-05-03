import { Heart } from "lucide-react";

/** Slim footer with the project tagline used across every page. */
export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p className="flex items-center gap-1.5">
          Built for community action
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" aria-hidden />
        </p>
        <p className="text-xs text-slate-400">
          ParaPulse · Hackathon MVP
        </p>
      </div>
    </footer>
  );
}
