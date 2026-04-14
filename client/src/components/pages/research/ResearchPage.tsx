import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { researchAreas, researchPageIntro } from "../../../data/ResearchPageData";
import ResearchTab from "./ResearchTab";
import TeamProjectsTab from "./TeamProjectsTab";

export default function ResearchPage() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, textAlign: "left" }}>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab label="Research Areas" />
          <Tab label="Team Projects" />
        </Tabs>
      </Box>

      {tab === 0 && (
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

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {researchAreas.map((area) => (
              <ResearchTab key={area.title} area={area} />
            ))}
          </Box>
        </Box>
      )}

      {tab === 1 && <TeamProjectsTab />}
    </Container>
  );
}