import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProjectCard from "./ProjectCard";
import type { ProjectMeta } from "../../../types";
import { sortProjects, type ProjectSortMode } from "../../../utils/sortProjects";

interface ProjectsProps {
  projects: ProjectMeta[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [sortMode, setSortMode] = useState<ProjectSortMode>("startDate-newest");

  const sortedProjects = useMemo(
    () => sortProjects(projects, sortMode),
    [projects, sortMode]
  );

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
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
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          mb: 3,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="project-sort-label">Sort by</InputLabel>
          <Select
            labelId="project-sort-label"
            value={sortMode}
            label="Sort by"
            onChange={(e) => setSortMode(e.target.value as ProjectSortMode)}
          >
            <MenuItem value="startDate-newest">Newest first</MenuItem>
            <MenuItem value="startDate-oldest">Oldest first</MenuItem>
            <MenuItem value="title-asc">Title A to Z</MenuItem>
            <MenuItem value="title-desc">Title Z to A</MenuItem>
          </Select>
        </FormControl>
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
        {sortedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Box>
    </Container>
  );
}