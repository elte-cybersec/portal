import { Box, Container, Typography } from "@mui/material";
import { researchAreas, researchPageIntro } from "../../../data/ResearchPageData";
import ResearchHoneycomb from "./ResearchHoneyComb";

export default function ResearchPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, textAlign: "left" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "0.95rem" },
            color: "text.secondary",
            lineHeight: 1.75,
            maxWidth: 760,
            textAlign: "left",
          }}
        >
          {researchPageIntro}
        </Typography>

        <ResearchHoneycomb areas={researchAreas} speed="normal" />
      </Box>
    </Container>
  );
}