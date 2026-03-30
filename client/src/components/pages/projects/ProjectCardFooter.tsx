import { Box, Button, Divider, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ProjectMeta } from "../../../types";

interface ProjectCardFooterProps {
  project: ProjectMeta;
}

export default function ProjectCardFooter({ project }: ProjectCardFooterProps) {
  return (
    <Box sx={{ mt: "auto" }}>
      <Divider sx={{ mb: 1.25 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.4,
          }}
        >
          Start: {project.startDate ?? "TBD"} | End: {project.endDate ?? "TBD"}
        </Typography>

        <Button
          component={RouterLink}
          to={project.routePath}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            flexShrink: 0,
            px: 2,
          }}
        >
          Open Project
        </Button>
      </Box>
    </Box>
  );
}