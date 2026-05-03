import type { IssueLocation } from "../types/issue";

const KOLKATA_COORDINATE = {
  latitude: 22.5726,
  longitude: 88.3639,
};

const KNOWN_LOCATIONS = [
  {
    keywords: ["sector v", "sector 5", "salt lake", "bidhan nagar", "bidhannagar"],
    latitude: 22.5697,
    longitude: 88.4337,
  },
  {
    keywords: ["gariahat"],
    latitude: 22.5202,
    longitude: 88.3658,
  },
  {
    keywords: ["jadavpur", "8b"],
    latitude: 22.4956,
    longitude: 88.3717,
  },
  {
    keywords: ["park circus", "seven-point", "seven point", "7 point"],
    latitude: 22.5414,
    longitude: 88.3712,
  },
  {
    keywords: ["dhakuria"],
    latitude: 22.5066,
    longitude: 88.3768,
  },
  {
    keywords: ["esplanade", "dharmatala"],
    latitude: 22.5646,
    longitude: 88.3526,
  },
  {
    keywords: ["howrah"],
    latitude: 22.5851,
    longitude: 88.3468,
  },
  {
    keywords: ["new town", "rajarhat"],
    latitude: 22.5892,
    longitude: 88.4617,
  },
  {
    keywords: ["kalighat"],
    latitude: 22.5204,
    longitude: 88.3426,
  },
  {
    keywords: ["shyambazar"],
    latitude: 22.6012,
    longitude: 88.3738,
  },
];

export function coordinatesForLocationText(text: string): Omit<IssueLocation, "text"> {
  const normalized = text.toLowerCase();
  const match = KNOWN_LOCATIONS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (match) {
    return {
      latitude: match.latitude,
      longitude: match.longitude,
    };
  }
  return KOLKATA_COORDINATE;
}

export function withCoordinates(location: IssueLocation): IssueLocation {
  if (
    typeof location.latitude === "number" &&
    typeof location.longitude === "number"
  ) {
    return location;
  }
  return {
    ...location,
    ...coordinatesForLocationText(location.text),
  };
}
