import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import type { TeamMember } from "../../../types";
import { resolveAssetPath } from "../../../utils/resolveAssetPath";

const DEFAULT_AVATAR = "avatars/default_avatar.png";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const fullName = `${member.title ? member.title + " " : ""}${member.name} ${member.familyName}`;

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
          "&:last-child": { pb: 1.5 },
        }}
      >
        <Box
          sx={(theme) => ({
            width: 56,
            height: 56,
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
            src={resolveAssetPath(member.picture || DEFAULT_AVATAR)}
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
          spacing={0.3}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {member.link ? (
            <Link
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1rem",
                lineHeight: 1.2,
                textAlign: "left",
              }}
            >
              {fullName}
            </Link>
          ) : (
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1rem",
                lineHeight: 1.2,
                textAlign: "left",
              }}
            >
              {fullName}
            </Typography>
          )}

          {member.role && (
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "text.primary",
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              {member.role}
            </Typography>
          )}

          {member.extraInfo && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "text.secondary",
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              {member.extraInfo}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}