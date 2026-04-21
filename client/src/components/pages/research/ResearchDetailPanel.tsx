import { Box, Typography } from "@mui/material";
import type { ResearchArea } from "../../../data/ResearchPageData";

interface ResearchDetailPanelProps {
  area: ResearchArea | null;
}

export default function ResearchDetailPanel({ area }: ResearchDetailPanelProps) {
  if (!area) {
    return (
      <Box
        sx={{
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.disabled", fontSize: "0.8rem" }}
        >
          Click any hexagon to see details
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      key={area.id}
      sx={{
        border: 1,
        borderColor: `${area.color}66`,
        borderRadius: 2,
        p: { xs: 2, md: 2.5 },
        bgcolor: "background.paper",
        animation: "detailFadeIn 0.28s ease-out",
        "@keyframes detailFadeIn": {
          from: { opacity: 0, transform: "translateY(-4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "0.95rem", md: "1rem" },
          fontWeight: 700,
          color: area.color,
          mb: 0.5,
        }}
      >
        {area.title}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.825rem",
          color: "text.secondary",
          fontStyle: "italic",
          lineHeight: 1.6,
          mb: 1.5,
        }}
      >
        {area.intro}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "0.825rem", md: "0.875rem" },
          color: "text.primary",
          lineHeight: 1.75,
        }}
      >
        {area.description}
      </Typography>
    </Box>
  );
}