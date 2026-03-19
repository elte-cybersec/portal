import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2.2rem", md: "3.5rem" },
              }}
            >
              Welcome to ELTE Cybersecurity
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              A central web portal for cybersecurity-related projects, resources,
              and future academic content. This static version is the first step
              toward a broader platform.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button variant="contained" size="large">
                Explore
              </Button>
              <Button variant="outlined" size="large">
                Learn More
              </Button>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Projects
                  </Typography>
                  <Typography color="text.secondary">
                    Showcase repositories, research work, student developments,
                    and practical cybersecurity implementations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Resources
                  </Typography>
                  <Typography color="text.secondary">
                    Organize learning materials, guides, documentation, and
                    future teaching content in one place.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Community
                  </Typography>
                  <Typography color="text.secondary">
                    Build a stronger public-facing presence for ELTE
                    Cybersecurity with a clean and modern website.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}