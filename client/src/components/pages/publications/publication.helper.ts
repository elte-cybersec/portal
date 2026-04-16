import type { PublicationItem } from "../../../data/publicationsData";

export type PublicationTypeKey = "CONF" | "JOUR" | "BOOK" | "CHAPTER";

export type PublicationTypePalette = {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  logoBg: string;
  logoBorder: string;
};

export const publicationTypeStyles: Record<
  PublicationTypeKey,
  {
    dark: PublicationTypePalette;
    light: PublicationTypePalette;
  }
> = {
  CONF: {
    dark: {
      badgeBg: "rgba(96, 165, 250, 0.24)",
      badgeText: "#DBEAFE",
      badgeBorder: "rgba(147, 197, 253, 0.52)",
      logoBg: "rgba(96, 165, 250, 0.20)",
      logoBorder: "rgba(147, 197, 253, 0.44)",
    },
    light: {
      badgeBg: "#BFDBFE",
      badgeText: "#1E3A8A",
      badgeBorder: "#60A5FA",
      logoBg: "#DBEAFE",
      logoBorder: "#93C5FD",
    },
  },
  JOUR: {
    dark: {
      badgeBg: "rgba(52, 211, 153, 0.24)",
      badgeText: "#D1FAE5",
      badgeBorder: "rgba(110, 231, 183, 0.52)",
      logoBg: "rgba(52, 211, 153, 0.20)",
      logoBorder: "rgba(110, 231, 183, 0.44)",
    },
    light: {
      badgeBg: "#BBF7D0",
      badgeText: "#14532D",
      badgeBorder: "#4ADE80",
      logoBg: "#DCFCE7",
      logoBorder: "#86EFAC",
    },
  },
  BOOK: {
    dark: {
      badgeBg: "rgba(192, 132, 252, 0.24)",
      badgeText: "#F3E8FF",
      badgeBorder: "rgba(216, 180, 254, 0.52)",
      logoBg: "rgba(192, 132, 252, 0.20)",
      logoBorder: "rgba(216, 180, 254, 0.44)",
    },
    light: {
      badgeBg: "#E9D5FF",
      badgeText: "#581C87",
      badgeBorder: "#C084FC",
      logoBg: "#F3E8FF",
      logoBorder: "#D8B4FE",
    },
  },
  CHAPTER: {
    dark: {
      badgeBg: "rgba(248, 113, 113, 0.24)",
      badgeText: "#FEE2E2",
      badgeBorder: "rgba(252, 165, 165, 0.52)",
      logoBg: "rgba(248, 113, 113, 0.20)",
      logoBorder: "rgba(252, 165, 165, 0.44)",
    },
    light: {
      badgeBg: "#FECACA",
      badgeText: "#7F1D1D",
      badgeBorder: "#F87171",
      logoBg: "#FEE2E2",
      logoBorder: "#FCA5A5",
    },
  },
};

export function getPublicationTypeKey(
  type: PublicationItem["type"]
): PublicationTypeKey {
  switch (type) {
    case "conference":
      return "CONF";
    case "journal":
      return "JOUR";
    case "book-chapter":
      return "BOOK";
    default:
      return "CONF";
  }
}

export function getPublicationTypeShortLabel(
  type: PublicationItem["type"]
): string {
  return getPublicationTypeKey(type);
}

export function getPublicationTypeStyles(
  type: PublicationItem["type"],
  isDarkMode: boolean
): PublicationTypePalette {
  const key = getPublicationTypeKey(type);
  return isDarkMode
    ? publicationTypeStyles[key].dark
    : publicationTypeStyles[key].light;
}