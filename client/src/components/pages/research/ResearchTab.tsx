import { useState } from "react";
import { Box, Card, CardActionArea, Collapse, Typography } from "@mui/material";
import type { ResearchArea } from "../../../data/ResearchPageData";

interface ResearchTabProps {
  area: ResearchArea;
}

export default function ResearchTab({ area }: ResearchTabProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        border: 1,
        borderColor: expanded ? "primary.main" : "divider",
        bgcolor: "background.paper",
        borderRadius: 2,
        transition: "border-color 0.2s ease, transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 6px 20px rgba(0,0,0,0.5)"
              : "0 6px 20px rgba(0,0,0,0.1)",
        },
      })}
    >
      <CardActionArea
        onClick={() => setExpanded((prev) => !prev)}
        disableRipple
        sx={{
          p: { xs: 2, md: 2.5 },
          userSelect: "none",
          "&:hover": { bgcolor: "transparent" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "primary.main",
                lineHeight: 1.3,
                mb: 0.75,
                textAlign: "left",
              }}
            >
              {area.title}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.8rem", md: "0.875rem" },
                color: "text.secondary",
                lineHeight: 1.6,
                textAlign: "left",
              }}
            >
              {area.intro}
            </Typography>
          </Box>

          <Box
            sx={{
              fontSize: "1.2rem",
              color: "text.disabled",
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease",
              flexShrink: 0,
              lineHeight: 1,
              mt: 0.25,
            }}
          >
            +
          </Box>
        </Box>

        <Collapse in={expanded} timeout={280} unmountOnExit>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              color: "text.primary",
              lineHeight: 1.75,
              mt: 2,
              pt: 2,
              borderTop: 1,
              borderColor: "divider",
              textAlign: "left",
            }}
          >
            {area.description}
          </Typography>
        </Collapse>
      </CardActionArea>
    </Card>
  );
}