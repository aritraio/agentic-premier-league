import type {
  CivicIssue,
  IssueCategory,
  IssueDraft,
  IssueSeverity,
} from "../types/issue";

/**
 * Local placeholder report generator.
 *
 * The real AI integration is built in Phase 5. This stub exists so the
 * Phase 4 UI (loading, success, error, copy, save flows) can be wired up
 * end-to-end without depending on an API key during early development.
 *
 * It also doubles as the seed for the Phase 5.6 fallback-mode generator.
 */

interface KeywordRule {
  category: IssueCategory;
  keywords: RegExp;
  severity: IssueSeverity;
  authority: string;
  volunteerAction: string;
}

const RULES: KeywordRule[] = [
  {
    category: "Waterlogging",
    keywords: /water|flood|rain|submerg/i,
    severity: "High",
    authority: "Municipal Drainage Department / local ward office",
    volunteerAction:
      "Share the report with nearby residents, warn pedestrians about the flooded stretch, and follow up with the ward office.",
  },
  {
    category: "Garbage",
    keywords: /garbage|trash|waste|dump|smell|bin/i,
    severity: "Medium",
    authority: "Municipal Sanitation Department / local ward office",
    volunteerAction:
      "Post in the local market or residents' group, contact the ward sanitation supervisor, and confirm pickup the next day.",
  },
  {
    category: "Streetlight",
    keywords: /light|lamp|dark|streetlight|pole/i,
    severity: "High",
    authority: "Electricity Maintenance Department / local ward office",
    volunteerAction:
      "Note the pole number, share the report with the local students' or commuter group, and request follow-up from the ward councillor.",
  },
  {
    category: "Drainage",
    keywords: /drain|sewer|manhole|cover/i,
    severity: "Urgent",
    authority: "Sewerage and Drainage Department / borough office",
    volunteerAction:
      "Place a visible warning marker if safe, alert any traffic guard nearby, and escalate to the borough office today.",
  },
  {
    category: "Road Damage",
    keywords: /pothole|road|footpath|broken|crack|tile|rebar/i,
    severity: "Medium",
    authority: "Roads Department / local ward office",
    volunteerAction:
      "Share with the local residents' group, collect close-up photos, and forward to the ward councillor with the location pin.",
  },
  {
    category: "Public Safety",
    keywords: /unsafe|danger|hazard|risk|accident/i,
    severity: "High",
    authority: "Local police station / ward office",
    volunteerAction:
      "Warn pedestrians in the area, share with the resident WhatsApp group, and escalate to the local police station if the risk is immediate.",
  },
];

const FALLBACK_RULE: KeywordRule = {
  category: "Other",
  keywords: /.*/,
  severity: "Medium",
  authority: "Local ward office",
  volunteerAction:
    "Share the report with neighbours, gather any additional evidence, and forward to the ward office.",
};

function classify(text: string): KeywordRule {
  for (const rule of RULES) {
    if (rule.keywords.test(text)) return rule;
  }
  return FALLBACK_RULE;
}

function buildTitle(category: IssueCategory, location: string): string {
  const trimmed = location.trim() || "the reported location";
  return `${category} reported near ${trimmed}`;
}

function buildSummary(description: string, location: string): string {
  const trimmed = description.trim();
  if (!trimmed) {
    return `An issue has been reported near ${location || "the location"}, awaiting more details from the reporter.`;
  }
  // Keep the summary at most one sentence-ish without trusting punctuation.
  const compact = trimmed.replace(/\s+/g, " ").slice(0, 240);
  return compact.endsWith(".") ? compact : `${compact}.`;
}

function buildComplaint(
  category: IssueCategory,
  description: string,
  location: string,
): string {
  const place = location.trim() || "the reported location";
  const detail = description.trim() || `a ${category.toLowerCase()} issue has been observed`;
  return `Respected Sir/Madam, ${detail} at ${place}. This is causing difficulty for residents and pedestrians in the area. Please arrange an inspection and necessary action at the earliest. Thank you.`;
}

function buildMissingInfo(category: IssueCategory): string[] {
  const generic = [
    "A clearer photo of the issue from a wider angle.",
    "The closest landmark or pole/board number for repair crews.",
  ];
  switch (category) {
    case "Waterlogging":
      return [...generic, "Approximate water depth on the road."];
    case "Garbage":
      return [...generic, "Time of last municipal pickup, if known."];
    case "Streetlight":
      return [...generic, "Whether nearby lights are also affected."];
    case "Drainage":
      return [...generic, "Whether any temporary barricade is in place."];
    case "Road Damage":
      return [...generic, "Approximate length of the damaged stretch."];
    default:
      return generic;
  }
}

/**
 * Build a complete `CivicIssue` from a raw user draft using simple keyword
 * rules. Returns the same shape produced by the AI so the UI is identical
 * across both code paths.
 */
export function generateIssueFromDraft(draft: IssueDraft): CivicIssue {
  const rule = classify(`${draft.description} ${draft.location}`);
  const title = buildTitle(rule.category, draft.location);
  return {
    id: `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    category: rule.category,
    severity: rule.severity,
    status: "New",
    location: { text: draft.location.trim() || "Unspecified location" },
    createdAt: new Date().toISOString(),
    summary: buildSummary(draft.description, draft.location),
    suggestedAuthority: rule.authority,
    missingInfo: buildMissingInfo(rule.category),
    complaintMessage: buildComplaint(rule.category, draft.description, draft.location),
    volunteerAction: rule.volunteerAction,
    imageUrl: draft.imageUrl,
  };
}

/**
 * Mimic an async AI call so the form's loading state is exercised. The real
 * implementation in Phase 5 will replace this with a network request.
 */
export async function generateIssueAsync(draft: IssueDraft): Promise<CivicIssue> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return generateIssueFromDraft(draft);
}
