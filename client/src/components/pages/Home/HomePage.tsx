import { useRef } from "react";
import HomeHeroCanvas from "./HomeHeroCanvas";
import HomeHeroOverlay from "./HomeHeroOverlay";
import HomeHeroTooltip from "./HomeHeroTooltip";
import { HERO_HEIGHT, HOME_THEME } from "./homePage-model";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: HERO_HEIGHT,
        background: HOME_THEME.bg,
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <HomeHeroCanvas heroRef={heroRef} tooltipRef={tooltipRef} />
      <HomeHeroOverlay />
      <HomeHeroTooltip ref={tooltipRef} />
    </div>
  );
}