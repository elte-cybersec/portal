import { Box, Container, Divider, Typography } from "@mui/material";
import { operationPageData } from "../../../data/operationPageData";
import ProjectStructureGrid from "./ProjectStructureGrid";
import PrinciplesSection from "./PrinciplesSection";

export default function OperationsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, textAlign: "left" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "0.95rem" },
            color: "text.secondary",
            lineHeight: 1.75,
            maxWidth: 760,
          }}
        >
          {operationPageData.intro}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 500,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
            }}
          >
            {operationPageData.structureHeading}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              color: "text.secondary",
              lineHeight: 1.75,
              maxWidth: 760,
            }}
          >
            {operationPageData.structureIntro}
          </Typography>

          <ProjectStructureGrid roles={operationPageData.roles} />

          <Typography
            sx={{
              fontSize: { xs: "0.875rem", md: "0.9rem" },
              color: "text.secondary",
              lineHeight: 1.75,
              maxWidth: 760,
              mt: 1,
            }}
          >
            {operationPageData.additionalRoles}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: "primary.main", opacity: 0.15 }} />

        <PrinciplesSection principles={operationPageData.principles} />
      </Box>
    </Container>
  );
}