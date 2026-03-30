import { Box, Container, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import type { ProjectMeta } from "../../../types";

interface ProjectsProps {
  projects: ProjectMeta[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontWeight: 800,
            color: "primary.main",
          }}
        >
          Projects
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 760, mx: "auto" }}
        >
          Explore the available project repositories and related materials.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Box>
    </Container>
  );
}