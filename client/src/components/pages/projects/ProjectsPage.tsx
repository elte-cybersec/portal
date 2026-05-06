import { useMemo, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import type { CodebaseMeta, ProjectData } from "../../../types";
import { projectsPageData } from "../../../data/projectsPageData";
import ProjectsOrbitMap from "./ProjectsOrbitMap";
import ProjectsInfoDevice from "./ProjectsInfoDevice";
import ProjectsDetailBody from "./ProjectsDetailBody";

interface ProjectsPageProps {
  codebases?: CodebaseMeta[];
}

export default function ProjectsPage({ codebases = [] }: ProjectsPageProps) {
  const projects = projectsPageData.projects;

  const [activeProjectSlug, setActiveProjectSlug] = useState(projects[0]?.slug ?? "");

  const activeProject = useMemo(() => {
    return projects.find((project) => project.slug === activeProjectSlug) ?? projects[0];
  }, [activeProjectSlug, projects]);

  const activeIndex = projects.findIndex((project) => project.slug === activeProject?.slug);

  const totalSubProjects = projects.reduce(
    (total, project) => total + project.subProjects.length,
    0
  );

  const totalConnections = useMemo(() => {
    const connectionSet = new Set<string>();
    projects.forEach((project) => {
      (project.relatedProjects ?? []).forEach((relatedTitle) => {
        const target = projects.find((p) => p.title === relatedTitle);
        if (!target) return;
        const key = [project.slug, target.slug].sort().join("|");
        connectionSet.add(key);
      });
    });
    return connectionSet.size;
  }, [projects]);

  const handleProjectSelect = (project: ProjectData) => {
    setActiveProjectSlug(project.slug);
  };

  if (!activeProject) {
    return null;
  }

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
              Projects Overview
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.75,
                maxWidth: 780,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              The lab&apos;s main project directions across B5G network security, distributed
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
            <StatCard value={totalConnections} label="Connections" />
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
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <ProjectsOrbitMap
                projects={projects}
                activeSlug={activeProject.slug}
                onSelect={handleProjectSelect}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.8,
                  color: "text.secondary",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                <TouchAppOutlinedIcon sx={{ fontSize: "0.9rem" }} />
                <span>Click any node to select</span>
              </Box>
            </Box>

            <ProjectsInfoDevice project={activeProject} index={activeIndex} />
          </Box>
        </Paper>

        <ProjectsDetailBody
          project={activeProject}
          index={activeIndex}
          codebases={codebases}
        />
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