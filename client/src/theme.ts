import { createTheme } from "@mui/material/styles";
import { themeTokens, type ThemeMode } from "../src/data/themeTokens";

export type { ThemeMode };

export function createAppTheme(mode: ThemeMode) {
  const tokens = themeTokens[mode];
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primaryMain,
        light: tokens.primaryLight,
        dark: tokens.primaryDark,
        contrastText: tokens.white,
      },
      secondary: {
        main: tokens.secondaryMain,
        contrastText: isDark ? tokens.backgroundDefault : tokens.white,
      },
      background: {
        default: tokens.backgroundDefault,
        paper: tokens.backgroundPaper,
      },
      text: {
        primary: tokens.textPrimary,
        secondary: tokens.textSecondary,
      },
      divider: tokens.divider,
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: tokens.backgroundDefault,
            color: tokens.textPrimary,
          },
          a: {
            textDecoration: "none",
            color: "inherit",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.surfaceAlt,
            color: tokens.white,
            boxShadow: "none",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            transition:
              "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
          },

          containedPrimary: {
            backgroundColor: tokens.primaryDark,
            color: tokens.onPrimaryDark,
            "&:hover": {
              backgroundColor: tokens.primaryLight,
              color: tokens.onPrimaryLight,
              boxShadow: isDark
                ? "0 4px 14px rgba(0,0,0,0.28)"
                : "0 4px 14px rgba(0,0,0,0.12)",
            },
          },

          outlinedPrimary: {
            borderColor: tokens.primaryDark,
            color: tokens.primaryDark,
            "&:hover": {
              borderColor: tokens.primaryLight,
              color: tokens.primaryLight,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            },
          },

          textPrimary: {
            color: tokens.secondaryMain,
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: tokens.backgroundPaper,
            border: `1px solid ${tokens.divider}`,
            boxShadow: "none",
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: tokens.white,
            height: 3,
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            color: "rgba(255,255,255,0.85)",
            fontWeight: 700,
            textTransform: "none",
            "&.Mui-selected": {
              color: tokens.white,
            },
          },
        },
      },

      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: 64,
          },
        },
      },
    },
  });
}