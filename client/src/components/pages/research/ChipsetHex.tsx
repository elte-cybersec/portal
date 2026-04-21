import { useTheme } from "@mui/material";
import { hexPoints, HEX_SIZE } from "./hexGeometry";

interface ChipsetHexProps {
  label?: string;
}

export default function ChipsetHex({ label = "RESEARCH AREAS" }: ChipsetHexProps) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const bgFill = theme.palette.mode === "dark" ? "#0a1f24" : "#e8f7f8";

  const pins = [
    { x1: -22, y1: -12, x2: -28, y2: -12 },
    { x1: -22, y1: -4, x2: -28, y2: -4 },
    { x1: -22, y1: 4, x2: -28, y2: 4 },
    { x1: -22, y1: 12, x2: -28, y2: 12 },
    { x1: 22, y1: -12, x2: 28, y2: -12 },
    { x1: 22, y1: -4, x2: 28, y2: -4 },
    { x1: 22, y1: 4, x2: 28, y2: 4 },
    { x1: 22, y1: 12, x2: 28, y2: 12 },
    { x1: -12, y1: -22, x2: -12, y2: -28 },
    { x1: -4, y1: -22, x2: -4, y2: -28 },
    { x1: 4, y1: -22, x2: 4, y2: -28 },
    { x1: 12, y1: -22, x2: 12, y2: -28 },
    { x1: -12, y1: 22, x2: -12, y2: 28 },
    { x1: -4, y1: 22, x2: -4, y2: 28 },
    { x1: 4, y1: 22, x2: 4, y2: 28 },
    { x1: 12, y1: 22, x2: 12, y2: 28 },
  ];

  const lines = label.split(" ");

  return (
    <g role="img" aria-label={label}>
      <polygon
        points={hexPoints(0, 0, HEX_SIZE)}
        fill={bgFill}
        stroke={primary}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect
        x={-22}
        y={-22}
        width={44}
        height={44}
        rx={3}
        fill="none"
        stroke={primary}
        strokeWidth={0.8}
        strokeOpacity={0.6}
      />
      <rect
        x={-14}
        y={-14}
        width={28}
        height={28}
        rx={1}
        fill={theme.palette.background.default}
        stroke={primary}
        strokeWidth={0.6}
        strokeOpacity={0.9}
      />

      {pins.map((p, i) => (
        <line
          key={i}
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke={primary}
          strokeWidth={0.7}
          strokeOpacity={0.55}
        />
      ))}

      <circle cx={-10} cy={-10} r={1} fill={primary} opacity={0.7} />

      {lines.map((ln, i) => (
        <text
          key={i}
          y={i * 9 - (lines.length - 1) * 4.5}
          textAnchor="middle"
          fontSize={7}
          fontWeight={500}
          fill={primary}
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          {ln}
        </text>
      ))}
    </g>
  );
}