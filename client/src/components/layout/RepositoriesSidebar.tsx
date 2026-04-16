import { Box, Button, Typography, alpha } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { ParsedProjectData } from "../../types";

interface RepositoriesSidebarProps {
  parsedProject: ParsedProjectData;
}

export default function RepositoriesSidebar({
  parsedProject,
}: RepositoriesSidebarProps) {
  const { project, document } = parsedProject;
  const { sections } = document;

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
      <Typography
        variant="h6"
        sx={{
          mb: 0.5,
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        {project.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Topics
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {sections.map((section) => (
          <Button
            key={section.id}
            component={NavLink}
            to={`/repos/${project.slug}/${section.id}`}
            sx={(theme) => {
              const isDark = theme.palette.mode === "dark";
              const normalText = theme.palette.text.primary;
              const selectedText = isDark
                ? theme.palette.primary.light
                : theme.palette.primary.dark;

              const hoverBg = alpha(
                isDark
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
                isDark ? 0.12 : 0.08
              );

              const selectedBg = alpha(
                isDark
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
                isDark ? 0.16 : 0.12
              );

              return {
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                whiteSpace: "normal",
                textTransform: "none",
                color: normalText,
                px: 2,
                py: 1.25,
                borderRadius: 999,
                lineHeight: 1.35,
                transition:
                  "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                  backgroundColor: hoverBg,
                  color: normalText,
                },

                "&.active": {
                  backgroundColor: selectedBg,
                  color: selectedText,
                },

                "&.active:hover": {
                  backgroundColor: selectedBg,
                  color: selectedText,
                },
              };
            }}
          >
            {section.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
}