export type ThemeMode = "light" | "dark";

export interface AppThemeTokens {
  primaryMain: string;
  primaryLight: string;
  primaryDark: string;

  secondaryMain: string;

  backgroundDefault: string;
  backgroundPaper: string;

  textPrimary: string;
  textSecondary: string;

  divider: string;

  surfaceAlt: string;

  white: string;

  onPrimaryDark: string;
  onPrimaryLight: string;
}

export const themeTokens: Record<ThemeMode, AppThemeTokens> = {
  light: {
    primaryMain: "#3fc7cd",
    primaryLight: "#72e3e8",
    primaryDark: "#0c8d98",

    secondaryMain: "#111111",

    backgroundDefault: "#f2f2f2",
    backgroundPaper: "#ffffff",

    textPrimary: "#111111",
    textSecondary: "#4f5b66",

    divider: "rgba(0,0,0,0.10)",

    surfaceAlt: "#032f63",

    white: "#ffffff",

    onPrimaryDark: "#ffffff",
    onPrimaryLight: "#111111",
  },

  dark: {
    primaryMain: "#10aeb4",
    primaryLight: "#4ed9df",
    primaryDark: "#0b7f92",

    secondaryMain: "#ffffff",

    backgroundDefault: "#0f1720",
    backgroundPaper: "#16222d",

    textPrimary: "#ffffff",
    textSecondary: "#b7c4d6",

    divider: "rgba(255,255,255,0.12)",

    surfaceAlt: "#062f63",

    white: "#ffffff",

    onPrimaryDark: "#ffffff",
    onPrimaryLight: "#111111",
  },
};