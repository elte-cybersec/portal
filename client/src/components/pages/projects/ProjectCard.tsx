import { Card, Box } from "@mui/material";
import type { ProjectMeta } from "../../../types";
import ProjectCardHeader from "./ProjectCardHeader";
import ProjectCardBody from "./ProjectCardBody";
import ProjectCardFooter from "./ProjectCardFooter";

interface ProjectCardProps {
  project: ProjectMeta;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      sx={(theme) => ({
        height: "100%",
        minHeight: 260,
        borderRadius: 4,
        overflow: "hidden",
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        transform: "translateY(0) scale(1)",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 18px rgba(0,0,0,0.18)"
            : "0 4px 18px rgba(0,0,0,0.06)",
        "&:hover": {
          transform: "translateY(-4px) scale(1.015)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 28px rgba(0,0,0,0.28)"
              : "0 10px 28px rgba(0,0,0,0.12)",
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2.5,
          gap: 1.5,
        }}
      >
        <ProjectCardHeader project={project} />
        <ProjectCardBody project={project} />
        <ProjectCardFooter project={project} />
      </Box>
    </Card>
  );
}