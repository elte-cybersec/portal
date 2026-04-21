import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { ProjectRole } from "../../../data/operationPageData";

interface ProjectStructureGridProps {
  roles: ProjectRole[];
}

export default function ProjectStructureGrid({ roles }: ProjectStructureGridProps) {
  const theme = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const t = setTimeout(() => setHasAnimated(true), 50);
    return () => clearTimeout(t);
  }, [hasAnimated]);

  const getRole = (axisX: "theory" | "practice", axisY: "builds" | "breaks") =>
    roles.find((r) => r.axisX === axisX && r.axisY === axisY);

  const quadrants = [
    { axisX: "theory" as const, axisY: "builds" as const, order: 0 },
    { axisX: "practice" as const, axisY: "builds" as const, order: 1 },
    { axisX: "theory" as const, axisY: "breaks" as const, order: 2 },
    { axisX: "practice" as const, axisY: "breaks" as const, order: 3 },
  ];

  const activeRole = activeId ? roles.find((r) => r.id === activeId) ?? null : null;

  const axisColor = theme.palette.mode === "dark" ? "#9ca3af" : "#6b7280";
  const quadrantBg = theme.palette.mode === "dark" ? "#061a1c" : "#f7fbfc";
  const dividerColor =
    theme.palette.mode === "dark"
      ? `${theme.palette.primary.main}50`
      : `${theme.palette.primary.main}55`;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 420px) 1fr" },
        gap: { xs: 3, md: 4 },
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1.25 / 1",
          maxWidth: 420,
          px: 3.5,
          py: 3.5,
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.65rem",
            color: axisColor,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          BUILDS
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.65rem",
            color: axisColor,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          BREAKS / MEASURES
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "rotate(-90deg) translateX(50%)",
            transformOrigin: "left center",
            fontSize: "0.65rem",
            color: axisColor,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          THEORY
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "rotate(90deg) translateX(-50%)",
            transformOrigin: "right center",
            fontSize: "0.65rem",
            color: axisColor,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          PRACTICE
        </Typography>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "14%",
            right: "14%",
            height: 0,
            borderTop: `1px dashed ${dividerColor}`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "14%",
            bottom: "14%",
            width: 0,
            borderLeft: `1px dashed ${dividerColor}`,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: "14% 14%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 1.5,
          }}
        >
          {quadrants.map((q, idx) => {
            const role = getRole(q.axisX, q.axisY);
            if (!role) return <Box key={idx} />;

            const isActive = role.id === activeId;
            const inactiveBg =
              theme.palette.mode === "dark" ? quadrantBg : "transparent";

            return (
              <Box
                key={role.id}
                onClick={() =>
                  setActiveId((prev) => (prev === role.id ? null : role.id))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId((prev) => (prev === role.id ? null : role.id));
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${role.role}: ${role.description}`}
                sx={{
                  bgcolor: isActive ? `${role.color}1f` : inactiveBg,
                  border: `1.5px solid ${role.color}`,
                  borderWidth: isActive ? 2 : 1.5,
                  borderRadius: 2,
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  outline: "none",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? "scale(1)" : "scale(0.8)",
                  transition: `opacity 420ms ease-out ${q.order * 100}ms, transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1) ${q.order * 100}ms, background-color 0.2s ease, border-width 0.2s ease`,
                  "&:hover": {
                    bgcolor: `${role.color}14`,
                  },
                  "&:focus-visible": {
                    boxShadow: `0 0 0 3px ${role.color}55`,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: role.color,
                    fontWeight: 500,
                    fontSize: { xs: "0.85rem", md: "0.95rem" },
                    mb: 0.25,
                  }}
                >
                  {role.role}
                </Typography>
                <Typography
                  sx={{
                    color: axisColor,
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {q.axisY} · {q.axisX}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: { xs: "auto", md: 280 },
          pt: { xs: 0, md: 2 },
        }}
      >
        {activeRole ? (
          <Box
            key={activeRole.id}
            sx={{
              borderLeft: { xs: "none", md: `2px solid ${activeRole.color}` },
              borderTop: { xs: `2px solid ${activeRole.color}`, md: "none" },
              pl: { xs: 0, md: 3 },
              pt: { xs: 2, md: 0 },
              animation: "detailSlideIn 0.32s ease-out",
              "@keyframes detailSlideIn": {
                from: { opacity: 0, transform: "translateX(-8px)" },
                to: { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: axisColor,
                letterSpacing: "0.15em",
                fontWeight: 500,
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              Role · {activeRole.axisY} · {activeRole.axisX}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                fontWeight: 500,
                color: activeRole.color,
                mb: 1.5,
              }}
            >
              {activeRole.role}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.875rem", md: "0.95rem" },
                color: "text.primary",
                lineHeight: 1.75,
              }}
            >
              {activeRole.description}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "center" },
              opacity: 0.6,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.8rem",
                fontStyle: "italic",
              }}
            >
              ← Click any role to see details
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}