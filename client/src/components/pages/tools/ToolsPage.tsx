import { Box, Container, Typography } from "@mui/material";
import { toolsData } from "../../../data/toolsData";
import ToolCard from "./ToolsCard";

export default function ToolsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          mb: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
            maxWidth: 760,
            lineHeight: 1.7,
            textAlign: "center",
          }}
        >
          Explore interactive tools and mini applications built around topics from the course,
          including classical cryptography and cybersecurity challenges.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        {toolsData.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </Box>
    </Container>
  );
}