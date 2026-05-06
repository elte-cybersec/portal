export interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  label: string;
  alpha: number;
  pulseOffset: number;
  threat: boolean;
  id: number;
}

export interface Edge {
  a: number;
  b: number;
  encrypted: boolean;
}

export interface Packet {
  edge: Edge;
  t: number;
  speed: number;
  dir: 1 | -1;
  color: string;
}

export interface NodeTypeConfig {
  label: string;
  color: string;
  size: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export const NODE_TYPES: readonly NodeTypeConfig[] = [
  { label: "5G gNB", color: "#1d9e75", size: 9 },
  { label: "UE device", color: "#378add", size: 7 },
  { label: "blockchain node", color: "#7f77dd", size: 8 },
  { label: "firewall", color: "#ba7517", size: 8 },
  { label: "data server", color: "#5a6a8a", size: 6 },
  { label: "IoT sensor", color: "#378add", size: 5 },
  { label: "C-Plane", color: "#1d9e75", size: 10 },
  { label: "U-Plane", color: "#1d9e75", size: 8 },
  { label: "encrypted tunnel", color: "#7f77dd", size: 6 },
  { label: "threat actor", color: "#a32d2d", size: 7 },
] as const;

export interface HomePalette {
  bg: string;
  green: string;
  greenBorder: string;
  red: string;
  textPrimary: string;
  textMuted: string;
  textDim: string;
  orange: string;
  tooltipBg: string;
  tooltipText: string;
  purple: string;
  accentItalic: string;
  gridStroke: string;
  edgeNeutral: (alpha: number) => string;
  edgeEncrypted: (alpha: number) => string;
  edgeThreat: (alpha: number) => string;
  mousePulseRing: string;
  mousePulseDot: string;
}

export const HOME_THEME_DARK: HomePalette = {
  bg: "#0a0e1a",
  green: "#1d9e75",
  greenBorder: "#1d4030",
  red: "#a32d2d",
  textPrimary: "#e8eaf0",
  textMuted: "#5a6a8a",
  textDim: "#3a4a6a",
  orange: "#ba7517",
  tooltipBg: "#0d1525",
  tooltipText: "#9ecfb8",
  purple: "#7f77dd",
  accentItalic: "#5be0c0",
  gridStroke: "rgba(29,158,117,0.04)",
  edgeNeutral: (a) => `rgba(29,158,117,${a})`,
  edgeEncrypted: (a) => `rgba(127,119,221,${a})`,
  edgeThreat: (a) => `rgba(163,45,45,${a})`,
  mousePulseRing: "rgba(163,45,45,0.2)",
  mousePulseDot: "rgba(163,45,45,0.5)",
};

export const HOME_THEME_LIGHT: HomePalette = {
  bg: "#f6f8fb",
  green: "#1d9e75",
  greenBorder: "#88c4ad",
  red: "#a32d2d",
  textPrimary: "#1a2332",
  textMuted: "#4a5a72",
  textDim: "#7a8a9a",
  orange: "#ba7517",
  tooltipBg: "#ffffff",
  tooltipText: "#1d6f53",
  purple: "#7f77dd",
  accentItalic: "#0f6e52",
  gridStroke: "rgba(29,158,117,0.08)",
  edgeNeutral: (a) => `rgba(29,158,117,${Math.min(1, a * 1.6)})`,
  edgeEncrypted: (a) => `rgba(127,119,221,${Math.min(1, a * 1.6)})`,
  edgeThreat: (a) => `rgba(163,45,45,${Math.min(1, a * 1.6)})`,
  mousePulseRing: "rgba(163,45,45,0.28)",
  mousePulseDot: "rgba(163,45,45,0.6)",
};

export const HOME_THEME = HOME_THEME_DARK;

export const HERO_STATS_FOR = (palette: HomePalette) =>
  [
    { dot: palette.green, label: "32 nodes secured" },
    { dot: palette.orange, label: "3 threats detected" },
    { dot: palette.red, label: "1 breach blocked" },
  ] as const;

export const HERO_STATS = HERO_STATS_FOR(HOME_THEME_DARK);

export const INITIAL_MOUSE_POSITION: MousePosition = {
  x: -999,
  y: -999,
};

export const HERO_HEIGHT = 520;