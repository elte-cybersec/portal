import { useState } from "react";
import { useTheme } from "@mui/material";

const HEXES = [
  { points: "25,28 35,28 40,37 35,46 25,46 20,37", color: "#93c5fd" },
  { points: "65,28 75,28 80,37 75,46 65,46 60,37", color: "#5eead4" },
  { points: "25,54 35,54 40,63 35,72 25,72 20,63", color: "#f0abfc" },
  { points: "65,54 75,54 80,63 75,72 65,72 60,63", color: "#c4b5fd" },
];

export default function TeamPulse() {
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
        {HEXES.map((hex, i) => (
          <polygon
            key={i}
            points={hex.points}
            fill={hovered ? `${primary}1a` : "#061a1c"}
            stroke={hex.color}
            strokeWidth={hovered ? 1.5 : 1.2}
            style={{ transition: "fill 0.25s ease, stroke-width 0.25s ease" }}
          />
        ))}

        <g
          opacity={hovered ? 1 : 0}
          style={{
            transition: hovered
              ? "opacity 0.35s ease 0.1s"
              : "opacity 0.2s ease",
          }}
        >
          <line x1={40} y1={37} x2={60} y2={37} stroke={primary} strokeWidth={0.6} />
          <line x1={40} y1={63} x2={60} y2={63} stroke={primary} strokeWidth={0.6} />
          <line x1={30} y1={46} x2={30} y2={54} stroke={primary} strokeWidth={0.6} />
          <line x1={70} y1={46} x2={70} y2={54} stroke={primary} strokeWidth={0.6} />
          <line
            x1={40}
            y1={37}
            x2={60}
            y2={63}
            stroke={primary}
            strokeWidth={0.4}
            opacity={0.6}
          />
          <line
            x1={60}
            y1={37}
            x2={40}
            y2={63}
            stroke={primary}
            strokeWidth={0.4}
            opacity={0.6}
          />
        </g>
      </svg>
    </div>
  );
}