import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createAppTheme, type ThemeMode } from "./theme";

type ThemeModeContextType = {
  mode: ThemeMode;
  toggle: () => void;
};

const ThemeModeContext = React.createContext<ThemeModeContextType | null>(null);

export function useThemeMode() {
  const ctx = React.useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within MyThemeProvider");
  }
  return ctx;
}

type MyThemeProviderProps = {
  children: React.ReactNode;
};

export default function MyThemeProvider({ children }: MyThemeProviderProps) {
  const getInitialMode = (): ThemeMode => {
    const saved = localStorage.getItem("elte-cybersec-theme");
    if (saved === "light" || saved === "dark") return saved;

    const systemPrefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return systemPrefersDark ? "dark" : "light";
  };

  const [mode, setMode] = React.useState<ThemeMode>(getInitialMode);

  React.useEffect(() => {
    localStorage.setItem("elte-cybersec-theme", mode);
  }, [mode]);

  const toggle = React.useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);
  const value = React.useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}