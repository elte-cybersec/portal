export interface GameProps {
  onComplete: (score: number) => void;
}

export interface GauntletScores {
  caesar: number;
  keystone: number;
  network: number;
  gradient: number;
}

export const THEME = {
  bg: "#0a0e1a",
  bgCard: "#0d1525",
  bgDeep: "#060d18",
  green: "#1d9e75",
  greenDark: "#0f6e56",
  greenBorder: "#1d4030",
  blue: "#378add",
  purple: "#7f77dd",
  red: "#a32d2d",
  redLight: "#f09595",
  amber: "#ba7517",
  textPrimary: "#e8eaf0",
  textSecondary: "#9ecfb8",
  textMuted: "#5a6a8a",
  textDim: "#3a4a6a",
} as const;
