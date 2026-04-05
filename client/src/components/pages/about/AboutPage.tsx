import { Box, Container, Stack, Typography } from "@mui/material";
import { aboutData } from "../../../data/aboutData";
import AboutCard from "./AboutCard";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 2.5 } }}>
      <Stack spacing={2}>
        <Box>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.95rem", md: "1rem" },
            }}
          >
            People and contributors connected to the ELTE Cybersecurity portal.
          </Typography>
        </Box>

        <Stack spacing={2}>
          {aboutData.map((person, index) => (
            <AboutCard
              key={`${person.name}-${person.familyName}-${index}`}
              person={person}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}