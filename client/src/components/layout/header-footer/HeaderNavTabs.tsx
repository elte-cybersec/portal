import { Box, Button } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import { navigationItems } from "../../../data/navigationItems";

export default function HeaderNavTabs() {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.25,
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          alignItems: "center",
          gap: 0.75,
          p: 0.75,
          width: "100%",
          maxWidth: { xs: "100%", md: "fit-content" },
          mx: "auto",
          border: 1,
          borderColor: "divider",
          borderRadius: { xs: 4, md: 999 },
          bgcolor: "background.paper",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.25)"
              : "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        })}
      >
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            component={RouterNavLink}
            to={item.path}
            sx={(theme) => ({
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: "0.95rem", md: "1.15rem" },
              px: { xs: 1.25, md: 2.5 },
              py: { xs: 0.8, md: 1 },
              borderRadius: 999,
              minWidth: 0,
              flex: { xs: "1 1 auto", md: "0 0 auto" },
              letterSpacing: 0.2,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.92)"
                  : "secondary.main",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                color:
                  theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "secondary.main",
              },
              "&.active": {
                backgroundColor: "transparent",
                color: "primary.main",
              },
              "&.active:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                color: "primary.main",
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