import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export function createAppTheme(mode: ThemeMode) {
  const isDark = mode === "dark";

  const primaryMain = isDark ? "#2110ddff" : "#160b96ff";
  const primaryLight = isDark ? "#160b96ff" : "#2110ddff";
  const primaryDark = isDark ? "#160b96ff" : "#2110ddff";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: primaryLight,
        dark: primaryDark,
        contrastText: "#ffffff",
      },
      background: isDark
        ? {
            default: "#121212",
            paper: "#1b1b1b",
          }
        : {
            default: "#f7f8fb",
            paper: "#ffffff",
          },
      text: isDark
        ? {
            primary: "#ffffff",
            secondary: "#b8b8c2",
          }
        : {
            primary: "#171717",
            secondary: "#555b66",
          },
      divider: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
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
          },
          a: {
            textDecoration: "none",
            color: "inherit",
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
            color: "#ffffff",
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
    },
  });
}