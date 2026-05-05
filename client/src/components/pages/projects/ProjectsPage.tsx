import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import SecurityIcon from "@mui/icons-material/Security";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import type { ProjectData } from "../../../types";
import { projectsPageData } from "../../../data/projectsPageData";

const projectIcons = [SecurityIcon, HubIcon, VerifiedUserIcon, CloudQueueIcon];

const projectAccentColors = ["#20c7cf", "#b48cff", "#e5b84c", "#82b7ff"];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const projects = projectsPageData.projects;

  const [activeProjectSlug, setActiveProjectSlug] = useState(projects[0]?.slug ?? "");
  const [expandedSubProject, setExpandedSubProject] = useState<string>("");

  const activeProject = useMemo(() => {
    return projects.find((project) => project.slug === activeProjectSlug) ?? projects[0];
  }, [activeProjectSlug, projects]);

  const activeIndex = projects.findIndex((project) => project.slug === activeProject?.slug);

  const totalSubProjects = projects.reduce(
    (total, project) => total + project.subProjects.length,
    0
  );

  const handleProjectSelect = (project: ProjectData) => {
    setActiveProjectSlug(project.slug);
    setExpandedSubProject("");
  };

  const handleSubProjectToggle = (title: string) => {
    setExpandedSubProject((current) => (current === title ? "" : title));
  };

  const handleCodebaseClick = (codebaseSlug: string) => {
    navigate(`/codebases/${codebaseSlug}`);
  };

  if (!activeProject) {
    return null;
  }

  const ActiveIcon = projectIcons[activeIndex] ?? SecurityIcon;
  const activeColor = projectAccentColors[activeIndex] ?? "#20c7cf";

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 0.8fr" },
            gap: 3,
            alignItems: "end",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "primary.main",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Lab Projects
            </Typography>

            <Typography
              component="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "2.2rem", md: "4rem" },
                fontWeight: 900,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                mb: 2,
              }}
            >
              Research Projects
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.75,
                maxWidth: 780,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              The lab&apos;s main research directions across B5G network security, distributed
              machine learning security, compliance verification, and cloud security. Each project
              groups several sub-projects and the codebases that support them.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1.5,
            }}
          >
            <StatCard value={projects.length} label="Main Projects" />
            <StatCard value={totalSubProjects} label="Sub-Projects" />
            <StatCard value={4} label="Connected Areas" />
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            p: { xs: 2, md: 3 },
            backgroundImage: `
              linear-gradient(rgba(32, 199, 207, 0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(32, 199, 207, 0.035) 1px, transparent 1px),
              radial-gradient(circle at 15% 20%, rgba(32, 199, 207, 0.12), transparent 30%),
              radial-gradient(circle at 85% 30%, rgba(180, 140, 255, 0.12), transparent 30%)
            `,
            backgroundSize: "44px 44px, 44px 44px, auto, auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Overview Map
              </Typography>

              <Typography
                component="h2"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                How the projects connect
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
                maxWidth: 420,
                fontSize: "0.9rem",
              }}
            >
              Select a project node to preview its role and explore the connected sub-projects.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
              gap: 3,
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: "auto", md: 520 },
                display: { xs: "grid", md: "block" },
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "grid" },
                  placeItems: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 150,
                  height: 150,
                  borderRadius: 5,
                  border: "1px solid rgba(32, 199, 207, 0.75)",
                  bgcolor: "rgba(8, 20, 30, 0.9)",
                  boxShadow: "0 0 45px rgba(32, 199, 207, 0.18)",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    transform: "rotate(-45deg)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.7rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontFamily: "monospace",
                    }}
                  >
                    Research
                  </Typography>

                  <Typography
                    sx={{
                      color: "primary.main",
                      fontWeight: 900,
                    }}
                  >
                    Ecosystem
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: "50%",
                  left: "14%",
                  right: "14%",
                  height: 1,
                  bgcolor: "rgba(32, 199, 207, 0.28)",
                }}
              />

              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: "14%",
                  bottom: "14%",
                  left: "50%",
                  width: 1,
                  bgcolor: "rgba(32, 199, 207, 0.28)",
                }}
              />

              {projects.map((project, index) => {
                const Icon = projectIcons[index] ?? SecurityIcon;
                const color = projectAccentColors[index] ?? "#20c7cf";
                const isActive = activeProject.slug === project.slug;

                return (
                  <ProjectNode
                    key={project.slug}
                    project={project}
                    index={index}
                    Icon={Icon}
                    color={color}
                    isActive={isActive}
                    onClick={() => handleProjectSelect(project)}
                  />
                );
              })}
            </Box>

            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: activeColor,
                bgcolor: "rgba(13, 28, 40, 0.86)",
                p: 3,
                boxShadow: `0 0 32px ${hexToRgba(activeColor, 0.16)}`,
              }}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "inline-flex",
                    width: 54,
                    height: 54,
                    borderRadius: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: hexToRgba(activeColor, 0.12),
                    color: activeColor,
                  }}
                >
                  <ActiveIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      mb: 1,
                    }}
                  >
                    Selected Project
                  </Typography>

                  <Typography
                    component="h3"
                    sx={{
                      color: "text.primary",
                      fontSize: "1.55rem",
                      fontWeight: 900,
                      lineHeight: 1.15,
                    }}
                  >
                    {activeProject.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      mb: 1,
                    }}
                  >
                    Sub-Projects
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    {activeProject.subProjects.length} research direction
                    {activeProject.subProjects.length > 1 ? "s" : ""}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "divider" }} />

                <Box>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      mb: 1,
                    }}
                  >
                    Related Projects
                  </Typography>

                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {activeProject.relatedProjects?.map((relatedProject) => (
                      <Chip
                        key={relatedProject}
                        label={relatedProject}
                        size="small"
                        sx={{
                          color: activeColor,
                          borderColor: hexToRgba(activeColor, 0.45),
                          bgcolor: hexToRgba(activeColor, 0.08),
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            border: "1px solid",
            borderColor: activeColor,
            bgcolor: "background.paper",
            overflow: "hidden",
            boxShadow: `0 0 36px ${hexToRgba(activeColor, 0.14)}`,
          }}
        >
          <Box
            sx={{
              p: { xs: 2.5, md: 3.5 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.35fr 0.65fr" },
              gap: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: activeColor,
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Project {String(activeIndex + 1).padStart(2, "0")}
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
                {activeProject.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                {activeProject.description}
              </Typography>
            </Box>

            <ProjectKeywords project={activeProject} index={activeIndex} color={activeColor} />
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
                {activeProject.mainObjectives.map((objective) => (
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
                        bgcolor: activeColor,
                        boxShadow: `0 0 16px ${hexToRgba(activeColor, 0.55)}`,
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
                  {activeProject.subProjects.length} research direction
                  {activeProject.subProjects.length > 1 ? "s" : ""}
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                {activeProject.subProjects.map((subProject) => {
                  const isExpanded = expandedSubProject === subProject.title;
                  const codebases = subProject.codebases ?? [];

                  return (
                    <Paper
                      key={subProject.title}
                      elevation={0}
                      sx={{
                        overflow: "hidden",
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: isExpanded ? activeColor : "rgba(255, 255, 255, 0.09)",
                        bgcolor: isExpanded
                          ? hexToRgba(activeColor, 0.055)
                          : "rgba(255, 255, 255, 0.025)",
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
                              color: activeColor,
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
                              color: activeColor,
                              fontSize: "0.78rem",
                              fontWeight: 900,
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              mb: 1.2,
                            }}
                          >
                            Research focus
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
                                    bgcolor: activeColor,
                                  }}
                                />
                                <span>{focus}</span>
                              </Box>
                            ))}
                          </Stack>

                          {codebases.length > 0 && (
                            <Box sx={{ mt: 2.5 }}>
                              <Typography
                                sx={{
                                  color: activeColor,
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
                                {codebases.map((codebase) => (
                                  <Chip
                                    key={codebase.slug}
                                    label={codebase.title}
                                    size="small"
                                    icon={<LaunchIcon sx={{ fontSize: "0.9rem !important" }} />}
                                    onClick={() => handleCodebaseClick(codebase.slug)}
                                    sx={{
                                      color: activeColor,
                                      borderColor: hexToRgba(activeColor, 0.45),
                                      bgcolor: hexToRgba(activeColor, 0.08),
                                      cursor: "pointer",
                                      "& .MuiChip-icon": {
                                        color: activeColor,
                                      },
                                      "&:hover": {
                                        bgcolor: hexToRgba(activeColor, 0.16),
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
      </Box>
    </Container>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(32, 199, 207, 0.14), transparent 55%)",
      }}
    >
      <Typography
        sx={{
          color: "text.primary",
          fontSize: { xs: "1.4rem", md: "1.9rem" },
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.7rem",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          mt: 0.8,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

function ProjectNode({
  project,
  index,
  Icon,
  color,
  isActive,
  onClick,
}: {
  project: ProjectData;
  index: number;
  Icon: typeof SecurityIcon;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const positions = [
    {
      top: 20,
      left: "50%",
      transform: "translateX(-50%)",
    },
    {
      top: 185,
      right: 28,
    },
    {
      bottom: 28,
      left: "50%",
      transform: "translateX(-50%)",
    },
    {
      top: 185,
      left: 28,
    },
  ];

  return (
    <Paper
      component="button"
      elevation={0}
      onClick={onClick}
      sx={{
        position: { xs: "relative", md: "absolute" },
        ...positions[index],
        zIndex: 2,
        width: { xs: "100%", md: 250 },
        minHeight: 140,
        p: 2.2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: isActive ? color : "rgba(255, 255, 255, 0.1)",
        bgcolor: "rgba(18, 35, 48, 0.94)",
        color: "text.primary",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: isActive
          ? `0 0 0 1px ${color}, 0 0 36px ${hexToRgba(color, 0.22)}`
          : "0 18px 44px rgba(0, 0, 0, 0.24)",
        backgroundImage: `radial-gradient(circle at 15% 10%, ${hexToRgba(color, 0.16)}, transparent 58%)`,
        transition: "180ms ease",
        "&:hover": {
          borderColor: color,
          transform:
            index === 0 || index === 2 ? "translateX(-50%) translateY(-4px)" : "translateY(-4px)",
          boxShadow: `0 0 0 1px ${color}, 0 0 36px ${hexToRgba(color, 0.2)}`,
        },
      }}
    >
      <Stack spacing={1.4}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            bgcolor: hexToRgba(color, 0.12),
            color,
          }}
        >
          <Icon fontSize="small" />
        </Box>

        <Typography
          sx={{
            color,
            fontSize: "0.75rem",
            fontWeight: 900,
            fontFamily: "monospace",
          }}
        >
          PROJECT {String(index + 1).padStart(2, "0")}
        </Typography>

        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1rem",
            fontWeight: 900,
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.78rem",
          }}
        >
          {project.subProjects.length} sub-project
          {project.subProjects.length > 1 ? "s" : ""}
        </Typography>
      </Stack>
    </Paper>
  );
}

function ProjectKeywords({
  project,
  index,
  color,
}: {
  project: ProjectData;
  index: number;
  color: string;
}) {
  const tags = getProjectTags(project.title);

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 220,
        borderRadius: 4,
        border: "1px solid",
        borderColor: hexToRgba(color, 0.45),
        bgcolor: "rgba(5, 15, 24, 0.58)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        p: 3,
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color,
          fontFamily: "monospace",
          fontSize: "0.78rem",
          fontWeight: 900,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Project {String(index + 1).padStart(2, "0")} · Keywords
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.85rem",
          lineHeight: 1.6,
        }}
      >
        Core themes covered across the sub-projects of {project.title}.
      </Typography>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              color,
              borderColor: hexToRgba(color, 0.42),
              bgcolor: hexToRgba(color, 0.08),
              fontWeight: 700,
            }}
            variant="outlined"
          />
        ))}
      </Stack>
    </Paper>
  );
}

function getProjectTags(title: string) {
  if (title.includes("B5G")) {
    return ["Authentication", "Rogue UE", "WAF", "Edge", "Slicing"];
  }

  if (title.includes("ML")) {
    return ["Federated Learning", "MPC", "Aggregation", "Privacy"];
  }

  if (title.includes("Compliance")) {
    return ["GDPR", "Controls", "Evidence", "Audits"];
  }

  return ["Keystone", "Tokens", "Access", "Identity"];
}

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace("#", "");
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}