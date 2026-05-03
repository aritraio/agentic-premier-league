import type { CivicIssue } from "../types/issue";

/**
 * Hand-crafted demo issues used to seed the community map and the issue
 * list when the app starts with no saved data.
 *
 * Each entry mirrors the exact shape produced by the AI analyst so the UI
 * code path is identical between demo data and freshly generated reports.
 *
 * Coordinates are approximate Kolkata locations and are good enough for a
 * map demo. They are NOT geocoded values from a real API.
 */
export const DEMO_ISSUES: CivicIssue[] = [
  {
    id: "demo-waterlogging-saltlake",
    title: "Severe waterlogging near Salt Lake Sector V bus stop",
    category: "Waterlogging",
    severity: "High",
    status: "Reported",
    location: {
      text: "Near Salt Lake Sector V bus stop, Kolkata",
      latitude: 22.5697,
      longitude: 88.4337,
    },
    createdAt: "2025-09-12T08:30:00.000Z",
    summary:
      "After heavy rain, the road near the Salt Lake Sector V bus stop is badly waterlogged, blocking pedestrians and forcing buses to halt in flooded sections.",
    suggestedAuthority: "Bidhannagar Municipal Corporation – Drainage Department",
    missingInfo: [
      "Approximate water depth on the road.",
      "Whether the drainage cover is visible or submerged.",
      "How long the waterlogging has persisted after the rain stopped.",
    ],
    complaintMessage:
      "There is severe waterlogging near the Salt Lake Sector V bus stop in Kolkata after rainfall. The flooded road is causing difficulty for pedestrians, bus passengers, and nearby traffic. Please inspect the drainage system and arrange urgent clearing or repair to prevent further inconvenience and safety risks.",
    volunteerAction:
      "Share this report with nearby residents on the local WhatsApp group, add more photos if possible, warn pedestrians about the flooded stretch, and follow up with the ward office.",
  },
  {
    id: "demo-garbage-gariahat",
    title: "Garbage pile near Gariahat market entrance",
    category: "Garbage",
    severity: "Medium",
    status: "New",
    location: {
      text: "Near Gariahat market, Kolkata",
      latitude: 22.5202,
      longitude: 88.3658,
    },
    createdAt: "2025-09-14T11:05:00.000Z",
    summary:
      "A large pile of garbage has been left near the Gariahat market entrance for two days. The smell is spreading and stray animals are tearing open the bags.",
    suggestedAuthority: "Kolkata Municipal Corporation – Solid Waste Management, Ward 68",
    missingInfo: [
      "Photo of the garbage pile from a wider angle.",
      "Time of last municipal pickup, if known.",
      "Whether the pile is blocking pedestrian movement.",
    ],
    complaintMessage:
      "A large pile of garbage has been left uncollected near the Gariahat market entrance in Kolkata for the last two days. The smell is becoming unbearable for shopkeepers and pedestrians, and stray animals are scattering the waste. Please arrange urgent clearing and confirm a regular pickup schedule for this location.",
    volunteerAction:
      "Post the report in the local market association group, contact the ward sanitation supervisor, and check back tomorrow to confirm pickup.",
  },
  {
    id: "demo-streetlight-jadavpur",
    title: "Broken streetlight near Jadavpur 8B bus stand",
    category: "Streetlight",
    severity: "High",
    status: "In progress",
    location: {
      text: "Near Jadavpur 8B bus stand, Kolkata",
      latitude: 22.4956,
      longitude: 88.3717,
    },
    createdAt: "2025-09-10T19:45:00.000Z",
    summary:
      "The streetlight near the Jadavpur 8B bus stand has not worked for several nights, leaving the road very dark and unsafe for students and commuters.",
    suggestedAuthority: "Kolkata Municipal Corporation – Lighting Department, Ward 93",
    missingInfo: [
      "Pole number printed on the streetlight, if visible.",
      "Whether nearby lights are also affected.",
      "Approximate time the light usually goes out.",
    ],
    complaintMessage:
      "The streetlight near the Jadavpur 8B bus stand in Kolkata has been non-functional for several nights. The road becomes very dark after evening, creating safety concerns for students, women commuters, and pedestrians. Please arrange urgent inspection and repair.",
    volunteerAction:
      "Note the pole number, share the report with the local students’ collective, and request follow-up from the ward councillor.",
  },
  {
    id: "demo-drain-park-circus",
    title: "Open drain near Park Circus seven-point crossing",
    category: "Drainage",
    severity: "Urgent",
    status: "Reported",
    location: {
      text: "Park Circus seven-point crossing, Kolkata",
      latitude: 22.5414,
      longitude: 88.3712,
    },
    createdAt: "2025-09-15T07:20:00.000Z",
    summary:
      "A drain cover near the Park Circus seven-point crossing is missing, leaving an open hole on a busy footpath used by school children every morning.",
    suggestedAuthority: "Kolkata Municipal Corporation – Sewerage and Drainage, Borough VII",
    missingInfo: [
      "Exact size of the open drain opening.",
      "Whether any temporary barricade has been placed.",
      "Closest landmark for repair crews to find it quickly.",
    ],
    complaintMessage:
      "The drain cover near the Park Circus seven-point crossing in Kolkata is missing, leaving a dangerous open hole on a busy footpath used by school children and office commuters. This is an immediate safety hazard. Please arrange urgent replacement of the cover and place a barricade in the meantime.",
    volunteerAction:
      "Place a visible warning marker if safe to do so, alert the traffic guard at the crossing, and escalate to the borough office today.",
  },
  {
    id: "demo-road-dhakuria",
    title: "Damaged footpath on Dhakuria bridge approach",
    category: "Road Damage",
    severity: "Medium",
    status: "New",
    location: {
      text: "Dhakuria bridge approach, Kolkata",
      latitude: 22.5066,
      longitude: 88.3768,
    },
    createdAt: "2025-09-13T16:10:00.000Z",
    summary:
      "A long stretch of footpath on the Dhakuria bridge approach has cracked tiles and exposed rebar, forcing pedestrians to walk on the road.",
    suggestedAuthority: "Kolkata Municipal Corporation – Roads Department, Ward 92",
    missingInfo: [
      "Approximate length of the damaged stretch.",
      "Whether the damage worsens after rain.",
      "Photos showing the exposed rebar from close range.",
    ],
    complaintMessage:
      "The footpath on the Dhakuria bridge approach in Kolkata is badly damaged, with cracked tiles and exposed rebar over a long stretch. Pedestrians, including elderly residents, are being forced onto the road, which is dangerous given the traffic volume. Please arrange inspection and repair.",
    volunteerAction:
      "Share the report with the local residents’ group, collect a few more close-up photos, and forward to the ward councillor with the location pin.",
  },
];
