import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HERO_STATS, HOME_THEME } from "./homePage-model";

export default function HomeHeroOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        gap: 1.5,
        p: 4,
        textAlign: "center",
      }}
    >
      <Typography
        component="div"
        sx={{
          fontSize: 11,
          letterSpacing: "3px",
          color: HOME_THEME.green,
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        ELTE Cybersecurity Lab
      </Typography>

      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
          fontWeight: 500,
          color: HOME_THEME.textPrimary,
          lineHeight: 1.2,
          m: 0,
        }}
      >
        Securing the{" "}
        <Box component="span" sx={{ color: HOME_THEME.green }}>
          Connected World
        </Box>
      </Typography>

      <Typography
        component="p"
        sx={{
          fontSize: 13,
          color: HOME_THEME.textMuted,
          maxWidth: 360,
          lineHeight: 1.6,
          m: 0,
        }}
      >
        Research in encryption, 5G trust, blockchain security, and network threat
        management.
      </Typography>

      <Box sx={{ display: "flex", gap: 2.5, mt: 0.5 }}>
        {HERO_STATS.map(({ dot, label }) => (
          <Box
            key={label}
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: dot,
                boxShadow: `0 0 4px ${dot}`,
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: 11,
                color: HOME_THEME.textDim,
                fontFamily: "monospace",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.25,
          mt: 0.5,
          pointerEvents: "all",
        }}
      >
        <Button
          component={RouterLink}
          to="/games"
          variant="contained"
          color="primary"
          sx={{
            px: 3,
            py: 1.1,
            fontSize: 13,
            fontFamily: "inherit",
          }}
        >
          Try Security Gauntlet
        </Button>
      </Box>
    </Box>
  );
}