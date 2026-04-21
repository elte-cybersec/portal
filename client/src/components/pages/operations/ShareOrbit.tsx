import { useState } from "react";
import { useTheme } from "@mui/material";

const SATELLITES = [
  { cx: 50, cy: 12, color: "#5eead4", dx: 0, dy: -8 },
  { cx: 82, cy: 36, color: "#93c5fd", dx: 8, dy: -4 },
  { cx: 82, cy: 64, color: "#f0abfc", dx: 8, dy: 4 },
  { cx: 50, cy: 88, color: "#c4b5fd", dx: 0, dy: 8 },
  { cx: 18, cy: 64, color: "#fbbf24", dx: -8, dy: 4 },
  { cx: 18, cy: 36, color: "#5eead4", dx: -8, dy: -4 },
];

export default function ShareOrbit() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 100 100" width="100%" style={{ display: "block" }}>
        <circle
          cx={50}
          cy={50}
          r={38}
          fill="none"
          stroke={primary}
          strokeWidth={0.5}
          strokeOpacity={0.15}
          strokeDasharray="2 3"
        />

        {SATELLITES.map((sat, i) => (
          <circle
            key={i}
            cx={sat.cx}
            cy={sat.cy}
            r={3.5}
            fill={sat.color}
            opacity={0.85}
            style={{
              transform: hovered
                ? `translate(${sat.dx}px, ${sat.dy}px)`
                : "translate(0, 0)",
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        ))}

        <rect
          x={40}
          y={42}
          width={20}
          height={16}
          rx={2}
          fill="#061a1c"
          stroke={primary}
          strokeWidth={1}
        />
        <text
          x={50}
          y={54}
          textAnchor="middle"
          fontSize={8}
          fill={primary}
          fontFamily="monospace"
          style={{ userSelect: "none" }}
        >
          {"{ }"}
        </text>
      </svg>
    </div>
  );
}