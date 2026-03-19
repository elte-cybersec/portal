import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import MyThemeProvider from "./MyThemeProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter basename="/portal">
      <MyThemeProvider>{
      children}
      </MyThemeProvider>
    </BrowserRouter>
  );
}