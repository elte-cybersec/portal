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
import type { RepositoryPageMeta } from "../../../types";

interface MobileHeaderProps {
  title: string;
  sticky?: boolean;
  repositoryPages: RepositoryPageMeta[];
}

export default function HeaderMobile({
  title,
  sticky = true,
  repositoryPages
}: MobileHeaderProps) {
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
            minHeight: 64,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            px: 2,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start", overflow: "hidden" }}>
            <AnimatedTitle title={title} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title={isLight ? "Switch to dark" : "Switch to light"}>
              <IconButton onClick={toggle} color="primary" aria-label="toggle theme">
                {isLight ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        <Divider />

        <HeaderNavTabs repositoryPages={repositoryPages}/>
      </Container>
    </AppBar>
  );
}