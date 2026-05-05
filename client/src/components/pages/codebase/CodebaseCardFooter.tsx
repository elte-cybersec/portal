import { Box, Button, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { CodebaseMeta } from "../../../types";

interface ProjectCardFooterProps {
  project: CodebaseMeta;
}

export default function CodebaseCardFooter({ project }: ProjectCardFooterProps) {
  return (
    <Box sx={{ mt: "auto" }}>
      <Divider sx={{ mb: 1.25 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {/* <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.4,
          }}
        >
          Start: {project.startDate ?? "TBD"} | End: {project.endDate ?? "TBD"}
        </Typography> */}

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