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
import ProjectCard from "./CodebaseCard";
import type { CodebaseMeta } from "../../../types";
import { sortCodebase, type CodebaseSortMode } from "../../../utils/sortCodebase";

interface ProjectsProps {
  codes: CodebaseMeta[];
}

export default function Codebase({ codes }: ProjectsProps) {
  const [sortMode, setSortMode] = useState<CodebaseSortMode>("startDate-newest");

  const sortedProjects = useMemo(
    () => sortCodebase(codes, sortMode),
    [codes, sortMode]
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 760, mx: "auto" }}
        >
          Explore the available codeBase repositories and related materials.
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
            onChange={(e) => setSortMode(e.target.value as CodebaseSortMode)}
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