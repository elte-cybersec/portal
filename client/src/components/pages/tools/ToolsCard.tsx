import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import type { ToolItem } from "../../../data/toolsData";
import { resolveAssetPath } from "../../../utils/resolveAssetPath";

interface ToolCardProps {
  tool: ToolItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const isLive = tool.status === "live";

  return (
    <Card
      component={RouterLink}
      to={`/tools/${tool.slug}`}
      sx={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-6px) scale(1.01)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 12px 28px rgba(0,0,0,0.35)"
              : "0 12px 28px rgba(0,0,0,0.14)",
          borderColor: "primary.main",
        },
      })}
    >
      <Box
        sx={{
          px: 1.5,
          pt: 1.5,
          pb: 0.75,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={resolveAssetPath(tool.image)}
          alt={tool.title}
          sx={{
            width: "100%",
            maxWidth: 240,
            aspectRatio: "1 / 1",
            objectFit: "contain",
            display: "block",
            transition: "transform 0.2s ease",
            ".MuiCard-root:hover &": {
              transform: "scale(1.03)",
            },
          }}
        />
      </Box>

      <CardContent
        sx={{
          px: 1.5,
          pt: 0.5,
          pb: 1.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
          {tool.category ? (
            <Chip label={tool.category} size="small" sx={{ fontWeight: 700 }} />
          ) : null}

          {tool.status ? (
            <Chip
              label={tool.status.replace("-", " ")}
              size="small"
              variant="filled"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                backgroundColor: isLive ? "#d32f2f" : "primary.main",
                color: "#ffffff",
              }}
            />
          ) : null}
        </Stack>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "text.primary",
            mb: 0.75,
            textAlign: "center",
          }}
        >
          {tool.title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: "text.secondary",
            lineHeight: 1.6,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          {tool.description}
        </Typography>
      </CardContent>
    </Card>
  );
}