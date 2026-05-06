import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HERO_STATS_FOR, type HomePalette } from "./homePage-model";
import { MainTitle } from "../../../data/HomePageData";

interface HomeHeroOverlayProps {
  palette: HomePalette;
}

export default function HomeHeroOverlay({ palette }: HomeHeroOverlayProps) {
  const words = MainTitle.split(" ");
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(" ");
  const secondHalf = words.slice(mid).join(" ");
  const stats = HERO_STATS_FOR(palette);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        p: 4,
        textAlign: "center",
        pt: 4,
        pb: 0,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
          fontWeight: 500,
          color: palette.textPrimary,
          lineHeight: 1.4,
          m: 0,
          maxWidth: 600,
        }}
      >
        {firstHalf}{" "}
        <Box
          component="span"
          sx={{
            color: palette.accentItalic,
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          {secondHalf}
        </Box>
      </Typography>

      <Box sx={{ display: "flex", gap: 2.5, mt: 0.5 }}>
        {stats.map(({ dot, label }) => (
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
                color: palette.textDim,
                fontFamily: "monospace",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 0.5 }}>
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