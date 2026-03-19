import { Box, Container, Typography } from "@mui/material";

interface RepoPageProps {
  slug: string;
}

export default function RepoPage({ slug }: RepoPageProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Repository Page
        </Typography>

        <Typography color="text.primary">
          Hey, I am <strong>{slug}</strong>.
        </Typography>
      </Box>
    </Container>
  );
}