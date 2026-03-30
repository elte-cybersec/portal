import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { ProjectMeta } from "../../types";

interface RepositoriesSidebarProps {
  projects: ProjectMeta[];
}

export default function RepositoriesSidebar({
  projects,
}: RepositoriesSidebarProps) {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        borderRadius: 3,
        position: { md: "sticky" },
        top: { md: 96 },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700,color:"primary.main", }}>
        Repositories
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {projects.map((project) => (
          <Button
            key={project.slug}
            component={NavLink}
            to={project.routePath}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlign: "left",
              whiteSpace: "normal",
              textTransform: "none",
              color: "text.primary",
              px: 2,
              py: 1.25,
              borderRadius: 999,
              lineHeight: 1.35,
              "&.active": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            {project.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
}