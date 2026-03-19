import { Box, Button } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import type { RepositoryPageMeta } from "../../../types";

interface HeaderProps {
  repositoryPages: RepositoryPageMeta[];
}

export default function HeaderNavTabs({ repositoryPages }: HeaderProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, py: 1.25 }}>
      <Box
        sx={(theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          p: 0.75,
          border: 1,
          borderColor: "divider",
          borderRadius: 999,
          bgcolor: "background.paper",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.25)"
              : "0 4px 20px rgba(0,0,0,0.08)",
        })}
      >
        {repositoryPages.map((item) => (
          <Button
            key={item.slug}
            component={RouterNavLink}
            to={item.routePath}
            sx={(theme) => ({
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 1,
              borderRadius: 999,
              color: "text.primary",
              minWidth: 0,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
              },
              "&.active": {
                backgroundColor: "primary.main",
                color: theme.palette.primary.contrastText,
              },
              "&.active:hover": {
                backgroundColor: "primary.dark",
              },
            })}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}