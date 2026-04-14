import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { siteConfig } from "../../../data/siteConfig";

interface FooterIconProps {
  label: string;
  icon: React.ReactNode;
  href?: string;
  to?: string;
  external?: boolean;
}

function FooterIconLink({ label, icon, href, to, external }: FooterIconProps) {
  const buttonSx = (theme: any) => ({
    width: 38,
    height: 38,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "10px",
    color: "text.secondary",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "primary.main",
      borderColor: "primary.main",
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : "rgba(0,0,0,0.03)",
    },
  });

  const inner = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Tooltip title={label} placement="top">
        <IconButton sx={buttonSx} size="small" disableRipple>
          <Box sx={{ fontSize: "1.1rem", display: "flex" }}>{icon}</Box>
        </IconButton>
      </Tooltip>
      <Typography
        sx={{
          fontSize: "0.65rem",
          color: "text.disabled",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  if (to) {
    return (
      <Box
        component={RouterNavLink}
        to={to}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </Box>
    );
  }

  return (
    <Box
      component="a"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ textDecoration: "none" }}
    >
      {inner}
    </Box>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Card
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          borderRadius: 0,
          py: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            maxWidth: "xl",
            mx: "auto",
          }}
        >
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ fontSize: "0.75rem", letterSpacing: "0.02em" }}
          >
            © {year} {siteConfig.siteTitle.replaceAll("-", " ")}. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <FooterIconLink
              label="Contact"
              icon={<MdOutlineMailOutline />}
              to="/contact"
            />
            <FooterIconLink
              label="GitHub"
              icon={<FaGithub />}
              href="https://github.com/elte-cybersec"
              external
            />
          </Box>
        </Box>
      </Card>
    </footer>
  );
}