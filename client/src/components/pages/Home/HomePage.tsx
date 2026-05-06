import { useRef } from "react";
import { Box, useTheme } from "@mui/material";
import HomeHeroCanvas from "./HomeHeroCanvas";
import HomeHeroOverlay from "./HomeHeroOverlay";
import HomeHeroTooltip from "./HomeHeroTooltip";
import HomeResearchSection from "./HomeResearchSection";
import { HERO_HEIGHT, HOME_THEME_DARK, HOME_THEME_LIGHT } from "./homePage-model";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const palette = theme.palette.mode === "dark" ? HOME_THEME_DARK : HOME_THEME_LIGHT;

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        width: "100%",
        background: palette.bg,
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HERO_HEIGHT,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <HomeHeroCanvas heroRef={heroRef} tooltipRef={tooltipRef} palette={palette} />
        <HomeHeroTooltip ref={tooltipRef} palette={palette} />
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: HERO_HEIGHT,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HomeHeroOverlay palette={palette} />
        <HomeResearchSection />
      </Box>
    </Box>
  );
}