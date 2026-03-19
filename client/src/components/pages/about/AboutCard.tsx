import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import type { AboutPerson } from "../../../types";

const DEFAULT_AVATAR = "avatars/default_avatar.png";

function resolveAssetPath(path?: string | null): string {
  if (!path) {
    return `${import.meta.env.BASE_URL}${DEFAULT_AVATAR}`;
  }

  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}

interface AboutCardProps {
  person: AboutPerson;
}

export default function AboutCard({ person }: AboutCardProps) {
  const fullName = `${person.title} ${person.name} ${person.familyName}`;

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1.5,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Box
          sx={(theme) => ({
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `2px solid ${theme.palette.primary.main}`,
            p: "2px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(17, 45, 82, 0.10)"
                : "rgba(17, 45, 82, 0.05)",
          })}
        >
          <Box
            component="img"
            src={resolveAssetPath(person.picture)}
            alt={fullName}
            onError={(e) => {
              e.currentTarget.src = resolveAssetPath(DEFAULT_AVATAR);
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
            }}
          />
        </Box>

        <Stack
          spacing={0.35}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {person.link ? (
            <Link
              href={person.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.15rem",
                lineHeight: 1.2,
                width: "fit-content",
              }}
            >
              {fullName}
            </Link>
          ) : (
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.15rem",
                lineHeight: 1.2,
              }}
            >
              {fullName}
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: "0.98rem",
              color: "text.primary",
              lineHeight: 1.3,
            }}
          >
            {person.job}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "text.secondary",
              lineHeight: 1.3,
            }}
          >
            {person.extraInfo}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}