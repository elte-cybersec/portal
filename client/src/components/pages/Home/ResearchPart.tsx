import { useState } from "react";
import { Box, Card, CardActionArea, Collapse, Typography } from "@mui/material";
import type { ResearchArea } from "../../../data/HomePageData";
import { FaBrain, FaCloud, FaBitcoin, FaLock, FaNetworkWired } from "react-icons/fa";
import { type IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  "AI Security": FaBrain,
  "Cloud Security": FaCloud,
  "Cryptocurrency & Blockchain Security": FaBitcoin,
  "Applied Cryptography": FaLock,
  "5G & Next-Generation Network Security": FaNetworkWired,
};

interface ResearchPartProps {
  area: ResearchArea;
}

export default function ResearchPart({ area }: ResearchPartProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[area.title];

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        border: 1,
        borderColor: expanded ? "primary.main" : "divider",
        bgcolor: "background.paper",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 24px rgba(0,0,0,0.5)"
              : "0 8px 24px rgba(0,0,0,0.12)",
        },
      })}
    >
      <CardActionArea
        onClick={() => setExpanded((prev) => !prev)}
        disableRipple
        sx={{ p: 2.5, userSelect: "none" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: expanded ? 1.5 : 0,
          }}
        >
          {Icon && (
            <Box
              sx={(theme) => ({
                width: 38,
                height: 38,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(29,158,117,0.12)"
                    : "rgba(29,158,117,0.08)",
                color: "primary.main",
                fontSize: "1.1rem",
              })}
            >
              <Icon />
            </Box>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "text.primary",
                lineHeight: 1.3,
              }}
            >
              {area.title}
            </Typography>
          </Box>

          <Box
            sx={{
              fontSize: "1rem",
              color: "text.disabled",
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            +
          </Box>
        </Box>

        <Collapse in={expanded} timeout={280} unmountOnExit>
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "text.secondary",
              lineHeight: 1.65,
              pt: 0.5,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            {area.description}
          </Typography>
        </Collapse>
      </CardActionArea>
    </Card>
  );
}