import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import type { ProjectData } from "../../../types";
import { getProjectColor, useProjectsSurfaces } from "./projectsShared";
import OrbitProjectNode from "./OrbitProjectNode";

interface ProjectsOrbitMapProps {
  projects: ProjectData[];
  activeSlug: string;
  onSelect: (project: ProjectData) => void;
}

const TOTAL_INTRO_DURATION_MS = 1400;

export default function ProjectsOrbitMap({
  projects,
  activeSlug,
  onSelect,
}: ProjectsOrbitMapProps) {
  const surfaces = useProjectsSurfaces();
  const [revealedCount, setRevealedCount] = useState(0);

  const projectCount = projects.length;
  const perNodeDelay = projectCount > 0 ? TOTAL_INTRO_DURATION_MS / projectCount : 0;

  useEffect(() => {
    setRevealedCount(0);
    if (projectCount === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < projectCount; i++) {
      const timer = setTimeout(() => {
        setRevealedCount((current) => Math.max(current, i + 1));
      }, perNodeDelay * i);
      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [projectCount, perNodeDelay]);

  const orbitRadius = 34;
  const baseNodeRadius = projectCount <= 4 ? 7 : projectCount <= 6 ? 6 : 5;
  const centerNodeRadius = projectCount <= 6 ? 11 : 10;

  const projectPositions = projects.map((_, index) => {
    const angle = (index / projectCount) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 50 + orbitRadius * Math.cos(angle),
      cy: 50 + orbitRadius * Math.sin(angle),
    };
  });

  const connectionLines = useMemo(() => {
    const seen = new Set<string>();
    const lines: { fromIndex: number; toIndex: number }[] = [];

    projects.forEach((project, fromIndex) => {
      (project.relatedProjects ?? []).forEach((relatedTitle) => {
        const toIndex = projects.findIndex((p) => p.title === relatedTitle);
        if (toIndex < 0) return;
        const key = [fromIndex, toIndex].sort((a, b) => a - b).join("|");
        if (seen.has(key)) return;
        seen.add(key);
        lines.push({ fromIndex, toIndex });
      });
    });

    return lines;
  }, [projects]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: { xs: "100%", md: 560 },
        mx: "auto",
      }}
    >
      <style>
        {`
          @keyframes orbit-line-dash {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -20; }
          }
          @keyframes orbit-line-pulse {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.7; }
          }
          @keyframes orbit-node-pop {
            0% { opacity: 0; transform: scale(0.4); }
            70% { transform: scale(1.08); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes orbit-center-pulse {
            0%, 100% { opacity: 0.55; }
            50% { opacity: 1; }
          }
          .projects-orbit-map svg :focus,
          .projects-orbit-map svg :focus-visible {
            outline: none;
          }
          .projects-orbit-map svg circle:focus,
          .projects-orbit-map svg circle:focus-visible {
            outline: none;
            stroke-dasharray: none;
          }
        `}
      </style>

      <Box
        className="projects-orbit-map"
        sx={{ width: "100%", height: "100%", position: "relative" }}
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            outline: "none",
          }}
        >
          <circle
            cx={50}
            cy={50}
            r={orbitRadius}
            fill="none"
            stroke={surfaces.orbitRingStroke}
            strokeWidth={0.2}
            strokeDasharray="0.6 1.2"
          />

          {connectionLines.map((line, idx) => {
            const from = projectPositions[line.fromIndex];
            const to = projectPositions[line.toIndex];
            const bothRevealed =
              revealedCount > line.fromIndex && revealedCount > line.toIndex;

            return (
              <line
                key={`connection-${idx}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke="#20c7cf"
                strokeWidth={0.35}
                strokeDasharray="1.2 1.2"
                style={{
                  opacity: bothRevealed ? 1 : 0,
                  transition: "opacity 400ms ease",
                  animation: bothRevealed
                    ? "orbit-line-pulse 2.6s ease-in-out infinite, orbit-line-dash 4s linear infinite"
                    : "none",
                }}
              />
            );
          })}

          <g>
            <circle
              cx={50}
              cy={50}
              r={centerNodeRadius + 2}
              fill="none"
              stroke="#20c7cf"
              strokeWidth={0.25}
              style={{
                animation: "orbit-center-pulse 3s ease-in-out infinite",
              }}
            />
            <circle
              cx={50}
              cy={50}
              r={centerNodeRadius}
              fill={surfaces.nodeFill}
              stroke="#20c7cf"
              strokeWidth={0.4}
            />
            <text
              x={50}
              y={49}
              textAnchor="middle"
              fill={surfaces.centerLabelMuted}
              fontSize="2"
              letterSpacing="0.3"
              style={{ fontFamily: "monospace" }}
            >
              LAB
            </text>
            <text
              x={50}
              y={53}
              textAnchor="middle"
              fill="#20c7cf"
              fontSize="2.6"
              fontWeight={700}
            >
              Projects
            </text>
          </g>

          {projects.map((project, index) => {
            const position = projectPositions[index];
            const color = getProjectColor(index);

            return (
              <OrbitProjectNode
                key={project.slug}
                project={project}
                index={index}
                cx={position.cx}
                cy={position.cy}
                color={color}
                baseRadius={baseNodeRadius}
                isActive={activeSlug === project.slug}
                isRevealed={revealedCount > index}
                onSelect={onSelect}
              />
            );
          })}
        </svg>
      </Box>
    </Box>
  );
}