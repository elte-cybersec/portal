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
}

export const themeTokens: Record<ThemeMode, AppThemeTokens> = {
  light: {
    primaryMain: "#3fc7cd",
    primaryLight: "#3fd7dfff",
    primaryDark: "#0c8d98",

    secondaryMain: "#032f63",

    backgroundDefault: "#f2f2f2",
    backgroundPaper: "#ffffff",

    textPrimary: "#111111",
    textSecondary: "#4f5b66",

    divider: "rgba(0,0,0,0.10)",

    surfaceAlt: "#032f63",

    white: "#ffffff",
  },

  dark: {
    primaryMain: "#10aeb4",
    primaryLight: "#35c4c9",
    primaryDark: "#0b7f92",

    secondaryMain: "#062f63",

    backgroundDefault: "#0f1720",
    backgroundPaper: "#16222d",

    textPrimary: "#ffffff",
    textSecondary: "#b7c4d6",

    divider: "rgba(255,255,255,0.12)",

    surfaceAlt: "#0b3a6f",

    white: "#ffffff",
  },
};