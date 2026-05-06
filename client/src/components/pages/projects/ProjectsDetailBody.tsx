import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import type { CodebaseMeta, ProjectData } from "../../../types";
import { getProjectColor, hexToRgba, useProjectsSurfaces } from "./projectsShared";

interface ProjectsDetailBodyProps {
  project: ProjectData;
  index: number;
  codebases: CodebaseMeta[];
}

export default function ProjectsDetailBody({
  project,
  index,
  codebases,
}: ProjectsDetailBodyProps) {
  const surfaces = useProjectsSurfaces();
  const [expandedSubProject, setExpandedSubProject] = useState<string>("");

  const color = getProjectColor(index);

  const handleSubProjectToggle = (title: string) => {
    setExpandedSubProject((current) => (current === title ? "" : title));
  };

  const resolveCodebaseMatches = (identifiers: string[] | undefined): CodebaseMeta[] => {
    if (!identifiers || identifiers.length === 0) return [];

    const matched: CodebaseMeta[] = [];
    const seenSlugs = new Set<string>();

    identifiers.forEach((identifier) => {
      const lookup = identifier.toLowerCase();

      const match = codebases.find((codebase) => {
        const titleLower = (codebase.title ?? "").toLowerCase();
        const slugLower = (codebase.slug ?? "").toLowerCase();
        return (
          slugLower === lookup ||
          slugLower.includes(lookup) ||
          titleLower.includes(lookup)
        );
      });

      if (match && !seenSlugs.has(match.slug)) {
        matched.push(match);
        seenSlugs.add(match.slug);
      }
    });

    return matched;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 5,
        border: "1px solid",
        borderColor: color,
        bgcolor: "background.paper",
        overflow: "hidden",
        boxShadow: `0 0 36px ${hexToRgba(color, 0.14)}`,
      }}
    >
      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography
          sx={{
            color,
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Project {String(index + 1).padStart(2, "0")}
        </Typography>

        <Typography
          component="h2"
          sx={{
            color: "text.primary",
            fontSize: { xs: "1.85rem", md: "3rem" },
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            mb: 2,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          {project.description}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      <Box
        sx={{
          p: { xs: 2.5, md: 3.5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
          gap: 3,
        }}
      >
        <Box>
          <Typography
            component="h3"
            sx={{
              color: "text.primary",
              fontSize: "1.25rem",
              fontWeight: 900,
              mb: 2,
            }}
          >
            Main objectives
          </Typography>

          <Stack spacing={1.2}>
            {project.mainObjectives.map((objective) => (
              <Box
                key={objective}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "22px 1fr",
                  gap: 1.2,
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    mt: "0.45rem",
                    bgcolor: color,
                    boxShadow: `0 0 16px ${hexToRgba(color, 0.55)}`,
                  }}
                />
                <span>{objective}</span>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: "text.primary",
                fontSize: "1.25rem",
                fontWeight: 900,
              }}
            >
              Sub-Projects
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.8rem",
              }}
            >
              {project.subProjects.length} direction
              {project.subProjects.length > 1 ? "s" : ""}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            {project.subProjects.map((subProject) => {
              const isExpanded = expandedSubProject === subProject.title;
              const matchedCodebases = resolveCodebaseMatches(subProject.codebases);

              return (
                <Paper
                  key={subProject.title}
                  elevation={0}
                  sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: isExpanded ? color : surfaces.subProjectIdleBorder,
                    bgcolor: isExpanded
                      ? hexToRgba(color, 0.055)
                      : surfaces.subProjectIdleBg,
                    transition: "180ms ease",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleSubProjectToggle(subProject.title)}
                    sx={{
                      justifyContent: "space-between",
                      textAlign: "left",
                      px: 2,
                      py: 1.6,
                      color: "text.primary",
                      textTransform: "none",
                      fontWeight: 800,
                    }}
                    endIcon={
                      <ExpandMoreIcon
                        sx={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "180ms ease",
                          color,
                        }}
                      />
                    }
                  >
                    {subProject.title}
                  </Button>

                  <Collapse in={isExpanded}>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Divider sx={{ mb: 2, borderColor: "divider" }} />

                      <Typography
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.75,
                          fontSize: "0.9rem",
                          mb: 2,
                        }}
                      >
                        {subProject.description}
                      </Typography>

                      <Typography
                        sx={{
                          color,
                          fontSize: "0.78rem",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          mb: 1.2,
                        }}
                      >
                        Focus areas
                      </Typography>

                      <Stack spacing={0.8}>
                        {subProject.researchFocus.map((focus) => (
                          <Box
                            key={focus}
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "18px 1fr",
                              gap: 1,
                              color: "text.secondary",
                              fontSize: "0.86rem",
                              lineHeight: 1.55,
                            }}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                mt: "0.48rem",
                                bgcolor: color,
                              }}
                            />
                            <span>{focus}</span>
                          </Box>
                        ))}
                      </Stack>

                      {matchedCodebases.length > 0 && (
                        <Box sx={{ mt: 2.5 }}>
                          <Typography
                            sx={{
                              color,
                              fontSize: "0.78rem",
                              fontWeight: 900,
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              mb: 1.2,
                            }}
                          >
                            Related codebases
                          </Typography>

                          <Stack direction="row" gap={1} flexWrap="wrap">
                            {matchedCodebases.map((codebase) => (
                              <Chip
                                key={codebase.slug}
                                label={codebase.title}
                                size="small"
                                icon={<LaunchIcon sx={{ fontSize: "0.9rem !important" }} />}
                                component={RouterLink}
                                to={codebase.routePath}
                                clickable
                                sx={{
                                  color,
                                  borderColor: hexToRgba(color, 0.45),
                                  bgcolor: hexToRgba(color, 0.08),
                                  cursor: "pointer",
                                  textDecoration: "none",
                                  "& .MuiChip-icon": {
                                    color,
                                  },
                                  "&:hover": {
                                    bgcolor: hexToRgba(color, 0.16),
                                  },
                                }}
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}