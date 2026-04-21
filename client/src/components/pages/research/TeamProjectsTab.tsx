import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { teamProjectsData } from "../../../data/operationPageData";
import PeopleIcon from "@mui/icons-material/People";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {type SvgIconComponent } from "@mui/icons-material";

const roleIcons: Record<string, SvgIconComponent> = {
  Theorist: PeopleIcon,
  Engineer: CodeIcon,
  Attacker: BugReportIcon,
  Evaluator: AssessmentIcon,
};

export default function TeamProjectsTab() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}>
      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "text.secondary",
          lineHeight: 1.75,
          maxWidth: 760,
        }}
      >
        {teamProjectsData.intro}
      </Typography>

      <Divider />

      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "primary.main",
            mb: 1,
          }}
        >
          Project Structure
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "text.secondary",
            lineHeight: 1.7,
            mb: 2.5,
          }}
        >
          {teamProjectsData.structure}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {teamProjectsData.roles.map((r) => {
            const Icon = roleIcons[r.role];
            return (
              <Card
                key={r.role}
                elevation={0}
                sx={{ border: 1, borderColor: "divider", bgcolor: "background.paper" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 2,
                    "&:last-child": { pb: 2 },
                  }}
                >
                  {Icon && (
                    <Box
                      sx={(theme) => ({
                        width: 36,
                        height: 36,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(29,158,117,0.12)"
                            : "rgba(29,158,117,0.08)",
                        color: "primary.main",
                      })}
                    >
                      <Icon sx={{ fontSize: "1rem" }} />
                    </Box>
                  )}
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        color: "text.primary",
                        mb: 0.4,
                      }}
                    >
                      {r.role}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.825rem",
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {r.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            lineHeight: 1.7,
            mt: 2,
          }}
        >
          {teamProjectsData.additionalRoles}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography
          sx={{ fontWeight: 700, fontSize: "1rem", color: "primary.main", mb: 1 }}
        >
          Supervision
        </Typography>
        <Typography
          sx={{ fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.75 }}
        >
          {teamProjectsData.supervision}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography
          sx={{ fontWeight: 700, fontSize: "1rem", color: "primary.main", mb: 1 }}
        >
          Open Source
        </Typography>
        <Typography
          sx={{ fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.75 }}
        >
          {teamProjectsData.openSource}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography
          sx={{ fontWeight: 700, fontSize: "1rem", color: "primary.main", mb: 1 }}
        >
          Teamwork as Training
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "text.secondary",
            lineHeight: 1.75,
            mb: 2.5,
          }}
        >
          {teamProjectsData.teamwork}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "text.disabled",
            mb: 1.5,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Research Pillars
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {teamProjectsData.researchPillars.map((pillar) => (
            <Chip
              key={pillar}
              label={pillar}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontSize: "0.75rem", borderRadius: 1 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}