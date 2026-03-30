import { Box, Card, Link, Typography } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import { siteConfig } from "../../../data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinkSx = (theme: any) => ({
    color: "primary.main",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease",
    px: 1,
    py: 0.5,
    borderRadius: 2,
    "&:hover": {
      color:
        theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : "rgba(0,0,0,0.04)",
      textDecoration: "none",
    },
    "&.active": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: 700,
    },
    "&.active:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  });

  const externalLinkSx = (theme: any) => ({
    color: "primary.main",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease",
    px: 1,
    py: 0.5,
    borderRadius: 2,
    "&:hover": {
      color:
        theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : "rgba(0,0,0,0.04)",
      textDecoration: "none",
    },
  });

  return (
    <footer>
      <Card
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderTop: 1,
          borderColor: "divider",
          py: 2,
          px: 2,
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            maxWidth: "xl",
            mx: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © {year} {siteConfig.siteTitle.replaceAll("-"," ")}. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >

            <Link
              component={RouterNavLink}
              to="/contact"
              underline="none"
              sx={navLinkSx}
            >
              Contact-us
            </Link>

            <Link
              href="https://github.com/elte-cybersec"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={externalLinkSx}
            >
              Repositories
            </Link>
          </Box>
        </Box>
      </Card>
    </footer>
  );
}