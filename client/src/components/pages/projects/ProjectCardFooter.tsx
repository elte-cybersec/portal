import { Box, Divider, Typography } from "@mui/material";
import type { ProjectMeta } from "../../../types";

interface ProjectCardFooterProps {
  project: ProjectMeta;
}

export default function ProjectCardFooter({ project }: ProjectCardFooterProps) {
  return (
    <Box sx={{ mt: "auto" }}>
      <Divider sx={{ mb: 1.25 }} />

      <Typography variant="body2" color="text.secondary">
        Start: {project.startDate ?? "TBD"} | End: {project.endDate ?? "TBD"}
      </Typography>
    </Box>
  );
}