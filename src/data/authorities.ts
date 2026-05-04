/**
 * Static directory of Kolkata civic authorities.
 *
 * Each entry represents a department or office that handles a specific
 * type of civic issue. Used for:
 * - Automatic authority suggestion from issue location/category
 * - The authority directory page
 * - Pre-filled email generation
 */

import type { IssueCategory } from "../types/issue";

export interface AuthorityEntry {
  id: string;
  department: string;
  jurisdiction: string;
  description: string;
  contactEmail: string;
  phone: string;
  portalUrl: string;
  /** Categories this authority handles. */
  categories: IssueCategory[];
  /** Ward names/identifiers this authority covers. Empty = city-wide. */
  wards: string[];
}

export const AUTHORITIES: AuthorityEntry[] = [
  {
    id: "kmc-swm",
    department: "KMC Solid Waste Management",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Handles garbage collection, street sweeping, and waste processing across all KMC wards.",
    contactEmail: "swm@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Garbage"],
    wards: [],
  },
  {
    id: "kmc-drainage",
    department: "KMC Drainage & Sewerage",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Manages drainage systems, sewer lines, manholes, and waterlogging response across the city.",
    contactEmail: "drainage@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Waterlogging", "Drainage"],
    wards: [],
  },
  {
    id: "kmc-roads",
    department: "KMC Roads Department",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Responsible for road maintenance, footpath repair, pothole filling, and pavement work.",
    contactEmail: "roads@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Road Damage", "Accessibility"],
    wards: [],
  },
  {
    id: "kmc-lighting",
    department: "KMC Lighting Department",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Manages street lighting infrastructure across KMC areas. Handles repair and new installations.",
    contactEmail: "lighting@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Streetlight"],
    wards: [],
  },
  {
    id: "cesc",
    department: "CESC Limited",
    jurisdiction: "Kolkata & suburbs",
    description:
      "Electricity distribution company for Kolkata. Handles power outages, transformer issues, and electrical hazards.",
    contactEmail: "customercare@caborin.com",
    phone: "1912",
    portalUrl: "https://www.cesc.co.in/contact-us",
    categories: ["Streetlight", "Public Safety"],
    wards: [],
  },
  {
    id: "kp-traffic",
    department: "Kolkata Police – Traffic",
    jurisdiction: "Kolkata Police Commissionerate",
    description:
      "Manages traffic control, signal maintenance, and road safety enforcement across Kolkata.",
    contactEmail: "traffic@kolkatapolice.gov.in",
    phone: "100",
    portalUrl: "https://kolkatapolice.gov.in/",
    categories: ["Public Safety", "Road Damage"],
    wards: [],
  },
  {
    id: "bmc-drainage",
    department: "Bidhannagar Municipal Corporation – Drainage",
    jurisdiction: "Bidhannagar (Salt Lake, New Town, Rajarhat)",
    description:
      "Handles drainage and waterlogging issues in the Bidhannagar municipal area including Salt Lake sectors.",
    contactEmail: "drainage@bidhannagarmc.gov.in",
    phone: "033-2359-3636",
    portalUrl: "https://bidhannagarmunicipality.in/",
    categories: ["Waterlogging", "Drainage"],
    wards: ["Ward 108 (Salt Lake)", "New Town"],
  },
  {
    id: "bmc-roads",
    department: "Bidhannagar Municipal Corporation – Roads",
    jurisdiction: "Bidhannagar (Salt Lake, New Town, Rajarhat)",
    description:
      "Road maintenance and footpath repair in the Bidhannagar municipal area.",
    contactEmail: "roads@bidhannagarmc.gov.in",
    phone: "033-2359-3636",
    portalUrl: "https://bidhannagarmunicipality.in/",
    categories: ["Road Damage", "Accessibility"],
    wards: ["Ward 108 (Salt Lake)", "New Town"],
  },
  {
    id: "kmc-health",
    department: "KMC Health Department",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Oversees public health hazards including stagnant water breeding grounds, open sewage, and unsanitary conditions.",
    contactEmail: "health@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Drainage", "Garbage", "Public Safety"],
    wards: [],
  },
  {
    id: "pwd",
    department: "Public Works Department (PWD)",
    jurisdiction: "Government of West Bengal",
    description:
      "Handles major roads, bridges, and flyovers maintained by the state government.",
    contactEmail: "pwd@wb.gov.in",
    phone: "1800-345-3545",
    portalUrl: "https://wbpwd.gov.in/",
    categories: ["Road Damage"],
    wards: [],
  },
  {
    id: "kwsb",
    department: "Kolkata Water Supply Board",
    jurisdiction: "Kolkata Metropolitan Area",
    description:
      "Manages water supply, pipeline maintenance, and water quality across the Kolkata metropolitan area.",
    contactEmail: "info@kwsb.org",
    phone: "033-2225-2550",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Drainage", "Other"],
    wards: [],
  },
  {
    id: "kmc-parks",
    department: "KMC Parks & Gardens",
    jurisdiction: "Kolkata Municipal Corporation",
    description:
      "Maintains public parks, gardens, roadside trees, and green spaces across KMC areas.",
    contactEmail: "parks@kmcgov.in",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: ["Accessibility", "Public Safety", "Other"],
    wards: [],
  },
  {
    id: "disability-comm",
    department: "State Commissioner for Persons with Disabilities",
    jurisdiction: "Government of West Bengal",
    description:
      "Handles accessibility complaints and rights of persons with disabilities in public infrastructure.",
    contactEmail: "scpd@wb.gov.in",
    phone: "033-2214-5070",
    portalUrl: "https://wbscpd.org/",
    categories: ["Accessibility"],
    wards: [],
  },
  {
    id: "ward-councillor",
    department: "Local Ward Councillor Office",
    jurisdiction: "Individual Ward",
    description:
      "The first point of contact for ward-level civic issues. Each KMC ward has an elected councillor.",
    contactEmail: "",
    phone: "1916",
    portalUrl: "https://www.kmcgov.in/KMCPortal/jsp/KMCComplaintEntryAction.do",
    categories: [
      "Waterlogging",
      "Garbage",
      "Streetlight",
      "Road Damage",
      "Drainage",
      "Public Safety",
      "Accessibility",
      "Other",
    ],
    wards: [],
  },
];

/**
 * Find the most relevant authorities for an issue based on its
 * category and ward.
 */
export function findAuthoritiesForIssue(
  category: IssueCategory,
  ward?: string,
): AuthorityEntry[] {
  return AUTHORITIES.filter((auth) => {
    const categoryMatch = auth.categories.includes(category);
    if (!categoryMatch) return false;

    // If authority is ward-specific, check ward match
    if (auth.wards.length > 0 && ward) {
      return auth.wards.some((w) =>
        ward.toLowerCase().includes(w.toLowerCase()) ||
        w.toLowerCase().includes(ward.toLowerCase()),
      );
    }

    return true;
  }).slice(0, 4); // Return top 4 matches
}

/**
 * Get all unique portal URLs for quick links.
 */
export function getPortalLinks(): Array<{ label: string; url: string }> {
  const seen = new Set<string>();
  const links: Array<{ label: string; url: string }> = [];

  for (const auth of AUTHORITIES) {
    if (auth.portalUrl && !seen.has(auth.portalUrl)) {
      seen.add(auth.portalUrl);
      links.push({ label: auth.department, url: auth.portalUrl });
    }
  }

  return links;
}
