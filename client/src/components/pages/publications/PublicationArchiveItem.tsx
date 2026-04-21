import { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PublicationItem } from "../../../data/publicationsData";
import { resolveAssetPath } from "../../../utils/resolveAssetPath";
import {
  getPublicationTypeShortLabel,
  getPublicationTypeStyles,
} from "./publication.helper";

interface PublicationArchiveItemProps {
  publication: PublicationItem;
  expanded: boolean;
  activeTags: string[];
  onToggle: () => void;
  onTagClick: (tag: string) => void;
}

function buildVenueIconPath(
  type: PublicationItem["type"],
  venueIcon?: string
): string | null {
  if (!venueIcon) return null;
  return resolveAssetPath(`publications/${type}/${venueIcon}`);
}

export default function PublicationArchiveItem({
  publication,
  expanded,
  activeTags,
  onToggle,
  onTagClick,
}: PublicationArchiveItemProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const typeStyles = useMemo(
    () => getPublicationTypeStyles(publication.type, isDarkMode),
    [publication.type, isDarkMode]
  );

  const venueIconSrc = useMemo(
    () => buildVenueIconPath(publication.type, publication.venueIcon),
    [publication.type, publication.venueIcon]
  );

  const [iconFailed, setIconFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const showIcon = Boolean(venueIconSrc) && !iconFailed;

  const activeTagsLower = useMemo(
    () => activeTags.map((t) => t.toLowerCase()),
    [activeTags]
  );

  const handleLightboxOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => setLightboxOpen(false);

  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onTagClick(tag);
  };

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
            backgroundColor: typeStyles.badgeBg,
            color: typeStyles.badgeText,
            border: `0.5px solid ${typeStyles.badgeBorder}`,
          }}
        >
          {getPublicationTypeShortLabel(publication.type)}
        </Box>

        {showIcon ? (
          <Box
            sx={{
              width: 56,
              height: 32,
              flexShrink: 0,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              border: `0.5px solid ${typeStyles.logoBorder}`,
              backgroundColor: typeStyles.logoBg,
              overflow: "hidden",
              p: 0.5,
            }}
          >
            <Box
              component="img"
              src={venueIconSrc ?? undefined}
              alt={`${publication.venue} logo`}
              loading="lazy"
              onError={() => setIconFailed(true)}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        ) : null}

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

        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
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
              <Typography
                sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}
              >
                {publication.authors.length > 0
                  ? publication.authors.join(", ")
                  : "Authors can be added here when confirmed."}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                sx={{
                  minWidth: 72,
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  color: "text.secondary",
                }}
              >
                VENUE
              </Typography>
              <Stack direction="row" spacing={1.25} alignItems="center">
                {showIcon ? (
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${publication.venue} logo`}
                    onClick={handleLightboxOpen}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setLightboxOpen(true);
                      }
                    }}
                    sx={{
                      width: 72,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "6px",
                      border: `0.5px solid ${typeStyles.logoBorder}`,
                      backgroundColor: typeStyles.logoBg,
                      overflow: "hidden",
                      p: 0.625,
                      flexShrink: 0,
                      cursor: "zoom-in",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        borderColor: typeStyles.logoBorder,
                        boxShadow: isDarkMode
                          ? `0 3px 10px ${alpha(typeStyles.badgeText, 0.25)}`
                          : `0 3px 10px ${alpha(typeStyles.badgeText, 0.16)}`,
                      },
                      "&:focus-visible": {
                        outline: `2px solid ${typeStyles.badgeText}`,
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={venueIconSrc ?? undefined}
                      alt=""
                      loading="lazy"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                ) : null}
                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "text.secondary",
                  }}
                >
                  {publication.venue}
                </Typography>
              </Stack>
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
              <Typography
                sx={{ fontSize: 13, lineHeight: 1.55, color: "text.secondary" }}
              >
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
            {publication.tags.map((tag) => {
              const isActive = activeTagsLower.includes(tag.toLowerCase());
              return (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onClick={(e) => handleTagClick(tag, e)}
                  sx={(theme) => ({
                    height: 22,
                    borderRadius: 10,
                    fontSize: 10,
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    color: isActive
                      ? theme.palette.primary.main
                      : "text.secondary",
                    border: "0.5px solid",
                    borderColor: isActive
                      ? theme.palette.primary.main
                      : "divider",
                    backgroundColor: isActive
                      ? theme.palette.mode === "dark"
                        ? "rgba(16,174,180,0.12)"
                        : "rgba(63,199,205,0.12)"
                      : "transparent",
                    transition:
                      "color 0.15s, border-color 0.15s, background-color 0.15s",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                    "&:hover": {
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(16,174,180,0.08)"
                          : "rgba(63,199,205,0.08)",
                    },
                  })}
                />
              );
            })}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        </Box>
      </Collapse>

      {showIcon ? (
        <Modal
          open={lightboxOpen}
          onClose={handleLightboxClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 250,
              sx: { backgroundColor: "rgba(0,0,0,0.72)" },
            },
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Fade in={lightboxOpen} timeout={250}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 520,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `0.5px solid ${theme.palette.divider}`,
                boxShadow: `0 24px 60px ${alpha("#000", 0.35)}`,
                overflow: "hidden",
                outline: "none",
              }}
            >
              <IconButton
                aria-label="Close preview"
                onClick={handleLightboxClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  color: theme.palette.text.secondary,
                  backgroundColor: alpha(theme.palette.background.paper, 0.85),
                  "&:hover": {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>

              <Box
                sx={{
                  backgroundColor: typeStyles.logoBg,
                  borderBottom: `0.5px solid ${typeStyles.logoBorder}`,
                  p: { xs: 4, sm: 6 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 240,
                }}
              >
                <Box
                  component="img"
                  src={venueIconSrc ?? undefined}
                  alt={`${publication.venue} logo`}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 280,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>

              <Box sx={{ px: 2.5, py: 2 }}>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    letterSpacing: "0.08em",
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  PUBLISHED AT
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "text.primary",
                    lineHeight: 1.35,
                  }}
                >
                  {publication.venue}
                </Typography>
                {publication.publisher ? (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      mt: 0.25,
                    }}
                  >
                    {publication.publisher}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Fade>
        </Modal>
      ) : null}
    </Box>
  );
}