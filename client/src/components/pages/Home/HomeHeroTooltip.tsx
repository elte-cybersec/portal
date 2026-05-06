import { forwardRef } from "react";
import type { HomePalette } from "./homePage-model";

interface HomeHeroTooltipProps {
  palette: HomePalette;
}

const HomeHeroTooltip = forwardRef<HTMLDivElement, HomeHeroTooltipProps>(
  function HomeHeroTooltip({ palette }, ref) {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          padding: "6px 10px",
          background: palette.tooltipBg,
          border: `0.5px solid ${palette.greenBorder}`,
          borderRadius: 8,
          fontSize: 11,
          color: palette.tooltipText,
          pointerEvents: "none",
          display: "none",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
        }}
      />
    );
  }
);

export default HomeHeroTooltip;