import { useState } from "react";
import { useTheme } from "@mui/material";
import { hexPoints, HEX_SIZE } from "./hexGeometry";
import type { ResearchArea } from "../../../data/ResearchPageData";

interface ResearchHexProps {
  area: ResearchArea;
  x: number;
  y: number;
  active: boolean;
  visible: boolean;
  animationDelayMs: number;
  onClick: () => void;
}

function wrapTitle(title: string, maxCharsPerLine = 14): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (!current) {
      current = w;
    } else if ((current + " " + w).length <= maxCharsPerLine) {
      current += " " + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);

  if (lines.length > 3) {
    const kept = lines.slice(0, 2);
    const rest = lines.slice(2).join(" ");
    kept.push(rest.length > maxCharsPerLine ? rest.slice(0, maxCharsPerLine - 1) + "…" : rest);
    return kept;
  }
  return lines;
}

export default function ResearchHex({
  area,
  x,
  y,
  active,
  visible,
  animationDelayMs,
  onClick,
}: ResearchHexProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const baseFill = theme.palette.mode === "dark" ? "#081a1e" : "#f4fbfb";

  const fill = active
    ? `${area.color}22`
    : hovered
      ? `${area.color}15`
      : baseFill;
  const strokeWidth = active ? 2.5 : 1.3;

  const titleLines = wrapTitle(area.title);
  const lineHeight = 10;
  const titleBlockHeight = titleLines.length * lineHeight;
  const titleStartY = HEX_SIZE * 0.25;

  const handleFocus = (e: React.FocusEvent) => {
    if (e.target.matches(":focus-visible")) {
      setKeyboardFocused(true);
    }
  };

  const handleBlur = () => setKeyboardFocused(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <g
      style={{
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: `translate(${x}px, ${y}px) scale(${visible ? 1 : 0.3})`,
        transformOrigin: "center",
        transformBox: "fill-box",
        transition: `opacity 420ms ease-out ${animationDelayMs}ms, transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1) ${animationDelayMs}ms`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={visible ? 0 : -1}
      role="button"
      aria-label={`${area.title}: ${area.intro}`}
      aria-pressed={active}
    >
      {keyboardFocused && (
        <polygon
          points={hexPoints(0, 0, HEX_SIZE + 4)}
          fill="none"
          stroke={area.color}
          strokeWidth={1.5}
          strokeOpacity={0.6}
          strokeDasharray="3 3"
          strokeLinejoin="round"
          pointerEvents="none"
        />
      )}

      <polygon
        points={hexPoints(0, 0, HEX_SIZE)}
        fill={fill}
        stroke={area.color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{ transition: "fill 0.2s ease, stroke-width 0.2s ease" }}
      />

      <text
        y={-8 - titleBlockHeight / 2}
        textAnchor="middle"
        fontSize={16}
        fontWeight={500}
        fill={area.color}
        fontFamily="system-ui, sans-serif"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {area.icon}
      </text>

      <g
        fontFamily="system-ui, sans-serif"
        fill={theme.palette.text.primary}
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {titleLines.map((line, i) => (
          <text
            key={i}
            y={titleStartY + i * lineHeight}
            textAnchor="middle"
            fontSize={9}
            fontWeight={500}
          >
            {line}
          </text>
        ))}
      </g>
    </g>
  );
}