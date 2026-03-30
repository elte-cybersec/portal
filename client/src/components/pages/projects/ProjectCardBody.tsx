import { Box, Link, Typography } from "@mui/material";
import type { ProjectMeta } from "../../../types";

interface ProjectCardBodyProps {
  project: ProjectMeta;
}

export default function ProjectCardBody({ project }: ProjectCardBodyProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "primary.main",
        }}
      >
        {project.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.7,
          mb: 1.5,
        }}
      >
        {project.shortDescription}
      </Typography>

      {project.repositoryUrl && (
        <Link
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          View repository
        </Link>
      )}
    </Box>
  );
}