import { Box, Container } from "@mui/material";
import { researchAreas } from "../../../data/HomePageData";
import ResearchPart from "./ResearchPart";

export default function HomeResearchSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        {researchAreas.map((area) => (
          <ResearchPart key={area.title} area={area} />
        ))}
      </Box>
    </Container>
  );
}