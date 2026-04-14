import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../../MyThemeProvider";
import AnimatedTitle from "./AnimatedTitle";
import HeaderNavTabs from "./HeaderNavTabs";
import UnderConstructionBadge from "./UnderConstructionBadge";
import { siteConfig } from "../../../data/siteConfig";

interface HeaderProps {
  sticky?: boolean;
}

export default function Header({ sticky = true }: HeaderProps) {
  const { mode, toggle } = useThemeMode();
  const isLight = mode === "light";

  return (
    <AppBar
      position={sticky ? "sticky" : "static"}
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        backgroundImage: "none",
        borderBottom: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <UnderConstructionBadge />

      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 72 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
            alignItems: "center",
            px: 2,
            gap: 1,
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <AnimatedTitle title={siteConfig.siteTitle} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title={isLight ? "Switch to dark" : "Switch to light"}>
              <IconButton
                onClick={toggle}
                aria-label="toggle theme"
                sx={{
                  color: isLight ? "primary.main" : "text.primary",
                }}
              >
                {isLight ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        <Divider />

        <HeaderNavTabs />
      </Container>
    </AppBar>
  );
}