import {
  ArrowRight,
  Camera,
  Map,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ROUTE_PATHS } from "../lib/router";
import { DEMO_ISSUES } from "../data/demoIssues";
import { IssueListItem } from "../components/issue/IssueListItem";
import { SeverityBadge } from "../components/badges/SeverityBadge";

const STEPS = [
  {
    icon: Camera,
    title: "Upload",
    description:
      "Snap a photo or describe the civic issue you spotted. Add a landmark or area name as the location.",
  },
  {
    icon: Sparkles,
    title: "Analyze",
    description:
      "ParaPulse classifies the issue, estimates severity, drafts a complaint, and lists missing details.",
  },
  {
    icon: Megaphone,
    title: "Act",
    description:
      "Copy the complaint, share it on WhatsApp, save it to the community map, and coordinate volunteers.",
  },
];

const METRICS = [
  { label: "Civic categories supported", value: "8" },
  { label: "Demo Kolkata locations", value: "5" },
  { label: "Seconds to a structured report", value: "<10" },
];

/** Public landing page: hero, how-it-works, demo issues, and CTAs. */
export function LandingPage() {
  return (
    <div className="space-y-16 pb-16 sm:space-y-24">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.18),transparent_20rem),linear-gradient(180deg,rgba(236,253,245,0.95),rgba(255,255,255,0.82)_58%,transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
          <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm shadow-emerald-900/5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                AI-powered civic reporting
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                From community complaints to actionable civic reports in seconds.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                ParaPulse helps residents and volunteers turn photos or short
                descriptions of civic problems into structured, shareable
                reports — with category, severity, suggested authority, and a
                ready-to-send complaint message.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={ROUTE_PATHS.report}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-colors hover:bg-emerald-700 sm:w-auto"
                >
                  Report an Issue
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={ROUTE_PATHS.map}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 sm:w-auto"
                >
                  <Map className="h-4 w-4" aria-hidden />
                  View Community Map
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="parapulse-hover-lift rounded-2xl border border-emerald-100 bg-white/95 p-5 shadow-xl shadow-emerald-900/10">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Sample report
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Severe waterlogging near Salt Lake Sector V bus stop
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  After heavy rain, the road near the bus stop is badly
                  waterlogged. Pedestrians cannot cross safely and buses are
                  halting in the flooded section.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <dt className="font-medium text-slate-500">Category</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">Waterlogging</dd>
                  </div>
                  <div className="rounded-lg bg-orange-50 px-3 py-2 ring-1 ring-orange-100">
                    <dt className="font-medium text-slate-500">Severity</dt>
                    <dd className="mt-1">
                      <SeverityBadge severity="High" />
                    </dd>
                  </div>
                  <div className="col-span-2 rounded-lg bg-slate-50 px-3 py-2">
                    <dt className="font-medium text-slate-500">Suggested authority</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      Bidhannagar Municipal Corporation – Drainage
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                aria-hidden
                className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-emerald-200/60 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-sky-200/60 blur-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How ParaPulse works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Three quick steps from a noticed problem to organized community action.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="parapulse-hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Issues from the community
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Demo reports across Kolkata showing the kind of structured output
              ParaPulse generates.
            </p>
          </div>
          <a
            href={ROUTE_PATHS.map}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            See all on the map
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_ISSUES.slice(0, 3).map((issue) => (
            <IssueListItem key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-emerald-900/20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="text-3xl font-bold sm:text-4xl">{metric.value}</div>
                <div className="mt-1 text-sm text-slate-300">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <p className="flex items-start gap-2 text-sm text-slate-200">
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" aria-hidden />
              Built for residents, students, RWAs, and NGOs to coordinate civic action together.
            </p>
            <p className="flex items-start gap-2 text-sm text-slate-200">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" aria-hidden />
              Reports highlight missing information so authorities receive better evidence, not just complaints.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
