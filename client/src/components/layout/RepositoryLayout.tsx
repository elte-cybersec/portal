import { Box, Container } from "@mui/material";
import { Navigate, Outlet, useParams } from "react-router-dom";
import type { ParsedProjectData } from "../../types";
import RepositoriesSidebar from "./RepositoriesSidebar";

interface RepositoryLayoutProps {
  parsedProjects: ParsedProjectData[];
}

export default function RepositoryLayout({
  parsedProjects,
}: RepositoryLayoutProps) {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const parsedProject = parsedProjects.find(
    (item) => item.project.slug === projectSlug,
  );

  if (!parsedProject) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <RepositoriesSidebar parsedProject={parsedProject} />

        <Box sx={{ minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}