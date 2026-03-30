import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import type { ProjectMeta } from "../../types";
import RepositoriesSidebar from "./RepositoriesSidebar";

interface RepositoryLayoutProps {
  projects: ProjectMeta[];
}

export default function RepositoryLayout({
  projects,
}: RepositoryLayoutProps) {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <RepositoriesSidebar projects={projects} />

        <Box sx={{ minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}