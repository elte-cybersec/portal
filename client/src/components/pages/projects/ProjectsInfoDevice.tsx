import { Box, Chip, Stack, Typography } from "@mui/material";
import type { ProjectData } from "../../../types";
import {
  getProjectColor,
  getProjectIcon,
  getProjectTags,
  hexToRgba,
  useProjectsSurfaces,
} from "./projectsShared";

interface ProjectsInfoDeviceProps {
  project: ProjectData;
  index: number;
}

export default function ProjectsInfoDevice({ project, index }: ProjectsInfoDeviceProps) {
  const surfaces = useProjectsSurfaces();
  const color = getProjectColor(index);
  const Icon = getProjectIcon(index);
  const tags = getProjectTags(project.title);
  const relatedProjects = project.relatedProjects ?? [];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 340,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 1.5,
      }}
    >
      <Box sx={{ px: 1.5 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Selected Project
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.8rem",
            mt: 0.5,
          }}
        >
          Tap any node on the map to update.
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          borderRadius: "32px",
          padding: "10px",
          background: surfaces.deviceFrame,
          border: surfaces.isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: surfaces.isDark
            ? `inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 48px rgba(0, 0, 0, 0.45), 0 0 32px ${hexToRgba(color, 0.18)}`
            : `inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 12px 28px rgba(0, 0, 0, 0.12), 0 0 24px ${hexToRgba(color, 0.15)}`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 6,
            borderRadius: 3,
            background: surfaces.deviceFrameBumps,
            border: surfaces.isDark
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 6,
            borderRadius: 3,
            background: surfaces.deviceFrameBumpsRev,
            border: surfaces.isDark
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            right: -3,
            width: 4,
            height: 28,
            borderRadius: 1,
            background: surfaces.deviceCrown,
            border: surfaces.isDark
              ? "1px solid rgba(255, 255, 255, 0.04)"
              : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "62%",
            right: -2,
            width: 3,
            height: 14,
            borderRadius: 1,
            background: surfaces.deviceCrownSmall,
          }}
        />

        <Box
          sx={{
            position: "relative",
            borderRadius: "24px",
            bgcolor: surfaces.deviceScreen,
            border: `1px solid ${hexToRgba(color, 0.35)}`,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.8,
            boxShadow: `inset 0 0 32px ${hexToRgba(color, 0.06)}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color,
                fontSize: "0.62rem",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
              }}
            >
              P{String(index + 1).padStart(2, "0")} · ACTIVE
            </Typography>

            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: color,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: hexToRgba(color, 0.14),
                color,
                flexShrink: 0,
              }}
            >
              <Icon fontSize="small" />
            </Box>

            <Typography
              sx={{
                color: "text.primary",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
            }}
          >
            <DeviceStat
              color={color}
              label="Sub-projects"
              value={`${project.subProjects.length}`}
            />
            <DeviceStat color={color} label="Related" value={`${relatedProjects.length}`} />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                mb: 0.8,
              }}
            >
              Keywords
            </Typography>

            <Stack direction="row" gap={0.6} flexWrap="wrap">
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.7rem",
                    color,
                    borderColor: hexToRgba(color, 0.42),
                    bgcolor: hexToRgba(color, 0.08),
                    fontWeight: 700,
                  }}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          {relatedProjects.length > 0 && (
            <Box>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  mb: 0.8,
                }}
              >
                Related Projects
              </Typography>

              <Stack direction="row" gap={0.6} flexWrap="wrap">
                {relatedProjects.map((relatedProject) => (
                  <Chip
                    key={relatedProject}
                    label={relatedProject}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      color,
                      borderColor: hexToRgba(color, 0.45),
                      bgcolor: hexToRgba(color, 0.08),
                    }}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function DeviceStat({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: hexToRgba(color, 0.06),
        border: `1px solid ${hexToRgba(color, 0.22)}`,
        px: 1.2,
        py: 0.8,
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: "text.primary",
          fontSize: "1.1rem",
          fontWeight: 800,
          lineHeight: 1.1,
          mt: 0.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}