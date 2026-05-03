/**
 * Core civic issue data model for ParaPulse.
 *
 * A `CivicIssue` represents a single user-reported civic problem after it
 * has been enriched by the AI analyst (or by the local fallback generator).
 * It is the unit of data displayed on the report card, in the issue list,
 * and as a marker on the community map.
 */

/** Categories supported by the MVP issue classifier. */
export type IssueCategory =
  | "Waterlogging"
  | "Garbage"
  | "Streetlight"
  | "Road Damage"
  | "Drainage"
  | "Public Safety"
  | "Accessibility"
  | "Other";

/** Severity levels from least to most urgent. */
export type IssueSeverity = "Low" | "Medium" | "High" | "Urgent";

/** Lifecycle states for a reported civic issue. */
export type IssueStatus = "New" | "Reported" | "In progress" | "Resolved";

/**
 * Geographic location for an issue.
 *
 * `text` is always present (free-form, e.g. "Near Salt Lake Sector V bus stop").
 * `latitude` and `longitude` are optional because not every report is geocoded.
 */
export interface IssueLocation {
  text: string;
  latitude?: number;
  longitude?: number;
}

/**
 * AI-generated enrichment fields produced by the civic issue analyst prompt.
 *
 * These are kept in their own slice of the model so that the UI can render a
 * partial state (e.g. while the AI is still running) and so the fallback
 * generator can populate the same shape without the rest of the issue.
 */
export interface IssueAIFields {
  /** Concise formal summary of the issue. */
  summary: string;
  /** Most likely authority/department to receive the complaint. */
  suggestedAuthority: string;
  /** Information the user did not provide that would strengthen the report. */
  missingInfo: string[];
  /** Ready-to-send formal complaint message. */
  complaintMessage: string;
  /** Suggested next action for a community volunteer. */
  volunteerAction: string;
}

/**
 * A complete civic issue record, including user input, AI enrichment,
 * and demo/storage metadata.
 */
export interface CivicIssue extends IssueAIFields {
  id: string;
  title: string;
  category: IssueCategory;
  severity: IssueSeverity;
  status: IssueStatus;
  location: IssueLocation;
  /** ISO 8601 timestamp of when the issue was created. */
  createdAt: string;
  /** Optional image URL or local object URL used as evidence. */
  imageUrl?: string;
}

/**
 * Raw user input captured by the report form before AI analysis.
 *
 * Kept separate from `CivicIssue` so the form does not need to fabricate
 * AI fields up-front.
 */
export interface IssueDraft {
  description: string;
  location: string;
  imageUrl?: string;
}
