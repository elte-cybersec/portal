import { useState } from "react";
import type { ProjectData } from "../../../types";
import { truncateLabel, useProjectsSurfaces } from "./projectsShared";

interface OrbitProjectNodeProps {
  project: ProjectData;
  index: number;
  cx: number;
  cy: number;
  color: string;
  baseRadius: number;
  isActive: boolean;
  isRevealed: boolean;
  onSelect: (project: ProjectData) => void;
}

export default function OrbitProjectNode({
  project,
  index,
  cx,
  cy,
  color,
  baseRadius,
  isActive,
  isRevealed,
  onSelect,
}: OrbitProjectNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const surfaces = useProjectsSurfaces();

  const hoverRadius = baseRadius * 1.18;
  const hitAreaRadius = baseRadius * 1.7;
  const visualRadius = isHovered ? hoverRadius : baseRadius;

  const labelOffsetY = hoverRadius + 3;
  const labelY = cy + labelOffsetY;

  const isHighlighted = isHovered || isActive;

  const fill = isActive ? color : surfaces.nodeFill;
  const strokeColor = isActive ? surfaces.nodeFillSolid : color;
  const innerNumberFill = isActive ? surfaces.nodeFillSolid : color;

  const labelFill = isActive
    ? color
    : isHovered
    ? surfaces.nodeLabelHover
    : surfaces.nodeLabelIdle;
  const labelFontSize = isHighlighted ? 2.2 : 1.95;
  const labelWeight = isActive ? 800 : isHovered ? 700 : 600;

  return (
    <g
      style={{
        opacity: isRevealed ? 1 : 0,
        animation: isRevealed
          ? `orbit-node-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) both`
          : "none",
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={visualRadius}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={isActive ? 0.9 : 0.5}
        style={{
          transition:
            "r 220ms cubic-bezier(0.34, 1.56, 0.64, 1), fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease",
          pointerEvents: "none",
        }}
      />

      <text
        x={cx}
        y={cy + 0.8}
        textAnchor="middle"
        fill={innerNumberFill}
        fontSize={baseRadius * 0.55}
        fontWeight={800}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          fontFamily: "monospace",
          letterSpacing: "0.05em",
          transition: "fill 200ms ease",
        }}
      >
        P{String(index + 1).padStart(2, "0")}
      </text>

      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        fill={labelFill}
        fontSize={labelFontSize}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: labelWeight,
          transition: "fill 200ms ease, font-size 200ms ease",
        }}
      >
        {truncateLabel(project.title, 26)}
      </text>

      <circle
        cx={cx}
        cy={cy}
        r={hitAreaRadius}
        fill="transparent"
        style={{ cursor: "pointer", outline: "none" }}
        onClick={() => onSelect(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(project);
          }
        }}
      />
    </g>
  );
}