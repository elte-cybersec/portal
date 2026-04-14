import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import type { TeamMember } from "../../../types";
import { resolveAssetPath } from "../../../utils/resolveAssetPath";

const DEFAULT_AVATAR = "avatars/default_avatar.png";

interface TeamMiniCardProps {
  member: TeamMember;
}

export default function TeamMiniCard({ member }: TeamMiniCardProps) {
  const fullName = `${member.title ? member.title + " " : ""}${member.name} ${member.familyName}`;

  return (
    <Card
      elevation={0}
      sx={{
        border: 0,
        bgcolor: "transparent",
        height: "100%",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
          px: 1.5,
          py: 1.25,
          "&:last-child": { pb: 1.25 },
        }}
      >
        <Box
          sx={(theme) => ({
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1.5px solid ${theme.palette.primary.main}`,
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
        {member.link ? (
          <Link
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.875rem",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {fullName}
          </Link>
        ) : (
          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.875rem",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {fullName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}