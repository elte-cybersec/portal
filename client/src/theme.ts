import { createTheme } from "@mui/material/styles";
import { themeTokens, type ThemeMode } from "../src/data/themeTokens";

export type { ThemeMode };

export function createAppTheme(mode: ThemeMode) {
  const tokens = themeTokens[mode];

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
        contrastText: tokens.white,
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
            backgroundColor: tokens.secondaryMain,
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
          },
          containedPrimary: {
            color: tokens.white,
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