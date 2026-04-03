import { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { PublicationItem } from "../../../data/publicationsData";

interface PublicationArchiveItemProps {
  publication: PublicationItem;
  expanded: boolean;
  onToggle: () => void;
}

function getTypeShortLabel(type: PublicationItem["type"]) {
  switch (type) {
    case "conference":
      return "CONF";
    case "journal":
      return "JOUR";
    case "workshop":
      return "WORK";
    case "preprint":
      return "PRE";
    case "book-chapter":
      return "BOOK";
  }
}

function getTypeBadgeStyles(type: PublicationItem["type"]) {
  switch (type) {
    case "conference":
      return {
        backgroundColor: "#E6F1FB",
        color: "#185FA5",
      };
    case "journal":
      return {
        backgroundColor: "#E1F5EE",
        color: "#0F6E56",
      };
    case "workshop":
      return {
        backgroundColor: "#FAEEDA",
        color: "#854F0B",
      };
    case "preprint":
      return {
        backgroundColor: "#F1E8FF",
        color: "#6D3BB3",
      };
    case "book-chapter":
      return {
        backgroundColor: "#FDECEF",
        color: "#A23352",
      };
  }
}

export default function PublicationArchiveItem({
  publication,
  expanded,
  onToggle,
}: PublicationArchiveItemProps) {
  const badgeStyles = useMemo(
    () => getTypeBadgeStyles(publication.type),
    [publication.type]
  );

  return (
    <Box
      sx={{
        borderBottom: "0.5px solid",
        borderColor: "divider",
        backgroundColor: expanded ? "background.paper" : "transparent",
        transition: "background-color 0.15s ease",
        "&:hover": {
          backgroundColor: "background.paper",
        },
        "&:last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.75,
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            minWidth: 88,
            fontSize: 10,
            fontFamily: "monospace",
            letterSpacing: "0.04em",
            color: "text.secondary",
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
          }}
        >
          {publication.code}
        </Typography>

        <Box
          sx={{
            minWidth: 54,
            px: 0.875,
            py: 0.25,
            borderRadius: "3px",
            textAlign: "center",
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.04em",
            flexShrink: 0,
            ...badgeStyles,
          }}
        >
          {getTypeShortLabel(publication.type)}
        </Box>

        <Typography
          sx={{
            flex: 1,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.4,
            color: "text.primary",
            pr: 1,
          }}
        >
          {publication.title}
        </Typography>

        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flexShrink: 0 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "text.secondary",
            }}
          >
            {publication.year}
          </Typography>

          <ExpandMoreIcon
            sx={{
              fontSize: 18,
              color: "text.secondary",
              transform: expanded ? "rotate(180deg)" : "rotate(90deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </Stack>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pl: { xs: 2, sm: 13.5 }, pr: 2, pb: 2 }}>
          <Divider sx={{ mb: 1.5 }} />

          <Stack spacing={1}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <Typography
                sx={{
                  minWidth: 72,
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  color: "text.secondary",
                  pt: "1px",
                }}
              >
                AUTHORS
              </Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}>
                {publication.authors.length > 0
                  ? publication.authors.join(", ")
                  : "Authors can be added here when confirmed."}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <Typography
                sx={{
                  minWidth: 72,
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  color: "text.secondary",
                  pt: "1px",
                }}
              >
                VENUE
              </Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}>
                {publication.venue}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <Typography
                sx={{
                  minWidth: 72,
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  color: "text.secondary",
                  pt: "1px",
                }}
              >
                ABSTRACT
              </Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.55, color: "text.secondary" }}>
                {publication.abstract}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={0.75}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: 1.25, mb: 1.5 }}
          >
            {publication.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 22,
                  borderRadius: 10,
                  fontSize: 10,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  color: "text.secondary",
                  border: "0.5px solid",
                  borderColor: "divider",
                  backgroundColor: "transparent",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            ))}
          </Stack>

          <Button
            component="a"
            href={publication.url}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            sx={{
              minHeight: 34,
              px: 1.75,
              py: 0.75,
              borderRadius: 1,
              fontSize: 11,
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              fontWeight: 600,
              borderWidth: "0.5px",
              borderColor: "divider",
              color: "primary.main",
              backgroundColor: "transparent",
              "&:hover": {
                borderWidth: "0.5px",
                borderColor: "text.primary",
                backgroundColor: "action.hover",
              },
            }}
          >
            ACCESS FILE
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}