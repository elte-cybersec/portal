import { Box } from "@mui/material";
import type { ProjectMeta } from "../../../types";
import { resolveAssetPath } from "../../../utils/resolveAssetPath";

interface ProjectCardHeaderProps {
  project: ProjectMeta;
}

export default function ProjectCardHeader({
  project,
}: ProjectCardHeaderProps) {
  const logosToShow = project.logos?.slice(0, 2) ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        minHeight: 60,
      }}
    >
      {logosToShow.length > 0 ? (
        logosToShow.map((logoFileName) => (
          <Box
            key={logoFileName}
            sx={{
              width: 92,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={resolveAssetPath(`projects/${project.slug}/${logoFileName}`)}
              alt={`${project.title} logo`}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        ))
      ) : (
        <Box
          sx={{
            width: 92,
            height: 58,
            flexShrink: 0,
          }}
        />
      )}
    </Box>
  );
}