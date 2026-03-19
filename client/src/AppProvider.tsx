import * as React from "react";
import { HashRouter } from "react-router-dom";
import MyThemeProvider from "./MyThemeProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter>
      <MyThemeProvider>{children}</MyThemeProvider>
    </HashRouter>
  );
}