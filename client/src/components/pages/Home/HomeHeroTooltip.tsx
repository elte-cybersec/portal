import { forwardRef } from "react";
import { HOME_THEME } from "./homePage-model";

const HomeHeroTooltip = forwardRef<HTMLDivElement>(function HomeHeroTooltip(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        padding: "6px 10px",
        background: HOME_THEME.tooltipBg,
        border: `0.5px solid ${HOME_THEME.greenBorder}`,
        borderRadius: 8,
        fontSize: 11,
        color: HOME_THEME.tooltipText,
        pointerEvents: "none",
        display: "none",
        fontFamily: "monospace",
        whiteSpace: "nowrap",
      }}
    />
  );
});

export default HomeHeroTooltip;