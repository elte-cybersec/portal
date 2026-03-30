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

interface DesktopHeaderProps {
  title: string;
  sticky?: boolean;
}

export default function HeaderDesktop({
  title,
  sticky = true,
}: DesktopHeaderProps) {
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
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            minHeight: 72,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AnimatedTitle title={title} />
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