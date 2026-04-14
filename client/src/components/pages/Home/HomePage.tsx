import { useRef } from "react";
import { Box } from "@mui/material";
import HomeHeroCanvas from "./HomeHeroCanvas";
import HomeHeroOverlay from "./HomeHeroOverlay";
import HomeHeroTooltip from "./HomeHeroTooltip";
import HomeResearchSection from "./HomeResearchSection";
import { HERO_HEIGHT, HOME_THEME } from "./homePage-model";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        width: "100%",
        background: HOME_THEME.bg,
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
        <HomeHeroCanvas heroRef={heroRef} tooltipRef={tooltipRef} />
        <HomeHeroTooltip ref={tooltipRef} />
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
        <HomeHeroOverlay />
        <HomeResearchSection />
      </Box>
    </Box>
  );
}