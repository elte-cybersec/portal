import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  honeycombCoords,
  computeViewBox,
  ANIMATION_SPEEDS,
  type AnimationSpeed,
} from "./hexGeometry";
import type { ResearchArea } from "../../../data/ResearchPageData";
import ChipsetHex from "./ChipsetHex";
import ResearchHex from "./ResearchHex";
import ResearchDetailPanel from "./ResearchDetailPanel";

interface ResearchHoneycombProps {
  areas: ResearchArea[];
  centerLabel?: string;
  speed?: AnimationSpeed;
  height?: number | string;
}

export default function ResearchHoneycomb({
  areas,
  centerLabel = "RESEARCH AREAS",
  speed = "normal",
  height = 480,
}: ResearchHoneycombProps) {
  const theme = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const t = setTimeout(() => setHasAnimated(true), 50);
    return () => clearTimeout(t);
  }, [hasAnimated]);

  const coords = honeycombCoords(areas.length);
  const vb = computeViewBox(areas.length);
  const stepMs = ANIMATION_SPEEDS[speed];
  const activeArea = activeId ? areas.find((a) => a.id === activeId) ?? null : null;

  const bgColor = theme.palette.mode === "dark" ? "#050e14" : "#f7fbfc";
  const borderColor =
    theme.palette.mode === "dark"
      ? `${theme.palette.primary.main}26`
      : `${theme.palette.primary.main}40`;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box
        sx={{
          bgcolor: bgColor,
          border: 1,
          borderColor,
          borderRadius: 2,
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
            width="100%"
            height="100%"
            style={{ display: "block", maxHeight: height }}
            role="group"
            aria-label="Research areas honeycomb"
          >
            {areas.map((area, i) => {
              const c = coords[i];
              return (
                <ResearchHex
                  key={area.id}
                  area={area}
                  x={c.x}
                  y={c.y}
                  active={area.id === activeId}
                  visible={hasAnimated}
                  animationDelayMs={i * stepMs}
                  onClick={() =>
                    setActiveId((prev) => (prev === area.id ? null : area.id))
                  }
                />
              );
            })}

            <ChipsetHex label={centerLabel} />
          </svg>
        </Box>
      </Box>

      <ResearchDetailPanel area={activeArea} />
    </Box>
  );
}