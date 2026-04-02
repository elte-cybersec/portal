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

export const HOME_THEME = {
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
} as const;

export const HERO_STATS = [
  { dot: HOME_THEME.green, label: "32 nodes secured" },
  { dot: HOME_THEME.orange, label: "3 threats detected" },
  { dot: HOME_THEME.red, label: "1 breach blocked" },
] as const;

export const INITIAL_MOUSE_POSITION: MousePosition = {
  x: -999,
  y: -999,
};

export const HERO_HEIGHT = 520;